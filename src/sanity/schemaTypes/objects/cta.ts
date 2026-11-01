import { defineField, defineType } from 'sanity'
import { linkFields } from '../helpers'

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    ...linkFields(),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          { title: 'Primary (teal)', value: 'primary' },
          { title: 'Secondary (outlined)', value: 'secondary' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: { title: 'label', path: 'internalPath', url: 'url' },
    prepare: ({ title, path, url }) => ({ title, subtitle: url || path }),
  },
})
