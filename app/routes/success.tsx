import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/success";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { publicPaths } from "@/lib/paths";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  if (!cookie.paymentSuccessful) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const lang = await getLocale(params.lang, request);

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;
  delete cookie.paymentSuccessful;
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

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
  if (!data) {
    return [];
  }

  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: data.lang.seoSuccessTitle,
    description: data.lang.seoSuccessDescription,
    url: publicPaths.success(data.langCode || "sr"),
    baseUrl,
    keywords: data.lang.seoSuccessKeywords,
    imageAlt: "Viastro - Reservation Successful",
  });
}

export default function SuccessPage({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return null;
  }

  return (
    <div className="w-full bg-surface">
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-500/30">
          <CircleCheck size={44} className="text-emerald-400" strokeWidth={2.5} />
        </div>

        <div className="w-full space-y-4 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
          <div className="space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {loaderData.lang.successTitle
              .split(". ")
              .map((sentence, index, array) => {
                const trimmedSentence = sentence.trim();
                if (!trimmedSentence) return null;
                const isLast = index === array.length - 1;
                return (
                  <p key={index}>
                    {trimmedSentence}
                    {isLast ? "" : "."}
                  </p>
                );
              })}
          </div>
        </div>

        <Link to={`/${loaderData.langCode}`} className="mt-8">
          <Button
            size="lg"
            className="rounded-full bg-p px-8 font-semibold text-primary-foreground shadow-md shadow-p/20 transition-all hover:bg-p/90 hover:shadow-lg">
            {loaderData.lang.successAction}
          </Button>
        </Link>
      </div>
    </div>
  );
}
