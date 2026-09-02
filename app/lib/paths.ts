export const supportedLocales = ["sr", "en", "ru"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(
  value: string | undefined,
): value is SupportedLocale {
  return value === "sr" || value === "en" || value === "ru";
}

export function isNoindexPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";

  return (
    /\/rezervacija\/(vozilo|dodaci|pregled)$/.test(path) ||
    /\/(uspesno|wspay)(?:\/|$)/.test(path) ||
    path === "/izbor-jezika" ||
    path === "/select-lang"
  );
}

export const pathSegments = {
  faq: "cesta-pitanja",
  contact: "kontakt",
  news: "vesti",
  success: "uspesno",
  cars: "vozila",
  rentalConditions: "uslovi-iznajmljivanja",
  privacyPolicy: "politika-privatnosti",
  longTermRental: "dugorocni-najam",
  expo: "expo-2027-beograd-rent-a-car",
  reservation: "rezervacija",
  vehicle: "vozilo",
  extras: "dodaci",
  review: "pregled",
  languageSelection: "izbor-jezika",
} as const;

export const publicPaths = {
  home: (lang = "sr") => `/${lang}`,
  faq: (lang = "sr") => `/${lang}/${pathSegments.faq}`,
  contact: (lang = "sr") => `/${lang}/${pathSegments.contact}`,
  news: (lang = "sr") => `/${lang}/${pathSegments.news}`,
  article: (lang = "sr", slug: string) =>
    `/${lang}/${pathSegments.news}/${slug}`,
  success: (lang = "sr") => `/${lang}/${pathSegments.success}`,
  cars: (lang = "sr") => `/${lang}/${pathSegments.cars}`,
  rentalConditions: (lang = "sr") =>
    `/${lang}/${pathSegments.rentalConditions}`,
  privacyPolicy: (lang = "sr") => `/${lang}/${pathSegments.privacyPolicy}`,
  longTermRental: (lang = "sr") => `/${lang}/${pathSegments.longTermRental}`,
  expo: (lang = "sr") => `/${lang}/${pathSegments.expo}`,
  reservation: (lang = "sr") => `/${lang}/${pathSegments.reservation}`,
  reservationVehicle: (lang = "sr") =>
    `/${lang}/${pathSegments.reservation}/${pathSegments.vehicle}`,
  reservationExtras: (lang = "sr") =>
    `/${lang}/${pathSegments.reservation}/${pathSegments.extras}`,
  reservationReview: (lang = "sr") =>
    `/${lang}/${pathSegments.reservation}/${pathSegments.review}`,
  languageSelection: `/${pathSegments.languageSelection}`,
  wspay: {
    redirect: (lang = "sr") => `/${lang}/wspay/redirect`,
    success: (lang = "sr") => `/${lang}/wspay/success`,
    error: (lang = "sr") => `/${lang}/wspay/error`,
    cancel: (lang = "sr") => `/${lang}/wspay/cancel`,
  },
} as const;

const legacySegments: Record<string, string> = {
  faq: pathSegments.faq,
  contact: pathSegments.contact,
  blog: pathSegments.news,
  success: pathSegments.success,
  cars: pathSegments.cars,
  "rental-conditions": pathSegments.rentalConditions,
  "privacy-policy": pathSegments.privacyPolicy,
  "long-term-rental": pathSegments.longTermRental,
  reservation: pathSegments.reservation,
  vehicle: pathSegments.vehicle,
  extras: pathSegments.extras,
  review: pathSegments.review,
  "select-lang": pathSegments.languageSelection,
  reklamacije: pathSegments.contact,
  expo: pathSegments.expo,
};

export function getLegacyRedirectPath(pathname: string): string | null {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const hasLocale = isSupportedLocale(segments[0]);
  const startIndex = hasLocale ? 1 : 0;
  const legacySegment = segments[startIndex];

  if (!legacySegment || !legacySegments[legacySegment]) {
    return null;
  }

  if (legacySegment === "select-lang") {
    return `/${pathSegments.languageSelection}`;
  }

  const nextSegments = [...segments];
  nextSegments[startIndex] = legacySegments[legacySegment];
  if (
    legacySegment === "reservation" &&
    nextSegments[startIndex + 1] &&
    legacySegments[nextSegments[startIndex + 1]]
  ) {
    nextSegments[startIndex + 1] =
      legacySegments[nextSegments[startIndex + 1]];
  }

  if (!hasLocale) {
    nextSegments.unshift("sr");
  }

  return `/${nextSegments.join("/")}`;
}
