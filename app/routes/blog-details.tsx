import Cta from "@/components/Cta";
import SEO from "@/components/SEO";
import type { Route } from "./+types/blog-details";
import { postsEn, postsRu, postsSr } from "@/lib/data";
import { redirect, Link } from "react-router";
import { getLocale } from "@/lib/utils";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateOpenGraphMeta,
} from "@/lib/seo";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  let posts = postsSr;

  let lang = await getLocale(params.lang, request);

  if (params.lang) {
    switch (params.lang) {
      case "sr":
        posts = postsSr;
        break;
      case "ru":
        posts = postsRu;
        break;
      case "en":
        posts = postsEn;
        break;
      default:
        posts = postsSr;
        break;
    }
  }

  const post = posts.find((x) => x.slug == params.slug);

  if (!post) {
    return redirect("/blog");
  }

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;

  const baseUrl = getBaseUrl(request);
  const langCode = params.lang ?? "sr";

  const data = {
    langCode,
    post,
    lang,
    message: context.VALUE_FROM_EXPRESS,
    baseUrl,
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();
  const title = `${data.post.title} | Viastro Blog`;
  const description = data.post.description || data.post.title;
  const imageUrl = data.post.imageUrl
    ? `${baseUrl}${data.post.imageUrl}`
    : undefined;

  const metaTags = generateOpenGraphMeta({
    title,
    description,
    url: `/${data.langCode || "sr"}/blog/${data.post.slug}`,
    baseUrl,
    type: "article",
    imageUrl,
    keywords: "viastro blog, rent a car Belgrade, car rental tips",
  });

  // Add article-specific meta tags
  metaTags.push({
    property: "article:published_time",
    content: data.post.datetime || new Date().toISOString(),
  });

  return metaTags;
}

export default function BlogDetailsPage({ loaderData }: Route.ComponentProps) {
  const articleUrl = `${loaderData.baseUrl}/${loaderData.langCode}/blog/${loaderData.post.slug}`;
  const imageUrl = loaderData.post.imageUrl
    ? `${loaderData.baseUrl}${loaderData.post.imageUrl}`
    : `${loaderData.baseUrl}/opengraph-1200x630.jpeg`;

  const schemas = [
    generateOrganizationSchema(loaderData.baseUrl, loaderData.langCode),
    generateArticleSchema(
      loaderData.baseUrl,
      {
        title: loaderData.post.title,
        image: imageUrl,
        datePublished: loaderData.post.datetime || new Date().toISOString(),
        dateModified: loaderData.post.datetime || new Date().toISOString(),
        description: loaderData.post.description,
        author: "Viastro",
        url: articleUrl,
      },
      loaderData.langCode
    ),
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        { name: loaderData.lang.blog, url: `/${loaderData.langCode}/blog` },
        {
          name: loaderData.post.title,
          url: `/${loaderData.langCode}/blog/${loaderData.post.slug}`,
        },
      ],
      loaderData.langCode
    ),
  ];

  return (
    <>
      <SEO schemas={schemas} />
      <div className="w-full flex flex-col items-center justify-center pt-30">
        <img className="max-w-[675px]" src={loaderData.post.imageUrl} />

        <div className="max-w-4xl mx-auto px-4 w-full">
          <nav
            className="flex items-center justify-center gap-2 text-md text-gray-600 py-4 flex-nowrap w-full min-w-0"
            aria-label="Breadcrumb">
            <Link
              to={`/${loaderData.langCode}/blog`}
              className="hover:text-[#FF9B17] transition-colors shrink-0">
              Blog
            </Link>
            <span className="text-gray-400 shrink-0">{">"}</span>
            <span className="text-gray-400 font-medium truncate min-w-0">
              {loaderData.post.title}
            </span>
          </nav>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto p-4 prose-headings:text-gray-800 prose-p:text-gray-700">
          <div
            dangerouslySetInnerHTML={{ __html: loaderData.post.content ?? "" }}
          />
        </div>
      </div>
      <Cta lang={loaderData.lang} />
    </>
  );
}
