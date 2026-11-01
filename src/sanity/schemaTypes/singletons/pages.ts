import { defineArrayMember, defineField, defineType } from 'sanity'
import {
  pageGroups,
  paragraphsField,
  requiredString,
  requiredText,
  seoField,
  stringListField,
} from '../helpers'

function hero() {
  return defineField({
    name: 'hero',
    title: 'Hero',
    type: 'heroBlock',
    group: 'content',
    validation: (rule) => rule.required(),
  })
}

function section(name: string, title: string) {
  return defineField({ name, title, type: 'textSection', group: 'content' })
}

function banner(name = 'closingCta', title = 'Closing CTA') {
  return defineField({ name, title, type: 'ctaBanner', group: 'content' })
}

function group(name: string, title: string, fields: ReturnType<typeof defineField>[]) {
  return defineField({
    name,
    title,
    type: 'object',
    group: 'content',
    options: { collapsible: true, collapsed: false },
    fields,
  })
}

const preview = (title: string) => ({ prepare: () => ({ title }) })

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  groups: pageGroups,
  fields: [
    hero(),
    section('intro', 'Section 2: Introduction'),
    group('divisions', 'Section 3: Our Divisions', [
      requiredString('eyebrow', 'Eyebrow'),
      requiredString('headline', 'Headline'),
      requiredText('intro', 'Introduction'),
      defineField({
        name: 'items',
        title: 'Divisions',
        type: 'array',
        of: [defineArrayMember({ type: 'division' })],
        validation: (rule) => rule.length(2),
      }),
    ]),
    group('approach', 'Section 4: Integrated Solutions', [
      defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
      requiredString('headline', 'Headline'),
      paragraphsField('body', 'Body'),
      requiredString('processLabel', 'Process label'),
      defineField({
        name: 'steps',
        title: 'Process steps',
        type: 'array',
        of: [defineArrayMember({ type: 'processStep' })],
      }),
      defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
    ]),
    group('clients', 'Section 5: Who We Work With', [
      requiredString('eyebrow', 'Eyebrow'),
      requiredString('headline', 'Headline'),
      requiredText('body', 'Body'),
      requiredString('sectorsLabel', 'Sectors label'),
      stringListField('sectors', 'Sectors'),
    ]),
    group('featuredWork', 'Section 6: Featured Work', [
      requiredString('eyebrow', 'Eyebrow'),
      requiredString('headline', 'Headline'),
      requiredText('body', 'Body'),
      defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
    ]),
    banner('closingCta', 'Section 7: Closing CTA'),
    seoField,
  ],
  preview: preview('Home'),
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Us',
  type: 'document',
  groups: pageGroups,
  fields: [
    hero(),
    section('overview', 'Section 2: Company Overview'),
    section('vision', 'Section 3: Our Vision'),
    section('mission', 'Section 4: Our Mission'),
    section('philosophy', 'Section 5: Our Philosophy'),
    group('values', 'Section 6: Our Values', [
      requiredString('eyebrow', 'Heading'),
      defineField({
        name: 'items',
        title: 'Values',
        type: 'array',
        of: [defineArrayMember({ type: 'valueItem' })],
      }),
    ]),
    section('approach', 'Section 7: Our Approach'),
    seoField,
  ],
  preview: preview('About Us'),
})

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services',
  type: 'document',
  groups: pageGroups,
  description: 'The eight services themselves are edited under "Services".',
  fields: [
    hero(),
    group('portfolio', 'Section 2: Our Service Portfolio', [
      requiredString('eyebrow', 'Heading'),
      requiredString('navLabel', 'Anchor navigation label'),
    ]),
    group('closing', 'Closing', [
      requiredString('statement', 'Closing statement'),
      defineField({ name: 'cta', title: 'CTA', type: 'cta' }),
    ]),
    seoField,
  ],
  preview: preview('Services'),
})

