# Project Context - Ubuntu Portfolio

A concise AI agent guide with patterns, rules, and implementation standards for the Ubuntu Portfolio project.

## Project Overview

**What:** Tarik Moody's Ubuntu desktop-themed portfolio with Sanity CMS, Webamp audio player, and real-time API integrations.

**Stack:**
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Sanity CMS (embedded Studio at `/studio`)
- Zustand (state management)
- Framer Motion (animations)
- Webamp (audio player)
- SWR + Zod (API fetching + validation)
- Tailwind CSS (styling)

**Key URLs:**
- Production: tarikmoody.com
- Sanity Studio: /studio
- Buy Me a Coffee: buymeacoffee.com/tarikmoody

---

## Directory Structure

```
portfolio/
├── app/                      # Next.js App Router
│   ├── (main)/              # Main portfolio routes
│   │   ├── page.tsx         # Desktop/boot sequence
│   │   └── layout.tsx       # Root layout
│   ├── studio/              # Sanity Studio route
│   │   └── [[...index]]/    # Catch-all for Studio
│   └── api/                 # API routes
│       ├── revalidate/      # ISR webhook
│       ├── spinitron/       # Spinitron proxy
│       └── mixcloud/        # Mixcloud proxy
├── components/
│   ├── boot/                # Boot sequence components
│   ├── desktop/             # Desktop environment
│   │   ├── Desktop.tsx      # Main desktop container
│   │   ├── Dock.tsx         # App dock
│   │   ├── Window.tsx       # Window shell
│   │   └── Shortcut.tsx     # Desktop icons
│   ├── apps/                # Desktop applications
│   │   ├── About/           # About app (tabbed)
│   │   ├── Terminal/        # Terminal app
│   │   ├── Chrome/          # Case studies browser
│   │   ├── Player/          # Webamp wrapper
│   │   └── Crates/          # Curated discoveries
│   └── ui/                  # Shared UI components
├── lib/
│   ├── sanity/              # Sanity client & queries
│   │   ├── client.ts        # Sanity client config
│   │   ├── queries.ts       # GROQ queries
│   │   └── schemas/         # Schema definitions
│   ├── stores/              # Zustand stores
│   │   ├── useWindowStore.ts
│   │   ├── useAudioStore.ts
│   │   ├── useTerminalStore.ts
│   │   └── useBootStore.ts
│   ├── api/                 # API utilities
│   │   ├── spinitron.ts     # Spinitron client
│   │   └── mixcloud.ts      # Mixcloud client
│   └── utils/               # Shared utilities
├── sanity/                  # Sanity Studio config
│   ├── schema.ts            # Schema exports
│   ├── structure.ts         # Studio structure
│   └── schemas/             # Schema definitions
└── types/                   # TypeScript types
    ├── sanity.ts            # Sanity document types
    ├── api.ts               # API response types
    └── stores.ts            # Store state types
```

---

## Coding Patterns

### 1. Component Pattern

```tsx
// components/apps/About/BioTab.tsx
import { PortableText } from '@portabletext/react'
import type { AboutSection } from '@/types/sanity'

interface BioTabProps {
  content: AboutSection
}

export function BioTab({ content }: BioTabProps) {
  return (
    <div className="p-4">
      <PortableText value={content.body} />
    </div>
  )
}
```

**Rules:**
- Named exports for components
- Props interface above component
- Types imported from `/types`
- Tailwind for styling

### 2. Zustand Store Pattern

```tsx
// lib/stores/useWindowStore.ts
import { create } from 'zustand'

interface WindowState {
  windows: Map<string, WindowConfig>
  activeWindowId: string | null
}

interface WindowActions {
  openWindow: (id: string, config: WindowConfig) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  updatePosition: (id: string, position: Position) => void
}

export const useWindowStore = create<WindowState & WindowActions>((set) => ({
  windows: new Map(),
  activeWindowId: null,

  openWindow: (id, config) => set((state) => {
    const windows = new Map(state.windows)
    windows.set(id, { ...config, zIndex: windows.size + 1 })
    return { windows, activeWindowId: id }
  }),

  closeWindow: (id) => set((state) => {
    const windows = new Map(state.windows)
    windows.delete(id)
    return { windows }
  }),

  // ... other actions
}))
```

