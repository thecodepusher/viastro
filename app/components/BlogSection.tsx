import { postsEn, postsRu, postsSr } from "@/lib/data";
import { Link } from "react-router";
import type { BaseLocale } from "@/locales/base-locale";

export default function BlogSection(props: {
  langCode: string;
  lang: BaseLocale;
}) {
  let posts = postsEn;

  let title = "Where for the weekend?";
  if (props.langCode == "sr") {
    posts = postsSr;
    title = "Gde za vikend?";
  } else if (props.langCode == "ru") {
    posts = postsRu;
    title = "Куда на выходные?";
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 text-center">
          {title}
        </h3>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={`blog-${post.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
              <Link
                to={post.href}
                className="relative block w-full overflow-hidden">
                <div className="relative aspect-3/2 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width="364"
                    height="243"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                  <time dateTime={post.datetime} className="font-medium">
                    {post.date}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="truncate font-medium">
                        {post.tags[0]}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-[#FF9B17]">
                    <Link
                      to={post.href}
                      className="relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#FF9B17] after:transition-transform after:duration-300 hover:after:scale-x-100">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {post.description}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    to={post.href}
                    className="inline-flex items-center text-sm font-semibold text-[#FF9B17] transition-colors hover:text-s">
                    {props.lang.readMore}
                    <svg
                      className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
