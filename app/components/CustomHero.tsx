import { Zap } from "lucide-react";
import { useLocation } from "react-router";

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
  primaryHref = "/reservation",
  secondaryHref = "/contact",
  fastTitle = "Brza rezervacija",
  fastSubtitle = "Start za 60s",
}: Props) {
  const location = useLocation();
  const hideSecondary = location.pathname.includes("/contact");
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] sm:h-[60vh] w-full overflow-hidden bg-linear-to-br from-black/60 via-black/50 to-black/30">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/long-term-rental-hero-2.jpg)" }}
          aria-hidden
        />

        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-p/25 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-s/25 blur-3xl" />

        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-b from-p/25 via-p/10 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center pt-12 sm:pt-16">
          <div className={heroContainer}>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div className="max-w-3xl space-y-6 text-white">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 border border-white/15 shadow-2xl sm:px-3 sm:py-2 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl animate-fade-in-up">
                  <Zap className="size-6 min-w-6 min-h-6" />
                  {title}
                </div>
                <p className="text-lg sm:text-xl leading-relaxed text-white/95 drop-shadow-md animate-fade-in-up-delay">
                  {description}
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 border border-white/15 shadow-2xl backdrop-blur-2xl p-5 sm:p-6 space-y-4 animate-fade-in-up-delay">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-p/90 text-white shadow-lg shadow-p/40">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-white/80 font-semibold">
                      {fastTitle}
                    </p>
                    <p className="text-base font-semibold text-white">
                      {fastSubtitle}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2">
                  <a
                    href={primaryHref}
                    className="w-full rounded-2xl bg-s text-white font-semibold py-3 px-4 text-center shadow-md transition-all hover:bg-s/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-s/70 focus:ring-offset-black/30">
                    {primaryLabel}
                  </a>
                  {!hideSecondary && (
                    <a
                      href={secondaryHref}
                      className="rounded-2xl bg-transparent text-white font-semibold py-3 px-4 text-center ring-1 ring-white/30 hover:bg-white/10 transition">
                      {secondaryLabel}
                    </a>
                  )}
                </div>
                <p className="text-xs text-white/70">{helperText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
