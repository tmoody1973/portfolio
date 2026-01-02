'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react'

interface TerminalPromptProps {
  currentDirectory: string
  value: string
  onChange: (value: string) => void
  onSubmit: (command: string) => void
  onNavigateHistory: (direction: 'up' | 'down') => string
}

/**
 * Terminal input prompt with blinking cursor
 * Handles keyboard events for command submission and history navigation
 */
export function TerminalPrompt({
  currentDirectory,
  value,
  onChange,
  onSubmit,
  onNavigateHistory,
}: TerminalPromptProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Handle key events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSubmit(value)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const historyCommand = onNavigateHistory('up')
        onChange(historyCommand)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const historyCommand = onNavigateHistory('down')
        onChange(historyCommand)
      }
    },
    [value, onChange, onSubmit, onNavigateHistory]
  )

  // Focus input when clicking anywhere in terminal
  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className="flex items-center gap-1 cursor-text"
      onClick={handleContainerClick}
    >
      <span className="text-green-400">tarik@portfolio</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">{currentDirectory}</span>
      <span className="text-white">$</span>
      <div className="flex-1 relative ml-1">
        <span className="text-white">{value}</span>
        <span
          className={`inline-block w-2 h-4 bg-white ml-0.5 align-middle ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 w-full outline-none bg-transparent"
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  )
}
