import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const currentVolunteersPageType = defineType({
  name: 'currentVolunteersPage',
  title: 'Current Volunteers',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'volunteerSoftwareUrl',
      title: 'Volunteer management software link',
      type: 'url',
    }),
  ],
})
