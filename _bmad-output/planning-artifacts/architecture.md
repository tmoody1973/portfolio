---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
status: 'complete'
completedAt: '2026-01-02'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/brainstorm-ubuntu-portfolio.md
  - _bmad-output/planning-artifacts/sanity-schema-design.md
  - README.md
workflowType: 'architecture'
project_name: 'portfolio'
user_name: 'Tarikmoody'
date: '2026-01-02'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (44 total):**
- Content Management: 7 FRs for Sanity CMS editorial capabilities
- Boot Sequence: 4 FRs for animated intro experience
- Desktop Environment: 5 FRs for Ubuntu-style window management
- Audio Player: 6 FRs for Webamp streaming integration
- About Application: 5 FRs for tabbed bio/career content
- Terminal Application: 5 FRs for command-line personality
- Case Studies: 5 FRs for project showcase (Chrome app)
- Contact & Social: 3 FRs for engagement touchpoints
- Responsive Experience: 4 FRs for mobile/tablet adaptation

**Non-Functional Requirements:**
- Performance: Lighthouse 90+ desktop, 80+ mobile; <3s audio load
- Reliability: Graceful degradation for API failures
- Accessibility: WCAG 2.1 AA for core content
- Security: HTTPS-only, CSP headers, Sanity auth
- Maintainability: All content via CMS without deploys

### Scale & Complexity

- Primary domain: Web Application (SPA with progressive enhancement)
- Complexity level: Medium-High
- Estimated architectural components: 8-10 major systems

### Technical Constraints & Dependencies

| Constraint | Impact |
|------------|--------|
| Brownfield codebase | Must integrate with existing Next.js structure |
| Icecast streams | External dependency for audio playback |
| Spinitron/Mixcloud APIs | Rate limits require caching strategy |
| Browser audio policies | User interaction required before autoplay |

### Cross-Cutting Concerns

1. **State Management**: Windows, audio player, boot sequence, terminal all require coordinated state
2. **Responsive Strategy**: Three distinct experiences (desktop simulation, tablet, mobile drawer)
3. **Error Resilience**: External APIs and streams may fail; graceful fallbacks required
4. **Content Synchronization**: Sanity webhooks or revalidation for content updates
5. **Performance Budget**: Heavy UI must not compromise load times

## Technology Stack Decisions

### Project Context: Brownfield

This is an extension of an existing Next.js portfolio (forked from vivek9patel). Rather than selecting a starter template, we're upgrading and extending the existing codebase.

### Stack Upgrades

| Component | Current | Target | Rationale |
|-----------|---------|--------|-----------|
| Next.js | v13 (Pages Router) | v15 (App Router) | Modern patterns, React Server Components, improved performance |
| Language | JavaScript | TypeScript | Type safety, better DX, catch errors at build time |
| Styling | Tailwind CSS | Tailwind CSS | Keep existing - works well |

### New Additions

| Addition | Package | Purpose |
|----------|---------|---------|
| **Sanity CMS** | `@sanity/client`, `next-sanity` | Content management |
| **Sanity Studio** | Embedded at `/studio` | Content editing (auth built-in, owner-only access) |
| **Webamp** | `webamp` | Winamp audio player |
| **State Management** | `zustand` | Lightweight stores for windows, audio, terminal, boot state |

### State Management Strategy: Zustand

Separate stores for independent state domains:

```
useWindowStore   → window positions, z-index, open/closed states
useAudioStore    → playing, volume, current station, stream status
useTerminalStore → command history, output buffer
useBootStore     → boot phase, animation state, skip preference
```

Rationale: ~1kb bundle, no provider wrappers, components subscribe only to what they need, excellent DevTools.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND: Next.js 15 (App Router, TypeScript)          │
│  ├── /studio → Sanity Studio (owner-only, auth built-in)│
│  ├── /api/spinitron → proxy for now-playing             │
│  └── /api/mixcloud → proxy for show archives            │
└─────────────────────────────────────────────────────────┘
          │                    │
          ▼                    ▼
