// Singleton schemas
import siteSettings from './siteSettings'
import bootSequence from './bootSequence'
import playerConfig from './playerConfig'
import themeSettings from './themeSettings'

// Desktop schemas (Story 1.5)
import desktopApp from './desktopApp'
import desktopShortcut from './desktopShortcut'

// About schemas (Story 1.6)
import aboutSection from './aboutSection'
import experience from './experience'
import education from './education'
import skill from './skill'

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

  // About schemas (Story 1.6)
  aboutSection,
  experience,
  education,
  skill,

  // Media schemas (Story 1.8 - placeholder)
  radioStream,
  wallpaper,
]
