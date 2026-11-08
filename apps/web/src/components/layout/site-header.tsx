"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useCloseOnPathChange(pathname: string, close: () => void) {
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    close();
  }
}

import { SiteLogo } from "@/components/brand/site-logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useCloseOnPathChange(pathname, () => {
    setOpen(false);
    setOpenIndex(null);
  });

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 shadow-[0_1px_0_rgba(5,32,51,0.04),0_12px_30px_-20px_rgba(5,32,51,0.35)] backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <SiteLogo priority showWordmark={false} className="[&_img]:h-14 [&_img]:w-auto sm:[&_img]:h-16 sm:[&_img]:w-auto" />

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item, index) => {
            const active = isActive(pathname, item.href);

            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative min-h-11 rounded-full px-4 py-2 text-base font-medium text-ohs-navy transition-colors hover:bg-ohs-navy-soft",
                    active && "bg-ohs-navy-soft font-semibold text-ohs-navy",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            const expanded = openIndex === index;

            return (
              <div key={item.href} className="relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={expanded}
                  onClick={() => setOpenIndex(expanded ? null : index)}
                  className={cn(
                    "relative flex min-h-11 items-center gap-1 rounded-full px-4 py-2 text-base font-medium text-ohs-navy transition-colors hover:bg-ohs-navy-soft",
                    (active || expanded) && "bg-ohs-navy-soft font-semibold text-ohs-navy",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
                </button>
                {expanded ? (
                  <div className="absolute left-0 top-full z-50 mt-1 min-w-56 overflow-hidden rounded-2xl border border-border/80 bg-white p-1.5 shadow-elevated">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block min-h-11 rounded-xl px-3 py-2.5 text-base text-ohs-navy transition-colors hover:bg-ohs-navy-soft",
                          isActive(pathname, child.href) && "bg-ohs-navy-soft font-semibold",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
            <Link href="/donate/individual">Donate</Link>
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
          className="animate-fade-up border-t border-border bg-white/95 px-4 py-3 backdrop-blur lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-12 items-center rounded-xl px-3 text-lg font-medium text-ohs-navy transition-colors hover:bg-ohs-navy-soft",
                    isActive(pathname, item.href) && "bg-ohs-navy-soft font-semibold",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="ml-3 flex flex-col gap-1 border-l border-border/80 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "flex min-h-11 items-center rounded-xl px-3 text-base text-ohs-navy/90 transition-colors hover:bg-ohs-navy-soft",
                            isActive(pathname, child.href) && "bg-ohs-navy-soft font-semibold",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
