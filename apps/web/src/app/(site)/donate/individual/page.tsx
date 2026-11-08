import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFundraisingCampaignBySlug, getIndividualDonationPage } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Individual Giving",
};

type Props = {
  searchParams: Promise<{ campaign?: string }>;
};

export default async function IndividualDonationPage({ searchParams }: Props) {
  const { campaign: campaignSlug } = await searchParams;
  const [page, campaign] = await Promise.all([
    getIndividualDonationPage(),
    campaignSlug ? getFundraisingCampaignBySlug(campaignSlug) : Promise.resolve(null),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <PageHero title="Individual" />
      {page?.intro?.length ? <PortableBody value={page.intro} /> : null}

      {campaign ? (
        <div className="rounded-2xl border border-ohs-sky/50 bg-ohs-sky-soft/60 px-5 py-4">
          <p className="text-base text-ohs-navy">
            You&apos;re giving in support of{" "}
            <span className="font-semibold">{campaign.organizerName}&apos;s fundraiser</span>
            {campaign.title ? ` — ${campaign.title}` : ""}. Your donation will be attributed to
            this campaign.
          </p>
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Online giving coming soon</CardTitle>
          <CardDescription>
            Monthly and one-time donation processing is not wired up yet. This
            page is a clear placeholder so visitors know how to help.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-base text-muted-foreground">
          <p>
            Prefer to reach us directly? Use the contact form and mention
            “donation” in your message — staff will follow up with next steps.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Contact us about giving</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/donate/sponsorships">View sponsorship packages</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
