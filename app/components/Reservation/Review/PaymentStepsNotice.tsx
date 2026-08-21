import { ArrowRight, CreditCard, Info, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import type { BaseLocale } from "@/locales/base-locale";
import { reviewSectionClass } from "@/components/Reservation/Review/CostSummary";
import { publicPaths } from "@/lib/paths";

interface PaymentStepsNoticeProps {
  lang: BaseLocale;
  langCode: string;
  depositAmount: number;
  rentalAmount: number;
}

export function PaymentStepsNotice({
  lang,
  langCode,
  depositAmount,
  rentalAmount,
}: PaymentStepsNoticeProps) {
  return (
    <div
      className={`${reviewSectionClass} mb-0 gap-4 border-p/20 bg-linear-to-br from-pl/50 via-card to-pd sm:p-5`}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-p/15 text-p">
          <CreditCard className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h4 className="text-base font-bold text-white sm:text-lg">
            {lang.paymentStepsTitle}
          </h4>
          <p className="mt-1 text-sm text-white/70">{lang.paymentStepsIntro}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex gap-3 rounded-xl border border-white/10 bg-pl/50 p-3.5 sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-p text-sm font-bold text-primary-foreground">
            1
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-white">{lang.paymentStep1Title}</p>
              <span className="inline-flex items-center rounded-full bg-p/20 px-2.5 py-0.5 text-xs font-bold text-p">
                {depositAmount.toFixed(2)}€
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
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

        <div className="flex gap-3 rounded-xl border border-white/10 bg-pl/50 p-3.5 sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-s text-sm font-bold text-white">
            2
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-white">{lang.paymentStep2Title}</p>
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-white">
                {rentalAmount.toFixed(2)}€
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              {lang.paymentStep2Description}{" "}
              <span className="font-bold text-white">
                {lang.paymentStep2DescriptionBold}
              </span>
            </p>
          </div>
          <CreditCard
            className="hidden h-5 w-5 shrink-0 text-p sm:block"
            aria-hidden
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-pl/40 px-4 py-3.5">
        <p className="text-sm leading-relaxed text-white/75">
          <Info size={18} className="float-left mr-2 mt-0.5 text-p" />
          {lang.paymentStepsNotePrefix}
          <Link
            target="_blank"
            rel="noreferrer"
            to={publicPaths.rentalConditions(langCode)}
            className="font-medium text-p underline-offset-2 hover:underline">
            {lang.paymentStepsNoteLink}
          </Link>
          {lang.paymentStepsNoteSuffix}
        </p>
      </div>
    </div>
  );
}
