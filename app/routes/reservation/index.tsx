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
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;
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
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

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
    title: data.lang.seoReservationSelectDatesTitle,
    description: data.lang.seoReservationSelectDatesDescription,
    url: `/${data.langCode || "sr"}/reservation`,
    baseUrl,
    keywords: data.lang.seoReservationSelectDatesKeywords,
    imageAlt: "Viastro - Select Reservation Dates",
  });
}

export default function Reservation({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  return (
    <section className="relative overflow-hidden bg-pd">
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/long-term-rental-hero-2.webp)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-linear-to-r from-pd/75 via-pd/60 to-pd/40" />
        <div className="absolute inset-0 bg-linear-to-t from-pd/50 via-transparent to-pd/20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[70vh] flex items-center justify-center py-10">
          <ReservationTime
            onStart={async (data) => {
              const form = new FormData();
              form.append("pickUpLocation", data.pickUpLocation);
              form.append("dropOffLocation", data.dropOffLocation);
              form.append(
                "pickUpDate",
                setHours(data.pickDate, 12).toISOString(),
              );
              form.append("pickUpTime", data.pickUpTime);
              form.append(
                "dropOffDate",
                setHours(data.dropDate, 12).toISOString(),
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
    </section>
  );
}
