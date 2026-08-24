import { useLocation } from "react-router";
import { getBaseUrl, getHreflangAlternates } from "@/lib/seo";
import { isNoindexPath } from "@/lib/paths";

const HreflangLinks = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  if (isNoindexPath(pathname)) {
    return null;
  }

  let pathWithoutLang = pathname.replace(/^\/(sr|en|ru)(\/|$)/, "/") || "/";
  if (pathWithoutLang !== "/" && !pathWithoutLang.startsWith("/")) {
    pathWithoutLang = "/" + pathWithoutLang;
  }
  if (pathWithoutLang === "/") {
    pathWithoutLang = "";
  }

  const alternates = getHreflangAlternates(pathWithoutLang, getBaseUrl());

  return (
    <>
      {alternates.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
    </>
  );
};

export default HreflangLinks;
