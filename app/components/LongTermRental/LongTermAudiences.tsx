import { BadgeCheck, Building2, CheckCircle2, ListChecks, UserRound } from "lucide-react";
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
    <section className="bg-surface section-pattern py-6 sm:py-14">
      <div className={sectionContainer}>
        <div className="flex flex-col gap-3 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-p/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-p">
              <BadgeCheck className="size-7 shrink-0 sm:size-5" />
              {content.individualsTitle}
            </div>
            <h2 className={`${sectionTitle} mt-2`}>{content.businessTitle}</h2>
            <p className={sectionSubtitle}>{content.businessSubtitle}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-p shadow-lg shadow-p/10 ring-1 ring-p/10">
            <ListChecks className="size-5" />
            {content.idealTitle}
          </div>
        </div>

        <div className="mt-5 sm:mt-8 grid gap-4 sm:gap-6 lg:grid-cols-3">
          <div className={`${gradientCard} lg:col-span-1`}>
            <div className="h-full space-y-4 bg-pl/30 p-4 sm:p-6 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className={iconBadge}>
                  <UserRound className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-p">
                    {content.tabIndividual}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {content.individualsTitle}
                  </p>
                </div>
              </div>
              <p className="text-base text-muted-foreground">
                {content.individualsDescription}
              </p>
              <ul className="space-y-2">
                {content.individualsBullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="size-5 shrink-0 text-p" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className={`${softCard} border border-p/15`}>
              <div className="flex items-center gap-3 px-3 pt-3 sm:px-5 sm:pt-5">
                <div className={iconBadge}>
                  <Building2 className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-p">
                    {content.tabBusiness}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {content.businessSubtitle}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-3 sm:p-5 sm:grid-cols-2">
                {content.businessItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-pl/30 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-p/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 min-w-9 min-h-9 items-center justify-center rounded-full bg-p/10 text-sm font-bold text-p">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={softCard}>
              <div className="flex flex-wrap items-center gap-3 p-3 sm:p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-p/10 text-p">
                  <ListChecks className="size-5" />
                </div>
                <p className="text-base font-semibold text-foreground">
                  {content.idealTitle}
                </p>
              </div>
              <div className="grid gap-3 border-t border-border/70 p-3 sm:p-5 sm:grid-cols-2">
                {content.idealItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-pl/40 px-4 py-3 text-sm font-semibold text-foreground ring-1 ring-border/70">
                    <CheckCircle2 className="size-5 shrink-0 text-p" />
                    <span>{item}</span>
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
