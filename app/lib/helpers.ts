import {
  wokringHours,
  PRICE_FOR_PICKUP_OFF_HOURS,
  getAditionalEquipment,
  locations,
  type LocaleTypes,
} from "./data";
import { differenceInMinutes, format, set } from "date-fns";
import type { DayPriceTier, TransformedCar } from "./api-cars";
import { getDatabaseUrl } from "./utils";
import {
  ALLOWED_CAR_IDS,
  transformApiCars,
  type ApiAllModelsResponse,
} from "./api-cars";
import type { BaseLocale } from "@/locales/base-locale";

const MANAGER_API_KEY = "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121";
const PRICE_TIER_CACHE_MS = 30 * 60 * 1000;

export type WorkingHoursCheck = {
  notInWorkingHours: boolean;
  priceForOffHours: number;
  pickupOutsideHours: boolean;
  dropoffOutsideHours: boolean;
};

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return Number.NaN;
  return hours * 60 + minutes;
}

function isInWorkingHours(day: number, time: string): boolean {
  const hours = wokringHours[day];
  if (!hours) return false;

  const value = timeToMinutes(time);
  if (!Number.isFinite(value)) return false;

  return value >= timeToMinutes(hours.from) && value <= timeToMinutes(hours.to);
}

export function calculateInWorkingHours(
  dropoffDate: string,
  pickupDate: string,
  dropoffTime: string,
  pickupTime: string,
): WorkingHoursCheck {
  const dropoffOutsideHours = !isInWorkingHours(
    new Date(dropoffDate).getDay(),
    dropoffTime,
  );
  const pickupOutsideHours = !isInWorkingHours(
    new Date(pickupDate).getDay(),
    pickupTime,
  );
  const outsideCount =
    Number(pickupOutsideHours) + Number(dropoffOutsideHours);

  return {
    notInWorkingHours: outsideCount > 0,
    priceForOffHours: PRICE_FOR_PICKUP_OFF_HOURS * outsideCount,
    pickupOutsideHours,
    dropoffOutsideHours,
  };
}

export const MIN_RENTAL_MINUTES = 30;

function dateAtTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
  return set(date, {
    hours: Number.isFinite(hours) ? hours : 0,
    minutes: Number.isFinite(minutes) ? minutes : 0,
    seconds: 0,
    milliseconds: 0,
  });
}

export function rentalMinutesBetween(
  pickupDate: Date,
  pickupTime: string,
  dropoffDate: Date,
  dropoffTime: string,
): number {
  return differenceInMinutes(
    dateAtTime(dropoffDate, dropoffTime),
    dateAtTime(pickupDate, pickupTime),
  );
}

export function meetsMinimumRental(
  pickupDate: string,
  pickupTime: string,
  dropoffDate: string,
  dropoffTime: string,
): boolean {
  return (
    rentalMinutesBetween(
      new Date(pickupDate),
      pickupTime,
      new Date(dropoffDate),
      dropoffTime,
    ) >= MIN_RENTAL_MINUTES
  );
}

export function calculateRentalDays(
  pickupDate: string,
  pickupTime: string,
  dropoffDate: string,
  dropoffTime: string
): number {
  return Math.ceil(
    rentalMinutesBetween(
      new Date(pickupDate),
      pickupTime,
      new Date(dropoffDate),
      dropoffTime,
    ) / 1440,
  );
}

export function calculateCarPrice(car: TransformedCar, days: number): number {
  const tiers = [...car.prices].sort((a, b) => a.from - b.from);
  if (tiers.length === 0 || days <= 0) return 0;

  for (const tier of tiers) {
    const upper = tier.to ?? Number.POSITIVE_INFINITY;
    if (days >= tier.from && days <= upper) {
      return days * tier.price;
    }
  }

  if (days < tiers[0].from) {
    return days * tiers[0].price;
  }

  return days * tiers[tiers.length - 1].price;
}

