import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PortableBody } from "@/components/portable-text";
import { getEventBySlug } from "@/sanity/lib/fetch";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return {
    title: event?.title || "Event",
    description: event?.summary,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <Link
        href="/events"
        className="inline-flex min-h-11 items-center text-base font-medium text-ohs-navy hover:underline"
      >
        ← Back to events
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-ohs-navy sm:text-4xl">
          {event.title}
        </h1>
        <div className="space-y-1 text-base text-muted-foreground">
          {event.startDate ? <p>Starts: {new Date(event.startDate).toLocaleString()}</p> : null}
          {event.endDate ? <p>Ends: {new Date(event.endDate).toLocaleString()}</p> : null}
          {event.location ? <p>Location: {event.location}</p> : null}
        </div>
        {event.summary ? <p className="text-lg text-muted-foreground">{event.summary}</p> : null}
      </header>
      <PortableBody value={event.body} />
    </article>
  );
}
