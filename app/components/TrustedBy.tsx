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
    <div className="bg-pl/20 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h3 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 text-center">
            {lang.whyChoose}
          </h3>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-pl/40 p-8">
                <dt className="text-sm/6 font-semibold text-pd">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 flex flex-col items-center justify-center">
            <div
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => window.open(googleReviewUrl, "_blank")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(googleReviewUrl, "_blank");
                }
              }}>
              <GoogleIcon />
              <span className="text-lg font-semibold text-gray-900">
                Google Review
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredStar(starIndex)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() => handleStarClick(starIndex)}
                  aria-label={`Rate ${starIndex} out of 5 stars`}>
                  <Star
                    className={`w-6 h-6 transition-colors cursor-pointer ${
                      getStarFill(starIndex)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
