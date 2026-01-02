---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-01-02'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/sanity-schema-design.md
epicCount: 10
storyCount: 57
frCoverage: FR1-FR50 (100%)
validationPassed: true
---

# portfolio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for the Ubuntu Portfolio, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Content Management (FR1-7)**
- FR1: Site owner can edit all text content (bio, about sections, journey timeline) via Sanity Studio
- FR2: Site owner can add, edit, and reorder desktop shortcuts and their URLs
- FR3: Site owner can configure boot sequence messages and timing
- FR4: Site owner can manage terminal command responses
- FR5: Site owner can add and edit case study projects with rich content
- FR6: Site owner can upload and manage wallpaper images
- FR7: Site owner can configure radio stream URLs and metadata

**Boot Sequence (FR8-11)**
- FR8: Visitors see animated ASCII name display on initial page load
- FR9: Visitors see personalized boot messages that reveal professional journey
- FR10: Visitors can skip boot sequence after first view (localStorage preference)
- FR11: Boot sequence completes and transitions to desktop within configured time

**Desktop Environment (FR12-16)**
- FR12: Visitors see Ubuntu-styled desktop with dock and icons
- FR13: Visitors can click desktop shortcuts to open external links in new tabs
- FR14: Visitors can open apps in desktop windows (About, Terminal, Chrome, Player)
- FR15: Visitors can minimize, maximize, and close app windows
- FR16: Visitors can reposition app windows via drag (desktop only)

**Audio Player (FR17-22)**
- FR17: Visitors can play/pause radio streams via Webamp interface
- FR18: Visitors can switch between available radio stations
- FR19: Visitors can adjust volume with visual feedback
- FR20: Visitors see current track metadata when available (Spinitron integration)
- FR21: Visitors see recent tracks list when available
- FR22: Visitors can access Mixcloud show archives from player interface

**About Application (FR23-27)**
- FR23: Visitors can view bio/introduction content
- FR24: Visitors can view career journey timeline
- FR25: Visitors can view education and credentials
- FR26: Visitors can view skills and expertise areas
- FR27: Visitors can navigate between about sections via tabs

**Terminal Application (FR28-32)**
- FR28: Visitors can type commands in terminal interface
- FR29: Visitors receive responses to recognized commands (whoami, help, clear, etc.)
- FR30: Visitors see helpful error messages for unrecognized commands
- FR31: Terminal displays personality-consistent responses reflecting Tarik's voice
- FR32: Visitors can view command history and use arrow keys to navigate

**Case Studies (FR33-37)**
- FR33: Visitors can browse list of featured projects
- FR34: Visitors can view individual case study with full details
- FR35: Case studies display in architecture-inspired format (Context, Concept, Process, Execution, Result, Reflection)
- FR36: Case studies include screenshots and visual assets
- FR37: Visitors can navigate between case studies

**Contact & Social (FR38-40)**
- FR38: Visitors can access contact form or email link
- FR39: Visitors can access all social platform links (GitHub, LinkedIn, Substack, X, etc.)
- FR40: Desktop shortcuts provide quick access to social profiles

**Responsive Experience (FR41-44)**
- FR41: Mobile visitors can access all content via app drawer/list navigation
- FR42: Mobile visitors can use simplified audio player controls
- FR43: Tablet visitors see optimized single-window desktop experience
- FR44: All interactive elements are touch-friendly on mobile devices

### NonFunctional Requirements

**Performance**
- NFR1: Lighthouse Performance Score 90+ (desktop), 80+ (mobile)
- NFR2: First Contentful Paint < 1.5 seconds
- NFR3: Time to Interactive < 3.5 seconds
- NFR4: Audio Stream Load Time < 3 seconds to first audio
- NFR5: Boot Sequence Duration < 5 seconds (skippable)

**Reliability**
- NFR6: Sanity CMS content served via CDN with 99.9% uptime
- NFR7: Graceful degradation when Spinitron/Mixcloud APIs unavailable
- NFR8: Fallback UI states for failed audio stream connections
- NFR9: Error boundaries prevent single component failures from crashing app

**Accessibility**
- NFR10: WCAG 2.1 AA compliance for core content
- NFR11: Full keyboard accessibility for all interactive elements
- NFR12: Alt text for images, ARIA labels for interactive components
- NFR13: 4.5:1 minimum color contrast for text

**Security**
- NFR14: HTTPS-only deployment
- NFR15: Sanity Studio authentication for content management
- NFR16: No sensitive data stored client-side
- NFR17: CSP headers to prevent XSS

**Maintainability**
- NFR18: All content editable via Sanity Studio without code changes
- NFR19: TypeScript for type safety across codebase
- NFR20: Component-based architecture for reusability
- NFR21: Clear separation between content (Sanity) and presentation (Next.js)

### Additional Requirements

**From Architecture (Brownfield Upgrade):**
- Upgrade from Next.js 13 (Pages Router) to Next.js 15 (App Router)
- Migrate codebase from JavaScript to TypeScript
- Implement Zustand state management with 4 stores (useWindowStore, useAudioStore, useTerminalStore, useBootStore)
- Integrate Sanity CMS with embedded Studio at `/studio`
- Implement Webamp npm package for audio player
- Use Framer Motion for boot sequence and UI animations
- Implement SWR for client-side API data fetching (Spinitron, Mixcloud)
- Use Zod for runtime validation of external API responses
- Create API proxy routes for Spinitron (`/api/spinitron`) and Mixcloud (`/api/mixcloud`)
- Implement on-demand ISR via Sanity webhooks (`/api/revalidate`)

