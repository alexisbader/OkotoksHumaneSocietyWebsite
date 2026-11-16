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
    defineField({
      name: 'waysToHelpHeading',
      title: '"Ways to help" heading',
      type: 'string',
      initialValue: 'Ways to help',
    }),
    defineField({
      name: 'waysToHelpSubheading',
      title: '"Ways to help" subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Whether you donate, volunteer, or join our team, you make a difference.',
    }),
    defineField({
      name: 'waysToHelp',
      title: '"Ways to help" cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'waysToHelpCard',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'Button label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              description: 'Internal path this card links to, e.g. /donate/individual',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'href', media: 'image'},
          },
        },
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'newsSectionHeading',
      title: '"Latest news" heading',
      type: 'string',
      initialValue: 'Latest news',
    }),
    defineField({
      name: 'newsSectionSubheading',
      title: '"Latest news" subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Shelter updates and community stories.',
    }),
    defineField({
      name: 'eventsSectionHeading',
      title: '"Upcoming events" heading',
      type: 'string',
      initialValue: 'Upcoming events',
    }),
    defineField({
      name: 'eventsSectionSubheading',
      title: '"Upcoming events" subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Join us for fundraisers, adoption days, and community gatherings.',
    }),
  ],
})
