import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Route } from "./+types/blog-page";
import BlogSection from "@/components/BlogSection";
import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    langCode: params.lang ?? "en",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <Header lang={loaderData.lang} langCode={loaderData.langCode} />

      <BlogSection langCode={loaderData.langCode} />

      <Cta lang={loaderData.lang} />

      <Footer lang={loaderData.lang} langCode={loaderData.langCode} />
    </div>
  );
}
