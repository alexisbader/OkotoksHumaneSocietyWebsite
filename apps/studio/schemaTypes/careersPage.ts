import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

export const careersPageType = defineType({
  name: 'careersPage',
  title: 'Careers',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
