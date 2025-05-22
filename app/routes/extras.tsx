import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { langCookie, prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Link, Outlet, redirect, replace, useFetcher } from "react-router";
import { CheckIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/extras";
import { aditionalEquipment, cars, locations, wokringHours } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { calculateInWorkingHours } from "@/lib/helpers";
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

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  const car = cars.find((x) => x.id === +cookie.carId);
  const pickupDate = cookie.pickUpDate;
  const pickupTime = cookie.pickUpTime;
  const dropoffDate = cookie.dropOffDate;
  const dropoffTime = cookie.dropOffTime;

  if (!car) {
    return redirect("../vehicle");
  }

  let notInWorkingHours = calculateInWorkingHours(
    dropoffDate,
    pickupDate,
    dropoffTime,
    pickupTime
  );

  let lang = en;

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        lang = sr;
    }
  }

  const ad = [...car.aditionalEquipment, ...aditionalEquipment];

  return {
    lang,
    notInWorkingHours,
    aditionalEquipment: ad,
    // car,
    langCode: params.lang,
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
export function meta({}: Route.MetaArgs) {}

export default function Vehicle({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const fetcher = useFetcher();

  return (
    <div className="w-full">
      <h3 className="font-bold py-4 px-6 text-lg">Included in reservation</h3>

      <div className="mx-6 mb-6 flex flex-col gap-2">
        <div
          className={`border rounded shadow gap-4 flex flex-col p-4 bg-s text-white `}
        >
          <div className="flex flex-col">
            <p className={`text-white font-bold`}>
              Osnovno kasko osiguranje (uključeno u cenu najma)
            </p>
            <p>
              Sva vozila iz naše flote dolaze sa uključenim osnovnim kasko
              osiguranjem, koje pruža pokriće u slučaju saobraćajne nezgode,
              krađe vozila ili štete nastale usled više sile (poplave, požari i
              slično). Osiguranje ne pokriva štetu nastalu usled grubog nemara,
              vožnje pod dejstvom alkohola ili psihoaktivnih supstanci, kao ni
              štetu na gumama, staklima i donjem postroju, osim ako nije
              drugačije ugovoreno. Za dodatnu sigurnost, dostupan je i full
              protect paket osiguranja.
            </p>
          </div>

          <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
            <p className="font-bold text-lg"></p>
          </div>
        </div>

        {loaderData.notInWorkingHours && (
          <div
            className={`border rounded shadow gap-4 flex flex-col p-4 bg-s text-white `}
          >
            <div className="flex flex-col">
              <p className={`text-white font-bold`}>
                Dodatak za rezervaciju van radnog vremena
              </p>
              <p>
                Za podizanje ili vracanje vozila van radnog vremena naplacuje se
                dodatno
              </p>
            </div>

            <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
              <p className="font-bold text-lg">20€</p>
            </div>
          </div>
        )}
      </div>
      <h3 className="font-bold py-4 px-6 text-lg">Additional Equipment</h3>

      <div className="mx-6 mb-6 flex flex-col gap-2">
        {loaderData.aditionalEquipment.map((equipment) => {
          const isSelected = selected.some((x) => x == equipment.id);

          return (
            <div
              className={`border rounded shadow gap-4 flex flex-col p-4 ${
                isSelected ? "bg-s text-white" : ""
              }`}
              key={equipment.id}
            >
              <div className="flex flex-col">
                <p
                  className={`${
                    isSelected ? "text-white" : "text-s"
                  }  font-bold`}
                >
                  {equipment.name}
                </p>
                <p>{equipment.description}</p>
                {equipment.depositeDiscount > 0 && (
                  <p className=" font-bold mt-2 text-p">
                    Vehicle deposite discount {equipment.depositeDiscount}€
                  </p>
                )}
              </div>

              <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
                {equipment.free && (
                  <p className="font-bold text-lg">Free of charge</p>
                )}
                {!equipment.free && (
                  <p className="font-bold text-lg">
                    {equipment.price}€
                    {equipment.perDay
                      ? `/day ${
                          equipment.maxPerDays
                            ? `- max price ${
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
                  }}
                >
                  {isSelected ? "Selected" : "Select"}
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
          className="bg-s hover:bg-p"
          size="lg"
        >
          Continue
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
