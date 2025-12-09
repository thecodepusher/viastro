import {
  wokringHours,
  PRICE_FOR_PICKUP_OFF_HOURS,
  getAditionalEquipment,
  locations,
  type LocaleTypes,
} from "./data";
import { differenceInMinutes, set } from "date-fns";
import type { TransformedCar } from "./api-cars";
import { getDatabaseUrl } from "./utils";
import { transformApiCars, type ApiAllModelsResponse } from "./api-cars";
import type { BaseLocale } from "@/locales/base-locale";

export function calculateInWorkingHours(
  d: any,
  p: any,
  dropoffTime: any,
  pickupTime: any
) {
  const dropoffDay = new Date(d).getDay();
  const pickupDay = new Date(p).getDay();

  const dropoffWorkingHour = wokringHours[dropoffDay];
  const pickupWorkingHour = wokringHours[pickupDay];

  let notInWorkingHours = true;

  if (
    +dropoffTime.split(":")[0] * 60 + +dropoffTime.split(":")[1] >
      +dropoffWorkingHour.from.split(":")[0] * 60 +
        +dropoffWorkingHour.from.split(":")[1] &&
    +dropoffTime.split(":")[0] * 60 + +dropoffTime.split(":")[1] <
      +dropoffWorkingHour.to.split(":")[0] * 60 +
        +dropoffWorkingHour.to.split(":")[1] &&
    +pickupTime.split(":")[0] * 60 + +pickupTime.split(":")[1] >
      +pickupWorkingHour.from.split(":")[0] * 60 +
        +pickupWorkingHour.from.split(":")[1] &&
    +pickupTime.split(":")[0] * 60 + +pickupTime.split(":")[1] <
      +pickupWorkingHour.to.split(":")[0] * 60 +
        +pickupWorkingHour.to.split(":")[1]
  ) {
    notInWorkingHours = false;
  }

  return notInWorkingHours;
}

export function calculateRentalDays(
  pickupDate: string,
  pickupTime: string,
  dropoffDate: string,
  dropoffTime: string
): number {
  const pickupDateAndTime = set(new Date(pickupDate), {
    hours: parseInt(pickupTime.split(":")[0], 10),
    minutes: parseInt(pickupTime.split(":")[1], 10),
    seconds: 0,
    milliseconds: 0,
  });

  const dropOffDateAndTime = set(new Date(dropoffDate), {
    hours: parseInt(dropoffTime.split(":")[0], 10),
    minutes: parseInt(dropoffTime.split(":")[1], 10),
    seconds: 0,
    milliseconds: 0,
  });

  return Math.ceil(
    differenceInMinutes(dropOffDateAndTime, pickupDateAndTime) / 1440
  );
}

export function calculateCarPrice(car: TransformedCar, days: number): number {
  let carPrice = 0;

  for (const price of car.prices) {
    if (!price.to) {
      carPrice = days * price.price;
      break;
    }

    if (days >= price.from && days <= price.to) {
      carPrice = price.price * days;
      break;
    }
  }

  return carPrice;
}

export function calculateReservationPrice(params: {
  car: TransformedCar;
  days: number;
  idExtras: string | null | undefined;
  notInWorkingHours: boolean;
  langCode: LocaleTypes;
}): {
  price: number;
  carPrice: number;
  depositeDiscount: number;
  extras: Array<{ id: number; name: string; price: number; perDay: boolean }>;
} {
  const { car, days, idExtras, notInWorkingHours, langCode } = params;

  let price = 0;
  let depositeDiscount = 0;
  const extras: Array<{
    id: number;
    name: string;
    price: number;
    perDay: boolean;
  }> = [];

  const carPrice = calculateCarPrice(car, days);
  price += carPrice;

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

  return {
    price,
    carPrice,
    depositeDiscount,
    extras,
  };
}

export async function fetchAllCarModels(
  lang: BaseLocale
): Promise<TransformedCar[]> {
  const databaseUrl = getDatabaseUrl();

  const res = await fetch(databaseUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });

  const apiResponse: ApiAllModelsResponse = await res.json();
  return transformApiCars(apiResponse, lang);
}

export function getReservationDataFromCookies(cookie: Record<string, any>): {
  carId: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  pickUpLocation: string;
  dropOffLocation: string;
  extras: string | null;
  pickup: (typeof locations)[number] | undefined;
  dropOff: (typeof locations)[number] | undefined;
} {
  return {
    carId: cookie.carId,
    pickupDate: cookie.pickUpDate,
    pickupTime: cookie.pickUpTime,
    dropoffDate: cookie.dropOffDate,
    dropoffTime: cookie.dropOffTime,
    pickUpLocation: cookie.pickUpLocation,
    dropOffLocation: cookie.dropOffLocation,
    extras: cookie.extras as string | null,
    pickup: locations.find((x) => x.id === +cookie.pickUpLocation),
    dropOff: locations.find((x) => x.id === +cookie.dropOffLocation),
  };
}
