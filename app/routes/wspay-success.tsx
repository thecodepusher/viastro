import { redirect } from "react-router";
import type { Route } from "./+types/wspay-success";
import { prefs } from "@/lib/prefs-cookie";
import { publicPaths } from "@/lib/paths";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { getLocale } from "@/lib/utils";
import { sendReservationEmail, sendCustomerReservationEmail, type ReservationEmailPayload } from "@/lib/email";
import {
  verifyWSPayCallbackSignature,
  type WSPayCallbackParams,
  createWSPayFormData,
  generateShoppingCartId,
  getWSPayAuthorizationUrl,
  ensureHttpsUrl,
} from "@/lib/wspay";
import {
  getWSPaySession,
  getSessionIdFromUrl,
  invalidateWSPaySession,
  createWSPaySession,
} from "@/lib/wspay-session";

function buildReservationEmailPayload(
  reservationData: NonNullable<
    ReturnType<typeof getWSPaySession>
  >["reservationData"],
  options: {
    wsPayOrderId?: string;
    approvalCode?: string;
    emailType?: ReservationEmailPayload["emailType"];
    baseUrl?: string;
  } = {},
): ReservationEmailPayload {
  const extrasDescriptions = reservationData.extrasDescriptions || [];

  return {
    carName: reservationData.carName,
    pickupSummary: `${reservationData.pickupName} ${reservationData.pickupDateFormatted} - ${reservationData.pickUpTime}`,
    dropoffSummary: `${reservationData.dropOffName} ${reservationData.dropOffDateFormatted} - ${reservationData.dropOffTime}`,
    days: reservationData.days,
    carPrice: reservationData.carPrice,
    totalPrice: reservationData.totalPrice,
    originalTotalPrice: reservationData.originalTotalPrice,
    promoCode: reservationData.promoCode,
    promoDiscountPercent: reservationData.promoDiscountPercent,
    promoDiscountAmount: reservationData.promoDiscountAmount,
    carDeposit:
      reservationData.carDeposit ||
      reservationData.depositAfterDiscount + reservationData.depositeDiscount,
    depositDiscount: reservationData.depositeDiscount,
    depositDue: reservationData.depositAfterDiscount,
    extrasDescriptions,
    customerName: `${reservationData.firstName} ${reservationData.lastName}`,
    customerEmail: reservationData.customerEmail,
    customerPhone: reservationData.phone,
    wsPayOrderId: options.wsPayOrderId,
    approvalCode: options.approvalCode,
    baseUrl: options.baseUrl,
    emailType: options.emailType,
  };
}

