import { Button } from "./ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import { Info, CheckCircle2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cars, CarType, GasType, TransmissionType } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function Cars(props: {
  lang: BaseLocale;
  langCode: string;
  availableCars: string[] | null;
  onSelect: (arg0: number) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cars.map((car) => {
          let gas = "";
          let transmission = "";
          let carType = "";

          let available = true;

          if (props.availableCars) {
            available = props.availableCars.some((x) => x == car.exnternalId);
          }

          switch (car.type) {
            case CarType.suv:
              carType = "SUV";
              break;
            case CarType.hatchback:
              carType = "Hatchback";
              break;
            case CarType.sedan:
              carType = "Sedan";
              break;
            case CarType.compactSuv:
              carType = "Compact SUV";
              break;
          }

          switch (car.transmissionType) {
            case TransmissionType.manual:
              transmission = props.lang.manual;
              break;
            case TransmissionType.automatic:
              transmission = props.lang.automatic;
              break;
          }

          switch (car.gas) {
            case GasType.diesel:
              gas = props.lang.diesel;
              break;
            case GasType.gasoline:
              gas = props.lang.gasoline;
              break;
            case GasType.hybrid:
              gas = props.lang.hybrid;
              break;
            case GasType.electric:
              gas = props.lang.electric;
          }

          return (
            <Card
              key={car.id}
              className={`group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                !available ? "opacity-75" : ""
              }`}>
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

              <div className="relative bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-6">
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
                  {car.name}
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:border-p hover:bg-p hover:text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-p dark:hover:bg-p"
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
                            {car.prices.map((x, idx) => (
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
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="h-6 w-6 object-contain"
                        src="/car.svg"
                        alt="Car type"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.type}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {carType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="h-6 w-6 object-contain"
                        src="/fuel-pump.svg"
                        alt="Fuel type"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.fuel}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {gas}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="h-6 w-6 object-contain"
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

                  <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
                      <img
                        className="h-6 w-6 object-contain"
                        src="/manual-transmission.svg"
                        alt="Transmission"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {props.lang.gear}
                      </p>
                      <p className="truncate text-sm font-semibold text-pd dark:text-gray-100">
                        {transmission}
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
