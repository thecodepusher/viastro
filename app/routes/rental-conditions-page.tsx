import type { Route } from "./+types/rental-conditions-page";
import { usloviNajmaSr, usloviNajmaRs, rentalConditionsEn } from "@/lib/data";
import { getLocale } from "@/lib/utils";
import Cta from "@/components/Cta";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { Link } from "react-router";
import { FileText } from "lucide-react";

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
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="relative bg-linear-to-r from-s via-s/95 to-s/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-28 sm:pt-36">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <nav
              className="flex items-center gap-2 text-sm sm:text-base text-white/90"
              aria-label="Breadcrumb">
              <Link
                to={`/${loaderData.langCode}`}
                className="hover:text-white transition-colors">
                {loaderData.lang.home}
              </Link>
              <span className="text-white/60">/</span>
              <span className="text-white font-medium">
                {loaderData.lang.rentalConditions}
              </span>
            </nav>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {loaderData.lang.rentalConditions}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl">
            {loaderData.lang.seoRentalConditionsDescription}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <div
              className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-s
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-gray-800
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ul:my-4
                prose-li:text-gray-700 prose-li:my-2
                prose-a:text-s prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-s prose-blockquote:pl-4 prose-blockquote:italic
                [&>p:first-child]:text-lg [&>p:first-child]:font-semibold [&>p:first-child]:text-gray-900
                [&>p:first-child]:mb-6 [&>p:first-child]:pb-4 [&>p:first-child]:border-b [&>p:first-child]:border-gray-200"
              dangerouslySetInnerHTML={{ __html: loaderData.usloviNajma ?? "" }}
            />
          </div>
        </div>
      </div>

      <Cta lang={loaderData.lang} />
    </div>
  );
}
