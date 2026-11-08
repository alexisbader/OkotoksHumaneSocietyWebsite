import { groq } from "next-sanity";

// ---- Home ----

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroHeading,
  heroSubheading,
  buildingImage,
  aboutHeading,
  aboutBody
}`;

// ---- Donate ----

export const sponsorshipsPageQuery = groq`*[_type == "sponsorshipsPage"][0]{ intro }`;

export const sponsorshipPackagesQuery = groq`*[_type == "sponsorshipPackage"] | order(displayOrder asc){
  _id,
  name,
  description,
  price,
  status,
  image
}`;

export const corporatePageQuery = groq`*[_type == "corporatePage"][0]{
  intro,
  eventSponsorship,
  logoSponsorship,
  kennelSponsorship
}`;

export const individualDonationPageQuery = groq`*[_type == "individualDonationPage"][0]{ intro }`;

export const personalizedDonationPageQuery = groq`*[_type == "personalizedDonationPage"][0]{
  intro,
  applicationEmail
}`;

export const wishlistPageQuery = groq`*[_type == "wishlistPage"][0]{
  isAcceptingDonations,
  closedMessage,
  items
}`;

export const fundraisingCampaignBySlugQuery = groq`*[_type == "fundraisingCampaign" && slug.current == $slug && status == "active"][0]{
  title,
  "slug": slug.current,
  occasion,
  organizerName,
  coverImage,
  story,
  goalAmount,
  amountRaised
}`;

// ---- Volunteer ----

export const currentVolunteersPageQuery = groq`*[_type == "currentVolunteersPage"][0]{
  intro,
  volunteerSoftwareUrl
}`;

export const currentOpeningsPageQuery = groq`*[_type == "currentOpeningsPage"][0]{ intro }`;

export const volunteerPositionsListQuery = groq`*[_type == "volunteerPosition" && status == "open"] | order(postedAt desc){
  _id,
  title,
  summary,
  postedAt,
  applicationEmail,
  "slug": slug.current
}`;

// ---- Careers ----

export const careersPageQuery = groq`*[_type == "careersPage"][0]{ intro }`;

export const jobsListQuery = groq`*[_type == "jobPosting"] | order(postedAt desc){
  _id,
  title,
  summary,
  employmentType,
  location,
  postedAt,
  applicationEmail,
  "slug": slug.current
}`;

export const jobBySlugQuery = groq`*[_type == "jobPosting" && slug.current == $slug][0]{
  title,
  applicationEmail
}`;

export const volunteerPositionBySlugQuery = groq`*[_type == "volunteerPosition" && slug.current == $slug][0]{
  title,
  applicationEmail
}`;

// ---- Contact ----

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  intro,
  email
}`;

// ---- Events ----

export const eventsPageQuery = groq`*[_type == "eventsPage"][0]{ intro }`;

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

// ---- News ----

export const newsPageQuery = groq`*[_type == "newsPage"][0]{ intro }`;

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

// ---- Privacy policy ----

export const privacyPolicyPageQuery = groq`*[_type == "privacyPolicyPage"][0]{
  lastUpdated,
  body
}`;

// ---- Site settings ----

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  socialLinks,
  newsletterSignup,
  donationConsentText,
  applicationConsentText
}`;
