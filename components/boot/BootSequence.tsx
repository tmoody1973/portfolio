'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AsciiName } from './AsciiName'
import { BootMessages, DEFAULT_BOOT_MESSAGES } from './BootMessages'
import { SkipButton } from './SkipButton'
import type { BootMessageItem } from './BootMessages'

// Boot sequence phases
type BootPhase = 'ascii' | 'messages' | 'complete' | 'exiting'

interface BootSequenceProps {
  /** ASCII art to display (uses default if not provided) */
  asciiArt?: string
  /** Boot messages to display (uses defaults if not provided) */
  messages?: BootMessageItem[]
  /** Duration for ASCII animation in ms */
  asciiDuration?: number
  /** Callback when boot sequence fully completes (after exit animation) */
  onComplete?: () => void
  /** Callback when skip is triggered */
  onSkip?: () => void
  /** Whether to show the boot sequence */
  isActive?: boolean
  /** Duration for exit transition in ms */
  exitDuration?: number
  /** Background color */
  backgroundColor?: string
}

export function BootSequence({
  asciiArt,
  messages = DEFAULT_BOOT_MESSAGES,
  asciiDuration = 2000,
  onComplete,
  onSkip,
  isActive = true,
  exitDuration = 800,
  backgroundColor = '#000000',
}: BootSequenceProps) {
  const [phase, setPhase] = useState<BootPhase>('ascii')
  const [isExiting, setIsExiting] = useState(false)

  // Handle phase transitions
  const handleAsciiComplete = useCallback(() => {
    setPhase('messages')
  }, [])

  const handleMessagesComplete = useCallback(() => {
    setPhase('complete')
    // Start exit animation
    setIsExiting(true)
  }, [])

  const handleSkip = useCallback(() => {
    onSkip?.()
    setPhase('complete')
    setIsExiting(true)
  }, [onSkip])

  // Handle exit animation completion
  useEffect(() => {
    if (!isExiting) return

    const timer = setTimeout(() => {
      setPhase('exiting')
      onComplete?.()
    }, exitDuration)

    return () => clearTimeout(timer)
  }, [isExiting, exitDuration, onComplete])

  // Don't render if not active or fully exited
  if (!isActive || phase === 'exiting') {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="boot-sequence"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: exitDuration / 1000, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Main content container */}
        <div className="flex flex-col items-center justify-center px-4 max-w-4xl w-full">
          {/* ASCII Name Animation */}
          <AnimatePresence mode="wait">
            {phase === 'ascii' && (
              <motion.div
                key="ascii-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <AsciiName
                  asciiArt={asciiArt}
                  duration={asciiDuration}
                  onComplete={handleAsciiComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boot Messages */}
          <AnimatePresence mode="wait">
            {(phase === 'messages' || phase === 'complete') && (
              <motion.div
                key="messages-phase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl"
              >
                <BootMessages
                  messages={messages}
                  onComplete={handleMessagesComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skip Button */}
        <SkipButton
          onSkip={handleSkip}
          enabled={phase !== 'complete' && !isExiting}
          showDelay={1500}
        />

        {/* Subtle branding footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 text-white/30 text-xs font-mono"
        >
          portfolio v3.0 • powered by curiosity
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BootSequence
