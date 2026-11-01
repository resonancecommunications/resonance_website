import { defineArrayMember, defineField, defineType } from 'sanity'

const caseStudyText = (name: string, title: string, description: string) =>
  defineField({ name, title, description, type: 'text', rows: 5, group: 'caseStudy' })

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'caseStudy', title: 'Case study' },
    { name: 'media', title: 'Images & video' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'clientApproved',
      title: 'Approved by the client for publication',
      type: 'boolean',
      initialValue: false,
      group: 'details',
      description:
        'Only approved projects appear on the website. Confirm images, names and results with the client first.',
    }),
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'client', title: 'Client', type: 'string', group: 'details' }),
    defineField({
      name: 'category',
      title: 'Service category',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Division',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Resonance Events', value: 'events' },
          { title: 'Resonance Media & Communications', value: 'media' },
          { title: 'Integrated (both divisions)', value: 'integrated' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'date', title: 'Project date', type: 'date', group: 'details' }),
    defineField({
      name: 'featured',
      title: 'Feature on the Home page',
      type: 'boolean',
      initialValue: false,
      group: 'details',
    }),

    caseStudyText(
      'overview',
      'Overview',
      'A short introduction explaining the client, the project, and its purpose.',
    ),
    caseStudyText(
      'objective',
      'The Objective',
      'What the client wanted to communicate, achieve, or deliver.',
    ),
    caseStudyText(
      'approach',
      'Our Approach',
      'How Resonance approached the project and connected the relevant capabilities.',
    ),
    caseStudyText(
      'contribution',
      'Our Contribution',
      'The specific services and deliverables provided by Resonance.',
    ),
    caseStudyText(
      'outcome',
      'The Outcome',
      'The completed work and measurable results, where verified information is available. Do not include unverified figures.',
    ),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'brandImage',
      group: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'brandImage' }), defineArrayMember({ type: 'galleryVideo' })],
      options: { layout: 'grid' },
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    { title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      approved: 'clientApproved',
      media: 'coverImage',
    },
    prepare: ({ title, client, approved, media }) => ({
      title,
      subtitle: `${approved ? 'Approved' : 'Not approved'}${client ? ` · ${client}` : ''}`,
      media,
    }),
  },
})
