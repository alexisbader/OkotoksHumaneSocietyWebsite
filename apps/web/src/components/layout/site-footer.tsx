import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { WaveDivider } from "@/components/brand/wave-divider";
import { NewsletterForm } from "@/components/newsletter-form";
import { getSiteSettings } from "@/sanity/lib/fetch";

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X (Twitter)",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  other: "Follow us",
};

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const socialLinks = (settings?.socialLinks ?? []).filter((link) => link.url);
  const newsletter = settings?.newsletterSignup;

  return (
    <footer className="mt-auto bg-gradient-to-b from-ohs-navy to-ohs-ink text-white">
      <WaveDivider flip className="bg-background text-ohs-sky" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div className="space-y-5">
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
          <p className="max-w-md text-base leading-relaxed text-white/75">
            Caring for animals and connecting them with loving homes in the
            Okotoks community.
          </p>
          {socialLinks.length ? (
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={`${link.platform}-${link.url}`}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-sm text-white/85 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {PLATFORM_LABELS[link.platform ?? "other"] ?? link.platform}
                    <ExternalLink className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-ohs-sky-bright">
            {newsletter?.heading || "Sign up for our newsletter"}
          </p>
          {newsletter?.description ? (
            <p className="text-sm text-white/75">{newsletter.description}</p>
          ) : null}
          {newsletter?.embedHtml ? (
            <div
              className="newsletter-embed"
              dangerouslySetInnerHTML={{ __html: newsletter.embedHtml }}
            />
          ) : (
            <NewsletterForm />
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-sm text-white/60 sm:px-6">
          <p>© Okotoks Humane Society</p>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
