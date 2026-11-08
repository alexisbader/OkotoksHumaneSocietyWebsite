import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buildingImage',
      title: 'Building photo',
      description: 'A picture of the shelter building in its current state.',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About us heading',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About us body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
