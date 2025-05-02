import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { en } from "@/locales/en";
import type { Route } from "./+types/faq-page";

export async function loader({ request, context, params }: Route.LoaderArgs) {
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

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <Header />

      <FandQ />

      <Cta lang={loaderData.lang} />

      <Footer />
    </div>
  );
}
