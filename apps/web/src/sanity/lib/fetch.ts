import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";
import { isSanityConfigured } from "../env";
import {
  careersPageQuery,
  contactPageQuery,
  corporatePageQuery,
  currentOpeningsPageQuery,
  currentVolunteersPageQuery,
  eventBySlugQuery,
  eventsListQuery,
  eventsPageQuery,
  fundraisingCampaignBySlugQuery,
  homePageQuery,
  individualDonationPageQuery,
  jobBySlugQuery,
  jobsListQuery,
  newsBySlugQuery,
  newsListQuery,
  newsPageQuery,
  personalizedDonationPageQuery,
  privacyPolicyPageQuery,
  siteSettingsQuery,
  sponsorshipPackagesQuery,
  sponsorshipsPageQuery,
  volunteerPositionBySlugQuery,
  volunteerPositionsListQuery,
  wishlistPageQuery,
} from "./queries";

export type PortableBlock = {
  _type: string;
  _key?: string;
  children?: { _type: string; text?: string }[];
  [key: string]: unknown;
};

type ImageValue = SanityImageSource & { asset?: { _ref?: string } };

export type HomePageDoc = {
  heroHeading?: string;
  heroSubheading?: string;
  buildingImage?: ImageValue;
  aboutHeading?: string;
  aboutBody?: PortableBlock[];
};

export type SponsorshipsPageDoc = { intro?: PortableBlock[] };

export type SponsorshipPackageDoc = {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  status?: "available" | "soldOut";
  image?: ImageValue;
};

export type CorporateSectionDoc = {
  description?: PortableBlock[];
  contactEmail?: string;
};

export type CorporatePageDoc = {
  intro?: PortableBlock[];
  eventSponsorship?: CorporateSectionDoc;
  logoSponsorship?: CorporateSectionDoc;
  kennelSponsorship?: CorporateSectionDoc;
};

export type IndividualDonationPageDoc = { intro?: PortableBlock[] };

export type PersonalizedDonationPageDoc = {
  intro?: PortableBlock[];
  applicationEmail?: string;
};

export type WishlistItem = { itemName?: string; notes?: string };

export type WishlistPageDoc = {
  isAcceptingDonations?: boolean;
  closedMessage?: string;
  items?: WishlistItem[];
};

export type FundraisingCampaignDoc = {
  title?: string;
  slug?: string;
  occasion?: string;
  organizerName?: string;
  coverImage?: ImageValue;
  story?: PortableBlock[];
  goalAmount?: number;
  amountRaised?: number;
};

export type CurrentVolunteersPageDoc = {
  intro?: string;
  volunteerSoftwareUrl?: string;
};

export type CurrentOpeningsPageDoc = { intro?: PortableBlock[] };

export type VolunteerPositionDoc = {
  _id: string;
  title?: string;
  summary?: string;
  postedAt?: string;
  applicationEmail?: string;
  slug?: string;
};

export type CareersPageDoc = { intro?: PortableBlock[] };

export type JobDoc = {
  _id?: string;
  title?: string;
  summary?: string;
  employmentType?: string;
  location?: string;
  postedAt?: string;
  applicationEmail?: string;
  slug?: string;
};

export type ContactPageDoc = {
  intro?: string;
  email?: string;
};

export type EventsPageDoc = { intro?: PortableBlock[] };

export type EventDoc = {
  _id?: string;
  title?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  slug?: string;
  body?: PortableBlock[];
};

export type NewsPageDoc = { intro?: PortableBlock[] };

export type NewsDoc = {
  _id?: string;
  title?: string;
  summary?: string;
  publishedAt?: string;
  slug?: string;
  body?: PortableBlock[];
};

export type PrivacyPolicyPageDoc = {
  lastUpdated?: string;
  body?: PortableBlock[];
};

export type SocialLink = { platform?: string; url?: string };

