import { redirect } from "react-router";
import type { Route } from "./+types/wspay-resume";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { Link } from "react-router";
import { getLocale } from "@/lib/utils";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { publicPaths } from "@/lib/paths";
import { createWSPaySession } from "@/lib/wspay-session";
import {
  buildRentalSaleForm,
  reservationFromResume,
  resumeCookieHeader,
  verifyRentalResumeToken,
  wspayCredentials,
} from "@/lib/wspay-resume";

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("t");
  const lang = await getLocale(params.lang, request);
  const langCode = params.lang ?? "sr";
  const baseUrl = getBaseUrl(request);
  const resume = verifyRentalResumeToken(token);
  const { shopId, secretKey } = wspayCredentials();

  if (!resume || !token || !shopId || !secretKey) {
    return {
      invalid: true as const,
      lang,
      langCode,
      baseUrl,
    };
  }

  const sessionId = createWSPaySession(
    resume.cartId,
    reservationFromResume(resume),
  );
  const payment = buildRentalSaleForm({
    shopId,
    secretKey,
    cartId: resume.cartId,
    totalPriceEur: resume.reservation.totalPrice,
    langCode,
    baseUrl,
    sessionId,
    firstName: resume.reservation.firstName,
    lastName: resume.reservation.lastName,
    email: resume.reservation.customerEmail,
    phone: resume.reservation.phone,
  });
  const formData = encodeURIComponent(JSON.stringify(payment));

  return redirect(
    `${publicPaths.wspay.redirect(langCode)}?sessionId=${sessionId}&formData=${formData}`,
    {
      headers: {
        "Set-Cookie": resumeCookieHeader(token),
      },
    },
  );
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data?.baseUrl || getBaseUrl();
  const langCode = data?.langCode ?? "sr";

  return generateOpenGraphMeta({
    title: "Rental payment",
    description: "Continue the rental payment",
    url: publicPaths.wspay.resume(langCode),
    baseUrl,
  });
}

export default function WSPayResume({ loaderData }: Route.ComponentProps) {
  if (!loaderData?.invalid) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="my-32 flex flex-col items-center justify-center gap-8 text-center">
        <CircleX size={60} className="text-red-500" />
        <div className="mx-8 max-w-xl">
          <p className="text-lg font-medium text-white">
            {loaderData.lang.paymentResumeInvalidTitle}
          </p>
          <p className="mt-3 text-sm text-white/80">
            {loaderData.lang.paymentResumeInvalidBody}
          </p>
        </div>
        <Link to={publicPaths.contact(loaderData.langCode)}>
          <Button className="cursor-pointer bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg">
            {loaderData.lang.paymentResumeInvalidAction}
          </Button>
        </Link>
      </div>
    </div>
  );
}
