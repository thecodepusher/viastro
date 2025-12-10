import type { Route } from "./+types/rental-conditions-page";
import { usloviNajmaSr, usloviNajmaRs, rentalConditionsEn } from "@/lib/data";
import { getLocale } from "@/lib/utils";
import Cta from "@/components/Cta";
import { CustomHero } from "@/components/CustomHero";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";

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

  let usloviNajma = usloviNajmaSr;
  if (langCode === "en") usloviNajma = rentalConditionsEn;
  if (langCode === "ru") usloviNajma = usloviNajmaRs;

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
    url: `/${data.langCode || "sr"}/rental-conditions`,
    baseUrl,
    keywords: data.lang.seoRentalConditionsKeywords,
    imageAlt: "Viastro Rental Conditions",
  });
}

export default function RentalConditionsPage({
  loaderData,
}: Route.ComponentProps) {
  const processedHtml =
    loaderData.usloviNajma?.replace(
      /(<p[^>]*class="c3"[^>]*>\s*<span[^>]*>)(.*?)(<br\s*[\/]?>)/s,
      (match, openingTags, titleContent, brTag) => {
        const titleMatch = titleContent.match(/^([^<]+)/);
        if (titleMatch) {
          const titleText = titleMatch[1].trim();
          const remainingContent = titleContent.substring(titleMatch[0].length);
          return `${openingTags}<span class="rental-title-large">${titleText}</span>${remainingContent}${brTag}`;
        }
        return match;
      }
    ) || loaderData.usloviNajma;

  return (
    <div className="w-full min-h-screen">
      <CustomHero
        title={loaderData.lang.seoRentalConditionsTitle}
        description={loaderData.lang.seoRentalConditionsDescription}
        primaryLabel={loaderData.lang.createReservation}
        secondaryLabel={loaderData.lang.contactUs}
        helperText={loaderData.lang.description}
        primaryHref="/reservation"
        secondaryHref={`/${loaderData.langCode}/contact`}
        fastTitle={loaderData.lang.createReservation}
        fastSubtitle={loaderData.lang.deployFaster}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <style>{`
              .rental-conditions-content .rental-title-large {
                font-size: 1.875rem;
                line-height: 1.3;
                font-weight: 700;
                color: #111827;
                display: block;
                margin-bottom: 1rem;
                padding-bottom: 1.5rem;
                border-bottom: 2px solid #d1d5db;
              }
              @media (min-width: 640px) {
                .rental-conditions-content .rental-title-large {
                  font-size: 2.25rem;
                }
              }
            `}</style>
            <div
              className="rental-conditions-content prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-s
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-gray-800
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                [&>p:first-child]:text-base [&>p:first-child]:text-gray-700 [&>p:first-child]:mb-6
                [&>p:first-child>span.c8]:text-lg [&>p:first-child>span.c8]:font-semibold [&>p:first-child>span.c8]:text-gray-800
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ul:my-4
                prose-li:text-gray-700 prose-li:my-2
                prose-a:text-s prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-s prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: processedHtml ?? "" }}
            />
          </div>
        </div>
      </div>

      <Cta lang={loaderData.lang} />
    </div>
  );
}
