import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'wallpaper',
  title: 'Wallpaper',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'name',
      title: 'Wallpaper Name',
      type: 'string',
      description: 'Display name for the wallpaper',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Wallpaper Image',
      type: 'image',
      description: 'The wallpaper image (recommended: 1920x1080 or higher)',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the wallpaper',
      rows: 2,
    }),
    defineField({
      name: 'credit',
      title: 'Credit / Attribution',
      type: 'string',
      description: 'Photo credit or attribution (e.g., "Photo by John Doe")',
    }),
    defineField({
      name: 'creditUrl',
      title: 'Credit URL',
      type: 'url',
      description: 'Link to original source or photographer',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Wallpaper category or theme',
      options: {
        list: [
          { title: 'Default Ubuntu', value: 'ubuntu' },
          { title: 'Nature', value: 'nature' },
          { title: 'Abstract', value: 'abstract' },
          { title: 'City', value: 'city' },
          { title: 'Space', value: 'space' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'ubuntu',
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      description: 'Dominant color scheme for UI theming',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Warm', value: 'warm' },
          { title: 'Cool', value: 'cool' },
        ],
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Set as the currently active wallpaper',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in wallpaper gallery (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this wallpaper in the gallery',
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
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'image',
      isActive: 'isActive',
      enabled: 'enabled',
    },
    prepare({ title, category, media, isActive, enabled }) {
      const activeBadge = isActive ? '✓ ' : ''
      const disabled = enabled ? '' : ' (disabled)'
      const categoryLabels: Record<string, string> = {
        ubuntu: 'Ubuntu',
        nature: 'Nature',
        abstract: 'Abstract',
        city: 'City',
        space: 'Space',
        minimal: 'Minimal',
        custom: 'Custom',
      }
      return {
        title: `${activeBadge}${title}${disabled}`,
        subtitle: categoryLabels[category] || category || 'Wallpaper',
        media,
      }
    },
  },
})
