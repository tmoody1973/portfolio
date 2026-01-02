// Singleton schemas
import siteSettings from './siteSettings'
import bootSequence from './bootSequence'
import playerConfig from './playerConfig'
import themeSettings from './themeSettings'

// Desktop schemas (Story 1.5)
import desktopApp from './desktopApp'
import desktopShortcut from './desktopShortcut'

// Document schemas (placeholders - to be expanded in later stories)
import radioStream from './radioStream'
import wallpaper from './wallpaper'

// Export all schema types
export const schemaTypes = [
  // Singletons (Story 1.4)
  siteSettings,
  bootSequence,
  playerConfig,
  themeSettings,

  // Desktop schemas (Story 1.5)
  desktopApp,
  desktopShortcut,

  // Media schemas (Story 1.8 - placeholder)
  radioStream,
  wallpaper,
]
