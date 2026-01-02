# Story 3.6: Window Dragging (Desktop Only)

**Epic:** 3 - Desktop Environment Shell
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a desktop visitor,
I want to drag windows to reposition them,
So that I can arrange my workspace. (FR16)

## Acceptance Criteria

**Given** a window is open on desktop viewport (>= 1024px)
**When** user drags the title bar
**Then** window follows cursor position smoothly
**And** window position is constrained to viewport bounds
**And** dragging is disabled on tablet/mobile viewports
**And** position updates persist in window store during session

## Implementation Tasks

### 1. Add react-draggable Integration to WindowShell
- [x] Import Draggable from react-draggable
- [x] Wrap window div with Draggable component
- [x] Configure title bar as drag handle
- [x] Add nodeRef for React strict mode compatibility

### 2. Handle Drag Bounds
- [x] Calculate viewport bounds dynamically
- [x] Account for dock width on left side
- [x] Account for navbar height at top
- [x] Prevent windows from being dragged off-screen

### 3. Position Updates
- [x] Update window position in store on drag stop
- [x] Use controlled position from store state
- [x] Disable dragging when maximized

### 4. Responsive Behavior
- [x] Detect viewport width with useEffect/useState
- [x] Disable dragging on viewports < 1024px
- [x] Handle window resize events

## Definition of Done
- [x] Window can be dragged by title bar
- [x] Drag bounds constrain to viewport
- [x] Position persists in store
- [x] Dragging disabled when maximized
- [x] Dragging disabled on mobile/tablet
- [x] Build succeeds

## Technical Notes

### Draggable Configuration
```typescript
<Draggable
  axis="both"
  handle=".window-title-bar"
  bounds={{ left: DOCK_WIDTH, top: NAVBAR_HEIGHT, right: maxX, bottom: maxY }}
  position={{ x: window.position.x, y: window.position.y }}
  disabled={window.isMaximized || isMobile}
  nodeRef={windowRef}
  onStop={handleDragStop}
>
```

### Bounds Calculation
```typescript
const DOCK_WIDTH = 50 // Left dock
const NAVBAR_HEIGHT = 28 // Top navbar

const calculateBounds = () => ({
  left: DOCK_WIDTH,
  top: NAVBAR_HEIGHT,
  right: window.innerWidth - windowWidth,
  bottom: window.innerHeight - windowHeight,
})
```