**From Sanity Schema Design:**
- Implement 4 Singleton schemas: siteSettings, bootSequence, playerConfig, themeSettings
- Implement 10 Document types: desktopApp, desktopShortcut, aboutSection, project, skill, education, experience, radioStream, terminalCommand, wallpaper
- Configure Sanity Studio structure with grouped content
- Pre-populate boot messages and default desktop shortcuts

**Integration URLs:**
- Buy Me a Coffee: `https://buymeacoffee.com/tarikmoody`

**Crates / Curated Discoveries (FR45-50) - NEW**
- FR45: Site owner can add curated items (music, books, links, tools) with title, notes, and embed/link type via Sanity Studio
- FR46: Visitors can browse curated discoveries in a record store-inspired section
- FR47: Visitors can play YouTube embeds directly in the portfolio
- FR48: Visitors can play/preview Bandcamp embeds directly in the portfolio
- FR49: Visitors can browse book recommendations with cover images and purchase links
- FR50: Visitors can browse curated links/tools with descriptions and external URLs

### FR Coverage Map

| Epic | FRs Covered |
|------|-------------|
| Epic 1: Foundation & CMS Infrastructure | FR1-7 |
| Epic 2: Boot Sequence Experience | FR8-11 |
| Epic 3: Desktop Environment Shell | FR12-16 |
| Epic 4: About Application | FR23-27 |
| Epic 5: Terminal Application | FR28-32 |
| Epic 6: Audio Player (Webamp) | FR17-22 |
| Epic 7: Case Studies (Chrome App) | FR33-37 |
| Epic 8: Contact & Social Integration | FR38-40 |
| Epic 9: Responsive Experience | FR41-44 |
| Epic 10: Crates (Curated Discoveries) | FR45-50 |

## Epic List

### Epic 1: Foundation & CMS Infrastructure
**User Value:** Site owner can manage all portfolio content without code changes
**FRs:** FR1-7
**Dependencies:** None (foundational)
**Scope:** Sanity CMS setup, schema implementation, Studio configuration, Next.js 15 upgrade, TypeScript migration

### Epic 2: Boot Sequence Experience
**User Value:** Visitors experience storytelling introduction revealing professional journey
**FRs:** FR8-11
**Dependencies:** Epic 1 (boot messages from CMS)
**Scope:** ASCII animation, boot messages, skip functionality, localStorage preference, transition to desktop

### Epic 3: Desktop Environment Shell
**User Value:** Visitors interact with Ubuntu-styled desktop interface
**FRs:** FR12-16
**Dependencies:** Epic 1 (shortcuts/apps from CMS)
**Scope:** Desktop layout, dock, window management (open/close/minimize/maximize/drag), Zustand window store

### Epic 4: About Application
**User Value:** Visitors learn about Tarik's background, journey, and expertise
**FRs:** FR23-27
**Dependencies:** Epic 1 (content from CMS), Epic 3 (window shell)
**Scope:** Tabbed interface, bio content, journey timeline, education, skills display

### Epic 5: Terminal Application
**User Value:** Visitors discover personality through interactive command interface
**FRs:** FR28-32
**Dependencies:** Epic 1 (commands from CMS), Epic 3 (window shell)
**Scope:** Command input, response rendering, history navigation, personality-driven responses

### Epic 6: Audio Player (Webamp)
**User Value:** Visitors can listen to live radio streams and explore show archives
**FRs:** FR17-22
**Dependencies:** Epic 1 (stream config from CMS)
**Scope:** Webamp integration, stream switching, Spinitron now-playing, Mixcloud archives, volume control

### Epic 7: Case Studies (Chrome App)
**User Value:** Visitors explore technical projects with detailed documentation
**FRs:** FR33-37
**Dependencies:** Epic 1 (projects from CMS), Epic 3 (window shell)
**Scope:** Project list, individual case study view, architecture-inspired format, screenshots, navigation

### Epic 8: Contact & Social Integration
**User Value:** Visitors can connect via preferred channels
**FRs:** FR38-40
**Dependencies:** Epic 1 (links from CMS), Epic 3 (desktop shortcuts)
**Scope:** Contact form/email, social links, desktop shortcut icons

### Epic 9: Responsive Experience
**User Value:** Visitors on any device get functional portfolio experience
**FRs:** FR41-44
**Dependencies:** Epics 3-8 (all apps must be responsive)
**Scope:** Mobile app drawer, tablet optimization, touch interactions, simplified mobile player

### Epic 10: Crates (Curated Discoveries)
**User Value:** Visitors explore Tarik's curated recommendations across music, books, links, and tools — like browsing a record store
**FRs:** FR45-50
**Dependencies:** Epic 1 (discoveries from CMS), Epic 3 (window shell)
**Scope:** Record store-inspired UI, crate browsing metaphor, multiple content types (music w/ YouTube/Bandcamp embeds, books w/ covers, links/tools w/ descriptions), curator notes explaining why each item matters, category filtering
**Concept:** Desktop app styled as a crate-digging experience — visitors flip through Tarik's curated picks across different "crates" (Music, Books, Links) with playable embeds, purchase links, and personal notes on each discovery

