'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkipButtonProps {
  /** Callback when skip is triggered (click or Escape key) */
  onSkip: () => void
  /** Delay before showing the skip button (ms) */
  showDelay?: number
  /** Whether skip functionality is enabled */
  enabled?: boolean
  /** Additional CSS classes */
  className?: string
}

export function SkipButton({
  onSkip,
  showDelay = 1000,
  enabled = true,
  className = '',
}: SkipButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Show button after delay
  useEffect(() => {
    if (!enabled) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, showDelay)

    return () => clearTimeout(timer)
  }, [showDelay, enabled])

  // Handle skip action
  const handleSkip = useCallback(() => {
    if (!enabled) return
    onSkip()
  }, [enabled, onSkip])

  // Keyboard handler for Escape key
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, handleSkip])

  if (!enabled) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={handleSkip}
          className={`
            fixed bottom-8 right-8
            px-4 py-2
            bg-black/50 hover:bg-black/70
            border border-white/20 hover:border-white/40
            rounded-lg
            text-white/70 hover:text-white
            text-sm font-mono
            cursor-pointer
            transition-colors duration-200
            backdrop-blur-sm
            focus:outline-none focus:ring-2 focus:ring-white/30
            ${className}
          `}
          aria-label="Skip boot sequence"
        >
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">ESC</kbd>
            <span>Skip</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default SkipButton
