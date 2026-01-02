# Story 2.3: Boot Messages Display

**Epic:** 2 - Boot Sequence Experience
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want to see personalized boot messages revealing Tarik's journey,
So that I understand his background before the desktop loads. (FR9)

## Acceptance Criteria

**Given** ASCII animation completes
**When** boot messages display
**Then** messages appear sequentially with configurable timing from CMS
**And** messages include professional journey hints (e.g., "Loading architecture blueprints... Howard '96")
**And** each message animates in with typewriter or fade effect
**And** message content is fully editable in Sanity Studio (FR3)

## Implementation Tasks

### 1. Create BootMessages Component
- [x] Create component that displays messages sequentially
- [x] Support typewriter animation for each message
- [x] Configure timing between messages
- [x] Style with terminal/console aesthetic

### 2. Integration with Boot Store
- [x] Connect to useBootStore for message index tracking
- [x] Advance message index as each completes
- [x] Support callback on all messages complete

### 3. Default Messages
- [x] Create default boot messages reflecting Tarik's journey
- [x] Support fetching messages from Sanity bootSequence

## Definition of Done
- [x] BootMessages component displays messages sequentially
- [x] Messages animate with typewriter effect
- [x] Timing is configurable
- [x] Build succeeds

## Implementation Notes

### Files Created
- `components/boot/BootMessage.tsx` - Single message with typewriter effect
- `components/boot/BootMessages.tsx` - Container managing sequential display
- Updated `components/boot/index.ts` - Exports

### Component Features

**BootMessage (single message):**
- Character-by-character typewriter animation
- Configurable typing duration
- Blinking underscore cursor during typing
- Delay before starting support
- onComplete callback

**BootMessages (container):**
- Sequential message display
- Configurable delay between messages
- Status prefix showing completion ([OK] / ...)
- Terminal green (#00ff00) default color
- onComplete callback when all messages done

### Default Boot Messages
```typescript
const DEFAULT_BOOT_MESSAGES = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Loading architecture blueprints... Howard \'96', delay: 200 },
  { text: 'Mounting design systems... RISD certified', delay: 200 },
  { text: 'Connecting to creative networks... NYC → LA → ATL', delay: 200 },
  { text: 'Loading radio frequencies... KCRW → Vocalo → WRIR', delay: 200 },
  { text: 'Initializing 88Nine Labs protocols...', delay: 200 },
  { text: 'Compiling 25+ years of curiosity...', delay: 200 },
  { text: 'System ready. Welcome.', delay: 300 },
]
```

### Usage Example
```tsx
import { BootMessages } from '@/components/boot'

<BootMessages
  messages={bootSequence?.messages}
  onComplete={() => transitionToDesktop()}
  color="#00ff00"
  showPrefix={true}
/>
```

### Props Interface
```typescript
interface BootMessagesProps {
  messages?: BootMessageItem[]  // Messages array (uses defaults if not provided)
  onComplete?: () => void       // Callback when all messages complete
  color?: string                // Text color (default: terminal green)
  className?: string            // Additional CSS classes
  showPrefix?: boolean          // Show [OK]/... prefix (default: true)
  prefix?: string               // Custom prefix (default: '[OK]')
}

interface BootMessageItem {
  text: string                  // Message text
  delay?: number                // Delay after previous message (ms)
  typingDuration?: number       // Custom typing duration (ms)
}
```
