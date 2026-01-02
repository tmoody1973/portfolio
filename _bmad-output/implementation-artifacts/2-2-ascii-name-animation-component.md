# Story 2.2: ASCII Name Animation Component

**Epic:** 2 - Boot Sequence Experience
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want to see an animated ASCII art display of "TARIK MOODY" during boot,
So that I get an immediate visual identity introduction. (FR8)

## Acceptance Criteria

**Given** the boot sequence starts
**When** the ASCII animation plays
**Then** ASCII art renders character-by-character with typing effect
**And** animation uses Framer Motion for smooth rendering
**And** ASCII art content is fetched from Sanity `bootSequence` singleton
**And** animation completes within 2 seconds

## Implementation Tasks

### 1. Install Dependencies
- [x] Install Framer Motion for animations (already present)

### 2. Create AsciiName Component
- [x] Create component with typing animation effect
- [x] Support character-by-character reveal
- [x] Configure animation timing (complete in ~2 seconds)
- [x] Style with monospace font and terminal colors

### 3. Integration
- [x] Connect to boot sequence state store
- [x] Support fetching ASCII art from Sanity
- [x] Add fallback default ASCII art

## Definition of Done
- [x] Framer Motion installed
- [x] AsciiName component renders with typing effect
- [x] Animation completes within 2 seconds
- [x] Build succeeds

## Implementation Notes

### Files Created
- `components/boot/AsciiName.tsx` - Main ASCII animation component
- `components/boot/index.ts` - Re-exports for clean imports

### Component Features
- **Character-by-character reveal**: Reveals non-whitespace characters sequentially
- **Configurable timing**: `duration` prop controls total animation time (default 2000ms)
- **Blinking cursor**: Shows during animation, disappears on completion
- **Callback support**: `onComplete` callback when animation finishes
- **Sanity integration ready**: Accepts `asciiArt` prop from CMS
- **Default fallback**: Includes "TARIK MOODY" ASCII art as default
- **Responsive sizing**: Text scales appropriately on different viewports
- **Ubuntu theming**: Default color is Ubuntu orange (#e95420)

### Props Interface
```typescript
interface AsciiNameProps {
  asciiArt?: string      // ASCII art string (uses default if not provided)
  duration?: number      // Animation duration in ms (default: 2000)
  onComplete?: () => void // Callback when animation completes
  color?: string         // Text color (default: Ubuntu orange)
  className?: string     // Additional CSS classes
}
```

### Usage Example
```tsx
import { AsciiName } from '@/components/boot'

<AsciiName
  asciiArt={bootSequence?.asciiArt}
  duration={2000}
  onComplete={() => advanceToMessages()}
/>
```
