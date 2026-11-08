import Image from "next/image";
import Link from "next/link";

import { WaveDivider } from "@/components/brand/wave-divider";
import { mainNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-ohs-navy to-ohs-ink text-white">
      <WaveDivider flip className="bg-background text-ohs-sky" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ohs-sky"
          >
            <Image
              src="/ohs-logo.png"
              alt="Okotoks Humane Society logo"
              width={166}
              height={90}
              className="h-14 w-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-wide">OKOTOKS</span>
              <span className="text-sm font-semibold tracking-[0.14em] text-white/85">
                HUMANE SOCIETY
              </span>
            </span>
          </Link>
          <p className="max-w-md text-base text-white/75">
            Caring for animals and connecting them with loving homes in the
            Okotoks community.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ohs-sky-bright">
            Explore
          </p>
          <ul className="grid grid-cols-2 gap-2 text-base">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex min-h-11 items-center rounded-md px-1 text-white/85 transition-colors hover:text-white"
                >
                  <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-ohs-sky-bright">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/60 sm:px-6">
          © Okotoks Humane Society
        </p>
      </div>
    </footer>
  );
}
