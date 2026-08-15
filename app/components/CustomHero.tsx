import { Zap } from "lucide-react";
import { useLocation, useParams } from "react-router";
import { publicPaths } from "@/lib/paths";

type Props = {
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  helperText?: string;
  primaryHref?: string;
  secondaryHref?: string;
  fastTitle?: string;
  fastSubtitle?: string;
};

const heroContainer = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export function CustomHero({
  title,
  description,
  primaryLabel = "Nova rezervacija",
  secondaryLabel = "Kontaktiraj nas",
  helperText = "Rezervacija je jednostavna — možete je započeti odmah i dovršiti kasnije.",
  primaryHref,
  secondaryHref,
  fastTitle = "Brza rezervacija",
  fastSubtitle = "Start za 60s",
}: Props) {
  const location = useLocation();
  const { lang = "sr" } = useParams();
  const resolvedPrimaryHref = primaryHref ?? publicPaths.reservation(lang);
  const resolvedSecondaryHref = secondaryHref ?? publicPaths.contact(lang);
  const hideSecondary = location.pathname.includes("/kontakt");
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[70vh] sm:min-h-[60vh] w-full overflow-hidden">
        <img
          src="/long-term-rental-hero-2.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          {...({
            fetchPriority: "high",
          } as React.ImgHTMLAttributes<HTMLImageElement>)}
          loading="eager"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-linear-to-r from-pd/80 via-pd/65 to-pd/40" />
        <div className="absolute inset-0 bg-linear-to-t from-pd/50 via-transparent to-pd/20" />

        <div className="relative z-10 min-h-full flex flex-col justify-center pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className={heroContainer}>
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-center">
              <div className="max-w-3xl space-y-5 text-white">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-p animate-fade-in-up">
                  Viastro
                </p>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up">
                  {title}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-white/85 animate-fade-in-up-delay max-w-2xl">
                  {description}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 sm:p-6 space-y-4 animate-fade-in-up-delay">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-p text-pd">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                      {fastTitle}
                    </p>
                    <p className="text-base font-semibold text-white">
                      {fastSubtitle}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2">
                  <a
                    href={resolvedPrimaryHref}
                    className="w-full rounded-lg bg-p text-pd font-semibold py-3 px-4 text-center transition-colors hover:bg-p/90 focus:outline-none focus:ring-2 focus:ring-p/60">
                    {primaryLabel}
                  </a>
                  {!hideSecondary && (
                    <a
                      href={resolvedSecondaryHref}
                      className="rounded-lg bg-transparent text-white font-semibold py-3 px-4 text-center ring-1 ring-white/25 hover:bg-white/10 transition">
                      {secondaryLabel}
                    </a>
                  )}
                </div>
                <p className="text-xs text-white/55">{helperText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
