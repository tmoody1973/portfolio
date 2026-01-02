import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'document',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'activeWallpaper',
      title: 'Active Wallpaper',
      type: 'reference',
      to: [{ type: 'wallpaper' }],
      description: 'The currently active desktop wallpaper',
    }),
    defineField({
      name: 'fallbackWallpaperColor',
      title: 'Fallback Wallpaper Color',
      type: 'string',
      description: 'Hex color to use if wallpaper fails to load',
      initialValue: '#2C001E',
      validation: (rule) =>
        rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Primary accent color (Ubuntu orange by default)',
      initialValue: '#E95420',
      validation: (rule) =>
        rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }),
    }),
    defineField({
      name: 'windowStyle',
      title: 'Window Style',
      type: 'string',
      options: {
        list: [
          { title: 'Ubuntu (Default)', value: 'ubuntu' },
          { title: 'macOS', value: 'macos' },
          { title: 'Windows', value: 'windows' },
        ],
      },
      initialValue: 'ubuntu',
    }),
    defineField({
      name: 'dockPosition',
      title: 'Dock Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'dockAutoHide',
      title: 'Auto-hide Dock',
      type: 'boolean',
      description: 'Automatically hide dock when not in use',
      initialValue: false,
    }),
    defineField({
      name: 'showDesktopIcons',
      title: 'Show Desktop Icons',
      type: 'boolean',
      description: 'Display shortcut icons on the desktop',
      initialValue: true,
    }),
    defineField({
      name: 'iconSize',
      title: 'Desktop Icon Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'fontFamily',
      title: 'System Font',
      type: 'string',
      description: 'Font family for the desktop UI',
      initialValue: 'Ubuntu, sans-serif',
    }),
  ],
  preview: {
    select: {
      accentColor: 'accentColor',
    },
    prepare({ accentColor }) {
      return {
        title: 'Theme Settings',
        subtitle: `Accent: ${accentColor || '#E95420'}`,
      }
    },
  },
})
