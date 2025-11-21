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
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <FileQuestion
                size={120}
                className="text-[#FF9B17] opacity-20 absolute inset-0 m-auto"
              />
              <h1 className="text-9xl sm:text-[12rem] font-black text-[#FF9B17] relative z-10 drop-shadow-lg">
                404
              </h1>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {lang.notFoundTitle}
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-md mx-auto">
            {lang.notFoundMessage}
          </p>

          <Link to={`/${langCode}`}>
            <Button
              size="lg"
              className="bg-[#FF9B17] hover:bg-[#FF9B17]/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer">
              <Home className="mr-2 h-5 w-5" />
              {lang.notFoundAction}
            </Button>
          </Link>

          <div className="mt-16 flex justify-center gap-2 opacity-30">
            <div className="w-2 h-2 rounded-full bg-[#FF9B17]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FF9B17]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FF9B17]"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
