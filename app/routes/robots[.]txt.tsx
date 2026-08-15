import { getBaseUrl } from "@/lib/seo";
import { pathSegments } from "@/lib/paths";
import type { Route } from "./+types/robots[.]txt";

export async function loader({ request }: Route.LoaderArgs) {
  const baseUrl = getBaseUrl(request);

  const robots = `User-agent: *
Allow: /

# Disallow admin and private routes
Disallow: /${pathSegments.reservation}
Disallow: /${pathSegments.reservation}/
Disallow: /*/${pathSegments.reservation}
Disallow: /*/${pathSegments.reservation}/
Disallow: /${pathSegments.success}
Disallow: /*/${pathSegments.success}
Disallow: /wspay/
Disallow: /*/wspay/
Disallow: /${pathSegments.languageSelection}

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
