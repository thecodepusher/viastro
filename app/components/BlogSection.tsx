import { postsEn, postsRu, postsSr } from "@/lib/data";
import { Link } from "react-router";
import type { BaseLocale } from "@/locales/base-locale";
import { publicPaths } from "@/lib/paths";

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
    <section className="bg-surface section-pattern py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          {title}
        </h3>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            const articleHref = publicPaths.article(props.langCode, post.slug);

            return (
            <article
              key={`blog-${post.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-colors hover:border-p/40">
              <Link
                to={articleHref}
                className="relative block w-full overflow-hidden">
                <div className="relative aspect-3/2 w-full overflow-hidden bg-pl/40 flex items-center justify-center">
                  <img
                    alt=""
                    src={post.imageUrl}
                    className={`h-full w-full transition-transform duration-500 ${
                      post.imageUrl === "/mount.webp" ||
                      post.imageUrl === "/sea-summer.webp"
                        ? "object-cover object-bottom-left group-hover:scale-105"
                        : "object-contain group-hover:scale-105"
                    }`}
                    loading="lazy"
                    decoding="async"
                    width="364"
                    height="243"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.datetime} className="font-medium">
                    {post.date}
                  </time>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="text-border">•</span>
                      <span className="truncate font-medium">{post.tags[0]}</span>
                    </>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="mb-3 font-display text-lg sm:text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-p">
                    <Link to={articleHref}>{post.title}</Link>
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    to={articleHref}
                    className="inline-flex items-center text-sm font-semibold text-p transition-colors hover:text-white">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
