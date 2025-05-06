import { langCookie } from "@/lib/prefs-cookie";
import type { Route } from "./+types/select-lang";
import { replace } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const lang = formData.get("lang");
  const loc = (formData.get("loc") as string) ?? "/";

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await langCookie.parse(cookieHeader)) || {};

  const paths = loc.split("/");
  let returnLoc = "";
  for (const path of paths) {
    if (path == "en" || path == "sr" || path == "ru") {
      continue;
    }
    returnLoc += path + "/";
  }
  returnLoc = returnLoc.substring(0, returnLoc.length - 1);

  cookie.lang = lang;

  return replace(`/${lang}${returnLoc}`, {
    headers: {
      "Set-Cookie": await langCookie.serialize(cookie),
    },
  });
}
