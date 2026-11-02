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

export const SECTOR_ICONS = [
  { title: 'Corporate / building', value: 'corporate' },
  { title: 'Finance / institution', value: 'finance' },
  { title: 'Government / pillars', value: 'government' },
  { title: 'NGO / community', value: 'ngo' },
  { title: 'Growth / SME', value: 'growth' },
]

/** A client sector on the Home page: title, short description and an icon. */
export const sectorItem = defineType({
  name: 'sectorItem',
  title: 'Sector',
  type: 'object',
  fields: [
    requiredString('title', 'Title'),
    requiredText('description', 'Short description', 2),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: { list: SECTOR_ICONS, layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

/** Sister-company logo for the Home page "Our Group" section. */
export const partnerLogo = defineType({
  name: 'partnerLogo',
  title: 'Sister company',
  type: 'object',
  fields: [
    requiredString('name', 'Company name', "Also used as the logo's alternative text."),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { accept: 'image/svg+xml,image/png,image/webp' },
      description: 'SVG preferred. Shown in white/gray on the dark band, full colour on hover.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'url', title: 'Website (optional)', type: 'url' }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
})
