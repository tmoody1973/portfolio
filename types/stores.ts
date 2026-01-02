/**
 * State types for Zustand stores
 * These define the shape of application state managed by each store
 */

// ============================================
// Window Store Types
// ============================================

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface WindowConfig {
  id: string
  title: string
  icon: string
  component: string
  position: Position
  size: Size
  minSize?: Size
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  isFocused: boolean
}

export interface WindowState {
  windows: Map<string, WindowConfig>
  activeWindowId: string | null
}

export interface WindowActions {
  openWindow: (id: string, config: Omit<WindowConfig, 'zIndex' | 'isFocused'>) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updatePosition: (id: string, position: Position) => void
  updateSize: (id: string, size: Size) => void
}

export type WindowStore = WindowState & WindowActions

// ============================================
// Audio Store Types
// ============================================

export interface RadioStream {
  id: string
  name: string
  url: string
  description?: string
}

export interface NowPlaying {
  artist: string
  song: string
  album?: string
  artwork?: string
  startedAt?: string
}

export interface AudioState {
  isPlaying: boolean
  volume: number
  isMuted: boolean
  currentStream: RadioStream | null
  availableStreams: RadioStream[]
  nowPlaying: NowPlaying | null
  isLoading: boolean
  error: string | null
}

export interface AudioActions {
  play: () => void
  pause: () => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setStream: (stream: RadioStream) => void
  setNowPlaying: (nowPlaying: NowPlaying | null) => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void
}

export type AudioStore = AudioState & AudioActions

// ============================================
// Boot Store Types
// ============================================

export interface BootMessage {
  text: string
  delay: number
  type?: 'info' | 'success' | 'warning' | 'error'
}

export interface BootState {
  isBooting: boolean
  isComplete: boolean
  progress: number
  currentMessageIndex: number
  messages: BootMessage[]
  asciiArt: string
  hasBeenSkipped: boolean
  showBootOnNextVisit: boolean
}

export interface BootActions {
  startBoot: () => void
  completeBoot: () => void
  skipBoot: () => void
  setProgress: (progress: number) => void
  advanceMessage: () => void
  setMessages: (messages: BootMessage[]) => void
  setAsciiArt: (art: string) => void
  setShowBootOnNextVisit: (show: boolean) => void
}

export type BootStore = BootState & BootActions

// ============================================
// Terminal Store Types
// ============================================

export interface TerminalHistoryEntry {
  command: string
  output: string | string[]
  timestamp: Date
  isError?: boolean
}

export interface TerminalCommand {
  name: string
  description: string
  response: string | string[]
  aliases?: string[]
}

export interface TerminalState {
  history: TerminalHistoryEntry[]
  commandHistory: string[]
  historyIndex: number
  currentInput: string
  isProcessing: boolean
  availableCommands: TerminalCommand[]
}

export interface TerminalActions {
  executeCommand: (command: string) => void
  setInput: (input: string) => void
  clearHistory: () => void
  navigateHistory: (direction: 'up' | 'down') => void
  setCommands: (commands: TerminalCommand[]) => void
}

export type TerminalStore = TerminalState & TerminalActions
