import type { ReactNode } from "react";

export const reservationActionButtonClass =
  "inline-flex w-auto min-w-56 cursor-pointer flex-row items-center justify-center gap-2 rounded-full bg-linear-to-r from-p via-p to-p/90 px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-p/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

export function ReservationActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-20 w-full items-center justify-center px-4 sm:px-0">
      {children}
    </div>
  );
}
