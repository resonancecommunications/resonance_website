import { defineField, defineType } from 'sanity'
import { requiredString } from '../helpers'

/** Link from one division page to the other. */
export const crossLink = defineType({
  name: 'crossLink',
  title: 'Division cross-link',
  type: 'object',
  fields: [
    requiredString('eyebrow', 'Eyebrow'),
    requiredString('title', 'Division name'),
    requiredString('headline', 'Headline'),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'headline' } },
})
