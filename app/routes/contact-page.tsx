import Cta from "@/components/Cta";
import type { Route } from "./+types/contact-page";
import GetInTouch from "@/components/GetInTouch";

import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    langCode: params.lang ?? "sr",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function ContactPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full pt-16">
      <GetInTouch lang={loaderData.lang} />

      <Cta lang={loaderData.lang} />
    </div>
  );
}
