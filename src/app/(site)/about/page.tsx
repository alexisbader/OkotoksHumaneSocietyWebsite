import Image from "next/image";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { WaveDivider } from "@/components/brand/wave-divider";
import { getPageBySlug } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  return (
    <div>
      <section className="bg-ohs-navy-soft px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <PageHero
            title={page?.title || "About Okotoks Humane Society"}
            description={
              page?.summary ||
              "We are a community organization dedicated to animal welfare, responsible pet care, and finding forever homes."
            }
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/placeholders/community.jpg"
              alt="Person holding a small dog — temporary placeholder photo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <WaveDivider className="bg-background text-ohs-sky" />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {page?.body?.length ? (
          <PortableBody value={page.body} />
        ) : (
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              This About page is ready for staff to edit in Sanity. Create a Page
              document with slug <code className="rounded bg-ohs-navy-soft px-1.5 py-0.5 text-base text-ohs-navy">about</code>{" "}
              to replace this placeholder copy.
            </p>
            <p>
              Until then, visitors still see a clear, on-brand introduction to who
              we are and how we serve animals and people in Okotoks.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
