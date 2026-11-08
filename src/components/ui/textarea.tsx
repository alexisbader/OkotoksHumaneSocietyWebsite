import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-ohs-navy shadow-[inset_0_1px_2px_rgba(5,32,51,0.04)] transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ohs-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ohs-sky/40 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
