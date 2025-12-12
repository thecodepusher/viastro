import type { ReactNode } from "react";

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function ContactRow({ icon, label, value }: ContactRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white ring-1 ring-white/10">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/70">{label}</p>
        <p className="text-base font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

