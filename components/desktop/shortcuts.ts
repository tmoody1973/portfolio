import { DesktopShortcutProps } from './DesktopShortcut'

/**
 * Default desktop shortcuts configuration
 * These are the icons that appear on the desktop
 */
export const DEFAULT_SHORTCUTS: Omit<DesktopShortcutProps, 'onOpen'>[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '/themes/Yaru/apps/user-info.png',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '/themes/Yaru/apps/bash.png',
  },
  {
    id: 'chrome',
    name: 'Projects',
    icon: '/themes/Yaru/apps/chrome.png',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '/themes/Yaru/apps/vscode.png',
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: '/themes/Yaru/apps/user-trash-full.png',
  },
]

/**
 * External link shortcuts (open in new tab)
 */
export const EXTERNAL_SHORTCUTS: Omit<DesktopShortcutProps, 'onOpen'>[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: '/themes/Yaru/apps/github.png',
    isExternal: true,
    url: 'https://github.com/tmoody1973',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/themes/Yaru/apps/linkedin.png',
    isExternal: true,
    url: 'https://www.linkedin.com/in/tarikmoody/',
  },
]

/**
 * All shortcuts combined
 */
export const ALL_SHORTCUTS = [...DEFAULT_SHORTCUTS, ...EXTERNAL_SHORTCUTS]