export function calculateReservationPrice(params: {
  car: TransformedCar;
  days: number;
  idExtras: string | null | undefined;
  priceForOffHours: number;
  langCode: LocaleTypes;
  carPriceOverride?: number;
}): {
  price: number;
  carPrice: number;
  depositeDiscount: number;
  extras: Array<{ id: number; name: string; price: number; perDay: boolean }>;
} {
  const { car, days, idExtras, priceForOffHours, langCode, carPriceOverride } =
    params;

  let price = 0;
  let depositeDiscount = 0;
  const extras: Array<{
    id: number;
    name: string;
    price: number;
    perDay: boolean;
  }> = [];

  const carPrice =
    carPriceOverride != null && carPriceOverride > 0
      ? carPriceOverride
      : calculateCarPrice(car, days);
  price += carPrice;

  if (priceForOffHours > 0) {
    price += priceForOffHours;
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

type QuotedRentals = {
  days: number;
  totals: Record<string, number>;
};

let priceTierCache: {
  at: number;
  tiers: Record<string, DayPriceTier[]>;
} | null = null;
let priceTierInflight: Promise<Record<string, DayPriceTier[]>> | null = null;

function managerDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function probeStart(weeksAhead: number): Date {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + weeksAhead * 7);
  const day = date.getDay();
  const toMonday = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
  date.setDate(date.getDate() + toMonday);
  return date;
}

async function quoteModels(
  start: Date,
  days: number,
): Promise<Map<string, number> | null> {
  try {
    const response = await fetch(getDatabaseUrl(), {
      method: "POST",
      body: JSON.stringify({
        action: "get_available_models",
        date_from: `${managerDate(start)} 10:00`,
        date_to: `${managerDate(addDays(start, days))} 10:00`,
      }),
      headers: { API_KEY: MANAGER_API_KEY },
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data?.available_models) || data.days !== days) return null;

    const totals = new Map<string, number>();
    for (const model of data.available_models) {
      const total = Number(model.price);
      if (!Number.isFinite(total) || total <= 0) continue;
      totals.set(String(model.id), Math.round((total / days) * 100) / 100);
    }
    return totals;
  } catch {
    return null;
  }
}

async function mapPool<T>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<void>,
): Promise<void> {
  let cursor = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        await task(items[index]);
      }
    },
  );
  await Promise.all(workers);
}

function ratesDiffer(
  left: Map<string, number>,
  right: Map<string, number>,
): boolean {
  for (const [id, daily] of left) {
    const other = right.get(id);
    if (other != null && other !== daily) return true;
  }
  return false;
}

function tiersFromQuotes(
  quotes: Map<number, Map<string, number>>,
  carId: string,
): DayPriceTier[] | null {
  const samples = [...quotes.entries()]
    .flatMap(([days, totals]) => {
      const daily = totals.get(carId);
      return daily == null ? [] : [{ days, daily }];
    })
    .sort((a, b) => a.days - b.days);

  if (samples.length < 2) return null;

  const tiers: DayPriceTier[] = [];
  for (const sample of samples) {
    const last = tiers[tiers.length - 1];
    if (!last || last.price !== sample.daily) {
      if (last) last.to = sample.days - 1;
      tiers.push({ from: sample.days, to: sample.days, price: sample.daily });
    } else {
      last.to = sample.days;
    }
  }

  const last = tiers[tiers.length - 1];
  if (last) last.to = null;
  return tiers;
}

async function collectDayQuotes(
  start: Date,
): Promise<Map<number, Map<string, number>>> {
  const quotes = new Map<number, Map<string, number>>();
  const seedDays = [1, 2, 3, 7, 8, 15, 16, 29, 30, 45, 60];

  await mapPool(seedDays, 2, async (days) => {
    const quote = await quoteModels(start, days);
    if (quote) quotes.set(days, quote);
  });

  for (let attempt = 0; attempt < 12; attempt++) {
    const sorted = [...quotes.keys()].sort((a, b) => a - b);
    let midpoint: number | null = null;

    for (let index = 1; index < sorted.length; index++) {
      const left = sorted[index - 1];
      const right = sorted[index];
      if (right <= left + 1) continue;
      const leftQuote = quotes.get(left);
      const rightQuote = quotes.get(right);
      if (!leftQuote || !rightQuote || !ratesDiffer(leftQuote, rightQuote)) {
        continue;
      }
      const middle = Math.floor((left + right) / 2);
      if (middle === left || middle === right || quotes.has(middle)) continue;
      midpoint = middle;
      break;
    }

    if (midpoint == null) break;
    const quote = await quoteModels(start, midpoint);
    if (!quote) break;
    quotes.set(midpoint, quote);
  }

  return quotes;
}

