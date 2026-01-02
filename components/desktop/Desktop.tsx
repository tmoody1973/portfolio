'use client'

import { ReactNode } from 'react'
import { Wallpaper, DEFAULT_WALLPAPER_KEY } from './Wallpaper'

interface DesktopProps {
  /** Wallpaper key or URL */
  wallpaper?: string
  /** Content to render in the icon grid area */
  children?: ReactNode
  /** Top bar/navbar content */
  topBar?: ReactNode
  /** Left sidebar dock content (Ubuntu-style) */
  sidebarDock?: ReactNode
  /** Bottom dock content (mobile fallback) */
  bottomDock?: ReactNode
  /** Window layer content */
  windowLayer?: ReactNode
  /** Whether a sidebar dock is present */
  hasSidebarDock?: boolean
}

/**
 * Main Desktop container component
 * Provides Ubuntu-styled desktop environment with:
 * - Full viewport wallpaper background
 * - Top bar area (reserved for navbar)
 * - Left sidebar dock (Ubuntu 20.04 style)
 * - Icon grid area for shortcuts
 * - Bottom dock area (mobile fallback)
 * - Window layer for application windows
 */
export function Desktop({
  wallpaper = DEFAULT_WALLPAPER_KEY,
  children,
  topBar,
  sidebarDock,
  bottomDock,
  windowLayer,
  hasSidebarDock = false,
}: DesktopProps) {
  return (
    <div className="desktop">
      {/* Wallpaper layer - z-index handled internally */}
      <Wallpaper wallpaper={wallpaper} />

      {/* Top bar area */}
      <header className="desktop-topbar">
        {topBar}
      </header>

      {/* Left sidebar dock (Ubuntu style) */}
      {sidebarDock}

      {/* Main content area - icon grid */}
      <main className={`desktop-content ${hasSidebarDock ? 'desktop-content-with-dock' : ''}`}>
        <div className="desktop-icon-grid">
          {children}
        </div>
      </main>

      {/* Bottom dock area (mobile fallback) */}
      {bottomDock && (
        <footer className="desktop-dock">
          {bottomDock}
        </footer>
      )}

      {/* Window layer - sits above icons but below modals */}
      <div className="desktop-windows">
        {windowLayer}
      </div>
    </div>
  )
}

export default Desktop
