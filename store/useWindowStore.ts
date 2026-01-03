import { create } from 'zustand'

// Window position type
export interface WindowPosition {
  x: number
  y: number
}

// Window size type
export interface WindowSize {
  width: number
  height: number
}

// Individual window state
export interface WindowState {
  id: string
  title: string
  icon?: string
  isMinimized: boolean
  isMaximized: boolean
  position: WindowPosition
  size: WindowSize
  zIndex: number
  // App-specific data
  appType: string
  initialData?: Record<string, unknown>
}

// Options for opening a new window
export interface OpenWindowOptions {
  id: string
  title: string
  icon?: string
  appType: string
  position?: WindowPosition
  size?: WindowSize
  initialData?: Record<string, unknown>
}

// Default window sizes for different app types
const DEFAULT_WINDOW_SIZES: Record<string, WindowSize> = {
  about: { width: 700, height: 500 },
  terminal: { width: 650, height: 450 },
  chrome: { width: 900, height: 600 },
  player: { width: 400, height: 300 },
  crates: { width: 800, height: 550 },
  mixcloud: { width: 850, height: 550 },
  settings: { width: 650, height: 500 },
  default: { width: 600, height: 400 },
}

// Default positions (will be offset for each new window)
const DEFAULT_POSITION: WindowPosition = { x: 100, y: 80 }
const POSITION_OFFSET = 30

interface WindowStore {
  // State
  windows: WindowState[]
  activeWindowId: string | null
  highestZIndex: number

  // Actions
  openWindow: (options: OpenWindowOptions) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, position: WindowPosition) => void
  updateSize: (id: string, size: WindowSize) => void
  closeAllWindows: () => void

  // Utilities
  getWindow: (id: string) => WindowState | undefined
  isWindowOpen: (id: string) => boolean
  getOpenWindowIds: () => string[]
}

export const useWindowStore = create<WindowStore>()((set, get) => ({
  // Initial state
  windows: [],
  activeWindowId: null,
  highestZIndex: 100,

  // Open a new window or focus existing one
  openWindow: (options) => {
    const { windows, highestZIndex, focusWindow, isWindowOpen } = get()

    // If window already exists, just focus it
    if (isWindowOpen(options.id)) {
      focusWindow(options.id)
      // If minimized, restore it
      const existingWindow = windows.find(w => w.id === options.id)
      if (existingWindow?.isMinimized) {
        set((state) => ({
          windows: state.windows.map(w =>
            w.id === options.id ? { ...w, isMinimized: false } : w
          ),
        }))
      }
      return
    }

    // Calculate position with offset based on number of open windows
    const openCount = windows.filter(w => !w.isMinimized).length
    const defaultPosition = {
      x: DEFAULT_POSITION.x + (openCount * POSITION_OFFSET),
      y: DEFAULT_POSITION.y + (openCount * POSITION_OFFSET),
    }

    // Get default size for app type
    const defaultSize = DEFAULT_WINDOW_SIZES[options.appType] || DEFAULT_WINDOW_SIZES.default

    const newWindow: WindowState = {
      id: options.id,
      title: options.title,
      icon: options.icon,
      appType: options.appType,
      isMinimized: false,
      isMaximized: false,
      position: options.position || defaultPosition,
      size: options.size || defaultSize,
      zIndex: highestZIndex + 1,
      initialData: options.initialData,
    }

    set({
      windows: [...windows, newWindow],
      activeWindowId: options.id,
      highestZIndex: highestZIndex + 1,
    })
  },

  // Close a window
  closeWindow: (id) => {
    set((state) => {
      const newWindows = state.windows.filter(w => w.id !== id)
      const wasActive = state.activeWindowId === id

      // If we closed the active window, activate the next highest z-index window
      let newActiveId = state.activeWindowId
      if (wasActive && newWindows.length > 0) {
        const sortedByZ = [...newWindows]
          .filter(w => !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex)
        newActiveId = sortedByZ[0]?.id || null
      } else if (newWindows.length === 0) {
        newActiveId = null
      }

      return {
        windows: newWindows,
        activeWindowId: newActiveId,
      }
    })
  },

  // Minimize a window
  minimizeWindow: (id) => {
    set((state) => {
      const newWindows = state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      )

      // If we minimized the active window, activate next highest
      let newActiveId = state.activeWindowId
      if (state.activeWindowId === id) {
        const sortedByZ = newWindows
          .filter(w => !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex)
        newActiveId = sortedByZ[0]?.id || null
      }

      return {
        windows: newWindows,
        activeWindowId: newActiveId,
      }
    })
  },

  // Restore a minimized window
  restoreWindow: (id) => {
    const { highestZIndex } = get()

    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 }
          : w
      ),
      activeWindowId: id,
      highestZIndex: highestZIndex + 1,
    }))
  },

  // Maximize a window
  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: true } : w
      ),
    }))
  },

  // Toggle maximize state
  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }))
  },

  // Focus a window (bring to front)
  focusWindow: (id) => {
    const { highestZIndex, windows } = get()
    const window = windows.find(w => w.id === id)

    // Don't update if already focused and has highest z-index
    if (window && window.zIndex === highestZIndex) {
      set({ activeWindowId: id })
      return
    }

    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
      ),
      activeWindowId: id,
      highestZIndex: highestZIndex + 1,
    }))
  },

  // Update window position
  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      ),
    }))
  },

  // Update window size
  updateSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    }))
  },

  // Close all windows
  closeAllWindows: () => {
    set({
      windows: [],
      activeWindowId: null,
    })
  },

  // Get a specific window
  getWindow: (id) => {
    return get().windows.find(w => w.id === id)
  },

  // Check if a window is open
  isWindowOpen: (id) => {
    return get().windows.some(w => w.id === id)
  },

  // Get all open window IDs
  getOpenWindowIds: () => {
    return get().windows.map(w => w.id)
  },
}))

// Selector hooks for common patterns
export const useActiveWindow = () => useWindowStore((state) => {
  if (!state.activeWindowId) return null
  return state.windows.find(w => w.id === state.activeWindowId) || null
})

export const useWindow = (id: string) => useWindowStore((state) =>
  state.windows.find(w => w.id === id)
)

export const useOpenWindows = () => useWindowStore((state) =>
  state.windows.filter(w => !w.isMinimized)
)

export const useMinimizedWindows = () => useWindowStore((state) =>
  state.windows.filter(w => w.isMinimized)
)

export const useIsWindowOpen = (id: string) => useWindowStore((state) =>
  state.windows.some(w => w.id === id)
)

export const useIsWindowActive = (id: string) => useWindowStore((state) =>
  state.activeWindowId === id
)

export default useWindowStore
