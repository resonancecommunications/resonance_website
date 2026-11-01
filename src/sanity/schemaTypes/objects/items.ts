import { defineField, defineType } from 'sanity'
import { paragraphsField, requiredString, requiredText, stringListField } from '../helpers'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [requiredString('title', 'Title'), requiredText('description', 'Description', 2)],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Value',
  type: 'object',
  fields: [requiredString('title', 'Title'), requiredText('description', 'Description', 2)],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

/** One of the two division cards on the Home page. */
export const division = defineType({
  name: 'division',
  title: 'Division',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Division',
      type: 'string',
      options: {
        list: [
          { title: 'Resonance Events', value: 'events' },
          { title: 'Resonance Media & Communications', value: 'media' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    requiredString('number', 'Number', 'e.g. 01'),
    requiredString('title', 'Division name'),
    requiredString('headline', 'Headline'),
    requiredText('body', 'Body', 4),
    requiredString('servicesLabel', 'Services label'),
    stringListField('services', 'Services'),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'headline' } },
})

/** Capability section on the Media & Communications page. */
export const capabilitySection = defineType({
  name: 'capabilitySection',
  title: 'Capability section',
  type: 'object',
  fields: [
    requiredString('eyebrow', 'Section name'),
    requiredString('headline', 'Headline'),
    paragraphsField('body', 'Body'),
    requiredString('listLabel', 'List label', 'e.g. "Services:"'),
    stringListField('items', 'Items'),
  ],
  preview: { select: { title: 'eyebrow', subtitle: 'headline' } },
})
