import type { Route } from "./+types/privacy-policy-page";
import { privacyPolicySr, privacyPolicyEn, privacyPolicyRu } from "@/lib/data";
import { getLocale } from "@/lib/utils";
import Cta from "@/components/Cta";
import { CustomHero } from "@/components/CustomHero";
import { prefs } from "@/lib/prefs-cookie";
import {
  getBaseUrl,
  generateOpenGraphMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import SEO from "@/components/SEO";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: "/long-term-rental-hero-2.webp",
    as: "image",
    fetchPriority: "high",
  },
];

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
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

  let privacyPolicy = privacyPolicySr;
  if (langCode === "en") privacyPolicy = privacyPolicyEn;
  if (langCode === "ru") privacyPolicy = privacyPolicyRu;

  const data = {
    langCode,
    lang,
    privacyPolicy,
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

  return generateOpenGraphMeta({
    title: data.lang.seoPrivacyPolicyTitle,
    description: data.lang.seoPrivacyPolicyDescription,
    url: `/${data.langCode || "sr"}/privacy-policy`,
    baseUrl,
    keywords: data.lang.seoPrivacyPolicyKeywords,
    imageAlt: "Viastro Privacy Policy",
  });
}

export default function PrivacyPolicyPage({
  loaderData,
}: Route.ComponentProps) {
  const schemas = [
    generateBreadcrumbSchema(
      loaderData.baseUrl,
      [
        { name: loaderData.lang.home, url: `/${loaderData.langCode}` },
        {
          name: loaderData.lang.seoPrivacyPolicyTitle,
          url: `/${loaderData.langCode}/privacy-policy`,
        },
      ],
      loaderData.langCode
    ),
  ];

  const processedHtml =
    loaderData.privacyPolicy?.replace(
      /(<p[^>]*class="c3"[^>]*>\s*<span[^>]*>)(.*?)(<br\s*[\/]?>)/s,
      (match, openingTags, titleContent, brTag) => {
        const titleMatch = titleContent.match(/^([^<]+)/);
        if (titleMatch) {
          const titleText = titleMatch[1].trim();
          const remainingContent = titleContent.substring(titleMatch[0].length);
          return `${openingTags}<span class="content-title-large">${titleText}</span>${remainingContent}${brTag}`;
        }
        return match;
      }
    ) || loaderData.privacyPolicy;

  return (
    <div className="w-full min-h-screen">
      <SEO schemas={schemas} />
      <CustomHero
        title={loaderData.lang.seoPrivacyPolicyTitle}
        description={loaderData.lang.seoPrivacyPolicyDescription}
        primaryLabel={loaderData.lang.createReservation}
        secondaryLabel={loaderData.lang.contactUs}
        helperText={loaderData.lang.description}
        primaryHref="/reservation"
        secondaryHref={`/${loaderData.langCode}/contact`}
        fastTitle={loaderData.lang.createReservation}
        fastSubtitle={loaderData.lang.deployFaster}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <style>{`
              .content-wrapper .content-title-large {
                font-size: 1.875rem;
                line-height: 1.3;
                font-weight: 700;
                color: #111827;
                display: block;
                margin-bottom: 1rem;
                padding-bottom: 1.5rem;
                border-bottom: 2px solid #d1d5db;
              }
              .content-wrapper .content-subtitle {
                font-size: 1.5rem;
                line-height: 1.4;
                font-weight: 700;
                color: #111827;
                display: block;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .content-wrapper .c8 {
                font-size: 1.25rem;
                line-height: 1.5;
                font-weight: 700;
                color: #111827;
                display: block;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              .content-wrapper .c11 {
                font-size: 1.25rem;
                line-height: 1.5;
                font-weight: 700;
                color: #111827;
                display: block;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              .content-wrapper p.c0,
              .content-wrapper p.c1,
              .content-wrapper p.c6 {
                color: #374151;
                line-height: 1.75;
                margin-bottom: 1rem;
                font-size: 1rem;
              }
              .content-wrapper span.c1,
              .content-wrapper span.c3 {
                color: #374151;
              }
              .content-wrapper span.c0 {
                display: inline;
              }
              @media (min-width: 640px) {
                .content-wrapper .content-title-large {
                  font-size: 2.25rem;
                }
                .content-wrapper .content-subtitle {
                  font-size: 1.75rem;
                }
                .content-wrapper .c8 {
                  font-size: 1.5rem;
                }
                .content-wrapper .c11 {
                  font-size: 1.5rem;
                }
              }
            `}</style>
            <div
              className="content-wrapper prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-gray-900
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-gray-800
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-800
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                [&>p:first-child]:text-base [&>p:first-child]:text-gray-700 [&>p:first-child]:mb-6
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ul:my-4 prose-ul:space-y-2
                prose-li:text-gray-700 prose-li:my-2 prose-li:leading-relaxed
                prose-a:text-s prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-s prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: processedHtml ?? "" }}
            />
          </div>
        </div>
      </div>

      <Cta lang={loaderData.lang} />
    </div>
  );
}
