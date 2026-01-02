// Re-export all stores

// Boot store
export {
  useBootStore,
  useIsBooting,
  useBootComplete,
  useCurrentMessageIndex,
} from './useBootStore'

// Window store
export {
  useWindowStore,
  useActiveWindow,
  useWindow,
  useOpenWindows,
  useMinimizedWindows,
  useIsWindowOpen,
  useIsWindowActive,
} from './useWindowStore'

export type {
  WindowState,
  WindowPosition,
  WindowSize,
  OpenWindowOptions,
} from './useWindowStore'

// Terminal store
export {
  useTerminalStore,
  useTerminalOutput,
  useTerminalInput,
  useTerminalDirectory,
} from './useTerminalStore'

export type {
  TerminalState,
  TerminalEntry,
  TerminalActions,
} from './useTerminalStore'

// Audio store
export {
  useAudioStore,
  useIsPlaying,
  useCurrentStream,
  useVolume,
  useNowPlaying,
  useRecentTracks,
  DEFAULT_STREAMS,
} from './useAudioStore'

export type {
  AudioState,
  AudioActions,
  RadioStream,
  NowPlaying,
  RecentTrack,
  MixcloudEpisode,
} from './useAudioStore'
