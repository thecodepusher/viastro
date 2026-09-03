import SEO from "@/components/SEO";
import { ExpoLanding } from "@/components/Expo/ExpoLanding";
import { publicPaths } from "@/lib/paths";
import { prefs } from "@/lib/prefs-cookie";
import { getLocale } from "@/lib/utils";
import {
  generateBreadcrumbSchema,
  generateExpoEventSchema,
  generateExpoServiceSchema,
  generateExpoWebPageSchema,
  generateFAQPageSchema,
  generateLocalBusinessSchema,
  generateOpenGraphMeta,
  generateOrganizationSchema,
  getBaseUrl,
} from "@/lib/seo";
import type { Route } from "./+types/expo-page";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: "/long-term-rental-hero-1.webp",
    as: "image",
    fetchPriority: "high",
  },
  {
    rel: "preload",
    href: "/long-term-rental-hero-2.webp",
    as: "image",
  },
];

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

  const baseUrl = getBaseUrl(request);
  const langCode = params.lang ?? "sr";

  const data = {
    langCode,
    lang,
    baseUrl,
    message: context.VALUE_FROM_EXPRESS,
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: data.lang.seoExpoTitle,
    description: data.lang.seoExpoDescription,
    url: publicPaths.expo(data.langCode || "sr"),
    baseUrl,
    keywords: data.lang.seoExpoKeywords,
    imageUrl: `${baseUrl}/expo-2027-og-1200x630.jpg`,
    imageAlt: data.lang.expo.heroImageAlt,
    imageType: "image/jpeg",
    imageWidth: 1200,
    imageHeight: 630,
  });
}

export default function ExpoPage({ loaderData }: Route.ComponentProps) {
  const content = loaderData.lang.expo;
  const pageUrl = `${loaderData.baseUrl}${publicPaths.expo(loaderData.langCode)}`;
  const ogImage = `${loaderData.baseUrl}/expo-2027-og-1200x630.jpg`;

  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateLocalBusinessSchema(loaderData.baseUrl, loaderData.langCode),
    generateExpoWebPageSchema({
      baseUrl: loaderData.baseUrl,
      langCode: loaderData.langCode,
      name: loaderData.lang.seoExpoTitle,
      description: loaderData.lang.seoExpoDescription,
      imageUrl: ogImage,
    }),
    generateExpoServiceSchema(loaderData.baseUrl, loaderData.langCode, {
      name: loaderData.lang.seoExpoTitle,
      description: loaderData.lang.seoExpoDescription,
      imageUrl: ogImage,
    }),
    generateExpoEventSchema({
      name: loaderData.lang.seoExpoTitle,
      description: loaderData.lang.seoExpoDescription,
      url: pageUrl,
      imageUrl: ogImage,
    }),
    generateFAQPageSchema(
      loaderData.baseUrl,
      content.faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
      loaderData.langCode,
    ),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: content.breadcrumb,
          url: publicPaths.expo(loaderData.langCode),
        },
      ],
      loaderData.langCode,
    ),
  ];

  return (
    <div className="w-full">
      <SEO schemas={schemas} />
      <ExpoLanding content={content} langCode={loaderData.langCode} />
    </div>
  );
}
