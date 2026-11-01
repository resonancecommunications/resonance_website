import { defineField, defineType } from 'sanity'
import { requiredString, requiredText, stringListField } from '../helpers'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    requiredString('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Anchor (slug)',
      type: 'slug',
      description: 'Used for links like /services#slug.',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    requiredText('summary', 'Summary', 3),
    requiredString('listLabel', 'List label', 'e.g. "Our services include:"'),
    stringListField('items', 'Items'),
    defineField({
      name: 'icon',
      title: 'Icon (optional)',
      type: 'image',
      options: { accept: 'image/svg+xml' },
      description: 'Simple single-colour SVG. Hidden while empty.',
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', order: 'order' },
    prepare: ({ title, order }) => ({
      title,
      subtitle: order ? String(order).padStart(2, '0') : '',
    }),
  },
})
