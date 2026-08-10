import type { ReactNode } from "react";

type FeatureTileProps = {
  icon: ReactNode;
  title: string;
  highlight?: boolean;
};

export function FeatureTile({
  icon,
  title,
  highlight = false,
}: FeatureTileProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl p-4 text-left ${
        highlight
          ? "bg-p/10 text-foreground ring-1 ring-p/25"
          : "bg-pl/40 text-foreground ring-1 ring-border/70"
      }`}>
      <div
        className={`flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-lg ${
          highlight ? "bg-card text-p" : "bg-p/10 text-p"
        }`}>
        {icon}
      </div>
      <p className="text-sm font-semibold leading-snug">{title}</p>
    </div>
  );
}
