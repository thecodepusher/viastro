import { Calendar, MapPin, Euro } from "lucide-react";
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
  days: number;
  lang: BaseLocale;
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
  days,
  lang,
}: CarSummaryProps) {
  const formattedPickupDate = format(new Date(pickupDate), "dd.MM.yyyy");
  const formattedDropoffDate = format(new Date(dropoffDate), "dd.MM.yyyy");

  return (
    <div className="w-full h-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-row lg:flex-row items-stretch h-[120px] lg:h-[180px] bg-white lg:rounded-xl lg:shadow-lg lg:border-2 lg:border-s/20 overflow-hidden">
        <div className="relative w-32 lg:w-56 h-full bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={car.image}
            alt={car.customName || car.name}
            className="w-full h-full object-contain p-1.5 lg:p-4"
          />
        </div>

        <div className="flex-1 flex flex-row lg:flex-row lg:p-4 gap-0 min-w-0">
          <div className="flex-1 flex flex-col justify-between min-w-0 p-2 lg:p-0">
            <div className="mb-1 lg:mb-0">
              <div className="flex items-center gap-1.5 lg:gap-3 mb-1 lg:mb-3 flex-wrap">
                <h3 className="text-xs lg:text-xl font-bold text-gray-900 leading-tight truncate">
                  {car.customName || car.name}
                </h3>
                <div className="flex flex-wrap gap-1 lg:gap-2 items-center">
                  <span className="inline-flex items-center px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[9px] lg:text-xs font-semibold bg-s/10 text-s border border-s/20">
                    {car.carTypeText}
                  </span>
                  <span className="inline-flex items-center px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[9px] lg:text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    {car.transmissionText}
                  </span>
                  <span className="inline-flex items-center px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[9px] lg:text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    {car.gasText}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 lg:gap-4">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="shrink-0">
                  <div className="w-5 h-5 lg:w-10 lg:h-10 rounded bg-s/10 flex items-center justify-center">
                    <Calendar className="w-3 h-3 lg:w-5 lg:h-5 text-s" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="hidden lg:block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    {lang.pickUpTime}
                  </p>
                  <p className="text-[9px] lg:text-sm font-bold text-gray-900 leading-tight">
                    <span className="hidden lg:block">
                      {formattedPickupDate}
                    </span>
                    <span className="lg:hidden">
                      {formattedPickupDate} {pickupTime}
                    </span>
                  </p>
                  <p className="hidden lg:block text-xs font-semibold text-s">
                    {pickupTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="shrink-0">
                  <div className="w-5 h-5 lg:w-10 lg:h-10 rounded bg-s/10 flex items-center justify-center">
                    <Calendar className="w-3 h-3 lg:w-5 lg:h-5 text-s" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="hidden lg:block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    {lang.dropOffTime}
                  </p>
                  <p className="text-[9px] lg:text-sm font-bold text-gray-900 leading-tight">
                    <span className="hidden lg:block">
                      {formattedDropoffDate}
                    </span>
                    <span className="lg:hidden">
                      {formattedDropoffDate} {dropoffTime}
                    </span>
                  </p>
                  <p className="hidden lg:block text-xs font-semibold text-s">
                    {dropoffTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="shrink-0">
                  <div className="w-5 h-5 lg:w-10 lg:h-10 rounded bg-s/10 flex items-center justify-center">
                    <MapPin className="w-3 h-3 lg:w-5 lg:h-5 text-s" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="hidden lg:block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    {lang.pickUpLoacation}
                  </p>
                  <p className="text-[9px] lg:text-sm font-bold text-gray-900 leading-tight truncate">
                    {pickupLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="shrink-0">
                  <div className="w-5 h-5 lg:w-10 lg:h-10 rounded bg-s/10 flex items-center justify-center">
                    <MapPin className="w-3 h-3 lg:w-5 lg:h-5 text-s" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="hidden lg:block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                    {lang.dropOffLoacation}
                  </p>
                  <p className="text-[9px] lg:text-sm font-bold text-gray-900 leading-tight truncate">
                    {dropoffLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-18 lg:w-56 shrink-0 lg:p-4 lg:bg-transparent text-gray-900 lg:rounded-none flex flex-col items-end justify-center gap-0.5 lg:gap-0 border-l border-gray-200 lg:pl-4">
            <div className="text-right">
              <p className="text-[9px] lg:text-xs font-medium text-gray-500 mb-0 lg:mb-2 uppercase tracking-wide leading-tight">
                {days} {lang.day}
              </p>
              <div className="flex items-baseline justify-end gap-0.5 lg:gap-1 mb-0 lg:mb-2">
                <Euro className="w-3 h-3 lg:w-5 lg:h-5 text-gray-900" />
                <span className="text-base lg:text-3xl font-bold text-gray-900 leading-tight">
                  {price.toFixed(2)}
                </span>
              </div>
              <p className="text-[8px] lg:text-xs text-gray-500 leading-tight">
                {lang.allPricesIncludeVAT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
