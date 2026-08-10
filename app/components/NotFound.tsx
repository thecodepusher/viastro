import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";
import { Link, useLocation } from "react-router";
import { en } from "@/locales/en";
import { sr } from "@/locales/sr";
import { ru } from "@/locales/ru";

export default function NotFound() {
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const langCode =
    pathParts[0] === "sr" || pathParts[0] === "en" || pathParts[0] === "ru"
      ? pathParts[0]
      : "sr";

  let lang = sr;
  switch (langCode) {
    case "en":
      lang = en;
      break;
    case "ru":
      lang = ru;
      break;
    default:
      lang = sr;
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-surface">
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <FileQuestion
                size={120}
                className="text-p opacity-20 absolute inset-0 m-auto"
              />
              <h1 className="font-display text-9xl sm:text-[12rem] font-extrabold text-p relative z-10">
                404
              </h1>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {lang.notFoundTitle}
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-md mx-auto">
            {lang.notFoundMessage}
          </p>

          <Link to={`/${langCode}`}>
            <Button
              size="lg"
              className="bg-s hover:bg-s/90 text-white px-8 py-6 text-lg font-semibold cursor-pointer">
              <Home className="mr-2 h-5 w-5" />
              {lang.notFoundAction}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
