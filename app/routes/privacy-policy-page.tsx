import { privacyPolicy } from "@/lib/data";
import { getLocale } from "@/lib/utils";
import type { Route } from "./+types/privacy-policy-page";
import { prefs } from "@/lib/prefs-cookie";
import { getBaseUrl, generateOpenGraphMeta } from "@/lib/seo";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;
  delete cookie.selectedCarId;

  const baseUrl = getBaseUrl(request);

  const data = {
    langCode: params.lang ?? "sr",
    lang,
    usloviNajma: privacyPolicy,
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
    title: "Privacy Policy | Viastro Rent a Car",
    description:
      "Read Viastro's privacy policy to understand how we collect, use, and protect your personal information.",
    url: `/${data.langCode || "sr"}/privacy-policy`,
    baseUrl,
    keywords: "privacy policy, data protection, viastro rent a car",
    imageAlt: "Viastro Privacy Policy",
  });
}

export default function PrivacyPolicyPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="w-full">
      <div className="mt-16 prose prose-lg max-w-4xl mx-auto p-4 prose-headings:text-gray-800 prose-p:text-gray-700">
        <div
          dangerouslySetInnerHTML={{ __html: loaderData.usloviNajma ?? "" }}
        />
      </div>
    </div>
  );
}
