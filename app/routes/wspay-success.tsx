import { redirect } from "react-router";
import type { Route } from "./+types/wspay-success";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { sendReservationEmail } from "@/lib/email";
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
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  const reservationData = session.reservationData;
  if (!reservationData) {
    invalidateWSPaySession(sessionId);
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  const successValue = wspayParams.Success || wspayParams.success;
  if (successValue !== "1" && successValue !== "true") {
    return redirect(`/${params.lang ?? "sr"}/wspay/error`);
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
    wsPayOrderId: wspayParams.wsPayOrderId || wspayParams.WsPayOrderId || wspayParams.WSPayOrderId,
  };

  if (shopId && secretKey) {
    if (successValue === "1" && !callbackParams.ApprovalCode) {
      console.error(
        "WSPay Success: ApprovalCode is missing for successful transaction"
      );
      return redirect(`/${params.lang ?? "sr"}/wspay/error`);
    }

    const isValidSignature = verifyWSPayCallbackSignature(
      callbackParams,
      shopId,
      secretKey
    );

    if (!isValidSignature) {
      console.error("WSPay Success: Invalid signature verification");
      return redirect(`/${params.lang ?? "sr"}/wspay/error`);
    }
  }

  // Provera da li je ovo preautorizacija depozita i da li treba naplata ukupne cene
  const isDepositPreAuth = reservationData.needsTotalPayment && 
                           callbackParams.Amount && 
                           parseFloat(callbackParams.Amount.replace(",", ".")) === 
                           (reservationData.depositAmount * Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1));

  if (isDepositPreAuth && successValue === "1") {
    // Sačuvaj podatke o preautorizaciji depozita
    const depositPreAuthData = {
      wsPayOrderId: callbackParams.wsPayOrderId,
      approvalCode: callbackParams.ApprovalCode,
    };

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

    const totalAmount = reservationData.totalPrice * Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

    const returnUrlTotal = ensureHttpsUrl(
      `${baseUrl}/${langCode}/wspay/success?sessionId=${totalPaymentSessionId}`,
      isTestMode
    );
    const returnErrorUrlTotal = ensureHttpsUrl(
      `${baseUrl}/${langCode}/wspay/error?sessionId=${totalPaymentSessionId}`,
      isTestMode
    );
    const cancelUrlTotal = ensureHttpsUrl(
      `${baseUrl}/${langCode}/wspay/cancel?sessionId=${totalPaymentSessionId}`,
      isTestMode
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
      })
    );

    // Redirectuj na naplatu ukupne cene
    return redirect(
      `/${langCode}/wspay/redirect?sessionId=${totalPaymentSessionId}&formData=${wspayFormDataEncoded}`
    );
  }

  // Ako je ovo naplata ukupne cene ili samo preautorizacija bez naplate
  try {
    const extrasDescriptions = reservationData.extrasDescriptions || [];
    const approvalCode = callbackParams.ApprovalCode;
    const wsPayOrderId = callbackParams.wsPayOrderId;

    // Ako postoji preautorizacija depozita, koristi te podatke za email
    const depositPreAuth = reservationData.depositPreAuth;
    const depositWsPayOrderId = depositPreAuth?.wsPayOrderId || wsPayOrderId;
    const depositApprovalCode = depositPreAuth?.approvalCode || approvalCode;

    const baseUrl = getBaseUrl(request);

    await sendReservationEmail({
      carName: reservationData.carName,
      pickupSummary: `${reservationData.pickupName} ${reservationData.pickupDateFormatted} - ${reservationData.pickUpTime}`,
      dropoffSummary: `${reservationData.dropOffName} ${reservationData.dropOffDateFormatted} - ${reservationData.dropOffTime}`,
      days: reservationData.days,
      carPrice: reservationData.carPrice,
      totalPrice: reservationData.totalPrice,
      carDeposit:
        reservationData.carDeposit ||
        reservationData.depositAfterDiscount + reservationData.depositeDiscount,
      depositDiscount: reservationData.depositeDiscount,
      depositDue: reservationData.depositAfterDiscount,
      extrasDescriptions,
      customerName: `${reservationData.firstName} ${reservationData.lastName}`,
      customerEmail: reservationData.customerEmail,
      customerPhone: reservationData.phone,
      wsPayOrderId: depositWsPayOrderId, // Podaci o preautorizaciji depozita
      approvalCode: depositApprovalCode, // Podaci o preautorizaciji depozita
      baseUrl,
    });
  } catch (error) {
    console.error(error);
  }

  invalidateWSPaySession(sessionId);

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  cookie.paymentSuccessful = "true";

  return redirect(`/${params.lang ?? "sr"}/success`, {
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
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  if (wspayParams.ShoppingCartID !== session.shoppingCartId) {
    invalidateWSPaySession(sessionId);
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  const reservationData = session.reservationData;
  if (!reservationData) {
    invalidateWSPaySession(sessionId);
    return redirect(`/${params.lang ?? "sr"}/reservation`);
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
    wsPayOrderId: wspayParams.wsPayOrderId || wspayParams.WsPayOrderId || wspayParams.WSPayOrderId,
  };

  if (shopId && secretKey && isSuccessful) {
    if (!callbackParams.ApprovalCode) {
      invalidateWSPaySession(sessionId);
      return redirect(`/${params.lang ?? "sr"}/wspay/error`);
    }

    const isValidSignature = verifyWSPayCallbackSignature(
      callbackParams,
      shopId,
      secretKey
    );

    if (!isValidSignature) {
      invalidateWSPaySession(sessionId);
      return redirect(`/${params.lang ?? "sr"}/wspay/error`);
    }
  }

  // Provera da li je ovo preautorizacija depozita i da li treba naplata ukupne cene
  const isDepositPreAuth = reservationData.needsTotalPayment && 
                           callbackParams.Amount && 
                           parseFloat(callbackParams.Amount.replace(",", ".")) === 
                           (reservationData.depositAmount * Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1));

  if (isDepositPreAuth && isSuccessful) {
    // Sačuvaj podatke o preautorizaciji depozita
    const depositPreAuthData = {
      wsPayOrderId: callbackParams.wsPayOrderId,
      approvalCode: callbackParams.ApprovalCode,
    };

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

    const totalAmount = reservationData.totalPrice * Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

    const returnUrlTotal = ensureHttpsUrl(
      `${baseUrl}/${langCode}/wspay/success?sessionId=${totalPaymentSessionId}`,
      isTestMode
    );
    const returnErrorUrlTotal = ensureHttpsUrl(
      `${baseUrl}/${langCode}/wspay/error?sessionId=${totalPaymentSessionId}`,
      isTestMode
    );
    const cancelUrlTotal = ensureHttpsUrl(
      `${baseUrl}/${langCode}/wspay/cancel?sessionId=${totalPaymentSessionId}`,
      isTestMode
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
      })
    );

    // Redirectuj na naplatu ukupne cene
    return redirect(
      `/${langCode}/wspay/redirect?sessionId=${totalPaymentSessionId}&formData=${wspayFormDataEncoded}`
    );
  }

  if (isSuccessful) {
    try {
      const extrasDescriptions = reservationData.extrasDescriptions || [];

      // Ako postoji preautorizacija depozita, koristi te podatke za email
      const depositPreAuth = reservationData.depositPreAuth;
      const depositWsPayOrderId = depositPreAuth?.wsPayOrderId || callbackParams.wsPayOrderId;
      const depositApprovalCode = depositPreAuth?.approvalCode || callbackParams.ApprovalCode;

      const baseUrl = getBaseUrl(request);

      await sendReservationEmail({
        carName: reservationData.carName,
        pickupSummary: `${reservationData.pickupName} ${reservationData.pickupDateFormatted} - ${reservationData.pickUpTime}`,
        dropoffSummary: `${reservationData.dropOffName} ${reservationData.dropOffDateFormatted} - ${reservationData.dropOffTime}`,
        days: reservationData.days,
        carPrice: reservationData.carPrice,
        totalPrice: reservationData.totalPrice,
        carDeposit:
          reservationData.carDeposit ||
          reservationData.depositAfterDiscount +
            reservationData.depositeDiscount,
        depositDiscount: reservationData.depositeDiscount,
        depositDue: reservationData.depositAfterDiscount,
        extrasDescriptions,
        customerName: `${reservationData.firstName} ${reservationData.lastName}`,
        customerEmail: reservationData.customerEmail,
        customerPhone: reservationData.phone,
        wsPayOrderId: depositWsPayOrderId, // Podaci o preautorizaciji depozita
        approvalCode: depositApprovalCode, // Podaci o preautorizaciji depozita
        baseUrl,
      });
    } catch (error) {}

    invalidateWSPaySession(sessionId);

    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await prefs.parse(cookieHeader)) || {};
    cookie.paymentSuccessful = "true";

    return redirect(`/${params.lang ?? "sr"}/success`, {
      headers: {
        "Set-Cookie": await prefs.serialize(cookie),
      },
    });
  } else {
    invalidateWSPaySession(sessionId);
    return redirect(`/${params.lang ?? "sr"}/wspay/error`);
  }
}

export function meta({ params }: Route.MetaArgs) {
  const baseUrl = getBaseUrl();
  const langCode = params.lang ?? "sr";

  return generateOpenGraphMeta({
    title: "Payment Processing",
    description: "Processing your payment",
    url: `/${langCode}/wspay/success`,
    baseUrl,
  });
}

export default function WSPaySuccess() {
  return null;
}
