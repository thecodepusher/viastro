import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import { Outlet, redirect, useFetcher } from "react-router";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Route } from "./+types/reservation";
import ReservationTime from "@/components/ReservationTime";
import { locations } from "@/lib/data";
import { setHours } from "date-fns";

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
    locations,
    langCode: params.lang,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const pickUpLocation = formData.get("pickUpLocation");
  const dropOffLocation = formData.get("dropOffLocation");
  const pickUpDate = formData.get("pickUpDate");
  const pickUpTime = formData.get("pickUpTime");
  const dropOffDate = formData.get("dropOffDate");
  const dropOffTime = formData.get("dropOffTime");

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  cookie.pickUpLocation = pickUpLocation;
  cookie.dropOffLocation = dropOffLocation;
  cookie.pickUpDate = pickUpDate;
  cookie.pickUpTime = pickUpTime;
  cookie.dropOffDate = dropOffDate;
  cookie.dropOffTime = dropOffTime;

  return redirect("vehicle", {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}
export function meta({}: Route.MetaArgs) {}

export default function Reservation({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const fetcher = useFetcher();

  return (
    <div className="flex flex-col w-full">
      <div className="gap-4 flex flex-col bg-gradient-to-b from-p">
        <ReservationTime
          onStart={async (data) => {
            const form = new FormData();
            form.append("pickUpLocation", data.pickUpLocation);
            form.append("dropOffLocation", data.dropOffLocation);
            form.append(
              "pickUpDate",
              setHours(data.pickDate, 12).toISOString()
            );
            form.append("pickUpTime", data.pickUpTime);
            form.append(
              "dropOffDate",
              setHours(data.dropDate, 12).toISOString()
            );
            form.append("dropOffTime", data.dropOfTime);
            fetcher.submit(form, { method: "post" });
          }}
          lang={loaderData.lang}
          locations={loaderData.locations}
        />
      </div>
    </div>
  );
}
