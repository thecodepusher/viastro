import Header from "@/components/Header";
import type { Route } from "./+types/cars-page";
import Cars from "@/components/Cars";
import Footer from "@/components/Footer";
import { langCookie, prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import Logos from "@/components/Logos";
import { replace, useNavigate } from "react-router";
import { sr } from "@/locales/sr";

export async function loader({ context, params, request }: Route.LoaderArgs) {
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
    message: context.VALUE_FROM_EXPRESS,
  };
}

export async function action({ request }: Route.ActionArgs) {}
export function meta({}: Route.MetaArgs) {}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Header />
      <div className="mt-18">
        <Logos lang={loaderData.lang} />
        <Cars
          availableCars={null}
          onSelect={() => {
            navigate("/reservation");
          }}
          lang={loaderData.lang}
          langCode={loaderData.langCode}
        />
      </div>
      <Footer />
    </div>
  );
}
