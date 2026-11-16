import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { CompactPortableText, PortableBody } from "@/components/portable-text";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { getCurrentOpeningsPage, getVolunteerPositionsList } from "@/sanity/lib/fetch";

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  closed: "Closed",
};

export const metadata: Metadata = {
  title: "Current Openings",
};

export default async function CurrentOpeningsPage() {
  const [page, positions] = await Promise.all([
    getCurrentOpeningsPage(),
    getVolunteerPositionsList(),
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
                  <span className="shrink-0 text-base font-medium text-ohs-navy underline-offset-4 hover:underline">
                    <span className="group-open:hidden">See more</span>
                    <span className="hidden group-open:inline">See less</span>
                  </span>
                </summary>
                <div className="space-y-5 border-t border-border/80 p-6 pt-5">
                  {position.status ? (
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-ohs-navy">Status:</span>
                      <StatusBadge
                        label={STATUS_LABELS[position.status] || position.status}
                        tone={position.status === "open" ? "positive" : "negative"}
                      />
                    </div>
                  ) : null}
                  {position.postedAt ? (
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-ohs-navy">Posted:</span>{" "}
                      {new Date(position.postedAt).toLocaleDateString()}
                    </p>
                  ) : null}
                  <div>
                    <p className="text-base font-semibold text-ohs-navy">Description:</p>
                    {position.body?.length ? (
                      <PortableBody value={position.body} />
                    ) : (
                      <p className="text-base text-muted-foreground">
                        No additional details yet — add a Body in Sanity Studio.
                      </p>
                    )}
                  </div>
                  {position.applicationInstructions?.length ? (
                    <div>
                      <p className="text-base font-semibold text-ohs-navy">How to apply:</p>
                      <div className="mt-2 rounded-xl border border-border/80 bg-ohs-navy-soft/40 px-4 py-3">
                        <CompactPortableText value={position.applicationInstructions} />
                      </div>
                    </div>
                  ) : null}
                  {position.applicationEmail ? (
                    <Button asChild size="lg">
                      <a
                        href={`mailto:${position.applicationEmail.trim()}?subject=${encodeURIComponent(
                          position.title || "Volunteer application",
                        )}`}
                      >
                        Apply for this position
                      </a>
                    </Button>
                  ) : null}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
