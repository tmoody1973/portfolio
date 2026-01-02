# Story 1.8: Media and Stream Schemas (Wallpaper, Radio Streams)

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a site owner,
I want to manage wallpapers and radio streams in the CMS,
So that I can update visual assets and audio configurations. (FR6, FR7)

## Acceptance Criteria

**Given** project schemas exist
**When** media schemas are deployed
**Then** `wallpaper` schema exists with image, name, and active flag
**And** `radioStream` schema exists with name, stream URL, Spinitron station ID, artwork
**And** all media can be uploaded and managed in Studio

## Implementation Tasks

### 1. Expand radioStream Schema
- [x] Add Spinitron station ID field
- [x] Add artwork/logo image
- [x] Add description field
- [x] Add order field for stream switching
- [x] Add enabled toggle
- [x] Add Mixcloud archive URL

### 2. Expand wallpaper Schema
- [x] Add description field
- [x] Add credit/attribution field
- [x] Add order field
- [x] Add category/theme tag

### 3. Deploy and Verify
- [x] Deploy to Sanity cloud
- [x] Verify in Studio

## Definition of Done
- [x] Both schemas fully expanded
- [x] Schemas deployed and visible in Studio
- [x] Build succeeds
