import { useNavigate, useFetcher } from "react-router";
import { getLocale } from "@/lib/utils";
import { type ApiAllModelsResponse } from "@/lib/api-cars";
import type { Route } from "./+types/cars-page";
import Cars from "@/components/Cars";
import Logos from "@/components/Logos";
import SEO from "@/components/SEO";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });

  const apiResponse: ApiAllModelsResponse = await res.json();
  const baseUrl = getBaseUrl(request);
  const langCode = params.lang ?? "sr";

  const data = {
    langCode,
    lang,
    message: context.VALUE_FROM_EXPRESS,
    cars: apiResponse,
    baseUrl,
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const selectedCarId = formData.get("selectedCarId");

  if (selectedCarId) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await prefs.parse(cookieHeader)) || {};
    cookie.selectedCarId = selectedCarId;

    return new Response(null, {
      status: 200,
      headers: {
        "Set-Cookie": await prefs.serialize(cookie),
      },
    });
  }

  return new Response(null, { status: 400 });
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();
  const canonical = `${baseUrl}/${data.langCode || "sr"}/cars`;
  const title = data.lang.cars
    ? `Viastro ${data.lang.cars} | Belgrade`
    : "Viastro Cars | Belgrade";
  const description =
    data.lang.description ||
    "Browse our car rental fleet in Belgrade. Choose from economy, luxury, and SUV vehicles.";

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "rent a car Belgrade, car fleet, vehicle rental, iznajmljivanje automobila" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { rel: "canonical", href: canonical },
  ];
}

export default function CarsPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  // Generate SEO schemas
  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        { name: loaderData.lang.cars, url: `/${loaderData.langCode}/cars` },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full">
      <SEO schemas={schemas} />
      <div className="mt-18">
        <Logos lang={loaderData.lang} />
        <Cars
          onSelect={(carId) => {
            const form = new FormData();
            form.append("selectedCarId", `${carId}`);
            fetcher.submit(form, { method: "post" });
            navigate(`/${loaderData.langCode}/reservation`);
          }}
          lang={loaderData.lang}
          langCode={loaderData.langCode}
          cars={loaderData.cars}
        />
      </div>
    </div>
  );
}