---

## Epic 1: Foundation & CMS Infrastructure

**Epic Goal:** Establish the technical foundation with Next.js 15, TypeScript, and Sanity CMS so that all portfolio content can be managed without code changes.

**FRs Covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7

### Story 1.1: Next.js 15 App Router Migration

As a developer,
I want the portfolio upgraded from Next.js 13 Pages Router to Next.js 15 App Router,
So that I can leverage modern React Server Components and improved performance.

**Acceptance Criteria:**

**Given** the existing Next.js 13 codebase
**When** the migration is complete
**Then** the app uses App Router with `app/` directory structure
**And** existing pages render without errors
**And** build completes successfully with no TypeScript errors
**And** the site runs in development and production modes

### Story 1.2: TypeScript Configuration and Base Types

As a developer,
I want TypeScript configured across the codebase with base type definitions,
So that I have type safety and IDE support throughout development.

**Acceptance Criteria:**

**Given** the migrated Next.js 15 app
**When** TypeScript is configured
**Then** `tsconfig.json` is configured with strict mode
**And** base types for window state, audio state, and boot state are defined
**And** all existing components compile without type errors
**And** Zod schemas exist for external API response validation

### Story 1.3: Sanity Project Setup and Studio Integration

As a site owner,
I want Sanity CMS connected to the portfolio with an embedded Studio at `/studio`,
So that I can access the content management interface directly from my site.

**Acceptance Criteria:**

**Given** a new Sanity project is created
**When** the integration is complete
**Then** Sanity Studio is accessible at `/studio` route
**And** Studio authentication works correctly
**And** environment variables are configured for project ID and dataset
**And** Sanity client is configured for fetching content

### Story 1.4: Core Singleton Schemas (Site Settings, Boot, Player, Theme)

As a site owner,
I want singleton schemas for site-wide settings,
So that I can configure boot sequence, player options, and theme settings in one place.

**Acceptance Criteria:**

**Given** Sanity Studio is integrated
**When** singleton schemas are deployed
**Then** `siteSettings` schema exists with site title, description, social links
**And** `bootSequence` schema exists with ASCII art and boot messages array
**And** `playerConfig` schema exists with default stream and skin settings
**And** `themeSettings` schema exists with wallpaper selection
**And** all singletons are editable in Studio

### Story 1.5: Desktop Content Schemas (Apps and Shortcuts)

As a site owner,
I want to manage desktop apps and shortcuts in the CMS,
So that I can add, edit, and reorder what appears on the Ubuntu desktop. (FR2)

**Acceptance Criteria:**

**Given** Sanity singletons are configured
**When** desktop schemas are deployed
**Then** `desktopApp` schema exists with app type, title, icon, and window config
**And** `desktopShortcut` schema exists with title, icon, URL, and order
**And** shortcuts can be reordered via drag-and-drop in Studio
**And** default shortcuts are pre-populated (GitHub, LinkedIn, Substack, etc.)

### Story 1.6: About Content Schemas (Sections, Experience, Education, Skills)

As a site owner,
I want to manage all About app content in the CMS,
So that I can update my bio, journey, education, and skills without code changes. (FR1)

**Acceptance Criteria:**

**Given** desktop schemas exist
**When** about schemas are deployed
**Then** `aboutSection` schema exists with tab name, content blocks, and order
**And** `experience` schema exists with company, role, dates, description
**And** `education` schema exists with institution, degree, dates, details
**And** `skill` schema exists with name, category, proficiency level
**And** content can be managed in grouped Studio sections

### Story 1.7: Project and Terminal Schemas

As a site owner,
I want to manage case studies and terminal commands in the CMS,
So that I can add projects and customize terminal responses. (FR4, FR5)

**Acceptance Criteria:**

**Given** about schemas exist
**When** project and terminal schemas are deployed
**Then** `project` schema exists with title, slug, sections (Context/Concept/Process/Execution/Result/Reflection), images
**And** `terminalCommand` schema exists with command name, response text, aliases
**And** default terminal commands are pre-populated (`whoami`, `help`, `clear`)

### Story 1.8: Media and Stream Schemas (Wallpaper, Radio Streams)

As a site owner,
I want to manage wallpapers and radio streams in the CMS,
So that I can update visual assets and audio configurations. (FR6, FR7)

**Acceptance Criteria:**

**Given** project schemas exist
**When** media schemas are deployed
**Then** `wallpaper` schema exists with image, name, and active flag
**And** `radioStream` schema exists with name, stream URL, Spinitron station ID, artwork
**And** all media can be uploaded and managed in Studio

*Note: `curatedItem` schema for Crates app is handled in Epic 10 Story 10.1*

### Story 1.9: Sanity Studio Structure and Content Groups

As a site owner,
I want the Sanity Studio organized into logical content groups,
So that I can easily find and edit different types of content.

**Acceptance Criteria:**

