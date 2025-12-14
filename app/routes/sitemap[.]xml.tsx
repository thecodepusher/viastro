import { getBaseUrl } from "@/lib/seo";
import { postsSr, postsEn, postsRu } from "@/lib/data";
import type { Route } from "./+types/sitemap[.]xml";

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request);
  const languages = ["sr", "en", "ru"];

  const currentDate = new Date().toISOString().split("T")[0];

  const getBlogPostDate = (slug: string, lang: string): string => {
    let posts = postsSr;
    if (lang === "en") posts = postsEn;
    if (lang === "ru") posts = postsRu;

    const post = posts.find((p) => p.slug === slug);
    if (post && post.datetime) {
      const date = new Date(post.datetime);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    }
    return currentDate;
  };

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

  const getPagePriority = (page: string, isSerbian: boolean): string => {
    const baseMultiplier = isSerbian ? 1.0 : 0.7;

    switch (page) {
      case "":
        return (1.0 * baseMultiplier).toFixed(2);
      case "cars":
        return (0.95 * baseMultiplier).toFixed(2);
      case "long-term-rental":
        return (0.9 * baseMultiplier).toFixed(2);
      case "blog":
        return (0.9 * baseMultiplier).toFixed(2);
      case "contact":
        return (0.8 * baseMultiplier).toFixed(2);
      case "faq":
        return (0.7 * baseMultiplier).toFixed(2);
      case "rental-conditions":
        return (0.5 * baseMultiplier).toFixed(2);
      case "privacy-policy":
        return (0.3 * baseMultiplier).toFixed(2);
      default:
        return (0.5 * baseMultiplier).toFixed(2);
    }
  };

  for (const lang of languages) {
    const isSerbian = lang === "sr";

    for (const page of staticPages) {
      const path = page ? `/${lang}/${page}` : `/${lang}`;
      const priority = getPagePriority(page, isSerbian);

      urls.push(
        `<url><loc>${baseUrl}${path}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
      );
    }

    for (const slug of uniqueBlogSlugs) {
      const priority = isSerbian ? "0.75" : "0.53";
      const lastmod = getBlogPostDate(slug, lang);
      urls.push(
        `<url><loc>${baseUrl}/${lang}/blog/${slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
      );
    }
  }

  urls.unshift(
    `<url><loc>${baseUrl}/</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`
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
