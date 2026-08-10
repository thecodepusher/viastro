import { useState } from "react";
import { Star } from "lucide-react";
import type { BaseLocale } from "@/locales/base-locale";
import GoogleIcon from "@/components/icons/GoogleIcon";

interface TrustedByProps {
  lang: BaseLocale;
}

export default function TrustedBy({ lang }: TrustedByProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [clickedStar, setClickedStar] = useState<number>(5);
  const googleReviewUrl =
    "https://www.google.com/search?sca_esv=d8140a1b87a5a1ad&sxsrf=AE3TifNIJxgaAwkyEjQdA9Z3coDIi46f_w:1763497731580&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EwXlu_kD1rHLBOBegYXvgZeCdvy_i_7s-8PgfXAXv86rrCXMNIyzkOJFs30H62ULlytirEkmAfesauURE4TUY0YDIA1b2QW8zl8kWuTIhh8yvoz-pg%3D%3D&q=Viastro+Rent+a+Car+Reviews&sa=X&ved=2ahUKEwi-kOn-xPyQAxVSSPEDHfGLG_wQ0bkNegQIIRAE&biw=1920&bih=959&dpr=1#lrd=0x475a6f574a897119:0x2b24d0d33650d401,3,,,,";

  const stats = [
    { id: 1, name: "", value: lang.fullInsurance },
    { id: 2, name: "", value: lang.noHiddenCosts },
    { id: 3, name: lang.satisfiedUsersTitle, value: lang.satisfiedUsers },
    { id: 4, name: lang.yearsOfExperienceTitle, value: lang.yearsOfExperience },
  ];

  const handleStarClick = (starIndex: number) => {
    setClickedStar(starIndex);
    window.open(googleReviewUrl, "_blank");
  };

  const getStarFill = (starIndex: number) => {
    const rating = hoveredStar !== null ? hoveredStar : clickedStar;
    return starIndex <= rating;
  };

  return (
    <section className="relative overflow-hidden bg-s py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-p/20 via-transparent to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-center">
            {lang.whyChoose}
          </h3>
          <dl className="mt-10 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col rounded-xl border border-white/10 bg-white/5 px-4 py-6 sm:p-8 text-center backdrop-blur-sm transition-colors hover:border-p/30 hover:bg-white/8">
                <dt className="text-xs sm:text-sm font-medium text-white/60">
                  {stat.name}
                </dt>
                <dd className="order-first font-display text-lg sm:text-2xl font-bold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
            <div
              className="flex items-center gap-2 mb-3 cursor-pointer"
              onClick={() => window.open(googleReviewUrl, "_blank")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(googleReviewUrl, "_blank");
                }
              }}>
              <GoogleIcon />
              <span className="text-base font-semibold text-white">
                Google Review
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-105"
                  onMouseEnter={() => setHoveredStar(starIndex)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() => handleStarClick(starIndex)}
                  aria-label={`Rate ${starIndex} out of 5 stars`}>
                  <Star
                    className={`w-6 h-6 transition-colors cursor-pointer ${
                      getStarFill(starIndex)
                        ? "fill-p text-p"
                        : "fill-white/20 text-white/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
