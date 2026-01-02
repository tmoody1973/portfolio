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
  {
    id: 'contact',
    name: 'Contact',
    icon: '/themes/Yaru/apps/email.svg',
  },
  {
    id: 'crates',
    name: 'Crates',
    icon: '/themes/Yaru/apps/crates.svg',
  },
]

/**
 * External link shortcuts (open in new tab)
 * Social links and contact options
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
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: '/themes/Yaru/apps/x-twitter.svg',
    isExternal: true,
    url: 'https://x.com/taaborern',
  },
  {
    id: 'substack',
    name: 'Substack',
    icon: '/themes/Yaru/apps/substack.svg',
    isExternal: true,
    url: 'https://tarikmoody.substack.com',
  },
  {
    id: 'buymeacoffee',
    name: 'Buy Me a Coffee',
    icon: '/themes/Yaru/apps/buymeacoffee.svg',
    isExternal: true,
    url: 'https://buymeacoffee.com/tarikmoody',
  },
]

/**
 * All shortcuts combined
 */
export const ALL_SHORTCUTS = [...DEFAULT_SHORTCUTS, ...EXTERNAL_SHORTCUTS]
