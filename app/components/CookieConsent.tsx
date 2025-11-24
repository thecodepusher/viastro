import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import type { BaseLocale } from "@/locales/base-locale";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsent({ lang }: { lang: BaseLocale }) {
  const [showBanner, setShowBanner] = useState(false);
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const langCode =
    pathParts[0] === "sr" || pathParts[0] === "en" || pathParts[0] === "ru"
      ? pathParts[0]
      : "sr";
  const privacyPolicyUrl = `/${langCode}/privacy-policy`;

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);

    if (typeof window !== "undefined" && window.dataLayer) {
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      } else {
        window.dataLayer.push({
          event: "consent_update",
          analytics_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      }

      if (
        !document.querySelector('script[src*="googletagmanager.com/gtm.js"]')
      ) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-5FXCXRX2";
        const firstScript = document.getElementsByTagName("script")[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      }
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center">
      <Card className="w-full max-w-xl shadow-xl border border-gray-200 bg-white">
        <CardContent className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700">
            {lang.cookieConsent}{" "}
            <Link
              to={privacyPolicyUrl}
              className="text-[#FF9B17] hover:underline font-semibold">
              {lang.cookieConsentLink}
            </Link>
            .
          </p>
          <Button
            className="cursor-pointer"
            aria-label={lang.cookieConsentAction}
            onClick={handleAccept}>
            {lang.cookieConsentAction}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
