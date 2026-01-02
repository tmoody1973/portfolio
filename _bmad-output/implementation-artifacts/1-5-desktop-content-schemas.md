# Story 1.5: Desktop Content Schemas (Apps and Shortcuts)

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a site owner,
I want to manage desktop apps and shortcuts in the CMS,
So that I can add, edit, and reorder what appears on the Ubuntu desktop. (FR2)

## Acceptance Criteria

**Given** Sanity singletons are configured
**When** desktop schemas are deployed
**Then** `desktopApp` schema exists with app type, title, icon, and window config
**And** `desktopShortcut` schema exists with title, icon, URL, and order
**And** shortcuts can be reordered via drag-and-drop in Studio
**And** default shortcuts are pre-populated (GitHub, LinkedIn, Substack, etc.)

## Implementation Tasks

### 1. desktopApp Schema
- [x] Create schema with app identifier and title
- [x] Add icon field (image or icon name)
- [x] Add window configuration (default size, position)
- [x] Add enabled/disabled toggle

### 2. desktopShortcut Schema
- [x] Create schema with title and icon
- [x] Add URL field for external links
- [x] Add order field for positioning
- [x] Add icon type (predefined or custom image)

### 3. Register and Deploy
- [x] Add schemas to index file
- [x] Deploy to Sanity cloud
- [x] Verify in Studio

### 4. Pre-populate Default Content
- [x] Create default shortcuts (GitHub, LinkedIn, Substack, X, Buy Me a Coffee)

## Definition of Done
- [x] Both schemas created and deployed
- [x] Shortcuts can be reordered in Studio
- [x] Default shortcuts pre-populated
- [x] Build succeeds
