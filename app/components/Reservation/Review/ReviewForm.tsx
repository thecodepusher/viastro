import { Form, Link } from "react-router";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { BaseLocale } from "@/locales/base-locale";

interface ReviewFormProps {
  lang: BaseLocale;
  isSubmitting: boolean;
}

export function ReviewForm({ lang, isSubmitting }: ReviewFormProps) {
  return (
    <Form method="POST">
      <div className="mx-6 mt-4 p-4 sm:p-6 rounded-2xl border border-gray-100 bg-slate-50/80 shadow-sm flex flex-col gap-4 mb-6">
        <h3 className="mx-0 mb-1 font-bold text-xl">
          {lang.reviewInformation}
        </h3>
        <div className="grid w-full max-w-sm items-start gap-1.5">
          <Label
            className="text-sm font-semibold text-gray-700"
            htmlFor="email">
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
          <Label
            className="text-sm font-semibold text-gray-700"
            htmlFor="first_name">
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
          <Label
            className="text-sm font-semibold text-gray-700"
            htmlFor="last_name">
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
          <Label
            className="text-sm font-semibold text-gray-700"
            htmlFor="phone">
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
              <p className="text-sm text-muted-foreground">
                {lang.privacyAgreement}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex mx-6 mb-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:max-w-sm flex flex-row justify-center items-center gap-2 rounded-full bg-linear-to-r from-p via-p to-p/90 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-p/30 transition hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
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
