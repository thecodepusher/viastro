import {
  BUSINESS,
  geoCoordinatesSchema,
  postalAddressSchema,
} from "@/lib/business";
import { publicPaths, supportedLocales } from "@/lib/paths";

export const PRODUCTION_ORIGIN = "https://viastro.rs";

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs: string[];
  address: {
    "@type": string;
    streetAddress: string;
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  potentialAction: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
  inLanguage: string[];
}

export interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  description: string;
  image: string;
  telephone: string;
  email: string;
  url: string;
  priceRange: string;
  hasMap: string;
  sameAs: string[];
  address: {
    "@type": string;
    streetAddress: string;
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: {
    "@type": string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
}

export interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  image: string;
  description: string;
  brand: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

export interface ArticleSchema {
  "@context": string;
  "@type": string;
  headline: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  description: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export interface FAQPageSchema {
  "@context": string;
  "@type": string;
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }[];
}

export function getBaseUrl(request?: Request): string {
  if (request) {
    try {
      const url = new URL(request.url);
      if (isLocalHost(url.hostname)) {
        return `${url.protocol}//${url.host}`;
      }
    } catch (e) {}
  }

  if (typeof window !== "undefined" && isLocalHost(window.location.hostname)) {
    return `${window.location.protocol}//${window.location.host}`;
  }

  return process.env.BASE_URL || PRODUCTION_ORIGIN;
}

export function getLocaleFromPath(url: string): "sr_RS" | "en_US" | "ru_RU" {
  try {
    const path = url.startsWith("http")
      ? new URL(url).pathname
      : url.split("?")[0];
    if (path === "/en" || path.startsWith("/en/")) return "en_US";
    if (path === "/ru" || path.startsWith("/ru/")) return "ru_RU";
  } catch (e) {}

  return "sr_RS";
}

export function getHreflangAlternates(pathWithoutLang: string, baseUrl: string) {
  const suffix = pathWithoutLang.replace(/\/+$/, "");

  return [
    ...supportedLocales.map((lang) => ({
      lang,
      href: `${baseUrl}/${lang}${suffix}`,
    })),
    { lang: "x-default", href: `${baseUrl}/sr${suffix}` },
  ];
}

export function generateOrganizationSchema(
  baseUrl: string,
  langCode: string = "sr",
): OrganizationSchema {
  const logoUrl = `${baseUrl}/logo.webp`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.legalName,
    url: baseUrl,
    logo: logoUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.telephone,
      contactType: "Customer Service",
      areaServed: "RS",
      availableLanguage: ["sr", "en", "ru"],
    },
    sameAs: [BUSINESS.instagramUrl, BUSINESS.mapsUrl],
    address: postalAddressSchema(),
  };
}

export function generateWebSiteSchema(
  baseUrl: string,
  langCode: string = "sr",
): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Viastro Rent a Car Belgrade",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}${publicPaths.cars(langCode)}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["sr", "en", "ru"],
  };
}

function businessDescription(langCode: string): string {
  if (langCode === "sr") {
    return "Rent a car Novi Beograd. Iznajmljivanje automobila na adresi Nehruova 51a, 11070 Novi Beograd.";
  }
  if (langCode === "ru") {
    return "Прокат автомобилей в Нови-Београде. Выдача по адресу Nehruova 51a, 11070 Novi Beograd.";
  }
  return "Car rental in New Belgrade. Vehicle pick-up at Nehruova 51a, 11070 Novi Beograd.";
}

export function generateLocalBusinessSchema(
  baseUrl: string,
  langCode: string = "sr",
): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${baseUrl}/#business`,
    name: BUSINESS.name,
    description: businessDescription(langCode),
    image: `${baseUrl}/logo.webp`,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    url: `${baseUrl}${publicPaths.home(langCode)}`,
    priceRange: BUSINESS.priceRange,
    hasMap: BUSINESS.mapsUrl,
    sameAs: [BUSINESS.instagramUrl, BUSINESS.mapsUrl],
    address: postalAddressSchema(),
    geo: geoCoordinatesSchema(),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: BUSINESS.weekdayOpens,
        closes: BUSINESS.weekdayCloses,
      },
    ],
  };
}

