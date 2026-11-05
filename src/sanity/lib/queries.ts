import { groq } from "next-sanity";

export const homeQuery = groq`*[_type == "page" && slug.current == "home"][0]{
  title,
  summary,
  body
}`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  summary,
  "slug": slug.current,
  body
}`;

export const newsListQuery = groq`*[_type == "news"] | order(publishedAt desc){
  _id,
  title,
  summary,
  publishedAt,
  "slug": slug.current
}`;

export const newsBySlugQuery = groq`*[_type == "news" && slug.current == $slug][0]{
  title,
  summary,
  publishedAt,
  "slug": slug.current,
  body
}`;

export const eventsListQuery = groq`*[_type == "event"] | order(startDate asc){
  _id,
  title,
  summary,
  startDate,
  endDate,
  location,
  "slug": slug.current
}`;

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]{
  title,
  summary,
  startDate,
  endDate,
  location,
  "slug": slug.current,
  body
}`;

export const jobsListQuery = groq`*[_type == "jobPosting"] | order(postedAt desc){
  _id,
  title,
  summary,
  employmentType,
  location,
  postedAt,
  "slug": slug.current
}`;

export const jobBySlugQuery = groq`*[_type == "jobPosting" && slug.current == $slug][0]{
  title,
  summary,
  employmentType,
  location,
  postedAt,
  applicationEmail,
  "slug": slug.current,
  body
}`;
