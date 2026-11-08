import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { getJobsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Jobs",
};

export default async function JobsPage() {
  const jobs = await getJobsList();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero
        title="Jobs & volunteering"
        description="Open roles and volunteer opportunities at Okotoks Humane Society."
      />

      {jobs.length === 0 ? (
        <EmptyState
          title="No openings listed"
          description="Add Job posting documents in Sanity Studio when roles or volunteer needs are available."
        />
      ) : (
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="hover-lift rounded-2xl border border-border/80 bg-white p-6 shadow-soft hover:shadow-elevated"
            >
              <h2 className="text-xl font-semibold text-ohs-navy">{job.title}</h2>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-base text-muted-foreground">
                {job.employmentType ? <span>{job.employmentType}</span> : null}
                {job.location ? <span>{job.location}</span> : null}
                {job.postedAt ? (
                  <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                ) : null}
              </div>
              {job.summary ? (
                <p className="mt-3 text-base text-muted-foreground">{job.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
