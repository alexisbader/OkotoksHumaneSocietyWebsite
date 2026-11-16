import type { Metadata } from "next";
import { Heart, Info } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { getSponsorshipsPage } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Sponsorships",
};

export default async function SponsorshipsPage() {
  const page = await getSponsorshipsPage();

  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6">
      <PageHero title="Sponsorships" />

      {page?.intro?.length ? (
        <div className="max-w-3xl">
          <PortableBody value={page.intro} />
        </div>
      ) : null}

      {page?.whyHeading || page?.whyIntro || page?.whyBenefits?.length ? (
        <section className="space-y-6">
          {page?.whyHeading ? (
            <h2 className="text-2xl font-bold text-ohs-navy sm:text-3xl">{page.whyHeading}</h2>
          ) : null}
          {page?.whyIntro ? (
            <p className="max-w-2xl text-lg text-muted-foreground">{page.whyIntro}</p>
          ) : null}
          {page?.whyBenefits?.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.whyBenefits.map((benefit, index) => (
                <li
                  key={`${benefit.title}-${index}`}
                  className="hover-lift flex flex-col gap-3 rounded-2xl border border-border/80 bg-white p-6 shadow-soft hover:shadow-elevated"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-ohs-sky-soft text-ohs-navy">
                    <Heart className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-ohs-navy">{benefit.title}</h3>
                  {benefit.description ? (
                    <p className="text-base text-muted-foreground">{benefit.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="space-y-6">
        {page?.opportunitiesHeading ? (
          <h2 className="text-2xl font-bold text-ohs-navy sm:text-3xl">
            {page.opportunitiesHeading}
          </h2>
        ) : null}
        {page?.termsNote ? (
          <p className="max-w-2xl text-lg text-muted-foreground">{page.termsNote}</p>
        ) : null}

        <EmptyState
          title="Sponsorship packages coming soon"
          description="Available sponsorship packages, pricing, and live availability will appear here once connected to Supabase."
        />

        {page?.availabilityNote ? (
          <p className="max-w-3xl text-sm text-muted-foreground">{page.availabilityNote}</p>
        ) : null}
      </section>

      {page?.taxReceiptNote ? (
        <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <Info className="size-5 shrink-0 text-amber-600" />
          <p className="text-base text-amber-900">{page.taxReceiptNote}</p>
        </div>
      ) : null}

      {page?.closingHeading || page?.closingBody?.length ? (
        <section className="space-y-4 rounded-2xl border border-border/80 bg-ohs-navy-soft/40 p-6 sm:p-8">
          {page?.closingHeading ? (
            <h2 className="text-2xl font-bold text-ohs-navy">{page.closingHeading}</h2>
          ) : null}
          {page?.closingBody?.length ? <PortableBody value={page.closingBody} /> : null}
        </section>
      ) : null}
    </div>
  );
}
