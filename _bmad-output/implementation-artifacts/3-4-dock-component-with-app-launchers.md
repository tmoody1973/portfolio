# Story 3.4: Dock Component with App Launchers

**Epic:** 3 - Desktop Environment Shell
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want to see a dock/sidebar with application launchers,
So that I can quickly access and manage open applications.

## Acceptance Criteria

**Given** the desktop is rendered
**When** the dock is displayed
**Then** it shows pinned application icons
**And** open apps show an indicator dot
**And** clicking an app icon opens or focuses the app
**And** hovering shows the app title tooltip
**And** the dock can be toggled on/off

## Implementation Tasks

### 1. Create DockApp Component
- [x] Create individual dock app item with icon
- [x] Support click to open/focus app
- [x] Show active indicator when app is open
- [x] Add hover tooltip with app name
- [x] Add bounce animation on click (when opening)

### 2. Create Dock Container Component
- [x] Vertical sidebar layout on left side
- [x] Auto-hide behavior (optional)
- [x] Support fixed or hover-reveal modes
- [x] Include "Show Applications" button at bottom

### 3. Define Dock Apps Configuration
- [x] List of pinned dock apps with icons
- [x] Map to window store app types
- [x] Support for favorites toggle

### 4. Integrate with Window Store
- [x] Show indicator for open windows
- [x] Click focuses existing window or opens new
- [x] Handle minimized windows (restore on click)

## Definition of Done
- [x] Dock renders with app icons
- [x] Clicking app opens/focuses window
- [x] Active indicator shows for open apps
- [x] Tooltip appears on hover
- [x] Build succeeds

## Technical Notes

### Props Interface
```typescript
interface DockAppProps {
  id: string
  name: string
  icon: string
  isOpen?: boolean
  isFocused?: boolean
  onClick: (id: string) => void
}

interface DockProps {
  apps: DockAppConfig[]
  autoHide?: boolean
  className?: string
}
```

### Dock Apps Configuration
```typescript
const DOCK_APPS = [
  { id: 'files', name: 'Files', icon: '/themes/Yaru/apps/filemanager.png', appType: 'files' },
  { id: 'about', name: 'About Me', icon: '/themes/Yaru/apps/user-info.png', appType: 'about' },
  { id: 'terminal', name: 'Terminal', icon: '/themes/Yaru/apps/bash.png', appType: 'terminal' },
  { id: 'chrome', name: 'Projects', icon: '/themes/Yaru/apps/chrome.png', appType: 'chrome' },
  { id: 'vscode', name: 'VS Code', icon: '/themes/Yaru/apps/vscode.png', appType: 'vscode' },
  { id: 'player', name: 'Music', icon: '/themes/Yaru/apps/music.png', appType: 'player' },
]
```

### Visual States
- Default: Semi-transparent background
- Hover: Lighter background, show tooltip
- Active (open): Orange dot indicator on left
- Focused: Slightly brighter background
- Click bounce: Scale animation when opening new window
