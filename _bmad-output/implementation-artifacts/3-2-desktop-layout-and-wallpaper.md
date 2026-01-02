# Story 3.2: Desktop Layout and Wallpaper

**Epic:** 3 - Desktop Environment Shell
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want to see an Ubuntu-styled desktop with configurable wallpaper,
So that the portfolio has an authentic OS aesthetic. (FR12)

## Acceptance Criteria

**Given** boot sequence completes
**When** desktop renders
**Then** wallpaper displays from Sanity `themeSettings` selection
**And** desktop has proper Ubuntu color scheme and styling
**And** desktop grid is visible for icon placement
**And** layout responds to viewport size

## Implementation Tasks

### 1. Create Desktop Component
- [x] Create main Desktop container component
- [x] Support wallpaper image from Sanity or default
- [x] Full viewport coverage with proper layering

### 2. Desktop Layout Areas
- [x] Create icon grid area for shortcuts
- [x] Reserve space for dock at bottom
- [x] Reserve space for top bar/navbar

### 3. Styling and Responsiveness
- [x] Apply Ubuntu color scheme
- [x] Responsive layout for different viewports
- [x] Proper z-index layering for windows

## Definition of Done
- [x] Desktop component renders with wallpaper
- [x] Ubuntu styling applied
- [x] Responsive layout working
- [x] Build succeeds

## Implementation Notes

### Files Created
- `components/desktop/Desktop.tsx` - Main desktop container component
- `components/desktop/Wallpaper.tsx` - Wallpaper background with Next.js Image
- `components/desktop/index.ts` - Re-exports
- Updated `app/globals.css` - Desktop environment styles

### Desktop Component Props
```typescript
interface DesktopProps {
  wallpaper?: string      // Wallpaper key or URL
  children?: ReactNode    // Icon grid content
  topBar?: ReactNode      // Top navbar content
  dock?: ReactNode        // Dock content
  windowLayer?: ReactNode // Window layer content
}
```

### Wallpaper Component
```typescript
const DEFAULT_WALLPAPERS: Record<string, string> = {
  'wall-1': '/images/wallpapers/wall-1.webp',
  'wall-2': '/images/wallpapers/wall-2.webp',
  // ... wall-3 through wall-8
}

interface WallpaperProps {
  wallpaper?: string       // Key or full URL
  fallbackColor?: string   // Default: #2c001e (Ubuntu purple)
}
```

### Layout Structure
```
.desktop (fixed, full viewport)
├── Wallpaper (z-index: -10, background layer)
├── .desktop-topbar (z-index: 50, 28px height)
├── .desktop-content (z-index: 10, flex: 1)
│   └── .desktop-icon-grid (auto-fill grid, 85px columns)
├── .desktop-dock (z-index: 50, 56px min-height)
└── .desktop-windows (z-index: 40, pointer-events: none)
```

### Z-Index Layers
| Layer | Z-Index | Purpose |
|-------|---------|---------|
| Wallpaper | -10 | Background image |
| Icon Grid | 10 | Desktop shortcuts |
| Windows | 40 | Application windows |
| Top Bar | 50 | System bar |
| Dock | 50 | App launcher |

### Responsive Breakpoints
- **Desktop (>768px)**: 85px icon columns, 28px topbar, 56px dock
- **Tablet (768px)**: 75px icon columns, 24px topbar, 64px dock
- **Mobile (480px)**: 70px icon columns

### Ubuntu Color Scheme
- Background fallback: `#2C001E` (dark aubergine)
- Top bar: `rgba(0, 0, 0, 0.85)` with backdrop blur
- Dock: `rgba(0, 0, 0, 0.7)` with backdrop blur

### Usage Example
```tsx
import { Desktop } from '@/components/desktop'

function App() {
  return (
    <Desktop
      wallpaper="wall-2"
      topBar={<TopBar />}
      dock={<Dock />}
      windowLayer={<WindowManager />}
    >
      {/* Desktop shortcuts render here */}
      <DesktopShortcut icon="/icons/about.svg" label="About" />
    </Desktop>
  )
}
```
