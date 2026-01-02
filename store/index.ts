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
