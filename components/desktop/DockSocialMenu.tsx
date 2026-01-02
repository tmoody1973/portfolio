'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface SocialLink {
  id: string
  name: string
  icon: string
  url: string
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: '/themes/Yaru/apps/github.png',
    url: 'https://github.com/tmoody1973',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/themes/Yaru/apps/linkedin.png',
    url: 'https://www.linkedin.com/in/tarikmoody/',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: '/themes/Yaru/apps/x-twitter.svg',
    url: 'https://x.com/taaborern',
  },
  {
    id: 'substack',
    name: 'Substack',
    icon: '/themes/Yaru/apps/substack.svg',
    url: 'https://tarikmoody.substack.com',
  },
  {
    id: 'buymeacoffee',
    name: 'Buy Me a Coffee',
    icon: '/themes/Yaru/apps/buymeacoffee.svg',
    url: 'https://buymeacoffee.com/tarikmoody',
  },
  {
    id: 'email',
    name: 'Email Me',
    icon: '/themes/Yaru/apps/email.svg',
    url: 'mailto:tarikjmoody@gmail.com',
  },
]

export interface DockSocialMenuProps {
  className?: string
}

/**
 * Social links flyout menu for the dock
 * Shows a "Connect" button that expands to show social links
 */
export function DockSocialMenu({ className = '' }: DockSocialMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      {/* Connect Button */}
      <div
        className={`
          dock-social-btn
          relative
          w-12 h-12
          p-2
          m-1
          rounded-lg
          cursor-pointer
          transition-all duration-150
          ${isOpen ? 'bg-white/15' : 'hover:bg-white/10'}
        `}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
        aria-label="Connect & Social Links"
        aria-expanded={isOpen}
      >
        {/* Connect Icon */}
        <div className="w-8 h-8 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>

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
            ${showTooltip && !isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
          role="tooltip"
        >
          Connect
        </div>
      </div>

      {/* Flyout Menu */}
      {isOpen && (
        <div
          className="
            absolute
            left-full
            bottom-0
            ml-2
            bg-[#2d2d2d]
            border border-gray-600/50
            rounded-lg
            shadow-xl
            overflow-hidden
            z-50
            min-w-[180px]
          "
        >
          <div className="py-1">
            <div className="px-3 py-2 text-xs text-white/40 uppercase tracking-wide border-b border-gray-600/30">
              Connect
            </div>
            {SOCIAL_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSocialClick(link.url)}
                className="
                  w-full
                  flex items-center gap-3
                  px-3 py-2
                  text-sm text-white/80
                  hover:bg-white/10
                  transition-colors
                  text-left
                "
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <span>{link.name}</span>
                <svg
                  className="w-3 h-3 ml-auto text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DockSocialMenu
