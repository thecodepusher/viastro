import { redirect } from "react-router";
import type { Route } from "./+types/wspay-error";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";
import { getLocale } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { Link } from "react-router";
import {
  verifyWSPayCallbackSignature,
  type WSPayCallbackParams,
} from "@/lib/wspay";
import { getWSPaySession, invalidateWSPaySession } from "@/lib/wspay-session";

export async function action({ request, params }: Route.ActionArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  const session = getWSPaySession(sessionId);
  if (!session) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const formData = await request.formData();
  const wspayParams: Record<string, string> = {};
  formData.forEach((value, key) => {
    wspayParams[key] = value as string;
  });

  const shopId =
    process.env.WSPAY_SHOP_ID ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SHOP_ID
      : undefined);
  const secretKey =
    process.env.WSPAY_SECRET_KEY ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SECRET_KEY
      : undefined);

  if (
    shopId &&
    secretKey &&
    wspayParams.Signature &&
    wspayParams.ShoppingCartID
  ) {
    const callbackParams: WSPayCallbackParams = {
      Success: wspayParams.Success || "0",
      ApprovalCode: wspayParams.ApprovalCode || wspayParams.Approvalcode || "",
      ShoppingCartID: wspayParams.ShoppingCartID || wspayParams.ShoppingCartId,
      Signature: wspayParams.Signature || wspayParams.signature,
      Amount: wspayParams.Amount || wspayParams.amount,
    };

    const isValidSignature = verifyWSPayCallbackSignature(
      callbackParams,
      shopId,
      secretKey
    );

    if (!isValidSignature) {
      console.error("WSPay Error: Invalid signature verification");
    }
  }

  invalidateWSPaySession(sessionId);

  return redirect(`/${params.lang ?? "sr"}/reservation?error=payment_failed`);
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  const session = getWSPaySession(sessionId);
  if (!session) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const wspayParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    wspayParams[key] = value;
  });

  const shopId =
    process.env.WSPAY_SHOP_ID ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SHOP_ID
      : undefined);
  const secretKey =
    process.env.WSPAY_SECRET_KEY ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.WSPAY_SECRET_KEY
      : undefined);

  if (
    shopId &&
    secretKey &&
    wspayParams.Signature &&
    wspayParams.ShoppingCartID
  ) {
    const callbackParams: WSPayCallbackParams = {
      Success: wspayParams.Success || "0",
      ApprovalCode: wspayParams.ApprovalCode || wspayParams.Approvalcode || "",
      ShoppingCartID: wspayParams.ShoppingCartID || wspayParams.ShoppingCartId,
      Signature: wspayParams.Signature || wspayParams.signature,
      Amount: wspayParams.Amount || wspayParams.amount,
    };

    const isValidSignature = verifyWSPayCallbackSignature(
      callbackParams,
      shopId,
      secretKey
    );

    if (!isValidSignature) {
      console.error("WSPay Error: Invalid signature verification");
    }
  }

  invalidateWSPaySession(sessionId);

  const lang = await getLocale(params.lang, request);
  const baseUrl = getBaseUrl(request);

  return {
    lang,
    langCode: params.lang ?? "sr",
    baseUrl,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();
  const langCode = data?.langCode ?? "sr";

  return generateOpenGraphMeta({
    title: "Payment Error",
    description: "Payment processing error",
    url: `/${langCode}/wspay/error`,
    baseUrl,
  });
}

export default function WSPayError({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="my-32 gap-8 flex flex-col items-center justify-center text-center">
        <CircleX size={60} className="text-red-500" />
        <p className="font-medium text-lg text-pd mx-8">
          {loaderData.lang.paymentErrorTitle}
        </p>
        <Link to={`/${loaderData.langCode}/reservation`}>
          <Button className="bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed">
            {loaderData.lang.paymentErrorAction}
          </Button>
        </Link>
      </div>
    </div>
  );
}
