import { Link, Outlet, useMatches, useFetcher } from "react-router";
import { reservationSteps } from "@/lib/reservation";
import type { Route } from "./+types/reservation-page";
import { CheckIcon, ChevronRight } from "lucide-react";
import { cn, getLocale } from "@/lib/utils";
import { useEffect, useState } from "react";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { type ApiAllModelsResponse, transformApiCars } from "@/lib/api-cars";
import { locations } from "@/lib/data";
import { differenceInDays } from "date-fns";
import { CarSummary } from "@/components/Reservation/CarSummary";

export async function loader({ request, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const baseUrl = getBaseUrl(request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  let carSummary = null;

  if (cookie.carId) {
    try {
      const res = await fetch(
        "https://rentacar-manager.com/client/viastro/api/",
        {
          method: "POST",
          body: JSON.stringify({
            action: "get_all_models",
          }),
          headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
        }
      );
      const apiResponse: ApiAllModelsResponse = await res.json();
      const transformedCars = transformApiCars(apiResponse, lang);
      const car = transformedCars.find((x) => x.exnternalId === cookie.carId);

      if (car && cookie.pickUpDate && cookie.dropOffDate) {
        const pickupDate = new Date(cookie.pickUpDate);
        const dropoffDate = new Date(cookie.dropOffDate);
        const days = differenceInDays(dropoffDate, pickupDate) || 1;

        let carPrice = 0;
        for (const price of car.prices) {
          if ((!price.to || days <= price.to) && days >= price.from) {
            carPrice = days * price.price;
            break;
          }
        }

        const pickupLocation = locations.find(
          (x) => x.id === +cookie.pickUpLocation
        );
        const dropoffLocation = locations.find(
          (x) => x.id === +cookie.dropOffLocation
        );

        carSummary = {
          car,
          pickupDate: cookie.pickUpDate,
          pickupTime: cookie.pickUpTime,
          dropoffDate: cookie.dropOffDate,
          dropoffTime: cookie.dropOffTime,
          pickupLocation: pickupLocation?.name || "",
          dropoffLocation: dropoffLocation?.name || "",
          price: carPrice,
          days,
        };
      }
    } catch (error) {
      console.error("Error loading car summary:", error);
    }
  }

  return {
    lang,
    langCode: params.lang ?? "sr",
    baseUrl,
    carSummary,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.selectedCarId;

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: data.lang.seoReservationTitle,
    description: data.lang.seoReservationDescription,
    url: `/${data.langCode || "sr"}/reservation`,
    baseUrl,
    keywords: data.lang.seoReservationKeywords,
    imageAlt: "Viastro - Car Rental Reservation",
  });
}

export default function ReservationPage({ loaderData }: Route.ComponentProps) {
  const matches = useMatches();
  const steps = reservationSteps(loaderData, matches[2]);

  const reviewLoaderData = matches.find((m) => m.id === "routes/review")
    ?.data as { carPrice?: number } | undefined;
  const carPriceFromReview = reviewLoaderData?.carPrice;

  const [extrasPrice, setExtrasPrice] = useState<number | null>(null);

  useEffect(() => {
    const checkExtrasPrice = () => {
      if (typeof window !== "undefined" && (window as any).__extrasTotalPrice) {
        setExtrasPrice((window as any).__extrasTotalPrice);
      }
    };

    checkExtrasPrice();

    const interval = setInterval(checkExtrasPrice, 100);

    return () => clearInterval(interval);
  }, []);

  const carSummaryWithPrice = loaderData.carSummary
    ? {
        ...loaderData.carSummary,
        price:
          extrasPrice !== null
            ? extrasPrice
            : carPriceFromReview || loaderData.carSummary.price,
      }
    : null;
  const [isAnimating, setIsAnimating] = useState(false);
  const fetcher = useFetcher();

  const completedSteps = steps.filter((s) => s.status === "complete").length;
  const currentStepIndex = steps.findIndex((s) => s.status === "current");
  const progressPercentage =
    currentStepIndex >= 0
      ? ((completedSteps + 1) / steps.length) * 100
      : (completedSteps / steps.length) * 100;

  const [prevStepIndex, setPrevStepIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentStepIndex]);

  useEffect(() => {
    if (
      prevStepIndex !== null &&
      prevStepIndex !== currentStepIndex &&
      currentStepIndex !== 1
    ) {
      const form = new FormData();
      form.append("action", "deleteSelectedCarId");
      fetcher.submit(form, { method: "post" });
    }
    setPrevStepIndex(currentStepIndex);
  }, [currentStepIndex, prevStepIndex, fetcher]);

  return (
    <div className="w-full">
      <div className="bg-linear-to-r from-p via-p to-p/90 mt-18 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-white">
                {loaderData.lang.reservation || "Rezervacija"}
              </h2>
              <span className="text-sm font-medium text-white/90">
                {completedSteps + (currentStepIndex >= 0 ? 1 : 0)} /{" "}
                {steps.length}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className={cn(
                  "h-full bg-white rounded-full transition-all duration-500 ease-out shadow-sm",
                  isAnimating && "animate-pulse",
                  "animate-in slide-in-from-left duration-700"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <nav aria-label="Progress" className="relative">
            <ol
              role="list"
              className="flex flex-col lg:flex-row gap-2 lg:gap-0">
              {steps.map((step, stepIdx) => {
                const isComplete = step.status === "complete";
                const isCurrent = step.status === "current";
                const isUpcoming = step.status === "upcoming";

                return (
                  <li
                    key={step.id}
                    className={cn(
                      "relative flex-1",
                      stepIdx < steps.length - 1 && "lg:mr-4",
                      "animate-in fade-in slide-in-from-left-4 duration-500"
                    )}
                    style={{
                      animationDelay: `${stepIdx * 100}ms`,
                    }}>
                    {isComplete ? (
                      <Link
                        to={step.href}
                        onClick={() => {
                          const form = new FormData();
                          form.append("action", "deleteSelectedCarId");
                          fetcher.submit(form, { method: "post" });
                        }}
                        className="group flex items-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 active:scale-[0.98]">
                        <div className="relative shrink-0">
                          <div className="flex size-12 items-center justify-center rounded-full bg-s shadow-lg group-hover:scale-110 group-active:scale-105 transition-transform duration-300 animate-in zoom-in-50">
                            <CheckIcon
                              aria-hidden="true"
                              className="size-6 text-white animate-in zoom-in"
                            />
                          </div>
                          {stepIdx < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 left-full w-4 h-0.5 bg-white/30 -translate-y-1/2 translate-x-2" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-white/70 mb-1">
                            {loaderData.lang.step || "Korak"} {step.id}
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {step.name}
                          </div>
                        </div>
                        <ChevronRight className="size-5 text-white/50 group-hover:text-white group-hover:translate-x-1 group-active:translate-x-2 transition-all duration-300 lg:hidden animate-in slide-in-from-right-2" />
                      </Link>
                    ) : isCurrent ? (
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-lg border-2 border-s animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-500">
                        <div className="relative shrink-0 animate-pulse">
                          <div className="flex size-12 items-center justify-center rounded-full bg-s border-4 border-white shadow-xl ring-4 ring-s/20 animate-in zoom-in-50 duration-500">
                            <span className="text-sm font-bold text-white animate-in zoom-in duration-500">
                              {step.id}
                            </span>
                          </div>
                          {stepIdx < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 left-full w-4 h-0.5 bg-s/30 -translate-y-1/2 translate-x-2" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-s/70 mb-1 animate-in fade-in slide-in-from-left-2 duration-500 delay-200">
                            {loaderData.lang.step || "Korak"} {step.id}
                          </div>
                          <div className="text-sm font-semibold text-s animate-in fade-in slide-in-from-left-2 duration-500 delay-300">
                            {step.name}
                          </div>
                        </div>
                        <div className="flex lg:hidden items-center gap-1">
                          <div className="size-2 rounded-full bg-s animate-pulse" />
                          <div className="size-2 rounded-full bg-s animate-pulse delay-150" />
                          <div className="size-2 rounded-full bg-s animate-pulse delay-300" />
                        </div>
                        <div className="hidden lg:flex items-center gap-1">
                          <div className="size-2 rounded-full bg-s animate-pulse" />
                          <div className="size-2 rounded-full bg-s animate-pulse delay-150" />
                          <div className="size-2 rounded-full bg-s animate-pulse delay-300" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 opacity-60 animate-in fade-in duration-500">
                        <div className="relative shrink-0">
                          <div className="flex size-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/5">
                            <span className="text-sm font-medium text-white/50">
                              {step.id}
                            </span>
                          </div>
                          {stepIdx < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 left-full w-4 h-0.5 bg-white/10 -translate-y-1/2 translate-x-2" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-white/40 mb-1">
                            {loaderData.lang.step || "Korak"} {step.id}
                          </div>
                          <div className="text-sm font-medium text-white/50">
                            {step.name}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      {(currentStepIndex === 2 || currentStepIndex === 3) &&
        carSummaryWithPrice && (
          <div className="sticky top-0 z-40 bg-white border-t border-gray-200 shadow-lg lg:relative lg:z-auto">
            <div className="w-full lg:mx-auto lg:max-w-7xl lg:px-4 lg:py-4">
              <CarSummary
                car={carSummaryWithPrice.car}
                pickupDate={carSummaryWithPrice.pickupDate}
                pickupTime={carSummaryWithPrice.pickupTime}
                dropoffDate={carSummaryWithPrice.dropoffDate}
                dropoffTime={carSummaryWithPrice.dropoffTime}
                pickupLocation={carSummaryWithPrice.pickupLocation}
                dropoffLocation={carSummaryWithPrice.dropoffLocation}
                price={carSummaryWithPrice.price}
                days={carSummaryWithPrice.days}
                lang={loaderData.lang}
              />
            </div>
          </div>
        )}

      <div
        className={cn(
          "min-h-[400px] transition-opacity duration-500",
          isAnimating && "opacity-0"
        )}>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
