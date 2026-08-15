import type { Route } from "./+types/rental-conditions-page";
import {
  rentalConditionsSr,
  rentalConditionsRu,
  rentalConditionsEn,
} from "@/lib/data";
import { getLocale } from "@/lib/utils";
import Cta from "@/components/Cta";
import { CustomHero } from "@/components/CustomHero";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOpenGraphMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import SEO from "@/components/SEO";
import { publicPaths } from "@/lib/paths";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: "/long-term-rental-hero-2.webp",
    as: "image",
    fetchPriority: "high",
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

  let usloviNajma = rentalConditionsSr;
  if (langCode === "en") usloviNajma = rentalConditionsEn;
  if (langCode === "ru") usloviNajma = rentalConditionsRu;

  const data = {
    langCode,
    lang,
    usloviNajma,
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
    title: data.lang.seoRentalConditionsTitle,
    description: data.lang.seoRentalConditionsDescription,
    url: publicPaths.rentalConditions(data.langCode || "sr"),
    baseUrl,
    keywords: data.lang.seoRentalConditionsKeywords,
    imageAlt: "Viastro Rental Conditions",
  });
}

export default function RentalConditionsPage({
  loaderData,
}: Route.ComponentProps) {
  const schemas = [
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: loaderData.lang.seoRentalConditionsTitle,
          url: publicPaths.rentalConditions(loaderData.langCode),
        },
      ],
      loaderData.langCode
    ),
  ];

  const processedHtml =
    loaderData.usloviNajma?.replace(
      /(<p[^>]*class="c3"[^>]*>\s*<span[^>]*>)(.*?)(<br\s*[\/]?>)/s,
      (match, openingTags, titleContent, brTag) => {
        const titleMatch = titleContent.match(/^([^<]+)/);
        if (titleMatch) {
          const titleText = titleMatch[1].trim();
          const remainingContent = titleContent.substring(titleMatch[0].length);
          return `${openingTags}<span class="content-title-large">${titleText}</span>${remainingContent}${brTag}`;
        }
        return match;
      }
    ) || loaderData.usloviNajma;

  return (
    <div className="w-full min-h-screen">
      <SEO schemas={schemas} />
      <CustomHero
        title={loaderData.lang.seoRentalConditionsTitle}
        description={loaderData.lang.seoRentalConditionsDescription}
        primaryLabel={loaderData.lang.createReservation}
        secondaryLabel={loaderData.lang.contactUs}
        helperText={loaderData.lang.description}
        primaryHref={publicPaths.reservation(loaderData.langCode)}
        secondaryHref={publicPaths.contact(loaderData.langCode)}
        fastTitle={loaderData.lang.createReservation}
        fastSubtitle={loaderData.lang.deployFaster}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-card rounded-2xl shadow-lg border border-border/70 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <style>{`
              .content-wrapper .content-title-large {
                font-size: 1.875rem;
                line-height: 1.3;
                font-weight: 700;
                color: #eef1f5;
                display: block;
                margin-bottom: 1rem;
                padding-bottom: 1.5rem;
                border-bottom: 2px solid #2a3548;
              }
              .content-wrapper .content-subtitle {
                font-size: 1.5rem;
                line-height: 1.4;
                font-weight: 700;
                color: #eef1f5;
                display: block;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .content-wrapper .c8 {
                font-size: 1.25rem;
                line-height: 1.5;
                font-weight: 700;
                color: #eef1f5;
                display: block;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              .content-wrapper .c11 {
                font-size: 1.25rem;
                line-height: 1.5;
                font-weight: 700;
                color: #eef1f5;
                display: block;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              .content-wrapper p.c0,
              .content-wrapper p.c1,
              .content-wrapper p.c3,
              .content-wrapper p.c6 {
                color: #8b9cb3;
                line-height: 1.75;
                margin-bottom: 1rem;
                font-size: 1rem;
              }
              .content-wrapper span.c1,
              .content-wrapper span.c3 {
                color: #8b9cb3;
              }
              .content-wrapper span.c0 {
                display: inline;
              }
              @media (min-width: 640px) {
                .content-wrapper .content-title-large {
                  font-size: 2.25rem;
                }
                .content-wrapper .content-subtitle {
                  font-size: 1.75rem;
                }
                .content-wrapper .c8 {
                  font-size: 1.5rem;
                }
                .content-wrapper .c11 {
                  font-size: 1.5rem;
                }
              }
            `}</style>
            <div
              className="content-wrapper content-prose"
              dangerouslySetInnerHTML={{ __html: processedHtml ?? "" }}
            />
          </div>
        </div>
      </div>

      <Cta lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
