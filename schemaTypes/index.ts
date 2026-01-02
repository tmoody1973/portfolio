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

// Project and Terminal schemas (Story 1.7)
import project from './project'
import terminalCommand from './terminalCommand'

// Document schemas (placeholders - to be expanded in later stories)
import radioStream from './radioStream'
import wallpaper from './wallpaper'

// Crates schemas (Epic 10)
import curatedItem from './curatedItem'

// Desktop extras
import stickyNote from './stickyNote'

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

  // Project and Terminal schemas (Story 1.7)
  project,
  terminalCommand,

  // Media schemas (Story 1.8 - placeholder)
  radioStream,
  wallpaper,

  // Crates schemas (Epic 10)
  curatedItem,

  // Desktop extras
  stickyNote,
]
