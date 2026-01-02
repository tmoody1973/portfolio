# Story 2.1: Boot Sequence State Management

**Epic:** 2 - Boot Sequence Experience
**Status:** done
**Completed:** 2026-01-02
**Started:** 2026-01-02
**Created:** 2026-01-02

## User Story

As a developer,
I want a Zustand store managing boot sequence state,
So that boot progress, completion, and skip preferences are tracked consistently.

## Acceptance Criteria

**Given** the app loads
**When** boot sequence state is needed
**Then** `useBootStore` exists with `isBooting`, `currentMessageIndex`, `isComplete`, `hasSkipped` state
**And** actions exist for `advanceMessage`, `complete`, `skip`, `reset`
**And** localStorage persistence tracks whether user has seen boot sequence before

## Implementation Tasks

### 1. Install Dependencies
- [x] Install Zustand for state management

### 2. Create Boot Store
- [x] Create `useBootStore` with required state
- [x] Implement `advanceMessage` action
- [x] Implement `complete` action
- [x] Implement `skip` action
- [x] Implement `reset` action

### 3. localStorage Persistence
- [x] Track `hasSeenBoot` preference in localStorage
- [x] Auto-skip boot if user has seen it before
- [x] Add ability to reset preference

## Definition of Done
- [x] Zustand store created and typed
- [x] All actions working correctly
- [x] localStorage persistence working
- [x] Build succeeds

## Implementation Notes

### Files Created
- `store/useBootStore.ts` - Main Zustand store with persist middleware
- `store/index.ts` - Re-exports for clean imports

### Store Features
- **State**: `isBooting`, `currentMessageIndex`, `isComplete`, `hasSkipped`, `hasSeenBoot`
- **Actions**: `startBoot`, `advanceMessage`, `complete`, `skip`, `reset`
- **Persistence**: Uses Zustand's persist middleware with localStorage
- **Auto-skip**: If `hasSeenBoot` is true, `startBoot()` auto-completes the sequence
- **Selector hooks**: `useIsBooting`, `useBootComplete`, `useCurrentMessageIndex`