**Given** all schemas are deployed
**When** Studio structure is configured
**Then** content is grouped: Settings, Desktop, About, Projects, Terminal, Media, Crates
**And** singletons appear at the top of their groups
**And** document lists show relevant preview information
**And** Studio navigation is intuitive for non-technical users

### Story 1.10: Content Fetching Utilities and ISR Configuration

As a developer,
I want typed content fetching utilities with ISR revalidation,
So that content updates go live quickly without full rebuilds.

**Acceptance Criteria:**

**Given** all schemas are in place
**When** fetching utilities are created
**Then** GROQ queries exist for all content types with TypeScript types
**And** Next.js ISR is configured with appropriate revalidation times
**And** `/api/revalidate` webhook endpoint exists for on-demand revalidation
**And** Sanity webhook is configured to trigger revalidation on publish

---

## Epic 2: Boot Sequence Experience

**Epic Goal:** Create an animated boot sequence that tells Tarik's story before the desktop loads, with the ability to skip on return visits.

**FRs Covered:** FR8, FR9, FR10, FR11

### Story 2.1: Boot Sequence State Management

As a developer,
I want a Zustand store managing boot sequence state,
So that boot progress, completion, and skip preferences are tracked consistently.

**Acceptance Criteria:**

**Given** the app loads
**When** boot sequence state is needed
**Then** `useBootStore` exists with `isBooting`, `currentMessageIndex`, `isComplete`, `hasSkipped` state
**And** actions exist for `advanceMessage`, `complete`, `skip`, `reset`
**And** localStorage persistence tracks whether user has seen boot sequence before

### Story 2.2: ASCII Name Animation Component

As a visitor,
I want to see an animated ASCII art display of "TARIK MOODY" during boot,
So that I get an immediate visual identity introduction. (FR8)

**Acceptance Criteria:**

**Given** the boot sequence starts
**When** the ASCII animation plays
**Then** ASCII art renders character-by-character with typing effect
**And** animation uses Framer Motion for smooth rendering
**And** ASCII art content is fetched from Sanity `bootSequence` singleton
**And** animation completes within 2 seconds

### Story 2.3: Boot Messages Display

As a visitor,
I want to see personalized boot messages revealing Tarik's journey,
So that I understand his background before the desktop loads. (FR9)

**Acceptance Criteria:**

**Given** ASCII animation completes
**When** boot messages display
**Then** messages appear sequentially with configurable timing from CMS
**And** messages include professional journey hints (e.g., "Loading architecture blueprints... Howard '96")
**And** each message animates in with typewriter or fade effect
**And** message content is fully editable in Sanity Studio (FR3)

### Story 2.4: Skip Boot Functionality

As a returning visitor,
I want to skip the boot sequence,
So that I can access the desktop immediately on repeat visits. (FR10)

**Acceptance Criteria:**

**Given** boot sequence is playing
**When** user clicks "Skip" or presses Escape
**Then** boot sequence immediately completes
**And** preference is stored in localStorage
**And** on next visit, boot sequence auto-skips if preference is set
**And** user can clear preference to see boot again (via terminal command or settings)

### Story 2.5: Desktop Transition

As a visitor,
I want a smooth transition from boot sequence to desktop,
So that the experience feels polished and intentional. (FR11)

**Acceptance Criteria:**

**Given** boot sequence completes (naturally or via skip)
**When** transition occurs
**Then** boot screen fades out with Framer Motion animation
**And** desktop fades in simultaneously
**And** total boot duration is < 5 seconds (configurable in CMS)
**And** desktop is fully interactive after transition completes

---

## Epic 3: Desktop Environment Shell

**Epic Goal:** Create the Ubuntu-styled desktop interface with dock, icons, and window management capabilities.

**FRs Covered:** FR12, FR13, FR14, FR15, FR16

### Story 3.1: Window State Management

As a developer,
I want a Zustand store managing all window states,
So that apps can be opened, closed, minimized, and positioned consistently.

**Acceptance Criteria:**

**Given** the desktop environment loads
**When** window state changes occur
**Then** `useWindowStore` tracks open windows with `id`, `title`, `isMinimized`, `isMaximized`, `position`, `zIndex`
**And** actions exist for `openWindow`, `closeWindow`, `minimizeWindow`, `maximizeWindow`, `focusWindow`, `updatePosition`
**And** z-index management ensures focused window is always on top

### Story 3.2: Desktop Layout and Wallpaper

As a visitor,
I want to see an Ubuntu-styled desktop with configurable wallpaper,
So that the portfolio has an authentic OS aesthetic. (FR12)

**Acceptance Criteria:**

**Given** boot sequence completes
**When** desktop renders
**Then** wallpaper displays from Sanity `themeSettings` selection
**And** desktop has proper Ubuntu color scheme and styling
**And** desktop grid is visible for icon placement
**And** layout responds to viewport size

### Story 3.3: Desktop Shortcut Icons

As a visitor,
I want to see and click desktop shortcut icons,
So that I can quickly access external links. (FR13)

**Acceptance Criteria:**

**Given** desktop is rendered
**When** shortcuts are displayed
**Then** icons render from Sanity `desktopShortcut` documents
**And** icons display in configured order with proper spacing
**And** clicking a shortcut opens the URL in a new tab
**And** icons show hover state and selection feedback

