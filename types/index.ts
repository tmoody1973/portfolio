/**
 * Central type exports
 * Import types from here for consistent usage across the codebase
 */

// Store types
export type {
  Position,
  Size,
  WindowConfig,
  WindowState,
  WindowActions,
  WindowStore,
  RadioStream,
  NowPlaying,
  AudioState,
  AudioActions,
  AudioStore,
  BootMessage,
  BootState,
  BootActions,
  BootStore,
  TerminalHistoryEntry,
  TerminalCommand,
  TerminalState,
  TerminalActions,
  TerminalStore,
} from './stores'

// API types
export type {
  SpinitronsPin,
  SpinitronsResponse,
  MixcloudShow,
  MixcloudResponse,
  ApiError,
  ApiResponse,
} from './api'
