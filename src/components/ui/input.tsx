import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-11 w-full rounded-xl border border-border bg-white px-4 py-2 text-base text-ohs-navy shadow-[inset_0_1px_2px_rgba(5,32,51,0.04)] transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ohs-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ohs-sky/40 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
