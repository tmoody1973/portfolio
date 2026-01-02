# Story 1.3: Sanity Project Setup and Studio Integration

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a site owner,
I want Sanity CMS connected to the portfolio with an embedded Studio at `/studio`,
So that I can access the content management interface directly from my site.

## Acceptance Criteria

**Given** a new Sanity project is created
**When** the integration is complete
**Then** Sanity Studio is accessible at `/studio` route
**And** Studio authentication works correctly
**And** environment variables are configured for project ID and dataset
**And** Sanity client is configured for fetching content

## Implementation Tasks

### 1. Sanity Project Initialization
- [x] Create new Sanity project via CLI or dashboard
- [x] Configure dataset (production)
- [x] Get project ID and dataset name

### 2. Install Sanity Dependencies
- [x] Install `sanity` package
- [x] Install `@sanity/vision` for GROQ testing
- [x] Install `next-sanity` for Next.js integration
- [x] Install `styled-components` (peer dependency)

### 3. Configure Sanity Client
- [x] Create `sanity.config.ts` at project root
- [x] Create `lib/sanity/client.ts` for data fetching
- [x] Set up environment variables (.env.local)

### 4. Embed Sanity Studio in Next.js
- [x] Create `app/studio/[[...tool]]/page.tsx` route
- [x] Create `app/studio/[[...tool]]/layout.tsx` for Studio layout
- [x] Configure Studio to render at `/studio`
- [x] Test Studio loads and authentication works

### 5. Environment and Security
- [x] Add environment variables to `.env.local`
- [x] Add `.env.local` to `.gitignore` (already done)
- [x] Document required environment variables

### 6. Compatibility Fix
- [x] Upgraded Next.js 15 → 16 to resolve React 19.2 + Sanity 5.1 compatibility issues
- [x] Updated next.config.js for Turbopack (Next.js 16 default)

## Definition of Done
- [x] Sanity project created and accessible
- [x] Sanity Studio accessible at `/studio`
- [x] Studio authentication working
- [x] Sanity client configured for content fetching
- [x] Environment variables documented
- [x] Build succeeds with Sanity integration

## Implementation Notes

### Sanity Project Details
- **Project ID:** zb08xdlz
- **Dataset:** production
- **Project Name:** Ubuntu Portfolio
- **Organization:** oN9bZmd04

### Files Created
1. **sanity.config.ts** - Studio configuration with structureTool and visionTool
2. **sanity.cli.ts** - CLI configuration for Sanity commands
3. **lib/sanity/client.ts** - Next.js Sanity client with sanityFetch helper
4. **app/studio/[[...tool]]/page.tsx** - Studio route using NextStudio
5. **app/studio/[[...tool]]/layout.tsx** - Dedicated layout for Studio
6. **.env.local** - Environment variables (not committed)

### Files Updated
- **package.json** - Added Sanity packages, upgraded Next.js to 16.1.1
- **next.config.js** - Configured for Turbopack and Sanity compatibility

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=zb08xdlz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<token>
SANITY_API_WRITE_TOKEN=<token>
```

### Compatibility Note
Next.js 15 with Webpack had issues bundling Sanity 5.1.0 with React 19.2.3 due to `useEffectEvent` export analysis. Upgrading to Next.js 16 (which uses Turbopack by default) resolved this issue.
