import type { BaseLocale } from "@/locales/base-locale";
import InstagramIcon from "@/components/icons/footer/InstagramIcon";
import ViberIcon from "@/components/icons/footer/ViberIcon";
import WhatsAppIcon from "@/components/icons/footer/WhatsAppIcon";
import { publicPaths } from "@/lib/paths";

export const footerNavigation = (
  langCode: string = "sr",
  lang: BaseLocale
) => ({
  main: [
    { name: lang.home, href: publicPaths.home(langCode) },
    { name: lang.cars, href: publicPaths.cars(langCode) },
    {
      name: lang.rentalConditions,
      href: publicPaths.rentalConditions(langCode),
    },
    { name: lang.faq, href: publicPaths.faq(langCode) },
    { name: lang.blog, href: publicPaths.news(langCode) },
    { name: lang.contact, href: publicPaths.contact(langCode) },
    { name: lang.expoNav, href: publicPaths.expo(langCode), accent: true },
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
