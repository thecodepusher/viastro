import { prefs } from "@/lib/prefs-cookie";
import { redirect, useFetcher } from "react-router";
import { ChevronRight } from "lucide-react";
import { getLocale } from "@/lib/utils";
import { getAditionalEquipment, type LocaleTypes } from "@/lib/data";
import { transformApiCars, type ApiAllModelsResponse } from "@/lib/api-cars";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { calculateInWorkingHours } from "@/lib/helpers";
import type { Route } from "./+types/extras";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";

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

  return (
    <div className="w-full">
      <h3 className="font-bold py-4 px-6 text-lg">
        {loaderData.lang.includedInReservation}
      </h3>

      <div className="mx-6 mb-6 flex flex-col gap-2">
        <div
          className={`border rounded shadow gap-4 flex flex-col p-4 bg-s text-white `}>
          <div className="flex flex-col">
            <p className={`text-white font-bold`}>
              {loaderData.lang.basicCascoInsurance}
            </p>
            <p>{loaderData.lang.cascoInsuranceDisclaimer}</p>
          </div>

          <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
            <p className="font-bold text-lg"></p>
          </div>
        </div>

        {loaderData.notInWorkingHours && (
          <div
            className={`border rounded shadow gap-4 flex flex-col p-4 bg-s text-white `}>
            <div className="flex flex-col">
              <p className={`text-white font-bold`}>
                {loaderData.lang.afterHoursReservationFee}
              </p>
              <p>{loaderData.lang.afterHoursFeeDetails}</p>
            </div>

            <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
              <p className="font-bold text-lg">20€</p>
            </div>
          </div>
        )}
      </div>
      <h3 className="font-bold py-4 px-6 text-lg">
        {loaderData.lang.additionalEquipment}
      </h3>

      <div className="mx-6 mb-6 flex flex-col gap-2">
        {loaderData.aditionalEquipment.map((equipment) => {
          const isSelected = selected.some((x) => x == equipment.id);

          return (
            <div
              className={`border rounded shadow gap-4 flex flex-col p-4 ${
                isSelected ? "bg-s text-white" : ""
              }`}
              key={equipment.id}>
              <div className="flex flex-col">
                <p
                  className={`${
                    isSelected ? "text-white" : "text-s"
                  }  font-bold`}>
                  {equipment.name}
                </p>
                <p>{equipment.description}</p>
                {equipment.depositeDiscount > 0 && (
                  <p className=" font-bold mt-2 text-p">
                    {loaderData.lang.vehicleDepositDiscount}{" "}
                    {equipment.depositeDiscount}€
                  </p>
                )}
              </div>

              <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
                {equipment.free && (
                  <p className="font-bold text-lg">
                    {loaderData.lang.freeOfCharge}
                  </p>
                )}
                {!equipment.free && (
                  <p className="font-bold text-lg">
                    {equipment.price}€
                    {equipment.perDay
                      ? `/${loaderData.lang.day} ${
                          equipment.maxPerDays
                            ? `- ${loaderData.lang.maxPrice} ${
                                equipment.maxPerDays * equipment.price
                              }€`
                            : ""
                        }`
                      : ""}
                  </p>
                )}
                <Button
                  variant="outline"
                  className={`${
                    isSelected ? "text-s border-white " : "text-s"
                  } hover:bg-s border-s hover:text-white w-24`}
                  onClick={() => {
                    if (isSelected) {
                      setSelected(selected.filter((x) => x !== equipment.id));
                    } else {
                      setSelected([...selected, equipment.id]);
                    }
                  }}>
                  {isSelected
                    ? loaderData.lang.selected
                    : loaderData.lang.select}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex mb-8 justify-end mx-6">
        <Button
          onClick={() => {
            const form = new FormData();

            form.append("extras", `${selected}`);
            fetcher.submit(form, { method: "post" });
          }}
          className="w-full sm:w-34 bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
          size="lg">
          {loaderData.lang.continue}
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
