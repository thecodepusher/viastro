import { useState } from "react";
import { Link } from "react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Languages,
  MapPin,
  Plane,
  Receipt,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import type { ExpoLocale } from "@/locales/base-locale";
import { publicPaths } from "@/lib/paths";
import { cn } from "@/lib/utils";
import {
  iconBadge,
  pill,
  sectionSubtitle,
  sectionTitle,
  softCard,
} from "@/components/LongTermRental/styles";

const expoContainer = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const expoSection = "bg-surface py-5 sm:py-8";
const expoSectionPattern = "bg-surface section-pattern py-5 sm:py-8";

type Props = {
  content: ExpoLocale;
  langCode: string;
};

const serviceIcons = [Plane, Truck, CalendarDays, Languages, Receipt, ShieldCheck];
const exhibitorIcons = [CalendarDays, CarFront, Users];
const audienceIcons = [Globe2, Building2, Users, Languages, MapPin];

export function ExpoLanding({ content, langCode }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full">
      <section className="relative overflow-hidden">
        <div className="relative min-h-[70vh] sm:min-h-[60vh] w-full overflow-hidden">
          <HeroCarousel alt={content.heroImageAlt} />

          <div className="relative z-10 min-h-full flex flex-col justify-center pt-28 sm:pt-32 pb-12 sm:pb-16">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center">
                <div className="max-w-3xl space-y-5 text-white">
                  <p className="inline-flex items-center gap-2 rounded-md bg-p/15 ring-1 ring-p/40 px-3 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-p">
                    {content.heroEyebrow}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    {content.heroTitle}
                  </h1>
                  <p className="text-base sm:text-lg leading-relaxed text-white/85 max-w-2xl">
                    {content.heroDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {content.highlights.map((item) => (
                      <span key={item} className={`${pill} bg-white/10 text-p ring-1 ring-white/15`}>
                        <CheckCircle2 className="size-4" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-p text-pd">
                      <CarFront className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                        EXPO 2027
                      </p>
                      <p className="text-base font-semibold text-white">
                        Viastro Rent a Car
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2">
                    <Link
                      to={publicPaths.reservation(langCode)}
                      className="w-full rounded-lg bg-p text-pd font-semibold py-3 px-4 text-center transition-colors hover:bg-p/90 focus:outline-none focus:ring-2 focus:ring-p/60">
                      {content.ctaPrimary}
                    </Link>
                    <Link
                      to={publicPaths.contact(langCode)}
                      className="rounded-lg bg-transparent text-white font-semibold py-3 px-4 text-center ring-1 ring-white/25 hover:bg-white/10 transition">
                      {content.ctaSecondary}
                    </Link>
                  </div>
                  <p className="text-xs text-white/55">{content.ctaText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface pt-5 sm:pt-8">
        <div className={expoContainer}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: content.datesLabel, value: content.datesValue, icon: CalendarDays },
              { label: content.locationLabel, value: content.locationValue, icon: MapPin },
              { label: content.expectedLabel, value: content.expectedValue, icon: Users },
            ].map((fact) => (
              <div key={fact.label} className={`${softCard} p-5`}>
                <div className="flex items-start gap-3">
                  <div className={iconBadge}>
                    <fact.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-p">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground leading-snug">
                      {fact.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={expoSectionPattern}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.whyTitle}</h2>
          <div className="mt-5 sm:mt-8 space-y-4 max-w-4xl">
            {content.whyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={expoSection}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.servicesTitle}</h2>
          <p className={sectionSubtitle}>{content.servicesIntro}</p>
          <div className="mt-6 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? ShieldCheck;
              return (
                <div key={service.title} className={`${softCard} p-5`}>
                  <div className={iconBadge}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={expoSectionPattern}>
        <div className={expoContainer}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <h2 className={sectionTitle}>{content.airportTitle}</h2>
              <div className="mt-5 space-y-4">
                {content.airportParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-p/25 bg-p/10 p-6">
              <div className="flex items-center gap-3">
                <div className={iconBadge}>
                  <Plane className="size-5" />
                </div>
                <p className="text-lg font-bold text-foreground">BEG · Surčin</p>
              </div>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {content.locationValue}
              </p>
              <Link
                to={publicPaths.reservation(langCode)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-p px-4 py-3 text-center font-semibold text-pd transition-colors hover:bg-p/90">
                {content.ctaPrimary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={expoSection}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.exhibitorsTitle}</h2>
          <p className={sectionSubtitle}>{content.exhibitorsIntro}</p>
          <div className="mt-6 sm:mt-10 grid gap-4 md:grid-cols-3">
            {content.exhibitors.map((item, index) => {
              const Icon = exhibitorIcons[index] ?? Building2;
              return (
                <div key={item.title} className={`${softCard} p-5`}>
                  <div className={iconBadge}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={expoSectionPattern}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.stepsTitle}</h2>
          <p className={sectionSubtitle}>{content.stepsIntro}</p>
          <ol className="mt-6 sm:mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {content.steps.map((step, index) => (
              <li key={step.title} className={`${softCard} p-5`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-p text-sm font-bold text-pd">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={expoSection}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.audiencesTitle}</h2>
          <div className="mt-6 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.audiences.map((item, index) => {
              const Icon = audienceIcons[index] ?? Users;
              return (
                <div key={item.title} className={`${softCard} p-5`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-p/10 text-p">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={expoSectionPattern}>
        <div className={expoContainer}>
          <div className="rounded-2xl border border-p/30 bg-p/10 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-p text-pd">
                <AlertTriangle className="size-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {content.availabilityTitle}
                </h2>
                <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {content.availabilityText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={expoSection}>
        <div className={expoContainer}>
          <h2 className={`${sectionTitle} text-center`}>{content.faqTitle}</h2>
          <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
            {content.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-border/70 bg-card overflow-hidden self-start">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className={cn(
                        "w-full px-5 py-4 flex items-center justify-between text-left transition-colors cursor-pointer",
                        isOpen ? "bg-pl/60" : "hover:bg-pl/30",
                      )}>
                      <span className="text-sm sm:text-base font-semibold text-foreground pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180 text-p",
                        )}
                      />
                    </button>
                  </dt>
                  <div
                    className={cn(
                      "text-sm sm:text-base text-muted-foreground px-5 overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96 pb-4" : "max-h-0",
                    )}>
                    <dd className="pt-1">{faq.answer}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className={expoSectionPattern}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.partnerTitle}</h2>
          <div className="mt-5 space-y-4 max-w-4xl">
            {content.partnerParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={expoSection}>
        <div className={expoContainer}>
          <h2 className={sectionTitle}>{content.relatedTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Link
              to={publicPaths.cars(langCode)}
              className={`${softCard} p-5 text-base font-semibold text-foreground hover:text-p`}>
              {content.relatedCars}
            </Link>
            <Link
              to={publicPaths.longTermRental(langCode)}
              className={`${softCard} p-5 text-base font-semibold text-foreground hover:text-p`}>
              {content.relatedLongTerm}
            </Link>
            <Link
              to={publicPaths.reservation(langCode)}
              className={`${softCard} p-5 text-base font-semibold text-foreground hover:text-p`}>
              {content.relatedReservation}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-s">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-p/20 via-transparent to-transparent"
        />
        <div className="relative px-6 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              {content.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-white/70 text-pretty">
              {content.ctaText}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={publicPaths.reservation(langCode)}
                className="rounded-lg px-6 py-3 bg-p text-pd font-semibold transition-colors hover:bg-p/90">
                {content.ctaPrimary}
              </Link>
              <Link
                to={publicPaths.contact(langCode)}
                className="rounded-lg px-6 py-3 text-white font-semibold ring-1 ring-white/25 hover:bg-white/10 transition">
                {content.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
