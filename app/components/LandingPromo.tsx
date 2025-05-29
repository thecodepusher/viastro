import type { BaseLocale } from "@/locales/base-locale";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function LandingPromo(props: { lang: BaseLocale }) {
  return (
    <div className="flex flex-col md:flex-row gap-16 max-w-5xl mx-auto mb-12">
      <div>
        <img src="/landing_airport.png" />
      </div>
      <div className="flex flex-col gap-3 mt-8 px-2">
        <p className="text-2xl font-bold text-s text-center">
          Potreban Vam je rent a car nakon sletanja na aerodrom?
        </p>
        <p className="text-xl font-medium text-center">Automobil Vas čeka!</p>
        <p className="mt-8 text-center">
          Pored naše ponude pouzdanih i kvalitetnih automobila po super cenama,
          nudimo uslugu dostave vozila na aerodrom.
        </p>

        <Button className="w-full mt-8 bg-s">
          <Link to="/reservation">Rezerviši vozilo</Link>
        </Button>
      </div>
    </div>
  );
}
