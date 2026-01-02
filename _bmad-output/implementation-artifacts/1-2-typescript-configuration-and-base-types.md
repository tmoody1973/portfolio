# Story 1.2: TypeScript Configuration and Base Types

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a developer,
I want TypeScript configured across the codebase with base type definitions,
So that I have type safety and IDE support throughout development.

## Acceptance Criteria

**Given** the migrated Next.js 15 app
**When** TypeScript is configured
**Then** `tsconfig.json` is configured with strict mode
**And** base types for window state, audio state, and boot state are defined
**And** all existing components compile without type errors
**And** Zod schemas exist for external API response validation

## Implementation Tasks

### 1. TypeScript Setup
- [x] Install TypeScript and type dependencies
- [x] Create `tsconfig.json` with strict mode
- [x] Rename `app/layout.js` → `app/layout.tsx`
- [x] Rename `app/page.js` → `app/page.tsx`

### 2. Base Type Definitions
- [x] Create `types/` directory structure
- [x] Define WindowState types (position, size, z-index, minimized, maximized)
- [x] Define AudioState types (playing, volume, currentStream, nowPlaying)
- [x] Define BootState types (isBooting, progress, messages, skipped)
- [x] Define TerminalState types (history, currentInput, output)

### 3. Zod Schemas for API Validation
- [x] Create Zod schema for Spinitron API response
- [x] Create Zod schema for Mixcloud API response
- [x] Export validated types from schemas

### 4. Gradual Component Migration
- [x] Add TypeScript to existing JS components (allowJs: true in tsconfig)
- [x] Ensure build succeeds with mixed JS/TS

## Definition of Done
- [x] TypeScript installed and configured
- [x] `tsconfig.json` has strict mode enabled
- [x] Base state types defined in `types/` directory
- [x] Zod schemas created for external APIs
- [x] `npm run build` succeeds
- [x] No TypeScript errors in new code

## Implementation Notes

### Files Created
1. **tsconfig.json**: Strict mode, path aliases, bundler module resolution
2. **next-env.d.ts**: Next.js type declarations
3. **types/stores.ts**: State types for Zustand stores (Window, Audio, Boot, Terminal)
4. **types/api.ts**: API response types for Spinitron and Mixcloud
5. **types/index.ts**: Central type exports
6. **lib/api/schemas.ts**: Zod validation schemas with parse helpers

### Files Updated
- **app/layout.tsx**: Added Metadata and Viewport types
- **app/page.tsx**: Converted to TypeScript
- **package.json**: Added TypeScript, @types/*, and Zod dependencies
