import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import type { Route } from "./+types/faq-page";
import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    langCode: params.lang ?? "sr",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function FandQPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <FandQ langCode={loaderData.langCode} />

      <Cta lang={loaderData.lang} />
    </div>
  );
}
