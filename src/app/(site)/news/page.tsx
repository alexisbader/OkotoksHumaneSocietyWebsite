import Link from "next/link";
import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { getNewsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsIndexPage() {
  const news = await getNewsList();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">News</h1>
        <p className="text-neutral-600">Updates and announcements.</p>
      </header>

      {news.length === 0 ? (
        <EmptyState
          title="No news yet"
          description="Add News documents in Sanity Studio to populate this list."
        />
      ) : (
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {news.map((item) => (
            <li key={item._id} className="py-5">
              <Link
                href={`/news/${item.slug}`}
                className="text-lg font-medium text-neutral-900 hover:underline"
              >
                {item.title}
              </Link>
              {item.publishedAt ? (
                <p className="mt-1 text-sm text-neutral-500">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              ) : null}
              {item.summary ? (
                <p className="mt-2 text-sm text-neutral-600">{item.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
