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
        className="w-1/2 rounded-full bg-p py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-p/20 transition-all hover:bg-p/90 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground sm:w-34 sm:py-0 sm:text-base"
        size="lg">
        {lang.continue}
        <ChevronRight />
      </Button>
    </div>
  );
}
