import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './sanity.structure'

// Hardcode values directly - env vars are unreliable during client-side hydration
const projectId = 'zb08xdlz'
const dataset = 'production'

// Singleton types that should not appear in the default "Create new" menu
const singletonTypes = new Set(['siteSettings', 'bootSequence', 'playerConfig', 'themeSettings'])

export default defineConfig({
  name: 'ubuntu-portfolio',
  title: 'Ubuntu Portfolio',

  projectId,
  dataset,

  // Required for embedded Studio in Next.js App Router
  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singletons, filter out actions that don't make sense
    actions: (input, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return input.filter(
          ({ action }) =>
            action && !['unpublish', 'delete', 'duplicate'].includes(action)
        )
      }
      return input
    },
  },
})
