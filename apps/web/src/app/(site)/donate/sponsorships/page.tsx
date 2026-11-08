import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { PortableBody } from "@/components/portable-text";
import { StatusBadge } from "@/components/status-badge";
import { urlFor } from "@/sanity/lib/image";
import { getSponsorshipPackages, getSponsorshipsPage } from "@/sanity/lib/fetch";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sponsorships",
};

export default async function SponsorshipsPage() {
  const [page, packages] = await Promise.all([getSponsorshipsPage(), getSponsorshipPackages()]);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero title="Sponsorships" />
      {page?.intro?.length ? (
        <div className="max-w-3xl">
          <PortableBody value={page.intro} />
        </div>
      ) : null}

      {packages.length === 0 ? (
        <EmptyState
          title="No sponsorship packages yet"
          description="Add Sponsorship Package documents in Sanity Studio to list them here, first-come, first-served."
        />
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => {
            const soldOut = pkg.status === "soldOut";
            const imageUrl = pkg.image ? urlFor(pkg.image).width(640).height(400).fit("crop").url() : null;
            return (
              <li
                key={pkg._id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft"
              >
                {imageUrl ? (
                  <div className="relative aspect-[8/5] w-full">
                    <Image
                      src={imageUrl}
                      alt={pkg.name || "Sponsorship package"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-semibold text-ohs-navy">{pkg.name}</h2>
                    <StatusBadge
                      label={soldOut ? "Sold out" : "Available"}
                      tone={soldOut ? "negative" : "positive"}
                    />
                  </div>
                  {typeof pkg.price === "number" ? (
                    <p className="text-lg font-semibold text-ohs-navy">
                      {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
                        pkg.price,
                      )}
                    </p>
                  ) : null}
                  {pkg.description ? (
                    <p className="flex-1 text-base text-muted-foreground">{pkg.description}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
