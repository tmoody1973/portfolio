# Story 1.1: Next.js 15 App Router Migration

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a developer,
I want the portfolio upgraded from Next.js 13 Pages Router to Next.js 15 App Router,
So that I can leverage modern React Server Components and improved performance.

## Acceptance Criteria

**Given** the existing Next.js 13 codebase
**When** the migration is complete
**Then** the app uses App Router with `app/` directory structure
**And** existing pages render without errors
**And** build completes successfully with no TypeScript errors
**And** the site runs in development and production modes

## Current State Analysis

### Existing Structure
- **Next.js Version:** 13.1.2 (Pages Router)
- **Language:** JavaScript (no TypeScript)
- **Entry Points:**
  - `pages/_app.js` - Global app wrapper with Tailwind imports
  - `pages/_document.js` - HTML document structure
  - `pages/index.js` - Main page rendering Ubuntu component

### Key Components
- `components/ubuntu.js` - Main Ubuntu class component (manages boot, lock, desktop states)
- `components/screen/` - Screen components (booting, desktop, lock, navbar)
- `components/apps/` - Application windows (chrome, terminal, settings, etc.)
- `components/base/` - Base components (window, sidebar)

### Dependencies to Preserve
- `react-ga4` - Google Analytics
- `react-draggable` - Window dragging
- `tailwindcss` - Styling
- `@emailjs/browser` - Contact form

## Implementation Tasks

### 1. Upgrade Dependencies
- [x] Upgrade `next` from 13.1.2 to 15.1.0
- [x] Upgrade `react` and `react-dom` to 19.0.0
- [x] Update any incompatible dependencies (used --legacy-peer-deps for react-onclickoutside)

### 2. Create App Router Structure
- [x] Create `app/` directory
- [x] Create `app/layout.js` (replaces `_app.js` and `_document.js`)
- [x] Create `app/page.js` (replaces `pages/index.js`)
- [x] Create `app/globals.css` for Tailwind imports

### 3. Migrate Components
- [x] Update imports to use new structure
- [x] Add 'use client' directive to client components
- [x] Ensure React GA4 initializes correctly

### 4. Clean Up
- [x] Remove `pages/` directory after migration verified
- [x] Create `next.config.js` with React strict mode
- [x] Verify all routes work correctly

## Technical Notes

### App Router Migration Pattern

```
pages/_app.js + pages/_document.js → app/layout.js
pages/index.js → app/page.js
```

### Client Component Marking
Components using:
- useState, useEffect (hooks)
- Browser APIs (localStorage, window)
- Event handlers
- Class components

Must be marked with `'use client'` directive at top of file.

### Google Analytics Consideration
React GA4 requires client-side execution. Will need to:
1. Create a client component for GA initialization
2. Or use next/script for GA loading

## Definition of Done
- [x] Next.js 15 installed and configured (15.1.0)
- [x] App Router structure in place (`app/` directory)
- [x] Home page renders Ubuntu desktop correctly
- [x] `npm run dev` starts without errors
- [x] `npm run build` completes successfully
- [x] Site works in development mode
- [x] Site works in production mode (build + start)

## Implementation Notes

### Changes Made
1. **package.json**: Updated Next.js 13.1.2 → 15.1.0, React 18 → 19, renamed package to `ubuntu-portfolio`
2. **app/layout.js**: New root layout with metadata and viewport exports (Next.js 15 pattern)
3. **app/page.js**: Client component wrapper for Ubuntu, initializes React GA4
4. **app/globals.css**: Combined Tailwind directives with custom styles from `styles/index.css`
5. **tailwind.config.js**: Added `app/**` to content paths
6. **next.config.js**: Created with React strict mode enabled
7. **pages/**: Removed (migrated to App Router)

### Dependency Notes
- `react-onclickoutside@6.12.2` doesn't officially support React 19, installed with `--legacy-peer-deps`
- May need to replace with alternative or update when compatible version released
