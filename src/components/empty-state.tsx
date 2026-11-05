import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-ohs-sky/50 bg-ohs-sky-soft/60 px-6 py-12 text-center",
        className,
      )}
    >
      <h2 className="text-xl font-semibold text-ohs-navy">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
