import { defineField, defineType } from 'sanity'

export const galleryVideo = defineType({
  name: 'galleryVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo link.',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used as the accessible name of the video.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: { select: { title: 'title', subtitle: 'url' } },
})
