export function ProgressBar({
  raised,
  goal,
}: {
  raised: number;
  goal?: number;
}) {
  const currency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
  const percent = goal ? Math.min(100, Math.round((raised / goal) * 100)) : null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-2xl font-bold text-ohs-navy">{currency.format(raised)} raised</p>
        {goal ? (
          <p className="text-base text-muted-foreground">of {currency.format(goal)} goal</p>
        ) : null}
      </div>
      {percent !== null ? (
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-3 w-full overflow-hidden rounded-full bg-ohs-navy-soft"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-ohs-sky to-ohs-navy transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
