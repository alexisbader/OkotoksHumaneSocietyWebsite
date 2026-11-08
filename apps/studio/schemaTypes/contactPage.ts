import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineField, defineType} from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Us',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
  ],
})
