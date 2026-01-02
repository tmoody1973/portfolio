import { defineType, defineField } from 'sanity'

// Placeholder schema - will be fully implemented in Story 1.8
export default defineType({
  name: 'radioStream',
  title: 'Radio Stream',
  type: 'document',
  icon: () => '📻',
  fields: [
    defineField({
      name: 'name',
      title: 'Stream Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'streamUrl',
      title: 'Stream URL',
      type: 'url',
      description: 'Direct URL to the audio stream',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isDefault',
      title: 'Default Stream',
      type: 'boolean',
      description: 'Set as the default stream',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'streamUrl',
    },
  },
})
