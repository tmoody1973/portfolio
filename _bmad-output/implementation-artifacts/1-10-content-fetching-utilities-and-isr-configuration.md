# Story 1.10: Content Fetching Utilities and ISR Configuration

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a developer,
I want typed content fetching utilities with ISR revalidation,
So that content updates go live quickly without full rebuilds.

## Acceptance Criteria

**Given** all schemas are in place
**When** fetching utilities are created
**Then** GROQ queries exist for all content types with TypeScript types
**And** Next.js ISR is configured with appropriate revalidation times
**And** `/api/revalidate` webhook endpoint exists for on-demand revalidation
**And** Sanity webhook is configured to trigger revalidation on publish

## Implementation Tasks

### 1. TypeScript Types
- [x] Create types for all document schemas
- [x] Create types for singleton schemas
- [x] Export from central types file

### 2. GROQ Queries
- [x] Create queries for singletons
- [x] Create queries for document lists
- [x] Create queries for individual documents

### 3. Content Fetching Utilities
- [x] Create typed fetch functions for each content type
- [x] Configure ISR revalidation times
- [x] Add error handling

### 4. Revalidation Webhook
- [x] Create `/api/revalidate` route
- [x] Add secret validation
- [x] Handle tag-based revalidation

## Definition of Done
- [x] All fetch utilities created with TypeScript types
- [x] ISR configured for all content
- [x] Webhook endpoint working
- [x] Build succeeds
