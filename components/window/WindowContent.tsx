'use client'

import { ReactNode } from 'react'

interface WindowContentProps {
  /** Content to render inside the window */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Window content area with scrollable container
 * Dark Ubuntu background with custom scrollbar styling
 */
export function WindowContent({ children, className = '' }: WindowContentProps) {
  return (
    <div
      className={`
        window-content
        flex-1
        overflow-auto
        bg-ub-drk-abrgn
        windowMainScreen
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default WindowContent
