import logoWhite from "viastro_logo_white.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { MenuIcon } from "lucide-react";
import { Form, Link, useLocation } from "react-router";
import { Button } from "./ui/button";

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed z-40 top-0 h-18 w-full bg-[#FF9B17]">
      <div className="max-w-7xl justify-between items-center mx-auto px-2 flex h-18 py-1">
        <Link to="/">
          <img className="h-16" src={logoWhite} />
        </Link>

        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="px-2">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex px-6 gap-2 flex-col">
              <Link to="/">
                <h2 className="border-b">Home</h2>
              </Link>
              <Link to="/cars">
                <h2 className="border-b">Cars</h2>
              </Link>
              <Link to="/rental-conditions">
                <h2 className="border-b">Rental conditions</h2>
              </Link>
              <Link to="/faq">
                <h2 className="border-b">FAQ</h2>
              </Link>
              <Link to="/blog">
                <h2 className="border-b">Blog</h2>
              </Link>
              <Link to="/contact">
                <h2 className="border-b">Contact</h2>
              </Link>
            </div>
            <p className="mt-6 px-6">Select language: </p>
            <div className="px-6 flex items-center gap-2">
              <Form method="POST" action="/select-lang">
                <input readOnly hidden name="loc" value={location.pathname} />
                <Button variant="ghost" name="lang" type="submit" value="en">
                  <img className="w-8 shadow border" src="/gb.svg" />
                </Button>
                <Button variant="ghost" name="lang" type="submit" value="sr">
                  <img className="w-8 shadow border" src="/rs.svg" />
                </Button>
                <Button variant="ghost" name="lang" type="submit" value="ru">
                  <img className="w-8 shadow border" src="/ru.svg" />
                </Button>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
