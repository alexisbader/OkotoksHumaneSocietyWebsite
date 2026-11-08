import {DocumentIcon} from '@sanity/icons/Document'
import {defineField, defineType} from 'sanity'

export const privacyPolicyPageType = defineType({
  name: 'privacyPolicyPage',
  title: 'Privacy Policy',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
