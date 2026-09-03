import { Info } from "lucide-react";
import { format } from "date-fns";
import type { BaseLocale } from "@/locales/base-locale";
import type { ReactNode } from "react";

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
  discountedPrice?: number;
  promoApplied?: boolean;
  promoDiscountPercent?: number;
  depositeDiscount: number;
  extras: Array<{ id: number; name: string; price: number }>;
  notInWorkingHours: boolean;
  priceForOffHours: number;
  lang: BaseLocale;
}

const reviewSectionClass =
  "flex w-full flex-col rounded-none border-y border-border/70 bg-card px-4 py-4 sm:rounded-2xl sm:border sm:p-6";

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-pl/50 px-4 py-3.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-p">
        {label}
      </span>
      <div className="text-base font-bold leading-snug text-white">{children}</div>
    </div>
  );
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
  discountedPrice,
  promoApplied = false,
  promoDiscountPercent = 0,
  depositeDiscount,
  extras,
  notInWorkingHours,
  priceForOffHours,
  lang,
}: CostSummaryProps) {
  const displayPrice = promoApplied && discountedPrice != null ? discountedPrice : price;

  return (
    <div className={`${reviewSectionClass} mb-6 mt-4 gap-3 sm:gap-4`}>
      <h3 className="font-display text-xl font-bold text-white">
        {lang.costSummary}
      </h3>

      <SummaryRow label={lang.pickUpLoacation}>
        {pickup?.name} · {format(pickupDate, "dd/MM/yyyy")} · {pickupTime}
      </SummaryRow>

      <SummaryRow label={lang.dropOffLoacation}>
        {dropOff?.name} · {format(dropoffDate, "dd/MM/yyyy")} · {dropoffTime}
      </SummaryRow>

      <SummaryRow label={lang.vehicles}>
        {car.name}{" "}
        <span className="text-p">{carPrice.toFixed(2)}€</span>
      </SummaryRow>

      {(extras.length > 0 || (notInWorkingHours && priceForOffHours > 0)) && (
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-p">
            {lang.accessories}
          </span>
          {notInWorkingHours && priceForOffHours > 0 && (
            <div className="rounded-xl border border-white/10 bg-pl/50 px-4 py-3.5">
              <p className="text-sm font-semibold text-white/90">
                {lang.afterHoursReservationFee}
              </p>
              <p className="mt-1 text-lg font-bold text-p">
                {priceForOffHours.toFixed(2)}€
              </p>
            </div>
          )}
          {extras.map((extra) => (
            <div
              key={`ext-${extra.id}`}
              className="rounded-xl border border-white/10 bg-pl/50 px-4 py-3.5">
              <p className="text-sm font-semibold text-white/90">{extra.name}</p>
              <p className="mt-1 text-lg font-bold text-p">
                {extra.price.toFixed(2)}€
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
        <div className="rounded-xl border border-p/30 bg-p/10 px-4 py-3.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-p">
            Total
          </span>
          <p className="mt-1.5 text-2xl font-bold text-p">
            {promoApplied ? (
              <span>
                <span className="mr-2 text-base font-semibold line-through text-white/40">
                  {price.toFixed(2)}€
                </span>
                {displayPrice.toFixed(2)}€
              </span>
            ) : (
              <span>{price.toFixed(2)}€</span>
            )}
          </p>
          <p
            className={`mt-1 min-h-5 text-sm font-bold ${
              promoApplied && promoDiscountPercent > 0
                ? "text-emerald-400"
                : "invisible"
            }`}
            aria-hidden={!(promoApplied && promoDiscountPercent > 0)}>
            -{promoDiscountPercent || 10}% · {lang.promoCodeApplied}
          </p>
        </div>
        <div className="rounded-xl border border-p/30 bg-p/10 px-4 py-3.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-p">
            {lang.deposit}
          </span>
          <p className="mt-1.5 text-2xl font-bold text-p">
            {depositeDiscount === 0 && <span>{car.deposite}€</span>}
            {depositeDiscount > 0 && (
              <span>
                <span className="mr-2 text-base font-semibold line-through text-white/40">
                  {car.deposite}€
                </span>
                {car.deposite - depositeDiscount}€
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-pl/40 px-4 py-3.5">
        <p className="text-sm leading-relaxed text-white/75">
          <Info size={18} className="float-left mr-2 mt-0.5 text-p" />
          {lang.conversionStatement}
        </p>
      </div>
    </div>
  );
}

export { reviewSectionClass };
