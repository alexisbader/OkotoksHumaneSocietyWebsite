import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortableBody } from "@/components/portable-text";
import { getHomePage, getNewsList, getEventsList } from "@/sanity/lib/fetch";
import { isSanityConfigured } from "@/sanity/env";

export default async function HomePage() {
  const [home, news, events] = await Promise.all([
    getHomePage(),
    getNewsList(),
    getEventsList(),
  ]);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
          {home?.title || "Okotoks Humane Society"}
        </h1>
        <p className="max-w-2xl text-lg text-neutral-600">
          {home?.summary ||
            "Website scaffold — connect Sanity to edit this home page, news, events, and jobs."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/studio">Open Studio</Link>
          </Button>
        </div>
        {!isSanityConfigured ? (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Sanity is not configured yet. Set{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SANITY_DATASET</code> in{" "}
            <code className="font-mono text-xs">.env.local</code>.
          </p>
        ) : null}
      </section>

      {home?.body?.length ? (
        <section>
          <PortableBody value={home.body} />
        </section>
      ) : null}

      <section className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest news</CardTitle>
            <CardDescription>Recent updates from Sanity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {news.slice(0, 3).length === 0 ? (
              <p className="text-sm text-neutral-500">No news posts yet.</p>
            ) : (
              news.slice(0, 3).map((item) => (
                <Link
                  key={item._id}
                  href={`/news/${item.slug}`}
                  className="block text-sm font-medium text-neutral-900 hover:underline"
                >
                  {item.title}
                </Link>
              ))
            )}
            <Button asChild variant="link" className="h-auto px-0">
              <Link href="/news">View all news</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming events</CardTitle>
            <CardDescription>Community calendar entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.slice(0, 3).length === 0 ? (
              <p className="text-sm text-neutral-500">No events yet.</p>
            ) : (
              events.slice(0, 3).map((item) => (
                <div key={item._id} className="text-sm">
                  <p className="font-medium text-neutral-900">{item.title}</p>
                  {item.startDate ? (
                    <p className="text-neutral-500">
                      {new Date(item.startDate).toLocaleString()}
                    </p>
                  ) : null}
                </div>
              ))
            )}
            <Button asChild variant="link" className="h-auto px-0">
              <Link href="/events">View all events</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
