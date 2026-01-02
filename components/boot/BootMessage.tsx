'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

interface BootMessageProps {
  /** The message text to display */
  message: string
  /** Duration for the typewriter animation in ms (default: based on message length) */
  typingDuration?: number
  /** Delay before starting the animation in ms */
  delay?: number
  /** Callback when typing animation completes */
  onComplete?: () => void
  /** Text color */
  color?: string
  /** Additional CSS classes */
  className?: string
}

export function BootMessage({
  message,
  typingDuration,
  delay = 0,
  onComplete,
  color = '#00ff00', // Terminal green
  className = '',
}: BootMessageProps) {
  const [visibleChars, setVisibleChars] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const characters = useMemo(() => message.split(''), [message])
  const totalChars = characters.length

  // Calculate typing speed - aim for readable speed
  const charInterval = useMemo(() => {
    if (typingDuration) {
      return typingDuration / totalChars
    }
    // Default: ~30ms per character for readable typing effect
    return 30
  }, [typingDuration, totalChars])

  // Handle delay before starting
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [delay])

  // Typing animation
  useEffect(() => {
    if (!hasStarted || isComplete) return

    if (visibleChars >= totalChars) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      setVisibleChars((prev) => prev + 1)
    }, charInterval)

    return () => clearTimeout(timer)
  }, [hasStarted, visibleChars, totalChars, charInterval, isComplete, onComplete])

  const visibleText = characters.slice(0, visibleChars).join('')

  if (!hasStarted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={`font-mono ${className}`}
      style={{ color }}
    >
      <span className="text-sm sm:text-base">
        {visibleText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="inline-block ml-0.5"
          >
            _
          </motion.span>
        )}
      </span>
    </motion.div>
  )
}

export default BootMessage
