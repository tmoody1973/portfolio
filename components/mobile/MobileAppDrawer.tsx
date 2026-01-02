'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface AppItem {
  id: string
  name: string
  icon: string
  appType: string
}

interface MobileAppDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenApp: (appId: string) => void
  apps: AppItem[]
}

/**
 * Full-screen app drawer for mobile navigation
 * Slides up from bottom when opened
 */
export function MobileAppDrawer({
  isOpen,
  onClose,
  onOpenApp,
  apps,
}: MobileAppDrawerProps) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleAppClick = (appId: string) => {
    onOpenApp(appId)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-50
          bg-[#1e1e1e] rounded-t-3xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[85vh] overflow-hidden
        `}
        role="dialog"
        aria-modal="true"
        aria-label="App drawer"
      >
        {/* Handle bar */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-white/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Apps</h2>
        </div>

        {/* App Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
          <div className="grid grid-cols-4 gap-4">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="
                  flex flex-col items-center gap-2 p-3
                  rounded-xl
                  active:bg-white/10
                  transition-colors
                  touch-manipulation
                "
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-xs text-white/80 text-center line-clamp-2">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Close button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="
              w-full py-3
              bg-white/10 hover:bg-white/20
              text-white font-medium
              rounded-xl
              transition-colors
              touch-manipulation
            "
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileAppDrawer
