import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { getCurrentVolunteersPage } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Current Volunteers",
};

export default async function CurrentVolunteersPage() {
  const page = await getCurrentVolunteersPage();

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 sm:px-6">
      <PageHero title="Current Volunteers" description={page?.intro} />
      {page?.volunteerSoftwareUrl ? (
        <Button asChild size="lg">
          <a href={page.volunteerSoftwareUrl} target="_blank" rel="noreferrer noopener">
            Go to volunteer management portal
          </a>
        </Button>
      ) : (
        <p className="rounded-2xl border border-dashed border-ohs-sky/50 bg-ohs-sky-soft/60 px-6 py-10 text-center text-lg text-muted-foreground">
          The volunteer management portal link hasn&apos;t been added yet. Staff
          can add it to the Current Volunteers page in Sanity Studio.
        </p>
      )}
    </div>
  );
}
