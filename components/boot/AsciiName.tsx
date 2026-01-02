'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Default ASCII art for "TARIK MOODY" - can be overridden by Sanity content
const DEFAULT_ASCII_ART = `
████████╗ █████╗ ██████╗ ██╗██╗  ██╗
╚══██╔══╝██╔══██╗██╔══██╗██║██║ ██╔╝
   ██║   ███████║██████╔╝██║█████╔╝
   ██║   ██╔══██║██╔══██╗██║██╔═██╗
   ██║   ██║  ██║██║  ██║██║██║  ██╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

███╗   ███╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗
████╗ ████║██╔═══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝
██╔████╔██║██║   ██║██║   ██║██║  ██║ ╚████╔╝
██║╚██╔╝██║██║   ██║██║   ██║██║  ██║  ╚██╔╝
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██████╔╝   ██║
╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝    ╚═╝
`.trim()

interface AsciiNameProps {
  /** ASCII art string to render (uses default if not provided) */
  asciiArt?: string
  /** Duration for complete animation in milliseconds (default: 2000) */
  duration?: number
  /** Callback when animation completes */
  onComplete?: () => void
  /** Text color */
  color?: string
  /** Additional CSS classes */
  className?: string
}

export function AsciiName({
  asciiArt = DEFAULT_ASCII_ART,
  duration = 2000,
  onComplete,
  color = '#e95420', // Ubuntu orange
  className = '',
}: AsciiNameProps) {
  const [visibleChars, setVisibleChars] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Calculate characters (excluding whitespace for counting, but keeping them for display)
  const characters = useMemo(() => asciiArt.split(''), [asciiArt])
  const totalChars = characters.length

  // Calculate interval between character reveals
  const intervalMs = useMemo(() => {
    // We want to complete in `duration` ms
    // Calculate based on non-whitespace characters for smoother animation
    const nonWhitespaceCount = characters.filter(c => c !== ' ' && c !== '\n').length
    return duration / nonWhitespaceCount
  }, [duration, characters])

  useEffect(() => {
    if (isComplete) return

    let charIndex = 0
    let animationFrame: number

    const animate = () => {
      // Find next non-whitespace character to reveal
      while (charIndex < totalChars && (characters[charIndex] === ' ' || characters[charIndex] === '\n')) {
        charIndex++
      }

      if (charIndex >= totalChars) {
        setVisibleChars(totalChars)
        setIsComplete(true)
        onComplete?.()
        return
      }

      charIndex++
      setVisibleChars(charIndex)

      // Reveal all preceding whitespace
      while (charIndex < totalChars && (characters[charIndex] === ' ' || characters[charIndex] === '\n')) {
        charIndex++
        setVisibleChars(charIndex)
      }

      // Schedule next character
      setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, intervalMs)
    }

    // Start animation
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [characters, totalChars, intervalMs, isComplete, onComplete])

  // Build the visible string
  const visibleText = useMemo(() => {
    return characters.slice(0, visibleChars).join('')
  }, [characters, visibleChars])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`font-mono whitespace-pre text-center ${className}`}
        style={{ color }}
      >
        <pre
          className="text-xs sm:text-sm md:text-base lg:text-lg leading-none"
          style={{
            fontFamily: 'monospace',
            letterSpacing: '0',
          }}
        >
          {visibleText}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block"
            >
              █
            </motion.span>
          )}
        </pre>
      </motion.div>
    </AnimatePresence>
  )
}

export default AsciiName
