import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import type { BaseLocale } from "@/locales/base-locale";

interface PaymentStepsNoticeProps {
  lang: BaseLocale;
  depositAmount: number;
  rentalAmount: number;
}

export function PaymentStepsNotice({
  lang,
  depositAmount,
  rentalAmount,
}: PaymentStepsNoticeProps) {
  return (
    <div className="mx-6 mb-4 rounded-2xl border border-p/20 bg-linear-to-br from-pl/30 via-white to-pl/10 p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-p/15 text-p">
          <CreditCard className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h4 className="font-bold text-base text-gray-900 sm:text-lg">
            {lang.paymentStepsTitle}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang.paymentStepsIntro}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex gap-3 rounded-xl border border-white/80 bg-white/80 p-3.5 shadow-sm sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-p text-sm font-bold text-white">
            1
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-gray-900">
                {lang.paymentStep1Title}
              </p>
              <span className="inline-flex items-center rounded-full bg-p/10 px-2.5 py-0.5 text-xs font-semibold text-p">
                {depositAmount.toFixed(2)}€
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {lang.paymentStep1Description}
            </p>
          </div>
          <ShieldCheck
            className="hidden h-5 w-5 shrink-0 text-p sm:block"
            aria-hidden
          />
        </div>

        <div className="flex items-center justify-center sm:hidden">
          <ArrowRight className="h-4 w-4 rotate-90 text-p/60" aria-hidden />
        </div>

        <div className="flex gap-3 rounded-xl border border-white/80 bg-white/80 p-3.5 shadow-sm sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-s text-sm font-bold text-white">
            2
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-gray-900">
                {lang.paymentStep2Title}
              </p>
              <span className="inline-flex items-center rounded-full bg-s/10 px-2.5 py-0.5 text-xs font-semibold text-s">
                {rentalAmount.toFixed(2)}€
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {lang.paymentStep2Description}{" "}
              <span className="font-bold text-gray-900">
                {lang.paymentStep2DescriptionBold}
              </span>
            </p>
          </div>
          <CreditCard
            className="hidden h-5 w-5 shrink-0 text-s sm:block"
            aria-hidden
          />
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-white/60 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {lang.paymentStepsNote}
      </p>
    </div>
  );
}
