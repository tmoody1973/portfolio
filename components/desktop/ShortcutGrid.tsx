'use client'

import { ReactNode } from 'react'

interface ShortcutGridProps {
  /** Shortcut components to render in the grid */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Container for desktop shortcuts
 * Arranges shortcuts vertically on the right side of the desktop
 * Layout is controlled by parent .desktop-icon-grid CSS
 */
export function ShortcutGrid({ children, className = '' }: ShortcutGridProps) {
  return (
    <>
      {children}
    </>
  )
}

export default ShortcutGrid
