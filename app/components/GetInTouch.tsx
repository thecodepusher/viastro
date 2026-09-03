import type { BaseLocale } from "@/locales/base-locale";
import { BUSINESS, formattedAddress } from "@/lib/business";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import GoogleMap from "./GoogleMap";

export default function GetInTouch(props: { lang: BaseLocale }) {
  return (
    <section className="bg-surface section-pattern py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8">
        <div className="w-full mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="flex flex-col sm:items-start items-center justify-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center sm:text-left">
                {props.lang.gitTitle}
              </h2>
              <p className="mt-4 sm:text-left text-center text-base text-muted-foreground">
                {props.lang.gitSubTitle}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              <div className="rounded-xl border border-border/70 bg-card p-6 sm:p-8 transition-colors hover:border-p/40">
                <h3 className="text-base font-semibold text-foreground">
                  {BUSINESS.addressLocality}
                </h3>
                <a href={BUSINESS.mapsUrl}>
                  <address className="mt-2 text-sm text-muted-foreground not-italic hover:text-p transition-colors">
                    <p>{formattedAddress()}</p>
                  </address>
                </a>
                <div className="mt-4 space-y-1 text-sm">
                  <div className="font-semibold text-foreground">{props.lang.gitDays}</div>
                  <div className="text-muted-foreground">8.00 - 16.00</div>
                </div>
              </div>
              <div className="rounded-xl border border-border/70 bg-card p-6 sm:p-8 transition-colors hover:border-p/40">
                <h3 className="text-base font-semibold text-foreground">
                  {props.lang.gitAwailable}
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href="tel:+38169656555"
                    className="flex items-center gap-3 text-foreground hover:text-p transition-colors">
                    <FiPhoneCall size={18} className="text-p shrink-0" />
                    <span className="font-semibold">+381 69 656 555</span>
                  </a>
                  <a
                    href="https://www.instagram.com/viastro.rs/"
                    className="flex items-center gap-3 text-foreground hover:text-p transition-colors">
                    <FaInstagram size={18} className="text-p shrink-0" />
                    <span className="font-semibold">viastro.rs</span>
                  </a>
                  <a
                    href="mailto:office@viastro.rs"
                    className="flex items-center gap-3 text-foreground hover:text-p transition-colors">
                    <MdOutlineMarkEmailRead size={18} className="text-p shrink-0" />
                    <span className="font-semibold">office@viastro.rs</span>
                  </a>
                  <a
                    href="https://wa.me/38169656555"
                    className="hidden sm:flex items-center gap-3 text-foreground hover:text-p transition-colors">
                    <FaWhatsapp size={18} className="text-p shrink-0" />
                    <span className="font-semibold">WhatsApp</span>
                  </a>
                  <a
                    href="viber://chat?number=+38169656555"
                    className="hidden sm:flex items-center gap-3 text-foreground hover:text-p transition-colors">
                    <FaViber size={18} className="text-p shrink-0" />
                    <span className="font-semibold">Viber</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GoogleMap />
      </div>
    </section>
  );
}
