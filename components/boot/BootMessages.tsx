'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BootMessage } from './BootMessage'

// Default boot messages reflecting Tarik's professional journey
// NOTE: These are fallback defaults - actual messages should be fetched from Sanity
export const DEFAULT_BOOT_MESSAGES = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Loading architecture blueprints... Howard \'96', delay: 200 },
  { text: 'Mounting design practices... Detroit → Minneapolis', delay: 200 },
  { text: 'Initializing radio protocols... 88Nine Radio Milwaukee', delay: 200 },
  { text: 'Loading Rhythm Lab Radio... nationally syndicated', delay: 200 },
  { text: 'Connecting HYFIN streams... urban alternative since 2022', delay: 200 },
  { text: 'Starting 88Nine Labs... innovation for all', delay: 200 },
  { text: 'Compiling curiosity... music + tech + community', delay: 200 },
  { text: 'System ready. Welcome to The Intersection.', delay: 300 },
]

export interface BootMessageItem {
  /** The message text */
  text: string
  /** Delay after previous message completes before showing this one (ms) */
  delay?: number
  /** Custom typing duration for this message (ms) */
  typingDuration?: number
}

interface BootMessagesProps {
  /** Array of messages to display */
  messages?: BootMessageItem[]
  /** Callback when all messages have been displayed */
  onComplete?: () => void
  /** Text color for messages */
  color?: string
  /** Additional CSS classes for container */
  className?: string
  /** Whether to show line prefix (like terminal prompt) */
  showPrefix?: boolean
  /** Custom prefix string */
  prefix?: string
}

export function BootMessages({
  messages = DEFAULT_BOOT_MESSAGES,
  onComplete,
  color = '#00ff00',
  className = '',
  showPrefix = true,
  prefix = '[OK]',
}: BootMessagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedMessages, setCompletedMessages] = useState<number[]>([])

  const handleMessageComplete = useCallback((index: number) => {
    setCompletedMessages((prev) => [...prev, index])

    if (index < messages.length - 1) {
      // Move to next message after the configured delay
      const nextDelay = messages[index + 1]?.delay ?? 200
      setTimeout(() => {
        setCurrentIndex(index + 1)
      }, nextDelay)
    } else {
      // All messages complete
      setTimeout(() => {
        onComplete?.()
      }, 500) // Small delay before signaling completion
    }
  }, [messages, onComplete])

  return (
    <div className={`font-mono space-y-1 ${className}`}>
      <AnimatePresence mode="sync">
        {messages.slice(0, currentIndex + 1).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-start gap-2"
          >
            {showPrefix && (
              <span
                className="text-sm sm:text-base shrink-0"
                style={{ color: completedMessages.includes(index) ? '#22c55e' : '#666' }}
              >
                {completedMessages.includes(index) ? prefix : '...'}
              </span>
            )}
            <BootMessage
              message={message.text}
              typingDuration={message.typingDuration}
              onComplete={() => handleMessageComplete(index)}
              color={color}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default BootMessages
