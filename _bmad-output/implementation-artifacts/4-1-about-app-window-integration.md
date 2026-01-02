# Story 4.1: About App Window Integration

**Epic:** 4 - About Application
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a visitor,
I want to open the About app from the dock or desktop,
So that I can learn about Tarik's background.

## Acceptance Criteria

**Given** desktop is rendered
**When** About icon is clicked
**Then** About app opens in a window container
**And** window uses the standard window shell component
**And** window has appropriate default size and position
**And** app content renders inside window body

## Implementation Tasks

### 1. Create About App Component
- [x] Create `components/apps/about/AboutApp.tsx`
- [x] Integrate with window shell
- [x] Set up basic layout structure

### 2. Create Tabbed Navigation
- [x] Create `components/apps/about/AboutTabs.tsx`
- [x] Implement tab switching logic
- [x] Style tabs with Ubuntu theme

### 3. Create Tab Content Components
- [x] Create components for Bio, Journey, Education, Skills
- [x] Set up content area with scrolling

### 4. Connect to Window Store
- [x] Verify About app type is registered
- [x] Test opening from dock and desktop shortcuts

## Definition of Done
- [x] About app opens in window shell
- [x] Tabs display and switch correctly
- [x] Content area renders content
- [x] Build succeeds

## Technical Notes

### Component Structure
```
components/apps/about/
├── AboutApp.tsx          # Main app component
├── AboutTabs.tsx         # Tab navigation
├── sections/
│   ├── BioSection.tsx
│   ├── JourneySection.tsx
│   ├── EducationSection.tsx
│   └── SkillsSection.tsx
└── index.ts
```

### Tab Configuration
```typescript
const ABOUT_TABS = [
  { id: 'bio', label: 'Bio', icon: 'user' },
  { id: 'journey', label: 'Journey', icon: 'map' },
  { id: 'education', label: 'Education', icon: 'graduation-cap' },
  { id: 'skills', label: 'Skills', icon: 'code' },
]
```
