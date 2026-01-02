import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project / Case Study',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Name of the project or case study',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the project',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Brief tagline or description',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image displayed in project list and header',
      options: {
        hotspot: true,
      },
    }),

    // Architecture-inspired sections
    defineField({
      name: 'context',
      title: 'Context',
      type: 'array',
      description: 'Background and problem statement - Why did this project exist?',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'concept',
      title: 'Concept',
      type: 'array',
      description: 'Initial ideas and approach - What was the vision?',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'array',
      description: 'How the work was done - methodology, iterations, decisions',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'execution',
      title: 'Execution',
      type: 'array',
      description: 'Technical implementation details - How was it built?',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'array',
      description: 'Outcomes and impact - What was achieved?',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'reflection',
      title: 'Reflection',
      type: 'array',
      description: 'Lessons learned and retrospective - What would you do differently?',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        }),
      ],
    }),

    // Screenshot gallery
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      description: 'Gallery of project screenshots',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        }),
      ],
    }),

    // Metadata
    defineField({
      name: 'client',
      title: 'Client / Company',
      type: 'string',
      description: 'Who was this project for?',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'When was this project completed?',
      validation: (rule) => rule.min(2000).max(2100),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'How long did the project take? (e.g., "3 months", "6 weeks")',
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'What was your role on this project?',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      description: 'Tech stack and tools used',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to live project',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
      description: 'Link to source code',
    }),

    // Display options
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this project prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in project list (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this project in the portfolio',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
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
      subtitle: 'subtitle',
      media: 'featuredImage',
      year: 'year',
      featured: 'featured',
      enabled: 'enabled',
    },
    prepare({ title, subtitle, media, year, featured, enabled }) {
      const star = featured ? '⭐ ' : ''
      const disabled = enabled ? '' : ' (disabled)'
      return {
        title: `${star}${title}${disabled}`,
        subtitle: subtitle || (year ? `${year}` : ''),
        media,
      }
    },
  },
})
