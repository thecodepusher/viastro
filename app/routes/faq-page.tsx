import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import type { Route } from "./+types/faq-page";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;

  const data = {
    langCode: params.lang ?? "sr",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export default function FandQPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full pt-20">
      <FandQ langCode={loaderData.langCode} />
      <Cta lang={loaderData.lang} />
    </div>
  );
}
