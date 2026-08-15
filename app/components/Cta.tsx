import type { BaseLocale } from "@/locales/base-locale";
import { Link } from "react-router";
import { publicPaths } from "@/lib/paths";

export default function Cta(props: { lang: BaseLocale; langCode?: string }) {
  return (
    <section className="relative overflow-hidden bg-s">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-p/20 via-transparent to-transparent"
      />
      <div className="relative px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            {props.lang.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-white/70 text-pretty">
            {props.lang.ctaSubTitle}
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Link
              to={publicPaths.reservation(props.langCode)}
              className="rounded-lg px-6 py-3 bg-p text-pd font-semibold transition-colors hover:bg-p/90">
              {props.lang.ctaAction}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
