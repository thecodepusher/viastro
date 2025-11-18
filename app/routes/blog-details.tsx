import Cta from "@/components/Cta";
import type { Route } from "./+types/blog-details";
import { postsEn, postsRu, postsSr } from "@/lib/data";
import { redirect } from "react-router";
import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  let posts = postsEn;

  let lang = await getLocale(params.lang, request);

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        posts = postsSr;
      case "ru":
        posts = postsRu;
    }
  }

  const post = posts.find((x) => x.slug == params.slug);

  if (!post) {
    return redirect("/blog");
  }

  return {
    langCode: params.lang ?? "sr",
    post,
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function BlogDetailsPage({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="w-full">
      <img className="mx-auto" src={loaderData.post.imageUrl} />

      <div className="prose prose-lg max-w-4xl mx-auto p-4 prose-headings:text-gray-800 prose-p:text-gray-700">
        <div
          dangerouslySetInnerHTML={{ __html: loaderData.post.content ?? "" }}
        />
      </div>

      <Cta lang={loaderData.lang} />
    </div>
  );
}
