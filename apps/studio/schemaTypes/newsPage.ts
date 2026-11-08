import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const newsPageType = defineType({
  name: 'newsPage',
  title: 'News',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
