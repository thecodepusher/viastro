import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Outlet, redirect, useFetcher } from "react-router";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/vehicle";
import Cars from "@/components/Cars";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  let lang = en;

  // if (params.lang) {
  //   switch (params.lang) {
  //     case "sr":
  //       lang = sr;
  //   }
  // }

  // console.log(cookie);

  // const car = cars.find((x) => x.slug === params["car-slug"]);

  // if (!car) return redirect(`/${params.lang ?? "en"}/cars`);

  return {
    lang,
    // car,
    langCode: params.lang ?? "en",
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
