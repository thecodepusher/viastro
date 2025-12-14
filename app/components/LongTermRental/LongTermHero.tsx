import { ArrowRight, CarFront, Clock3, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";
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

const heroImages = [
  "/long-term-rental-hero-1.webp",
  "/long-term-rental-hero-2.webp",
];

export function LongTermHero({ content }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const featureTags = [
    content.benefitsItems[0],
    content.benefitsItems[1],
    content.benefitsItems[3],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[66vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}>
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-5000 ease-out ${
                  index === currentImageIndex ? "scale-110" : "scale-100"
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
              <div className="absolute inset-0 bg-linear-to-br from-p/20 via-p/10 to-transparent" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-auto">
          <div className={heroContainer}>
            <div className="flex h-full items-end">
              <div className="max-w-2xl space-y-6 text-white">
                <div className="inline-flex items-center gap-3 rounded-full bg-transparent shadow-p/10 ring-1 ring-white/20 sm:px-2 sm:py-2 px-8 py-2 text-sm font-semibold text-p backdrop-blur-xs">
                  <Zap className="size-6 min-w-6 min-h-6" />
                  {content.heroSubtitle}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
                  {content.heroTitle}
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed text-white/90 drop-shadow-md">
                  {content.heroDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white pb-16">
        <div className={sectionContainer}>
          <div className="mb-8 flex flex-wrap gap-3">
            {featureTags.map((item) => (
              <span key={item} className={pill}>
                <ArrowRight className="size-5" />
                {item}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-p/10 bg-white p-5 shadow-lg shadow-p/10">
              <div className="flex items-center gap-2 text-p font-semibold">
                <ShieldCheck className="size-5" />
                <span>{content.heroHighlight}</span>
              </div>
              <p className="text-base text-gray-700">
                {content.heroHighlightSupport}
              </p>
            </div>

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
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-p/10 bg-white p-5 shadow-lg shadow-p/10 sm:col-span-2 lg:col-span-1">
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
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-p/10">
                <div className="flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-xl bg-p/10 text-p">
                  <Zap className="size-5" />
                </div>
                <p className="text-sm text-gray-700">{content.benefitsIntro}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
