import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bootSequence',
  title: 'Boot Sequence',
  type: 'document',
  icon: () => '🖥️',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Boot Sequence Enabled',
      type: 'boolean',
      description: 'Toggle the boot sequence on/off',
      initialValue: true,
    }),
    defineField({
      name: 'asciiArt',
      title: 'ASCII Art',
      type: 'text',
      rows: 15,
      description: 'ASCII art displayed during boot (e.g., your name in ASCII)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'asciiAnimationSpeed',
      title: 'ASCII Animation Speed (ms)',
      type: 'number',
      description: 'Milliseconds per character for typing effect',
      initialValue: 50,
      validation: (rule) => rule.min(10).max(200),
    }),
    defineField({
      name: 'bootMessages',
      title: 'Boot Messages',
      type: 'array',
      description: 'Messages that appear during boot sequence',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'message',
              title: 'Message',
              type: 'string',
              description: 'e.g., "Loading architecture blueprints... Howard \'96"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'delay',
              title: 'Delay After (ms)',
              type: 'number',
              description: 'Milliseconds to wait after showing this message',
              initialValue: 500,
              validation: (rule) => rule.min(100).max(3000),
            }),
            defineField({
              name: 'isSuccess',
              title: 'Show as Success',
              type: 'boolean',
              description: 'Display with success styling (green checkmark)',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'message',
              delay: 'delay',
            },
            prepare({ title, delay }) {
              return {
                title,
                subtitle: `${delay}ms delay`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'totalDuration',
      title: 'Maximum Total Duration (ms)',
      type: 'number',
      description: 'Maximum time for entire boot sequence before auto-completing',
      initialValue: 5000,
      validation: (rule) => rule.min(2000).max(10000),
    }),
    defineField({
      name: 'allowSkip',
      title: 'Allow Skip',
      type: 'boolean',
      description: 'Allow users to skip the boot sequence',
      initialValue: true,
    }),
    defineField({
      name: 'skipButtonText',
      title: 'Skip Button Text',
      type: 'string',
      description: 'Text for the skip button',
      initialValue: 'Skip',
    }),
    defineField({
      name: 'rememberSkipPreference',
      title: 'Remember Skip Preference',
      type: 'boolean',
      description: 'Auto-skip for returning visitors who previously skipped',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Boot Sequence',
        subtitle: 'Configure boot animation and messages',
      }
    },
  },
})
