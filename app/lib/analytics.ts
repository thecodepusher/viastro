import { differenceInDays } from "date-fns";
import { locations } from "@/lib/data";

export const GA_MEASUREMENT_ID = "G-SP7K7D7BRS";

const PENDING_PURCHASE_KEY = "ga_pending_purchase";

export type AnalyticsEventName =
  | "reservation_start"
  | "reservation_dates_selected"
  | "view_item_list"
  | "select_car"
  | "add_extras"
  | "begin_checkout"
  | "promo_applied"
  | "promo_invalid"
  | "add_payment_info"
  | "purchase";

export type AnalyticsParamValue = string | number | boolean;

export type AnalyticsEventParams = Record<
  string,
  AnalyticsParamValue | undefined
>;

export type PendingPurchase = {
  transaction_id: string;
  value: number;
  currency: "EUR";
  car_id?: string;
  car_name?: string;
  days?: number;
  extras_count?: number;
  promo_applied?: boolean;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent() {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem("cookie_consent") === "true"
  );
}

export function loadGoogleAnalytics() {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  if (
    !document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
    )
  ) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

function cleanParams(params?: AnalyticsEventParams) {
  const clean: Record<string, AnalyticsParamValue> = {};

  if (!params) {
    return clean;
  }

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") {
      continue;
    }

    clean[key] = value;
  }

  return clean;
}

export function trackEvent(
  name: AnalyticsEventName,
  params?: AnalyticsEventParams,
) {
  if (typeof window === "undefined" || !window.gtag || !hasAnalyticsConsent()) {
    return;
  }

  window.gtag("event", name, cleanParams(params));
}

export function trackEventOnce(
  key: string,
  name: AnalyticsEventName,
  params?: AnalyticsEventParams,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storageKey = `ga_once_${key}`;
    if (sessionStorage.getItem(storageKey)) {
      return;
    }
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // Ignore storage errors and still send the event.
  }

  trackEvent(name, params);
}

export function trackPageView(path: string, search = "") {
  if (typeof window === "undefined" || !window.gtag || !hasAnalyticsConsent()) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: `${path}${search}`,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackReservationDatesSelected(data: {
  pickUpLocation: string;
  dropOffLocation: string;
  pickDate: Date;
  dropDate: Date;
}) {
  const pickup = locations.find(
    (location) => String(location.id) === String(data.pickUpLocation),
  );
  const dropoff = locations.find(
    (location) => String(location.id) === String(data.dropOffLocation),
  );

  trackEvent("reservation_dates_selected", {
    step: "dates",
    pickup_location: pickup?.name,
    dropoff_location: dropoff?.name,
    days: Math.max(1, differenceInDays(data.dropDate, data.pickDate)),
  });
}

export function savePendingPurchase(payload: PendingPurchase) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(PENDING_PURCHASE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage errors.
  }
}

export function consumePendingPurchase(): PendingPurchase | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(PENDING_PURCHASE_KEY);
    if (!raw) {
      return null;
    }

    sessionStorage.removeItem(PENDING_PURCHASE_KEY);
    return JSON.parse(raw) as PendingPurchase;
  } catch {
    return null;
  }
}
