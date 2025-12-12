import { ShieldCheck, Zap } from "lucide-react";
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
    <section className="bg-white py-14">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-p">
            {content.reasonsTitle}
          </p>
          <h2 className={`${sectionTitle} mt-2`}>{content.reasonsTitle}</h2>
          <p className={sectionSubtitle}>{content.ctaTitle}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.reasonsItems.map((item) => (
            <div key={item} className={softCard}>
              <div className="flex items-center gap-3 p-5">
                <div className="flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-xl bg-p/10 text-p">
                  <ShieldCheck className="size-5" />
                </div>
                <p className="text-base font-semibold text-gray-900">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-p/15 bg-linear-to-r from-p/10 via-p/5 to-white p-8 shadow-lg">
          <div className="flex h-full flex-col items-center gap-10 sm:flex-row sm:justify-center">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-p shadow-sm ring-1 ring-p/15">
                <Zap className="size-5" />
                {content.ctaTitle}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {content.ctaTitle}
              </h3>
              <p className="text-base text-gray-700">{content.ctaSubtitle}</p>
            </div>
            <div className="flex w-2xs items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-md ring-1 ring-p/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-p text-white shadow-lg shadow-p/30">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  {content.contactPhoneLabel}
                </p>
                <p className="text-lg font-bold text-gray-900">
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
