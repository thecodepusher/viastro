import { useNavigate } from "react-router";
import { getLocale } from "@/lib/utils";
import { type ApiAllModelsResponse } from "@/lib/api-cars";
import type { Route } from "./+types/cars-page";
import Cars from "@/components/Cars";
import Logos from "@/components/Logos";
import { prefs } from "@/lib/prefs-cookie";

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};

  delete cookie.pickUpDate;
  delete cookie.pickUpTime;
  delete cookie.dropOffDate;
  delete cookie.dropOffTime;

  const res = await fetch("https://rentacar-manager.com/client/viastro/api/", {
    method: "POST",
    body: JSON.stringify({
      action: "get_all_models",
    }),
    headers: { API_KEY: "f13e62b2-39e3-4d89-a1d1-bf9b27e0c121" },
  });

  const apiResponse: ApiAllModelsResponse = await res.json();

  const data = {
    langCode: params.lang ?? "sr",
    lang,
    message: context.VALUE_FROM_EXPRESS,
    cars: apiResponse,
  };

  const response = Response.json(data, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });

  return response as unknown as typeof data;
}

export async function action() {}
export function meta({}: Route.MetaArgs) {}

export default function CarsPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="mt-18">
        <Logos lang={loaderData.lang} />
        <Cars
          onSelect={() => {
            navigate(`/${loaderData.langCode}/reservation`);
          }}
          lang={loaderData.lang}
          langCode={loaderData.langCode}
          cars={loaderData.cars}
        />
      </div>
    </div>
  );
}
