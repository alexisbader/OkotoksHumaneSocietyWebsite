"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { SiteLogo } from "@/components/brand/site-logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <SiteLogo priority showWordmark={false} className="[&_img]:h-14 [&_img]:w-14 sm:[&_img]:h-16 sm:[&_img]:w-16" />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "min-h-11 rounded-md px-3 py-2 text-base font-medium text-ohs-navy transition-colors hover:bg-ohs-navy-soft",
                  active && "bg-ohs-navy-soft font-semibold",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
            <Link href="/donate">Donate</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-white px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex min-h-12 items-center rounded-md px-3 text-lg font-medium text-ohs-navy hover:bg-ohs-navy-soft",
                      active && "bg-ohs-navy-soft font-semibold",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
