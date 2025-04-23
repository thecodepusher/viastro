import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Link, Outlet } from "react-router";
import { CheckIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/extras";
import { aditionalEquipment } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    langCode: params.lang,
  };
}

export async function action({ request }: Route.ActionArgs) {}
export function meta({}: Route.MetaArgs) {}

export default function Vehicle({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <div className="w-full">
      <h3 className="font-bold py-4 px-6 text-lg">Additional Equipment</h3>

      <div className="mx-6 mb-6 flex flex-col gap-2">
        {aditionalEquipment.map((equipment) => {
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
              </div>

              <div className="flex border-t pt-4 justify-end w-full gap-6 items-center">
                <p className="font-bold text-lg">{equipment.price}€</p>
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
        <Link to="../review">
          <Button className="bg-s hover:bg-p" size="lg">
            Continue
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
