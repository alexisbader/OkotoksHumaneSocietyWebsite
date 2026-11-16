import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { CompactPortableText, PortableBody } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { getCareersPage, getJobsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Careers",
};

export default async function CareersPage() {
  const [page, jobs] = await Promise.all([getCareersPage(), getJobsList()]);

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero title="Careers" />
      {page?.intro?.length ? <PortableBody value={page.intro} /> : null}

      {jobs.length === 0 ? (
        <EmptyState
          title="No openings listed"
          description="Add Job posting documents in Sanity Studio when roles are available."
        />
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="rounded-2xl border border-border/80 bg-white shadow-soft">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-xl font-semibold text-ohs-navy">{job.title}</h2>
                    {job.summary ? (
                      <p className="mt-1 text-base text-muted-foreground">{job.summary}</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-base font-medium text-ohs-navy underline-offset-4 hover:underline">
                    <span className="group-open:hidden">See more</span>
                    <span className="hidden group-open:inline">See less</span>
                  </span>
                </summary>
                <div className="space-y-5 border-t border-border/80 p-6 pt-5">
                  {job.employmentType ? (
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-ohs-navy">Type:</span>{" "}
                      {job.employmentType}
                    </p>
                  ) : null}
                  {job.location ? (
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-ohs-navy">Location:</span>{" "}
                      {job.location}
                    </p>
                  ) : null}
                  {job.postedAt ? (
                    <p className="text-base text-muted-foreground">
                      <span className="font-semibold text-ohs-navy">Posted:</span>{" "}
                      {new Date(job.postedAt).toLocaleDateString()}
                    </p>
                  ) : null}
                  <div>
                    <p className="text-base font-semibold text-ohs-navy">Description:</p>
                    {job.body?.length ? (
                      <PortableBody value={job.body} />
                    ) : (
                      <p className="text-base text-muted-foreground">
                        No additional details yet — add a Body in Sanity Studio.
                      </p>
                    )}
                  </div>
                  {job.applicationInstructions?.length ? (
                    <div>
                      <p className="text-base font-semibold text-ohs-navy">How to apply:</p>
                      <div className="mt-2 rounded-xl border border-border/80 bg-ohs-navy-soft/40 px-4 py-3">
                        <CompactPortableText value={job.applicationInstructions} />
                      </div>
                    </div>
                  ) : null}
                  {job.applicationEmail ? (
                    <Button asChild size="lg">
                      <a
                        href={`mailto:${job.applicationEmail.trim()}?subject=${encodeURIComponent(
                          job.title || "Job application",
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
