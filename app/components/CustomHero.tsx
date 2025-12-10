import { Zap } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

const heroContainer = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export function CustomHero({ title, description }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[40vh] w-full overflow-hidden bg-linear-to-br from-p via-p to-p/90">
        <div className="absolute inset-0 opacity-[0.15]" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/5" />

        <div className="relative z-10 h-full flex flex-col justify-center pt-18">
          <div className={heroContainer}>
            <div className="flex h-full items-center">
              <div className="max-w-2xl space-y-6 text-white">
                <div className="inline-flex items-center gap-3 rounded-full bg-s/80 shadow-lg shadow-s/30 ring-1 ring-white/20 sm:px-3 sm:py-2 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl animate-fade-in-up">
                  <Zap className="size-6 min-w-6 min-h-6" />
                  {title}
                </div>
                <p className="text-lg sm:text-xl leading-relaxed text-white/90 drop-shadow-md animate-fade-in-up-delay">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
