import type { Route } from "./+types/rental-conditions-page";
import { usloviNajma } from "@/lib/data";
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

  const data = {
    langCode: params.lang ?? "sr",
    lang,
    usloviNajma: usloviNajma,
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
    title: "Rental Conditions | Viastro Rent a Car",
    description:
      "Read Viastro's rental conditions and terms of service for car rental in Belgrade, Serbia.",
    url: `/${data.langCode || "sr"}/rental-conditions`,
    baseUrl,
    keywords: "rental conditions, terms of service, car rental Belgrade",
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
