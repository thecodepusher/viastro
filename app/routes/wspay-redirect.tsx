import { useEffect, useRef } from "react";
import { redirect } from "react-router";
import type { Route } from "./+types/wspay-redirect";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";

export async function loader({ request, params }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  if (!cookie.wspayInProgress) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const wspayFormDataStr = cookie.wspayFormData;
  if (!wspayFormDataStr) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  let wspayData;
  try {
    wspayData = JSON.parse(wspayFormDataStr);
  } catch (error) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  if (!wspayData.url || !wspayData.formData) {
    return redirect(`/${params.lang ?? "sr"}`);
  }

  const lang = await getLocale(params.lang, request);
  const baseUrl = getBaseUrl(request);

  return {
    lang,
    langCode: params.lang ?? "sr",
    baseUrl,
    wspayUrl: wspayData.url,
    formData: wspayData.formData,
  };
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();
  const langCode = data?.langCode ?? "sr";

  return generateOpenGraphMeta({
    title: "Redirecting to payment...",
    description: "Redirecting to payment gateway",
    url: `/${langCode}/wspay/redirect`,
    baseUrl,
  });
}

export default function WSPayRedirect({ loaderData }: Route.ComponentProps) {
  const formRef = useRef<HTMLFormElement>(null);

  if (!loaderData || !loaderData.formData) {
    return null;
  }

  useEffect(() => {
    if (formRef.current) {
      try {
        formRef.current.submit();
      } catch (error) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = loaderData.wspayUrl;

        Object.entries(loaderData.formData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    }
  }, [loaderData]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="mb-4">Redirecting to payment gateway...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <form ref={formRef} method="POST" action={loaderData.wspayUrl}>
          {Object.entries(loaderData.formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value as string} />
          ))}
        </form>
      </div>
    </div>
  );
}
