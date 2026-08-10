import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BaseLocale } from "@/locales/base-locale";

interface ContinueButtonProps {
  lang: BaseLocale;
  onClick: () => void;
  isLoading?: boolean;
}

export function ContinueButton({
  lang,
  onClick,
  isLoading = false,
}: ContinueButtonProps) {
  return (
    <div className="flex my-8 justify-end mx-auto max-w-7xl px-4">
      <Button
        onClick={onClick}
        disabled={isLoading}
        aria-busy={isLoading}
        className="w-1/2 rounded-full bg-p py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-p/20 transition-all hover:bg-p/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-34 sm:py-0 sm:text-base"
        size="lg">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {lang.continue}
          </>
        ) : (
          <>
            {lang.continue}
            <ChevronRight />
          </>
        )}
      </Button>
    </div>
  );
}
