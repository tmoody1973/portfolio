# Story 3.1: Window State Management

**Epic:** 3 - Desktop Environment Shell
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a developer,
I want a Zustand store managing all window states,
So that apps can be opened, closed, minimized, and positioned consistently.

## Acceptance Criteria

**Given** the desktop environment loads
**When** window state changes occur
**Then** `useWindowStore` tracks open windows with `id`, `title`, `isMinimized`, `isMaximized`, `position`, `zIndex`
**And** actions exist for `openWindow`, `closeWindow`, `minimizeWindow`, `maximizeWindow`, `focusWindow`, `updatePosition`
**And** z-index management ensures focused window is always on top

## Implementation Tasks

### 1. Create Window Store
- [x] Create `useWindowStore` with window state tracking
- [x] Define Window interface with all required properties
- [x] Implement z-index management for window stacking

### 2. Window Actions
- [x] Implement `openWindow` action
- [x] Implement `closeWindow` action
- [x] Implement `minimizeWindow` action
- [x] Implement `maximizeWindow` action
- [x] Implement `focusWindow` action
- [x] Implement `updatePosition` action

### 3. Helper Utilities
- [x] Add selector hooks for common patterns
- [x] Add utility for getting active window
- [x] Add utility for window ordering

## Definition of Done
- [x] Zustand store created and typed
- [x] All window actions working correctly
- [x] Z-index management ensures proper stacking
- [x] Build succeeds

## Implementation Notes

### Files Created
- `store/useWindowStore.ts` - Window state management store
- Updated `store/index.ts` - Re-exports

### Window State Interface
```typescript
interface WindowState {
  id: string
  title: string
  icon?: string
  isMinimized: boolean
  isMaximized: boolean
  position: WindowPosition  // { x, y }
  size: WindowSize          // { width, height }
  zIndex: number
  appType: string
  initialData?: Record<string, unknown>
}
```

### Store Actions
| Action | Description |
|--------|-------------|
| `openWindow(options)` | Open new window or focus existing |
| `closeWindow(id)` | Close window and activate next |
| `minimizeWindow(id)` | Minimize to dock |
| `restoreWindow(id)` | Restore from minimized |
| `maximizeWindow(id)` | Maximize to fullscreen |
| `toggleMaximize(id)` | Toggle maximize state |
| `focusWindow(id)` | Bring to front (highest z-index) |
| `updatePosition(id, pos)` | Update window position |
| `updateSize(id, size)` | Update window size |
| `closeAllWindows()` | Close all windows |

### Z-Index Management
- Base z-index: 100
- Each focus/open increments `highestZIndex`
- Focused window always gets `highestZIndex + 1`
- When closing active window, next highest z-index becomes active

### Default Window Sizes
```typescript
const DEFAULT_WINDOW_SIZES = {
  about: { width: 700, height: 500 },
  terminal: { width: 650, height: 450 },
  chrome: { width: 900, height: 600 },
  player: { width: 400, height: 300 },
  crates: { width: 800, height: 550 },
  default: { width: 600, height: 400 },
}
```

### Selector Hooks
```typescript
useActiveWindow()        // Get currently active window
useWindow(id)            // Get specific window by ID
useOpenWindows()         // Get all non-minimized windows
useMinimizedWindows()    // Get all minimized windows
useIsWindowOpen(id)      // Check if window is open
useIsWindowActive(id)    // Check if window is active
```

### Usage Example
```tsx
import { useWindowStore } from '@/store'

function Dock() {
  const { openWindow, windows } = useWindowStore()

  const handleOpenAbout = () => {
    openWindow({
      id: 'about',
      title: 'About',
      appType: 'about',
      icon: '/icons/about.svg',
    })
  }

  return (
    <button onClick={handleOpenAbout}>
      Open About
    </button>
  )
}
```

### Window Positioning
- New windows cascade with 30px offset
- Position based on count of visible (non-minimized) windows
- Default start position: (100, 80)
