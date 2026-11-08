import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PortableBody } from "@/components/portable-text";
import { ProgressBar } from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { getFundraisingCampaignBySlug } from "@/sanity/lib/fetch";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await getFundraisingCampaignBySlug(slug);
  return { title: campaign?.title || "Fundraising campaign" };
}

export default async function FundraisingCampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = await getFundraisingCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const coverImageUrl = campaign.coverImage
    ? urlFor(campaign.coverImage).width(1200).height(700).fit("crop").url()
    : null;

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      {coverImageUrl ? (
        <div className="relative aspect-[12/7] w-full overflow-hidden rounded-3xl shadow-elevated">
          <Image
            src={coverImageUrl}
            alt={campaign.title || "Fundraising campaign cover photo"}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
        </div>
      ) : null}

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-ohs-navy sm:text-4xl">
          {campaign.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          Organized by {campaign.organizerName}
        </p>
      </header>

      <ProgressBar raised={campaign.amountRaised ?? 0} goal={campaign.goalAmount} />

      <Button asChild size="lg">
        <Link href={`/donate/individual?campaign=${encodeURIComponent(slug)}`}>
          Donate to this campaign
        </Link>
      </Button>

      <PortableBody value={campaign.story} />
    </article>
  );
}
