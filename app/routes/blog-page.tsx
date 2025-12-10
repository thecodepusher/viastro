import Cta from "@/components/Cta";
import SEO from "@/components/SEO";
import { CustomHero } from "@/components/CustomHero";
import type { Route } from "./+types/blog-page";
import BlogSection from "@/components/BlogSection";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateOpenGraphMeta,
} from "@/lib/seo";

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
    message: context.VALUE_FROM_EXPRESS,
    baseUrl,
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
    title: data.lang.seoBlogTitle,
    description: data.lang.seoBlogDescription,
    url: `/${data.langCode || "sr"}/blog`,
    baseUrl,
    keywords: data.lang.seoBlogKeywords,
    imageAlt: "Viastro Blog - Car Rental Tips and Travel Guides",
  });
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        { name: loaderData.lang.blog, url: `/${loaderData.langCode}/blog` },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full">
      <SEO schemas={schemas} />
      <CustomHero
        title={loaderData.lang.seoBlogTitle}
        description={loaderData.lang.seoBlogDescription}
      />
      <BlogSection langCode={loaderData.langCode} />
      <Cta lang={loaderData.lang} />
    </div>
  );
}
