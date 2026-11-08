import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { getWishlistPage } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default async function WishlistPage() {
  const page = await getWishlistPage();
  const accepting = Boolean(page?.isAcceptingDonations);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <PageHero title="Wishlist" />

      {accepting ? (
        page?.items?.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {page.items.map((item, index) => (
              <li
                key={`${item.itemName}-${index}`}
                className="rounded-2xl border border-border/80 bg-white p-5 shadow-soft"
              >
                <p className="text-lg font-semibold text-ohs-navy">{item.itemName}</p>
                {item.notes ? (
                  <p className="mt-1 text-base text-muted-foreground">{item.notes}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No wishlist items yet"
            description="Add items in Sanity Studio to list what the shelter currently needs."
          />
        )
      ) : (
        <p className="rounded-2xl border border-dashed border-ohs-sky/50 bg-ohs-sky-soft/60 px-6 py-10 text-center text-lg text-muted-foreground">
          {page?.closedMessage ||
            "We are currently not accepting donations, but please check back closer to shelter opening for a list of acceptable items."}
        </p>
      )}
    </div>
  );
}
