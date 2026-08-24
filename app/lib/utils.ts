import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { langCookie } from "./prefs-cookie";
import { redirect } from "react-router";
import { en } from "@/locales/en";
import { sr } from "@/locales/sr";
import { ru } from "@/locales/ru";
import { isSupportedLocale } from "@/lib/paths";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLocale(
  paramsLang: string | undefined,
  request: Request,
) {
  const url = new URL(request.url);

  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    throw redirect(`${url.pathname.replace(/\/+$/, "")}${url.search}`, 301);
  }

  if (!paramsLang) {
    const cookieHeader = request.headers.get("Cookie");
    const lgCookie = (await langCookie.parse(cookieHeader)) || {};
    const cookieLang = isSupportedLocale(lgCookie.lang) ? lgCookie.lang : null;
    const prefixedPath =
      url.pathname === "/"
        ? `/${cookieLang ?? "sr"}`
        : `/${cookieLang ?? "sr"}${url.pathname}`;

    throw redirect(`${prefixedPath}${url.search}`, cookieLang ? 302 : 301);
  }

  if (!isSupportedLocale(paramsLang)) {
    throw new Response("Not Found", { status: 404 });
  }

  switch (paramsLang) {
    case "en":
      return en;
    case "ru":
      return ru;
    default:
      return sr;
  }
}

export function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.DATABASE_URL
      : undefined) ||
    "https://rentacar-manager.com/client/viastro/api/";

  // Trailing slash is required: without it the API 301-redirects and drops API_KEY,
  // then returns HTML ("API KEY not provided") which breaks res.json().
  return url.endsWith("/") ? url : `${url}/`;
}
