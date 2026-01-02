import { defineType, defineField } from 'sanity'

// Placeholder schema - will be fully implemented in Story 1.8
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Wallpaper Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Set as the active wallpaper',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
