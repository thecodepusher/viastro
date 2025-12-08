import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { langCookie } from "./prefs-cookie";
import { replace } from "react-router";
import { en } from "@/locales/en";
import { sr } from "@/locales/sr";
import { ru } from "@/locales/ru";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLocale(
  paramsLang: string | undefined,
  request: Request
) {
  if (!paramsLang) {
    const acceptLanguage = request.headers
      .get("Accept-Language")
      ?.split(";")[0]
      ?.split(",")[0];

    const url = new URL(request.url);

    let returnPath = url.pathname;

    if (
      acceptLanguage == "sr" ||
      acceptLanguage == "en" ||
      acceptLanguage == "ru"
    ) {
      if (returnPath == "/") {
        throw replace(`/${acceptLanguage}`);
      }
      throw replace(`/${acceptLanguage}${url.pathname}`);
    }

    const cookieHeader = request.headers.get("Cookie");

    const lgCookie = (await langCookie.parse(cookieHeader)) || {};

    if (lgCookie.lang) {
      if (returnPath == "/") {
        throw replace(`/${lgCookie.lang}`);
      }
      throw replace(`/${lgCookie.lang}${url.pathname}`);
    }

    if (returnPath == "/") {
      throw replace(`/sr`);
    }

    throw replace(`/sr${url.pathname}`);
  }

  let lang = sr;

  if (paramsLang) {
    switch (paramsLang) {
      case "sr":
        lang = sr;
        break;
      case "en":
        lang = en;
        break;
      case "ru":
        lang = ru;
        break;
    }
  }

  return lang;
}

/**
 * Gets the database API URL from environment variables
 * Falls back to default URL if not set
 */
export function getDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL ||
    (typeof import.meta !== "undefined" ? import.meta.env?.DATABASE_URL : undefined) ||
    "https://rentacar-manager.com/client/viastro/api/"
  );
}
