import { defineArrayMember, defineField, defineType } from 'sanity'
import { paragraphsField } from '../helpers'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Label',
      type: 'string',
      description: 'Short label shown in the teal Carrier above the headline (optional).',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternativeHeadlines',
      title: 'Alternative headlines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description:
        'For reference only: not shown on the site. Swap one into the headline to use it.',
    }),
    { ...paragraphsField('supportingText', 'Supporting text'), validation: undefined },
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'cta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'cta' }),
    defineField({ name: 'image', title: 'Image (optional)', type: 'brandImage' }),
  ],
})
