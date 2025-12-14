import { getBaseUrl } from "@/lib/seo";
import { postsSr, postsEn, postsRu } from "@/lib/data";
import type { Route } from "./+types/sitemap[.]xml";

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request);
  const languages = ["sr", "en", "ru"];

  const staticPages = [
    "",
    "cars",
    "long-term-rental",
    "rental-conditions",
    "faq",
    "blog",
    "contact",
    "privacy-policy",
  ];

  const allBlogPosts = [...postsSr, ...postsEn, ...postsRu];
  const uniqueBlogSlugs = Array.from(
    new Set(allBlogPosts.map((post) => post.slug))
  );

  const urls: string[] = [];

  for (const lang of languages) {
    const isSerbian = lang === "sr";

    for (const page of staticPages) {
      const path = page ? `/${lang}/${page}` : `/${lang}`;
      const priority = isSerbian
        ? page === ""
          ? "1.0"
          : page === "cars" || page === "blog"
            ? "0.95"
            : "0.9"
        : page === ""
          ? "0.8"
          : page === "cars" || page === "blog"
            ? "0.7"
            : "0.6";

      urls.push(
        `<url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
      );
    }

    for (const slug of uniqueBlogSlugs) {
      const priority = isSerbian ? "0.8" : "0.5";
      urls.push(
        `<url><loc>${baseUrl}/${lang}/blog/${slug}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
      );
    }
  }

  urls.unshift(
    `<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
