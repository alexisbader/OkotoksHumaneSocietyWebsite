import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { getJobsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Jobs",
};

export default async function JobsPage() {
  const jobs = await getJobsList();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
        <p className="text-neutral-600">Open roles and volunteer opportunities.</p>
      </header>

      {jobs.length === 0 ? (
        <EmptyState
          title="No job postings yet"
          description="Add Job posting documents in Sanity Studio to populate this list."
        />
      ) : (
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="border-b border-neutral-200 pb-6 last:border-0"
            >
              <h2 className="text-lg font-medium text-neutral-900">{job.title}</h2>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500">
                {job.employmentType ? <span>{job.employmentType}</span> : null}
                {job.location ? <span>{job.location}</span> : null}
                {job.postedAt ? (
                  <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                ) : null}
              </div>
              {job.summary ? (
                <p className="mt-2 text-sm text-neutral-600">{job.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
