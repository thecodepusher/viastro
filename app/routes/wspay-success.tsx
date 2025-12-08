import { redirect } from "react-router";
import type { Route } from "./+types/wspay-success";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { sendReservationEmail } from "@/lib/email";

export async function action({ request, params }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  if (!cookie.wspayInProgress) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const formData = await request.formData();

  const wspayParams: Record<string, string> = {};
  formData.forEach((value, key) => {
    wspayParams[key] = value as string;
  });

  const reservationDataStr = cookie.wspayReservation;
  if (!reservationDataStr) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  let reservationData;
  try {
    reservationData = JSON.parse(reservationDataStr);
  } catch (error) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  if (wspayParams.ShoppingCartID !== reservationData.shoppingCartId) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  const successValue = wspayParams.Success || wspayParams.success;
  if (successValue !== "1" && successValue !== "true") {
    return redirect(`/${params.lang ?? "sr"}/wspay/error`);
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

  const cleanCookie: any = { ...cookie };
  delete cleanCookie.wspayReservation;
  delete cleanCookie.wspayFormData;
  delete cleanCookie.pickUpDate;
  delete cleanCookie.pickUpTime;
  delete cleanCookie.dropOffDate;
  delete cleanCookie.dropOffTime;
  delete cleanCookie.selectedCarId;
  delete cleanCookie.carId;
  delete cleanCookie.pickUpLocation;
  delete cleanCookie.dropOffLocation;
  delete cleanCookie.extras;
  cleanCookie.paymentSuccessful = "true";

  return redirect(`/${params.lang ?? "sr"}/success`, {
    headers: {
      "Set-Cookie": await prefs.serialize(cleanCookie),
    },
  });
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  if (!cookie.wspayInProgress) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const url = new URL(request.url);
  const wspayParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    wspayParams[key] = value;
  });

  if (!wspayParams.ShoppingCartID && !wspayParams.Success) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  const reservationDataStr = cookie.wspayReservation;
  if (!reservationDataStr) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  let reservationData;
  try {
    reservationData = JSON.parse(reservationDataStr);
  } catch (error) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  if (wspayParams.ShoppingCartID !== reservationData.shoppingCartId) {
    return redirect(`/${params.lang ?? "sr"}/reservation`);
  }

  const successValue = wspayParams.Success || wspayParams.success;
  const isSuccessful = successValue === "1" || successValue === "true";

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

    const cleanCookie: any = { ...cookie };
    delete cleanCookie.wspayReservation;
    delete cleanCookie.wspayFormData;
    delete cleanCookie.pickUpDate;
    delete cleanCookie.pickUpTime;
    delete cleanCookie.dropOffDate;
    delete cleanCookie.dropOffTime;
    delete cleanCookie.selectedCarId;
    delete cleanCookie.carId;
    delete cleanCookie.pickUpLocation;
    delete cleanCookie.dropOffLocation;
    delete cleanCookie.extras;
    cleanCookie.paymentSuccessful = "true";

    return redirect(`/${params.lang ?? "sr"}/success`, {
      headers: {
        "Set-Cookie": await prefs.serialize(cleanCookie),
      },
    });
  } else {
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
