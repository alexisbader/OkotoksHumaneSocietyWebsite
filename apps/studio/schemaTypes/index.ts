import {careersPageType} from './careersPage'
import {contactPageType} from './contactPage'
import {corporatePageType} from './corporatePage'
import {currentOpeningsPageType} from './currentOpeningsPage'
import {currentVolunteersPageType} from './currentVolunteersPage'
import {eventType} from './event'
import {eventsPageType} from './eventsPage'
import {fundraisingCampaignType} from './fundraisingCampaign'
import {homePageType} from './homePage'
import {individualDonationPageType} from './individualDonationPage'
import {jobPostingType} from './jobPosting'
import {newsType} from './news'
import {newsPageType} from './newsPage'
import {personalizedDonationPageType} from './personalizedDonationPage'
import {privacyPolicyPageType} from './privacyPolicyPage'
import {siteSettingsType} from './siteSettings'
import {sponsorshipPackageType} from './sponsorshipPackage'
import {sponsorshipsPageType} from './sponsorshipsPage'
import {volunteerPositionType} from './volunteerPosition'
import {wishlistPageType} from './wishlistPage'

export const schemaTypes = [
  // Singleton pages
  homePageType,
  sponsorshipsPageType,
  corporatePageType,
  individualDonationPageType,
  personalizedDonationPageType,
  wishlistPageType,
  currentVolunteersPageType,
  currentOpeningsPageType,
  careersPageType,
  contactPageType,
  eventsPageType,
  newsPageType,
  privacyPolicyPageType,
  siteSettingsType,

  // Collections
  sponsorshipPackageType,
  fundraisingCampaignType,
  volunteerPositionType,
  jobPostingType,
  eventType,
  newsType,
]

export const SINGLETON_TYPES = [
  'homePage',
  'sponsorshipsPage',
  'corporatePage',
  'individualDonationPage',
  'personalizedDonationPage',
  'wishlistPage',
  'currentVolunteersPage',
  'currentOpeningsPage',
  'careersPage',
  'contactPage',
  'eventsPage',
  'newsPage',
  'privacyPolicyPage',
  'siteSettings',
]
