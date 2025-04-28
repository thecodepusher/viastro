import { Link } from "react-router";
import { Button } from "./ui/button";
import { en } from "@/locales/en";
import type { Route } from "../routes/+types/cars-page";
import type { BaseLocale } from "@/locales/base-locale";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cars } from "@/lib/data";

export default function Cars(props: {
  lang: BaseLocale;
  langCode: string;
  onSelect: (arg0: number) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="flex flex-col border rounded p-4 shadow hover:shadow-lg"
          >
            <h4 className="font-black text-pd text-xl text-center">
              {car.name}
            </h4>
            <img src={car.image} />

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
                            {x.to != null ? ` - ${x.to}` : "+"} days: {x.price}{" "}
                            €/dan
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
                <p className="font-semibold text-sm text-pd">SUV</p>
              </div>
              <div className="flex p-2 pl-3 items-center gap-1 border-b">
                <img width={32} height={32} src="/fuel-pump.svg" />
                <p className="font-semibold text-sm text-pd">Dizel</p>
              </div>
              <div className="flex p-2 items-center gap-1 border-r">
                <img width={34} height={34} src="/car-seat.svg" />
                <p className="font-semibold text-sm text-pd">
                  {car.numberOfSeats} sedišta
                </p>
              </div>
              <div className="flex p-2 pl-3 items-center gap-1">
                <img width={34} height={34} src="/manual-transmission.svg" />
                <p className="font-semibold text-sm text-pd">Automatik</p>
              </div>
            </div>

            <Button
              onClick={() => {
                props.onSelect(car.id);
              }}
              className="w-full mt-8 bg-s"
            >
              Rezerviši
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
