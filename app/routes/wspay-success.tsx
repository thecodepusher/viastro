import { redirect } from "react-router";
import type { Route } from "./+types/wspay-success";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { sendReservationEmail } from "@/lib/email";
import {
  verifyWSPayCallbackSignature,
  type WSPayCallbackParams,
} from "@/lib/wspay";
import {
  getWSPaySession,
  getSessionIdFromUrl,
  invalidateWSPaySession,
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

  if (shopId && secretKey) {
    const callbackParams: WSPayCallbackParams = {
      Success: successValue,
      ApprovalCode: wspayParams.ApprovalCode || wspayParams.Approvalcode,
      ShoppingCartID: wspayParams.ShoppingCartID || wspayParams.ShoppingCartId,
      Signature: wspayParams.Signature || wspayParams.signature,
      Amount: wspayParams.Amount || wspayParams.amount,
    };

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

  try {
    const extrasDescriptions = reservationData.extrasDescriptions || [];

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

  if (shopId && secretKey && isSuccessful) {
    const callbackParams: WSPayCallbackParams = {
      Success: successValue,
      ApprovalCode: wspayParams.ApprovalCode || wspayParams.Approvalcode,
      ShoppingCartID: wspayParams.ShoppingCartID || wspayParams.ShoppingCartId,
      Signature: wspayParams.Signature || wspayParams.signature,
      Amount: wspayParams.Amount || wspayParams.amount,
    };

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

  if (isSuccessful) {
    try {
      const extrasDescriptions = reservationData.extrasDescriptions || [];

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
