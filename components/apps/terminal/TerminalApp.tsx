'use client'

import React, { useCallback, useRef, useEffect } from 'react'
import { useTerminalStore, useWindowStore } from '@/store'
import { TerminalOutput } from './TerminalOutput'
import { TerminalPrompt } from './TerminalPrompt'
import { executeCommand } from './commands'

interface TerminalAppProps {
  className?: string
  windowId?: string
}

/**
 * Terminal Application
 * Interactive command-line interface with personality-driven responses
 */
export function TerminalApp({ className = '', windowId }: TerminalAppProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Terminal store
  const {
    outputHistory,
    currentInput,
    currentDirectory,
    executeCommand: storeExecuteCommand,
    setInput,
    navigateHistory,
    clearTerminal,
  } = useTerminalStore()

  // Window store for app launching and closing
  const { openWindow, closeWindow } = useWindowStore()

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [outputHistory])

  // Handle command submission
  const handleSubmit = useCallback(
    (command: string) => {
      const trimmed = command.trim()
      if (!trimmed) return

      // Execute the command
      const result = executeCommand(trimmed)

      // Handle special actions
      if (result.action === 'clear') {
        clearTerminal()
        return
      }

      if (result.action === 'exit' && windowId) {
        closeWindow(windowId)
        return
      }

      if (result.action === 'open-app' && result.appToOpen) {
        const appConfigs: Record<string, { title: string; icon: string; appType: string }> = {
          about: { title: 'About Me', icon: '/themes/Yaru/apps/user-info.png', appType: 'about' },
          chrome: { title: 'Projects', icon: '/themes/Yaru/apps/chrome.png', appType: 'chrome' },
          player: { title: 'Music', icon: '/themes/Yaru/apps/rhythmbox.png', appType: 'player' },
        }
        const config = appConfigs[result.appToOpen]
        if (config) {
          openWindow({
            id: result.appToOpen,
            title: config.title,
            icon: config.icon,
            appType: config.appType,
          })
        }
      }

      // Add to output history
      storeExecuteCommand(trimmed, result.output)
    },
    [clearTerminal, closeWindow, openWindow, storeExecuteCommand, windowId]
  )

  // Handle input changes
  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value)
    },
    [setInput]
  )

  // Handle history navigation
  const handleNavigateHistory = useCallback(
    (direction: 'up' | 'down') => {
      return navigateHistory(direction)
    },
    [navigateHistory]
  )

  // Focus input when clicking terminal body
  const handleContainerClick = useCallback(() => {
    // Focus will be handled by TerminalPrompt
  }, [])

  return (
    <div
      ref={containerRef}
      className={`terminal-app h-full w-full bg-[#300a24] text-white font-mono text-sm p-3 overflow-y-auto ${className}`}
      onClick={handleContainerClick}
    >
      {/* Welcome message */}
      {outputHistory.length === 0 && (
        <div className="mb-4 space-y-1">
          <div className="text-green-400">Welcome to Tarik&apos;s Terminal</div>
          <div className="text-white/60">Type &apos;help&apos; to see available commands.</div>
          <div className="text-white/40 text-xs">Use arrow keys to navigate command history.</div>
        </div>
      )}

      {/* Output history */}
      <TerminalOutput entries={outputHistory} currentDirectory={currentDirectory} />

      {/* Current prompt */}
      <div className="mt-2">
        <TerminalPrompt
          currentDirectory={currentDirectory}
          value={currentInput}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onNavigateHistory={handleNavigateHistory}
        />
      </div>
    </div>
  )
}

export default TerminalApp
