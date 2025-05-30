import Cta from "@/components/Cta";
import FandQ from "@/components/FandQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { en } from "@/locales/en";
import { sr } from "@/locales/sr";
import type { Route } from "./+types/blog-details";
import { postsEn, postsRu, postsSr } from "@/lib/data";
import { redirect, replace } from "react-router";
import { langCookie } from "@/lib/prefs-cookie";
import { ru } from "@/locales/ru";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  if (!params.lang) {
    const cookieHeader = request.headers.get("Cookie");

    const lgCookie = (await langCookie.parse(cookieHeader)) || {};

    const url = new URL(request.url);

    let returnPath = url.pathname;

    if (lgCookie.lang) {
      if (returnPath == "/") {
        return replace(`/${lgCookie.lang}`);
      }
      return replace(`/${lgCookie.lang}${url.pathname}`);
    }

    if (returnPath == "/") {
      return replace(`/en`);
    }

    return replace(`/en${url.pathname}`);
  }

  let posts = postsEn;

  let lang = en;

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        lang = sr;
        posts = postsSr;
      case "ru":
        lang = ru;
        posts = postsRu;
    }
  }

  const post = posts.find((x) => x.slug == params.slug);

  if (!post) {
    return redirect("/blog");
  }

  return {
    langCode: params.lang ?? "en",
    post,
    lang,
    message: context.VALUE_FROM_EXPRESS,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <Header />

      <img className="mx-auto" src={loaderData.post.imageUrl} />

      <div className="prose prose-lg max-w-4xl mx-auto p-4 prose-headings:text-gray-800 prose-p:text-gray-700">
        <div
          dangerouslySetInnerHTML={{ __html: loaderData.post.content ?? "" }}
        />
      </div>

      <Cta lang={loaderData.lang} />

      <Footer />
    </div>
  );
}
