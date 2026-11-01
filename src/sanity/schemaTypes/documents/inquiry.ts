import { defineField, defineType } from 'sanity'

/** Contact form submissions. Created by /api/inquiry; only the status is editable. */
export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({ name: 'fullName', title: 'Full name', type: 'string', readOnly: true }),
    defineField({ name: 'organization', title: 'Organization', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', readOnly: true }),
    defineField({ name: 'service', title: 'Service of interest', type: 'string', readOnly: true }),
    defineField({
      name: 'description',
      title: 'Project description',
      type: 'text',
      rows: 8,
      readOnly: true,
    }),
    defineField({ name: 'submittedAt', title: 'Submitted', type: 'datetime', readOnly: true }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { name: 'fullName', org: 'organization', service: 'service', status: 'status' },
    prepare: ({ name, org, service, status }) => ({
      title: `${name ?? 'Inquiry'}${org ? ` · ${org}` : ''}`,
      subtitle: `${(status ?? 'new').toUpperCase()} · ${service ?? ''}`,
    }),
  },
})
