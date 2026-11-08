import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const volunteerPositionType = defineType({
  name: 'volunteerPosition',
  title: 'Volunteer position',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closed', value: 'closed'},
        ],
        layout: 'radio',
      },
      initialValue: 'open',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted at',
      type: 'datetime',
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Application email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  orderings: [
    {
      title: 'Posted date, newest',
      name: 'postedAtDesc',
      by: [{field: 'postedAt', direction: 'desc'}],
    },
  ],
})
