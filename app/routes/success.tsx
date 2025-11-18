import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/success";
import { getLocale } from "@/lib/utils";

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const lang = await getLocale(params.lang, request);

  return {
    lang,
    langCode: params.lang ?? "sr",
  };
}

export default function SuccessPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full">
      <div className="my-32 gap-8 flex flex-col items-center justify-center text-center">
        <CircleCheck size={60} className="text-p" />
        <p className="font-medium text-lg text-pd mx-8">
          Vaša rezervacija je uspešno poslata. Bićete kontaktirani o potvrdi
          rezervacije.
        </p>
        <Link to={`/${loaderData.langCode}`}>
          <Button className="bg-s">Vratite se na početnu</Button>
        </Link>
      </div>
    </div>
  );
}
