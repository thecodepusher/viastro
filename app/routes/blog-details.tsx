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
import { ArrowLeft, Calendar, Tag } from "lucide-react";

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
  delete cookie.wspayInProgress;
  delete cookie.wspayFormData;
  delete cookie.wspayReservation;

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

export const links: Route.LinksFunction = () => [];

export function meta({ data }: Route.MetaArgs) {
  const baseUrl = data.baseUrl || getBaseUrl();
  const title = `${data.post.title}${data.lang.seoBlogDetailsTitle}`;
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
    keywords: data.lang.seoBlogDetailsKeywords,
  });

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
      <article className="w-full mt-20">
        <div className="relative w-full overflow-hidden bg-gray-900">
          <div className="relative aspect-none sm:aspect-21/9 w-full max-h-[60vh]">
            <img
              src={loaderData.post.imageUrl}
              alt={loaderData.post.title}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              {...({
                fetchPriority: "high",
              } as React.ImgHTMLAttributes<HTMLImageElement>)}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-linear-to-b from-[#FF9B17]/10 via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center sm:items-end">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:pb-8 lg:pb-12">
              <div className="max-w-4xl">
                <nav
                  className="mb-3 sm:mb-6 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/80"
                  aria-label="Breadcrumb">
                  <Link
                    to={`/${loaderData.langCode}/blog`}
                    className="inline-flex items-center gap-1 sm:gap-1.5 hover:text-[#FF9B17] transition-colors">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    {loaderData.lang.blog}
                  </Link>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60 truncate text-xs sm:text-sm">
                    {loaderData.post.title}
                  </span>
                </nav>

                <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-2 sm:mb-4 leading-tight drop-shadow-lg">
                  {loaderData.post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/90">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-[#FF9B17]" />
                    <time dateTime={loaderData.post.datetime}>
                      {loaderData.post.date}
                    </time>
                  </div>
                  {loaderData.post.tags && loaderData.post.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-[#FF9B17]" />
                      <span className="truncate">
                        {loaderData.post.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {loaderData.post.description && (
              <div className="mb-8 p-6 rounded-2xl bg-linear-to-br from-[#FF9B17]/5 via-[#FF9B17]/10 to-transparent border border-[#FF9B17]/20">
                <p className="text-lg leading-relaxed text-gray-700 font-medium">
                  {loaderData.post.description}
                </p>
              </div>
            )}

            <div className="prose prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-[#FF9B17] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-li:text-gray-700 max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: loaderData.post.content ?? "",
                }}
              />
            </div>

            {loaderData.post.tags && loaderData.post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-600">
                    Tags:
                  </span>
                  {loaderData.post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/${loaderData.langCode}/blog?tag=${encodeURIComponent(
                        tag
                      )}`}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-[#FF9B17] hover:text-white transition-all duration-200 hover:scale-105">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to={`/${loaderData.langCode}/blog`}
                className="inline-flex items-center gap-2 text-[#FF9B17] font-semibold hover:text-s transition-colors group">
                <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                {loaderData.lang.blog}
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Cta lang={loaderData.lang} />
    </>
  );
}
