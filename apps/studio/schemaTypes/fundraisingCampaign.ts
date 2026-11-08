import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'
import {defineField, defineType} from 'sanity'

export const fundraisingCampaignType = defineType({
  name: 'fundraisingCampaign',
  title: 'Fundraising campaign',
  type: 'document',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Campaign title',
      description: 'Shown publicly, e.g. "Jane\'s Birthday Fundraiser".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used to build the unique shareable link for this campaign.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = context.document?._id?.replace(/^drafts\./, '')
          const existing = await client.fetch(
            `count(*[_type == "fundraisingCampaign" && slug.current == $slug && _id != $id && !(_id in path("drafts.**"))])`,
            {slug: slug.current, id},
          )
          return existing === 0 || 'A campaign with this slug already exists'
        }),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending approval', value: 'pendingApproval'},
          {title: 'Active', value: 'active'},
          {title: 'Inactive', value: 'inactive'},
        ],
        layout: 'radio',
      },
      initialValue: 'pendingApproval',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'occasion',
      title: 'Occasion',
      type: 'string',
      options: {
        list: [
          {title: 'Birthday', value: 'birthday'},
          {title: 'Wedding', value: 'wedding'},
          {title: 'Memorial', value: 'memorial'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'organizerName',
      title: 'Organizer name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organizerEmail',
      title: 'Organizer email',
      description: 'Used for private contact and so the organizer can view their total raised. Not displayed publicly.',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'story',
      title: 'Story',
      description: 'Shown on the campaign page.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'goalAmount',
      title: 'Goal amount',
      type: 'number',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'amountRaised',
      title: 'Amount raised',
      description: 'Updated as donations come in through this campaign\'s link.',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'status', media: 'coverImage'},
  },
})
