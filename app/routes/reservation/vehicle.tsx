import { prefs } from "@/lib/prefs-cookie";

import { redirect, useFetcher } from "react-router";
import { getLocale } from "@/lib/utils";
import Cars from "@/components/Cars";
import { format } from "date-fns";
import {
  type ApiCarsResponse,
  type ApiAllModelsResponse,
  transformApiCars,
  type TransformedCar,
} from "@/lib/api-cars";
import type { Route } from "./+types/vehicle";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const lang = await getLocale(params.lang, request);
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const pickupDate = new Date(cookie.pickUpDate);
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = new Date(cookie.dropOffDate);
  const dropoffTime = cookie.dropOffTime;

  const allModelsRes = await fetch(
    "https://rentacar-manager.com/client/viastro/api/",
    {
      method: "POST",
      body: JSON.stringify({
        action: "get_all_models",
      }),
      headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
    }
  );
  const allModels: ApiAllModelsResponse = await allModelsRes.json();

  const availableRes = await fetch(
    "https://rentacar-manager.com/client/viastro/api/",
    {
      method: "POST",
      body: JSON.stringify({
        action: "get_available_models",
        date_from: `${format(pickupDate, "dd/MM/yyyy")} ${pickupTime}`,
        date_to: `${format(dropoffDate, "dd/MM/yyyy")} ${dropoffTime}`,
      }),
      headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
    }
  );
  const availableResponse: ApiCarsResponse = await availableRes.json();
  const availableCarIds = availableResponse.available_models.map(
    (car) => car.id
  );
  const transformedCars = transformApiCars(
    allModels,
    lang,
    availableResponse.days,
    availableCarIds
  );

  const selectedCarId = cookie.selectedCarId
    ? parseInt(cookie.selectedCarId as string, 10)
    : null;

  let sortedCars = [...transformedCars];
  if (selectedCarId) {
    const selectedCarIndex = sortedCars.findIndex(
      (car) => car.id === selectedCarId
    );
    if (selectedCarIndex !== -1) {
      const selectedCar = sortedCars[selectedCarIndex];
      sortedCars.splice(selectedCarIndex, 1);
      sortedCars.unshift(selectedCar);
    }
  }

  const baseUrl = getBaseUrl(request);

  return {
    cars: sortedCars,
    selectedCarId,
    lang,
    langCode: params.lang ?? "sr",
    baseUrl,
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

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: "Reservation - Select Vehicle | Viastro Rent a Car",
    description:
      "Choose from our wide selection of vehicles for your car rental in Belgrade.",
    url: `/${data.langCode || "sr"}/reservation/vehicle`,
    baseUrl,
    keywords: "reservation, select vehicle, choose car, rent a car Belgrade",
    imageAlt: "Viastro - Select Vehicle",
  });
}

export default function Vehicle({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  return (
    <div className="w-full">
      <Cars
        cars={loaderData.cars as TransformedCar[]}
        selectedCarId={loaderData.selectedCarId}
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
