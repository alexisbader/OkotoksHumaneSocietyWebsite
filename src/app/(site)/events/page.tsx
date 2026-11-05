import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { getEventsList } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await getEventsList();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
        <p className="text-neutral-600">Upcoming and past community events.</p>
      </header>

      {events.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="Add Event documents in Sanity Studio to populate this list."
        />
      ) : (
        <ul className="space-y-6">
          {events.map((event) => (
            <li
              key={event._id}
              className="border-b border-neutral-200 pb-6 last:border-0"
            >
              <h2 className="text-lg font-medium text-neutral-900">{event.title}</h2>
              <div className="mt-1 space-y-1 text-sm text-neutral-500">
                {event.startDate ? (
                  <p>Starts: {new Date(event.startDate).toLocaleString()}</p>
                ) : null}
                {event.endDate ? (
                  <p>Ends: {new Date(event.endDate).toLocaleString()}</p>
                ) : null}
                {event.location ? <p>Location: {event.location}</p> : null}
              </div>
              {event.summary ? (
                <p className="mt-2 text-sm text-neutral-600">{event.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
