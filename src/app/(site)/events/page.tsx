import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { getEventsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await getEventsList();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <PageHero
        title="Events"
        description="Upcoming and past community events, adoption days, and fundraisers."
      />

      {events.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="Add Event documents in Sanity Studio to populate this calendar-style list."
        />
      ) : (
        <ul className="space-y-6">
          {events.map((event) => (
            <li
              key={event._id}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-ohs-navy">{event.title}</h2>
              <div className="mt-2 space-y-1 text-base text-muted-foreground">
                {event.startDate ? (
                  <p>Starts: {new Date(event.startDate).toLocaleString()}</p>
                ) : null}
                {event.endDate ? (
                  <p>Ends: {new Date(event.endDate).toLocaleString()}</p>
                ) : null}
                {event.location ? <p>Location: {event.location}</p> : null}
              </div>
              {event.summary ? (
                <p className="mt-3 text-base text-muted-foreground">{event.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
