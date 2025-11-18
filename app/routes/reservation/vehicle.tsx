import { prefs } from "@/lib/prefs-cookie";

import { redirect, useFetcher } from "react-router";
import { getLocale } from "@/lib/utils";
import Cars from "@/components/Cars";
import { format } from "date-fns";
import type { Route } from "./+types/vehicle";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");

  const lang = await getLocale(params.lang, request);

  const cookie = (await prefs.parse(cookieHeader)) || {};

  const pickupDate = new Date(cookie.pickUpDate);
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = new Date(cookie.dropOffDate);
  const dropoffTime = cookie.dropOffTime;

  const cars: string[] = [];

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
    method: "POST",
    body: JSON.stringify({
      action: "get_available_models",
      date_from: `${format(pickupDate, "dd/MM/yyyy")} ${pickupTime}`,
      date_to: `${format(dropoffDate, "dd/MM/yyyy")} ${dropoffTime}`,
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });
  const availableCars = await res.json();

  for (let a of availableCars.available_models) {
    cars.push(a.id);
  }

  return {
    cars,
    lang,
    langCode: params.lang ?? "sr",
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

export default function Vehicle({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  return (
    <div className="w-full">
      <Cars
        availableCars={loaderData.cars}
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
