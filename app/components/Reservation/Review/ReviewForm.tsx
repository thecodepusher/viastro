import { Form, Link } from "react-router";
import { Fragment, useRef, type FormEvent } from "react";
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
import {
  ALLOWED_PROMO_CODES,
  normalizePromoCode,
} from "@/constants/promo-codes";

const requiredFieldClass =
  "scroll-mt-48 sm:scroll-mt-64";

interface ReviewFormProps {
  lang: BaseLocale;
  isSubmitting: boolean;
  depositAmount: number;
  rentalAmount: number;
  originalRentalAmount: number;
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  promoApplied: boolean;
  promoDiscountPercent: number;
  langCode: string;
}

function PromoHint({ text }: { text: string }) {
  const parts = text.split("10%");

  return (
    <div className="flex items-center gap-2">
      <Info size={18} className="shrink-0 text-p" />
      <p className="text-sm leading-relaxed text-white/75">
        {parts.map((part, index) => (
          <Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="mx-0.5 inline-block text-2xl font-bold leading-none text-emerald-400">
                10%
              </span>
            )}
          </Fragment>
        ))}
      </p>
    </div>
  );
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
  originalRentalAmount,
  promoCode,
  onPromoCodeChange,
  promoApplied,
  promoDiscountPercent,
  langCode,
}: ReviewFormProps) {
  const policyLinks = getPolicyLinks(lang, langCode);
  const scrolledToInvalidRef = useRef(false);
  const normalizedPromo = normalizePromoCode(promoCode);
  const isTypingAllowedPrefix =
    normalizedPromo !== "" &&
    ALLOWED_PROMO_CODES.some((code) =>
      normalizePromoCode(code).startsWith(normalizedPromo),
    );
  const showInvalidPromo =
    normalizedPromo !== "" && !promoApplied && !isTypingAllowedPrefix;

  const handleInvalid = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || scrolledToInvalidRef.current) {
      return;
    }

    scrolledToInvalidRef.current = true;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.focus({ preventScroll: true });
    });
  };

  return (
    <Form method="POST" onInvalid={handleInvalid}>
      <div className={`${reviewSectionClass} mb-6 mt-4 gap-4`}>
        <h3 className="font-display text-xl font-bold text-white">
          {lang.reviewInformation}
        </h3>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-4">
          <div className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label
                className="text-[11px] font-semibold uppercase tracking-wider text-p"
                htmlFor="email">
                {lang.email}
              </Label>
              <Input
                required
                type="email"
                id="email"
                name="email"
                placeholder={lang.email}
                className={requiredFieldClass}
              />
            </div>

            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label
                className="text-[11px] font-semibold uppercase tracking-wider text-p"
                htmlFor="first_name">
                {lang.firstName}
              </Label>
              <Input
                required
                type="text"
                id="first_name"
                name="first_name"
                placeholder={lang.firstName}
                className={requiredFieldClass}
              />
            </div>

            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label
                className="text-[11px] font-semibold uppercase tracking-wider text-p"
                htmlFor="last_name">
                {lang.lastName}
              </Label>
              <Input
                required
                type="text"
                id="last_name"
                name="last_name"
                placeholder={lang.lastName}
                className={requiredFieldClass}
              />
            </div>

            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label
                className="text-[11px] font-semibold uppercase tracking-wider text-p"
                htmlFor="phone">
                {lang.phone}
              </Label>
              <Input
                required
                type="phone"
                id="phone"
                name="phone"
                placeholder={lang.phone}
                className={requiredFieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-pl/40 px-4 py-3.5">
              <PromoHint text={lang.promoCodeHint} />
            </div>

            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label
                className="text-[11px] font-semibold uppercase tracking-wider text-p"
                htmlFor="promo_code">
                {lang.promoCodeLabel}
              </Label>
              <Input
                type="text"
                id="promo_code"
                name="promo_code"
                autoComplete="off"
                spellCheck={false}
                value={promoCode}
                onChange={(event) => onPromoCodeChange(event.target.value)}
                placeholder={lang.promoCodeLabel}
              />
              <p
                className={`min-h-5 text-sm ${
                  promoApplied
                    ? "font-bold text-emerald-400"
                    : showInvalidPromo
                      ? "font-medium text-white/50"
                      : "invisible"
                }`}
                aria-live="polite">
                {promoApplied
                  ? lang.promoCodeApplied
                  : showInvalidPromo
                    ? lang.promoCodeInvalid
                    : "\u00a0"}
              </p>
            </div>
          </div>
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
        originalRentalAmount={originalRentalAmount}
        promoApplied={promoApplied}
        promoDiscountPercent={promoDiscountPercent}
      />

      <ReservationActionBar>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={reservationActionButtonClass}
          onClick={(event) => {
            scrolledToInvalidRef.current = false;
            const form = event.currentTarget.form;
            const firstInvalid = form?.querySelector(":invalid");
            if (!(firstInvalid instanceof HTMLElement)) {
              return;
            }

            requestAnimationFrame(() => {
              firstInvalid.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              if (firstInvalid instanceof HTMLInputElement) {
                firstInvalid.focus({ preventScroll: true });
              }
            });
          }}>
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
