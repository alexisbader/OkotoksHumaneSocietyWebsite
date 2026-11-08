import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Social media links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'X (Twitter)', value: 'x'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'newsletterSignup',
      title: 'Newsletter signup',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Sign up for our newsletter',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'embedHtml',
          title: 'Signup form embed code',
          description: 'Embed/snippet from the newsletter provider (e.g. Mailchimp). Provider TBD.',
          type: 'text',
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: 'donationConsentText',
      title: 'Donation forms privacy/consent text',
      description: 'Shown alongside all donation and payment forms.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'applicationConsentText',
      title: 'Application forms privacy/consent text',
      description: 'Shown alongside volunteer and job application forms.',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
