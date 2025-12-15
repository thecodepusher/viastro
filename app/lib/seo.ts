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
      return `${url.protocol}//${url.host}`;
    } catch (e) {}
  }

  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }

  return process.env.BASE_URL || "https://viastro.rs";
}

export function generateOrganizationSchema(
  baseUrl: string,
  langCode: string = "sr"
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
      telephone: "+381-60-123-4567",
      contactType: "Customer Service",
      areaServed: "RS",
      availableLanguage: ["sr", "en", "ru"],
    },
    sameAs: [
      // Add social media links when available
      // "https://www.facebook.com/viastro",
      // "https://www.instagram.com/viastro",
    ],
  };
}

export function generateWebSiteSchema(
  baseUrl: string,
  langCode: string = "sr"
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
        urlTemplate: `${baseUrl}/${langCode}/cars?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["sr", "en", "ru"],
  };
}

export function generateLocalBusinessSchema(
  baseUrl: string,
  langCode: string = "sr"
): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Viastro Rent a Car",
    image: `${baseUrl}/logo.webp`,
    telephone: "+381-60-123-4567",
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
  langCode: string = "sr"
) {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${baseUrl}/#business`,
    name: "Viastro Rent a Car",
    description: "Car rental service in Belgrade, Serbia",
    image: `${baseUrl}/logo.webp`,
    telephone: "+381-60-123-4567",
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
  langCode: string = "sr"
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
      url: car.url || `${baseUrl}/${langCode}/cars`,
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
  langCode: string = "sr"
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
  langCode: string = "sr"
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

export function generateBreadcrumbSchema(
  baseUrl: string,
  items: { name: string; url: string }[],
  langCode: string = "sr"
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
    locale,
    siteName = "Viastro Rent a Car",
    keywords,
    twitterCard = "summary_large_image",
  } = options;

  const baseUrl = providedBaseUrl || getBaseUrl();
  const ogImage = imageUrl || `${baseUrl}/opengraph-1200x630.webp`;
  const canonical = url.startsWith("http") ? url : `${baseUrl}${url}`;

  const metaTags: Array<{
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
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/jpeg" },
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { rel: "canonical", href: canonical },
  ];

  if (keywords) {
    metaTags.push({ name: "keywords", content: keywords });
  }

  if (imageAlt) {
    metaTags.push({ property: "og:image:alt", content: imageAlt });
  }

  if (locale) {
    metaTags.push({ property: "og:locale", content: locale });
  }

  if (siteName) {
    metaTags.push({ property: "og:site_name", content: siteName });
  }

  return metaTags;
}