### Story 3.4: Dock Component with App Launchers

As a visitor,
I want a dock at the bottom of the screen showing available apps,
So that I can launch applications like in Ubuntu. (FR12, FR14)

**Acceptance Criteria:**

**Given** desktop is rendered
**When** dock displays
**Then** dock shows icons for available apps (About, Terminal, Chrome, Player, Crates)
**And** clicking an app icon opens the app in a window
**And** dock shows indicator for open apps
**And** dock icons have hover animations
**And** dock can auto-hide on smaller viewports

### Story 3.5: Window Component Shell

As a visitor,
I want apps to open in window containers with standard controls,
So that I can interact with multiple apps like a real desktop. (FR14, FR15)

**Acceptance Criteria:**

**Given** an app is opened
**When** the window renders
**Then** window has Ubuntu-styled title bar with app name and icon
**And** window has close (X), minimize (-), and maximize (+) buttons
**And** close button removes window from screen
**And** minimize button hides window (accessible from dock)
**And** maximize button toggles between windowed and full-screen

### Story 3.6: Window Dragging (Desktop Only)

As a desktop visitor,
I want to drag windows to reposition them,
So that I can arrange my workspace. (FR16)

**Acceptance Criteria:**

**Given** a window is open on desktop viewport (>= 1024px)
**When** user drags the title bar
**Then** window follows cursor position smoothly
**And** window position is constrained to viewport bounds
**And** dragging is disabled on tablet/mobile viewports
**And** position updates persist in window store during session

---

## Epic 4: About Application

**Epic Goal:** Build the About app showing Tarik's bio, career journey, education, and skills in a tabbed interface.

**FRs Covered:** FR23, FR24, FR25, FR26, FR27

### Story 4.1: About App Window Integration

As a visitor,
I want to open the About app from the dock or desktop,
So that I can learn about Tarik's background.

**Acceptance Criteria:**

**Given** desktop is rendered
**When** About icon is clicked
**Then** About app opens in a window container
**And** window uses the standard window shell component
**And** window has appropriate default size and position
**And** app content renders inside window body

### Story 4.2: Tabbed Navigation Component

As a visitor,
I want to navigate between About sections via tabs,
So that I can explore different aspects of Tarik's background. (FR27)

**Acceptance Criteria:**

**Given** About app is open
**When** tabs are displayed
**Then** tab bar shows: Bio, Journey, Education, Skills
**And** clicking a tab switches content panel
**And** active tab is visually highlighted
**And** tab order matches Sanity `aboutSection` order field

### Story 4.3: Bio Section Content

As a visitor,
I want to read Tarik's bio and introduction,
So that I understand who he is and what he does. (FR23)

**Acceptance Criteria:**

**Given** About app is open on Bio tab
**When** content renders
**Then** bio content displays from Sanity Portable Text
**And** rich text formatting (bold, links, lists) renders correctly
**And** profile photo displays if configured
**And** content is fully editable in Sanity Studio

### Story 4.4: Journey Timeline Section

As a visitor,
I want to view Tarik's career journey as a timeline,
So that I understand his professional path. (FR24)

**Acceptance Criteria:**

**Given** About app is on Journey tab
**When** timeline renders
**Then** `experience` documents display chronologically
**And** each entry shows company, role, dates, and description
**And** timeline has visual connecting line between entries
**And** cities/locations are highlighted to show geographic journey

### Story 4.5: Education Section

As a visitor,
I want to view Tarik's educational background,
So that I understand his formal training. (FR25)

**Acceptance Criteria:**

**Given** About app is on Education tab
**When** content renders
**Then** `education` documents display with institution, degree, dates
**And** additional details/achievements render if present
**And** entries are ordered by date (most recent first)

### Story 4.6: Skills Section

As a visitor,
I want to view Tarik's skills and expertise areas,
So that I understand his capabilities. (FR26)

**Acceptance Criteria:**

**Given** About app is on Skills tab
**When** content renders
**Then** `skill` documents display grouped by category
**And** skills show proficiency level (visual indicator)
**And** categories include: Technical, Creative, Leadership, Domain
**And** skills are filterable or searchable (optional enhancement)

---

## Epic 5: Terminal Application

**Epic Goal:** Create an interactive terminal where visitors can discover Tarik's personality through commands.

**FRs Covered:** FR28, FR29, FR30, FR31, FR32

### Story 5.1: Terminal State Management

As a developer,
I want a Zustand store managing terminal state,
So that command history, output, and input are tracked consistently.

**Acceptance Criteria:**

**Given** terminal is opened
**When** state management is needed
**Then** `useTerminalStore` exists with `history`, `commandHistory`, `currentInput`, `historyIndex`
**And** actions exist for `executeCommand`, `setInput`, `navigateHistory`, `clearTerminal`
**And** command history persists during session

### Story 5.2: Terminal App Window Integration

As a visitor,
I want to open the Terminal app from the dock,
So that I can interact with the command interface.

**Acceptance Criteria:**

**Given** desktop is rendered
**When** Terminal icon is clicked
**Then** Terminal opens in a window with Ubuntu terminal styling
**And** window has dark background with green/white text
**And** cursor blinks in input area
**And** terminal auto-focuses on open

