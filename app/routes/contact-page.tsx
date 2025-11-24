import Cta from "@/components/Cta";
import type { Route } from "./+types/contact-page";
import GetInTouch from "@/components/GetInTouch";
import SEO from "@/components/SEO";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
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
  const canonical = `${baseUrl}/${data.langCode || "sr"}/contact`;
  const title = `Viastro ${data.lang.contact} | Belgrade`;
  const description =
    data.lang.gitSubTitle ||
    "Contact Viastro Rent a Car in Belgrade for car rental services.";

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "contact viastro, rent a car Belgrade contact, car rental Belgrade",
    },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { rel: "canonical", href: canonical },
  ];
}

export default function ContactPage({ loaderData }: Route.ComponentProps) {
  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateLocalBusinessSchema(loaderData.baseUrl, loaderData.langCode),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: loaderData.lang.contact,
          url: `/${loaderData.langCode}/contact`,
        },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full pt-16">
      <SEO schemas={schemas} />
      <GetInTouch lang={loaderData.lang} />

      <Cta lang={loaderData.lang} />
    </div>
  );
}
