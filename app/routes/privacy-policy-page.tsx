import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { en } from "@/locales/en";
import type { Route } from "./+types/rental-conditions-page";
import { langCookie } from "@/lib/prefs-cookie";
import { replace } from "react-router";
import { sr } from "@/locales/sr";
import { privacyPolicy, usloviNajma } from "@/lib/data";
import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    langCode: params.lang ?? "en",
    lang,
    usloviNajma: privacyPolicy,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <Header lang={loaderData.lang} langCode={loaderData.langCode} />

      <div className="mt-16 prose prose-lg max-w-4xl mx-auto p-4 prose-headings:text-gray-800 prose-p:text-gray-700">
        <div
          dangerouslySetInnerHTML={{ __html: loaderData.usloviNajma ?? "" }}
        />
      </div>

      <Footer lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
