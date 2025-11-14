import Header from "@/components/Header";
import type { Route } from "./+types/cars-page";
import Cars from "@/components/Cars";
import Footer from "@/components/Footer";
import Logos from "@/components/Logos";
import { useNavigate } from "react-router";
import { getLocale } from "@/lib/utils";

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    langCode: params.lang ?? "en",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export async function action() {}
export function meta({}: Route.MetaArgs) {}

export default function CarsPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Header lang={loaderData.lang} langCode={loaderData.langCode} />
      <div className="mt-18">
        <Logos lang={loaderData.lang} />
        <Cars
          availableCars={null}
          onSelect={() => {
            navigate(`/${loaderData.langCode}/reservation`);
          }}
          lang={loaderData.lang}
          langCode={loaderData.langCode}
        />
      </div>
      <Footer lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
