# Story 2.4: Skip Boot Functionality

**Epic:** 2 - Boot Sequence Experience
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a returning visitor,
I want to skip the boot sequence,
So that I can access the desktop immediately on repeat visits. (FR10)

## Acceptance Criteria

**Given** boot sequence is playing
**When** user clicks "Skip" or presses Escape
**Then** boot sequence immediately completes
**And** preference is stored in localStorage
**And** on next visit, boot sequence auto-skips if preference is set
**And** user can clear preference to see boot again (via terminal command or settings)

## Implementation Tasks

### 1. Create SkipButton Component
- [x] Create subtle skip button that appears during boot
- [x] Position in corner of screen
- [x] Show keyboard hint (Press ESC or click to skip)
- [x] Fade in after brief delay

### 2. Keyboard Handler
- [x] Listen for Escape key during boot sequence
- [x] Trigger skip action on keypress
- [x] Clean up listener when boot completes

### 3. Integration
- [x] Connect to useBootStore skip action
- [x] Verify localStorage persistence works (from Story 2.1)
- [x] Verify auto-skip on return visits works (from Story 2.1)

## Definition of Done
- [x] Skip button appears during boot
- [x] Escape key triggers skip
- [x] Skip action completes boot immediately
- [x] localStorage persists preference
- [x] Build succeeds

## Implementation Notes

### Files Created
- `components/boot/SkipButton.tsx` - Skip button with keyboard handler
- Updated `components/boot/index.ts` - Exports

### Component Features
- **Delayed appearance**: Shows after configurable delay (default 1 second)
- **Escape key support**: Global keyboard listener for ESC key
- **Subtle styling**: Semi-transparent, bottom-right positioned
- **Keyboard hint**: Shows "ESC" badge next to "Skip" text
- **Hover effects**: Smooth transitions on hover
- **Accessibility**: Proper aria-label, focus ring
- **Backdrop blur**: Glass-morphism effect

### Props Interface
```typescript
interface SkipButtonProps {
  onSkip: () => void       // Callback when skip triggered
  showDelay?: number       // Delay before showing (default: 1000ms)
  enabled?: boolean        // Enable/disable skip (default: true)
  className?: string       // Additional CSS classes
}
```

### Usage Example
```tsx
import { SkipButton } from '@/components/boot'
import { useBootStore } from '@/store'

function BootScreen() {
  const { skip, isBooting } = useBootStore()

  return (
    <div>
      {/* Boot content */}
      <SkipButton
        onSkip={skip}
        enabled={isBooting}
        showDelay={1000}
      />
    </div>
  )
}
```

### Integration with Boot Store
The SkipButton connects to the useBootStore (Story 2.1) which handles:
- Setting `hasSkipped` to true
- Setting `isComplete` to true
- Persisting `hasSeenBoot` to localStorage
- Auto-skipping on subsequent visits via `startBoot()`
