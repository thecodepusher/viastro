import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/success";
import { getLocale } from "@/lib/utils";
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
    lang,
    langCode: params.lang ?? "sr",
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
    title: data.lang.seoSuccessTitle,
    description: data.lang.seoSuccessDescription,
    url: `/${data.langCode || "sr"}/success`,
    baseUrl,
    keywords: data.lang.seoSuccessKeywords,
    imageAlt: "Viastro - Reservation Successful",
  });
}

export default function SuccessPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <div className="my-32 gap-8 flex flex-col items-center justify-center text-center">
        <CircleCheck size={60} className="text-p" />
        <p className="font-medium text-lg text-pd mx-8">
          {loaderData.lang.successTitle}
        </p>
        <Link to={`/${loaderData.langCode}`}>
          <Button className="bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed">
            {loaderData.lang.successAction}
          </Button>
        </Link>
      </div>
    </div>
  );
}
