import { defineField, defineType } from 'sanity'

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'CTA banner',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'cta' }),
  ],
  preview: { select: { title: 'headline' } },
})
