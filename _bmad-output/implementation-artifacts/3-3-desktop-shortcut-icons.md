# Story 3.3: Desktop Shortcut Icons

**Epic:** 3 - Desktop Environment Shell
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want to see clickable desktop shortcut icons for applications,
So that I can open apps by clicking on familiar desktop icons.

## Acceptance Criteria

**Given** the desktop is rendered
**When** shortcuts are displayed
**Then** each shortcut has an icon and label
**And** shortcuts are arranged in the icon grid
**And** clicking a shortcut opens the corresponding app
**And** shortcuts have visual feedback on hover/click

## Implementation Tasks

### 1. Create DesktopShortcut Component
- [x] Create reusable shortcut component with icon and label
- [x] Support click handler to open apps
- [x] Add hover and active states with visual feedback

### 2. Create ShortcutGrid Component
- [x] Arrange shortcuts in the desktop icon grid
- [x] Support responsive layout
- [x] Handle keyboard navigation (Enter key)

### 3. Define Default Shortcuts
- [x] About Me shortcut
- [x] Terminal shortcut
- [x] Projects/Chrome shortcut
- [x] VS Code shortcut
- [x] Trash shortcut
- [x] External links (GitHub, LinkedIn)

## Definition of Done
- [x] Desktop shortcuts render with icons and labels
- [x] Click opens corresponding application
- [x] Visual feedback on interaction
- [x] Build succeeds

## Implementation Notes

### Files Created
- `components/desktop/DesktopShortcut.tsx` - Individual shortcut component
- `components/desktop/ShortcutGrid.tsx` - Grid container for shortcuts
- `components/desktop/shortcuts.ts` - Default shortcuts configuration
- Updated `components/desktop/index.ts` - Re-exports

### DesktopShortcut Props
```typescript
interface DesktopShortcutProps {
  id: string           // Unique identifier
  name: string         // Display label
  icon: string         // Icon path
  isExternal?: boolean // Opens in new tab
  url?: string         // External URL
  onOpen?: (id: string) => void  // Activation callback
  className?: string   // Additional CSS
}
```

### Interaction States
- **Default**: Transparent background
- **Hover**: 10% white background opacity
- **Focus**: Orange background with border (keyboard navigation)
- **Active/Pressed**: Scale down to 95%

### Shortcuts Configuration
```typescript
const DEFAULT_SHORTCUTS = [
  { id: 'about', name: 'About Me', icon: '/themes/Yaru/apps/user-info.png' },
  { id: 'terminal', name: 'Terminal', icon: '/themes/Yaru/apps/bash.png' },
  { id: 'chrome', name: 'Projects', icon: '/themes/Yaru/apps/chrome.png' },
  { id: 'vscode', name: 'VS Code', icon: '/themes/Yaru/apps/vscode.png' },
  { id: 'trash', name: 'Trash', icon: '/themes/Yaru/apps/user-trash-full.png' },
]

const EXTERNAL_SHORTCUTS = [
  { id: 'github', name: 'GitHub', icon: '...', isExternal: true, url: '...' },
  { id: 'linkedin', name: 'LinkedIn', icon: '...', isExternal: true, url: '...' },
]
```

### Usage Example
```tsx
import { DesktopShortcut, ShortcutGrid, DEFAULT_SHORTCUTS } from '@/components/desktop'
import { useWindowStore } from '@/store'

function DesktopContent() {
  const { openWindow } = useWindowStore()

  const handleOpenApp = (id: string) => {
    openWindow({ id, title: id, appType: id })
  }

  return (
    <ShortcutGrid>
      {DEFAULT_SHORTCUTS.map((shortcut) => (
        <DesktopShortcut
          key={shortcut.id}
          {...shortcut}
          onOpen={handleOpenApp}
        />
      ))}
    </ShortcutGrid>
  )
}
```

### Accessibility
- Keyboard navigation with Tab
- Enter key activates shortcut
- Focus visible ring for keyboard users
- ARIA role="button" and aria-label
