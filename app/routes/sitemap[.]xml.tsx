import { getBaseUrl } from "@/lib/seo";
import { postsSr, postsEn, postsRu } from "@/lib/data";
import type { Route } from "./+types/sitemap[.]xml";

/**
 * Generate sitemap.xml for all pages
 */
export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request);
  const languages = ["sr", "en", "ru"];
  
  // Static pages
  const staticPages = [
    "",
    "cars",
    "contact",
    "faq",
    "blog",
    "rental-conditions",
    "privacy-policy",
    "rent-a-car-aerodrom-beograd-nikola-tesla",
    "rent-a-car-belgrade-airport",
  ];

  // Get all blog posts
  const allBlogPosts = [...postsSr, ...postsEn, ...postsRu];
  const uniqueBlogSlugs = Array.from(new Set(allBlogPosts.map(post => post.slug)));

  // Generate sitemap entries
  const urls: string[] = [];

  // Add static pages for each language
  for (const lang of languages) {
    for (const page of staticPages) {
      const path = page ? `/${lang}/${page}` : `/${lang}`;
      urls.push(`<url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>${page === "" ? "1.0" : page === "cars" || page === "blog" ? "0.9" : "0.8"}</priority></url>`);
    }

    // Add blog posts
    for (const slug of uniqueBlogSlugs) {
      urls.push(`<url><loc>${baseUrl}/${lang}/blog/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    }
  }

  // Also add root pages (default language)
  for (const page of staticPages) {
    const path = page ? `/${page}` : `/`;
    urls.push(`<url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  }

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

