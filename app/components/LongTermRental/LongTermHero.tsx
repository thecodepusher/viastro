import { ArrowRight, CarFront, Clock3, ShieldCheck, Zap } from "lucide-react";
import { iconBadge, gradientCard, pill, sectionContainer } from "./styles";
import type { LongTermRentalCopy } from "./types";
import { FeatureTile } from "./FeatureTile";

type Props = {
  content: LongTermRentalCopy;
};

const gradientBg =
  "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(91,33,182,0.10),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.18),transparent_28%)]";

export function LongTermHero({ content }: Props) {
  const featureTags = [
    content.benefitsItems[0],
    content.benefitsItems[1],
    content.benefitsItems[3],
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-p/10 via-white to-white pb-16 pt-20">
      <div className={gradientBg} />
      <div className={sectionContainer}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-white shadow-lg shadow-p/10 ring-1 ring-gray-100 px-3 py-2 text-sm font-semibold text-p">
              <Zap className="size-5" />
              {content.heroSubtitle}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              {content.heroTitle}
            </h1>
            <p className="text-lg leading-relaxed text-gray-700">
              {content.heroDescription}
            </p>
            <div className="space-y-3 rounded-2xl border border-p/10 bg-white/90 p-5 shadow-lg shadow-p/10 backdrop-blur">
              <div className="flex items-center gap-2 text-p font-semibold">
                <ShieldCheck className="size-5" />
                <span>{content.heroHighlight}</span>
              </div>
              <p className="text-base text-gray-700">
                {content.heroHighlightSupport}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {featureTags.map((item) => (
                <span key={item} className={pill}>
                  <ArrowRight className="size-5" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className={gradientCard}>
              <div className="relative h-full overflow-hidden rounded-3xl bg-linear-to-b from-white via-white to-p/10 p-7">
                <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-p/10 blur-3xl" />
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className={iconBadge}>
                      <CarFront className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-p">
                        24/7
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {content.benefitsItems[5]}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-p/10">
                    <div className="flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-xl bg-p/10 text-p">
                      <Zap className="size-5" />
                    </div>
                    <p className="text-sm text-gray-700">
                      {content.benefitsIntro}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
