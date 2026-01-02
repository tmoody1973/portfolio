'use client'

import { useEffect, useState, useCallback } from 'react'
import { useBootStore, useWindowStore } from '@/store'
import { BootSequence } from './boot'
import { Desktop, Dock, ShortcutGrid, DesktopShortcut, DOCK_APPS, DEFAULT_SHORTCUTS, EXTERNAL_SHORTCUTS } from './desktop'
import { WindowShell } from './window'
import Navbar from './screen/navbar'

// Screen states
type ScreenState = 'boot' | 'desktop' | 'locked' | 'shutdown'

/**
 * Main Ubuntu Desktop component
 * Orchestrates the entire desktop experience using Zustand stores
 */
export function UbuntuDesktop() {
  const [screenState, setScreenState] = useState<ScreenState>('boot')
  const [wallpaper, setWallpaper] = useState('wall-9')

  // Boot store
  const { isBooting, isComplete, startBoot, complete, skip } = useBootStore()

  // Window store
  const { openWindow, windows } = useWindowStore()

  // Initialize boot sequence on mount
  useEffect(() => {
    startBoot()
  }, [startBoot])

  // Sync screen state with boot store
  useEffect(() => {
    if (isComplete) {
      setScreenState('desktop')
    } else if (isBooting) {
      setScreenState('boot')
    }
  }, [isBooting, isComplete])

  // Load wallpaper preference from localStorage
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('bg-image')
    if (savedWallpaper) {
      setWallpaper(savedWallpaper)
    }
  }, [])

  // Handle boot sequence completion
  const handleBootComplete = useCallback(() => {
    complete()
  }, [complete])

  // Handle boot skip
  const handleBootSkip = useCallback(() => {
    skip()
  }, [skip])

  // Handle opening apps from shortcuts
  const handleOpenApp = useCallback(
    (appId: string) => {
      // Map shortcut IDs to window configs
      const appConfigs: Record<string, { title: string; icon: string; appType: string }> = {
        about: { title: 'About Me', icon: '/themes/Yaru/apps/user-info.png', appType: 'about' },
        terminal: { title: 'Terminal', icon: '/themes/Yaru/apps/bash.png', appType: 'terminal' },
        chrome: { title: 'Projects', icon: '/themes/Yaru/apps/chrome.png', appType: 'chrome' },
        vscode: { title: 'VS Code', icon: '/themes/Yaru/apps/vscode.png', appType: 'vscode' },
        trash: { title: 'Trash', icon: '/themes/Yaru/apps/user-trash-full.png', appType: 'trash' },
        files: { title: 'Files', icon: '/themes/Yaru/apps/filemanager.png', appType: 'files' },
        player: { title: 'Music', icon: '/themes/Yaru/apps/rhythmbox.png', appType: 'player' },
        crates: { title: 'Crates', icon: '/themes/Yaru/apps/spotify.png', appType: 'crates' },
      }

      const config = appConfigs[appId]
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
    // Reset boot and restart
    useBootStore.getState().reset()
    startBoot()
  }, [startBoot])

  // Handle "Show Applications" from dock
  const handleShowApps = useCallback(() => {
    // TODO: Implement app grid overlay
    console.log('Show Applications clicked')
  }, [])

  // Render boot sequence
  if (screenState === 'boot' && isBooting) {
    return (
      <BootSequence
        isActive={true}
        onComplete={handleBootComplete}
        onSkip={handleBootSkip}
      />
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
          className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors"
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
        style={{ backgroundImage: `url(/images/wallpapers/${wallpaper}.webp)` }}
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
        <p className="text-white/70 text-sm">Click anywhere to unlock</p>
      </div>
    )
  }

  // Render desktop
  return (
    <div className="w-screen h-screen overflow-hidden" id="ubuntu-desktop">
      <Desktop
        wallpaper={wallpaper}
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
    </div>
  )
}

/**
 * Window layer component - renders all open windows
 * Uses WindowShell for consistent window chrome
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
 * Renders app-specific content based on appType
 * Placeholder until individual app components are built
 */
function AppContent({ appType, windowId }: { appType: string; windowId: string }) {
  // TODO: Map appType to actual app components (Epic 4-7)
  // For now, render placeholder content
  const appPlaceholders: Record<string, { title: string; description: string }> = {
    about: {
      title: 'About Me',
      description: 'Bio, journey, education, and skills (Epic 4)',
    },
    terminal: {
      title: 'Terminal',
      description: 'Interactive command-line interface (Epic 5)',
    },
    chrome: {
      title: 'Projects',
      description: 'Case studies and portfolio items (Epic 7)',
    },
    vscode: {
      title: 'VS Code',
      description: 'Code editor view',
    },
    files: {
      title: 'Files',
      description: 'File manager',
    },
    player: {
      title: 'Music Player',
      description: 'Webamp audio player (Epic 6)',
    },
    crates: {
      title: 'Crates',
      description: 'Curated discoveries (Epic 10)',
    },
    trash: {
      title: 'Trash',
      description: 'Deleted items',
    },
  }

  const placeholder = appPlaceholders[appType] || {
    title: appType,
    description: 'Unknown app',
  }

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center">
      <div className="text-white/30 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-white/70 text-lg font-medium mb-2">{placeholder.title}</h3>
      <p className="text-white/40 text-sm max-w-xs">{placeholder.description}</p>
      <p className="text-white/20 text-xs mt-4">Window ID: {windowId}</p>
    </div>
  )
}

export default UbuntuDesktop
