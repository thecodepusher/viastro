import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { langCookie, prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Outlet, redirect, replace, useFetcher } from "react-router";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/vehicle";
import Cars from "@/components/Cars";
import { sr } from "@/locales/sr";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  if (!params.lang) {
    const cookieHeader = request.headers.get("Cookie");

    const lgCookie = (await langCookie.parse(cookieHeader)) || {};

    const url = new URL(request.url);

    let returnPath = url.pathname;

    if (lgCookie.lang) {
      if (returnPath == "/") {
        return replace(`/${lgCookie.lang}`);
      }
      return replace(`/${lgCookie.lang}${url.pathname}`);
    }

    if (returnPath == "/") {
      return replace(`/en`);
    }

    return replace(`/en${url.pathname}`);
  }

  let lang = en;

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        lang = sr;
    }
  }

  return {
    lang,
    langCode: params.lang,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const carId = formData.get("carId");

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  cookie.carId = carId;

  return redirect("../extras", {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export function meta({}: Route.MetaArgs) {}

export default function Vehicle({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const fetcher = useFetcher();

  return (
    <div className="w-full">
      <Cars
        onSelect={(carId) => {
          const form = new FormData();
          form.append("carId", `${carId}`);

          fetcher.submit(form, { method: "post" });
        }}
        lang={loaderData.lang}
        langCode={loaderData.langCode}
      />
    </div>
  );
}
