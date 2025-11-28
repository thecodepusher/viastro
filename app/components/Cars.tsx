import { Button } from "./ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import { Info, CheckCircle2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  transformApiCars,
  type ApiCarModel,
  type TransformedCar,
} from "@/lib/api-cars";

export default function Cars(props: {
  lang: BaseLocale;
  langCode: string;
  onSelect: (arg0: number) => void;
  cars?: any[];
  selectedCarId?: number | null;
  fromreservationPage?: boolean;
}) {
  const isApiFormat =
    props.cars &&
    props.cars.length > 0 &&
    props.cars[0]?.brand_name &&
    props.cars[0]?.features;

  const carsToDisplay: TransformedCar[] = isApiFormat
    ? transformApiCars(props.cars as ApiCarModel[], props.lang)
    : (props.cars as TransformedCar[]) || [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {carsToDisplay.map((car) => {
          const available = car.available !== undefined ? car.available : true;
          const isSelected = props.selectedCarId === car.id;
          const borderColor = available ? "#614b80" : "#9ca3af";

          return (
            <Card
              key={car.id}
              className={`group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                !available ? "opacity-75" : ""
              }`}
              style={
                isSelected
                  ? {
                      borderColor: borderColor,
                      borderWidth: "1px",
                    }
                  : {}
              }>
              {props.fromreservationPage && (
                <div className="absolute top-4 right-4 z-10">
                  {available ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {props.lang.available}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {props.lang.reserved}
                    </span>
                  )}
                </div>
              )}

              <div className="relative bg-white px-6">
                <div className="relative mx-auto h-48 w-full flex items-center justify-center overflow-hidden">
                  <img
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    src={car.image}
                    alt={car.name}
                  />
                </div>
              </div>

              <CardHeader className="-mt-6">
                <h3 className="text-xl font-bold text-pd dark:text-gray-100 text-center">
                  {car.customName}
                </h3>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                <div className="flex items-center justify-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {props.lang.from}
                      </span>
                      <span className="text-3xl font-bold text-p dark:text-p">
                        {car.price}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        €/{props.lang.day}
                      </span>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:border-p hover:bg-p hover:text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-p dark:hover:bg-p cursor-pointer"
                        aria-label="Price information">
                        <Info className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <p className="font-semibold text-pd dark:text-gray-100">
                          {props.lang.allPricesIncludeVAT}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {props.lang.deposit} {car.deposite}€
                        </p>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                          <p className="mb-2 text-sm font-semibold text-pd dark:text-gray-100">
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
                                idx: number
                              ) => (
                                <div
                                  key={idx}
                                  className="text-sm text-gray-600 dark:text-gray-400">
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
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-1 sm:gap-3">
                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-2 sm:p-3 dark:bg-gray-900/50">
                    <div className="flex sm:h-10 sm:w-10 h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="sm:h-6 sm:w-6 h-5 w-5 object-contain"
                        src="/car.svg"
                        alt="Car type"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.type}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {car.carTypeText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-2 sm:p-3 dark:bg-gray-900/50">
                    <div className="flex sm:h-10 sm:w-10 h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="sm:h-6 sm:w-6 h-5 w-5 object-contain"
                        src="/fuel-pump.svg"
                        alt="Fuel type"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.fuel}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {car.gasText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-2 sm:p-3 dark:bg-gray-900/50">
                    <div className="flex sm:h-10 sm:w-10 h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="sm:h-6 sm:w-6 h-5 w-5 object-contain"
                        src="/car-seat.svg"
                        alt="Seats"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.seat}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {car.numberOfSeats} {props.lang.seats}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-2 sm:p-3 dark:bg-gray-900/50">
                    <div className="flex sm:h-10 sm:w-10 h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="sm:h-6 sm:w-6 h-5 w-5 object-contain"
                        src="/manual-transmission.svg"
                        alt="Transmission"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.gear}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {car.transmissionText}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  disabled={!available}
                  onClick={() => {
                    if (!available) return;
                    props.onSelect(car.id);
                  }}
                  className="w-full bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                  size="lg">
                  {available ? props.lang.reserve : props.lang.reserved}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
