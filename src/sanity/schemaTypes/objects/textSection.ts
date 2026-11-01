import { defineField, defineType } from 'sanity'
import { paragraphsField } from '../helpers'

/** Section heading (eyebrow, headline) with body paragraphs and an optional CTA. */
export const textSection = defineType({
  name: 'textSection',
  title: 'Text section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    paragraphsField('body', 'Body'),
    defineField({ name: 'cta', title: 'CTA (optional)', type: 'cta' }),
  ],
  preview: { select: { title: 'headline', subtitle: 'eyebrow' } },
})
