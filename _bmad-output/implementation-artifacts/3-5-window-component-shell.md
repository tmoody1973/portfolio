# Story 3.5: Window Component Shell

**Epic:** 3 - Desktop Environment Shell
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want application windows with a consistent shell/frame,
So that I can interact with apps in a familiar window interface.

## Acceptance Criteria

**Given** an application window is opened
**When** the window is rendered
**Then** it displays a title bar with the app title
**And** it has minimize, maximize, and close buttons
**And** it contains the app content area
**And** clicking window controls triggers appropriate actions
**And** the window integrates with the window store

## Implementation Tasks

### 1. Create WindowShell Component
- [x] Modern functional component with hooks
- [x] Integrate with Zustand window store
- [x] Support position and size from store
- [x] Handle focus management on click

### 2. Create WindowTitleBar Component
- [x] Display window title (centered)
- [x] Ubuntu-style dark title bar background
- [x] Draggable area for window movement

### 3. Create WindowControls Component
- [x] Minimize button (yellow/amber style optional)
- [x] Maximize/Restore toggle button
- [x] Close button (orange Ubuntu style)
- [x] Proper hover states

### 4. Create WindowContent Component
- [x] Scrollable content area
- [x] Dark background
- [x] Render app-specific content via children

### 5. Integrate with Window Store
- [x] Get window state from store
- [x] Dispatch close/minimize/maximize actions
- [x] Handle focus on window click

## Definition of Done
- [x] WindowShell renders with title bar and controls
- [x] Window controls work (close, minimize, maximize)
- [x] Window content renders properly
- [x] Window integrates with store
- [x] Build succeeds

## Technical Notes

### WindowShell Props
```typescript
interface WindowShellProps {
  windowId: string
  children: ReactNode
}
```

### Component Hierarchy
```
WindowShell
├── WindowTitleBar
│   └── title text
├── WindowControls
│   ├── minimize button
│   ├── maximize/restore button
│   └── close button
└── WindowContent
    └── {children}
```

### Integration with Store
```typescript
const {
  windows,
  activeWindowId,
  closeWindow,
  minimizeWindow,
  toggleMaximize,
  focusWindow
} = useWindowStore()

const window = windows.find(w => w.id === windowId)
```
