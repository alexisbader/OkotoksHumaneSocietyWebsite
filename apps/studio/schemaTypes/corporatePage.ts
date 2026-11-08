import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

export const corporatePageType = defineType({
  name: 'corporatePage',
  title: 'Corporate',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'eventSponsorship',
      title: 'Event sponsorship',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'contactEmail',
          title: 'Contact email',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
      ],
    }),
    defineField({
      name: 'logoSponsorship',
      title: 'Website logo sponsorship',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'kennelSponsorship',
      title: 'Room / kennel sponsorship',
      description: 'Links through to the Sponsorships page.',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})
