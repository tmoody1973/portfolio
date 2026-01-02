'use client'

import React from 'react'
import { TerminalEntry } from '@/store/useTerminalStore'

interface TerminalOutputProps {
  entries: TerminalEntry[]
  currentDirectory: string
}

/**
 * Renders the terminal output history
 * Displays past commands and their responses
 */
export function TerminalOutput({ entries, currentDirectory }: TerminalOutputProps) {
  if (entries.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className="space-y-1">
          {/* Command line */}
          <div className="flex items-center gap-1">
            <span className="text-green-400">tarik@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">{currentDirectory}</span>
            <span className="text-white">$</span>
            <span className="text-white ml-1">{entry.command}</span>
          </div>
          {/* Response */}
          {entry.response && (
            <div className="text-white/90 ml-0 whitespace-pre-wrap">
              {entry.response}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
