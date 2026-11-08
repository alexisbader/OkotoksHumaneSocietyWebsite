import {StarIcon} from '@sanity/icons/Star'
import {defineField, defineType} from 'sanity'

export const personalizedDonationPageType = defineType({
  name: 'personalizedDonationPage',
  title: 'Personalized Donation Page',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'Explains how someone can apply for a personalized fundraising page.',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Application email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
  ],
})