export function readApiDayPriceTiers(): Record<string, DayPriceTier[]> | undefined {
  if (priceTierCache && Date.now() - priceTierCache.at < PRICE_TIER_CACHE_MS) {
    return priceTierCache.tiers;
  }
  return undefined;
}

export async function fetchApiDayPriceTiers(): Promise<
  Record<string, DayPriceTier[]>
> {
  if (priceTierCache && Date.now() - priceTierCache.at < PRICE_TIER_CACHE_MS) {
    return priceTierCache.tiers;
  }
  if (priceTierInflight) return priceTierInflight;

  priceTierInflight = loadApiDayPriceTiers().finally(() => {
    priceTierInflight = null;
  });
  return priceTierInflight;
}

async function loadApiDayPriceTiers(): Promise<Record<string, DayPriceTier[]>> {
  try {
    const firstWindow = await collectDayQuotes(probeStart(3));
    const tiers: Record<string, DayPriceTier[]> = {};

    for (const carId of ALLOWED_CAR_IDS) {
      const built = tiersFromQuotes(firstWindow, carId);
      if (built) tiers[carId] = built;
    }

    const missing = ALLOWED_CAR_IDS.filter((carId) => !tiers[carId]);
    if (missing.length > 0) {
      const laterStart = probeStart(8);
      const probe = await quoteModels(laterStart, 2);
      const stillListed = missing.filter((carId) => probe?.has(carId));
      if (stillListed.length > 0) {
        const secondWindow = await collectDayQuotes(laterStart);
        for (const carId of stillListed) {
          const built = tiersFromQuotes(secondWindow, carId);
          if (built) tiers[carId] = built;
        }
      }
    }

    if (Object.keys(tiers).length > 0) {
      priceTierCache = { at: Date.now(), tiers };
    }
    return tiers;
  } catch {
    return priceTierCache?.tiers ?? {};
  }
}

export async function fetchQuotedRentalTotals(
  pickupDate: string,
  pickupTime: string,
  dropoffDate: string,
  dropoffTime: string,
): Promise<QuotedRentals | null> {
  try {
    const response = await fetch(getDatabaseUrl(), {
      method: "POST",
      body: JSON.stringify({
        action: "get_available_models",
        date_from: `${format(new Date(pickupDate), "dd/MM/yyyy")} ${pickupTime}`,
        date_to: `${format(new Date(dropoffDate), "dd/MM/yyyy")} ${dropoffTime}`,
      }),
      headers: { API_KEY: MANAGER_API_KEY },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data?.available_models) || !Number.isFinite(data.days)) {
      return null;
    }

    const totals: Record<string, number> = {};
    for (const model of data.available_models) {
      const total = Number(model.price);
      if (!Number.isFinite(total) || total <= 0) continue;
      totals[String(model.id)] = total;
    }
    return { days: data.days, totals };
  } catch {
    return null;
  }
}

export function quotedCarPrice(
  quote: QuotedRentals | null,
  carId: string,
  days: number,
  fallback: number,
): number {
  if (!quote || quote.days !== days) return fallback;
  const total = quote.totals[carId];
  return total != null && total > 0 ? total : fallback;
}

export async function fetchAllCarModels(
  lang: BaseLocale,
): Promise<TransformedCar[]> {
  const databaseUrl = getDatabaseUrl();

  const res = await fetch(databaseUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: MANAGER_API_KEY },
  });

  const apiResponse: ApiAllModelsResponse = await res.json();
  return transformApiCars(
    apiResponse,
    lang,
    undefined,
    undefined,
    readApiDayPriceTiers(),
  );
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
