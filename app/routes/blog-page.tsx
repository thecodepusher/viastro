import Cta from "@/components/Cta";
import type { Route } from "./+types/blog-page";
import BlogSection from "@/components/BlogSection";
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
  delete cookie.selectedCarId;

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

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full pt-16">
      <BlogSection langCode={loaderData.langCode} />
      <Cta lang={loaderData.lang} />
    </div>
  );
}
