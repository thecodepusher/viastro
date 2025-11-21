import Cta from "@/components/Cta";
import SEO from "@/components/SEO";
import type { Route } from "./+types/blog-page";
import BlogSection from "@/components/BlogSection";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
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
  const canonical = `${baseUrl}/${data.langCode || "sr"}/blog`;
  const title = `Viastro ${data.lang.blog} | Belgrade`;
  const description = "Read our blog for tips, travel guides, and information about car rental in Belgrade and Serbia.";

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "viastro blog, rent a car Belgrade, travel guides Serbia" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { rel: "canonical", href: canonical },
  ];
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  // Generate SEO schemas
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
    <div className="w-full pt-16">
      <SEO schemas={schemas} />
      <BlogSection langCode={loaderData.langCode} />
      <Cta lang={loaderData.lang} />
    </div>
  );
}