┌─────────────────┐  ┌─────────────────────────────────┐
│  Sanity CMS     │  │  External APIs                  │
│  (Content)      │  │  ├── Spinitron (track metadata) │
│                 │  │  ├── Mixcloud (show archives)   │
│                 │  │  └── Icecast (audio streams)    │
└─────────────────┘  └─────────────────────────────────┘
```

### What We're NOT Adding

| Technology | Reason for Exclusion |
|------------|---------------------|
| Convex/Supabase/Firebase | No user accounts, no user-generated data to store |
| Separate auth system | Sanity handles Studio auth; visitors don't need accounts |
| Traditional database | Content in Sanity, dynamic data from external APIs |

## Core Architectural Decisions

### Caching Strategy

| Layer | Approach | Purpose |
|-------|----------|---------|
| **Server** | Next.js fetch cache with `revalidate` | Sanity content cached at build + on-demand ISR |
| **Client** | SWR for Spinitron/Mixcloud | Stale-while-revalidate for API freshness |
| **Streams** | No cache | Live Icecast connections |

Rationale: Sanity content changes infrequently (hours/days), so server-side caching with on-demand revalidation is ideal. External API data (now playing, recent tracks) needs client-side freshness with SWR's polling.

### Validation

**Zod** for runtime schema validation:
- Validate Spinitron API responses
- Validate Mixcloud API responses
- Type-safe environment variables
- Form validation (contact form)

Rationale: TypeScript handles compile-time safety; Zod handles runtime boundaries where external data enters the system.

### Animation

**Framer Motion** for:
- Boot sequence (ASCII glitch, typing effects, phase transitions)
- Window open/close/minimize animations
- Dock interactions
- Page transitions

Rationale: Declarative API, excellent Next.js/React integration, handles complex multi-phase animations well.

### Hosting & Deployment

| Service | Purpose |
|---------|---------|
| **Vercel** | Next.js hosting, automatic deployments |
| **Sanity Cloud** | CMS hosting (managed) |
| **Icecast** | Audio streams (external, 88Nine infrastructure) |

### Sanity Configuration

| Setting | Value | Rationale |
|---------|-------|-----------|
| Project | New project | Clean separation from other work |
| Plan | Free tier | Sufficient for portfolio content volume |
| Dataset | `production` | Single dataset for simplicity |
| Studio | Embedded at `/studio` | Single deployment, built-in auth |

## Implementation Patterns & Consistency Rules

### Naming Patterns

| Area | Convention | Example |
|------|------------|---------|
| Route folders | kebab-case | `/app/case-studies/[slug]/page.tsx` |
| Components | PascalCase files & exports | `DesktopWindow.tsx` → `export function DesktopWindow()` |
| Zustand stores | camelCase with `use` prefix | `useWindowStore.ts` |
| Sanity schemas | camelCase types | `desktopShortcut`, `aboutSection` |
| API routes | kebab-case folders | `/app/api/now-playing/route.ts` |
| Utilities | camelCase | `formatTrackTitle.ts` |
| Types | PascalCase, `.types.ts` suffix | `window.types.ts` → `WindowState` |

### Structure Patterns

```
/app
  /studio/[[...tool]]/page.tsx    → Sanity Studio
  /api/spinitron/route.ts         → API proxies
  /(desktop)/page.tsx             → Main desktop experience

/components
  /apps/                          → Desktop apps (About, Terminal, Chrome, Player)
  /desktop/                       → Window, Dock, Taskbar, Shortcuts
  /boot/                          → Boot sequence components
  /ui/                            → Shared UI primitives

/stores
  useWindowStore.ts
  useAudioStore.ts
  useTerminalStore.ts
  useBootStore.ts

/lib
  /sanity/                        → Client, queries, types
  /api/                           → External API helpers (Spinitron, Mixcloud)
  /utils/                         → Pure utility functions

/sanity
  /schemas/                       → Schema definitions
  /structure/                     → Studio structure config
```

### Format Patterns

**API Responses:**
```typescript
// Success
{ data: T, error: null }

