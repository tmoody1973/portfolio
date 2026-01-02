'use client'

import { ReactNode, useCallback, useRef, MouseEvent } from 'react'
import { useWindowStore, useIsWindowActive, WindowState } from '@/store'
import { WindowTitleBar } from './WindowTitleBar'
import { WindowControls } from './WindowControls'
import { WindowContent } from './WindowContent'

interface WindowShellProps {
  /** Window ID from the store */
  windowId: string
  /** Content to render inside the window */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Complete window shell component
 * Provides title bar, controls, and content area
 * Integrates with Zustand window store for state management
 */
export function WindowShell({ windowId, children, className = '' }: WindowShellProps) {
  const windowRef = useRef<HTMLDivElement>(null)

  // Get window state from store
  const window = useWindowStore((state) => state.windows.find((w) => w.id === windowId))
  const isActive = useIsWindowActive(windowId)

  // Get actions from store
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow } = useWindowStore()

  // Handlers
  const handleClose = useCallback(() => {
    closeWindow(windowId)
  }, [closeWindow, windowId])

  const handleMinimize = useCallback(() => {
    minimizeWindow(windowId)
  }, [minimizeWindow, windowId])

  const handleMaximize = useCallback(() => {
    toggleMaximize(windowId)
  }, [toggleMaximize, windowId])

  const handleFocus = useCallback(
    (e: MouseEvent) => {
      // Only focus if clicking on the window itself, not interactive elements
      focusWindow(windowId)
    },
    [focusWindow, windowId]
  )

  // Don't render if window doesn't exist in store
  if (!window) {
    return null
  }

  // Calculate styles based on window state
  const windowStyles: React.CSSProperties = {
    left: window.isMaximized ? 0 : window.position.x,
    top: window.isMaximized ? 0 : window.position.y,
    width: window.isMaximized ? '100%' : window.size.width,
    height: window.isMaximized ? '100%' : window.size.height,
    zIndex: window.zIndex,
    display: window.isMinimized ? 'none' : 'flex',
  }

  return (
    <div
      ref={windowRef}
      id={`window-${windowId}`}
      className={`
        window-shell
        absolute
        flex flex-col
        overflow-hidden
        ${window.isMaximized ? 'rounded-none' : 'rounded-lg rounded-b-none'}
        ${isActive ? 'z-30' : 'z-20 notFocused'}
        ${window.isMinimized ? 'opacity-0 invisible' : ''}
        window-shadow
        border border-black/40 border-t-0
        transition-[border-radius] duration-200
        ${className}
      `}
      style={windowStyles}
      onMouseDown={handleFocus}
    >
      {/* Title bar - draggable area */}
      <div className="relative">
        <WindowTitleBar
          title={window.title}
          isFocused={isActive}
        />
        <WindowControls
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
          isMaximized={window.isMaximized}
        />
      </div>

      {/* Content area */}
      <WindowContent>
        {children}
      </WindowContent>
    </div>
  )
}

export default WindowShell