export type NewsletterSignupDoc = {
  heading?: string;
  description?: string;
  embedHtml?: string;
};

export type SiteSettingsDoc = {
  socialLinks?: SocialLink[];
  newsletterSignup?: NewsletterSignupDoc;
  donationConsentText?: PortableBlock[];
  applicationConsentText?: PortableBlock[];
};

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) {
    return fallback;
  }

  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.warn("[sanity] fetch failed; returning fallback", error);
    return fallback;
  }
}

export function getHomePage() {
  return safeFetch<HomePageDoc | null>(homePageQuery, {}, null);
}

export function getSponsorshipsPage() {
  return safeFetch<SponsorshipsPageDoc | null>(sponsorshipsPageQuery, {}, null);
}

export function getSponsorshipPackages() {
  return safeFetch<SponsorshipPackageDoc[]>(sponsorshipPackagesQuery, {}, []);
}

export function getCorporatePage() {
  return safeFetch<CorporatePageDoc | null>(corporatePageQuery, {}, null);
}

export function getIndividualDonationPage() {
  return safeFetch<IndividualDonationPageDoc | null>(individualDonationPageQuery, {}, null);
}

export function getPersonalizedDonationPage() {
  return safeFetch<PersonalizedDonationPageDoc | null>(personalizedDonationPageQuery, {}, null);
}

export function getWishlistPage() {
  return safeFetch<WishlistPageDoc | null>(wishlistPageQuery, {}, null);
}

export function getFundraisingCampaignBySlug(slug: string) {
  return safeFetch<FundraisingCampaignDoc | null>(fundraisingCampaignBySlugQuery, { slug }, null);
}

export function getCurrentVolunteersPage() {
  return safeFetch<CurrentVolunteersPageDoc | null>(currentVolunteersPageQuery, {}, null);
}

export function getCurrentOpeningsPage() {
  return safeFetch<CurrentOpeningsPageDoc | null>(currentOpeningsPageQuery, {}, null);
}

export function getVolunteerPositionsList() {
  return safeFetch<VolunteerPositionDoc[]>(volunteerPositionsListQuery, {}, []);
}

export function getCareersPage() {
  return safeFetch<CareersPageDoc | null>(careersPageQuery, {}, null);
}

export function getJobsList() {
  return safeFetch<JobDoc[]>(jobsListQuery, {}, []);
}

export function getJobBySlug(slug: string) {
  return safeFetch<Pick<JobDoc, "title" | "applicationEmail"> | null>(
    jobBySlugQuery,
    { slug },
    null,
  );
}

export function getVolunteerPositionBySlug(slug: string) {
  return safeFetch<Pick<VolunteerPositionDoc, "title" | "applicationEmail"> | null>(
    volunteerPositionBySlugQuery,
    { slug },
    null,
  );
}

export function getContactPage() {
  return safeFetch<ContactPageDoc | null>(contactPageQuery, {}, null);
}

export function getEventsPage() {
  return safeFetch<EventsPageDoc | null>(eventsPageQuery, {}, null);
}

export function getEventsList() {
  return safeFetch<EventDoc[]>(eventsListQuery, {}, []);
}

export function getEventBySlug(slug: string) {
  return safeFetch<EventDoc | null>(eventBySlugQuery, { slug }, null);
}

export function getNewsPage() {
  return safeFetch<NewsPageDoc | null>(newsPageQuery, {}, null);
}

export function getNewsList() {
  return safeFetch<NewsDoc[]>(newsListQuery, {}, []);
}

export function getNewsBySlug(slug: string) {
  return safeFetch<NewsDoc | null>(newsBySlugQuery, { slug }, null);
}

export function getPrivacyPolicyPage() {
  return safeFetch<PrivacyPolicyPageDoc | null>(privacyPolicyPageQuery, {}, null);
}

export function getSiteSettings() {
  return safeFetch<SiteSettingsDoc | null>(siteSettingsQuery, {}, null);
}
