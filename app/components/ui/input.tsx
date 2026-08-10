import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground shadow-inner focus:border-p focus:outline-none placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Input };
