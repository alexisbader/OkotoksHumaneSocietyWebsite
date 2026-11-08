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
      type: 'array',
      of: [{type: 'block'}],
      description: 'Explains the sponsorship packages and that they are first-come, first-served.',
    }),
  ],
})
