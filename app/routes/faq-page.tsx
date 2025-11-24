import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import SEO from "@/components/SEO";
import type { Route } from "./+types/faq-page";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { faqsSr, faqsEn, faqsRu } from "@/constants/FaQ";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;

  const baseUrl = getBaseUrl(request);
  const langCode = params.lang ?? "sr";

  let faqs = faqsSr;
  if (langCode === "en") faqs = faqsEn;
  if (langCode === "ru") faqs = faqsRu;

  const data = {
    langCode,
    lang,
    message: context.VALUE_FROM_EXPRESS,
    baseUrl,
    faqs,
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
  const canonical = `${baseUrl}/${data.langCode || "sr"}/faq`;
  const title = `Viastro ${data.lang.faq} | Belgrade`;
  const description =
    "Frequently asked questions about car rental services in Belgrade.";

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "FAQ rent a car Belgrade, car rental questions, najčešća pitanja iznajmljivanje automobila",
    },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { rel: "canonical", href: canonical },
  ];
}

export default function FandQPage({ loaderData }: Route.ComponentProps) {
  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateFAQPageSchema(
      loaderData.baseUrl,
      loaderData.faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
      loaderData.langCode
    ),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        { name: loaderData.lang.faq, url: `/${loaderData.langCode}/faq` },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full pt-20">
      <SEO schemas={schemas} />
      <FandQ langCode={loaderData.langCode} />
      <Cta lang={loaderData.lang} />
    </div>
  );
}
