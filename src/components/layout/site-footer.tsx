import Image from "next/image";
import Link from "next/link";

import { WaveDivider } from "@/components/brand/wave-divider";
import { mainNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ohs-navy text-white">
      <WaveDivider flip className="bg-background text-ohs-sky" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ohs-sky"
          >
            <Image
              src="/ohs-logo.png"
              alt="Okotoks Humane Society logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-white p-1"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-wide">OKOTOKS</span>
              <span className="text-sm font-semibold tracking-[0.14em] text-white/85">
                HUMANE SOCIETY
              </span>
            </span>
          </Link>
          <p className="max-w-md text-base text-white/85">
            Caring for animals and connecting them with loving homes in the
            Okotoks community.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ohs-sky">
            Explore
          </p>
          <ul className="grid grid-cols-2 gap-2 text-base">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md px-1 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/studio"
                className="inline-flex min-h-11 items-center rounded-md px-1 text-white/70 hover:underline"
              >
                Studio
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/70 sm:px-6">
          © Okotoks Humane Society
        </p>
      </div>
    </footer>
  );
}
