import { getBaseUrl } from "@/lib/seo";
import type { Route } from "./+types/robots[.]txt";

/**
 * Generate robots.txt
 */
export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request);
  
  const robots = `User-agent: *
Allow: /

# Disallow admin and private routes
Disallow: /reservation/
Disallow: /success
Disallow: /select-lang

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

