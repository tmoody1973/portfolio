import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'terminalCommand',
  title: 'Terminal Command',
  type: 'document',
  icon: () => '💻',
  fields: [
    defineField({
      name: 'command',
      title: 'Command',
      type: 'string',
      description: 'The command name (e.g., "whoami", "help", "ls")',
      validation: (rule) => rule.required().regex(/^[a-z0-9_-]+$/i, {
        name: 'command-format',
        invert: false,
      }),
    }),
    defineField({
      name: 'aliases',
      title: 'Aliases',
      type: 'array',
      description: 'Alternative command names that trigger the same response',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Type of command for organization',
      options: {
        list: [
          { title: 'Information', value: 'info' },
          { title: 'Navigation', value: 'navigation' },
          { title: 'System', value: 'system' },
          { title: 'Fun / Easter Egg', value: 'fun' },
          { title: 'Social', value: 'social' },
          { title: 'Help', value: 'help' },
        ],
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Brief description shown in help command',
    }),
    defineField({
      name: 'response',
      title: 'Response',
      type: 'array',
      description: 'The output displayed when this command is run',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Code Block', value: 'code' },
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
              {
                name: 'color',
                type: 'object',
                title: 'Color',
                fields: [
                  {
                    name: 'value',
                    type: 'string',
                    title: 'Color',
                    options: {
                      list: [
                        { title: 'Green (Success)', value: 'green' },
                        { title: 'Red (Error)', value: 'red' },
                        { title: 'Yellow (Warning)', value: 'yellow' },
                        { title: 'Blue (Info)', value: 'blue' },
                        { title: 'Cyan', value: 'cyan' },
                        { title: 'Magenta', value: 'magenta' },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'plainTextResponse',
      title: 'Plain Text Response (Alternative)',
      type: 'text',
      description: 'Simple text response if you prefer not to use rich text',
      rows: 6,
    }),
    defineField({
      name: 'isAsciiArt',
      title: 'Contains ASCII Art',
      type: 'boolean',
      description: 'Check if response contains ASCII art that needs monospace formatting',
      initialValue: false,
    }),
    defineField({
      name: 'clearScreen',
      title: 'Clear Screen First',
      type: 'boolean',
      description: 'Clear the terminal before showing response',
      initialValue: false,
    }),
    defineField({
      name: 'showInHelp',
      title: 'Show in Help',
      type: 'boolean',
      description: 'Include this command in the help command output',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Help Order',
      type: 'number',
      description: 'Order in help command list',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Allow this command to be executed',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Command A-Z',
      name: 'commandAsc',
      by: [{ field: 'command', direction: 'asc' }],
    },
    {
      title: 'Category, then Command',
      name: 'categoryCommand',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'command', direction: 'asc' },
      ],
    },
    {
      title: 'Help Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'command',
      description: 'description',
      category: 'category',
      enabled: 'enabled',
      showInHelp: 'showInHelp',
    },
    prepare({ title, description, category, enabled, showInHelp }) {
      const categoryLabels: Record<string, string> = {
        info: 'Info',
        navigation: 'Nav',
        system: 'System',
        fun: 'Fun',
        social: 'Social',
        help: 'Help',
      }
      const disabled = enabled ? '' : ' (disabled)'
      const hidden = showInHelp ? '' : ' [hidden]'
      return {
        title: `${title}${disabled}${hidden}`,
        subtitle: `[${categoryLabels[category] || category}] ${description || ''}`,
      }
    },
  },
})