**Rules:**
- Separate state and actions interfaces
- Use Map for collections with dynamic keys
- Return new state objects (immutable)

### 3. Sanity Query Pattern

```tsx
// lib/sanity/queries.ts
import { groq } from 'next-sanity'

export const aboutSectionsQuery = groq`
  *[_type == "aboutSection"] | order(order asc) {
    _id,
    tabName,
    body,
    order
  }
`

export const bootSequenceQuery = groq`
  *[_type == "bootSequence"][0] {
    asciiArt,
    messages[] {
      text,
      delay
    },
    totalDuration
  }
`
```

**Rules:**
- Use `groq` tagged template
- Order by `order` field for sortable content
- Use `[0]` for singletons
- Project only needed fields

### 4. Content Fetching Pattern

```tsx
// app/(main)/page.tsx
import { sanityFetch } from '@/lib/sanity/client'
import { bootSequenceQuery, desktopAppsQuery } from '@/lib/sanity/queries'

export const revalidate = 60 // ISR: 60 seconds

export default async function HomePage() {
  const [bootSequence, desktopApps] = await Promise.all([
    sanityFetch({ query: bootSequenceQuery }),
    sanityFetch({ query: desktopAppsQuery }),
  ])

  return <Desktop bootSequence={bootSequence} apps={desktopApps} />
}
```

**Rules:**
- Use `sanityFetch` wrapper (handles errors, caching)
- Parallel fetches with `Promise.all`
- Set `revalidate` for ISR
- Pass data as props to client components

### 5. API Route Pattern (Proxy)

```tsx
// app/api/spinitron/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const SpinitronsResponseSchema = z.object({
  items: z.array(z.object({
    artist: z.string(),
    song: z.string(),
    start: z.string(),
  }))
})

export async function GET() {
  try {
    const res = await fetch(
      `https://spinitron.com/api/spins?access_token=${process.env.SPINITRON_API_KEY}`,
      { next: { revalidate: 30 } }
    )

    const data = await res.json()
    const validated = SpinitronsResponseSchema.parse(data)

    return NextResponse.json(validated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch now playing' },
      { status: 500 }
    )
  }
}
```

**Rules:**
- Validate external API responses with Zod
- Use Next.js fetch caching
- Return graceful errors
- Keep API keys server-side

### 6. Client-Side Fetching Pattern (SWR)

```tsx
// hooks/useNowPlaying.ts
import useSWR from 'swr'
import type { SpinitronsResponse } from '@/types/api'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useNowPlaying(enabled: boolean) {
  const { data, error, isLoading } = useSWR<SpinitronsResponse>(
    enabled ? '/api/spinitron' : null,
    fetcher,
    { refreshInterval: 30000 } // 30 seconds
  )

  return {
    nowPlaying: data?.items[0] ?? null,
    isLoading,
    error
  }
}
```

**Rules:**
- Create hooks for reusable data fetching
- Use conditional fetching (`enabled ? url : null`)
- Set appropriate refresh intervals
- Return loading/error states

---

## Sanity Schema Rules

### Document Types

```tsx
// sanity/schemas/aboutSection.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'tabName',
      title: 'Tab Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }
  ],
  preview: {
    select: { title: 'tabName', order: 'order' },
    prepare: ({ title, order }) => ({ title, subtitle: `Order: ${order}` })
  }
})
```

**Rules:**
- Use `defineType` and `defineField`
- Add validation for required fields
- Include `order` field for sortable content
- Configure preview for Studio UX

### Singletons

```tsx
// sanity/schemas/siteSettings.ts
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Mark as singleton in structure.ts, not here
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'platform', type: 'string' },
        { name: 'url', type: 'url' }
      ]}]
    }),
  ]
})
```

---

## State Management Rules

### Store Responsibilities

| Store | Responsibility |
|-------|----------------|
| `useWindowStore` | Open windows, positions, z-index, minimize/maximize states |
| `useAudioStore` | Playback state, current stream, volume, now-playing metadata |
| `useTerminalStore` | Command history, output buffer, current input |
| `useBootStore` | Boot progress, completion state, skip preference |

### Cross-Store Communication

```tsx
// Example: Opening player from terminal command
const handleCommand = (cmd: string) => {
  if (cmd === 'play') {
    useWindowStore.getState().openWindow('player', { ... })
    useAudioStore.getState().play()
  }
}
```

**Rule:** Use `getState()` for cross-store access, not hooks.

---

## Animation Patterns (Framer Motion)

### Boot Sequence Animation

```tsx
// components/boot/BootMessage.tsx
import { motion } from 'framer-motion'

