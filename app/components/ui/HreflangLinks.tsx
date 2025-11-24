import { useLocation } from "react-router";

const HreflangLinks = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let pathWithoutLang = pathname.replace(/^\/(sr|en|ru)(\/|$)/, "/") || "/";
  if (pathWithoutLang !== "/" && !pathWithoutLang.startsWith("/")) {
    pathWithoutLang = "/" + pathWithoutLang;
  }

  if (pathWithoutLang === "/") {
    pathWithoutLang = "";
  }

  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "https://viastro.rs";

  return (
    <>
      <link
        rel="alternate"
        hrefLang="sr"
        href={`${baseUrl}/sr${pathWithoutLang}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${baseUrl}/en${pathWithoutLang}`}
      />
      <link
        rel="alternate"
        hrefLang="ru"
        href={`${baseUrl}/ru${pathWithoutLang}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/sr${pathWithoutLang}`}
      />
    </>
  );
};

export default HreflangLinks;