export const eventsPage = defineType({
  name: 'eventsPage',
  title: 'Resonance Events',
  type: 'document',
  groups: pageGroups,
  description: 'The six service cards are edited under "Event services".',
  fields: [
    hero(),
    section('whatWeDo', 'Section 2: What We Do'),
    group('eventServices', 'Section 3: Event Services', [requiredString('eyebrow', 'Heading')]),
    group('capabilities', 'Section 4: Event Production Capabilities', [
      requiredString('eyebrow', 'Heading'),
      stringListField('items', 'Capabilities'),
    ]),
    section('integrated', 'Section 5: Integrated Event Experience'),
    banner('closingCta', 'Section 6: Closing CTA'),
    defineField({
      name: 'crossLink',
      title: 'Link to the other division',
      type: 'crossLink',
      group: 'content',
    }),
    seoField,
  ],
  preview: preview('Resonance Events'),
})

export const mediaPage = defineType({
  name: 'mediaPage',
  title: 'Resonance Media & Communications',
  type: 'document',
  groups: pageGroups,
  fields: [
    hero(),
    defineField({
      name: 'sections',
      title: 'Sections 2–8: Capabilities',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'capabilitySection' })],
    }),
    banner('closingCta', 'Section 9: Closing CTA'),
    defineField({
      name: 'crossLink',
      title: 'Link to the other division',
      type: 'crossLink',
      group: 'content',
    }),
    seoField,
  ],
  preview: preview('Resonance Media & Communications'),
})

export const ourWorkPage = defineType({
  name: 'ourWorkPage',
  title: 'Our Work',
  type: 'document',
  groups: pageGroups,
  description: 'Projects and categories are edited under "Projects" and "Project categories".',
  fields: [
    hero(),
    defineField({
      name: 'categoriesEyebrow',
      title: 'Categories heading',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'allLabel',
      title: '"All" filter label',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    group('emptyState', 'Shown while no approved projects are published', [
      requiredString('headline', 'Headline'),
      requiredText('body', 'Body'),
    ]),
    group('projectLabels', 'Project page labels', [
      requiredString('client', 'Client'),
      requiredString('serviceCategory', 'Service Category'),
      requiredString('overview', 'Overview'),
      requiredString('objective', 'The Objective'),
      requiredString('approach', 'Our Approach'),
      requiredString('contribution', 'Our Contribution'),
      requiredString('outcome', 'The Outcome'),
      requiredString('gallery', 'Project Gallery'),
      requiredString('previous', 'Previous project'),
      requiredString('next', 'Next project'),
      requiredString('backToWork', 'Back to all work'),
    ]),
    banner(),
    seoField,
  ],
  preview: preview('Our Work'),
})

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  groups: pageGroups,
  description: 'Email, phone and address are edited in Site settings → Contact details.',
  fields: [
    hero(),
    group('info', 'Section 2: Contact Information', [
      requiredString('eyebrow', 'Heading'),
      requiredString('generalInquiriesLabel', 'General inquiries label'),
      requiredString('phoneLabel', 'Phone label'),
      requiredString('officeAddressLabel', 'Office address label'),
      requiredString('locationLabel', 'Location label'),
    ]),
    group('form', 'Section 3: Inquiry Form', [
      requiredString('headline', 'Headline'),
      defineField({
        name: 'labels',
        title: 'Field labels',
        type: 'object',
        fields: [
          requiredString('fullName', 'Full name'),
          requiredString('organization', 'Organization'),
          requiredString('email', 'Email'),
          requiredString('phone', 'Phone'),
          requiredString('service', 'Service of interest'),
          requiredString('description', 'Project description'),
        ],
      }),
      requiredString('servicePlaceholder', 'Service placeholder'),
      stringListField('serviceOptions', 'Service of Interest options'),
      requiredString('submitLabel', 'Submit button'),
      defineField({
        name: 'responseNote',
        title: 'Response time note',
        type: 'string',
        description: 'Optional, e.g. "We reply within two working days." Hidden while empty.',
      }),
      requiredString('successMessage', 'Success message'),
      requiredString('errorMessage', 'Error message'),
    ]),
    defineField({
      name: 'closingStatement',
      title: 'Section 4: Closing statement',
      type: 'string',
      group: 'content',
    }),
    seoField,
  ],
  preview: preview('Contact'),
})
