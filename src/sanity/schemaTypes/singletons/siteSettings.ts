import { defineField, defineType } from 'sanity'
import { requiredString, stringListField } from '../helpers'

function logoField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'image',
    options: { accept: 'image/svg+xml' },
    description: 'Optional override. Leave empty to use the official file bundled with the site.',
  })
}

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'contact', title: 'Contact details' },
    { name: 'social', title: 'Social media' },
    { name: 'seo', title: 'Default SEO' },
    { name: 'logos', title: 'Brand logos' },
  ],
  fields: [
    { ...requiredString('siteName', 'Site name'), group: 'brand' },
    { ...requiredString('tagline', 'Tagline', 'Shown in the footer.'), group: 'brand' },
    defineField({
      name: 'description',
      title: 'Footer description',
      type: 'text',
      rows: 3,
      group: 'brand',
      validation: (rule) => rule.required(),
    }),
    { ...requiredString('footerStatement', 'Footer statement'), group: 'brand' },
    {
      ...requiredString(
        'brandLine',
        'Brand line',
        'The line on the circular Symbol badge ("Magic from the details"). Used in the badge alt text and default social description.',
      ),
      group: 'brand',
    },
    {
      ...stringListField(
        'brandLineOptions',
        'Brand line options',
        'Approved alternatives, kept here for reference.',
      ),
      group: 'brand',
    },

    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
      description: 'Hidden on the site while empty. Use the international format, e.g. +251 …',
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office address',
      type: 'text',
      rows: 3,
      group: 'contact',
      description:
        'Hidden on the site while empty. Confirm the official address before publishing.',
    }),
    { ...requiredString('location', 'Location', 'e.g. Addis Ababa, Ethiopia'), group: 'contact' },

    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      group: 'social',
      description: 'Each icon appears on the site only once its URL is set.',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
      ],
    }),
    defineField({
      name: 'socialHandle',
      title: 'Social handle',
      type: 'string',
      group: 'social',
      description: 'e.g. @handle. Used for Twitter/X cards when set.',
    }),

    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'titleTemplate',
          title: 'Title template',
          type: 'string',
          description: '%s is replaced by the page title.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Default description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ogImage',
          title: 'Default sharing image',
          type: 'brandImage',
          description: 'Leave empty to use the generated brand image.',
        }),
      ],
    }),

    defineField({
      name: 'logos',
      title: 'Brand logos',
      type: 'object',
      group: 'logos',
      fields: [
        logoField('horizontal', 'Horizontal (for dark backgrounds)'),
        logoField('vertical', 'Vertical (for dark backgrounds)'),
        logoField('symbol', 'Symbol badge (for dark backgrounds)'),
        logoField('mini', 'Mini / RC mark'),
        logoField('bw', 'Black & white'),
        logoField('bwInverted', 'B&W inverted'),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
