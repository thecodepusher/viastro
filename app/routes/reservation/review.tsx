import { prefs } from "@/lib/prefs-cookie";
import { redirect, useNavigation } from "react-router";
import {
  getAditionalEquipment,
  locations,
  PRICE_FOR_PICKUP_OFF_HOURS,
  type LocaleTypes,
} from "@/lib/data";
import { transformApiCars, type ApiAllModelsResponse } from "@/lib/api-cars";
import { differenceInMinutes, format, set } from "date-fns";
import { calculateInWorkingHours } from "@/lib/helpers";
import { getLocale, getDatabaseUrl } from "@/lib/utils";
import type { Route } from "./+types/review";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import {
  createWSPayFormData,
  generateShoppingCartId,
  getWSPayAuthorizationUrl,
} from "@/lib/wspay";
import { CostSummary } from "@/components/Reservation/Review/CostSummary";
import { ReviewForm } from "@/components/Reservation/Review/ReviewForm";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");

  const lang = await getLocale(params.lang, request);
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const databaseUrl = getDatabaseUrl();

  const res = await fetch(databaseUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });
  const apiResponse: ApiAllModelsResponse = await res.json();
  const transformedCars = transformApiCars(apiResponse, lang);
  const car = transformedCars.find((x) => x.exnternalId === cookie.carId);
  const pickup = locations.find((x) => x.id === +cookie.pickUpLocation);
  const dropOff = locations.find((x) => x.id === +cookie.dropOffLocation);
  const pickupDate = cookie.pickUpDate;
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = cookie.dropOffDate;
  const dropoffTime = cookie.dropOffTime;

  if (!car) {
    return redirect("../vehicle");
  }

  let notInWorkingHours = calculateInWorkingHours(
    dropoffDate,
    pickupDate,
    dropoffTime,
    pickupTime
  );

  let price = 0;

  const pickupDateAndTime = set(new Date(pickupDate), {
    hours: pickupTime.split(":")[0],
    minutes: pickupTime.split(":")[1],
    seconds: 0,
    milliseconds: 0,
  });

  const dropOffDateAndTime = set(new Date(dropoffDate), {
    hours: dropoffTime.split(":")[0],
    minutes: dropoffTime.split(":")[1],
    seconds: 0,
    milliseconds: 0,
  });

  const days = Math.ceil(
    differenceInMinutes(dropOffDateAndTime, pickupDateAndTime) / 1440
  );

  let carPrice = 0;

  for (let price of car.prices) {
    if (!price.to) {
      carPrice = days * price.price;
      break;
    }

    if (days >= price.from && days <= price.to) {
      carPrice = price.price * days;
      break;
    }
  }

  price += carPrice;

  const idExtras = cookie.extras as string;

  let extras: { id: number; name: string; price: number; perDay: boolean }[] =
    [];

  if (notInWorkingHours) {
    price += PRICE_FOR_PICKUP_OFF_HOURS;
  }

  let depositeDiscount = 0;
  if (idExtras) {
    const ae = [
      ...car.aditionalEquipment,
      ...getAditionalEquipment(params.lang as LocaleTypes),
    ];

    idExtras
      .split(",")
      .map((x) => +x)
      .forEach((x) => {
        const a = ae.find((a) => a.id == x)!;

        depositeDiscount += a.depositeDiscount;
        let aPrice = 0;

        if (a.perDay) {
          if (a.maxPerDays && a.maxPerDays < days) {
            aPrice = a.price * a.maxPerDays;
          } else {
            aPrice = days * a.price;
          }
        } else {
          aPrice = a.price;
        }

        price += aPrice;

        extras.push({ ...a, price: aPrice });
      });
  }

  const baseUrl = getBaseUrl(request);

  return {
    depositeDiscount,
    days,
    price,
    lang,
    carPrice,
    extras,
    car,
    pickup,
    notInWorkingHours,
    dropOff,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
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

  const databaseUrl = getDatabaseUrl();

  const res = await fetch(databaseUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });
  const apiResponse: ApiAllModelsResponse = await res.json();

  const lang = await getLocale(params.lang, request);
  const langCode = (params.lang as LocaleTypes) || "sr";

  const transformedCars = transformApiCars(apiResponse, lang);
  const car = transformedCars.find((x) => x.exnternalId === cookie.carId);

  const pickupDate = cookie.pickUpDate;
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = cookie.dropOffDate;
  const dropoffTime = cookie.dropOffTime;
  const pickup = locations.find(
    (location) => location.id === +cookie.pickUpLocation
  );
  const dropOff = locations.find(
    (location) => location.id === +cookie.dropOffLocation
  );

  if (!car) {
    return redirect("../vehicle");
  }

  if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
    return Response.json(
      { error: "Reservation timing details are missing." },
      { status: 400 }
    );
  }

  let notInWorkingHours = calculateInWorkingHours(
    dropoffDate,
    pickupDate,
    dropoffTime,
    pickupTime
  );

  let price = 0;
  let depositeDiscount = 0;

  const pickupDateAndTime = set(new Date(pickupDate), {
    hours: pickupTime.split(":")[0],
    minutes: pickupTime.split(":")[1],
    seconds: 0,
    milliseconds: 0,
  });

  const dropOffDateAndTime = set(new Date(dropoffDate), {
    hours: dropoffTime.split(":")[0],
    minutes: dropoffTime.split(":")[1],
    seconds: 0,
    milliseconds: 0,
  });

  const days = Math.ceil(
    differenceInMinutes(dropOffDateAndTime, pickupDateAndTime) / 1440
  );

  let carPrice = 0;

  for (let price of car.prices) {
    if (!price.to) {
      carPrice = days * price.price;
      break;
    }

    if (days >= price.from && days <= price.to) {
      carPrice = price.price * days;
      break;
    }
  }

  price += carPrice;

  const idExtras = cookie.extras as string;

  let extras: { id: number; name: string; price: number }[] = [];

  if (notInWorkingHours) {
    price += PRICE_FOR_PICKUP_OFF_HOURS;
  }

  if (idExtras) {
    const ae = [...car.aditionalEquipment, ...getAditionalEquipment(langCode)];

    idExtras
      .split(",")
      .map((x) => +x)
      .forEach((x) => {
        const a = ae.find((a) => a.id == x);
        if (!a) {
          return;
        }

        depositeDiscount += a.depositeDiscount;
        let aPrice = 0;

        if (a.perDay) {
          if (a.maxPerDays && a.maxPerDays < days) {
            aPrice = a.price * a.maxPerDays;
          } else {
            aPrice = days * a.price;
          }
        } else {
          aPrice = a.price;
        }

        price += aPrice;

        extras.push({ ...a, price: aPrice });
      });
  }

  const pickupDateFormatted = pickupDate
    ? format(new Date(pickupDate), "dd/MM/yyyy")
    : "N/A";
  const dropOffDateFormatted = dropoffDate
    ? format(new Date(dropoffDate), "dd/MM/yyyy")
    : "N/A";
  const depositAfterDiscount = Math.max(car.deposite - depositeDiscount, 0);

  const extrasDescriptions = extras.map(
    (extra) => `${extra.name} - ${extra.price.toFixed(2)}€`
  );
  if (notInWorkingHours) {
    extrasDescriptions.push(
      `${lang.afterHoursReservationFee} - ${PRICE_FOR_PICKUP_OFF_HOURS.toFixed(
        2
      )}€`
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

  const reservationData = {
    carId: cookie.carId,
    pickUpLocation: cookie.pickUpLocation,
    dropOffLocation: cookie.dropOffLocation,
    pickUpDate: pickupDate,
    pickUpTime: pickupTime,
    dropOffDate: dropoffDate,
    dropOffTime: dropoffTime,
    extras: idExtras,
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
    pickupName: pickup?.name ?? "N/A",
    dropOffName: dropOff?.name ?? "N/A",
    pickupDateFormatted,
    dropOffDateFormatted,
    depositAfterDiscount,
    notInWorkingHours,
    carDeposit: car.deposite,
  };

  const returnUrl = `${baseUrl}/${langCode}/wspay/success`;
  const returnErrorUrl = `${baseUrl}/${langCode}/wspay/error`;
  const cancelUrl = `${baseUrl}/${langCode}/wspay/cancel`;

  const wspayFormData = createWSPayFormData({
    shopId,
    secretKey,
    shoppingCartId,
    totalAmount: price,
    returnUrl,
    returnErrorUrl,
    cancelUrl,
    customerFirstName: firstName,
    customerLastName: lastName,
    customerEmail,
    customerPhone: phone,
    lang: langCode.toUpperCase(),
    returnMethod: "GET",
  });

  const wspayUrl = getWSPayAuthorizationUrl(isTestMode);

  const updatedCookie = {
    ...cookie,
    wspayReservation: JSON.stringify(reservationData),
    wspayInProgress: "true",
  };

  updatedCookie.wspayFormData = JSON.stringify({
    url: wspayUrl,
    formData: wspayFormData,
  });

  return redirect(`/${langCode}/wspay/redirect`, {
    headers: {
      "Set-Cookie": await prefs.serialize(updatedCookie),
    },
  });
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
        lang={loaderData.lang}
      />

      <ReviewForm lang={loaderData.lang} isSubmitting={isSubmitting} />
    </div>
  );
}
