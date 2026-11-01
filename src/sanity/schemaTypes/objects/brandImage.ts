import { defineField, defineType } from 'sanity'

/**
 * Image with the brand photography treatments from the guideline:
 * black & white by default, full colour, or a Connection Teal overlay.
 */
export const brandImage = defineType({
  name: 'brandImage',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for people who cannot see it. Required.',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'treatment',
      title: 'Photography treatment',
      type: 'string',
      initialValue: 'blackAndWhite',
      description:
        'Brand guideline: black & white is the dominant treatment. Use full colour when it better conveys the atmosphere; use the teal overlay selectively for campaign visuals.',
      options: {
        list: [
          { title: 'Black & white (default)', value: 'blackAndWhite' },
          { title: 'Full colour', value: 'fullColor' },
          { title: 'Teal overlay', value: 'tealOverlay' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Teal overlay strength (%)',
      type: 'number',
      initialValue: 55,
      hidden: ({ parent }) => parent?.treatment !== 'tealOverlay',
      validation: (rule) => rule.min(10).max(90),
    }),
  ],
})
