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
  generateShoppingCartId,
} from "@/lib/wspay";
import {
  getWSPaySession,
  invalidateWSPaySession,
  createWSPaySession,
} from "@/lib/wspay-session";
import {
  buildRentalSaleForm,
  claimRentalCart,
  clearResumeCookieHeader,
  createRentalResumeToken,
  matchResumeReservation,
  rentalResumeExpiry,
  resumeCookieHeader,
  snapshotReservation,
} from "@/lib/wspay-resume";
import {
  cancelRentalReminder,
  pickLang,
  scheduleRentalReminder,
} from "@/lib/wspay-rental-reminder";

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

function isDepositPreAuthCallback(reservationData: {
  needsTotalPayment?: boolean;
  isTotalPayment?: boolean;
}): boolean {
  // Korak je na sesiji. Iznos se ne gleda: depozit i najam mogu biti isti
  // (oba 200€ = 24.000 RSD), a WSPay iznos zna da vrati u više formata.
  return Boolean(
    reservationData.needsTotalPayment && !reservationData.isTotalPayment,
  );
}

function callbackCartId(params: Record<string, string>): string | undefined {
  return params.ShoppingCartID || params.ShoppingCartId || undefined;
}

function resolveReservation(
  request: Request,
  sessionId: string | null,
  cartId: string | undefined,
) {
  const session = getWSPaySession(sessionId);
  if (
    session?.reservationData &&
    cartId &&
    cartId === session.shoppingCartId
  ) {
    return { reservationData: session.reservationData, session };
  }

  const fromResume = cartId ? matchResumeReservation(request, cartId) : null;
  if (fromResume) {
    return { reservationData: fromResume, session };
  }

  return { reservationData: null, session };
}

async function successPageRedirect(request: Request, langCode: string) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  cookie.paymentSuccessful = "true";
  const headers = new Headers();
  headers.append("Set-Cookie", await prefs.serialize(cookie));
  headers.append("Set-Cookie", clearResumeCookieHeader());
  return redirect(publicPaths.success(langCode), { headers });
}

