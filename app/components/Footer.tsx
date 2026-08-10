import type { BaseLocale } from "@/locales/base-locale";
import { footerNavigation } from "@/constants/footer";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

const paymentBadgeClass =
  "flex h-16 items-center justify-center rounded-xl border border-white/8 bg-white/5 p-3 opacity-80 transition-opacity hover:opacity-100 md:h-[4.5rem]";

export default function Footer(props: { lang: BaseLocale; langCode: string }) {
  const navigation = footerNavigation(props.langCode, props.lang);

  return (
    <footer className="bg-pd text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-col items-center gap-7 border-b border-white/10 pb-8 sm:mb-12 sm:gap-8 sm:pb-12">
          <Link
            to={`/${props.langCode}`}
            className="opacity-90 transition-opacity hover:opacity-100">
            <img
              src="/logo_white.webp"
              alt="Viastro"
              className="h-19 w-auto sm:h-20 lg:h-22"
              width="120"
              height="120"
              loading="lazy"
            />
          </Link>

          <nav
            aria-label="Footer"
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:max-w-2xl lg:max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {navigation.main.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex min-h-[3.25rem] items-center justify-center px-5 py-3.5 text-center text-[15px] font-medium leading-snug text-white/70 transition-colors hover:bg-white/5 hover:text-p md:text-sm",
                    index < navigation.main.length - 1 &&
                      "border-b border-white/8 md:border-b-0",
                    index < 4 && "md:border-b md:border-white/8 lg:border-b-0",
                    index < 3 && "lg:border-b lg:border-white/8",
                    index % 2 === 0 &&
                      "md:border-r md:border-white/8 lg:border-r-0",
                    index % 3 !== 2 && "lg:border-r lg:border-white/8",
                  )}>
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mb-8 flex justify-center sm:mb-10">
          <div className="flex items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-10 py-4 md:gap-10 md:px-12 md:py-5">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/50 transition-colors hover:text-p"
                aria-label={item.name}>
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-7 md:size-8" />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8 space-y-5 sm:mb-10 sm:space-y-6">
          <div className="mx-auto grid max-w-md grid-cols-2 gap-3 md:max-w-4xl md:grid-cols-4 md:gap-4">
            <a
              href="https://www.wspay.rs"
              title="Monri WSpay - Web Secure Payment Gateway"
              target="_blank"
              rel="noopener noreferrer"
              className={paymentBadgeClass}>
              <img
                width="118"
                height="50"
                alt="Monri WSpay - Web Secure Payment Gateway"
                src="https://www.wspay.info/payment-info/wsPayWebSecureLogo-118x50-transparent.png"
                className="h-7 w-auto max-w-full object-contain md:h-9"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://www.raiffeisenbank.rs/"
              className={paymentBadgeClass}
              target="_blank"
              rel="noopener noreferrer">
              <img
                width="140"
                height="48"
                src="/raiffeisen.webp"
                alt="Raiffeisen bank"
                className="h-7 w-auto max-w-full object-contain md:h-9"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html"
              target="_blank"
              rel="noopener noreferrer"
              className={paymentBadgeClass}>
              <img
                width="40"
                height="40"
                src="/visa-secure.webp"
                alt="Verified by Visa"
                className="h-7 w-auto max-w-full object-contain md:h-8"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://www.mastercard.rs/sr-rs/korisnici/pronadite-karticu.html"
              target="_blank"
              rel="noopener noreferrer"
              className={paymentBadgeClass}>
              <img
                width="140"
                src="/mc_idcheck.svg"
                alt="Mastercard SecureCode"
                className="h-7 w-auto max-w-full object-contain md:h-9"
              />
            </a>
          </div>

          <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-4 rounded-2xl border border-white/10 bg-white/4 px-5 py-5 md:max-w-2xl md:gap-x-8 md:gap-y-5 md:px-8 md:py-6">
            <img
              width="50"
              height="32"
              src="/mc.svg"
              alt="mastercard"
              className="h-6 w-auto object-contain opacity-80 md:h-7"
              loading="lazy"
              decoding="async"
            />
            <img
              width="50"
              height="32"
              src="/ms.svg"
              alt="maestro"
              className="h-6 w-auto object-contain opacity-80 md:h-7"
              loading="lazy"
              decoding="async"
            />
            <img
              width="55"
              height="35"
              src="/visa.webp"
              alt="visa"
              className="h-7 w-auto object-contain opacity-80 md:h-8"
              loading="lazy"
              decoding="async"
            />
            <img
              width="55"
              height="35"
              src="/dina.webp"
              alt="dina"
              className="h-7 w-auto object-contain opacity-80 md:h-8"
              loading="lazy"
              decoding="async"
            />
            <img
              width="50"
              height="32"
              src="/am.webp"
              alt="american express"
              className="h-6 w-auto object-contain opacity-80 md:h-7"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Viastro doo Beograd
          </p>
          <p className="mt-2 text-xs text-white/35">
            {props.lang.pib}: 114961759 {props.lang.mb}: 22096737{" "}
            {props.lang.delatnost}: 7711
          </p>
          <p className="mt-2 text-xs text-white/35">
            Web by{" "}
            <a
              href="https://krivokucadragan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 transition-colors hover:text-p">
              CodePusher
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
