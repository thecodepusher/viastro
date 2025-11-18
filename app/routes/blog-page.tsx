import Cta from "@/components/Cta";
import type { Route } from "./+types/blog-page";
import BlogSection from "@/components/BlogSection";
import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    langCode: params.lang ?? "sr",
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <BlogSection langCode={loaderData.langCode} />

      <Cta lang={loaderData.lang} />
    </div>
  );
}
