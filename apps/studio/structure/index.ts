import type {StructureBuilder, StructureResolver} from 'sanity/structure'

function singleton(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'homePage', 'Home'),

      S.divider(),

      S.listItem()
        .title('Donate')
        .child(
          S.list()
            .title('Donate')
            .items([
              singleton(S, 'sponsorshipsPage', 'Sponsorships (page)'),
              S.documentTypeListItem('sponsorshipPackage').title('Sponsorship Packages'),
              singleton(S, 'corporatePage', 'Corporate'),
              singleton(S, 'individualDonationPage', 'Individual'),
              singleton(S, 'personalizedDonationPage', 'Personalized Donation Page'),
              S.documentTypeListItem('fundraisingCampaign').title('Fundraising Campaigns'),
              singleton(S, 'wishlistPage', 'Wishlist'),
            ]),
        ),

      S.listItem()
        .title('Volunteer')
        .child(
          S.list()
            .title('Volunteer')
            .items([
              singleton(S, 'currentVolunteersPage', 'Current Volunteers'),
              singleton(S, 'currentOpeningsPage', 'Current Openings (page)'),
              S.documentTypeListItem('volunteerPosition').title('Volunteer Positions'),
            ]),
        ),

      S.listItem()
        .title('Careers')
        .child(
          S.list()
            .title('Careers')
            .items([
              singleton(S, 'careersPage', 'Careers (page)'),
              S.documentTypeListItem('jobPosting').title('Job Postings'),
            ]),
        ),

      singleton(S, 'contactPage', 'Contact Us'),

      S.listItem()
        .title('Events')
        .child(
          S.list()
            .title('Events')
            .items([
              singleton(S, 'eventsPage', 'Events (page)'),
              S.documentTypeListItem('event').title('Events'),
            ]),
        ),

      S.listItem()
        .title('News')
        .child(
          S.list()
            .title('News')
            .items([
              singleton(S, 'newsPage', 'News (page)'),
              S.documentTypeListItem('news').title('News Posts'),
            ]),
        ),

      singleton(S, 'privacyPolicyPage', 'Privacy Policy'),

      S.divider(),

      singleton(S, 'siteSettings', 'Site Settings'),
    ])
