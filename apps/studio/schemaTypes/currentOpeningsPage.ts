import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const currentOpeningsPageType = defineType({
  name: 'currentOpeningsPage',
  title: 'Current Openings',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
