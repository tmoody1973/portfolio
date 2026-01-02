import { DockAppConfig } from './Dock'

/**
 * Default dock apps configuration
 * These are the pinned apps that appear in the dock
 */
export const DOCK_APPS: DockAppConfig[] = [
  {
    id: 'files',
    name: 'Files',
    icon: '/themes/Yaru/apps/filemanager.svg',
    appType: 'files',
  },
  {
    id: 'about',
    name: 'About Me',
    icon: '/themes/Yaru/apps/user-info.svg',
    appType: 'about',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '/themes/Yaru/apps/bash.png',
    appType: 'terminal',
  },
  {
    id: 'chrome',
    name: 'Projects',
    icon: '/themes/Yaru/apps/chrome.png',
    appType: 'chrome',
  },
  {
    id: 'player',
    name: 'Music',
    icon: '/themes/Yaru/apps/music-player.png',
    appType: 'player',
  },
  {
    id: 'crates',
    name: 'Crates',
    icon: '/themes/Yaru/apps/crates.svg',
    appType: 'crates',
  },
]

/**
 * Essential dock apps (subset for minimal dock)
 */
export const ESSENTIAL_DOCK_APPS: DockAppConfig[] = DOCK_APPS.filter((app) =>
  ['about', 'terminal', 'chrome', 'player'].includes(app.id)
)
