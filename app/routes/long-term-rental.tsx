import SEO from "@/components/SEO";
import { LongTermAudiences } from "@/components/LongTermRental/LongTermAudiences";
import { LongTermBenefits } from "@/components/LongTermRental/LongTermBenefits";
import { LongTermContact } from "@/components/LongTermRental/LongTermContact";
import { LongTermHero } from "@/components/LongTermRental/LongTermHero";
import { LongTermReasons } from "@/components/LongTermRental/LongTermReasons";
import { prefs } from "@/lib/prefs-cookie";
import { getLocale, getDatabaseUrl } from "@/lib/utils";
import {
  generateBreadcrumbSchema,
  generateOpenGraphMeta,
  getBaseUrl,
} from "@/lib/seo";
import { sendLongTermInquiryEmail } from "@/lib/email";
import {
  transformApiCars,
  type ApiAllModelsResponse,
} from "@/lib/api-cars";
import type { Route } from "./+types/long-term-rental";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

  // Fetch all cars for the dropdown
  const databaseUrl = getDatabaseUrl();
  const allModelsRes = await fetch(databaseUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });
  const allModels: ApiAllModelsResponse = await allModelsRes.json();
  const cars = transformApiCars(allModels, lang);

  const baseUrl = getBaseUrl(request);
  const langCode = params.lang ?? "sr";

  const data = {
    langCode,
    lang,
    baseUrl,
    cars,
    message: context.VALUE_FROM_EXPRESS,
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const type = formData.get("type") as "business" | "individual";
  const companyName = formData.get("companyName") as string | null;
  const taxId = formData.get("taxId") as string | null;
  const fullName = formData.get("fullName") as string | null;
  const phone = formData.get("phone") as string | null;
  const carName = formData.get("carName") as string | null;
  const email = formData.get("email") as string | null;
  const langCode = (formData.get("langCode") as string) || params.lang || "sr";

  const lang = await getLocale(langCode, request);

  if (!email || !carName) {
    return Response.json(
      { error: lang.longTermRental.toastErrorEmailRequired },
      { status: 400 }
    );
  }

  if (!carName || carName.trim() === "") {
    return Response.json(
      { error: lang.longTermRental.toastErrorInvalidcarName },
      { status: 400 }
    );
  }

  try {
    await sendLongTermInquiryEmail({
      type,
      companyName: companyName || undefined,
      taxId: taxId || undefined,
      fullName: fullName || undefined,
      phone: phone || undefined,
      carName: carName,
      email,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending long-term inquiry email:", error);
    return Response.json(
      { error: lang.longTermRental.toastErrorSending },
      { status: 500 }
    );
  }
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: data.lang.seoLongTermRentalTitle,
    description: data.lang.seoLongTermRentalDescription,
    url: `/${data.langCode || "sr"}/long-term-rental`,
    baseUrl,
    keywords: data.lang.seoLongTermRentalKeywords,
    imageAlt: "Viastro - Long term rental",
  });
}

export default function LongTermRentalPage({
  loaderData,
}: Route.ComponentProps) {
  const content = loaderData.lang.longTermRental;

  const schemas = [
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: content.heroTitle,
          url: `/${loaderData.langCode}/long-term-rental`,
        },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full pt-16">
      <SEO schemas={schemas} />
      <LongTermHero content={content} />
      <LongTermBenefits content={content} />
      <LongTermAudiences content={content} />
      <LongTermReasons content={content} />
      <LongTermContact 
        content={content} 
        langCode={loaderData.langCode}
        cars={loaderData.cars}
      />
    </div>
  );
}
