import { Building2, ListChecks, Zap, UserRound } from "lucide-react";
import {
  gradientCard,
  iconBadge,
  sectionContainer,
  sectionSubtitle,
  sectionTitle,
  softCard,
} from "./styles";
import type { LongTermRentalCopy } from "./types";

type Props = {
  content: LongTermRentalCopy;
};

export function LongTermAudiences({ content }: Props) {
  return (
    <section className="bg-linear-to-b from-white via-white to-slate-50 py-14">
      <div className={sectionContainer}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-p">
              {content.individualsTitle}
            </p>
            <h2 className={`${sectionTitle} mt-2`}>{content.businessTitle}</h2>
            <p className={sectionSubtitle}>{content.businessSubtitle}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-p shadow-lg shadow-p/10 ring-1 ring-p/10">
            <ListChecks className="size-5" />
            {content.idealTitle}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className={`${gradientCard} lg:col-span-1`}>
            <div className="h-full space-y-4 bg-white/60 p-6 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className={iconBadge}>
                  <UserRound className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-p">
                    {content.tabIndividual}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {content.individualsTitle}
                  </p>
                </div>
              </div>
              <p className="text-base text-gray-700">
                {content.individualsDescription}
              </p>
              <ul className="space-y-2">
                {content.individualsBullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Zap className="size-5 text-p" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className={`${softCard} border border-p/15`}>
              <div className="flex items-center gap-3 px-5 pt-5">
                <div className={iconBadge}>
                  <Building2 className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-p">
                    {content.tabBusiness}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {content.businessSubtitle}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                {content.businessItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 min-w-9 min-h-9 items-center justify-center rounded-full bg-p/10 text-sm font-bold text-p">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${softCard} bg-white`}>
              <div className="flex flex-wrap items-center gap-3 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-p/10 text-p">
                  <ListChecks className="size-5" />
                </div>
                <p className="text-base font-semibold text-gray-900">
                  {content.idealTitle}
                </p>
              </div>
              <div className="grid gap-3 border-t border-gray-100 p-5 sm:grid-cols-2">
                {content.idealItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-slate-100">
                    <Zap className="size-5 text-p" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
