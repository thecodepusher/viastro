import type { BaseLocale } from "@/locales/base-locale";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function LandingPromo(props: {
  lang: BaseLocale;
  langCode: string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-16 max-w-5xl mx-auto mb-12">
      <div>
        <img src="/landing_airport.png" />
      </div>
      <div className="flex flex-col gap-3 mt-8 px-2">
        <p className="text-2xl font-bold text-s text-center">
          {props.lang.lpTitle}
        </p>
        <p className="text-xl font-medium text-center">
          {props.lang.lpSubTitle}
        </p>
        <p className="mt-8 text-center">{props.lang.lpParagraph}</p>

        <Link to={`${props.langCode}/reservation`}>
          <Button className="w-full mt-8 bg-s">{props.lang.lpAction}</Button>
        </Link>
      </div>
    </div>
  );
}
