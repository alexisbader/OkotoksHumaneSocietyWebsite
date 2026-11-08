import {PackageIcon} from '@sanity/icons/Package'
import {defineField, defineType} from 'sanity'

export const sponsorshipPackageType = defineType({
  name: 'sponsorshipPackage',
  title: 'Sponsorship package',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Sold out', value: 'soldOut'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      description: 'Lower numbers are shown first.',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'status', media: 'image'},
  },
})
