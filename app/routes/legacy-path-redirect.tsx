import { redirect } from "react-router";
import { getLegacyRedirectPath } from "@/lib/paths";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  const redirectPath = getLegacyRedirectPath(pathname);

  if (!redirectPath) {
    throw new Response("Not Found", { status: 404 });
  }

  return redirect(`${redirectPath}${url.search}`, { status: 301 });
}
