import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCorporatePage } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Corporate Giving",
};

export default async function CorporatePage() {
  const page = await getCorporatePage();

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero title="Corporate" />
      {page?.intro?.length ? <PortableBody value={page.intro} /> : null}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Event sponsorship</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {page?.eventSponsorship?.description?.length ? (
              <PortableBody value={page.eventSponsorship.description} />
            ) : (
              <p className="text-base text-muted-foreground">
                This section is ready for staff to edit in Sanity Studio.
              </p>
            )}
            {page?.eventSponsorship?.contactEmail ? (
              <Button asChild size="sm" variant="outline">
                <a href={`mailto:${page.eventSponsorship.contactEmail}`}>Email us</a>
              </Button>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website logo sponsorship</CardTitle>
          </CardHeader>
          <CardContent>
            {page?.logoSponsorship?.description?.length ? (
              <PortableBody value={page.logoSponsorship.description} />
            ) : (
              <p className="text-base text-muted-foreground">
                This section is ready for staff to edit in Sanity Studio.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room / kennel sponsorship</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {page?.kennelSponsorship?.description?.length ? (
              <PortableBody value={page.kennelSponsorship.description} />
            ) : (
              <p className="text-base text-muted-foreground">
                This section is ready for staff to edit in Sanity Studio.
              </p>
            )}
            <Button asChild size="sm" variant="outline">
              <Link href="/donate/sponsorships">View sponsorship packages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
