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
    const url = new URL(request.url);
    let returnPath = url.pathname;

    const cookieHeader = request.headers.get("Cookie");
    const lgCookie = (await langCookie.parse(cookieHeader)) || {};

    if (
      lgCookie.lang &&
      (lgCookie.lang === "sr" ||
        lgCookie.lang === "en" ||
        lgCookie.lang === "ru")
    ) {
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

export function getDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.DATABASE_URL
      : undefined) ||
    "https://rentacar-manager.com/client/viastro/api/"
  );
}