### Story 5.3: Command Input and Display

As a visitor,
I want to type commands and see output,
So that I can interact with the terminal. (FR28)

**Acceptance Criteria:**

**Given** Terminal is open
**When** user types and presses Enter
**Then** command appears in output history
**And** response displays below command
**And** new prompt appears for next input
**And** terminal scrolls to show latest output

### Story 5.4: Core Command Responses

As a visitor,
I want recognized commands to return responses,
So that I can discover information about Tarik. (FR29, FR31)

**Acceptance Criteria:**

**Given** Terminal is open
**When** user types a recognized command
**Then** `whoami` returns personality-driven introduction
**And** `help` returns list of available commands
**And** `clear` clears terminal output
**And** responses reflect Tarik's voice and personality (FR31)
**And** command responses are fetched from Sanity `terminalCommand` documents

### Story 5.5: Extended Commands (Journey, Neofetch, Stations)

As a visitor,
I want additional discovery commands,
So that I can explore deeper. (FR29, FR31)

**Acceptance Criteria:**

**Given** Terminal is open
**When** extended commands are typed
**Then** `journey` displays career path summary
**And** `neofetch` displays system info styled as portfolio stats
**And** `stations` lists available radio streams
**And** `88ninelabs` describes the tech initiative
**And** all responses are CMS-editable

### Story 5.6: Unrecognized Command Handling

As a visitor,
I want helpful feedback for unknown commands,
So that I'm guided toward valid options. (FR30)

**Acceptance Criteria:**

**Given** Terminal is open
**When** user types unrecognized command
**Then** error message displays: "Command not found: [command]. Type 'help' for available commands."
**And** message tone is friendly, not harsh
**And** suggestions for similar commands appear if applicable

### Story 5.7: Command History Navigation

As a visitor,
I want to navigate previous commands with arrow keys,
So that I can re-run commands easily. (FR32)

**Acceptance Criteria:**

**Given** Terminal has command history
**When** user presses Up/Down arrow keys
**Then** Up arrow cycles through previous commands (newest to oldest)
**And** Down arrow cycles forward through history
**And** current position is tracked in store
**And** pressing Enter executes the selected historical command

---

## Epic 6: Audio Player (Webamp)

**Epic Goal:** Integrate a working Webamp player with live radio streams, now-playing metadata, and show archives.

**FRs Covered:** FR17, FR18, FR19, FR20, FR21, FR22

### Story 6.1: Audio State Management

As a developer,
I want a Zustand store managing audio player state,
So that playback, volume, and stream selection are tracked consistently.

**Acceptance Criteria:**

**Given** audio player is used
**When** state changes occur
**Then** `useAudioStore` tracks `isPlaying`, `currentStream`, `volume`, `nowPlaying`, `recentTracks`
**And** actions exist for `play`, `pause`, `setVolume`, `switchStream`, `updateNowPlaying`
**And** volume persists in localStorage

### Story 6.2: Webamp Integration and Basic Playback

As a visitor,
I want a Winamp-style player that actually plays audio,
So that I can listen to Rhythm Lab Radio. (FR17)

**Acceptance Criteria:**

**Given** Player app is opened or Webamp is visible
**When** play button is clicked
**Then** Webamp npm package initializes correctly
**And** default stream (Rhythm Lab 24/7) begins playing
**And** pause button stops playback
**And** audio plays through browser audio API

### Story 6.3: Stream Switching

As a visitor,
I want to switch between available radio stations,
So that I can explore different streams. (FR18)

**Acceptance Criteria:**

**Given** Webamp is playing
**When** user accesses stream menu
**Then** available streams display from Sanity `radioStream` documents
**And** selecting a stream switches playback to that URL
**And** current stream is visually indicated
**And** transition between streams is smooth

### Story 6.4: Volume Control

As a visitor,
I want to adjust the player volume,
So that I can control audio levels. (FR19)

**Acceptance Criteria:**

**Given** Webamp is rendered
**When** volume slider is adjusted
**Then** audio volume changes accordingly
**And** volume level is visually displayed
**And** mute toggle is available
**And** volume preference persists across sessions

### Story 6.5: Spinitron Now Playing Integration

As a visitor,
I want to see what track is currently playing,
So that I can discover new music. (FR20)

**Acceptance Criteria:**

**Given** a stream with Spinitron integration is playing
**When** now-playing data is fetched
**Then** `/api/spinitron` proxy route handles API calls
**And** SWR fetches data with 30-second polling interval
**And** current track artist and title display in Webamp
**And** Zod validates API response structure
**And** graceful fallback if Spinitron is unavailable (NFR7)

### Story 6.6: Recent Tracks Display

As a visitor,
I want to see recently played tracks,
So that I can explore what I might have missed. (FR21)

**Acceptance Criteria:**

**Given** Spinitron integration is active
**When** recent tracks are fetched
**Then** last 5-10 tracks display in playlist area
**And** each track shows artist, title, and timestamp
**And** list updates as new tracks are logged

### Story 6.7: Mixcloud Archives Access

As a visitor,
I want to access Rhythm Lab show archives,
So that I can listen to past episodes. (FR22)

**Acceptance Criteria:**

