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

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Viastro rent a car | Belgrade" },
    { name: "description", content: data.lang.description },
  ];
}

export async function action({ request }: Route.ActionArgs) {
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

  return redirect("reservation/vehicle", {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
  if (!params.lang) {
    const cookieHeader = request.headers.get("Cookie");

    const lgCookie = (await langCookie.parse(cookieHeader)) || {};

    const url = new URL(request.url);

    let returnPath = url.pathname;

    if (lgCookie.lang) {
      if (returnPath == "/") {
        return replace(`/${lgCookie.lang}`);
      }
      return replace(`/${lgCookie.lang}${url.pathname}`);
    }

    if (returnPath == "/") {
      return replace(`/en`);
    }

    return replace(`/en${url.pathname}`);
  }

  let lang = en;

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        lang = sr;
    }
  }

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
      <Header />
      <div className="flex flex-col w-full mt-18">
        <div className="gap-4 flex flex-col bg-gradient-to-b from-p">
          <div className="mx-4 mt-8">
            <h1 className="text-center text-white font-black uppercase text-xl">
              {loaderData.lang.title}
            </h1>
            <h2 className="text-center text-[#614B80] font-black uppercase text-2xl">
              {loaderData.lang.subTitle}
            </h2>
          </div>
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

      <Logos lang={loaderData.lang} />

      <Cars
        availableCars={null}
        onSelect={() => {
          navigate("reservation");
        }}
        lang={loaderData.lang}
        langCode={loaderData.langCode}
      />

      <FandQ />

      <BlogSection />

      <TrustedBy lang={loaderData.lang} />

      <GetInTouch />

      <Cta lang={loaderData.lang} />

      <Footer />
    </div>
  );
}
