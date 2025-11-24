import { prefs } from "@/lib/prefs-cookie";
import { redirect, useFetcher } from "react-router";
import { getLocale } from "@/lib/utils";
import ReservationTime from "@/components/ReservationTime";
import { locations } from "@/lib/data";
import { setHours } from "date-fns";
import type { Route } from "./+types";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";

export async function loader({ request, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const baseUrl = getBaseUrl(request);

  return {
    lang,
    locations,
    langCode: params.lang ?? "sr",
    baseUrl,
    initialValues: {
      pickUpDate: cookie.pickUpDate,
      pickUpTime: cookie.pickUpTime,
      dropOffDate: cookie.dropOffDate,
      dropOffTime: cookie.dropOffTime,
      pickUpLocation: cookie.pickUpLocation,
      dropOffLocation: cookie.dropOffLocation,
    },
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
export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: "Reservation - Select Dates | Viastro Rent a Car",
    description:
      "Select your pickup and drop-off dates and locations for your car rental in Belgrade.",
    url: `/${data.langCode || "sr"}/reservation`,
    baseUrl,
    keywords: "reservation, book car, select dates, rent a car Belgrade",
    imageAlt: "Viastro - Select Reservation Dates",
  });
}

export default function Reservation({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-center bg-linear-to-b from-p sm:h-[60vh] h-[50vh]">
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
            initialValues={loaderData.initialValues}
          />
      </div>
    </div>
  );
}
