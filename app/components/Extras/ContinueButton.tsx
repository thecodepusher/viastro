import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BaseLocale } from "@/locales/base-locale";
import {
  ReservationActionBar,
  reservationActionButtonClass,
} from "@/components/Reservation/ReservationActionBar";

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
    <div className="mx-auto w-full max-w-7xl px-0 sm:px-4">
      <ReservationActionBar>
        <Button
          onClick={onClick}
          disabled={isLoading}
          aria-busy={isLoading}
          className={reservationActionButtonClass}>
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
      </ReservationActionBar>
    </div>
  );
}
