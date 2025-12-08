import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useLocation,
} from "react-router";

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

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "icon", type: "image/svg", href: "/favicon.svg" },
  { rel: "icon", type: "image/svg", href: "/favicon.svg" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
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
  const langForCookie = langData?.lang ?? sr;

  return (
    <html lang="sr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF9B17" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="Serbian" />
        <meta httpEquiv="content-language" content="sr, en, ru" />
        <Meta />
        <Links />
        <HreflangLinks />
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
              
              if (cookieConsent === 'true') {
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-5FXCXRX2');
              }
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FXCXRX2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
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

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      {langData && <Header lang={langData.lang} langCode={langData.langCode} />}
      <main className="pt-16 p-4 container mx-auto">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
      {langData && <Footer lang={langData.lang} langCode={langData.langCode} />}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryContent error={error} />;
}
