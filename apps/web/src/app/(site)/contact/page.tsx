import Image from "next/image";
import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SocialIcon } from "@/components/brand/social-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getContactPage, getSiteSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Contact",
};

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X (Twitter)",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  other: "Follow us",
};

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  const socialLinks = (settings?.socialLinks ?? []).filter((link) => link.url);
  const photoUrl = page?.photo
    ? urlFor(page.photo).width(800).height(600).fit("crop").url()
    : "/placeholders/community.jpg";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="space-y-8">
          <PageHero title="Contact Us" description={page?.intro} />

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
            <Image
              src={photoUrl}
              alt={
                page?.photo
                  ? "Okotoks Humane Society"
                  : "Person holding a small dog — temporary placeholder photo"
              }
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {page?.email ? (
            <a
              href={`mailto:${page.email}`}
              className="hover-lift flex items-center gap-4 rounded-2xl border border-border/80 bg-white p-5 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ohs-sky-soft text-ohs-navy">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Email us
                </span>
                <span className="block text-lg font-semibold text-ohs-navy">{page.email}</span>
              </span>
            </a>
          ) : null}

          {socialLinks.length ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Follow along
              </p>
              <ul className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <li key={`${link.platform}-${link.url}`}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex size-10 items-center justify-center rounded-full bg-ohs-sky-soft text-ohs-navy shadow-soft transition-colors hover:bg-ohs-sky"
                    >
                      <span className="sr-only">
                        {PLATFORM_LABELS[link.platform ?? "other"] ?? link.platform}
                      </span>
                      <SocialIcon platform={link.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We aim to respond as soon as we can.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
