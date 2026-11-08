import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  positive: "bg-ohs-sky-soft text-ohs-navy",
  negative: "bg-ohs-navy-soft text-muted-foreground",
};

export function StatusBadge({
  label,
  tone = "positive",
  className,
}: {
  label: string;
  tone?: "positive" | "negative";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full px-3 py-1 text-sm font-semibold",
        STYLES[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
