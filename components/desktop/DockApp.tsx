'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface DockAppProps {
  /** Unique identifier for the app */
  id: string
  /** Display name shown in tooltip */
  name: string
  /** Path to icon image */
  icon: string
  /** Whether this app has an open window */
  isOpen?: boolean
  /** Whether this app's window is currently focused */
  isFocused?: boolean
  /** Click handler */
  onClick: (id: string) => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Individual dock app icon with hover tooltip and active indicator
 */
export function DockApp({
  id,
  name,
  icon,
  isOpen = false,
  isFocused = false,
  onClick,
  className = '',
}: DockAppProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)

  const handleClick = () => {
    // Trigger bounce animation only when opening a new window
    if (!isOpen) {
      setIsBouncing(true)
      setTimeout(() => setIsBouncing(false), 600)
    }
    onClick(id)
    setShowTooltip(false)
  }

  return (
    <div
      className={`
        dock-app
        relative
        w-12 h-12
        p-2
        m-1
        rounded-lg
        cursor-pointer
        outline-none
        transition-all duration-150
        ${isFocused ? 'bg-white/15' : 'hover:bg-white/10'}
        ${className}
      `}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${name}`}
      id={`dock-app-${id}`}
    >
      {/* App Icon */}
      <div className={`relative ${isBouncing ? 'animate-bounce-dock' : ''}`}>
        <Image
          src={icon}
          alt={name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
          draggable={false}
        />
      </div>

      {/* Active Indicator Dot */}
      {isOpen && (
        <div
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            w-1 h-1
            bg-ub-orange
            rounded-full
          "
          aria-hidden="true"
        />
      )}

      {/* Tooltip */}
      <div
        className={`
          tooltip
          absolute
          top-1/2
          left-full
          ml-3
          -translate-y-1/2
          whitespace-nowrap
          py-1 px-2
          text-sm
          text-ubt-grey
          bg-ub-grey/80
          border border-gray-500/40
          rounded-md
          z-50
          pointer-events-none
          transition-opacity duration-150
          ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        role="tooltip"
      >
        {name}
      </div>
    </div>
  )
}

export default DockApp
