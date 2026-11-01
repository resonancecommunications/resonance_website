import { defineArrayMember, defineField, defineType } from 'sanity'
import { requiredString } from '../helpers'

function navList(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'navItem' })],
    validation: (rule) => rule.min(1),
  })
}

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    navList('main', 'Main navigation'),
    defineField({
      name: 'headerCta',
      title: 'Header button',
      type: 'cta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        requiredString('quickLinksHeading', 'Quick links heading'),
        navList('quickLinks', 'Quick links'),
        requiredString('divisionsHeading', 'Divisions heading'),
        navList('divisions', 'Division links'),
        requiredString('contactHeading', 'Contact heading'),
        requiredString('socialHeading', 'Social media heading'),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Navigation' }) },
})
