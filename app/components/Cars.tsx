import { Link } from "react-router";
import { Button } from "./ui/button";
import { en } from "@/locales/en";
import type { Route } from "../routes/+types/cars-page";
import type { BaseLocale } from "@/locales/base-locale";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cars, CarType, GasType, TransmissionType } from "@/lib/data";

export default function Cars(props: {
  lang: BaseLocale;
  langCode: string;
  availableCars: string[] | null;
  onSelect: (arg0: number) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div
              key={car.id}
              className="flex flex-col border rounded p-4 shadow hover:shadow-lg"
            >
              <h4 className="font-black text-pd text-xl text-center">
                {car.name}
              </h4>
              <img className="h-52 object-contain" src={car.image} />

              <div className="mb-8 flex gap-2 items-center justify-center">
                <p className="text-center font-black text-pd text-3xl">
                  <span className="">od {car.price}</span>{" "}
                  <span className="">€/dan</span>
                </p>
                <Popover>
                  <PopoverTrigger>
                    <Info />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      <p>Sve cene su sa PDV-om</p>
                      <p>Depozit: {car.deposite}€</p>
                      <p>Cene po danima:</p>
                      {car.prices.map((x) => (
                        <div>
                          {x.from === x.to && (
                            <p>
                              {x.from} dan: {x.price} €/dan
                            </p>
                          )}
                          {x.from !== x.to && (
                            <p>
                              {x.from}
                              {x.to != null ? ` - ${x.to}` : "+"} days:{" "}
                              {x.price} €/dan
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2">
                <div className="flex p-2 items-center gap-1 border-r border-b">
                  <img width={34} height={34} src="/car.svg" />
                  <p className="font-semibold text-sm text-pd">{carType}</p>
                </div>
                <div className="flex p-2 pl-3 items-center gap-1 border-b">
                  <img width={32} height={32} src="/fuel-pump.svg" />
                  <p className="font-semibold text-sm text-pd">{gas}</p>
                </div>
                <div className="flex p-2 items-center gap-1 border-r">
                  <img width={34} height={34} src="/car-seat.svg" />
                  <p className="font-semibold text-sm text-pd">
                    {car.numberOfSeats} {props.lang.seats}
                  </p>
                </div>
                <div className="flex p-2 pl-3 items-center gap-1">
                  <img width={34} height={34} src="/manual-transmission.svg" />
                  <p className="font-semibold text-sm text-pd">
                    {transmission}
                  </p>
                </div>
              </div>

              <Button
                disabled={!available}
                onClick={() => {
                  if (!available) return;
                  props.onSelect(car.id);
                }}
                className={`w-full mt-8 bg-s ${
                  available ? "bg-s" : "bg-gray-300"
                }`}
              >
                {props.lang.reserve}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
