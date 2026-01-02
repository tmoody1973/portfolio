import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'stickyNote',
  title: 'Sticky Note',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show Sticky Note',
      type: 'boolean',
      description: 'Toggle the sticky note on/off',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title at the top (e.g., "Hey! 👋")',
      initialValue: 'Hey! 👋',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      description: 'The main message on the sticky note',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'signature',
      title: 'Signature',
      type: 'string',
      description: 'Your signature at the bottom (e.g., "— Tarik")',
      initialValue: '— Tarik',
    }),
    defineField({
      name: 'color',
      title: 'Note Color',
      type: 'string',
      options: {
        list: [
          { title: 'Yellow (Classic)', value: 'yellow' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Pink', value: 'pink' },
          { title: 'Orange', value: 'orange' },
        ],
        layout: 'radio',
      },
      initialValue: 'yellow',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top Right', value: 'top-right' },
          { title: 'Top Left', value: 'top-left' },
          { title: 'Bottom Right', value: 'bottom-right' },
          { title: 'Bottom Left', value: 'bottom-left' },
        ],
        layout: 'radio',
      },
      initialValue: 'top-right',
    }),
    defineField({
      name: 'rotation',
      title: 'Rotation (degrees)',
      type: 'number',
      description: 'Slight tilt for natural look (-5 to 5)',
      initialValue: 2,
      validation: (rule) => rule.min(-10).max(10),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
    },
    prepare({ title, enabled }) {
      return {
        title: 'Sticky Note',
        subtitle: enabled ? `"${title}" - Visible` : 'Hidden',
      }
    },
  },
})