export function generateCarRentalServiceSchema(
  baseUrl: string,
  langCode: string = "sr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${baseUrl}/#business`,
    name: BUSINESS.name,
    description: businessDescription(langCode),
    image: `${baseUrl}/logo.webp`,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: postalAddressSchema(),
    geo: geoCoordinatesSchema(),
    hasMap: BUSINESS.mapsUrl,
    priceRange: BUSINESS.priceRange,
    url: baseUrl,
    areaServed: [
      {
        "@type": "City",
        name: "Novi Beograd",
      },
      {
        "@type": "City",
        name: "Beograd",
      },
      {
        "@type": "Country",
        name: "Serbia",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Car Rental Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Economy Cars",
        },
        {
          "@type": "OfferCatalog",
          name: "Luxury Cars",
        },
        {
          "@type": "OfferCatalog",
          name: "SUVs",
        },
      ],
    },
  };
}

export function generateCarProductSchema(
  baseUrl: string,
  car: {
    name: string;
    image?: string;
    description?: string;
    price?: string;
    url?: string;
  },
  langCode: string = "sr",
): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: car.name,
    image: car.image || `${baseUrl}/opengraph-400x400.webp`,
    description: car.description || `Rent ${car.name} in Belgrade`,
    brand: {
      "@type": "Brand",
      name: car.name.split(" ")[0] || "Car",
    },
    offers: {
      "@type": "Offer",
      price: car.price || "30",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: car.url || `${baseUrl}${publicPaths.cars(langCode)}`,
    },
  };
}

export function generateArticleSchema(
  baseUrl: string,
  article: {
    title: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    description?: string;
    author?: string;
    url: string;
  },
  langCode: string = "sr",
): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image || `${baseUrl}/opengraph-400x400.webp`,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: article.author || "Viastro",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Viastro",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.webp`,
      },
    },
    description: article.description || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function generateFAQPageSchema(
  baseUrl: string,
  faqs: { question: string; answer: string }[],
  langCode: string = "sr",
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateExpoServiceSchema(
  baseUrl: string,
  langCode: string,
  options: {
    name: string;
    description: string;
    imageUrl?: string;
  },
) {
  const pageUrl = `${baseUrl}${publicPaths.expo(langCode)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    alternateName: [
      "Expo rent a car",
      "Expo renta car",
      "Rent a car EXPO 2027 Belgrade",
    ],
    description: options.description,
    image: options.imageUrl || `${baseUrl}/expo-2027-og-1200x630.jpg`,
    provider: {
      "@type": "AutoRental",
      "@id": `${baseUrl}/#business`,
      name: BUSINESS.name,
      telephone: BUSINESS.telephone,
      url: baseUrl,
      address: postalAddressSchema(),
    },
    brand: {
      "@type": "Brand",
      name: "Viastro",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Belgrade",
      },
      {
        "@type": "Place",
        name: "EXPO 2027 Belgrade, Surcin",
      },
      {
        "@type": "Airport",
        name: "Belgrade Nikola Tesla Airport",
        iataCode: "BEG",
      },
    ],
    serviceType: ["Car Rental", "Chauffeur Service"],
    category: "Expo rent a car",
    url: pageUrl,
    availableLanguage: ["sr", "en", "ru"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}${publicPaths.reservation(langCode)}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
    },
  };
}

const EXPO_2027_OFFICIAL_URL = "https://expobelgrade2027.org/";
const EXPO_2027_START = "2027-05-15";
const EXPO_2027_END = "2027-08-15";
const EXPO_TICKET_PREORDER_FROM = "2026-01-01T00:00:00+01:00";

