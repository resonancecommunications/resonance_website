import { defineArrayMember, defineField } from 'sanity'

/** Site routes editors can link to. Anchors and query strings may be appended. */
export const INTERNAL_ROUTES = [
  '/',
  '/about',
  '/services',
  '/events',
  '/media-communications',
  '/our-work',
  '/contact',
]

const internalPathRule = /^\/[^\s]*$/

/** Link fields shared by CTA buttons and navigation items. */
export function linkFields() {
  return [
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Page on this site', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalPath',
      title: 'Page path',
      type: 'string',
      description: `Start with "/". Pages: ${INTERNAL_ROUTES.join(', ')}. Add #section or ?service=… if needed.`,
      hidden: ({ parent }) => parent?.linkType === 'external',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined
          if (parent?.linkType === 'external') return true
          if (!value) return 'Required'
          return internalPathRule.test(value) || 'Must start with "/" and contain no spaces'
        }),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['https', 'http', 'mailto', 'tel'] }).custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined
          return parent?.linkType !== 'external' || Boolean(value) || 'Required'
        }),
    }),
  ]
}

/** Ordered list of plain paragraphs. */
export function paragraphsField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: 'array',
    of: [defineArrayMember({ type: 'text', rows: 4 })],
    validation: (rule) => rule.min(1),
  })
}

/** Ordered list of short strings (service lists, sectors, capabilities). */
export function stringListField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  })
}

export function requiredString(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: 'string',
    validation: (rule) => rule.required(),
  })
}

export function requiredText(name: string, title: string, rows = 3) {
  return defineField({
    name,
    title,
    type: 'text',
    rows,
    validation: (rule) => rule.required(),
  })
}

export const seoField = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
  group: 'seo',
})

export const pageGroups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'seo', title: 'SEO' },
]
