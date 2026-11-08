import {PackageIcon} from '@sanity/icons/Package'
import {defineField, defineType} from 'sanity'

export const wishlistPageType = defineType({
  name: 'wishlistPage',
  title: 'Wishlist',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'isAcceptingDonations',
      title: 'Currently accepting supply donations',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'closedMessage',
      title: 'Message shown while not accepting donations',
      type: 'text',
      rows: 3,
      initialValue:
        'We are currently not accepting donations, but please check back closer to shelter opening for a list of acceptable items.',
      hidden: ({document}) => Boolean(document?.isAcceptingDonations),
    }),
    defineField({
      name: 'items',
      title: 'Wishlist items',
      type: 'array',
      hidden: ({document}) => !document?.isAcceptingDonations,
      of: [
        {
          type: 'object',
          name: 'wishlistItem',
          fields: [
            defineField({
              name: 'itemName',
              title: 'Item',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),
  ],
})
