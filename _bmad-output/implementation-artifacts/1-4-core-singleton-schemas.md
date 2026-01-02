# Story 1.4: Core Singleton Schemas (Site Settings, Boot, Player, Theme)

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a site owner,
I want singleton schemas for site-wide settings,
So that I can configure boot sequence, player options, and theme settings in one place.

## Acceptance Criteria

**Given** Sanity Studio is integrated
**When** singleton schemas are deployed
**Then** `siteSettings` schema exists with site title, description, social links
**And** `bootSequence` schema exists with ASCII art and boot messages array
**And** `playerConfig` schema exists with default stream and skin settings
**And** `themeSettings` schema exists with wallpaper selection
**And** all singletons are editable in Studio

## Implementation Tasks

### 1. Schema Directory Setup
- [x] Create `schemaTypes/` directory
- [x] Create schema index file

### 2. siteSettings Singleton
- [x] Create schema with title, description, socialLinks array
- [x] Include fields for SEO metadata
- [x] Add contact email field

### 3. bootSequence Singleton
- [x] Create schema with ASCII art text field
- [x] Add boot messages array with message text and delay
- [x] Include skip enabled flag and total duration

### 4. playerConfig Singleton
- [x] Create schema with default stream reference
- [x] Add volume default and skin settings
- [x] Include autoplay preference

### 5. themeSettings Singleton
- [x] Create schema with wallpaper reference
- [x] Add accent color option
- [x] Include dock position and window style options

### 6. Register Schemas
- [x] Update sanity.config.ts to include schemas
- [x] Deploy schemas to Sanity cloud
- [x] Verify build succeeds

## Definition of Done
- [x] All 4 singleton schemas created
- [x] Schemas registered in sanity.config.ts
- [x] Schemas deployed to Sanity cloud (6 types added)
- [x] Build succeeds with new schemas

## Implementation Notes

### Files Created
1. **schemaTypes/siteSettings.ts** - Site title, description, author info, social links, SEO image
2. **schemaTypes/bootSequence.ts** - ASCII art, boot messages array, skip settings, timing
3. **schemaTypes/playerConfig.ts** - Default stream, volume, autoplay, Mixcloud integration
4. **schemaTypes/themeSettings.ts** - Wallpaper, accent color, dock position, window style
5. **schemaTypes/radioStream.ts** - Placeholder for Story 1.8
6. **schemaTypes/wallpaper.ts** - Placeholder for Story 1.8
7. **schemaTypes/index.ts** - Schema exports

### Files Updated
- **sanity.config.ts** - Added schemaTypes import

### Schema Fields Summary

**siteSettings:**
- siteTitle, siteDescription, authorName, authorTitle
- contactEmail, socialLinks (array), seoImage

**bootSequence:**
- enabled, asciiArt, asciiAnimationSpeed
- bootMessages (array with message, delay, isSuccess)
- totalDuration, allowSkip, skipButtonText, rememberSkipPreference

**playerConfig:**
- enabled, defaultStream (ref), defaultVolume, autoplay
- showNowPlaying, showRecentTracks, recentTracksCount
- showMixcloudArchives, mixcloudUsername, webampSkin, playerPosition

**themeSettings:**
- activeWallpaper (ref), fallbackWallpaperColor, accentColor
- windowStyle, dockPosition, dockAutoHide
- showDesktopIcons, iconSize, fontFamily
