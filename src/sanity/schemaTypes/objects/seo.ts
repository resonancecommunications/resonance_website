import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in search results and browser tabs. Defaults to the page headline.',
      validation: (rule) => rule.max(70).warning('Keep titles under 70 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(170).warning('Keep descriptions under 170 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social sharing image',
      type: 'brandImage',
      description: '1200 × 630 recommended. Defaults to the site sharing image.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
