'use client'

import { useEffect, useState, useCallback } from 'react'
import { useBootStore, useWindowStore, useWallpaperStore } from '@/store'
import { useViewport } from '@/hooks'
import { BootSequence } from './boot'
import { getBootSequenceConfig, BootSequenceConfig, getStickyNoteConfig, StickyNoteConfig, getActiveWallpaper, WallpaperConfig } from '@/lib/sanity'
import { Desktop, Dock, ShortcutGrid, DesktopShortcut, StickyNote, DOCK_APPS, DEFAULT_SHORTCUTS, EXTERNAL_SHORTCUTS } from './desktop'
import { WindowShell } from './window'
import { MobileAppDrawer, MobileBottomNav, MobileAppView } from './mobile'
import { AboutApp } from './apps/about'
import { TerminalApp } from './apps/terminal/TerminalApp'
import { PlayerApp } from './apps/player/PlayerApp'
import { ChromeApp } from './apps/chrome/ChromeApp'
import { ContactApp } from './apps/contact'
import { CratesApp } from './apps/crates'
import { MixcloudApp } from './apps/mixcloud'
import { SettingsApp } from './apps/settings/SettingsApp'
import Navbar from './screen/navbar'

// Screen states
type ScreenState = 'boot' | 'desktop' | 'locked' | 'shutdown'

// Default wallpapers map for resolving keys to URLs
const WALLPAPER_MAP: Record<string, string> = {
  'wall-1': '/images/wallpapers/wall-1.webp',
  'wall-2': '/images/wallpapers/wall-2.webp',
  'wall-3': '/images/wallpapers/wall-3.webp',
  'wall-4': '/images/wallpapers/wall-4.webp',
  'wall-5': '/images/wallpapers/wall-5.webp',
  'wall-6': '/images/wallpapers/wall-6.webp',
  'wall-7': '/images/wallpapers/wall-7.webp',
  'wall-8': '/images/wallpapers/wall-8.webp',
  'wall-9': '/images/wallpapers/wall-9.webp',
}

// Helper to resolve wallpaper key or URL to a full URL
function resolveWallpaperUrl(wallpaper: string): string {
  // If it's a key from our default wallpapers
  if (wallpaper in WALLPAPER_MAP) {
    return WALLPAPER_MAP[wallpaper]
  }
  // If it looks like a URL (starts with http or /)
  if (wallpaper.startsWith('http') || wallpaper.startsWith('/')) {
    return wallpaper
  }
  // Fallback to default
  return WALLPAPER_MAP['wall-9']
}

// App configuration for both desktop and mobile
const APP_CONFIGS: Record<string, { title: string; icon: string; appType: string }> = {
  about: { title: 'About Me', icon: '/themes/Yaru/apps/user-info.svg', appType: 'about' },
  terminal: { title: 'Terminal', icon: '/themes/Yaru/apps/bash.png', appType: 'terminal' },
  chrome: { title: 'Projects', icon: '/themes/Yaru/apps/chrome.png', appType: 'chrome' },
  trash: { title: 'Trash', icon: '/themes/Yaru/apps/trash.svg', appType: 'trash' },
  files: { title: 'Files', icon: '/themes/Yaru/apps/filemanager.svg', appType: 'files' },
  player: { title: 'Music', icon: '/themes/Yaru/apps/music-player.png', appType: 'player' },
  mixcloud: { title: 'Rhythm Lab Shows', icon: '/themes/Yaru/apps/music-player.png', appType: 'mixcloud' },
  crates: { title: 'Crates', icon: '/themes/Yaru/apps/crates.svg', appType: 'crates' },
  contact: { title: 'Contact', icon: '/themes/Yaru/apps/email.svg', appType: 'contact' },
  settings: { title: 'Settings', icon: '/themes/Yaru/apps/gnome-control-center.png', appType: 'settings' },
}

// Mobile nav items (subset of apps for quick access)
const MOBILE_NAV_ITEMS = [
  { id: 'about', name: 'About', icon: '/themes/Yaru/apps/user-info.svg', appType: 'about' },
  { id: 'chrome', name: 'Projects', icon: '/themes/Yaru/apps/chrome.png', appType: 'chrome' },
  { id: 'player', name: 'Music', icon: '/themes/Yaru/apps/music-player.png', appType: 'player' },
  { id: 'contact', name: 'Contact', icon: '/themes/Yaru/apps/email.svg', appType: 'contact' },
]

// All apps for mobile drawer
const MOBILE_DRAWER_APPS = Object.entries(APP_CONFIGS).map(([id, config]) => ({
  id,
  name: config.title,
  icon: config.icon,
  appType: config.appType,
}))

