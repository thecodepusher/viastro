import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-inner focus:border-p focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
