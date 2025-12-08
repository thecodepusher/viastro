import FandQ from "@/components/FandQ";
import TrustedBy from "@/components/TrustedBy";
import BlogSection from "@/components/BlogSection";
import Logos from "@/components/Logos";
import Cars from "@/components/Cars";
import ReservationTime from "@/components/ReservationTime";
import { redirect, useFetcher, useNavigate } from "react-router";
import { prefs } from "@/lib/prefs-cookie";
import { setHours } from "date-fns";
import { locations } from "@/lib/data";
import Cta from "@/components/Cta";
import LandingHero from "@/components/LandingHero";
import LandingPromo from "@/components/LandingPromo";
import FloatingButtons from "@/components/ContactFloatingButtons";
import { getLocale } from "@/lib/utils";
import SEO from "@/components/SEO";
import type { Route } from "./+types/landing-tesla";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateCarRentalServiceSchema,
  generateBreadcrumbSchema,
  generateOpenGraphMeta,
} from "@/lib/seo";

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();

  return generateOpenGraphMeta({
    title: data.lang.seoLandingTeslaTitle,
    description: data.lang.seoLandingTeslaDescription,
    url: `/${data.langCode || "sr"}/rent-a-car-aerodrom-beograd-nikola-tesla`,
    baseUrl,
    keywords: data.lang.seoLandingTeslaKeywords,
    imageAlt: "Viastro Rent a Car - Belgrade Airport Nikola Tesla",
  });
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const pickUpLocation = formData.get("pickUpLocation");
  const dropOffLocation = formData.get("dropOffLocation");
  const pickUpDate = formData.get("pickUpDate");
  const pickUpTime = formData.get("pickUpTime");
  const dropOffDate = formData.get("dropOffDate");
  const dropOffTime = formData.get("dropOffTime");

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  cookie.pickUpLocation = pickUpLocation;
  cookie.dropOffLocation = dropOffLocation;
  cookie.pickUpDate = pickUpDate;
  cookie.pickUpTime = pickUpTime;
  cookie.dropOffDate = dropOffDate;
  cookie.dropOffTime = dropOffTime;

  return redirect(`/${params.lang}/reservation/vehicle`, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

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

  const baseUrl = getBaseUrl(request);
  const langCode = params.lang ?? "sr";

  const data = {
    langCode,
    lang,
    locations,
    message: context.VALUE_FROM_EXPRESS,
    baseUrl,
    initialValues: {
      pickUpDate: undefined,
      pickUpTime: undefined,
      dropOffDate: undefined,
      dropOffTime: undefined,
      pickUpLocation: cookie.pickUpLocation,
      dropOffLocation: cookie.dropOffLocation,
    },
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export default function LandingTeslaPage({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateLocalBusinessSchema(loaderData.baseUrl, loaderData.langCode),
    generateCarRentalServiceSchema(loaderData.baseUrl, loaderData.langCode),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: "Rent a Car Airport",
          url: `/${loaderData.langCode}/rent-a-car-aerodrom-beograd-nikola-tesla`,
        },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <div className="w-full">
      <SEO schemas={schemas} />
      <FloatingButtons />

      <LandingHero lang={loaderData.lang} />
      <div className="flex flex-col w-full">
        <div className="gap-4 flex flex-col bg-linear-to-b from-p">
          <ReservationTime
            onStart={async (data) => {
              const form = new FormData();
              form.append("pickUpLocation", data.pickUpLocation);
              form.append("dropOffLocation", data.dropOffLocation);
              form.append(
                "pickUpDate",
                setHours(data.pickDate, 12).toISOString()
              );
              form.append("pickUpTime", data.pickUpTime);
              form.append(
                "dropOffDate",
                setHours(data.dropDate, 12).toISOString()
              );
              form.append("dropOffTime", data.dropOfTime);
              fetcher.submit(form, { method: "post" });
            }}
            lang={loaderData.lang}
            locations={loaderData.locations}
            initialValues={loaderData.initialValues}
          />
        </div>
      </div>

      <TrustedBy lang={loaderData.lang} />

      <LandingPromo langCode={loaderData.langCode} lang={loaderData.lang} />

      <Logos lang={loaderData.lang} />

      <Cars
        cars={[]}
        onSelect={() => {
          navigate(`/${loaderData.langCode}/reservation`);
        }}
        lang={loaderData.lang}
        langCode={loaderData.langCode}
      />

      <FandQ langCode={loaderData.langCode} />

      <BlogSection langCode={loaderData.langCode} />

      <Cta lang={loaderData.lang} />
    </div>
  );
}
