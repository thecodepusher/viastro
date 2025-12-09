import { Info } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import type { BaseLocale } from "@/locales/base-locale";

interface CostSummaryProps {
  pickup: { name: string } | undefined;
  dropOff: { name: string } | undefined;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  car: { name: string; deposite: number };
  carPrice: number;
  price: number;
  depositeDiscount: number;
  extras: Array<{ id: number; name: string; price: number }>;
  notInWorkingHours: boolean;
  priceForOffHours: number;
  lang: BaseLocale;
}

export function CostSummary({
  pickup,
  dropOff,
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  car,
  carPrice,
  price,
  depositeDiscount,
  extras,
  notInWorkingHours,
  priceForOffHours,
  lang,
}: CostSummaryProps) {
  return (
    <>
      <h3 className="mx-6 my-4 font-bold text-xl">{lang.costSummary}</h3>
      <div className="mx-6 p-4 border rounded shadow flex gap-2 flex-col">
        <div>
          <Label>{lang.pickUpLoacation}</Label>
          <p>
            {pickup?.name} {format(pickupDate, "dd/MM/yyyy")} - {pickupTime}
          </p>
        </div>
        <div>
          <Label>{lang.dropOffLoacation}</Label>
          <p>
            {dropOff?.name} {format(dropoffDate, "dd/MM/yyyy")} - {dropoffTime}
          </p>
        </div>
        <div>
          <Label>{lang.vehicles}</Label>
          <p>
            {car.name} -{" "}
            <span className="font-bold text-s text-lg">
              {carPrice.toFixed(2)}€
            </span>
          </p>
        </div>

        {(extras.length > 0 || (notInWorkingHours && priceForOffHours > 0)) && (
          <div>
            <Label className="">{lang.accessories}</Label>
            <div className="flex flex-col">
              {notInWorkingHours && priceForOffHours > 0 && (
                <div>
                  {lang.afterHoursReservationFee} -{" "}
                  <span className="font-bold text-s text-lg">
                    {priceForOffHours.toFixed(2)}€
                  </span>
                </div>
              )}

              {extras.map((extra) => (
                <div key={`ext-${extra.id}`}>
                  {extra.name} -{" "}
                  <span className="font-bold text-s text-lg">
                    {extra.price.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label>Total</Label>
          <p className="font-bold text-s text-lg">{price.toFixed(2)}€</p>
        </div>

        <div>
          <Label>{lang.deposit}</Label>
          <p>
            <span className="font-bold text-s text-lg">
              {depositeDiscount == 0 && <span>{car.deposite}€</span>}

              {depositeDiscount > 0 && (
                <span>
                  <span className="line-through text-gray-400">
                    {car.deposite}€
                  </span>{" "}
                  <span>
                    {car.deposite - depositeDiscount}€
                  </span>
                </span>
              )}
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            <Info size={20} className="float-left mr-1 text-p" />
            {lang.conversionStatement}
          </p>
        </div>
      </div>
    </>
  );
}

