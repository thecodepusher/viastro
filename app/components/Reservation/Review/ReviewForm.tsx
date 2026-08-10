import { Form, Link } from "react-router";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { BaseLocale } from "@/locales/base-locale";
import { PaymentStepsNotice } from "@/components/Reservation/Review/PaymentStepsNotice";
import { reviewSectionClass } from "@/components/Reservation/Review/CostSummary";

interface ReviewFormProps {
  lang: BaseLocale;
  isSubmitting: boolean;
  depositAmount: number;
  rentalAmount: number;
}

export function ReviewForm({
  lang,
  isSubmitting,
  depositAmount,
  rentalAmount,
}: ReviewFormProps) {
  return (
    <Form method="POST">
      <div className={`${reviewSectionClass} mb-6 mt-4 gap-4`}>
        <h3 className="font-display text-xl font-bold text-white">
          {lang.reviewInformation}
        </h3>

        <div className="grid w-full max-w-sm items-start gap-1.5">
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-p" htmlFor="email">
            {lang.email}
          </Label>
          <Input
            required
            type="email"
            id="email"
            name="email"
            placeholder={lang.email}
          />
        </div>

        <div className="grid w-full max-w-sm items-start gap-1.5">
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-p" htmlFor="first_name">
            {lang.firstName}
          </Label>
          <Input
            required
            type="text"
            id="first_name"
            name="first_name"
            placeholder={lang.firstName}
          />
        </div>

        <div className="grid w-full max-w-sm items-start gap-1.5">
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-p" htmlFor="last_name">
            {lang.lastName}
          </Label>
          <Input
            required
            type="text"
            id="last_name"
            name="last_name"
            placeholder={lang.lastName}
          />
        </div>

        <div className="grid w-full max-w-sm items-start gap-1.5">
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-p" htmlFor="phone">
            {lang.phone}
          </Label>
          <Input
            required
            type="phone"
            id="phone"
            name="phone"
            placeholder={lang.phone}
          />
        </div>

        <div className="items-top flex space-x-2">
          <Checkbox required id="terms1" name="terms1" />
          <div className="grid gap-1.5 leading-none">
            <Link target="_blank" to="/privacy-policy">
              <p className="text-sm text-white/75 transition-colors hover:text-p">
                {lang.privacyAgreement}
              </p>
            </Link>
          </div>
        </div>
      </div>

      <PaymentStepsNotice
        lang={lang}
        depositAmount={depositAmount}
        rentalAmount={rentalAmount}
      />

      <div className="mx-auto mb-6 flex max-w-7xl px-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full flex-row items-center justify-center gap-2 rounded-full bg-linear-to-r from-p via-p to-p/90 px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-p/30 transition hover:-translate-y-0.5 sm:max-w-sm disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {lang.reservationReviewAction || "Processing..."}
            </>
          ) : (
            lang.reservationReviewAction
          )}
        </Button>
      </div>
    </Form>
  );
}
