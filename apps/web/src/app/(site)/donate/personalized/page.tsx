import type { Metadata } from "next";

import { ApplyForm } from "@/components/apply-form";
import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalizedDonationPage, getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Personalized Donation Page",
};

export default async function PersonalizedDonationPage() {
  const [page, settings] = await Promise.all([getPersonalizedDonationPage(), getSiteSettings()]);

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 sm:px-6">
      <PageHero title="Personalized Donation Page" />
      {page?.intro?.length ? (
        <PortableBody value={page.intro} />
      ) : (
        <p className="text-lg text-muted-foreground">
          Set up a private, shareable fundraising page for a birthday, wedding,
          memorial, or other occasion. Once approved, donations made through
          your unique link are tracked and attributed to your campaign.
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Apply for a personalized fundraising page</CardTitle>
          <CardDescription>
            Tell us about your occasion and we&apos;ll follow up to set up your
            campaign and shareable link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplyForm
            kind="personalizedDonation"
            messageLabel="Tell us about your occasion and fundraising goal"
            submitLabel="Apply"
            consentText={settings?.applicationConsentText}
          />
        </CardContent>
      </Card>
    </div>
  );
}
