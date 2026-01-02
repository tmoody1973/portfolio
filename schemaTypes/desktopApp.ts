import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'desktopApp',
  title: 'Desktop App',
  type: 'document',
  icon: () => '📱',
  fields: [
    defineField({
      name: 'appId',
      title: 'App ID',
      type: 'string',
      description: 'Unique identifier for the app (e.g., "about", "terminal", "chrome", "player", "crates")',
      validation: (rule) => rule.required().regex(/^[a-z-]+$/, {
        name: 'lowercase-kebab',
        invert: false,
      }),
    }),
    defineField({
      name: 'title',
      title: 'App Title',
      type: 'string',
      description: 'Display name shown in window title bar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'App Icon',
      type: 'image',
      description: 'Icon displayed in dock and window title bar',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (Alternative)',
      type: 'string',
      description: 'Use a predefined icon name instead of custom image (e.g., "terminal", "chrome", "folder")',
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this app in the dock',
      initialValue: true,
    }),
    defineField({
      name: 'showInDock',
      title: 'Show in Dock',
      type: 'boolean',
      description: 'Display this app in the dock launcher',
      initialValue: true,
    }),
    defineField({
      name: 'dockOrder',
      title: 'Dock Order',
      type: 'number',
      description: 'Position in the dock (lower numbers appear first)',
      initialValue: 0,
    }),
    defineField({
      name: 'defaultWindowConfig',
      title: 'Default Window Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'width',
          title: 'Default Width',
          type: 'number',
          description: 'Default window width in pixels',
          initialValue: 800,
        }),
        defineField({
          name: 'height',
          title: 'Default Height',
          type: 'number',
          description: 'Default window height in pixels',
          initialValue: 600,
        }),
        defineField({
          name: 'x',
          title: 'Default X Position',
          type: 'number',
          description: 'Default horizontal position',
          initialValue: 100,
        }),
        defineField({
          name: 'y',
          title: 'Default Y Position',
          type: 'number',
          description: 'Default vertical position',
          initialValue: 50,
        }),
        defineField({
          name: 'resizable',
          title: 'Resizable',
          type: 'boolean',
          description: 'Allow window resizing',
          initialValue: true,
        }),
        defineField({
          name: 'minimizable',
          title: 'Minimizable',
          type: 'boolean',
          description: 'Allow window minimizing',
          initialValue: true,
        }),
        defineField({
          name: 'maximizable',
          title: 'Maximizable',
          type: 'boolean',
          description: 'Allow window maximizing',
          initialValue: true,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Dock Order',
      name: 'dockOrderAsc',
      by: [{ field: 'dockOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      appId: 'appId',
      media: 'icon',
      enabled: 'enabled',
    },
    prepare({ title, appId, media, enabled }) {
      return {
        title,
        subtitle: `${appId} ${enabled ? '' : '(disabled)'}`,
        media,
      }
    },
  },
})
