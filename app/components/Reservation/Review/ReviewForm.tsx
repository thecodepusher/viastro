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
    <>
      <h3 className="mx-6 my-4 font-bold text-xl">
        {lang.reviewInformation}
      </h3>

      <Form method="POST">
        <div className="mx-6 mt-4 p-4 border rounded shadow flex flex-col gap-4 mb-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{lang.email}</Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              placeholder={lang.email}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="first_name">{lang.firstName}</Label>
            <Input
              required
              type="text"
              id="first_name"
              name="first_name"
              placeholder={lang.firstName}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="last_name">{lang.lastName}</Label>
            <Input
              required
              type="text"
              id="last_name"
              name="last_name"
              placeholder={lang.lastName}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone">{lang.phone}</Label>
            <Input
              required
              type="phone"
              id="phone"
              name="phone"
              placeholder={lang.phone}
            />
          </div>

          <div className="items-top flex space-x-2">
            <Checkbox required id="terms1" />
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
            className="w-full max-w-sm bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed">
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
    </>
  );
}

