'use client'

import { ReactNode, useCallback, useRef, MouseEvent, useState, useEffect } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { useWindowStore, useIsWindowActive, WindowState } from '@/store'
import { WindowTitleBar } from './WindowTitleBar'
import { WindowControls } from './WindowControls'
import { WindowContent } from './WindowContent'

// Layout constants
const DOCK_WIDTH = 50 // Left dock width
const NAVBAR_HEIGHT = 28 // Top navbar height
const DESKTOP_BREAKPOINT = 1024 // Min width for dragging

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
 * Supports dragging on desktop viewports (>= 1024px)
 */
export function WindowShell({ windowId, children, className = '' }: WindowShellProps) {
  const windowRef = useRef<HTMLDivElement>(null)

  // Get window state from store
  const window = useWindowStore((state) => state.windows.find((w) => w.id === windowId))
  const isActive = useIsWindowActive(windowId)

  // Get actions from store
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, updatePosition } = useWindowStore()

  // Track viewport size for responsive drag behavior
  const [isDesktop, setIsDesktop] = useState(true)
  const [bounds, setBounds] = useState({ left: DOCK_WIDTH, top: NAVBAR_HEIGHT, right: 0, bottom: 0 })

  // Update bounds and detect viewport on mount and resize
  useEffect(() => {
    const updateBoundsAndViewport = () => {
      const isDesktopViewport = globalThis.window?.innerWidth >= DESKTOP_BREAKPOINT
      setIsDesktop(isDesktopViewport)

      // Calculate bounds based on window size
      const windowWidth = window?.isMaximized ? 0 : (window?.size.width || 600)
      const windowHeight = window?.isMaximized ? 0 : (window?.size.height || 400)

      setBounds({
        left: DOCK_WIDTH,
        top: NAVBAR_HEIGHT,
        right: (globalThis.window?.innerWidth || 1024) - windowWidth,
        bottom: (globalThis.window?.innerHeight || 768) - windowHeight,
      })
    }

    updateBoundsAndViewport()
    globalThis.window?.addEventListener('resize', updateBoundsAndViewport)

    return () => {
      globalThis.window?.removeEventListener('resize', updateBoundsAndViewport)
    }
  }, [window?.size.width, window?.size.height, window?.isMaximized])

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

  // Handle drag stop - update position in store
  const handleDragStop = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      updatePosition(windowId, { x: data.x, y: data.y })
    },
    [updatePosition, windowId]
  )

  // Don't render if window doesn't exist in store
  if (!window) {
    return null
  }

  // Determine if dragging should be disabled
  const isDragDisabled = !isDesktop || window.isMaximized

  // Calculate styles based on window state
  // When using Draggable, position is controlled by the component
  const windowStyles: React.CSSProperties = {
    width: window.isMaximized ? '100%' : window.size.width,
    height: window.isMaximized ? '100%' : window.size.height,
    zIndex: window.zIndex,
    display: window.isMinimized ? 'none' : 'flex',
  }

  // For maximized state, we need to position absolutely at 0,0
  if (window.isMaximized) {
    windowStyles.position = 'fixed'
    windowStyles.left = 0
    windowStyles.top = 0
  }

  return (
    <Draggable
      axis="both"
      handle=".window-title-bar"
      bounds={bounds}
      position={window.isMaximized ? { x: 0, y: 0 } : { x: window.position.x, y: window.position.y }}
      disabled={isDragDisabled}
      nodeRef={windowRef}
      onStop={handleDragStop}
      grid={[1, 1]}
    >
      <div
        ref={windowRef}
        id={`window-${windowId}`}
        className={`
          window-shell
          ${window.isMaximized ? 'fixed' : 'absolute'}
          flex flex-col
          overflow-hidden
          ${window.isMaximized ? 'rounded-none' : 'rounded-lg rounded-b-none'}
          ${isActive ? 'z-30' : 'z-20 notFocused'}
          ${window.isMinimized ? 'opacity-0 invisible' : ''}
          window-shadow
          border border-black/40 border-t-0
          transition-[border-radius] duration-200
          ${isDragDisabled ? '' : 'cursor-default'}
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
            isDraggable={!isDragDisabled}
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
    </Draggable>
  )
}

export default WindowShell
