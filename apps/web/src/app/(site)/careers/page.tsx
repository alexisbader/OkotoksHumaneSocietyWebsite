import type { Metadata } from "next";

import { ApplyForm } from "@/components/apply-form";
import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { getCareersPage, getJobsList, getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Careers",
};

export default async function CareersPage() {
  const [page, jobs, settings] = await Promise.all([
    getCareersPage(),
    getJobsList(),
    getSiteSettings(),
  ]);

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
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-base text-muted-foreground">
                      {job.employmentType ? <span>{job.employmentType}</span> : null}
                      {job.location ? <span>{job.location}</span> : null}
                      {job.postedAt ? (
                        <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                      ) : null}
                    </div>
                    {job.summary ? (
                      <p className="mt-2 text-base text-muted-foreground">{job.summary}</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-base font-medium text-ohs-navy underline-offset-4 group-open:underline">
                    Apply
                  </span>
                </summary>
                <div className="border-t border-border/80 p-6 pt-5">
                  <ApplyForm
                    kind="job"
                    slug={job.slug}
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
