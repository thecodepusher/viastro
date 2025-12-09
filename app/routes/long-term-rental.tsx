import SEO from "@/components/SEO";
import { LongTermAudiences } from "@/components/LongTermRental/LongTermAudiences";
import { LongTermBenefits } from "@/components/LongTermRental/LongTermBenefits";
import { LongTermContact } from "@/components/LongTermRental/LongTermContact";
import { LongTermHero } from "@/components/LongTermRental/LongTermHero";
import { LongTermReasons } from "@/components/LongTermRental/LongTermReasons";
import { prefs } from "@/lib/prefs-cookie";
import { getLocale } from "@/lib/utils";
import {
  generateBreadcrumbSchema,
  generateOpenGraphMeta,
  getBaseUrl,
} from "@/lib/seo";
import type { Route } from "./+types/long-term-rental";

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
    title: data.lang.seoLongTermRentalTitle,
    description: data.lang.seoLongTermRentalDescription,
    url: `/${data.langCode || "sr"}/long-term-rental`,
    baseUrl,
    keywords: data.lang.seoLongTermRentalKeywords,
    imageAlt: "Viastro - Long term rental",
  });
}

export default function LongTermRentalPage({
  loaderData,
}: Route.ComponentProps) {
  const content = loaderData.lang.longTermRental;

  const schemas = [
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: content.heroTitle,
          url: `/${loaderData.langCode}/long-term-rental`,
        },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full pt-16">
      <SEO schemas={schemas} />
      <LongTermHero content={content} />
      <LongTermBenefits content={content} />
      <LongTermAudiences content={content} />
      <LongTermReasons content={content} />
      <LongTermContact content={content} />
    </div>
  );
}
