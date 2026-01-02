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
  /** Dock content */
  dock?: ReactNode
  /** Window layer content */
  windowLayer?: ReactNode
}

/**
 * Main Desktop container component
 * Provides Ubuntu-styled desktop environment with:
 * - Full viewport wallpaper background
 * - Top bar area (reserved for navbar)
 * - Icon grid area for shortcuts
 * - Dock area at bottom
 * - Window layer for application windows
 */
export function Desktop({
  wallpaper = DEFAULT_WALLPAPER_KEY,
  children,
  topBar,
  dock,
  windowLayer,
}: DesktopProps) {
  return (
    <div className="desktop">
      {/* Wallpaper layer - z-index handled internally */}
      <Wallpaper wallpaper={wallpaper} />

      {/* Top bar area */}
      <header className="desktop-topbar">
        {topBar}
      </header>

      {/* Main content area - icon grid */}
      <main className="desktop-content">
        <div className="desktop-icon-grid">
          {children}
        </div>
      </main>

      {/* Dock area */}
      <footer className="desktop-dock">
        {dock}
      </footer>

      {/* Window layer - sits above icons but below modals */}
      <div className="desktop-windows">
        {windowLayer}
      </div>
    </div>
  )
}

export default Desktop