**Given** Player app is open
**When** archives section is accessed
**Then** `/api/mixcloud` proxy route fetches latest episodes
**And** last 5 episodes display with title, date, duration
**And** clicking an episode opens Mixcloud in new tab
**And** data is cached with 1-hour refresh (NFR7)

---

## Epic 7: Case Studies (Chrome App)

**Epic Goal:** Build the Chrome app to showcase technical projects with architecture-inspired documentation.

**FRs Covered:** FR33, FR34, FR35, FR36, FR37

### Story 7.1: Chrome App Window Integration

As a visitor,
I want to open a Chrome-styled app from the dock,
So that I can browse projects like a web browser.

**Acceptance Criteria:**

**Given** desktop is rendered
**When** Chrome icon is clicked
**Then** Chrome app opens in a window with browser chrome styling
**And** window has address bar showing current view
**And** navigation buttons (back, forward) are present
**And** window uses standard window shell

### Story 7.2: Project List View

As a visitor,
I want to browse a list of featured projects,
So that I can choose which to explore. (FR33)

**Acceptance Criteria:**

**Given** Chrome app is open
**When** project list displays
**Then** `project` documents from Sanity render as cards
**And** each card shows title, thumbnail, and brief description
**And** cards are clickable to view full case study
**And** projects are ordered by Sanity order field

### Story 7.3: Case Study Detail View

As a visitor,
I want to view individual case studies with full details,
So that I can understand the project deeply. (FR34)

**Acceptance Criteria:**

**Given** project card is clicked
**When** case study view loads
**Then** full project content renders from Sanity
**And** address bar updates to show project slug
**And** back button returns to project list
**And** content uses architecture-inspired layout

### Story 7.4: Architecture-Inspired Section Format

As a visitor,
I want case studies organized in an architecture-inspired format,
So that I see structured thinking. (FR35)

**Acceptance Criteria:**

**Given** case study detail view is open
**When** content sections render
**Then** sections display in order: Context, Concept, Process, Execution, Result, Reflection
**And** each section has clear heading and content area
**And** sections are visually distinct with proper hierarchy
**And** missing sections gracefully hide (not all projects need all sections)

### Story 7.5: Screenshot Gallery

As a visitor,
I want to see screenshots and visual assets in case studies,
So that I can see the work visually. (FR36)

**Acceptance Criteria:**

**Given** case study has images
**When** images render
**Then** images display responsively within sections
**And** clicking an image opens lightbox view
**And** gallery navigation available for multiple images
**And** images are optimized via Sanity CDN

### Story 7.6: Case Study Navigation

As a visitor,
I want to navigate between case studies,
So that I can explore multiple projects easily. (FR37)

**Acceptance Criteria:**

**Given** case study detail view is open
**When** navigation is available
**Then** "Previous" and "Next" links appear at bottom
**And** navigation wraps around (last → first)
**And** current position indicator shows "2 of 5"
**And** keyboard navigation (left/right arrows) is supported

---

## Epic 8: Contact & Social Integration

**Epic Goal:** Enable visitors to connect with Tarik via contact form and social platform links.

**FRs Covered:** FR38, FR39, FR40

### Story 8.1: Desktop Shortcut Social Links

As a visitor,
I want desktop shortcuts for social profiles,
So that I can quickly access Tarik's platforms. (FR40)

**Acceptance Criteria:**

**Given** desktop is rendered
**When** shortcuts display
**Then** icons appear for GitHub, LinkedIn, Substack, X (Twitter), Buy Me a Coffee
**And** clicking opens respective profile in new tab
**And** all URLs are configured via Sanity `desktopShortcut` documents
**And** icons match platform branding

### Story 8.2: Social Links in Dock/Menu

As a visitor,
I want social links accessible from the dock or menu,
So that they're always available. (FR39)

**Acceptance Criteria:**

**Given** desktop interface is active
**When** social access point is clicked
**Then** social links appear in dropdown or panel
**And** links match desktop shortcuts
**And** includes all platforms from `siteSettings.socialLinks`

### Story 8.3: Contact Form or Email Link

As a visitor,
I want to contact Tarik directly,
So that I can reach out for opportunities. (FR38)

**Acceptance Criteria:**

**Given** contact option is accessed (via About app or dock)
**When** contact UI displays
**Then** either a contact form or mailto link is available
**And** if form: fields for name, email, message with validation
**And** if mailto: opens default email client with pre-filled subject
**And** contact method is configurable in Sanity `siteSettings`

---

## Epic 9: Responsive Experience

**Epic Goal:** Ensure the portfolio works well across mobile, tablet, and desktop viewports.

**FRs Covered:** FR41, FR42, FR43, FR44

### Story 9.1: Mobile App Drawer Navigation

As a mobile visitor,
I want an app drawer to access all content,
So that I can navigate without the desktop metaphor. (FR41)

**Acceptance Criteria:**

**Given** viewport is < 768px
**When** mobile layout renders
**Then** dock is replaced with bottom navigation or hamburger menu
**And** app drawer lists all available apps
**And** tapping an app opens it in full-screen view
**And** navigation between apps is smooth

### Story 9.2: Mobile Audio Player Controls

As a mobile visitor,
I want simplified audio controls,
So that I can easily play/pause and switch streams. (FR42)

