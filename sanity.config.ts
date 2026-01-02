import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './sanity.structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Singleton types that should not appear in the default "Create new" menu
const singletonTypes = new Set(['siteSettings', 'bootSequence', 'playerConfig', 'themeSettings'])

export default defineConfig({
  name: 'ubuntu-portfolio',
  title: 'Ubuntu Portfolio',

  projectId,
  dataset,

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
