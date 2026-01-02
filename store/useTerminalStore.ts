import { create } from 'zustand'

/**
 * Terminal output entry - represents a command and its response
 */
export interface TerminalEntry {
  id: string
  command: string
  response: string | React.ReactNode
  timestamp: number
}

/**
 * Terminal store state
 */
export interface TerminalState {
  // Output history (command/response pairs displayed in terminal)
  outputHistory: TerminalEntry[]
  // Command history for arrow key navigation
  commandHistory: string[]
  // Current input value
  currentInput: string
  // Index for navigating command history (-1 = not navigating, 0 = most recent)
  historyIndex: number
  // Current working directory (for display)
  currentDirectory: string
}

/**
 * Terminal store actions
 */
export interface TerminalActions {
  // Execute a command and add to history
  executeCommand: (command: string, response: string | React.ReactNode) => void
  // Set current input value
  setInput: (input: string) => void
  // Navigate through command history (direction: 1 = older, -1 = newer)
  navigateHistory: (direction: 'up' | 'down') => string
  // Clear terminal output
  clearTerminal: () => void
  // Reset terminal to initial state
  resetTerminal: () => void
  // Set current directory
  setDirectory: (directory: string) => void
}

// Initial state
const initialState: TerminalState = {
  outputHistory: [],
  commandHistory: [],
  currentInput: '',
  historyIndex: -1,
  currentDirectory: '~',
}

// Generate unique ID for entries
const generateId = () => `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

/**
 * useTerminalStore - Zustand store for terminal state management
 *
 * Manages:
 * - Output history (command/response pairs)
 * - Command history for arrow navigation
 * - Current input state
 * - History navigation index
 */
export const useTerminalStore = create<TerminalState & TerminalActions>((set, get) => ({
  ...initialState,

  executeCommand: (command: string, response: string | React.ReactNode) => {
    const entry: TerminalEntry = {
      id: generateId(),
      command,
      response,
      timestamp: Date.now(),
    }

    set((state) => ({
      outputHistory: [...state.outputHistory, entry],
      commandHistory: command.trim() ? [...state.commandHistory, command] : state.commandHistory,
      currentInput: '',
      historyIndex: -1, // Reset history navigation
    }))
  },

  setInput: (input: string) => {
    set({ currentInput: input })
  },

  navigateHistory: (direction: 'up' | 'down') => {
    const state = get()
    const { commandHistory, historyIndex } = state

    if (commandHistory.length === 0) return ''

    let newIndex: number

    if (direction === 'up') {
      // Navigate to older commands
      if (historyIndex === -1) {
        // Starting navigation, go to most recent
        newIndex = commandHistory.length - 1
      } else if (historyIndex > 0) {
        // Go to older command
        newIndex = historyIndex - 1
      } else {
        // At oldest, stay there
        newIndex = 0
      }
    } else {
      // Navigate to newer commands
      if (historyIndex === -1) {
        // Not navigating, nothing to do
        return state.currentInput
      } else if (historyIndex < commandHistory.length - 1) {
        // Go to newer command
        newIndex = historyIndex + 1
      } else {
        // At newest, exit navigation
        set({ historyIndex: -1, currentInput: '' })
        return ''
      }
    }

    const command = commandHistory[newIndex] || ''
    set({ historyIndex: newIndex, currentInput: command })
    return command
  },

  clearTerminal: () => {
    set({ outputHistory: [], historyIndex: -1 })
  },

  resetTerminal: () => {
    set(initialState)
  },

  setDirectory: (directory: string) => {
    set({ currentDirectory: directory })
  },
}))

// Selector hooks for common state access
export const useTerminalOutput = () => useTerminalStore((state) => state.outputHistory)
export const useTerminalInput = () => useTerminalStore((state) => state.currentInput)
export const useTerminalDirectory = () => useTerminalStore((state) => state.currentDirectory)
