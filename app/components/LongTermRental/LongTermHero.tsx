import { ArrowRight, CarFront, Clock3, Package, ShieldCheck, Wallet } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import {
  iconBadge,
  gradientCard,
  pill,
  heroContainer,
  sectionContainer,
} from "./styles";
import type { LongTermRentalCopy } from "./types";
import { FeatureTile } from "./FeatureTile";

type Props = {
  content: LongTermRentalCopy;
};

export function LongTermHero({ content }: Props) {
  const featureTags = [
    content.benefitsItems[0],
    content.benefitsItems[1],
    content.benefitsItems[3],
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[66vh] w-full overflow-hidden">
        <HeroCarousel />

        <div className="relative z-10 h-auto">
          <div className={heroContainer}>
            <div className="flex h-full items-end">
              <div className="max-w-2xl space-y-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-md bg-white/10 ring-1 ring-white/20 px-3 py-1.5 text-sm font-semibold text-p backdrop-blur-sm">
                  <Package className="size-4" />
                  {content.heroSubtitle}
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  {content.heroTitle}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-white/85 max-w-xl">
                  {content.heroDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-surface pb-8 sm:pb-16">
        <div className={sectionContainer}>
          <div className="mb-4 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            {featureTags.map((item, i) => (
              <span
                key={item}
                className={`${pill} ${i > 1 ? "hidden sm:inline-flex" : ""}`}>
                <ArrowRight className="size-4" />
                {item}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded-xl border border-border/70 bg-card p-5">
              <div className="flex items-center gap-2 text-p font-semibold">
                <ShieldCheck className="size-5" />
                <span>{content.heroHighlight}</span>
              </div>
              <p className="text-base text-muted-foreground">
                {content.heroHighlightSupport}
              </p>
            </div>

            <div className={gradientCard}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-pl/40 p-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className={iconBadge}>
                      <CarFront className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-p">
                        24/7
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {content.benefitsItems[5]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-border/70 bg-card p-5 sm:col-span-2 lg:col-span-1">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <FeatureTile
                  icon={<ShieldCheck className="size-5" />}
                  title={content.benefitsItems[2]}
                  highlight
                />
                <FeatureTile
                  icon={<Clock3 className="size-5" />}
                  title={content.heroSubtitle}
                />
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-pl/40 p-4">
                <div className="flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-lg bg-p/15 text-p">
                  <Wallet className="size-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {content.benefitsIntro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
