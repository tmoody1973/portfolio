import { defineType, defineField } from 'sanity'

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
      description: 'Display name for the radio stream',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'streamUrl',
      title: 'Stream URL',
      type: 'url',
      description: 'Direct URL to the audio stream (e.g., Icecast/Shoutcast URL)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the stream or station',
      rows: 2,
    }),
    defineField({
      name: 'artwork',
      title: 'Stream Artwork',
      type: 'image',
      description: 'Logo or artwork for the stream (displayed in player)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'spinitronStationId',
      title: 'Spinitron Station ID',
      type: 'string',
      description: 'Spinitron station identifier for now-playing data (e.g., "wfmu")',
    }),
    defineField({
      name: 'spinitronApiKey',
      title: 'Spinitron API Key',
      type: 'string',
      description: 'API key for Spinitron access (optional, can use env var instead)',
    }),
    defineField({
      name: 'mixcloudUsername',
      title: 'Mixcloud Username',
      type: 'string',
      description: 'Mixcloud username for archive access',
    }),
    defineField({
      name: 'mixcloudShowSlug',
      title: 'Mixcloud Show Slug',
      type: 'string',
      description: 'Specific show slug on Mixcloud (optional)',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      description: 'Primary genre or style',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Link to the station website',
    }),
    defineField({
      name: 'isDefault',
      title: 'Default Stream',
      type: 'boolean',
      description: 'Auto-play this stream when the player opens',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in stream list (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this stream in the player',
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
  ],
  preview: {
    select: {
      title: 'name',
      genre: 'genre',
      media: 'artwork',
      isDefault: 'isDefault',
      enabled: 'enabled',
    },
    prepare({ title, genre, media, isDefault, enabled }) {
      const defaultBadge = isDefault ? '⭐ ' : ''
      const disabled = enabled ? '' : ' (disabled)'
      return {
        title: `${defaultBadge}${title}${disabled}`,
        subtitle: genre || 'Radio Stream',
        media,
      }
    },
  },
})