export function BootMessage({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="font-mono text-green-400"
    >
      {text}
    </motion.div>
  )
}
```

### Window Transitions

```tsx
// components/desktop/Window.tsx
<motion.div
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.95, opacity: 0 }}
  transition={{ duration: 0.15 }}
  className="absolute bg-ubuntu-window rounded-lg shadow-xl"
>
  {children}
</motion.div>
```

**Rules:**
- Use `AnimatePresence` for exit animations
- Keep durations short (0.1-0.3s) for UI responsiveness
- Use `layout` prop for smooth resizing

---

## Testing Approach

### Component Testing

```tsx
// __tests__/components/Terminal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Terminal } from '@/components/apps/Terminal'

describe('Terminal', () => {
  it('executes whoami command', async () => {
    render(<Terminal commands={mockCommands} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'whoami' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(await screen.findByText(/Tarik Moody/)).toBeInTheDocument()
  })
})
```

### Integration Testing

```tsx
// __tests__/integration/desktop.test.tsx
describe('Desktop Integration', () => {
  it('opens About app from dock', async () => {
    render(<Desktop />)

    fireEvent.click(screen.getByLabelText('Open About'))

    expect(await screen.findByRole('dialog', { name: 'About' })).toBeInTheDocument()
  })
})
```

---

## Performance Rules

1. **Lazy load apps** - Only load app components when opened
2. **Image optimization** - Use Sanity CDN with `next/image`
3. **Defer non-critical** - Load Webamp after first interaction
4. **Minimize re-renders** - Use `React.memo` for static components
5. **Bundle splitting** - Each app in its own chunk

```tsx
// Lazy loading example
const Terminal = dynamic(() => import('@/components/apps/Terminal'), {
  loading: () => <WindowSkeleton />
})
```

---

## Accessibility Rules

1. **Keyboard navigation** - All interactive elements focusable
2. **ARIA labels** - Dock items, window controls, form fields
3. **Focus management** - Focus new windows, trap focus in modals
4. **Reduced motion** - Respect `prefers-reduced-motion`
5. **Color contrast** - 4.5:1 minimum for text

```tsx
// ARIA example
<button
  aria-label="Close window"
  onClick={onClose}
  className="..."
>
  <XIcon />
</button>
```

---

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
SPINITRON_API_KEY=your_key
```

**Rules:**
- `NEXT_PUBLIC_` prefix for client-side access
- Never commit API keys
- Use Vercel environment variables in production

---

## Git Workflow

1. **Branch naming:** `epic-{n}/{story-description}` (e.g., `epic-1/sanity-setup`)
2. **Commit format:** `feat(scope): description` or `fix(scope): description`
3. **PR template:** Link to story, screenshots for UI changes
4. **Merge strategy:** Squash and merge to main

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run studio           # Start Sanity Studio dev

# Build
npm run build            # Production build
npm run lint             # ESLint check
npm run type-check       # TypeScript check

# Sanity
npx sanity deploy        # Deploy Studio
npx sanity schema extract # Generate schema types
```

### File Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utils: `camelCase.ts`
- Types: `camelCase.ts` (or `PascalCase` for component types)
- Schemas: `camelCase.ts`

---

*Generated for AI agent implementation guidance. Reference alongside epics.md for story context.*
