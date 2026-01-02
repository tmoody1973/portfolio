# Story 1.6: About Content Schemas (Sections, Experience, Education, Skills)

**Epic:** 1 - Foundation & CMS Infrastructure
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a site owner,
I want to manage all About app content in the CMS,
So that I can update my bio, journey, education, and skills without code changes. (FR1)

## Acceptance Criteria

**Given** desktop schemas exist
**When** about schemas are deployed
**Then** `aboutSection` schema exists with tab name, content blocks, and order
**And** `experience` schema exists with company, role, dates, description
**And** `education` schema exists with institution, degree, dates, details
**And** `skill` schema exists with name, category, proficiency level
**And** content can be managed in grouped Studio sections

## Implementation Tasks

### 1. aboutSection Schema
- [x] Create schema with tab name and order
- [x] Add portable text content blocks
- [x] Add section type (bio, journey, education, skills)
- [x] Add enabled toggle

### 2. experience Schema
- [x] Create schema with company and role
- [x] Add date range fields (startDate, endDate, isCurrent)
- [x] Add description with portable text
- [x] Add logo/image field
- [x] Add order field

### 3. education Schema
- [x] Create schema with institution and degree
- [x] Add date fields (startYear, endYear)
- [x] Add field of study and details
- [x] Add logo/image field
- [x] Add order field

### 4. skill Schema
- [x] Create schema with name and category
- [x] Add proficiency level (1-5 or beginner/intermediate/expert)
- [x] Add icon field
- [x] Add order field

### 5. Register and Deploy
- [x] Add all schemas to index file
- [x] Deploy to Sanity cloud
- [x] Verify in Studio

## Definition of Done
- [x] All 4 schemas created and deployed
- [x] Schemas appear in Sanity Studio
- [x] Build succeeds
