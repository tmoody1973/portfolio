import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'desktopShortcut',
  title: 'Desktop Shortcut',
  type: 'document',
  icon: () => '🔗',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Label displayed under the icon',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'External URL to open when clicked',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Custom Icon',
      type: 'image',
      description: 'Custom icon image for this shortcut',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      description: 'Use a predefined platform icon instead of custom image',
      options: {
        list: [
          { title: 'Custom Image', value: 'custom' },
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'Substack', value: 'substack' },
          { title: 'Buy Me a Coffee', value: 'buymeacoffee' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Email', value: 'email' },
          { title: 'Website', value: 'website' },
          { title: 'Folder', value: 'folder' },
          { title: 'File', value: 'file' },
        ],
      },
      initialValue: 'custom',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Position on desktop (lower numbers appear first, left to right, top to bottom)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this shortcut on the desktop',
      initialValue: true,
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Open link in a new browser tab',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Tooltip text shown on hover',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
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
      url: 'url',
      media: 'icon',
      iconType: 'iconType',
      enabled: 'enabled',
    },
    prepare({ title, url, media, iconType, enabled }) {
      const iconLabel = iconType !== 'custom' ? ` (${iconType})` : ''
      return {
        title: `${title}${enabled ? '' : ' (disabled)'}`,
        subtitle: `${url}${iconLabel}`,
        media,
      }
    },
  },
})
