import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of the portfolio site',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for SEO',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      description: 'Your full name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title/Tagline',
      type: 'string',
      description: 'e.g., "Developer & Radio Curator"',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'Substack', value: 'substack' },
                  { title: 'Buy Me a Coffee', value: 'buymeacoffee' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label (optional)',
              type: 'string',
              description: 'Custom label for "Other" platforms',
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              label: 'label',
            },
            prepare({ platform, url, label }) {
              return {
                title: label || platform,
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seoImage',
      title: 'Default SEO Image',
      type: 'image',
      description: 'Default image for social sharing (Open Graph)',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'authorName',
    },
  },
})
