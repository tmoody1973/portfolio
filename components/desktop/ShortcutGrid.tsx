'use client'

import { ReactNode } from 'react'

interface ShortcutGridProps {
  /** Shortcut components to render in the grid */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Grid container for desktop shortcuts
 * Arranges shortcuts in a responsive column-first grid
 */
export function ShortcutGrid({ children, className = '' }: ShortcutGridProps) {
  return (
    <div
      className={`
        shortcut-grid
        h-full w-full
        grid
        grid-flow-col
        auto-cols-max
        gap-1
        p-2
        content-start
        ${className}
      `}
      style={{
        gridTemplateRows: 'repeat(auto-fill, minmax(90px, max-content))',
      }}
    >
      {children}
    </div>
  )
}

export default ShortcutGrid