function expoEventLocation() {
  return {
    "@type": "Place" as const,
    name: "EXPO 2027 Belgrade",
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: "Surcin",
      addressRegion: "Beograd",
      addressCountry: "RS",
    },
  };
}

function expoEventOrganizer() {
  return {
    "@type": "Organization" as const,
    name: "EXPO 2027 Belgrade",
    url: EXPO_2027_OFFICIAL_URL,
  };
}

export function generateExpoEventSchema(options: {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${options.url}#event`,
    name: "EXPO 2027 Belgrade",
    description: options.description,
    image: [options.imageUrl],
    url: options.url,
    startDate: EXPO_2027_START,
    endDate: EXPO_2027_END,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: expoEventLocation(),
    organizer: expoEventOrganizer(),
    performer: expoEventOrganizer(),
    offers: {
      "@type": "Offer",
      name: "EXPO 2027 Belgrade tickets",
      url: EXPO_2027_OFFICIAL_URL,
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      validFrom: EXPO_TICKET_PREORDER_FROM,
      seller: expoEventOrganizer(),
    },
  };
}

export function generateExpoWebPageSchema(options: {
  baseUrl: string;
  langCode: string;
  name: string;
  description: string;
  imageUrl: string;
}) {
  const pageUrl = `${options.baseUrl}${publicPaths.expo(options.langCode)}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: options.name,
    description: options.description,
    inLanguage: options.langCode,
    isPartOf: {
      "@type": "WebSite",
      name: "Viastro Rent a Car",
      url: options.baseUrl,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: options.imageUrl,
      width: 1200,
      height: 630,
    },
    about: {
      "@id": `${pageUrl}#event`,
    },
  };
}

export function generateBreadcrumbSchema(
  baseUrl: string,
  items: { name: string; url: string }[],
  langCode: string = "sr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

export function schemaToScriptTag(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

export interface OpenGraphMetaOptions {
  title: string;
  description: string;
  url: string;
  baseUrl?: string;
  type?: "website" | "article";
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  locale?: string;
  siteName?: string;
  keywords?: string;
  twitterCard?: "summary_large_image" | "summary";
}

export function generateOpenGraphMeta(options: OpenGraphMetaOptions) {
  const {
    title,
    description,
    url,
    baseUrl: providedBaseUrl,
    type = "website",
    imageUrl,
    imageAlt,
    imageWidth = 1200,
    imageHeight = 630,
    imageType = "image/webp",
    locale,
    siteName = "Viastro Rent a Car",
    keywords,
    twitterCard = "summary_large_image",
  } = options;

  const baseUrl = providedBaseUrl || getBaseUrl();
  const ogImage = imageUrl || `${baseUrl}/opengraph-1200x630.webp`;
  const canonical = (url.startsWith("http") ? url : `${baseUrl}${url}`).replace(
    /\/$/,
    "",
  );
  const localeFromUrl = getLocaleFromPath(canonical);
  const localeAlternates = ["sr_RS", "en_US", "ru_RU"].filter(
    (item) => item !== (locale ?? localeFromUrl),
  );

  const metaTags: Array<{
    tagName?: "link";
    title?: string;
    name?: string;
    property?: string;
    content?: string;
    rel?: string;
    href?: string;
  }> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:secure_url", content: ogImage },
    { property: "og:image:width", content: String(imageWidth) },
    { property: "og:image:height", content: String(imageHeight) },
    { property: "og:image:type", content: imageType },
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: canonical },
  ];

  if (keywords) {
    metaTags.push({ name: "keywords", content: keywords });
  }

  if (imageAlt) {
    metaTags.push({ property: "og:image:alt", content: imageAlt });
  }

  metaTags.push({ property: "og:locale", content: locale ?? localeFromUrl });
  for (const alternate of localeAlternates) {
    metaTags.push({ property: "og:locale:alternate", content: alternate });
  }

  if (siteName) {
    metaTags.push({ property: "og:site_name", content: siteName });
  }

  return metaTags;
}
