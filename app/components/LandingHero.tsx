import type { BaseLocale } from "@/locales/base-locale";

export default function LandingHero(props: { lang: BaseLocale }) {
  return (
    <div className="relative bg-gray-800">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30"></div>

      <div className="absolute top-4 left-2 md:left-8 w-16 md:w-24">
        <img className="" src="/viastro_logo_white.png" />
      </div>

      <div className="text-white font-medium text-center rounded-full md:p-4 bg-p shadow absolute bottom-4 left-2 md:left-24 w-32">
        <p>
          već od
          <br />
          30€/dan
        </p>
      </div>

      <img className="mx-auto md:hidden" src="/hero_mobile.png" />
      <img className="mx-auto hidden md:block" src="/hero.png" />

      <p className="absolute top-1/3 md:top-1/2  md:-translate-y-1/2 left-0 right-0 text-lg text-center md:text-3xl text-white">
        Preuzmite vozilo odmah pri sletanju
      </p>
      <h1 className="md:p-4 text-center font-bold absolute mt-4 md:mt-14 top-1/2 left-1/2 -translate-1/2 md:text-3xl text-white">
        RENT A CAR BEOGRAD
      </h1>
    </div>
  );
}
