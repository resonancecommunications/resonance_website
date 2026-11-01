import { defineField, defineType } from 'sanity'
import { requiredString, requiredText } from '../helpers'

export const eventService = defineType({
  name: 'eventService',
  title: 'Event service',
  type: 'document',
  fields: [
    requiredString('title', 'Title'),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    requiredText('description', 'Description', 3),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description' } },
})
