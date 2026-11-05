import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  showWordmark?: boolean;
};

export function SiteLogo({
  className,
  priority = false,
  showWordmark = true,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ohs-sky focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src="/ohs-logo.png"
        alt="Okotoks Humane Society logo — cat and dog silhouettes over blue hills"
        width={64}
        height={64}
        priority={priority}
        className="h-12 w-12 sm:h-14 sm:w-14"
      />
      {showWordmark ? (
        <span className="flex flex-col leading-tight">
          <span className="text-base font-bold tracking-wide text-ohs-navy sm:text-lg">
            OKOTOKS
          </span>
          <span className="text-xs font-semibold tracking-[0.14em] text-ohs-navy/80 sm:text-sm">
            HUMANE SOCIETY
          </span>
        </span>
      ) : null}
    </Link>
  );
}
