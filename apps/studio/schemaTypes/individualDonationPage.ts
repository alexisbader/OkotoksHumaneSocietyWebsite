import {HeartIcon} from '@sanity/icons/Heart'
import {defineField, defineType} from 'sanity'

export const individualDonationPageType = defineType({
  name: 'individualDonationPage',
  title: 'Individual',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      description:
        'Explains the monthly and one-time donation options, and can point donors to the Sponsorships page.',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
