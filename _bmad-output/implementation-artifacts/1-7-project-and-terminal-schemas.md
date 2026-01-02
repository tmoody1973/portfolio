# Story 1.7: Project and Terminal Schemas

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a site owner,
I want to manage case studies and terminal commands in the CMS,
So that I can add projects and customize terminal responses. (FR4, FR5)

## Acceptance Criteria

**Given** about schemas exist
**When** project and terminal schemas are deployed
**Then** `project` schema exists with title, slug, sections (Context/Concept/Process/Execution/Result/Reflection), images
**And** `terminalCommand` schema exists with command name, response text, aliases
**And** default terminal commands are pre-populated (`whoami`, `help`, `clear`)

## Implementation Tasks

### 1. project Schema
- [x] Create schema with title and slug
- [x] Add architecture-inspired sections (Context, Concept, Process, Execution, Result, Reflection)
- [x] Add featured image and screenshot gallery
- [x] Add metadata (client, year, technologies, links)
- [x] Add order and featured fields

### 2. terminalCommand Schema
- [x] Create schema with command name
- [x] Add response text (portable text for formatting)
- [x] Add aliases field (array of alternative command names)
- [x] Add category field (info, navigation, fun, etc.)
- [x] Add enabled toggle

### 3. Register and Deploy
- [x] Add schemas to index file
- [x] Deploy to Sanity cloud
- [x] Verify in Studio

### 4. Pre-populate Default Commands
- [x] Create `whoami` command
- [x] Create `help` command
- [x] Create `clear` command
- [x] Create additional commands (ls, sudo)

## Definition of Done
- [x] Both schemas created and deployed
- [x] Default terminal commands pre-populated
- [x] Build succeeds