async function sendCompletedReservationEmails(
  reservationData: NonNullable<
    ReturnType<typeof getWSPaySession>
  >["reservationData"],
  options: {
    request: Request;
    langParam: string | undefined;
    wsPayOrderId?: string;
    approvalCode?: string;
  },
) {
  const payload = buildReservationEmailPayload(reservationData, {
    wsPayOrderId: options.wsPayOrderId,
    approvalCode: options.approvalCode,
    emailType: "completed",
    baseUrl: getBaseUrl(options.request),
  });

  try {
    await sendReservationEmail(payload);
  } catch (error) {
    console.error("Failed to send office reservation email:", error);
  }

  try {
    const lang = await getLocale(options.langParam || "sr", options.request);
    await sendCustomerReservationEmail(payload, lang);
  } catch (error) {
    console.error("Failed to send customer reservation email:", error);
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  const session = getWSPaySession(sessionId);
  if (!session) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const formData = await request.formData();

  const wspayParams: Record<string, string> = {};
  formData.forEach((value, key) => {
    wspayParams[key] = value as string;
  });

  if (wspayParams.ShoppingCartID !== session.shoppingCartId) {
    invalidateWSPaySession(sessionId);
    return redirect(publicPaths.reservation(params.lang ?? "sr"));
  }

  const reservationData = session.reservationData;
  if (!reservationData) {
    invalidateWSPaySession(sessionId);
    return redirect(publicPaths.reservation(params.lang ?? "sr"));
  }

  const successValue = wspayParams.Success || wspayParams.success;
  if (successValue !== "1" && successValue !== "true") {
    return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
  }

  const shopId =
    process.env.WSPAY_SHOP_ID ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SHOP_ID
      : undefined);
  const secretKey =
    process.env.WSPAY_SECRET_KEY ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SECRET_KEY
      : undefined);

  const callbackParams: WSPayCallbackParams = {
    Success: successValue,
    ApprovalCode: wspayParams.ApprovalCode || wspayParams.Approvalcode,
    ShoppingCartID: wspayParams.ShoppingCartID || wspayParams.ShoppingCartId,
    Signature: wspayParams.Signature || wspayParams.signature,
    Amount: wspayParams.Amount || wspayParams.amount,
    wsPayOrderId:
      wspayParams.wsPayOrderId ||
      wspayParams.WsPayOrderId ||
      wspayParams.WSPayOrderId,
  };

  if (shopId && secretKey) {
    if (successValue === "1" && !callbackParams.ApprovalCode) {
      console.error(
        "WSPay Success: ApprovalCode is missing for successful transaction",
      );
      return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
    }

    const isValidSignature = verifyWSPayCallbackSignature(
      callbackParams,
      shopId,
      secretKey,
    );

    if (!isValidSignature) {
      console.error("WSPay Success: Invalid signature verification");
      return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
    }
  }

  // Provera da li je ovo preautorizacija depozita i da li treba naplata ukupne cene
  const isDepositPreAuth =
    reservationData.needsTotalPayment &&
    callbackParams.Amount &&
    parseFloat(callbackParams.Amount.replace(",", ".")) ===
      reservationData.depositAmount *
        Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

  if (isDepositPreAuth && successValue === "1") {
    // Sačuvaj podatke o preautorizaciji depozita
    const depositPreAuthData = {
      wsPayOrderId: callbackParams.wsPayOrderId,
      approvalCode: callbackParams.ApprovalCode,
    };

    try {
      await sendReservationEmail(
        buildReservationEmailPayload(reservationData, {
          wsPayOrderId: depositPreAuthData.wsPayOrderId,
          approvalCode: depositPreAuthData.approvalCode,
          emailType: "deposit_pending",
          baseUrl: getBaseUrl(request),
        }),
      );
    } catch (error) {
      console.error("Failed to send deposit pending email:", error);
    }

    // Kreiraj novi shopping cart ID za naplatu ukupne cene
    const totalPaymentCartId = generateShoppingCartId();
    const totalPaymentSessionId = createWSPaySession(totalPaymentCartId, {
      ...reservationData,
      depositPreAuth: depositPreAuthData,
      isTotalPayment: true,
    });

    const baseUrl = getBaseUrl(request);
    const langCode = params.lang ?? "sr";
    const testModeEnv =
      process.env.WSPAY_TEST_MODE ||
      (typeof import.meta !== "undefined"
        ? import.meta.env?.WSPAY_TEST_MODE
        : undefined);
    const isTestMode = testModeEnv !== "false";

    const totalAmount =
      reservationData.totalPrice *
      Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

    const returnUrlTotal = ensureHttpsUrl(
      `${baseUrl}${publicPaths.wspay.success(langCode)}?sessionId=${totalPaymentSessionId}`,
      isTestMode,
    );
    const returnErrorUrlTotal = ensureHttpsUrl(
      `${baseUrl}${publicPaths.wspay.error(langCode)}?sessionId=${totalPaymentSessionId}`,
      isTestMode,
    );
    const cancelUrlTotal = ensureHttpsUrl(
      `${baseUrl}${publicPaths.wspay.cancel(langCode)}?sessionId=${totalPaymentSessionId}`,
      isTestMode,
    );

    const wspayUrl = getWSPayAuthorizationUrl(isTestMode);
    const totalPaymentFormData = createWSPayFormData({
      shopId: shopId!,
      secretKey: secretKey!,
      shoppingCartId: totalPaymentCartId,
      totalAmount,
      returnUrl: returnUrlTotal,
      returnErrorUrl: returnErrorUrlTotal,
      cancelUrl: cancelUrlTotal,
      customerFirstName: reservationData.firstName,
      customerLastName: reservationData.lastName,
      customerEmail: reservationData.customerEmail,
      customerPhone: reservationData.phone,
      lang: langCode.toUpperCase(),
      returnMethod: "GET",
      authorizationType: "Sale", // Obična naplata za ukupnu cenu
    });

    const wspayFormDataEncoded = encodeURIComponent(
      JSON.stringify({
        url: wspayUrl,
        formData: totalPaymentFormData,
      }),
    );

    // Redirectuj na naplatu ukupne cene
    return redirect(
      `${publicPaths.wspay.redirect(langCode)}?sessionId=${totalPaymentSessionId}&formData=${wspayFormDataEncoded}`,
    );
  }

  // Ako je ovo naplata ukupne cene ili samo preautorizacija bez naplate
  try {
    const approvalCode = callbackParams.ApprovalCode;
    const wsPayOrderId = callbackParams.wsPayOrderId;

    // Ako postoji preautorizacija depozita, koristi te podatke za email
    const depositPreAuth = reservationData.depositPreAuth;
    const depositWsPayOrderId = depositPreAuth?.wsPayOrderId || wsPayOrderId;
    const depositApprovalCode = depositPreAuth?.approvalCode || approvalCode;

    await sendCompletedReservationEmails(reservationData, {
      request,
      langParam: params.lang,
      wsPayOrderId: depositWsPayOrderId,
      approvalCode: depositApprovalCode,
    });
  } catch (error) {
    console.error(error);
  }

  invalidateWSPaySession(sessionId);

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  cookie.paymentSuccessful = "true";

  return redirect(publicPaths.success(params.lang ?? "sr"), {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  const session = getWSPaySession(sessionId);
  if (!session) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const wspayParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    wspayParams[key] = value;
  });

  if (!wspayParams.ShoppingCartID && !wspayParams.Success) {
    invalidateWSPaySession(sessionId);
    return redirect(publicPaths.reservation(params.lang ?? "sr"));
  }

  if (wspayParams.ShoppingCartID !== session.shoppingCartId) {
    invalidateWSPaySession(sessionId);
    return redirect(publicPaths.reservation(params.lang ?? "sr"));
  }

  const reservationData = session.reservationData;
  if (!reservationData) {
    invalidateWSPaySession(sessionId);
    return redirect(publicPaths.reservation(params.lang ?? "sr"));
  }

  const successValue = wspayParams.Success || wspayParams.success;
  const isSuccessful = successValue === "1" || successValue === "true";

  const shopId =
    process.env.WSPAY_SHOP_ID ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SHOP_ID
      : undefined);
  const secretKey =
    process.env.WSPAY_SECRET_KEY ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SECRET_KEY
      : undefined);

  const callbackParams: WSPayCallbackParams = {
    Success: successValue,
    ApprovalCode: wspayParams.ApprovalCode || wspayParams.Approvalcode,
    ShoppingCartID: wspayParams.ShoppingCartID || wspayParams.ShoppingCartId,
    Signature: wspayParams.Signature || wspayParams.signature,
    Amount: wspayParams.Amount || wspayParams.amount,
    wsPayOrderId:
      wspayParams.wsPayOrderId ||
      wspayParams.WsPayOrderId ||
      wspayParams.WSPayOrderId,
  };

  if (shopId && secretKey && isSuccessful) {
    if (!callbackParams.ApprovalCode) {
      invalidateWSPaySession(sessionId);
      return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
    }

    const isValidSignature = verifyWSPayCallbackSignature(
      callbackParams,
      shopId,
      secretKey,
    );

    if (!isValidSignature) {
      invalidateWSPaySession(sessionId);
      return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
    }
  }

  // Provera da li je ovo preautorizacija depozita i da li treba naplata ukupne cene
  const isDepositPreAuth =
    reservationData.needsTotalPayment &&
    callbackParams.Amount &&
    parseFloat(callbackParams.Amount.replace(",", ".")) ===
      reservationData.depositAmount *
        Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

  if (isDepositPreAuth && isSuccessful) {
    // Sačuvaj podatke o preautorizaciji depozita
    const depositPreAuthData = {
      wsPayOrderId: callbackParams.wsPayOrderId,
      approvalCode: callbackParams.ApprovalCode,
    };

    try {
      await sendReservationEmail(
        buildReservationEmailPayload(reservationData, {
          wsPayOrderId: depositPreAuthData.wsPayOrderId,
          approvalCode: depositPreAuthData.approvalCode,
          emailType: "deposit_pending",
          baseUrl: getBaseUrl(request),
        }),
      );
    } catch (error) {
      console.error("Failed to send deposit pending email:", error);
    }

    // Kreiraj novi shopping cart ID za naplatu ukupne cene
    const totalPaymentCartId = generateShoppingCartId();
    const totalPaymentSessionId = createWSPaySession(totalPaymentCartId, {
      ...reservationData,
      depositPreAuth: depositPreAuthData,
      isTotalPayment: true,
    });

    const baseUrl = getBaseUrl(request);
    const langCode = params.lang ?? "sr";
    const testModeEnv =
      process.env.WSPAY_TEST_MODE ||
      (typeof import.meta !== "undefined"
        ? import.meta.env?.WSPAY_TEST_MODE
        : undefined);
    const isTestMode = testModeEnv !== "false";

    const totalAmount =
      reservationData.totalPrice *
      Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

    const returnUrlTotal = ensureHttpsUrl(
      `${baseUrl}${publicPaths.wspay.success(langCode)}?sessionId=${totalPaymentSessionId}`,
      isTestMode,
    );
    const returnErrorUrlTotal = ensureHttpsUrl(
      `${baseUrl}${publicPaths.wspay.error(langCode)}?sessionId=${totalPaymentSessionId}`,
      isTestMode,
    );
    const cancelUrlTotal = ensureHttpsUrl(
      `${baseUrl}${publicPaths.wspay.cancel(langCode)}?sessionId=${totalPaymentSessionId}`,
      isTestMode,
    );

    const wspayUrl = getWSPayAuthorizationUrl(isTestMode);
    const totalPaymentFormData = createWSPayFormData({
      shopId: shopId!,
      secretKey: secretKey!,
      shoppingCartId: totalPaymentCartId,
      totalAmount,
      returnUrl: returnUrlTotal,
      returnErrorUrl: returnErrorUrlTotal,
      cancelUrl: cancelUrlTotal,
      customerFirstName: reservationData.firstName,
      customerLastName: reservationData.lastName,
      customerEmail: reservationData.customerEmail,
      customerPhone: reservationData.phone,
      lang: langCode.toUpperCase(),
      returnMethod: "GET",
      authorizationType: "Sale", // Obična naplata za ukupnu cenu
    });

    const wspayFormDataEncoded = encodeURIComponent(
      JSON.stringify({
        url: wspayUrl,
        formData: totalPaymentFormData,
      }),
    );

    // Redirectuj na naplatu ukupne cene
    return redirect(
      `${publicPaths.wspay.redirect(langCode)}?sessionId=${totalPaymentSessionId}&formData=${wspayFormDataEncoded}`,
    );
  }

  if (isSuccessful) {
    try {
      const depositPreAuth = reservationData.depositPreAuth;
      const depositWsPayOrderId =
        depositPreAuth?.wsPayOrderId || callbackParams.wsPayOrderId;
      const depositApprovalCode =
        depositPreAuth?.approvalCode || callbackParams.ApprovalCode;

      await sendCompletedReservationEmails(reservationData, {
        request,
        langParam: params.lang,
        wsPayOrderId: depositWsPayOrderId,
        approvalCode: depositApprovalCode,
      });
    } catch (error) {}

    invalidateWSPaySession(sessionId);

    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await prefs.parse(cookieHeader)) || {};
    cookie.paymentSuccessful = "true";

    return redirect(publicPaths.success(params.lang ?? "sr"), {
      headers: {
        "Set-Cookie": await prefs.serialize(cookie),
      },
    });
  } else {
    invalidateWSPaySession(sessionId);
    return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
  }
}

export function meta({ params }: Route.MetaArgs) {
  const baseUrl = getBaseUrl();
  const langCode = params.lang ?? "sr";

  return generateOpenGraphMeta({
    title: "Payment Processing",
    description: "Processing your payment",
    url: publicPaths.wspay.success(langCode),
    baseUrl,
  });
}

export default function WSPaySuccess() {
  return null;
}
