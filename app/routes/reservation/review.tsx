import { prefs } from "@/lib/prefs-cookie";
import { redirect, useNavigation } from "react-router";
import { type LocaleTypes } from "@/lib/data";
import { format } from "date-fns";
import {
  calculateInWorkingHours,
  calculateRentalDays,
  calculateReservationPrice,
  fetchAllCarModels,
  getReservationDataFromCookies,
} from "@/lib/helpers";
import { getLocale } from "@/lib/utils";
import type { Route } from "./+types/review";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import {
  createWSPayFormData,
  generateShoppingCartId,
  getWSPayAuthorizationUrl,
  ensureHttpsUrl,
} from "@/lib/wspay";
import { createWSPaySession } from "@/lib/wspay-session";
import { CostSummary } from "@/components/Reservation/Review/CostSummary";
import { ReviewForm } from "@/components/Reservation/Review/ReviewForm";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  const lang = await getLocale(params.lang, request);
  const transformedCars = await fetchAllCarModels(lang);
  const reservationData = getReservationDataFromCookies(cookie);

  const car = transformedCars.find(
    (x) => x.exnternalId === reservationData.carId
  );

  if (!car) {
    return redirect("../vehicle");
  }

  const { notInWorkingHours, priceForOffHours } = calculateInWorkingHours(
    reservationData.dropoffDate,
    reservationData.pickupDate,
    reservationData.dropoffTime,
    reservationData.pickupTime
  );

  const days = calculateRentalDays(
    reservationData.pickupDate,
    reservationData.pickupTime,
    reservationData.dropoffDate,
    reservationData.dropoffTime
  );

  const { price, carPrice, depositeDiscount, extras } =
    calculateReservationPrice({
      car,
      days,
      idExtras: reservationData.extras,
      priceForOffHours,
      langCode: params.lang as LocaleTypes,
    });

  const baseUrl = getBaseUrl(request);

  return {
    depositeDiscount,
    days,
    price,
    lang,
    carPrice,
    extras,
    car,
    pickup: reservationData.pickup,
    notInWorkingHours,
    priceForOffHours,
    dropOff: reservationData.dropOff,
    pickupDate: reservationData.pickupDate,
    pickupTime: reservationData.pickupTime,
    dropoffDate: reservationData.dropoffDate,
    dropoffTime: reservationData.dropoffTime,
    langCode: params.lang ?? "sr",
    baseUrl,
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const customerEmail = formData.get("email");
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const phone = formData.get("phone");

  if (
    typeof customerEmail !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof phone !== "string"
  ) {
    return Response.json(
      { error: "Missing contact information." },
      { status: 400 }
    );
  }

  const lang = await getLocale(params.lang, request);
  const langCode = (params.lang as LocaleTypes) || "sr";

  const transformedCars = await fetchAllCarModels(lang);
  const reservationData = getReservationDataFromCookies(cookie);

  const car = transformedCars.find(
    (x) => x.exnternalId === reservationData.carId
  );

  if (!car) {
    return redirect("../vehicle");
  }

  if (
    !reservationData.pickupDate ||
    !reservationData.pickupTime ||
    !reservationData.dropoffDate ||
    !reservationData.dropoffTime
  ) {
    return Response.json(
      { error: "Reservation timing details are missing." },
      { status: 400 }
    );
  }

  const { notInWorkingHours, priceForOffHours } = calculateInWorkingHours(
    reservationData.dropoffDate,
    reservationData.pickupDate,
    reservationData.dropoffTime,
    reservationData.pickupTime
  );

  const days = calculateRentalDays(
    reservationData.pickupDate,
    reservationData.pickupTime,
    reservationData.dropoffDate,
    reservationData.dropoffTime
  );

  const { price, carPrice, depositeDiscount, extras } =
    calculateReservationPrice({
      car,
      days,
      idExtras: reservationData.extras,
      priceForOffHours,
      langCode,
    });

  const pickupDateFormatted = reservationData.pickupDate
    ? format(new Date(reservationData.pickupDate), "dd/MM/yyyy")
    : "N/A";
  const dropOffDateFormatted = reservationData.dropoffDate
    ? format(new Date(reservationData.dropoffDate), "dd/MM/yyyy")
    : "N/A";
  const depositAfterDiscount = Math.max(car.deposite - depositeDiscount, 0);

  const extrasDescriptions = extras.map(
    (extra) => `${extra.name} - ${extra.price.toFixed(2)}€`
  );
  if (notInWorkingHours && priceForOffHours > 0) {
    extrasDescriptions.push(
      `${lang.afterHoursReservationFee} - ${priceForOffHours.toFixed(2)}€`
    );
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
  const testModeEnv =
    process.env.WSPAY_TEST_MODE ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_TEST_MODE
      : undefined);
  const isTestMode = testModeEnv !== "false";

  if (!shopId || !secretKey) {
    return Response.json(
      {
        error: "Payment gateway configuration error. Please contact support.",
      },
      { status: 500 }
    );
  }

  const shoppingCartId = generateShoppingCartId();

  const baseUrl = getBaseUrl(request);

  const reservationDataObj = {
    carId: reservationData.carId,
    pickUpLocation: reservationData.pickUpLocation,
    dropOffLocation: reservationData.dropOffLocation,
    pickUpDate: reservationData.pickupDate,
    pickUpTime: reservationData.pickupTime,
    dropOffDate: reservationData.dropoffDate,
    dropOffTime: reservationData.dropoffTime,
    extras: reservationData.extras,
    extrasDescriptions,
    customerEmail,
    firstName,
    lastName,
    phone,
    shoppingCartId,
    totalPrice: price,
    carPrice,
    days,
    depositeDiscount,
    carName: car.name,
    pickupName: reservationData.pickup?.name ?? "N/A",
    dropOffName: reservationData.dropOff?.name ?? "N/A",
    pickupDateFormatted,
    dropOffDateFormatted,
    depositAfterDiscount,
    notInWorkingHours,
    carDeposit: car.deposite,
    depositAmount: depositAfterDiscount, // Iznos depozita za preautorizaciju
    needsTotalPayment: true, // Flag da treba i naplata ukupne cene
  };

  const wspayUrl = getWSPayAuthorizationUrl(isTestMode);

  const sessionId = createWSPaySession(shoppingCartId, reservationDataObj);

  const returnUrlWithSession = ensureHttpsUrl(
    `${baseUrl}/${langCode}/wspay/success?sessionId=${sessionId}`,
    isTestMode
  );
  const returnErrorUrlWithSession = ensureHttpsUrl(
    `${baseUrl}/${langCode}/wspay/error?sessionId=${sessionId}`,
    isTestMode
  );
  const cancelUrlWithSession = ensureHttpsUrl(
    `${baseUrl}/${langCode}/wspay/cancel?sessionId=${sessionId}`,
    isTestMode
  );

  // Preautorizacija za depozit
  const depositAmount =
    depositAfterDiscount * Number(process.env.WSPAY_EURO_EXCHANGE_RATE || 1);

  const wspayFormDataWithSession = createWSPayFormData({
    shopId,
    secretKey,
    shoppingCartId,
    totalAmount: depositAmount,
    returnUrl: returnUrlWithSession,
    returnErrorUrl: returnErrorUrlWithSession,
    cancelUrl: cancelUrlWithSession,
    customerFirstName: firstName,
    customerLastName: lastName,
    customerEmail,
    customerPhone: phone,
    lang: langCode.toUpperCase(),
    returnMethod: "GET",
    authorizationType: "PreAuth", // Preautorizacija umesto obične naplate
  });

  const wspayFormDataEncoded = encodeURIComponent(
    JSON.stringify({
      url: wspayUrl,
      formData: wspayFormDataWithSession,
    })
  );

  return redirect(
    `/${langCode}/wspay/redirect?sessionId=${sessionId}&formData=${wspayFormDataEncoded}`
  );
}
export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: data.lang.seoReservationReviewTitle,
    description: data.lang.seoReservationReviewDescription,
    url: `/${data.langCode || "sr"}/reservation/review`,
    baseUrl,
    keywords: data.lang.seoReservationReviewKeywords,
    imageAlt: "Viastro - Review Reservation",
  });
}

export default function Review({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="w-full mx-auto max-w-7xl">
      <CostSummary
        pickup={loaderData.pickup}
        dropOff={loaderData.dropOff}
        pickupDate={loaderData.pickupDate}
        pickupTime={loaderData.pickupTime}
        dropoffDate={loaderData.dropoffDate}
        dropoffTime={loaderData.dropoffTime}
        car={loaderData.car}
        carPrice={loaderData.carPrice}
        price={loaderData.price}
        depositeDiscount={loaderData.depositeDiscount}
        extras={loaderData.extras}
        notInWorkingHours={loaderData.notInWorkingHours}
        priceForOffHours={loaderData.priceForOffHours}
        lang={loaderData.lang}
      />

      <ReviewForm lang={loaderData.lang} isSubmitting={isSubmitting} />
    </div>
  );
}
