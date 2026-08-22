import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import { Home, TriangleAlert } from "lucide-react";
import { Button } from "./components/ui/button";

import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "./components/ui/sonner";
import CookieConsent from "./components/CookieConsent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { en } from "@/locales/en";
import { sr } from "@/locales/sr";
import { ru } from "@/locales/ru";
import HreflangLinks from "./components/ui/HreflangLinks";
import {
  GA_MEASUREMENT_ID,
  canTrackAnalytics,
  trackPageView,
} from "@/lib/analytics";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "preconnect", href: "https://www.wspay.info" },
  { rel: "preconnect", href: "https://i.ytimg.com" },
  { rel: "icon", type: "image/svg", href: "/favicon.svg" },
  { rel: "icon", type: "image/svg", href: "/favicon.svg" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const location = useLocation();

  const matchWithData = matches
    .slice()
    .reverse()
    .find((match) => {
      const data = match.data;
      return (
        data && typeof data === "object" && "lang" in data && "langCode" in data
      );
    });

  const langData = matchWithData?.data as
    | { lang: any; langCode: string }
    | undefined;
  const langForCookie = langData?.lang ?? sr;
  const langCode = ["sr", "en", "ru"].includes(langData?.langCode ?? "")
    ? langData!.langCode
    : "sr";
  const isPrivateRoute =
    /\/(rezervacija|uspesno|wspay)(?:\/|$)/.test(location.pathname) ||
    location.pathname === "/izbor-jezika";
  const robots = isPrivateRoute ? "noindex, nofollow" : "index, follow";

  useEffect(() => {
    const fontLink = document.querySelector(
      'link[href*="fonts.googleapis.com/css2"]',
    ) as HTMLLinkElement;
    if (fontLink) {
      fontLink.media = "all";
    }
  }, []);

  useEffect(() => {
    if (!canTrackAnalytics()) {
      return;
    }

    trackPageView(location.pathname, location.search);
  }, [location.pathname, location.search]);

  return (
    <html lang={langCode}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0D1218" />
        <meta name="robots" content={robots} />
        <meta name="googlebot" content={robots} />
        <meta httpEquiv="content-language" content={langCode} />
        <Meta />
        <Links />
        <HreflangLinks />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap"
          media="print"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              const cookieConsent = localStorage.getItem('cookie_consent');
              const consentMode = cookieConsent === 'true' ? 'granted' : 'denied';
              
              gtag('consent', 'default', {
                'analytics_storage': consentMode,
                'ad_storage': consentMode,
                'ad_user_data': consentMode,
                'ad_personalization': consentMode,
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted'
              });
              
              var isProductionHost = location.hostname === 'viastro.rs' || location.hostname === 'www.viastro.rs';
              if (cookieConsent === 'true' && isProductionHost) {
                var gaScript = document.createElement('script');
                gaScript.async = true;
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                document.head.appendChild(gaScript);
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
        <CookieConsent lang={langForCookie} />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const matches = useMatches();

  const matchWithData = matches
    .slice()
    .reverse()
    .find((match) => {
      const data = match.data;
      return (
        data && typeof data === "object" && "lang" in data && "langCode" in data
      );
    });

  const langData = matchWithData?.data as
    | { lang: any; langCode: string }
    | undefined;

  return (
    <>
      {langData && <Header lang={langData.lang} langCode={langData.langCode} />}
      <Outlet />
      {langData && <Footer lang={langData.lang} langCode={langData.langCode} />}
    </>
  );
}

function ErrorBoundaryContent({ error }: { error: unknown }) {
  const location = useLocation();
  const matches = useMatches();

  const matchWithData = matches
    .slice()
    .reverse()
    .find((match) => {
      const data = match.data;
      return (
        data && typeof data === "object" && "lang" in data && "langCode" in data
      );
    });

  let langData = matchWithData?.data as
    | { lang: any; langCode: string }
    | undefined;

  if (!langData) {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const langCode =
      pathParts[0] === "sr" || pathParts[0] === "en" || pathParts[0] === "ru"
        ? pathParts[0]
        : "sr";

    let lang = sr;
    switch (langCode) {
      case "en":
        lang = en;
        break;
      case "ru":
        lang = ru;
        break;
      default:
        lang = sr;
    }

    langData = { lang, langCode };
  }

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <Header lang={langData.lang} langCode={langData.langCode} />
        <NotFound />
        <Footer lang={langData.lang} langCode={langData.langCode} />
      </>
    );
  }

  let devDetails: string | undefined;
  let stack: string | undefined;
  if (import.meta.env.DEV && error instanceof Error) {
    devDetails = error.message;
    stack = error.stack;
  }

  return (
    <>
      <Header lang={langData.lang} langCode={langData.langCode} />
      <main className="w-full flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <TriangleAlert
                size={120}
                className="text-p opacity-20 absolute inset-0 m-auto"
              />
              <h1 className="text-9xl sm:text-[12rem] font-extrabold text-p relative z-10">
                {isRouteErrorResponse(error) ? error.status : "500"}
              </h1>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {langData.lang.errorTitle}
          </h2>

          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-md mx-auto">
            {langData.lang.errorMessage}
          </p>

          <Link to={`/${langData.langCode}`}>
            <Button
              size="lg"
              className="bg-s hover:bg-s/90 text-white px-8 py-6 text-lg font-semibold cursor-pointer">
              <Home className="mr-2 h-5 w-5" />
              {langData.lang.errorAction}
            </Button>
          </Link>

          {devDetails && (
            <details className="mt-12 text-left rounded-lg border border-gray-200 bg-gray-50 p-4">
              <summary className="cursor-pointer font-medium text-gray-700">
                {devDetails}
              </summary>
              {stack && (
                <pre className="mt-4 w-full overflow-x-auto text-xs text-gray-600">
                  <code>{stack}</code>
                </pre>
              )}
            </details>
          )}
        </div>
      </main>
      <Footer lang={langData.lang} langCode={langData.langCode} />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryContent error={error} />;
}
