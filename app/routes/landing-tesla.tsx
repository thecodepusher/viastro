import type { Route } from "./+types/home";
import { en } from "@/locales/en";

import FandQ from "@/components/FandQ";
import TrustedBy from "@/components/TrustedBy";
import BlogSection from "@/components/BlogSection";
import Logos from "@/components/Logos";
import GetInTouch from "@/components/GetInTouch";
import Cars from "@/components/Cars";
import Header from "@/components/Header";
import ReservationTime from "@/components/ReservationTime";
import Footer from "@/components/Footer";
import { redirect, replace, useFetcher, useNavigate } from "react-router";
import { langCookie, prefs } from "@/lib/prefs-cookie";
import { setHours } from "date-fns";
import { locations } from "@/lib/data";
import Cta from "@/components/Cta";
import { sr } from "@/locales/sr";
import LandingHero from "@/components/LandingHero";
import LandingPromo from "@/components/LandingPromo";
import FloatingButtons from "@/components/ContactFloatingButtons";
import { getLocale } from "@/lib/utils";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Viastro rent a car | Belgrade" },
    { name: "description", content: data.lang.description },
  ];
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

  return {
    langCode: params.lang ?? "en",
    lang,
    locations,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <FloatingButtons />

      <LandingHero lang={loaderData.lang} />
      <div className="flex flex-col w-full">
        <div className="gap-4 flex flex-col bg-gradient-to-b from-p">
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
          />
        </div>
      </div>

      <TrustedBy lang={loaderData.lang} />

      <LandingPromo langCode={loaderData.langCode} lang={loaderData.lang} />

      <Logos lang={loaderData.lang} />

      <Cars
        availableCars={null}
        onSelect={() => {
          navigate(`/${loaderData.langCode}/reservation`);
        }}
        lang={loaderData.lang}
        langCode={loaderData.langCode}
      />

      <FandQ langCode={loaderData.langCode} />

      <BlogSection langCode={loaderData.langCode} />

      <Cta lang={loaderData.lang} />

      <Footer lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
