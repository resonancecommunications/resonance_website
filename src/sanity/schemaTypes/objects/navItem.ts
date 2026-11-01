import { defineField, defineType } from 'sanity'
import { linkFields } from '../helpers'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    ...linkFields(),
  ],
  preview: {
    select: { title: 'label', path: 'internalPath', url: 'url' },
    prepare: ({ title, path, url }) => ({ title, subtitle: url || path }),
  },
})
