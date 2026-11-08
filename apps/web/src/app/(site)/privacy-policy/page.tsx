import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { getPrivacyPolicyPage } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPage();

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <PageHero
        title="Privacy Policy"
        description={
          page?.lastUpdated
            ? `Last updated ${new Date(page.lastUpdated).toLocaleDateString()}`
            : undefined
        }
      />
      {page?.body?.length ? (
        <PortableBody value={page.body} />
      ) : (
        <p className="text-lg text-muted-foreground">
          This page is ready for staff to edit in Sanity Studio — open the
          Privacy Policy document and add the policy text.
        </p>
      )}
    </article>
  );
}
