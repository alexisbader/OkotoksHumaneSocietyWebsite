import { cn } from "@/lib/utils";

export function PageHero({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("space-y-4", className)}>
      <span className="block h-1.5 w-12 rounded-full bg-gradient-to-r from-ohs-sky to-ohs-navy" />
      <h1 className="text-3xl font-bold tracking-tight text-ohs-navy sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
