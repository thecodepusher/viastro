import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
import { publicPaths } from "@/lib/paths";
import { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";

export default function Header(props: { lang: BaseLocale; langCode: string }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: publicPaths.home(props.langCode), label: props.lang.home },
    { to: publicPaths.cars(props.langCode), label: props.lang.cars },
    {
      to: publicPaths.longTermRental(props.langCode),
      label: props.lang.longTermRentalNav,
    },
    {
      to: publicPaths.rentalConditions(props.langCode),
      label: props.lang.rentalConditions,
    },
    { to: publicPaths.faq(props.langCode), label: props.lang.faq },
    { to: publicPaths.news(props.langCode), label: props.lang.blog },
    { to: publicPaths.contact(props.langCode), label: props.lang.contact },
  ];

  const isActive = (path: string) => {
    if (path === publicPaths.home(props.langCode)) {
      return (
        location.pathname === path ||
        location.pathname === `${publicPaths.home(props.langCode)}/`
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed z-40 top-0 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-pd/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-pd",
      )}>
      <div className="justify-between items-center mx-auto px-4 sm:px-8 lg:px-12 flex h-18 sm:h-20">
        <Link to={`/${props.langCode}`} className="shrink-0">
          <img
            className="h-14 sm:h-16 w-auto"
            src="/logo_white.webp"
            alt="Viastro Logo"
            width="80"
            height="80"
            loading="eager"
            {...({
              fetchPriority: "high",
            } as React.ImgHTMLAttributes<HTMLImageElement>)}
            sizes="80px"
          />
        </Link>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium text-white/75 transition-colors duration-200 rounded-md hover:text-white",
                    "lg:px-3.5 lg:text-[0.9375rem]",
                    active && "text-white",
                  )}>
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-p" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {!isMobile && (
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+38169656555"
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
              <FiPhoneCall className="size-4 text-p" />
              +381 69 656 555
            </a>
            <Form
              method="POST"
              action={publicPaths.languageSelection}
              className="flex flex-row items-center gap-1">
              <input readOnly hidden name="loc" value={location.pathname} />
              <Button
                variant="ghost"
                name="lang"
                type="submit"
                value="sr"
                className={cn(
                  "h-9 w-9 p-1 hover:bg-white/10 cursor-pointer",
                  props.langCode === "sr" && "bg-white/15 ring-1 ring-p/60",
                )}>
                <img
                  className="w-6 h-6 rounded-sm"
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
                  "h-9 w-9 p-1 hover:bg-white/10 cursor-pointer",
                  props.langCode === "en" && "bg-white/15 ring-1 ring-p/60",
                )}>
                <img
                  className="w-6 h-6 rounded-sm"
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
                  "h-9 w-9 p-1 hover:bg-white/10 cursor-pointer",
                  props.langCode === "ru" && "bg-white/15 ring-1 ring-p/60",
                )}>
                <img
                  className="w-6 h-6 rounded-sm"
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
                className="text-white hover:bg-white/10"
                aria-label="Open menu">
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-screen sm:w-[380px] flex flex-col bg-pd border-l border-white/10 p-0 gap-0 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:opacity-80 [&>button]:top-6">
              <SheetHeader className="border-b border-white/10 h-18 px-4 py-0 flex flex-row items-center justify-between pr-14">
                <SheetTitle className="text-left">
                  <Link to={`/${props.langCode}`} className="shrink-0">
                    <img
                      className="h-14 w-auto"
                      src="/logo_white.webp"
                      alt="Viastro Logo"
                      width="80"
                      height="80"
                      loading="eager"
                      sizes="80px"
                    />
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for mobile devices
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col px-3 gap-1">
                  {navLinks.map((link) => {
                    const active = isActive(link.to);
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={cn(
                          "relative overflow-hidden px-4 py-3.5 text-base font-medium transition-colors rounded-lg",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5",
                        )}>
                        {link.label}
                        {active && (
                          <span className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-p" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-8 px-4">
                  <Separator className="mb-5 bg-white/10" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/45 mb-3">
                    {props.lang.selectLanguage}
                  </p>
                  <Form
                    method="POST"
                    action={publicPaths.languageSelection}
                    className="flex items-center gap-3">
                    <input
                      readOnly
                      hidden
                      name="loc"
                      value={location.pathname}
                    />
                    {(
                      [
                        ["sr", "/rs.svg", "Serbian"],
                        ["en", "/gb.svg", "English"],
                        ["ru", "/ru.svg", "Russian"],
                      ] as const
                    ).map(([code, src, alt]) => (
                      <Button
                        key={code}
                        variant="ghost"
                        name="lang"
                        type="submit"
                        value={code}
                        className={cn(
                          "h-11 w-11 p-0 rounded-lg border border-white/15 bg-white/5 hover:border-p/60 hover:bg-white/10 transition-colors",
                          props.langCode === code &&
                            "border-p bg-p/15 ring-1 ring-p/40",
                        )}>
                        <img
                          className="w-8 h-8 rounded-sm"
                          src={src}
                          alt={alt}
                        />
                      </Button>
                    ))}
                  </Form>
                </div>
              </div>

              <SheetFooter className="flex-col gap-0 border-t border-white/10 px-4 py-5 bg-white/[0.03]">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-sm font-semibold text-white/90">
                    {props.lang.contactUs}
                  </p>
                  <div className="flex items-center gap-3.5">
                    <a
                      href="tel:+38169656555"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-p hover:text-pd transition-colors"
                      aria-label="Call us">
                      <FiPhoneCall size={18} />
                    </a>
                    <a
                      href="https://www.instagram.com/viastro.rs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-p hover:text-pd transition-colors"
                      aria-label="Instagram">
                      <FaInstagram size={18} />
                    </a>
                    <a
                      href="mailto:office@viastro.rs"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-p hover:text-pd transition-colors"
                      aria-label="Email us">
                      <MdOutlineMarkEmailRead size={18} />
                    </a>
                    <a
                      href="https://wa.me/38169656555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-p hover:text-pd transition-colors"
                      aria-label="WhatsApp">
                      <FaWhatsapp size={18} />
                    </a>
                    <a
                      href="viber://chat?number=+38169656555"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-p hover:text-pd transition-colors"
                      aria-label="Viber">
                      <FaViber size={18} />
                    </a>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </div>
      <div className="h-px w-full bg-linear-to-r from-transparent via-p/70 to-transparent" />
    </header>
  );
}
