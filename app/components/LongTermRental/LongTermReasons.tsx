import { MessageSquare, ShieldCheck } from "lucide-react";
import {
  sectionContainer,
  sectionTitle,
  sectionSubtitle,
  softCard,
} from "./styles";
import type { LongTermRentalCopy } from "./types";

type Props = {
  content: LongTermRentalCopy;
};

export function LongTermReasons({ content }: Props) {
  return (
    <section className="bg-surface py-6 sm:py-14">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-p">
            {content.reasonsTitle}
          </p>
          <h2 className={`${sectionTitle} mt-2`}>{content.reasonsTitle}</h2>
          <p className={sectionSubtitle}>{content.ctaTitle}</p>
        </div>

        <div className="mt-5 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.reasonsItems.map((item) => (
            <div key={item} className={softCard}>
              <div className="flex items-center gap-3 p-3 sm:p-5">
                <div className="flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-xl bg-p/10 text-p">
                  <ShieldCheck className="size-5" />
                </div>
                <p className="text-base font-semibold text-foreground">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 sm:mt-10 overflow-hidden rounded-2xl border border-border/70 bg-card p-4 sm:p-8">
          <div className="flex h-full flex-col items-center gap-4 sm:gap-8 sm:flex-row sm:justify-center">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-md bg-p/10 px-3 py-1.5 text-sm font-semibold text-p">
                <MessageSquare className="size-4" />
                {content.ctaTitle}
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {content.ctaTitle}
              </h3>
              <p className="text-base text-muted-foreground">{content.ctaSubtitle}</p>
            </div>
            <div className="flex w-2xs items-center gap-3 rounded-2xl bg-pl px-4 py-3 sm:px-5 sm:py-4 shadow-md ring-1 ring-p/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-p text-primary-foreground shadow-lg shadow-p/30">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {content.contactPhoneLabel}
                </p>
                <p className="text-lg font-bold text-foreground">
                  {content.contactPhoneValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
