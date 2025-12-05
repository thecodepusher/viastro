import { prefs } from "@/lib/prefs-cookie";
import { redirect, useFetcher } from "react-router";
import { getLocale } from "@/lib/utils";
import { getAditionalEquipment, type LocaleTypes } from "@/lib/data";
import { transformApiCars, type ApiAllModelsResponse } from "@/lib/api-cars";
import { useState } from "react";
import { calculateInWorkingHours } from "@/lib/helpers";
import type { Route } from "./+types/extras";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { IncludedInReservation } from "@/components/Extras/IncludedInReservation";
import { EquipmentList } from "@/components/Extras/EquipmentList";
import { ContinueButton } from "@/components/Extras/ContinueButton";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  const lang = await getLocale(params.lang, request);

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });
  const apiResponse: ApiAllModelsResponse = await res.json();

  const transformedCars = transformApiCars(apiResponse, lang);

  const car = transformedCars.find((x) => x.exnternalId === cookie.carId);

  const pickupDate = cookie.pickUpDate;
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = cookie.dropOffDate;
  const dropoffTime = cookie.dropOffTime;

  let notInWorkingHours = calculateInWorkingHours(
    dropoffDate,
    pickupDate,
    dropoffTime,
    pickupTime
  );
  if (!car) {
    return redirect("../vehicle");
  }

  const ad = [
    ...car.aditionalEquipment,
    ...getAditionalEquipment(params.lang as LocaleTypes),
  ];

  const baseUrl = getBaseUrl(request);

  return {
    lang,
    notInWorkingHours,
    aditionalEquipment: ad,
    langCode: params.lang ?? "sr",
    baseUrl,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const extras = formData.get("extras");

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  cookie.extras = extras;

  return redirect("../review", {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}
export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: "Reservation - Additional Equipment | Viastro Rent a Car",
    description:
      "Select additional equipment and extras for your car rental in Belgrade.",
    url: `/${data.langCode || "sr"}/reservation/extras`,
    baseUrl,
    keywords: "reservation, additional equipment, extras, rent a car Belgrade",
    imageAlt: "Viastro - Additional Equipment",
  });
}

export default function Extras({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const fetcher = useFetcher();

  const handleToggleEquipment = (id: number) => {
    if (selected.some((x) => x === id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    const form = new FormData();
    form.append("extras", `${selected}`);
    fetcher.submit(form, { method: "post" });
  };

  return (
    <div className="w-full">
      <IncludedInReservation
        lang={loaderData.lang}
        notInWorkingHours={loaderData.notInWorkingHours}
      />

      <EquipmentList
        equipment={loaderData.aditionalEquipment}
        lang={loaderData.lang}
        selectedIds={selected}
        onToggle={handleToggleEquipment}
      />

      <ContinueButton lang={loaderData.lang} onClick={handleContinue} />
    </div>
  );
}
