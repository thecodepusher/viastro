import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { MenuIcon } from "lucide-react";
import { Form, Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import logoWhite from "viastro_logo_white.png";
import logo from "viastro_logo.png";

export default function Header(props: { lang: BaseLocale; langCode: string }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: `/${props.langCode}`, label: props.lang.home },
    { to: `/${props.langCode}/cars`, label: props.lang.cars },
    {
      to: `/${props.langCode}/rental-conditions`,
      label: props.lang.rentalConditions,
    },
    { to: `/${props.langCode}/faq`, label: props.lang.faq },
    { to: `/${props.langCode}/blog`, label: props.lang.blog },
    { to: `/${props.langCode}/contact`, label: props.lang.contact },
  ];

  const isActive = (path: string) => {
    if (path === `/${props.langCode}`) {
      return (
        location.pathname === path ||
        location.pathname === `/${props.langCode}/`
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed z-40 top-0 h-18 w-full bg-[#FF9B17] shadow-md">
      <div className="max-w-7xl justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 flex h-18 py-1">
        <Link to={`/${props.langCode}`} className="shrink-0">
          <img className="h-16" src={logoWhite} alt="Viastro Logo" />
        </Link>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold text-white transition-all duration-200 rounded-md hover:bg-white/25 hover:scale-105",
                    "lg:px-5 lg:py-2.5 lg:text-base",
                    active && "bg-white/25 shadow-sm"
                  )}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {!isMobile && (
          <div className="hidden md:flex">
            <Form
              method="POST"
              action="/select-lang"
              className="flex flex-row items-center gap-1">
              <input readOnly hidden name="loc" value={location.pathname} />
              <Button
                variant="ghost"
                name="lang"
                type="submit"
                value="sr"
                className={cn(
                  "h-10 w-10 p-1 hover:bg-white/60 cursor-pointer",
                  props.langCode === "sr" && "bg-white/65"
                )}>
                <img
                  className="w-7 h-7 rounded shadow-sm border border-white/30"
                  src="/rs.svg"
                  alt="Serbian"
                />
              </Button>
              <Button
                variant="ghost"
                name="lang"
                type="submit"
                value="en"
                className={cn(
                  "h-10 w-10 p-1 hover:bg-white/60 cursor-pointer",
                  props.langCode === "en" && "bg-white/65"
                )}>
                <img
                  className="w-7 h-7 rounded shadow-sm border border-white/30"
                  src="/gb.svg"
                  alt="English"
                />
              </Button>
              <Button
                variant="ghost"
                name="lang"
                type="submit"
                value="ru"
                className={cn(
                  "h-10 w-10 p-1 hover:bg-white/60 cursor-pointer",
                  props.langCode === "ru" && "bg-white/65"
                )}>
                <img
                  className="w-7 h-7 rounded shadow-sm border border-white/30"
                  src="/ru.svg"
                  alt="Russian"
                />
              </Button>
            </Form>
          </div>
        )}

        {isMobile && (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/60"
                aria-label="Open menu">
                <MenuIcon className="size-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-screen sm:w-[400px] flex flex-col">
              <SheetHeader className="border-b border-gray-200/60 mb-2 h-18 shadow-sm">
                <SheetTitle className="text-2xl font-bold text-left">
                  <Link to={`/${props.langCode}`} className="shrink-0">
                    <img className="h-16" src={logo} alt="Viastro Logo" />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                <nav className="flex flex-col">
                  {navLinks.map((link) => {
                    const active = isActive(link.to);
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={cn(
                          "px-4 py-4 text-base font-semibold transition-all duration-200",
                          "hover:bg-gray-100 active:bg-gray-200",
                          active
                            ? "bg-[#FF9B17]/10 text-[#FF9B17]"
                            : "text-gray-700 hover:text-[#FF9B17]"
                        )}>
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-8">
                  <Separator className="mb-6 h-px bg-gray-200/60 shadow-sm" />
                  <p className="text-sm font-medium text-gray-600 mb-4 px-4">
                    {props.lang.selectLanguage}
                  </p>
                  <div className="flex items-center gap-3 px-4">
                    <Form
                      method="POST"
                      action="/select-lang"
                      className="flex items-center gap-3">
                      <input
                        readOnly
                        hidden
                        name="loc"
                        value={location.pathname}
                      />
                      <Button
                        variant="ghost"
                        name="lang"
                        type="submit"
                        value="sr"
                        className={cn(
                          "h-12 w-12 p-0 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-[#FF9B17] transition-all",
                          props.langCode === "sr" &&
                            "bg-gray-100 border-[#FF9B17]"
                        )}>
                        <img
                          className="w-10 h-10 rounded shadow-sm"
                          src="/rs.svg"
                          alt="Serbian"
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        name="lang"
                        type="submit"
                        value="en"
                        className={cn(
                          "h-12 w-12 p-0 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-[#FF9B17] transition-all",
                          props.langCode === "en" &&
                            "bg-gray-100 border-[#FF9B17]"
                        )}>
                        <img
                          className="w-10 h-10 rounded shadow-sm"
                          src="/gb.svg"
                          alt="English"
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        name="lang"
                        type="submit"
                        value="ru"
                        className={cn(
                          "h-12 w-12 p-0 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-[#FF9B17] transition-all",
                          props.langCode === "ru" &&
                            "bg-gray-100 border-[#FF9B17]"
                        )}>
                        <img
                          className="w-10 h-10 rounded shadow-sm"
                          src="/ru.svg"
                          alt="Russian"
                        />
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>

              <SheetFooter className="flex-col gap-0 border-t border-gray-200/60 pt-4 mt-4 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-sm font-semibold text-gray-700">
                    {props.lang.contactUs}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="tel:+38169656555"
                      className="text-gray-600 hover:text-[#FF9B17] transition-colors"
                      aria-label="Call us">
                      <FiPhoneCall size={24} />
                    </a>
                    <a
                      href="https://www.instagram.com/viastro.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#FF9B17] transition-colors"
                      aria-label="Instagram">
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href="mailto:reservations@viastro.rs"
                      className="text-gray-600 hover:text-[#FF9B17] transition-colors"
                      aria-label="Email us">
                      <MdOutlineMarkEmailRead size={24} />
                    </a>
                    <a
                      href="https://wa.me/38169656555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#FF9B17] transition-colors"
                      aria-label="WhatsApp">
                      <FaWhatsapp size={24} />
                    </a>
                    <a
                      href="viber://chat?number=+38169656555"
                      className="text-gray-600 hover:text-[#FF9B17] transition-colors"
                      aria-label="Viber">
                      <FaViber size={24} />
                    </a>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
