import type { BaseLocale } from "@/locales/base-locale";

interface IncludedInReservationProps {
  lang: BaseLocale;
  notInWorkingHours: boolean;
}

export function IncludedInReservation({
  lang,
  notInWorkingHours,
}: IncludedInReservationProps) {
  return (
    <>
      <h3 className="font-bold mx-auto max-w-7xl px-4 py-2 mt-2 text-lg">
        {lang.includedInReservation}
      </h3>

      <div className="mx-auto max-w-7xl px-4 py-2 flex flex-col gap-4">
        <div className="group relative border-2 rounded-xl shadow-lg transition-all duration-300 overflow-hidden border-s bg-s text-white">
          <div className="flex flex-col md:flex-row items-stretch min-h-[140px]">
            <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {lang.basicCascoInsurance}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed mb-3 text-white/90">
                  {lang.cascoInsuranceDisclaimer}
                </p>
              </div>
            </div>

            <div className="relative flex flex-row md:flex-col items-center justify-between md:justify-center p-4 md:p-6 gap-4 md:gap-0 border-t md:border-t-0 md:min-w-[200px]">
              <div className="hidden md:block absolute left-0 top-[15%] bottom-[15%] w-px bg-white/20" />

              <div className="text-left md:text-center flex-1 md:flex-none flex items-center">
                <div className="w-full">
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {lang.freeOfCharge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {notInWorkingHours && (
          <div className="group relative border-2 rounded-xl shadow-lg transition-all duration-300 overflow-hidden border-s bg-s text-white">
            <div className="flex flex-col md:flex-row items-stretch min-h-[140px]">
              <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                    {lang.afterHoursReservationFee}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed mb-3 text-white/90">
                    {lang.afterHoursFeeDetails}
                  </p>
                </div>
              </div>

              <div className="relative flex flex-row md:flex-col items-center md:items-end justify-between md:justify-between p-4 md:p-6 gap-4 md:gap-0 border-t md:border-t-0 md:min-w-[200px]">
                <div className="hidden md:block absolute left-0 top-[15%] bottom-[15%] w-px bg-white/20" />
                <div className="text-left md:text-right flex-1 md:flex-none">
                  <div>
                    <div className="flex items-baseline md:justify-end gap-1 mb-1">
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        20€
                      </span>
                    </div>
                    <p className="text-xs text-white">
                      {lang.allPricesIncludeVAT}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