// Error
{ data: null, error: { message: string, code?: string } }
```

**Sanity Queries:** Use `groq` tagged template literals with TypeScript return types.

**Dates:** ISO 8601 strings from APIs, formatted via `Intl.DateTimeFormat`.

### State Management Patterns

Zustand stores follow consistent structure:
- State properties (nouns): `windows`, `isPlaying`, `volume`
- Actions (verbs): `openWindow()`, `closeWindow()`, `setVolume()`
- Selectors for minimal re-renders: `useAudioStore((s) => s.isPlaying)`

### Error Handling Patterns

| Layer | Approach |
|-------|----------|
| API routes | Try/catch, return structured error response |
| Client fetching | SWR `error` state with fallback UI |
| Streams | Connection state in store, retry with backoff |
| Components | Error boundaries at app/window level |

### Loading State Patterns

- Boolean flags in stores: `isLoading`, `isConnecting`
- Skeleton UIs for content placeholders
- Optimistic updates where appropriate

### Additional Integration: Buy Me a Coffee

Integrated as:
1. **Desktop shortcut** - Coffee cup icon managed via Sanity `desktopShortcut`
2. **Terminal command** - `coffee` command with personality-driven output

## Project Structure & Boundaries

### Requirements → Components Mapping

| FR Category | Directory |
|-------------|-----------|
| Content Management (FR1-7) | `/sanity/schemas/`, `/app/studio/` |
| Boot Sequence (FR8-11) | `/components/boot/` |
| Desktop Environment (FR12-16) | `/components/desktop/` |
| Audio Player (FR17-22) | `/components/apps/Player/`, `/lib/api/` |
| About Application (FR23-27) | `/components/apps/About/` |
| Terminal Application (FR28-32) | `/components/apps/Terminal/` |
| Case Studies (FR33-37) | `/components/apps/Chrome/` |
| Contact & Social (FR38-40) | Desktop shortcuts (Sanity-managed) |
| Responsive Experience (FR41-44) | Mobile variants in each component |

### Complete Project Directory Structure

```
portfolio/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
│
├── app/
│   ├── globals.css
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Boot sequence → Desktop
│   │
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx              # Sanity Studio (FR1-7)
│   │
│   └── api/
│       ├── spinitron/
│       │   └── route.ts              # Now playing proxy (FR20-21)
│       ├── mixcloud/
│       │   └── route.ts              # Show archives proxy (FR22)
│       └── revalidate/
│           └── route.ts              # Sanity webhook revalidation
│
├── components/
│   ├── boot/
│   │   ├── BootSequence.tsx          # Main boot orchestrator (FR8-11)
│   │   ├── AsciiName.tsx             # ASCII art animation
│   │   ├── BootMessages.tsx          # Loading messages
│   │   └── SkipButton.tsx            # Skip preference (localStorage)
│   │
│   ├── desktop/
│   │   ├── Desktop.tsx               # Main desktop container (FR12)
│   │   ├── Dock.tsx                  # Ubuntu dock
│   │   ├── Taskbar.tsx               # Top taskbar
│   │   ├── Window.tsx                # Draggable window (FR14-16)
│   │   ├── DesktopIcon.tsx           # Shortcut icons (FR13)
│   │   └── Wallpaper.tsx             # Background image
│   │
│   ├── apps/
│   │   ├── About/
│   │   │   ├── AboutApp.tsx          # Container (FR23-27)
│   │   │   ├── BioTab.tsx
│   │   │   ├── JourneyTab.tsx
│   │   │   ├── EducationTab.tsx
│   │   │   └── SkillsTab.tsx
│   │   │
│   │   ├── Terminal/
│   │   │   ├── TerminalApp.tsx       # Container (FR28-32)
│   │   │   ├── CommandInput.tsx
│   │   │   ├── CommandOutput.tsx
│   │   │   └── commands/             # Command handlers
│   │   │
│   │   ├── Chrome/
│   │   │   ├── ChromeApp.tsx         # Case studies browser (FR33-37)
│   │   │   ├── CaseStudyList.tsx
│   │   │   └── CaseStudyDetail.tsx
│   │   │
│   │   └── Player/
│   │       ├── PlayerApp.tsx         # Webamp wrapper (FR17-22)
│   │       ├── StationSelector.tsx
│   │       ├── NowPlaying.tsx        # Spinitron data
│   │       └── ShowArchives.tsx      # Mixcloud data
│   │
│   ├── mobile/
│   │   ├── AppDrawer.tsx             # Mobile navigation (FR41)
│   │   ├── MobilePlayer.tsx          # Simplified player (FR42)
│   │   └── BottomNav.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Tabs.tsx
│       └── LoadingSpinner.tsx
│
├── stores/
│   ├── useWindowStore.ts             # Window state (positions, z-index, open/closed)
│   ├── useAudioStore.ts              # Audio state (playing, volume, station)
│   ├── useTerminalStore.ts           # Terminal state (history, output)
│   └── useBootStore.ts               # Boot state (phase, skip preference)
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts                 # Sanity client config
│   │   ├── queries.ts                # GROQ queries
│   │   └── types.ts                  # Generated/manual types
│   │
│   ├── api/
│   │   ├── spinitron.ts              # Spinitron API helpers
│   │   └── mixcloud.ts               # Mixcloud API helpers
│   │
│   └── utils/
│       ├── formatters.ts             # Date, track formatting
│       └── validators.ts             # Zod schemas
│
├── sanity/
│   ├── sanity.config.ts              # Studio configuration
│   ├── schemas/
│   │   ├── index.ts                  # Schema registry
│   │   ├── singletons/
│   │   │   ├── siteSettings.ts
│   │   │   ├── bootSequence.ts
│   │   │   ├── playerConfig.ts
│   │   │   └── themeSettings.ts
│   │   └── documents/
│   │       ├── desktopApp.ts
│   │       ├── desktopShortcut.ts    # Includes Buy Me a Coffee
│   │       ├── aboutSection.ts
│   │       ├── project.ts            # Case studies
│   │       ├── terminalCommand.ts    # Includes 'coffee' command
│   │       ├── radioStream.ts
│   │       └── wallpaper.ts
│   └── structure/
│       └── deskStructure.ts          # Studio sidebar
│
├── public/
│   ├── fonts/
│   ├── icons/                        # App & shortcut icons
│   ├── wallpapers/                   # Default wallpapers
│   └── skins/                        # Webamp skin (.wsz)
│
└── types/
    ├── window.types.ts
    ├── audio.types.ts
    ├── terminal.types.ts
    └── sanity.types.ts               # From Sanity typegen
