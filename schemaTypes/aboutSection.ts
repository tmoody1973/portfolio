import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Tab Title',
      type: 'string',
      description: 'Title displayed on the tab (e.g., "Bio", "Journey", "Education", "Skills")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      description: 'Type of content this section displays',
      options: {
        list: [
          { title: 'Bio / Introduction', value: 'bio' },
          { title: 'Journey / Experience', value: 'journey' },
          { title: 'Education', value: 'education' },
          { title: 'Skills', value: 'skills' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Rich text content for this section (used for Bio type)',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Tab Order',
      type: 'number',
      description: 'Order of this tab in the navigation (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this section in the About app',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Tab Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      sectionType: 'sectionType',
      enabled: 'enabled',
      order: 'order',
    },
    prepare({ title, sectionType, enabled, order }) {
      const typeLabels: Record<string, string> = {
        bio: 'Bio',
        journey: 'Journey',
        education: 'Education',
        skills: 'Skills',
      }
      return {
        title: `${title}${enabled ? '' : ' (disabled)'}`,
        subtitle: `${typeLabels[sectionType] || sectionType} • Order: ${order}`,
      }
    },
  },
})
