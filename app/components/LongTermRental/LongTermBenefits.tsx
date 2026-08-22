import { BadgeCheck, CheckCircle2 } from "lucide-react";
import {
  sectionContainer,
  sectionTitle,
  sectionSubtitle,
  softCard,
  iconBadge,
} from "./styles";
import type { LongTermRentalCopy } from "./types";

type Props = {
  content: LongTermRentalCopy;
};

export function LongTermBenefits({ content }: Props) {
  return (
    <section className="bg-surface section-pattern py-6 sm:py-16">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-p/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-p">
            <BadgeCheck className="size-7 shrink-0 sm:size-5" />
            {content.benefitsTitle}
          </div>
          <h2 className={`${sectionTitle} mt-2 sm:mt-4`}>{content.benefitsTitle}</h2>
          <p className={sectionSubtitle}>{content.benefitsIntro}</p>
        </div>

        <div className="mt-5 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.benefitsItems.map((item) => (
            <div key={item} className={softCard}>
              <div className="flex items-start gap-3 p-3 sm:p-5">
                <div className={iconBadge}>
                  <CheckCircle2 className="size-5" />
                </div>
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
