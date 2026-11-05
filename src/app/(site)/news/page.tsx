import Link from "next/link";
import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { getNewsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsIndexPage() {
  const news = await getNewsList();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero
        title="News"
        description="Updates and announcements from Okotoks Humane Society."
      />

      {news.length === 0 ? (
        <EmptyState
          title="No news yet"
          description="Add News documents in Sanity Studio to populate this list. Placeholder layout stays on-brand until then."
        />
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {news.map((item) => (
            <li key={item._id} className="py-6">
              <Link
                href={`/news/${item.slug}`}
                className="text-xl font-semibold text-ohs-navy hover:underline"
              >
                {item.title}
              </Link>
              {item.publishedAt ? (
                <p className="mt-1 text-base text-muted-foreground">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              ) : null}
              {item.summary ? (
                <p className="mt-2 text-base text-muted-foreground">{item.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
