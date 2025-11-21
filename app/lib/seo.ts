/**
 * SEO Utility Functions
 * Provides structured data (JSON-LD) schema markup for different page types
 */

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

export interface WebSiteSchema {
  name: string;
  url: string;
  potentialAction: {
    target: string;
    queryInput: string;
  };
  inLanguage: string[];
}

export interface LocalBusinessSchema {
  name: string;
  image: string;
  telephone: string;
  priceRange: string;
  address: {
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
  };
  geo: {
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
}

export interface ProductSchema {
  name: string;
  image: string;
  description: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

export interface ArticleSchema {
  headline: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url: string;
  };
  publisher: {
    name: string;
    logo: {
      url: string;
    };
  };
}

export interface FAQPageSchema {
  mainEntity: {
    name: string;
    acceptedAnswer: {
      text: string;
    };
  }[];
}

/**
 * Get base URL from request
 */
export function getBaseUrl(request?: Request): string {
  if (request) {
    try {
      const url = new URL(request.url);
      return `${url.protocol}//${url.host}`;
    } catch (e) {
      // Fallback if URL is invalid
    }
  }
  
  // Fallback for client-side or when request is not available
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  
  // Default fallback (can be overridden with environment variable)
  return process.env.BASE_URL || "https://viastro.rs";
}

/**
 * Generate Organization Schema (JSON-LD)
 */
export function generateOrganizationSchema(
  baseUrl: string,
  langCode: string = "sr"
): OrganizationSchema {
  const logoUrl = `${baseUrl}/viastro_logo.png`;
  
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

/**
 * Generate WebSite Schema (JSON-LD)
 */
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

/**
 * Generate LocalBusiness Schema (JSON-LD)
 */
export function generateLocalBusinessSchema(
  baseUrl: string,
  langCode: string = "sr"
): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Viastro Rent a Car",
    image: `${baseUrl}/viastro_logo.png`,
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

/**
 * Generate Service Schema (JSON-LD) for Car Rental
 */
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
    image: `${baseUrl}/viastro_logo.png`,
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

/**
 * Generate Product Schema for a Car (JSON-LD)
 */
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
    image: car.image || `${baseUrl}/car.png`,
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

/**
 * Generate Article Schema for Blog Posts (JSON-LD)
 */
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
    image: article.image || `${baseUrl}/hero_mobile.png`,
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
        url: `${baseUrl}/viastro_logo.png`,
      },
    },
    description: article.description || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

/**
 * Generate FAQPage Schema (JSON-LD)
 */
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

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 */
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

/**
 * Convert schema object to JSON-LD script tag
 */
export function schemaToScriptTag(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

