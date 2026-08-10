import { useState } from "react";
import { Button } from "./ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import { Info, CheckCircle2, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  transformApiCars,
  type ApiCarModel,
  type TransformedCar,
} from "@/lib/api-cars";
import { cn } from "@/lib/utils";

export default function Cars(props: {
  lang: BaseLocale;
  langCode: string;
  onSelect: (arg0: number) => void;
  cars?: any[];
  selectedCarId?: number | null;
  fromreservationPage?: boolean;
  isLoading?: boolean;
  loadingCarId?: number | null;
}) {
  const [pendingCarId, setPendingCarId] = useState<number | null>(null);
  const activeLoadingCarId = props.loadingCarId ?? pendingCarId;
  const isBusy = props.isLoading || activeLoadingCarId !== null;

  const isApiFormat =
    props.cars &&
    props.cars.length > 0 &&
    props.cars[0]?.brand_name &&
    props.cars[0]?.features;

  const carsToDisplay: TransformedCar[] = isApiFormat
    ? transformApiCars(props.cars as ApiCarModel[], props.lang)
    : (props.cars as TransformedCar[]) || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {carsToDisplay.map((car, index) => {
          const available = car.available !== undefined ? car.available : true;
          const isSelected = props.selectedCarId === car.id;
          const isCarLoading = activeLoadingCarId === car.id;

          return (
            <article
              key={car.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-linear-to-b from-s/90 to-pd shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:border-p/35 hover:shadow-xl hover:shadow-p/5",
                !available && "opacity-70",
                isSelected && "border-p ring-2 ring-p/25",
              )}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-p/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {props.fromreservationPage && (
                <div className="absolute top-3 right-3 z-10">
                  {available ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {props.lang.available}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/60 ring-1 ring-white/10">
                      {props.lang.reserved}
                    </span>
                  )}
                </div>
              )}

              <div className="relative px-5 pt-5 pb-1">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-10 h-20 w-3/4 -translate-x-1/2 rounded-full bg-p/15 blur-2xl transition-all group-hover:bg-p/25"
                />
                <div className="relative mx-auto flex h-40 sm:h-44 w-full items-center justify-center">
                  <img
                    className="h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.05]"
                    src={car.image}
                    alt={car.name}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    width="314"
                    height="177"
                    sizes="(max-width: 640px) 314px, (max-width: 1024px) 256px, 314px"
                    {...(index === 0
                      ? ({
                          fetchPriority: "high",
                        } as React.ImgHTMLAttributes<HTMLImageElement>)
                      : {})}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5">
                <h3 className="font-display text-center text-lg font-bold text-white sm:text-xl">
                  {car.customName}
                </h3>

                <div className="mt-4 flex items-center justify-center gap-2.5">
                  <div className="inline-flex items-baseline gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <span className="text-sm font-medium text-white/60">
                      {props.lang.from}
                    </span>
                    <span className="font-display text-3xl font-bold text-p">
                      {car.price}
                    </span>
                    <span className="text-sm font-medium text-white/60">
                      €/{props.lang.day}
                    </span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-p hover:bg-p hover:text-primary-foreground cursor-pointer"
                        aria-label="Price information">
                        <Info className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <p className="font-semibold text-foreground">
                          {props.lang.allPricesIncludeVAT}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {props.lang.deposit} {car.deposite}€
                        </p>
                        <div className="border-t border-border pt-3">
                          <p className="mb-2 text-sm font-semibold text-foreground">
                            {props.lang.pricesByDays}
                          </p>
                          <div className="space-y-1.5">
                            {car.prices.map(
                              (
                                x: {
                                  from: number;
                                  to: number | null;
                                  price: number;
                                },
                                idx: number,
                              ) => (
                                <div
                                  key={idx}
                                  className="text-sm text-muted-foreground">
                                  {x.from === x.to ? (
                                    <p>
                                      {x.from} {props.lang.day}: {x.price} €/
                                      {props.lang.day}
                                    </p>
                                  ) : (
                                    <p>
                                      {x.from}
                                      {x.to != null ? ` - ${x.to}` : "+"}{" "}
                                      {props.lang.day}: {x.price} €/
                                      {props.lang.day}
                                    </p>
                                  )}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    {
                      src: "/car.svg",
                      alt: "Car type",
                      label: props.lang.type,
                      value: car.carTypeText,
                    },
                    {
                      src: "/fuel-pump.svg",
                      alt: "Fuel type",
                      label: props.lang.fuel,
                      value: car.gasText,
                    },
                    {
                      src: "/car-seat.svg",
                      alt: "Seats",
                      label: props.lang.seat,
                      value: `${car.numberOfSeats} ${props.lang.seats}`,
                    },
                    {
                      src: "/manual-transmission.svg",
                      alt: "Transmission",
                      label: props.lang.gear,
                      value: car.transmissionText,
                    },
                  ].map((spec) => (
                    <div
                      key={spec.alt}
                      className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/4 px-2.5 py-2.5 sm:px-3 sm:py-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-p/15">
                        <img
                          className="h-4 w-4 object-contain sm:h-[18px] sm:w-[18px]"
                          src={spec.src}
                          alt={spec.alt}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-white/45 sm:text-[11px]">
                          {spec.label}
                        </p>
                        <p className="truncate text-xs font-semibold text-white sm:text-sm">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  disabled={!available || isBusy}
                  aria-busy={isCarLoading}
                  onClick={() => {
                    if (!available || isBusy) return;
                    setPendingCarId(car.id);
                    props.onSelect(car.id);
                  }}
                  className={cn(
                    "mt-5 w-full bg-p font-semibold text-primary-foreground shadow-md shadow-p/20 hover:bg-p/90 cursor-pointer disabled:cursor-not-allowed",
                    isCarLoading
                      ? "disabled:bg-p disabled:text-primary-foreground disabled:opacity-80"
                      : "disabled:bg-white/10 disabled:text-white/40",
                  )}
                  size="lg">
                  {!available ? (
                    props.lang.reserved
                  ) : isCarLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {props.lang.reserve}
                    </>
                  ) : (
                    props.lang.reserve
                  )}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
