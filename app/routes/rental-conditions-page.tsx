import type { Route } from "./+types/rental-conditions-page";
import { usloviNajmaSr, usloviNajmaRs, rentalConditionsEn } from "@/lib/data";
import { getLocale } from "@/lib/utils";
import Cta from "@/components/Cta";
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
    <div className="w-full">
      <div className="mt-16 prose prose-lg max-w-4xl mx-auto p-4 prose-headings:text-gray-800 prose-p:text-gray-700">
        <div
          dangerouslySetInnerHTML={{ __html: loaderData.usloviNajma ?? "" }}
        />
      </div>
      <Cta lang={loaderData.lang} />
    </div>
  );
}
