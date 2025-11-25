import { prefs } from "@/lib/prefs-cookie";
import { Form, Link, redirect } from "react-router";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  aditionalEquipment,
  getAditionalEquipment,
  locations,
  PRICE_FOR_PICKUP_OFF_HOURS,
  type LocaleTypes,
} from "@/lib/data";
import { transformApiCars, type ApiAllModelsResponse } from "@/lib/api-cars";
import { differenceInMinutes, format, set } from "date-fns";
import { calculateInWorkingHours } from "@/lib/helpers";
import { getLocale } from "@/lib/utils";
import type { Route } from "./+types/review";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { sendReservationEmail } from "@/lib/email";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");

  const lang = await getLocale(params.lang, request);

  const cookie = (await prefs.parse(cookieHeader)) || {};

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
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

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
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

  const afterHoursFee = notInWorkingHours ? PRICE_FOR_PICKUP_OFF_HOURS : 0;

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

  try {
    await sendReservationEmail({
      carName: car.name,
      pickupSummary: `${pickup?.name ?? "N/A"} ${pickupDateFormatted} - ${
        pickupTime ?? ""
      }`,
      dropoffSummary: `${dropOff?.name ?? "N/A"} ${dropOffDateFormatted} - ${
        dropoffTime ?? ""
      }`,
      days,
      carPrice,
      totalPrice: price,
      carDeposit: car.deposite,
      depositDiscount: depositeDiscount,
      depositDue: depositAfterDiscount,
      extrasDescriptions,
      customerName: `${firstName} ${lastName}`,
      customerEmail,
      customerPhone: phone,
    });
  } catch (error) {
    console.error("Brevo email error", error);
    return Response.json(
      { error: "Unable to send confirmation email." },
      { status: 502 }
    );
  }

  return redirect("../../success", {
    headers: {
      "Set-Cookie": await prefs.serialize({}),
    },
  });
}
export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: "Reservation - Review & Confirm | Viastro Rent a Car",
    description:
      "Review your car rental reservation details and confirm your booking in Belgrade.",
    url: `/${data.langCode || "sr"}/reservation/review`,
    baseUrl,
    keywords: "reservation, review, confirm booking, rent a car Belgrade",
    imageAlt: "Viastro - Review Reservation",
  });
}

export default function Review({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <h3 className="mx-6 my-4 font-bold text-xl">
        {loaderData.lang.costSummary}
      </h3>
      <div className="mx-6 p-4 border rounded shadow flex gap-2 flex-col">
        <div>
          <Label>{loaderData.lang.pickUpLoacation}</Label>
          <p>
            {loaderData.pickup?.name}{" "}
            {format(loaderData.pickupDate, "dd/MM/yyyy")} -{" "}
            {loaderData.pickupTime}
          </p>
        </div>
        <div>
          <Label>{loaderData.lang.dropOffLoacation}</Label>
          <p>
            {loaderData.dropOff?.name}{" "}
            {format(loaderData.dropoffDate, "dd/MM/yyyy")} -{" "}
            {loaderData.dropoffTime}
          </p>
        </div>
        <div>
          <Label>{loaderData.lang.vehicles}</Label>
          <p>
            {loaderData.car?.name}
            {" - "}
            <span className="font-bold text-s text-lg">
              {loaderData.carPrice.toFixed(2)}€
            </span>
          </p>
        </div>

        {(loaderData.extras.length > 0 || loaderData.notInWorkingHours) && (
          <div>
            <Label className="">{loaderData.lang.accessories}</Label>

            <div className="flex flex-col ">
              {loaderData.notInWorkingHours && (
                <div>
                  {loaderData.lang.afterHoursReservationFee}
                  {" - "}
                  <span className="font-bold text-s text-lg">
                    {PRICE_FOR_PICKUP_OFF_HOURS}€
                  </span>
                </div>
              )}

              {loaderData.extras.map((extra) => (
                <div key={`ext-${extra.id}`}>
                  {extra.name}
                  {" - "}
                  <span className="font-bold text-s text-lg">
                    {extra.price.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Total</Label>
          <p className="font-bold text-s text-lg">
            {loaderData.price.toFixed(2)}€
          </p>
        </div>

        <div>
          <Label>{loaderData.lang.deposit}</Label>
          <p>
            <span className="font-bold text-s text-lg">
              {loaderData.depositeDiscount == 0 && (
                <span>{loaderData.car.deposite}€</span>
              )}

              {loaderData.depositeDiscount > 0 && (
                <span>
                  <span className="line-through text-gray-400">
                    {loaderData.car.deposite}€
                  </span>{" "}
                  <span>
                    {loaderData.car.deposite - loaderData.depositeDiscount}€
                  </span>
                </span>
              )}
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            <Info size={20} className="float-left mr-1 text-p" />
            {loaderData.lang.conversionStatement}
          </p>
        </div>
      </div>

      <h3 className="mx-6 my-4 font-bold text-xl">
        {loaderData.lang.reviewInformation}
      </h3>

      <Form method="POST">
        <div className="mx-6 mt-4 p-4 border rounded shadow flex flex-col gap-4 mb-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{loaderData.lang.email}</Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder={loaderData.lang.email}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="first_name">{loaderData.lang.firstName}</Label>
            <Input
              required
              type="text"
              id="first_name"
              name="first_name"
              placeholder={loaderData.lang.firstName}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="last_name">{loaderData.lang.lastName}</Label>
            <Input
              required
              type="text"
              id="last_name"
              name="last_name"
              placeholder={loaderData.lang.lastName}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone">{loaderData.lang.phone}</Label>
            <Input
              required
              type="phone"
              id="phone"
              name="phone"
              placeholder={loaderData.lang.phone}
            />
          </div>

          <div className="items-top flex space-x-2">
            <Checkbox required id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <Link target="_blank" to="/privacy-policy">
                <p className="text-sm text-muted-foreground">
                  {loaderData.lang.privacyAgreement}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex mx-6 mb-6">
          <Button
            type="submit"
            className="w-full max-w-sm bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed">
            {loaderData.lang.reservationReviewAction}
          </Button>
        </div>
      </Form>
    </div>
  );
}
