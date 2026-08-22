import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import type { BaseLocale } from "@/locales/base-locale";
import { Button } from "@/components/ui/button";
import { publicPaths } from "@/lib/paths";
import { loadGoogleAnalytics, trackPageView } from "@/lib/analytics";

export default function CookieConsent({ lang }: { lang: BaseLocale }) {
  const [showBanner, setShowBanner] = useState(false);
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const langCode =
    pathParts[0] === "sr" || pathParts[0] === "en" || pathParts[0] === "ru"
      ? pathParts[0]
      : "sr";
  const privacyPolicyUrl = publicPaths.privacyPolicy(langCode);

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

      loadGoogleAnalytics();
      trackPageView(location.pathname, location.search);
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center">
      <Card className="w-full max-w-xl shadow-xl border border-border bg-card">
        <CardContent className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {lang.cookieConsent}{" "}
            <Link
              to={privacyPolicyUrl}
              className="text-p hover:underline font-semibold">
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
