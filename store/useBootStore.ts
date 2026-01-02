import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Constants for localStorage
const STORAGE_KEY = 'portfolio-boot-state'

interface BootState {
  // State
  isBooting: boolean
  currentMessageIndex: number
  isComplete: boolean
  hasSkipped: boolean
  hasSeenBoot: boolean

  // Actions
  advanceMessage: () => void
  complete: () => void
  skip: () => void
  reset: () => void
  startBoot: () => void
}

export const useBootStore = create<BootState>()(
  persist(
    (set, get) => ({
      // Initial state
      isBooting: false,
      currentMessageIndex: 0,
      isComplete: false,
      hasSkipped: false,
      hasSeenBoot: false,

      // Start the boot sequence
      startBoot: () => {
        const { hasSeenBoot } = get()

        // If user has seen boot before, auto-skip to complete
        if (hasSeenBoot) {
          set({
            isBooting: false,
            isComplete: true,
            hasSkipped: true,
          })
        } else {
          set({
            isBooting: true,
            currentMessageIndex: 0,
            isComplete: false,
            hasSkipped: false,
          })
        }
      },

      // Advance to next message in boot sequence
      advanceMessage: () => {
        set((state) => ({
          currentMessageIndex: state.currentMessageIndex + 1,
        }))
      },

      // Mark boot sequence as complete
      complete: () => {
        set({
          isBooting: false,
          isComplete: true,
          hasSeenBoot: true,
        })
      },

      // Skip the boot sequence
      skip: () => {
        set({
          isBooting: false,
          isComplete: true,
          hasSkipped: true,
          hasSeenBoot: true,
        })
      },

      // Reset boot sequence (for development or preference reset)
      reset: () => {
        set({
          isBooting: false,
          currentMessageIndex: 0,
          isComplete: false,
          hasSkipped: false,
          hasSeenBoot: false,
        })
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist the hasSeenBoot preference
      partialize: (state) => ({
        hasSeenBoot: state.hasSeenBoot,
      }),
    }
  )
)

// Selector hooks for common state access patterns
export const useIsBooting = () => useBootStore((state) => state.isBooting)
export const useBootComplete = () => useBootStore((state) => state.isComplete)
export const useCurrentMessageIndex = () => useBootStore((state) => state.currentMessageIndex)
