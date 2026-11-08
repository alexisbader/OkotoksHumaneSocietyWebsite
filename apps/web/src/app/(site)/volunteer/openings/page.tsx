import type { Metadata } from "next";

import { ApplyForm } from "@/components/apply-form";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import {
  getCurrentOpeningsPage,
  getSiteSettings,
  getVolunteerPositionsList,
} from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Current Openings",
};

export default async function CurrentOpeningsPage() {
  const [page, positions, settings] = await Promise.all([
    getCurrentOpeningsPage(),
    getVolunteerPositionsList(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero title="Current Openings" />
      {page?.intro?.length ? <PortableBody value={page.intro} /> : null}

      {positions.length === 0 ? (
        <EmptyState
          title="No volunteer openings right now"
          description="Add open Volunteer Position documents in Sanity Studio to list them here."
        />
      ) : (
        <ul className="space-y-4">
          {positions.map((position) => (
            <li
              key={position._id}
              className="rounded-2xl border border-border/80 bg-white shadow-soft"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-xl font-semibold text-ohs-navy">{position.title}</h2>
                    {position.summary ? (
                      <p className="mt-1 text-base text-muted-foreground">{position.summary}</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-base font-medium text-ohs-navy underline-offset-4 group-open:underline">
                    Apply
                  </span>
                </summary>
                <div className="border-t border-border/80 p-6 pt-5">
                  <ApplyForm
                    kind="volunteer"
                    slug={position.slug}
                    submitLabel="Submit application"
                    consentText={settings?.applicationConsentText}
                  />
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
