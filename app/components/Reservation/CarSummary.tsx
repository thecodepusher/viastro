import type { ReactNode } from "react";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import type { TransformedCar } from "@/lib/api-cars";
import type { BaseLocale } from "@/locales/base-locale";

interface CarSummaryProps {
  car: TransformedCar;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  days: number;
  lang: BaseLocale;
}

function SummaryDetail({
  icon: Icon,
  label,
  primary,
}: {
  icon: typeof Calendar;
  label: string;
  primary: string;
}) {
  return (
    <div className="flex items-center gap-2 lg:items-start lg:gap-2.5">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-p/15 lg:h-8 lg:w-8">
        <Icon className="h-3.5 w-3.5 text-p lg:h-4 lg:w-4" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="hidden text-xs font-semibold uppercase tracking-wide text-p/80 lg:mb-0.5 lg:block">
          {label}
        </p>
        <p className="truncate text-[11px] font-bold leading-tight text-white lg:text-sm">
          {primary}
        </p>
      </div>
    </div>
  );
}

function CarChip({
  children,
  variant = "primary",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-1.5 py-px text-[8px] font-semibold lg:px-2.5 lg:py-0.5 lg:text-xs";
  const styles =
    variant === "primary"
      ? "border-p/25 bg-p/15 text-p"
      : "border-white/15 bg-white/10 text-white/80";

  return <span className={`${base} ${styles}`}>{children}</span>;
}

function SummaryPriceLines({
  days,
  dayLabel,
  price,
  originalPrice,
  discountPercent,
  vatLabel,
  showPromoDiscount,
}: {
  days: number;
  dayLabel: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  vatLabel: string;
  showPromoDiscount: boolean;
}) {
  return (
    <>
      <p className="text-[9px] font-semibold uppercase leading-tight text-white/60 lg:text-xs">
        {days} {dayLabel}
      </p>
      {showPromoDiscount ? (
        <p className="whitespace-nowrap text-[9px] font-semibold line-through text-white/40 lg:text-xs">
          {originalPrice.toFixed(2)}€
        </p>
      ) : null}
      <p className="whitespace-nowrap text-xs font-bold tabular-nums leading-none text-p lg:text-2xl">
        <span className="hidden lg:inline">€</span>
        {price.toFixed(2)}
        <span className="lg:hidden">€</span>
      </p>
      {showPromoDiscount ? (
        <p className="text-[9px] font-bold text-emerald-400 lg:text-xs">
          -{discountPercent}%
        </p>
      ) : null}
      <p className="hidden w-full text-[8px] leading-tight text-white/55 sm:block lg:text-xs">
        {vatLabel}
      </p>
    </>
  );
}

export function CarSummary({
  car,
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  pickupLocation,
  dropoffLocation,
  price,
  originalPrice,
  discountPercent,
  days,
  lang,
}: CarSummaryProps) {
  const formattedPickupDate = format(new Date(pickupDate), "dd.MM.yyyy");
  const formattedDropoffDate = format(new Date(dropoffDate), "dd.MM.yyyy");
  const showPromoDiscount =
    discountPercent != null &&
    discountPercent > 0 &&
    originalPrice != null &&
    originalPrice !== price;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-row items-stretch overflow-hidden rounded-none border border-white/10 bg-linear-to-r from-s/95 to-card lg:rounded-xl lg:shadow-lg">
        <div className="relative flex min-h-[92px] w-18 shrink-0 items-center justify-center self-stretch bg-pl/40 lg:min-h-[128px] lg:w-48">
          <img
            src={car.image}
            alt={car.customName || car.name}
            className="h-full w-full object-contain p-1 lg:p-2"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-2 py-1.5 lg:justify-center lg:gap-2 lg:px-3 lg:py-2.5">
            <div className="flex min-w-0 flex-col gap-0.5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-2 lg:gap-y-1">
              <h3 className="min-w-0 shrink-0 truncate text-xs font-bold text-white lg:text-lg">
                {car.customName || car.name}
              </h3>
              <div className="flex min-w-0 gap-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible lg:gap-1.5">
                <CarChip>{car.transmissionText}</CarChip>
                <CarChip>{car.gasText}</CarChip>
                <CarChip variant="secondary">{car.carTypeText}</CarChip>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 lg:gap-x-3 lg:gap-y-1.5">
              <SummaryDetail
                icon={Calendar}
                label={lang.pickUpTime}
                primary={`${formattedPickupDate} ${pickupTime}`}
              />
              <SummaryDetail
                icon={Calendar}
                label={lang.dropOffTime}
                primary={`${formattedDropoffDate} ${dropoffTime}`}
              />
              <SummaryDetail
                icon={MapPin}
                label={lang.pickUpLoacation}
                primary={pickupLocation}
              />
              <SummaryDetail
                icon={MapPin}
                label={lang.dropOffLoacation}
                primary={dropoffLocation}
              />
            </div>
          </div>

          <div className="flex w-19 shrink-0 flex-col items-end justify-center border-l border-white/10 px-1.5 py-1.5 text-right lg:w-44 lg:px-3 lg:py-2.5">
            <div className="relative w-full">
              <div
                className="invisible flex flex-col items-end gap-0.5 lg:gap-1"
                aria-hidden>
                <SummaryPriceLines
                  days={days}
                  dayLabel={lang.day}
                  price={price}
                  originalPrice={originalPrice ?? price}
                  discountPercent={discountPercent ?? 10}
                  vatLabel={lang.allPricesIncludeVAT}
                  showPromoDiscount
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-end justify-center gap-0.5 lg:gap-1">
                <SummaryPriceLines
                  days={days}
                  dayLabel={lang.day}
                  price={price}
                  originalPrice={originalPrice ?? price}
                  discountPercent={discountPercent ?? 0}
                  vatLabel={lang.allPricesIncludeVAT}
                  showPromoDiscount={showPromoDiscount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