```

### Architectural Boundaries

**API Boundaries:**

| Endpoint | Purpose | External Service |
|----------|---------|------------------|
| `/api/spinitron` | Now playing, recent tracks | Spinitron API |
| `/api/mixcloud` | Show archives | Mixcloud API |
| `/api/revalidate` | On-demand ISR | Sanity webhooks |

**Component Boundaries:**
- Desktop apps are self-contained in `/components/apps/`
- Each app manages its own UI; state lives in Zustand stores
- Apps communicate via stores, not prop drilling

**Data Flow:**
```
Sanity CMS → Server Components → Client Components
                    ↓
External APIs → API Routes → SWR hooks → Client Components
                                ↓
                         Zustand Stores → UI State
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices work together without conflicts. Next.js 15, TypeScript, Tailwind, Zustand, Sanity, and Webamp are fully compatible. All packages support React 19 and the App Router.

**Pattern Consistency:**
Naming conventions follow ecosystem standards (kebab-case routes, PascalCase components, camelCase stores). Structure patterns align with Next.js 15 App Router conventions.

**Structure Alignment:**
Project structure supports all architectural decisions. Boundaries are properly defined between apps, stores, and API routes.

### Requirements Coverage ✅

**Functional Requirements (44 total):**
| FR Category | Architectural Support |
|-------------|----------------------|
| Content Management (FR1-7) | Sanity schemas + embedded Studio |
| Boot Sequence (FR8-11) | `/components/boot/` + `useBootStore` + Framer Motion |
| Desktop Environment (FR12-16) | `/components/desktop/` + `useWindowStore` |
| Audio Player (FR17-22) | `/components/apps/Player/` + Webamp + API proxies |
| About Application (FR23-27) | `/components/apps/About/` with tabs |
| Terminal Application (FR28-32) | `/components/apps/Terminal/` + `useTerminalStore` |
| Case Studies (FR33-37) | `/components/apps/Chrome/` |
| Contact & Social (FR38-40) | Desktop shortcuts (Sanity-managed) |
| Responsive Experience (FR41-44) | `/components/mobile/` variants |

