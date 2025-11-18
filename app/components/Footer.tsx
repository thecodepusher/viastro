import type { BaseLocale } from "@/locales/base-locale";
import { footerNavigation } from "@/constants/footer";

export default function Footer(props: { lang: BaseLocale; langCode: string }) {
  const navigation = footerNavigation(props.langCode, props.lang);

  return (
    <footer className="bg-pd">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 border-b border-gray-700/50 pb-8 sm:mb-12 sm:pb-12">
          <nav
            aria-label="Footer"
            className="grid grid-cols-3 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-4 lg:gap-x-12">
            {navigation.main.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white sm:text-base lg:text-lg text-center">
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="mb-4 flex justify-center sm:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 transition-all hover:scale-110 hover:text-white"
                aria-label={item.name}>
                <span className="sr-only">{item.name}</span>
                <item.icon
                  aria-hidden="true"
                  className="size-7 sm:size-8 lg:size-10"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8 space-y-6 sm:mb-12 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 lg:gap-x-8">
            <img
              width="50px"
              height="32px"
              src="/mc.svg"
              alt="mastercard"
              className="h-6 w-auto object-contain sm:h-7 lg:h-10"
            />
            <img
              width="50px"
              height="32px"
              src="/ms.svg"
              alt="maestro"
              className="h-6 w-auto object-contain sm:h-7 lg:h-10"
            />
            <img
              width="55px"
              height="35px"
              src="/visa.png"
              alt="visa"
              className="h-7 w-auto object-contain sm:h-8 lg:h-11"
            />
            <img
              width="55px"
              height="35px"
              src="/dina.png"
              alt="dina"
              className="h-7 w-auto object-contain sm:h-8 lg:h-11"
            />
            <img
              width="50px"
              height="32px"
              src="/am.png"
              alt="american express"
              className="h-6 w-auto object-contain sm:h-7 lg:h-10"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 lg:gap-x-10">
            <a
              href="https://www.raiffeisenbank.rs/"
              className="transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer">
              <img
                width="140px"
                src="/raiffeisen.png"
                alt="Raiffeisen bank"
                className="h-8 w-auto object-contain sm:h-9 lg:h-12"
              />
            </a>

            <a
              href="https://www.wspay.rs"
              title="Monri WSpay - Web Secure Payment Gateway"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80">
              <img
                width="80px"
                alt="Monri WSpay - Web Secure Payment Gateway"
                src="https://www.wspay.info/payment-info/wsPayWebSecureLogo-118x50-transparent.png"
                className="h-8 w-auto object-contain sm:h-9 lg:h-12"
              />
            </a>

            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <a
                href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80">
                <img
                  width="40px"
                  src="/visa-secure.jpg"
                  alt="Verified by Visa"
                  className="h-6 w-auto object-contain sm:h-7 lg:h-10"
                />
              </a>
              <a
                href="https://www.mastercard.rs/sr-rs/korisnici/pronadite-karticu.html"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80">
                <img
                  width="140px"
                  src="/mc_idcheck.svg"
                  alt="Mastercard SecureCode"
                  className="h-8 w-auto object-contain sm:h-9 lg:h-12"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-6 text-center sm:pt-8">
          <p className="text-sm text-gray-400 sm:text-base lg:text-lg">
            &copy; {new Date().getFullYear()} Viastro doo Beograd
          </p>
          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm lg:text-base">
            PIB: 114961759 MB: 22096737 Delatnost: 7711
          </p>
        </div>
      </div>
    </footer>
  );
}
