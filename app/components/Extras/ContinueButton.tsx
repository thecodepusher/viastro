import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BaseLocale } from "@/locales/base-locale";

interface ContinueButtonProps {
  lang: BaseLocale;
  onClick: () => void;
}

export function ContinueButton({ lang, onClick }: ContinueButtonProps) {
  return (
    <div className="flex my-8 justify-end mx-auto max-w-7xl px-4">
      <Button
        onClick={onClick}
        className="w-1/2 sm:w-34 bg-s text-white shadow-md transition-all hover:bg-s/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base py-2 sm:py-0"
        size="lg">
        {lang.continue}
        <ChevronRight />
      </Button>
    </div>
  );
}
