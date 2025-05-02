import Header from "@/components/Header";
import type { Route } from "./+types/cars-page";
import Cars from "@/components/Cars";
import Footer from "@/components/Footer";
import { prefs } from "@/lib/prefs-cookie";
import { en } from "@/locales/en";
import Logos from "@/components/Logos";
import { useNavigate } from "react-router";

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  let lang = en;

  // if (params.lang) {
  //   switch (params.lang) {
  //     case "sr":
  //       lang = sr;
  //   }
  // }

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
