import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'playerConfig',
  title: 'Player Configuration',
  type: 'document',
  icon: () => '🎵',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Audio Player Enabled',
      type: 'boolean',
      description: 'Toggle the audio player on/off',
      initialValue: true,
    }),
    defineField({
      name: 'defaultStream',
      title: 'Default Stream',
      type: 'reference',
      to: [{ type: 'radioStream' }],
      description: 'The stream that plays by default when player opens',
    }),
    defineField({
      name: 'defaultVolume',
      title: 'Default Volume',
      type: 'number',
      description: 'Default volume level (0-100)',
      initialValue: 75,
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically start playing when player opens',
      initialValue: false,
    }),
    defineField({
      name: 'showNowPlaying',
      title: 'Show Now Playing',
      type: 'boolean',
      description: 'Display current track information from Spinitron',
      initialValue: true,
    }),
    defineField({
      name: 'showRecentTracks',
      title: 'Show Recent Tracks',
      type: 'boolean',
      description: 'Display recently played tracks list',
      initialValue: true,
    }),
    defineField({
      name: 'recentTracksCount',
      title: 'Recent Tracks Count',
      type: 'number',
      description: 'Number of recent tracks to display',
      initialValue: 5,
      validation: (rule) => rule.min(3).max(15),
    }),
    defineField({
      name: 'showMixcloudArchives',
      title: 'Show Mixcloud Archives',
      type: 'boolean',
      description: 'Display link to Mixcloud show archives',
      initialValue: true,
    }),
    defineField({
      name: 'mixcloudUsername',
      title: 'Mixcloud Username',
      type: 'string',
      description: 'Your Mixcloud username for fetching archives',
    }),
    defineField({
      name: 'webampSkin',
      title: 'Webamp Skin',
      type: 'string',
      description: 'URL to custom Webamp skin (.wsz file)',
    }),
    defineField({
      name: 'playerPosition',
      title: 'Default Player Position',
      type: 'object',
      fields: [
        defineField({
          name: 'x',
          title: 'X Position',
          type: 'number',
          initialValue: 100,
        }),
        defineField({
          name: 'y',
          title: 'Y Position',
          type: 'number',
          initialValue: 100,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Player Configuration',
        subtitle: 'Configure audio player settings',
      }
    },
  },
})
