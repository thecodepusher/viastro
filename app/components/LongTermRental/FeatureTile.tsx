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
      className={`flex items-center gap-3 rounded-2xl p-4 text-left ${
        highlight
          ? "bg-p/10 text-gray-900 ring-1 ring-p/20"
          : "bg-white text-gray-800 ring-1 ring-gray-100"
      } shadow-sm`}>
      <div
        className={`flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-xl ${
          highlight ? "bg-white text-p" : "bg-p/10 text-p"
        }`}>
        {icon}
      </div>
      <p className="text-sm font-semibold leading-snug">{title}</p>
    </div>
  );
}

