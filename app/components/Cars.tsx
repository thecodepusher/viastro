import { Link } from "react-router";
import { Button } from "./ui/button";
import { en } from "@/locales/en";
import type { Route } from "../routes/+types/cars-page";
import type { BaseLocale } from "@/locales/base-locale";

export enum GasType {
  diesel,
  gasoline,
  electric,
  hybrid,
}

export enum TransmissionType {
  automatic,
  manual,
}

export enum CarType {
  sedan,
  suv,
  compactSuv,
  hatchback,
}

export const cars = [
  {
    id: 1,
    slug: "peugeot_3008",
    name: "Peugeot 3008",
    type: CarType.suv,
    gas: GasType.diesel,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    price: 40,
    image: "/3008.png",
  },
  {
    id: 2,
    slug: "peugeot_2008",
    name: "Peugeot 2008",
    type: CarType.compactSuv,
    gas: GasType.gasoline,
    numberOfSeats: 5,
    transmissionType: TransmissionType.automatic,
    airConditioning: true,
    price: 30,
    image: "/2008.png",
  },
];

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

            <p className="mb-8 text-center font-black text-pd text-3xl">
              <span className="">{car.price}</span>{" "}
              <span className="">€/dan</span>
            </p>
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
