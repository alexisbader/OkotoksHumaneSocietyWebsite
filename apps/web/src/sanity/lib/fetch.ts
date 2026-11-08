import { client } from "./client";
import { isSanityConfigured } from "../env";
import {
  eventBySlugQuery,
  eventsListQuery,
  homeQuery,
  jobBySlugQuery,
  jobsListQuery,
  newsBySlugQuery,
  newsListQuery,
  pageBySlugQuery,
} from "./queries";

export type PortableBlock = {
  _type: string;
  _key?: string;
  children?: { _type: string; text?: string }[];
  [key: string]: unknown;
};

export type PageDoc = {
  title?: string;
  summary?: string;
  slug?: string;
  body?: PortableBlock[];
};

export type NewsDoc = {
  _id?: string;
  title?: string;
  summary?: string;
  publishedAt?: string;
  slug?: string;
  body?: PortableBlock[];
};

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

export type JobDoc = {
  _id?: string;
  title?: string;
  summary?: string;
  employmentType?: string;
  location?: string;
  postedAt?: string;
  applicationEmail?: string;
  slug?: string;
  body?: PortableBlock[];
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
  return safeFetch<PageDoc | null>(homeQuery, {}, null);
}

export function getPageBySlug(slug: string) {
  return safeFetch<PageDoc | null>(pageBySlugQuery, { slug }, null);
}

export function getNewsList() {
  return safeFetch<NewsDoc[]>(newsListQuery, {}, []);
}

export function getNewsBySlug(slug: string) {
  return safeFetch<NewsDoc | null>(newsBySlugQuery, { slug }, null);
}

export function getEventsList() {
  return safeFetch<EventDoc[]>(eventsListQuery, {}, []);
}

export function getEventBySlug(slug: string) {
  return safeFetch<EventDoc | null>(eventBySlugQuery, { slug }, null);
}

export function getJobsList() {
  return safeFetch<JobDoc[]>(jobsListQuery, {}, []);
}

export function getJobBySlug(slug: string) {
  return safeFetch<JobDoc | null>(jobBySlugQuery, { slug }, null);
}