/**
 * Main Ubuntu Desktop component
 * Orchestrates the entire desktop experience using Zustand stores
 * Now with responsive support for mobile/tablet
 */
// Local storage key for user wallpaper preference
const WALLPAPER_PREF_KEY = 'portfolio-wallpaper-pref'

export function UbuntuDesktop() {
  const [screenState, setScreenState] = useState<ScreenState>('boot')
  const [mobileActiveApp, setMobileActiveApp] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [bootConfig, setBootConfig] = useState<BootSequenceConfig | null>(null)
  const [bootConfigLoaded, setBootConfigLoaded] = useState(false)
  const [stickyNoteConfig, setStickyNoteConfig] = useState<StickyNoteConfig | null>(null)

  // Viewport detection
  const { isMobile, isTablet } = useViewport()

  // Boot store
  const { isBooting, isComplete, startBoot, complete, skip } = useBootStore()

  // Window store (for desktop)
  const { openWindow, windows, closeWindow } = useWindowStore()

  // Wallpaper store
  const { currentWallpaper, setWallpaper, setSanityWallpapers, loadFromStorage } = useWallpaperStore()

  // Fetch configs from Sanity on mount
  useEffect(() => {
    // Load wallpaper from localStorage first
    loadFromStorage()

    // Fetch boot config
    getBootSequenceConfig().then((config) => {
      setBootConfig(config)
      setBootConfigLoaded(true)
      // Start boot after config is loaded
      setTimeout(() => startBoot(), 50) // Small delay to ensure state is updated
    }).catch(() => {
      // On error, start with defaults
      setBootConfigLoaded(true)
      startBoot()
    })

    // Fetch sticky note config
    getStickyNoteConfig().then((config) => {
      setStickyNoteConfig(config)
    }).catch(() => {
      // Silently fail - sticky note is optional
    })

    // Fetch active wallpaper from Sanity
    getActiveWallpaper().then((wp) => {
      // Check for user preference first
      const userPref = localStorage.getItem(WALLPAPER_PREF_KEY)
      if (!userPref && wp?.imageUrl) {
        // No user preference, use Sanity wallpaper as default
        setWallpaper(wp.imageUrl)
      }
    }).catch(() => {
      // Silently fail - use default wallpaper
    })
  }, [startBoot, loadFromStorage, setWallpaper])

  // Sync screen state with boot store
  useEffect(() => {
    if (isComplete) {
      setScreenState('desktop')
    } else if (isBooting) {
      setScreenState('boot')
    }
  }, [isBooting, isComplete])

  // Handle boot sequence completion
  const handleBootComplete = useCallback(() => {
    complete()
  }, [complete])

  // Handle boot skip
  const handleBootSkip = useCallback(() => {
    skip()
  }, [skip])

  // Handle opening apps (desktop)
  const handleOpenApp = useCallback(
    (appId: string) => {
      const config = APP_CONFIGS[appId]
      if (config) {
        openWindow({
          id: appId,
          title: config.title,
          icon: config.icon,
          appType: config.appType,
        })
      }
    },
    [openWindow]
  )

  // Handle opening apps (mobile)
  const handleMobileOpenApp = useCallback((appId: string) => {
    setMobileActiveApp(appId)
    setIsDrawerOpen(false)
  }, [])

  // Handle mobile back
  const handleMobileBack = useCallback(() => {
    setMobileActiveApp(null)
  }, [])

  // Handle lock screen
  const handleLockScreen = useCallback(() => {
    setScreenState('locked')
    localStorage.setItem('screen-locked', 'true')
  }, [])

  // Handle shutdown
  const handleShutdown = useCallback(() => {
    setScreenState('shutdown')
    localStorage.setItem('shut-down', 'true')
  }, [])

  // Handle unlock (for lock screen)
  const handleUnlock = useCallback(() => {
    setScreenState('desktop')
    localStorage.setItem('screen-locked', 'false')
  }, [])

  // Handle turn on (from shutdown)
  const handleTurnOn = useCallback(() => {
    localStorage.setItem('shut-down', 'false')
    useBootStore.getState().reset()
    startBoot()
  }, [startBoot])

  // Handle "Show Applications" from dock
  const handleShowApps = useCallback(() => {
    setIsDrawerOpen(true)
  }, [])

  // Render boot sequence
  if (screenState === 'boot' && isBooting && bootConfigLoaded) {
    // Transform Sanity boot messages to component format
    const bootMessages = bootConfig?.bootMessages?.map((msg) => ({
      text: msg.message,
      delay: msg.delay,
    }))

    return (
      <BootSequence
        isActive={true}
        onComplete={handleBootComplete}
        onSkip={handleBootSkip}
        asciiArt={bootConfig?.asciiArt}
        messages={bootMessages}
        asciiDuration={bootConfig?.asciiAnimationSpeed ? bootConfig.asciiAnimationSpeed * 80 : undefined}
      />
    )
  }

  // Show loading state while waiting for boot config
  if (screenState === 'boot' && !bootConfigLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white/50 font-mono text-sm">Loading...</div>
      </div>
    )
  }

  // Render shutdown screen
  if (screenState === 'shutdown') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <img
          src="/themes/Yaru/status/cof_orange_hex.svg"
          alt="Ubuntu Logo"
          className="w-1/4 md:w-1/6 mb-8"
        />
        <button
          onClick={handleTurnOn}
          className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors touch-manipulation"
        >
          <img
            src="/themes/Yaru/status/power-button.svg"
            alt="Power On"
            className="w-8 h-8"
          />
        </button>
      </div>
    )
  }

  // Render lock screen
  if (screenState === 'locked') {
    return (
      <div
        className="fixed inset-0 bg-cover bg-center flex flex-col items-center justify-center z-50 cursor-pointer"
        style={{ backgroundImage: `url(${resolveWallpaperUrl(currentWallpaper)})` }}
        onClick={handleUnlock}
        onKeyDown={(e) => e.key && handleUnlock()}
        role="button"
        tabIndex={0}
      >
        <div className="bg-black/50 backdrop-blur-md rounded-full p-8 mb-4">
          <img
            src="/themes/Yaru/status/cof_orange_hex.svg"
            alt="User Avatar"
            className="w-24 h-24"
          />
        </div>
        <h2 className="text-white text-2xl font-medium mb-2">Tarik Moody</h2>
        <p className="text-white/70 text-sm">Tap anywhere to unlock</p>
      </div>
    )
  }

  // Mobile Layout
  if (isMobile) {
    const activeAppConfig = mobileActiveApp ? APP_CONFIGS[mobileActiveApp] : null

    return (
      <div
        className="w-screen h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${resolveWallpaperUrl(currentWallpaper)})` }}
        id="ubuntu-mobile"
      >
        {/* Active App (Full Screen) */}
        {mobileActiveApp && activeAppConfig ? (
          <MobileAppView
            title={activeAppConfig.title}
            onBack={handleMobileBack}
          >
            <AppContent appType={activeAppConfig.appType} windowId={mobileActiveApp} />
          </MobileAppView>
        ) : (
          // Home screen with welcome message
          <div className="h-full flex flex-col items-center justify-center p-6 pb-20">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 text-center max-w-sm">
              <img
                src="/themes/Yaru/status/cof_orange_hex.svg"
                alt="Ubuntu Logo"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-white mb-2">Tarik Moody</h1>
              <p className="text-white/70 text-sm mb-4">
                Software Engineer & Creative Technologist
              </p>
              <p className="text-white/50 text-xs">
                Use the navigation below to explore
              </p>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <MobileBottomNav
          items={MOBILE_NAV_ITEMS}
          activeAppId={mobileActiveApp || undefined}
          onNavClick={handleMobileOpenApp}
          onShowDrawer={() => setIsDrawerOpen(true)}
        />

        {/* App Drawer */}
        <MobileAppDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpenApp={handleMobileOpenApp}
          apps={MOBILE_DRAWER_APPS}
        />
      </div>
    )
  }

  // Tablet Layout (simplified desktop - single window at a time)
  if (isTablet) {
    return (
      <div className="w-screen h-screen overflow-hidden" id="ubuntu-tablet">
        <Desktop
          wallpaper={currentWallpaper}
          topBar={
            <Navbar
              lockScreen={handleLockScreen}
              shutDown={handleShutdown}
            />
          }
          sidebarDock={
            <Dock
              apps={DOCK_APPS}
              onShowApps={handleShowApps}
            />
          }
          hasSidebarDock={true}
          windowLayer={
            <TabletWindowLayer />
          }
        >
          {/* Desktop Shortcuts (larger touch targets) */}
          <ShortcutGrid>
            {DEFAULT_SHORTCUTS.map((shortcut) => (
              <DesktopShortcut
                key={shortcut.id}
                {...shortcut}
                onOpen={handleOpenApp}
              />
            ))}
            {EXTERNAL_SHORTCUTS.map((shortcut) => (
              <DesktopShortcut
                key={shortcut.id}
                {...shortcut}
              />
            ))}
          </ShortcutGrid>
        </Desktop>

        {/* Sticky Note */}
        <StickyNote config={stickyNoteConfig} />

        {/* App Drawer for tablet */}
        <MobileAppDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpenApp={handleOpenApp}
          apps={MOBILE_DRAWER_APPS}
        />
      </div>
    )
  }

  // Desktop Layout (original)
  return (
    <div className="w-screen h-screen overflow-hidden" id="ubuntu-desktop">
      <Desktop
        wallpaper={currentWallpaper}
        topBar={
          <Navbar
            lockScreen={handleLockScreen}
            shutDown={handleShutdown}
          />
        }
        sidebarDock={
          <Dock
            apps={DOCK_APPS}
            onShowApps={handleShowApps}
          />
        }
        hasSidebarDock={true}
        windowLayer={
          <WindowLayer />
        }
      >
        {/* Desktop Shortcuts */}
        <ShortcutGrid>
          {DEFAULT_SHORTCUTS.map((shortcut) => (
            <DesktopShortcut
              key={shortcut.id}
              {...shortcut}
              onOpen={handleOpenApp}
            />
          ))}
          {EXTERNAL_SHORTCUTS.map((shortcut) => (
            <DesktopShortcut
              key={shortcut.id}
              {...shortcut}
            />
          ))}
        </ShortcutGrid>
      </Desktop>

      {/* Sticky Note */}
      <StickyNote config={stickyNoteConfig} />

      {/* App Drawer for desktop */}
      <MobileAppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenApp={handleOpenApp}
        apps={MOBILE_DRAWER_APPS}
      />
    </div>
  )
}

/**
 * Window layer component - renders all open windows (desktop)
 */
function WindowLayer() {
  const { windows } = useWindowStore()

  if (windows.length === 0) {
    return null
  }

  return (
    <>
      {windows.map((window) => (
        <WindowShell key={window.id} windowId={window.id}>
          <AppContent appType={window.appType} windowId={window.id} />
        </WindowShell>
      ))}
    </>
  )
}

/**
 * Tablet window layer - only shows the most recent window maximized
 */
function TabletWindowLayer() {
  const { windows, closeWindow } = useWindowStore()

  // Only show the most recent (top) window
  const topWindow = windows.length > 0 ? windows[windows.length - 1] : null

  if (!topWindow) {
    return null
  }

  return (
    <div className="fixed inset-0 pt-8 pl-14 z-20 bg-[#1e1e1e]">
      {/* Window header */}
      <div className="flex items-center justify-between h-10 px-4 bg-[#2d2d2d] border-b border-white/10">
        <span className="text-white/80 font-medium">{topWindow.title}</span>
        <button
          onClick={() => closeWindow(topWindow.id)}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors touch-manipulation"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Window content */}
      <div className="h-[calc(100%-40px)] overflow-hidden">
        <AppContent appType={topWindow.appType} windowId={topWindow.id} />
      </div>
    </div>
  )
}

/**
 * Renders app-specific content based on appType
 */
function AppContent({ appType, windowId }: { appType: string; windowId: string }) {
  switch (appType) {
    case 'about':
      return <AboutApp />
    case 'terminal':
      return <TerminalApp windowId={windowId} />
    case 'player':
      return <PlayerApp />
    case 'chrome':
      return <ChromeApp />
    case 'contact':
      return <ContactApp />
    case 'crates':
      return <CratesApp />
    case 'mixcloud':
      return <MixcloudApp />
    case 'settings':
      return <SettingsApp />
    default:
      return <AppPlaceholder appType={appType} windowId={windowId} />
  }
}

/**
 * Placeholder for apps not yet implemented
 */
function AppPlaceholder({ appType, windowId }: { appType: string; windowId: string }) {
  const appPlaceholders: Record<string, { title: string; description: string }> = {
    vscode: { title: 'VS Code', description: 'Code editor view' },
    files: { title: 'Files', description: 'File manager' },
    crates: { title: 'Crates', description: 'Curated discoveries (Epic 10)' },
    trash: { title: 'Trash', description: 'Deleted items' },
  }

  const placeholder = appPlaceholders[appType] || { title: appType, description: 'Unknown app' }

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <div className="text-white/30 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-white/70 text-lg font-medium mb-2">{placeholder.title}</h3>
      <p className="text-white/40 text-sm max-w-xs">{placeholder.description}</p>
    </div>
  )
}

export default UbuntuDesktop
