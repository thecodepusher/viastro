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
  name: string;
  image: string;
  telephone: string;
  url: string;
  priceRange: string;
  address: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
  };
  geo: {
    "@type": string;
    latitude: string;
    longitude: string;
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
    name: "Viastro doo Beograd",
    url: baseUrl,
    logo: logoUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+381-69-656-555",
      contactType: "Customer Service",
      areaServed: "RS",
      availableLanguage: ["sr", "en", "ru"],
    },
    sameAs: ["https://www.instagram.com/viastro.rs/"],
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

export function generateLocalBusinessSchema(
  baseUrl: string,
  langCode: string = "sr",
): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Viastro Rent a Car",
    image: `${baseUrl}/logo.webp`,
    telephone: "+381-69-656-555",
    url: `${baseUrl}${publicPaths.home(langCode)}`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RS",
      addressLocality: "Belgrade",
      addressRegion: "Belgrade",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "44.7866",
      longitude: "20.4489",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
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
    "@type": "AutomotiveBusiness",
    "@id": `${baseUrl}/#business`,
    name: "Viastro Rent a Car",
    description: "Car rental service in Belgrade, Serbia",
    image: `${baseUrl}/logo.webp`,
    telephone: "+381-69-656-555",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RS",
      addressLocality: "Belgrade",
    },
    priceRange: "€€",
    url: baseUrl,
    areaServed: {
      "@type": "Country",
      name: "Serbia",
    },
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
      "@type": "AutomotiveBusiness",
      name: "Viastro Rent a Car",
      telephone: "+381-69-656-555",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        addressCountry: "RS",
        addressLocality: "Belgrade",
      },
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
    serviceType: "Car Rental",
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
      "@type": "Event",
      name: "EXPO 2027 Belgrade",
      startDate: "2027-05-15",
      endDate: "2027-08-15",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "EXPO 2027 Belgrade",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surcin",
          addressRegion: "Belgrade",
          addressCountry: "RS",
        },
      },
    },
  };
}

export function generateExpoEventSchema(options: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "EXPO 2027 Belgrade",
    description: options.description,
    startDate: "2027-05-15",
    endDate: "2027-08-15",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "EXPO 2027 Belgrade",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Surcin",
        addressRegion: "Belgrade",
        addressCountry: "RS",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "EXPO 2027 Belgrade",
    },
    offers: {
      "@type": "Offer",
      name: options.name,
      url: options.url,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Viastro Rent a Car",
      },
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