**Acceptance Criteria:**

**Given** mobile viewport
**When** audio player is accessed
**Then** simplified player UI replaces full Webamp
**And** play/pause button is prominent and touch-friendly
**And** stream switcher is accessible
**And** now-playing info displays compactly

### Story 9.3: Tablet Desktop Optimization

As a tablet visitor,
I want an optimized single-window experience,
So that the interface suits my screen size. (FR43)

**Acceptance Criteria:**

**Given** viewport is 768px - 1199px
**When** tablet layout renders
**Then** desktop metaphor is maintained but simplified
**And** only one window is visible at a time (full-screen apps)
**And** dock remains visible for app switching
**And** window dragging is disabled (touch optimization)

### Story 9.4: Touch-Friendly Interactions

As a mobile/tablet visitor,
I want all interactive elements to be touch-friendly,
So that I can use the portfolio without frustration. (FR44)

**Acceptance Criteria:**

**Given** touch device is used
**When** interactive elements are tapped
**Then** touch targets are minimum 44x44px
**And** hover states have touch equivalents
**And** swipe gestures are supported where appropriate
**And** no interactions require hover to function

---

## Epic 10: Crates (Curated Discoveries)

**Epic Goal:** Create a record store-inspired app where visitors can browse Tarik's curated recommendations across music, books, links, and tools.

**FRs Covered:** FR45, FR46, FR47, FR48, FR49, FR50

### Story 10.1: Curated Item Sanity Schema

As a site owner,
I want to add curated items of different types in the CMS,
So that I can share music, books, links, and tools with visitors. (FR45)

**Acceptance Criteria:**

**Given** Sanity Studio is accessible
**When** `curatedItem` schema is deployed
**Then** schema includes: title, creator/author, curator notes (rich text), item type (music/book/link/tool)
**And** music items have: embed type (YouTube/Bandcamp), embed URL, genre tags
**And** book items have: cover image, author, purchase URL (Amazon/Bookshop.org)
**And** link items have: URL, description, category tag
**And** all items have: discovery date, featured flag, order
**And** Studio shows preview based on item type

### Story 10.2: Crates App Window Integration

As a visitor,
I want to open the Crates app from the dock,
So that I can browse Tarik's curated recommendations.

**Acceptance Criteria:**

**Given** desktop is rendered
**When** Crates icon is clicked
**Then** Crates app opens in a window with record store styling
**And** window has warm, vinyl-inspired color scheme
**And** app title is "Crates"
**And** crate category tabs/filters are visible (Music, Books, Links, All)

### Story 10.3: Crate Category Navigation

As a visitor,
I want to filter curated items by category,
So that I can focus on a specific type of recommendation. (FR46)

**Acceptance Criteria:**

**Given** Crates app is open
**When** category tabs/filters are displayed
**Then** tabs show: All, Music, Books, Links
**And** clicking a tab filters displayed items
**And** "All" shows mixed feed of all curated items
**And** item count is shown per category

### Story 10.4: Music Item Display with Embeds

As a visitor,
I want to browse and play music recommendations,
So that I can discover new tracks. (FR46, FR47, FR48)

**Acceptance Criteria:**

**Given** Crates app shows Music category
**When** music items display
**Then** items render as album art cards (like records in a bin)
**And** cards show artist, title, and genre tag
**And** clicking a card expands to show embed player (YouTube or Bandcamp)
**And** YouTube/Bandcamp iframe is playable directly
**And** CSP headers allow both YouTube and Bandcamp iframes

### Story 10.5: Book Recommendations Display

As a visitor,
I want to browse book recommendations with cover images,
So that I can discover what Tarik is reading. (FR49)

**Acceptance Criteria:**

**Given** Crates app shows Books category
**When** book items display
**Then** books render as cover image cards (like books on a shelf)
**And** cards show title, author, and optional category tag
**And** clicking a card expands to show curator notes
**And** "Buy" button links to purchase URL (Amazon/Bookshop.org)
**And** purchase link opens in new tab

### Story 10.6: Curated Links and Tools Display

As a visitor,
I want to browse curated links and tools,
So that I can discover resources Tarik recommends. (FR50)

**Acceptance Criteria:**

**Given** Crates app shows Links category
**When** link items display
**Then** items render as cards with title and description preview
**And** cards show category tag (tool, article, resource, etc.)
**And** clicking a card shows full description and curator notes
**And** "Visit" button opens external URL in new tab

### Story 10.7: Curator Notes Display

As a visitor,
I want to read why Tarik selected each item,
So that I get his perspective as a tastemaker.

**Acceptance Criteria:**

**Given** any curated item is expanded/selected
**When** details view displays
**Then** curator notes render from Sanity Portable Text
**And** notes explain why the item matters to Tarik
**And** notes reflect his voice and curation philosophy
**And** optional: link to full Substack article about the discovery

### Story 10.8: Featured Items Highlight

As a visitor,
I want to see featured/highlighted items,
So that I can see Tarik's top picks quickly.

**Acceptance Criteria:**

**Given** Crates app is open
**When** featured items exist
**Then** featured items appear in a "Top Picks" section at the top
**And** featured items have visual distinction (star, highlight, etc.)
**And** featured section shows across all categories or filtered view