async function startRentalCheckout(options: {
  request: Request;
  langCode: string;
  reservationData: {
    totalPrice: number;
    firstName: string;
    lastName: string;
    customerEmail: string;
    phone: string;
    carName: string;
    pickupName: string;
    dropOffName: string;
    pickupDateFormatted: string;
    dropOffDateFormatted: string;
    pickUpTime: string;
    dropOffTime: string;
    days: number;
    carPrice: number;
    originalTotalPrice?: number;
    promoCode?: string;
    promoDiscountPercent?: number;
    promoDiscountAmount?: number;
    depositeDiscount?: number;
    depositAfterDiscount: number;
    carDeposit?: number;
    extrasDescriptions?: string[];
    lang?: string;
  };
  depositOrderId?: string;
  depositApproval?: string;
  shopId: string;
  secretKey: string;
}) {
  const cartId = generateShoppingCartId();
  const pathLang = new URL(options.request.url).pathname.split("/").filter(Boolean)[0];
  const langCode = pickLang(
    options.reservationData.lang,
    pathLang,
    options.langCode,
  );
  const token = createRentalResumeToken({
    exp: rentalResumeExpiry(),
    cartId,
    lang: langCode,
    depositOrderId: options.depositOrderId,
    depositApproval: options.depositApproval,
    reservation: snapshotReservation(options.reservationData),
  });
  const sessionId = createWSPaySession(cartId, {
    ...options.reservationData,
    depositPreAuth: {
      wsPayOrderId: options.depositOrderId,
      approvalCode: options.depositApproval,
    },
    isTotalPayment: true,
    lang: langCode,
  });
  const baseUrl = getBaseUrl(options.request);

  if (token) {
    scheduleRentalReminder({
      cartId,
      token,
      langCode,
      baseUrl,
      reservation: snapshotReservation(options.reservationData),
    });
  }

  const payment = buildRentalSaleForm({
    shopId: options.shopId,
    secretKey: options.secretKey,
    cartId,
    totalPriceEur: options.reservationData.totalPrice,
    langCode,
    baseUrl,
    sessionId,
    firstName: options.reservationData.firstName,
    lastName: options.reservationData.lastName,
    email: options.reservationData.customerEmail,
    phone: options.reservationData.phone,
  });
  const headers = new Headers();
  if (token) {
    headers.set("Set-Cookie", resumeCookieHeader(token));
  }

  return redirect(
    `${publicPaths.wspay.redirect(langCode)}?sessionId=${sessionId}&formData=${encodeURIComponent(JSON.stringify(payment))}`,
    { headers },
  );
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
    const pathLang = new URL(options.request.url).pathname
      .split("/")
      .filter(Boolean)[0];
    const lang = await getLocale(
      pickLang(reservationData.lang, options.langParam, pathLang),
      options.request,
    );
    await sendCustomerReservationEmail(payload, lang);
  } catch (error) {
    console.error("Failed to send customer reservation email:", error);
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const formData = await request.formData();

  const wspayParams: Record<string, string> = {};
  formData.forEach((value, key) => {
    wspayParams[key] = value as string;
  });

  const cartId = callbackCartId(wspayParams);
  const resolved = resolveReservation(request, sessionId, cartId);
  const reservationData = resolved.reservationData;
  if (!reservationData) {
    if (resolved.session) invalidateWSPaySession(sessionId);
    return redirect(
      resolved.session
        ? publicPaths.reservation(params.lang ?? "sr")
        : `/${params.lang ?? "sr"}`,
    );
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

  // Prva uplata je preautorizacija depozita. Druga (isTotalPayment) je naplata najma,
  // čak i kad je iznos isti kao depozit.
  const isDepositPreAuth = isDepositPreAuthCallback(reservationData);

  if (isDepositPreAuth && successValue === "1") {
    invalidateWSPaySession(sessionId);

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

    if (!shopId || !secretKey) {
      return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
    }

    return startRentalCheckout({
      request,
      langCode: params.lang ?? "sr",
      reservationData,
      depositOrderId: depositPreAuthData.wsPayOrderId,
      depositApproval: depositPreAuthData.approvalCode,
      shopId,
      secretKey,
    });
  }

  // Ako je ovo naplata ukupne cene ili samo preautorizacija bez naplate
  invalidateWSPaySession(sessionId);

  const rentalCart = callbackParams.ShoppingCartID || "";
  if (rentalCart) cancelRentalReminder(rentalCart);
  if (!rentalCart || claimRentalCart(rentalCart)) {
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
  }

  return successPageRedirect(request, params.lang ?? "sr");
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  const wspayParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    wspayParams[key] = value;
  });

  const cartId = callbackCartId(wspayParams);
  const resolved = resolveReservation(request, sessionId, cartId);
  const reservationData = resolved.reservationData;

  if (!cartId && !wspayParams.Success && !wspayParams.success) {
    if (resolved.session) invalidateWSPaySession(sessionId);
    return redirect(publicPaths.reservation(params.lang ?? "sr"));
  }

  if (!reservationData) {
    if (resolved.session) invalidateWSPaySession(sessionId);
    return redirect(
      resolved.session
        ? publicPaths.reservation(params.lang ?? "sr")
        : `/${params.lang ?? "sr"}`,
    );
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

  // Prva uplata je preautorizacija depozita. Druga (isTotalPayment) je naplata najma,
  // čak i kad je iznos isti kao depozit.
  const isDepositPreAuth = isDepositPreAuthCallback(reservationData);

  if (isDepositPreAuth && isSuccessful) {
    invalidateWSPaySession(sessionId);

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

    if (!shopId || !secretKey) {
      return redirect(publicPaths.wspay.error(params.lang ?? "sr"));
    }

    return startRentalCheckout({
      request,
      langCode: params.lang ?? "sr",
      reservationData,
      depositOrderId: depositPreAuthData.wsPayOrderId,
      depositApproval: depositPreAuthData.approvalCode,
      shopId,
      secretKey,
    });
  }

  if (isSuccessful) {
    invalidateWSPaySession(sessionId);

    const rentalCart = callbackParams.ShoppingCartID || "";
    if (rentalCart) cancelRentalReminder(rentalCart);
    if (!rentalCart || claimRentalCart(rentalCart)) {
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
    }

    return successPageRedirect(request, params.lang ?? "sr");
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
