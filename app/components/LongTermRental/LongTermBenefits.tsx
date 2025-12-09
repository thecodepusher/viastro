import { CheckCircle2, Zap } from "lucide-react";
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
    <section className="bg-white py-12 sm:py-16">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-p/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-p">
            <Zap className="size-5" />
            {content.benefitsTitle}
          </div>
          <h2 className={`${sectionTitle} mt-4`}>{content.benefitsTitle}</h2>
          <p className={sectionSubtitle}>{content.benefitsIntro}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.benefitsItems.map((item) => (
            <div key={item} className={softCard}>
              <div className="flex items-start gap-3 p-5">
                <div className={iconBadge}>
                  <CheckCircle2 className="size-5" />
                </div>
                <p className="text-base font-semibold text-gray-900 leading-relaxed">
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