**Non-Functional Requirements:**
- Performance: Next.js App Router, ISR, SWR caching strategies
- Reliability: Error boundaries, graceful degradation patterns
- Accessibility: WCAG 2.1 AA compliance (implementation phase)
- Security: Sanity auth, HTTPS, CSP headers
- Maintainability: All content via Sanity CMS

### Implementation Readiness ✅

**Decision Completeness:** All critical decisions documented with versions and rationale.

**Structure Completeness:** Full directory tree defined with FR-to-component mapping.

**Pattern Completeness:** Naming, structure, format, state management, and error handling patterns specified.

### Gap Analysis

**Critical Gaps:** None

**External Dependencies (address during implementation):**
- Webamp skin file (.wsz) - create Ubuntu-themed skin
- Stream URLs from 88Nine infrastructure
- Spinitron API credentials (access confirmed)
- Buy Me a Coffee integration: `https://buymeacoffee.com/tarikmoody`

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Medium-High)
- [x] Technical constraints identified (brownfield, Icecast, API limits)
- [x] Cross-cutting concerns mapped (state, responsive, errors, content sync, performance)

**✅ Architectural Decisions**
- [x] Technology stack fully specified (Next.js 15, TypeScript, Zustand, Sanity)
- [x] Caching strategy defined (Next.js fetch + SWR)
- [x] Validation approach chosen (Zod)
- [x] Animation library selected (Framer Motion)

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] State management patterns specified
- [x] Error handling patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Clear separation of concerns (apps, stores, API routes)
- All content CMS-managed for editorial velocity
- Established patterns prevent implementation conflicts
- Brownfield approach preserves existing work while modernizing

**External URLs for Integration:**
- Buy Me a Coffee: `https://buymeacoffee.com/tarikmoody`

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-02
**Document Location:** `_bmad-output/planning-artifacts/architecture.md`

### Final Architecture Deliverables

**📋 Complete Architecture Document**
- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping (44 FRs → components)
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**
- 15+ architectural decisions made (stack, caching, validation, animation, hosting, patterns)
- 6 pattern categories defined (naming, structure, format, state, errors, loading)
- 8 architectural components specified (boot, desktop, apps, stores, lib, sanity, public, types)
- 44 functional requirements fully supported

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing the Ubuntu portfolio. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
1. Upgrade existing Next.js to v15 with App Router
2. Migrate codebase to TypeScript
3. Initialize Sanity project and embed Studio at `/studio`
4. Set up Zustand stores for window, audio, terminal, and boot state

**Development Sequence:**
1. Initialize project upgrades (Next.js 15, TypeScript)
2. Set up Sanity CMS with schemas from design document
3. Implement boot sequence with Framer Motion
4. Build desktop environment components
5. Integrate Webamp audio player
6. Add About, Terminal, and Chrome apps
7. Connect external APIs (Spinitron, Mixcloud)
8. Implement responsive mobile variants

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] All decisions work together without conflicts
- [x] Technology choices are compatible (Next.js 15, React 19, TypeScript, Zustand, Sanity)
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**
- [x] All 44 functional requirements are supported
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled (state, responsive, errors, content sync)
- [x] Integration points are defined (Sanity, Spinitron, Mixcloud, Icecast)

**✅ Implementation Readiness**
- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] FR-to-component mapping provided

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Create epics and stories, then begin implementation.

