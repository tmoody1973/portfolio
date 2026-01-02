# Story 2.5: Desktop Transition

**Epic:** 2 - Boot Sequence Experience
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want a smooth transition from boot sequence to desktop,
So that the experience feels polished and intentional. (FR11)

## Acceptance Criteria

**Given** boot sequence completes (naturally or via skip)
**When** transition occurs
**Then** boot screen fades out with Framer Motion animation
**And** desktop fades in simultaneously
**And** total boot duration is < 5 seconds (configurable in CMS)
**And** desktop is fully interactive after transition completes

## Implementation Tasks

### 1. Create BootSequence Orchestrator
- [x] Create component that manages full boot flow
- [x] Coordinate ASCII animation → Messages → Complete phases
- [x] Connect to useBootStore for state management
- [x] Support Sanity content for ASCII art and messages

### 2. Transition Animations
- [x] Fade out boot screen on complete
- [x] Fade in desktop simultaneously
- [x] Smooth cross-fade effect
- [x] Configurable transition duration

### 3. Integration
- [x] Export BootSequence as main boot entry point
- [x] Ensure desktop is interactive after transition
- [x] Handle skip gracefully with immediate transition

## Definition of Done
- [x] BootSequence orchestrates full boot flow
- [x] Smooth fade transition to desktop
- [x] Total duration < 5 seconds
- [x] Build succeeds

## Implementation Notes

### Files Created
- `components/boot/BootSequence.tsx` - Main orchestrator component
- Updated `components/boot/index.ts` - Exports

### Boot Sequence Flow
```
┌─────────────────────────────────────────────────────┐
│                    Boot Sequence                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Phase 1: ASCII Animation (~2 seconds)              │
│  ┌─────────────────────────────────────────────┐   │
│  │  ████████╗ █████╗ ██████╗ ██╗██╗  ██╗       │   │
│  │  ... TARIK MOODY ASCII art ...              │   │
│  └─────────────────────────────────────────────┘   │
│                      ↓                              │
│  Phase 2: Boot Messages (~2-3 seconds)              │
│  ┌─────────────────────────────────────────────┐   │
│  │  [OK] Initializing system...                │   │
│  │  [OK] Loading architecture blueprints...    │   │
│  │  [OK] System ready. Welcome.                │   │
│  └─────────────────────────────────────────────┘   │
│                      ↓                              │
│  Phase 3: Exit Animation (~0.8 seconds)             │
│  ┌─────────────────────────────────────────────┐   │
│  │  Fade out → onComplete callback             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [ESC] Skip  ← Available throughout                 │
└─────────────────────────────────────────────────────┘
```

### Phase Management
- `ascii` - Initial phase, ASCII name animation
- `messages` - Sequential boot messages
- `complete` - Messages done, starting exit
- `exiting` - Exit animation done, unmounted

### Props Interface
```typescript
interface BootSequenceProps {
  asciiArt?: string              // Custom ASCII art from Sanity
  messages?: BootMessageItem[]   // Custom messages from Sanity
  asciiDuration?: number         // ASCII animation duration (default: 2000ms)
  onComplete?: () => void        // Callback after exit animation
  onSkip?: () => void            // Callback when skip triggered
  isActive?: boolean             // Show/hide boot sequence
  exitDuration?: number          // Exit fade duration (default: 800ms)
  backgroundColor?: string       // Background color (default: black)
}
```

### Usage Example
```tsx
import { BootSequence } from '@/components/boot'
import { useBootStore } from '@/store'

function App() {
  const { isBooting, complete, skip } = useBootStore()

  return (
    <>
      <BootSequence
        isActive={isBooting}
        onComplete={complete}
        onSkip={skip}
        asciiArt={bootConfig?.asciiArt}
        messages={bootConfig?.messages}
      />

      {/* Desktop renders underneath, becomes visible after boot */}
      <Desktop />
    </>
  )
}
```

### Timing Budget (< 5 seconds total)
| Phase | Duration |
|-------|----------|
| ASCII Animation | ~2000ms |
| Boot Messages | ~2000ms (8 messages × ~250ms each) |
| Exit Transition | ~800ms |
| **Total** | **~4.8 seconds** |

### Features
- **Framer Motion animations**: Smooth enter/exit for each phase
- **Skip support**: ESC key or click skips to exit immediately
- **Configurable**: All durations and content customizable
- **Sanity ready**: Accepts ASCII art and messages from CMS
- **Branding footer**: Subtle "portfolio v3.0 • powered by curiosity"
- **Z-index management**: Boot sequence overlays at z-50
