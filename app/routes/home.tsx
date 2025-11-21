import { redirect, useFetcher, useNavigate } from "react-router";
import { prefs } from "@/lib/prefs-cookie";
import { useIsMobile } from "@/hooks/use-mobile";
import { setHours } from "date-fns";
import { locations } from "@/lib/data";
import { getLocale } from "@/lib/utils";
import { type ApiAllModelsResponse } from "@/lib/api-cars";
import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import TrustedBy from "@/components/TrustedBy";
import BlogSection from "@/components/BlogSection";
import Logos from "@/components/Logos";
import GetInTouch from "@/components/GetInTouch";
import Cars from "@/components/Cars";
import ReservationTime from "@/components/ReservationTime";
import type { Route } from "./+types/home";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Viastro rent a car | Belgrade" },
    { name: "description", content: data.lang.description },
  ];
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

  return redirect("reservation/vehicle", {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
  let lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });

  const apiResponse: ApiAllModelsResponse = await res.json();

  const data = {
    langCode: params.lang ?? "sr",
    lang,
    locations,
    message: context.VALUE_FROM_EXPRESS,
    cars: apiResponse,
    initialValues: {
      pickUpDate: undefined,
      pickUpTime: undefined,
      dropOffDate: undefined,
      dropOffTime: undefined,
      pickUpLocation: cookie.pickUpLocation,
      dropOffLocation: cookie.dropOffLocation,
    },
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const heroVideoUrl = isMobile ? "/hero-video.mp4" : "/hero-video-desktop.mp4";

  return (
    <div className="w-full">
      <div className="flex flex-col w-full mt-18">
        <div className="relative flex flex-col items-center justify-center h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-8.5rem)] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full sm:object-cover object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Hero video background">
            <source src={heroVideoUrl} type="video/mp4" />
          </video>

          <div className="absolute inset-0 w-full h-full bg-linear-to-b from-black/40 via-black/50 to-black/70" />

          <div className="absolute inset-0 w-full h-full bg-linear-to-b from-[#FF9B17]/20 via-[#FF9B17]/5 to-transparent" />

          <div className="absolute sm:relative bottom-0 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-20">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-white font-black uppercase text-3xl sm:text-4xl lg:text-5xl mb-4 drop-shadow-lg">
                {loaderData.lang.title}
              </h1>
              <h2 className="text-white font-black uppercase text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg">
                <span className="text-[#FF9B17]">
                  {loaderData.lang.subTitle}
                </span>
              </h2>
            </div>

            <div className="w-full">
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
        </div>
      </div>

      <Logos lang={loaderData.lang} />
      <Cars
        onSelect={() => {
          navigate("reservation");
        }}
        lang={loaderData.lang}
        langCode={loaderData.langCode}
        cars={loaderData.cars}
      />
      <TrustedBy lang={loaderData.lang} />
      <BlogSection langCode={loaderData.langCode} />
      <FandQ langCode={loaderData.langCode} />
      <GetInTouch lang={loaderData.lang} />
      <Cta lang={loaderData.lang} />
    </div>
  );
}
