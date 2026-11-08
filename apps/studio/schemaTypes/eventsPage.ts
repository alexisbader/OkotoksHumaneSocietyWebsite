import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'

export const eventsPageType = defineType({
  name: 'eventsPage',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
