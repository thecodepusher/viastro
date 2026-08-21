import { Form, Link } from "react-router";
import { Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import { PaymentStepsNotice } from "@/components/Reservation/Review/PaymentStepsNotice";
import { reviewSectionClass } from "@/components/Reservation/Review/CostSummary";
import {
  ReservationActionBar,
  reservationActionButtonClass,
} from "@/components/Reservation/ReservationActionBar";
import { publicPaths } from "@/lib/paths";

interface ReviewFormProps {
  lang: BaseLocale;
  isSubmitting: boolean;
  depositAmount: number;
  rentalAmount: number;
  langCode: string;
}

function getPolicyLinks(lang: BaseLocale, langCode: string) {
  const policyPath = publicPaths.privacyPolicy(langCode);

  return [
    { href: policyPath, label: lang.privacyPolicyLabel },
    {
      href: `${policyPath}#konverzija`,
      label: lang.conversionStatementLabel,
    },
    {
      href: `${policyPath}#privatnost-korisnika`,
      label: lang.userPrivacyProtectionLabel,
    },
    {
      href: `${policyPath}#podaci-transakcije`,
      label: lang.transactionDataProtectionLabel,
    },
    { href: `${policyPath}#povracaj`, label: lang.refundsLabel },
  ];
}

export function ReviewForm({
  lang,
  isSubmitting,
  depositAmount,
  rentalAmount,
  langCode,
}: ReviewFormProps) {
  const policyLinks = getPolicyLinks(lang, langCode);

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

        <div className="rounded-xl border border-white/10 bg-pl/40 px-4 py-3.5">
          <p className="text-sm leading-relaxed text-white/75">
            <Info size={18} className="float-left mr-2 mt-0.5 text-p" />
            {lang.privacyAgreement} {lang.privacyAgreementMore}{" "}
            {policyLinks.map((item, index) => (
              <span key={item.href}>
                {index > 0 &&
                  (index === policyLinks.length - 1
                    ? ` ${lang.privacyAgreementAnd} `
                    : ", ")}
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to={item.href}
                  className="font-medium text-p underline-offset-2 hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </div>

      <PaymentStepsNotice
        lang={lang}
        langCode={langCode}
        depositAmount={depositAmount}
        rentalAmount={rentalAmount}
      />

      <ReservationActionBar>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={reservationActionButtonClass}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {lang.reservationReviewAction || "Processing..."}
            </>
          ) : (
            lang.reservationReviewAction
          )}
        </Button>
      </ReservationActionBar>
    </Form>
  );
}
