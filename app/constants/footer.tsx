import type { BaseLocale } from "@/locales/base-locale";
import InstagramIcon from "@/components/icons/footer/InstagramIcon";
import ViberIcon from "@/components/icons/footer/ViberIcon";
import WhatsAppIcon from "@/components/icons/footer/WhatsAppIcon";

export const footerNavigation = (
  langCode: string = "sr",
  lang: BaseLocale
) => ({
  main: [
    { name: lang.home, href: `/${langCode}/` },
    { name: lang.cars, href: `/${langCode}/cars` },
    {
      name: lang.rentalConditions,
      href: `/${langCode}/rental-conditions`,
    },
    { name: lang.faq, href: `/${langCode}/faq` },
    { name: lang.blog, href: `/${langCode}/blog` },
    { name: lang.contact, href: `/${langCode}/contact` },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/viastro.rs/",
      icon: (props: any) => (
        <InstagramIcon className="size-7 sm:size-8 lg:size-10" />
      ),
    },
    {
      name: "Viber",
      href: "viber://chat?number=+38169656555",
      icon: (props: any) => (
        <ViberIcon className="size-7 sm:size-8 lg:size-10" />
      ),
    },
    {
      name: "Whatsapp",
      href: "https://wa.me/38169656555",
      icon: (props: any) => (
        <WhatsAppIcon className="size-7 sm:size-8 lg:size-10" />
      ),
    },
  ],
});
