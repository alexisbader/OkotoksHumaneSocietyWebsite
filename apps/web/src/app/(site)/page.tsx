import Image from "next/image";
import Link from "next/link";

import { WaveDivider } from "@/components/brand/wave-divider";
import { Button } from "@/components/ui/button";
import { PortableBody } from "@/components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { getEventsList, getHomePage, getNewsList } from "@/sanity/lib/fetch";
import { isSanityConfigured } from "@/sanity/env";

const waysToHelp = [
  {
    title: "Donate",
    description: "Your gift supports food, medical care, and shelter for animals in need.",
    href: "/donate/individual",
    cta: "Give today",
    image: "/placeholders/community.jpg",
    alt: "Person holding a small dog — temporary placeholder photo",
  },
  {
    title: "Volunteer",
    description: "Lend a hand with events, adoption days, and day-to-day shelter support.",
    href: "/volunteer/openings",
    cta: "See opportunities",
    image: "/placeholders/volunteer.jpg",
    alt: "Happy dog in grass — temporary placeholder photo",
  },
  {
    title: "Careers",
    description: "Join our team — browse open roles at Okotoks Humane Society.",
    href: "/careers",
    cta: "View openings",
    image: "/placeholders/adopt.jpg",
    alt: "Golden retriever resting outdoors — temporary placeholder photo",
  },
] as const;

export default async function HomePage() {
  const [home, news, events] = await Promise.all([
    getHomePage(),
    getNewsList(),
    getEventsList(),
  ]);

  const heroHeading = home?.heroHeading || "Welcome to Okotoks Humane Society";
  const heroSubheading =
    home?.heroSubheading ||
    "We care for animals and help them find loving homes in our community.";
  const buildingImageUrl = home?.buildingImage
    ? urlFor(home.buildingImage).width(1200).height(900).fit("crop").url()
    : null;

  return (
    <div>
      {/* Brand hero — one composition: logo, headline, support, CTAs, dominant image */}
      <section className="hero-mesh relative overflow-hidden pb-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up space-y-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-gradient-sky">{heroHeading}</span>
            </h1>
            <p className="max-w-xl text-lg text-white/85 sm:text-xl">{heroSubheading}</p>
            <div className="animate-fade-up-delay flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/70 bg-white/5 text-white backdrop-blur hover:border-white hover:bg-white/15"
              >
                <Link href="/donate/individual">Donate</Link>
              </Button>
            </div>
            {!isSanityConfigured ? (
              <p className="animate-fade-up-delay-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 backdrop-blur">
                CMS not connected yet — set Sanity env vars to edit this page in
                Studio.
              </p>
            ) : null}
          </div>
          <div className="animate-fade-up-delay relative min-h-[240px] overflow-hidden rounded-3xl shadow-lifted ring-1 ring-white/10 lg:min-h-[380px]">
            <Image
              src={buildingImageUrl || "/placeholders/hero-pets.jpg"}
              alt={
                buildingImageUrl
                  ? "Photo of the Okotoks Humane Society shelter building"
                  : "Two dogs outdoors — temporary placeholder photo until a building photo is added in Sanity"
              }
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <WaveDivider className="absolute bottom-0 left-0 text-ohs-mist" />
      </section>

      {/* About us */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-bold text-ohs-navy">{home?.aboutHeading || "About Us"}</h2>
        {home?.aboutBody?.length ? (
          <div className="mt-4">
            <PortableBody value={home.aboutBody} />
          </div>
        ) : (
          <p className="mt-4 text-lg text-muted-foreground">
            This section is ready for staff to edit in Sanity Studio — open the
            Home document and fill in the About Us body.
          </p>
        )}
      </section>

      {/* Ways to help — one job: invite action */}
      <section className="bg-background px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl font-bold text-ohs-navy">Ways to help</h2>
            <p className="text-lg text-muted-foreground">
              Whether you donate, volunteer, or join our team, you make a difference.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {waysToHelp.map((item) => (
              <article
                key={item.title}
                className="hover-lift group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-4 shadow-soft hover:shadow-elevated"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-ohs-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-base text-muted-foreground">
                  {item.description}
                </p>
                <Button asChild variant="link" className="mt-3 h-auto justify-start px-0 text-base">
                  <Link href={item.href}>{item.cta} →</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider className="bg-ohs-navy-soft text-ohs-sky" />

      {/* News teaser */}
      <section className="bg-ohs-navy-soft px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-3">
            <h2 className="text-3xl font-bold text-ohs-navy">Latest news</h2>
            <p className="text-lg text-muted-foreground">
              Shelter updates and community stories.
            </p>
            <Button asChild variant="outline">
              <Link href="/news">View all news</Link>
            </Button>
          </div>
          <ul className="w-full max-w-xl space-y-4">
            {news.slice(0, 3).length === 0 ? (
              <li className="rounded-2xl border border-dashed border-ohs-sky/40 bg-white/70 px-5 py-6 text-base text-muted-foreground">
                No news posts yet. Add News documents in Sanity Studio to
                populate this list.
              </li>
            ) : (
              news.slice(0, 3).map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="hover-lift block rounded-2xl border border-border/80 bg-white px-5 py-4 shadow-soft transition-shadow hover:shadow-elevated hover:ring-2 hover:ring-ohs-sky/60"
                  >
                    <p className="text-lg font-semibold text-ohs-navy">{item.title}</p>
                    {item.summary ? (
                      <p className="mt-1 text-base text-muted-foreground">{item.summary}</p>
                    ) : null}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      {/* Events teaser */}
      <section className="bg-background px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-ohs-navy">Upcoming events</h2>
              <p className="text-lg text-muted-foreground">
                Join us for fundraisers, adoption days, and community gatherings.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/events">All events</Link>
            </Button>
          </div>
          {events.slice(0, 3).length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-white px-5 py-8 text-base text-muted-foreground">
              No events scheduled yet. Staff can publish Event documents in Studio.
            </p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-3">
              {events.slice(0, 3).map((item) => (
                <li
                  key={item._id}
                  className="hover-lift rounded-2xl border border-border/80 bg-white p-5 shadow-soft hover:shadow-elevated"
                >
                  <p className="text-lg font-semibold text-ohs-navy">{item.title}</p>
                  {item.startDate ? (
                    <p className="mt-2 text-base text-muted-foreground">
                      {new Date(item.startDate).toLocaleString()}
                    </p>
                  ) : null}
                  {item.location ? (
                    <p className="text-base text-muted-foreground">{item.location}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
