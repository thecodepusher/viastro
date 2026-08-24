import { getBaseUrl, getHreflangAlternates } from "@/lib/seo";
import { postsSr, postsEn, postsRu } from "@/lib/data";
import { pathSegments, publicPaths, supportedLocales } from "@/lib/paths";
import type { Route } from "./+types/sitemap[.]xml";

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request);

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
    pathSegments.cars,
    pathSegments.longTermRental,
    pathSegments.reservation,
    pathSegments.rentalConditions,
    pathSegments.faq,
    pathSegments.news,
    pathSegments.contact,
    pathSegments.privacyPolicy,
  ];

  const allBlogPosts = [...postsSr, ...postsEn, ...postsRu];
  const uniqueBlogSlugs = Array.from(
    new Set(allBlogPosts.map((post) => post.slug)),
  );

  const urls: string[] = [];

  const getPagePriority = (page: string, isSerbian: boolean): string => {
    const baseMultiplier = isSerbian ? 1.0 : 0.7;

    switch (page) {
      case "":
        return (1.0 * baseMultiplier).toFixed(2);
      case pathSegments.cars:
        return (0.95 * baseMultiplier).toFixed(2);
      case pathSegments.longTermRental:
        return (0.9 * baseMultiplier).toFixed(2);
      case pathSegments.news:
        return (0.9 * baseMultiplier).toFixed(2);
      case pathSegments.contact:
        return (0.8 * baseMultiplier).toFixed(2);
      case pathSegments.reservation:
        return (0.75 * baseMultiplier).toFixed(2);
      case pathSegments.faq:
        return (0.7 * baseMultiplier).toFixed(2);
      case pathSegments.rentalConditions:
        return (0.5 * baseMultiplier).toFixed(2);
      case pathSegments.privacyPolicy:
        return (0.3 * baseMultiplier).toFixed(2);
      default:
        return (0.5 * baseMultiplier).toFixed(2);
    }
  };

  const xhtmlLinks = (pathWithoutLang: string) =>
    getHreflangAlternates(pathWithoutLang, baseUrl)
      .map(
        ({ lang, href }) =>
          `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`,
      )
      .join("");

  for (const lang of supportedLocales) {
    const isSerbian = lang === "sr";

    for (const page of staticPages) {
      const pathWithoutLang = page ? `/${page}` : "";
      const path = `/${lang}${pathWithoutLang}`;
      const priority = getPagePriority(page, isSerbian);

      urls.push(
        `<url><loc>${baseUrl}${path}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority>${xhtmlLinks(pathWithoutLang)}</url>`,
      );
    }

    for (const slug of uniqueBlogSlugs) {
      const priority = isSerbian ? "0.75" : "0.53";
      const lastmod = getBlogPostDate(slug, lang);
      const pathWithoutLang = `/${pathSegments.news}/${slug}`;
      urls.push(
        `<url><loc>${baseUrl}${publicPaths.article(lang, slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority>${xhtmlLinks(pathWithoutLang)}</url>`,
      );
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
