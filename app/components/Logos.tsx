import type { BaseLocale } from "@/locales/base-locale";

export default function Logos(props: { lang: BaseLocale }) {
  return (
    <div className="bg-pd border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <h2 className="font-display text-center text-base sm:text-lg font-semibold tracking-wide text-white/90">
          {props.lang.vehiclesOffer}
        </h2>
      </div>
    </div>
  );
}
