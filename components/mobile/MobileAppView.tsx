'use client'

import { ReactNode } from 'react'

interface MobileAppViewProps {
  title: string
  icon?: string
  onBack?: () => void
  children: ReactNode
}

/**
 * Full-screen app view wrapper for mobile
 * Shows a header with back button and app title
 */
export function MobileAppView({
  title,
  icon,
  onBack,
  children,
}: MobileAppViewProps) {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 h-14 bg-[#2d2d2d] border-b border-white/10 shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="
              w-10 h-10 -ml-2
              flex items-center justify-center
              rounded-full
              active:bg-white/10
              transition-colors
              touch-manipulation
            "
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-medium text-white truncate">{title}</h1>
      </header>

      {/* Content - adjusted for bottom nav */}
      <main className="flex-1 overflow-hidden pb-16">
        {children}
      </main>
    </div>
  )
}

export default MobileAppView
