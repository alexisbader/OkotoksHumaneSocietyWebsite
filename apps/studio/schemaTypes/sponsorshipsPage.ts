import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const sponsorshipsPageType = defineType({
  name: 'sponsorshipsPage',
  title: 'Sponsorships',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'The opening paragraphs explaining the sponsorship program.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'whyHeading',
      title: '"Why become a sponsor?" heading',
      type: 'string',
    }),
    defineField({
      name: 'whyIntro',
      title: '"Why become a sponsor?" intro line',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'whyBenefits',
      title: 'Benefits',
      description: 'One card per benefit, e.g. "Support Animal Welfare", "Build Brand Visibility".',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),
    defineField({
      name: 'opportunitiesHeading',
      title: '"Sponsorship opportunities" heading',
      type: 'string',
    }),
    defineField({
      name: 'termsNote',
      title: 'Sponsorship terms note',
      description:
        'Shown as the subtitle under the heading above — e.g. sponsorship length and what recognition includes.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'availabilityNote',
      title: 'Availability / selection note',
      description: 'First-come-first-served and right-to-decline language.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'taxReceiptNote',
      title: 'Tax receipt note',
      description: 'Shown as a highlighted callout — e.g. a charitable-status/tax-receipt disclaimer.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'closingHeading',
      title: '"Becoming a Sponsor" heading',
      type: 'string',
    }),
    defineField({
      name: 'closingBody',
      title: '"Becoming a Sponsor" body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
