import { useState, useMemo, useEffect } from "react";
import { redirect, useFetcher } from "react-router";
import { prefs } from "@/lib/prefs-cookie";
import { getLocale, getDatabaseUrl } from "@/lib/utils";
import { getAditionalEquipment, type LocaleTypes, locations } from "@/lib/data";
import { transformApiCars, type ApiAllModelsResponse } from "@/lib/api-cars";
import { calculateInWorkingHours } from "@/lib/helpers";
import { differenceInMinutes, set } from "date-fns";
import type { Route } from "./+types/extras";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { IncludedInReservation } from "@/components/Extras/IncludedInReservation";
import { EquipmentList } from "@/components/Extras/EquipmentList";
import { ContinueButton } from "@/components/Extras/ContinueButton";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

  const lang = await getLocale(params.lang, request);

  const databaseUrl = getDatabaseUrl();

  const res = await fetch(databaseUrl, {
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

  const { notInWorkingHours, priceForOffHours } = calculateInWorkingHours(
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

  let baseCarPrice = 0;
  if (pickupDate && dropoffDate && pickupTime && dropoffTime) {
    const pickupDateAndTime = set(new Date(pickupDate), {
      hours: pickupTime.split(":")[0],
      minutes: pickupTime.split(":")[1],
      seconds: 0,
      milliseconds: 0,
    });

    const dropOffDateAndTime = set(new Date(dropoffDate), {
      hours: dropoffTime.split(":")[0],
      minutes: dropoffTime.split(":")[1],
      seconds: 0,
      milliseconds: 0,
    });

    const days = Math.ceil(
      differenceInMinutes(dropOffDateAndTime, pickupDateAndTime) / 1440
    );

    for (let price of car.prices) {
      if (!price.to) {
        baseCarPrice = days * price.price;
        break;
      }

      if (days >= price.from && days <= price.to) {
        baseCarPrice = price.price * days;
        break;
      }
    }
  }

  const baseUrl = getBaseUrl(request);
  const pickupLocation = locations.find((x) => x.id === +cookie.pickUpLocation);
  const dropoffLocation = locations.find(
    (x) => x.id === +cookie.dropOffLocation
  );

  return {
    lang,
    notInWorkingHours,
    priceForOffHours,
    aditionalEquipment: ad,
    langCode: params.lang ?? "sr",
    baseUrl,
    car,
    baseCarPrice,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    pickupLocation: pickupLocation?.name || "",
    dropoffLocation: dropoffLocation?.name || "",
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
    title: data.lang.seoReservationExtrasTitle,
    description: data.lang.seoReservationExtrasDescription,
    url: `/${data.langCode || "sr"}/reservation/extras`,
    baseUrl,
    keywords: data.lang.seoReservationExtrasKeywords,
    imageAlt: "Viastro - Additional Equipment",
  });
}

export default function Extras({ loaderData }: Route.ComponentProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const fetcher = useFetcher();

  const days = useMemo(() => {
    if (
      !loaderData.pickupDate ||
      !loaderData.dropoffDate ||
      !loaderData.pickupTime ||
      !loaderData.dropoffTime
    )
      return 1;

    const pickupDateAndTime = set(new Date(loaderData.pickupDate), {
      hours: loaderData.pickupTime.split(":")[0],
      minutes: loaderData.pickupTime.split(":")[1],
      seconds: 0,
      milliseconds: 0,
    });

    const dropOffDateAndTime = set(new Date(loaderData.dropoffDate), {
      hours: loaderData.dropoffTime.split(":")[0],
      minutes: loaderData.dropoffTime.split(":")[1],
      seconds: 0,
      milliseconds: 0,
    });

    return Math.ceil(
      differenceInMinutes(dropOffDateAndTime, pickupDateAndTime) / 1440
    );
  }, [
    loaderData.pickupDate,
    loaderData.dropoffDate,
    loaderData.pickupTime,
    loaderData.dropoffTime,
  ]);

  const handleToggleEquipment = (id: number) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((x) => x !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const totalPrice = useMemo(() => {
    let price = loaderData.baseCarPrice;

    if (loaderData.notInWorkingHours && loaderData.priceForOffHours > 0) {
      price += loaderData.priceForOffHours;
    }

    selected.forEach((equipmentId) => {
      const equipment = loaderData.aditionalEquipment.find(
        (eq) => eq.id === equipmentId
      );
      if (equipment && !equipment.free) {
        if (equipment.perDay) {
          if (equipment.maxPerDays && equipment.maxPerDays < days) {
            price += equipment.price * equipment.maxPerDays;
          } else {
            price += equipment.price * days;
          }
        } else {
          price += equipment.price;
        }
      }
    });

    return price;
  }, [
    loaderData.baseCarPrice,
    loaderData.notInWorkingHours,
    loaderData.aditionalEquipment,
    selected,
    days,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__extrasTotalPrice = totalPrice;
      window.dispatchEvent(
        new CustomEvent("extrasPriceUpdated", { detail: totalPrice })
      );
    }
  }, [totalPrice]);

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
        priceForOffHours={loaderData.priceForOffHours}
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
