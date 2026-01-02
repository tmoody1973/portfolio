'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { DockApp } from './DockApp'
import { DockSocialMenu } from './DockSocialMenu'
import { useWindowStore } from '@/store'

export interface DockAppConfig {
  /** Unique identifier for the app */
  id: string
  /** Display name shown in tooltip */
  name: string
  /** Path to icon image */
  icon: string
  /** App type for window store */
  appType: string
}

export interface DockProps {
  /** List of apps to show in dock */
  apps: DockAppConfig[]
  /** Whether dock should auto-hide */
  autoHide?: boolean
  /** Callback when "Show Applications" is clicked */
  onShowApps?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Ubuntu-style dock/sidebar for launching and managing apps
 * Positioned on the left side of the screen
 */
export function Dock({
  apps,
  autoHide = false,
  onShowApps,
  className = '',
}: DockProps) {
  const [isHidden, setIsHidden] = useState(autoHide)
  const [showAppsTooltip, setShowAppsTooltip] = useState(false)

  const { windows, activeWindowId, openWindow, focusWindow, restoreWindow } = useWindowStore()

  // Handle app click - open new window or focus/restore existing
  const handleAppClick = useCallback(
    (appId: string) => {
      const appConfig = apps.find((a) => a.id === appId)
      if (!appConfig) return

      const existingWindow = windows.find((w) => w.appType === appConfig.appType)

      if (existingWindow) {
        // If minimized, restore it
        if (existingWindow.isMinimized) {
          restoreWindow(existingWindow.id)
        } else {
          // Just focus it
          focusWindow(existingWindow.id)
        }
      } else {
        // Open new window
        openWindow({
          id: appConfig.id,
          title: appConfig.name,
          icon: appConfig.icon,
          appType: appConfig.appType,
        })
      }
    },
    [apps, windows, openWindow, focusWindow, restoreWindow]
  )

  // Check if an app has an open window
  const isAppOpen = (appType: string) => {
    return windows.some((w) => w.appType === appType)
  }

  // Check if an app's window is focused
  const isAppFocused = (appType: string) => {
    if (!activeWindowId) return false
    const activeWindow = windows.find((w) => w.id === activeWindowId)
    return activeWindow?.appType === appType
  }

  // Show dock on hover when auto-hide is enabled
  const handleMouseEnter = () => {
    if (autoHide) setIsHidden(false)
  }

  const handleMouseLeave = () => {
    if (autoHide) {
      setTimeout(() => setIsHidden(true), 1500)
    }
  }

  return (
    <>
      {/* Dock Container */}
      <div
        className={`
          dock
          fixed
          left-0 top-0
          h-full
          pt-8
          w-14
          flex flex-col
          items-center
          justify-start
          bg-black/50
          border-r border-black/60
          z-40
          transform transition-transform duration-300
          ${isHidden ? '-translate-x-full' : 'translate-x-0'}
          ${className}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* App Icons */}
        <div className="flex flex-col items-center flex-grow">
          {apps.map((app) => (
            <DockApp
              key={app.id}
              id={app.id}
              name={app.name}
              icon={app.icon}
              isOpen={isAppOpen(app.appType)}
              isFocused={isAppFocused(app.appType)}
              onClick={handleAppClick}
            />
          ))}
        </div>

        {/* Social Links Menu */}
        <DockSocialMenu />

        {/* Show Applications Button */}
        <div
          className="
            dock-show-apps
            relative
            w-12 h-12
            p-2
            m-1 mb-2
            rounded-lg
            cursor-pointer
            hover:bg-white/10
            transition-colors
            flex items-center justify-center
          "
          onClick={onShowApps}
          onMouseEnter={() => setShowAppsTooltip(true)}
          onMouseLeave={() => setShowAppsTooltip(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onShowApps?.()
            }
          }}
          aria-label="Show Applications"
        >
          <Image
            src="/themes/Yaru/system/view-app-grid-symbolic.svg"
            alt="Show Applications"
            width={28}
            height={28}
            className="w-7 h-7"
          />

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
              ${showAppsTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
            `}
            role="tooltip"
          >
            Show Applications
          </div>
        </div>
      </div>

      {/* Auto-hide trigger zone */}
      {autoHide && (
        <div
          className="fixed left-0 top-0 w-1 h-full bg-transparent z-50"
          onMouseEnter={handleMouseEnter}
        />
      )}
    </>
  )
}

export default Dock
