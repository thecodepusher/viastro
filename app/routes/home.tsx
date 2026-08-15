import { useEffect, useRef, useState } from "react";
import { redirect, useFetcher, useNavigate } from "react-router";
import { prefs } from "@/lib/prefs-cookie";
import { useIsMobile } from "@/hooks/use-mobile";
import { setHours } from "date-fns";
import { locations } from "@/lib/data";
import { getLocale, getDatabaseUrl } from "@/lib/utils";
import { type ApiAllModelsResponse } from "@/lib/api-cars";
import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import TrustedBy from "@/components/TrustedBy";
import BlogSection from "@/components/BlogSection";
import Logos from "@/components/Logos";
import GetInTouch from "@/components/GetInTouch";
import Cars from "@/components/Cars";
import ReservationTime from "@/components/ReservationTime";
import SEO from "@/components/SEO";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateCarRentalServiceSchema,
  generateOpenGraphMeta,
} from "@/lib/seo";
import { publicPaths } from "@/lib/paths";
import type { Route } from "./+types/home";

export const links: Route.LinksFunction = () => [];

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();
  const locale =
    data.langCode === "sr"
      ? "sr_RS"
      : data.langCode === "en"
        ? "en_US"
        : "ru_RU";

  return generateOpenGraphMeta({
    title: data.lang.seoHomeTitle,
    description: data.lang.seoHomeDescription,
    url: `/${data.langCode || "sr"}`,
    baseUrl,
    keywords: data.lang.seoHomeKeywords,
    imageAlt: "Viastro Rent a Car - Premium Car Rental in Belgrade",
    locale,
  });
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const pickUpLocation = formData.get("pickUpLocation");
  const dropOffLocation = formData.get("dropOffLocation");
  const pickUpDate = formData.get("pickUpDate");
  const pickUpTime = formData.get("pickUpTime");
  const dropOffDate = formData.get("dropOffDate");
  const dropOffTime = formData.get("dropOffTime");
  const selectedCarId = formData.get("selectedCarId");

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

  if (pickUpLocation) {
    cookie.pickUpLocation = pickUpLocation;
    cookie.dropOffLocation = dropOffLocation;
    cookie.pickUpDate = pickUpDate;
    cookie.pickUpTime = pickUpTime;
    cookie.dropOffDate = dropOffDate;
    cookie.dropOffTime = dropOffTime;

    return redirect(publicPaths.reservationVehicle(params.lang ?? "sr"), {
      headers: {
        "Set-Cookie": await prefs.serialize(cookie),
      },
    });
  }

  if (selectedCarId) {
    cookie.selectedCarId = selectedCarId;

    return new Response(null, {
      status: 200,
      headers: {
        "Set-Cookie": await prefs.serialize(cookie),
      },
    });
  }

  return new Response(null, { status: 400 });
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
  let lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

  const databaseUrl = getDatabaseUrl();

  const res = await fetch(databaseUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });

  const apiResponse: ApiAllModelsResponse = await res.json();
  const baseUrl = getBaseUrl(request);

  const data = {
    langCode: params.lang ?? "sr",
    lang,
    locations,
    message: context.VALUE_FROM_EXPRESS,
    cars: apiResponse,
    baseUrl,
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // video može da krene pre hidratacije (onPlaying se tada ne okine),
  // pa nakon mount-a / promene izvora proveravamo trenutno stanje
  useEffect(() => {
    const video = videoRef.current;
    setVideoPlaying(!!video && !video.paused && video.readyState >= 3);
  }, [isMobile]);

  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateWebSiteSchema(loaderData.baseUrl, loaderData.langCode),
    generateLocalBusinessSchema(loaderData.baseUrl, loaderData.langCode),
    generateCarRentalServiceSchema(loaderData.baseUrl, loaderData.langCode),
  ];

  return (
    <div className="w-full">
      <SEO schemas={schemas} />
      <div className="flex flex-col w-full mt-18 sm:mt-20">
        <div className="relative flex flex-col items-center justify-end sm:justify-center min-h-[calc(100svh-4.5rem)] sm:h-[calc(100vh-5rem)] overflow-hidden">
          <video
            key={isMobile ? "mobile" : "desktop"}
            ref={videoRef}
            className="hero-video absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            width="1200"
            height="630"
            onPlaying={() => setVideoPlaying(true)}
            {...({
              fetchPriority: "high",
            } as React.VideoHTMLAttributes<HTMLVideoElement>)}
            aria-label="Hero video background">
            <source
              src={isMobile ? "/hero-video.mp4" : "/hero-video-desktop.mp4"}
              type="video/mp4"
            />
          </video>

          <div
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full bg-pd flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
              videoPlaying ? "opacity-0" : "opacity-100"
            }`}>
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-p animate-spin" />
          </div>

          <div className="absolute inset-0 w-full h-full bg-linear-to-b from-pd/35 via-pd/40 to-pd/75" />
          <div className="absolute inset-0 w-full h-full bg-linear-to-tr from-p/10 via-transparent to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 sm:py-16 lg:py-20">
            <div className="text-center mb-6 sm:mb-10 animate-fade-in-up">
              <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-p">
                Viastro Rent a Car
              </p>
              <h1 className="font-display text-white font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-2">
                {loaderData.lang.title}
              </h1>
              <h2 className="font-display text-white/90 font-semibold text-xl sm:text-3xl lg:text-4xl tracking-tight">
                <span className="text-p">{loaderData.lang.subTitle}</span>
              </h2>
            </div>

            <div className="w-full animate-fade-in-up-delay">
              <ReservationTime
                isLoading={fetcher.state !== "idle"}
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
        </div>
      </div>

      <Logos lang={loaderData.lang} />
      <Cars
        onSelect={(carId) => {
          const form = new FormData();
          form.append("selectedCarId", `${carId}`);
          fetcher.submit(form, { method: "post" });
          navigate("reservation");
        }}
        lang={loaderData.lang}
        langCode={loaderData.langCode}
        cars={loaderData.cars}
      />
      <TrustedBy lang={loaderData.lang} />
      <BlogSection langCode={loaderData.langCode} lang={loaderData.lang} />
      <FandQ langCode={loaderData.langCode} />
      <GetInTouch lang={loaderData.lang} />
      <Cta lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
