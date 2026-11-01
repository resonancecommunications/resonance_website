import { defineField, defineType } from 'sanity'
import { requiredString } from '../helpers'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project category',
  type: 'document',
  fields: [
    requiredString('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the Our Work filter URL (?category=slug).',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
