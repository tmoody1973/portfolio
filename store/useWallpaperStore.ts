'use client'

import { create } from 'zustand'

// Default wallpapers available in the system
export const DEFAULT_WALLPAPERS = [
  { key: 'wall-1', name: 'Galaxy', url: '/images/wallpapers/wall-1.webp' },
  { key: 'wall-2', name: 'Aurora', url: '/images/wallpapers/wall-2.webp' },
  { key: 'wall-3', name: 'Mountains', url: '/images/wallpapers/wall-3.webp' },
  { key: 'wall-4', name: 'Abstract', url: '/images/wallpapers/wall-4.webp' },
  { key: 'wall-5', name: 'Nature', url: '/images/wallpapers/wall-5.webp' },
  { key: 'wall-6', name: 'City', url: '/images/wallpapers/wall-6.webp' },
  { key: 'wall-7', name: 'Ocean', url: '/images/wallpapers/wall-7.webp' },
  { key: 'wall-8', name: 'Desert', url: '/images/wallpapers/wall-8.webp' },
  { key: 'wall-9', name: 'Ubuntu Default', url: '/images/wallpapers/wall-9.webp' },
]

const WALLPAPER_PREF_KEY = 'portfolio-wallpaper-pref'

interface WallpaperState {
  currentWallpaper: string
  sanityWallpapers: Array<{ id: string; name: string; url: string }>
  setWallpaper: (wallpaper: string) => void
  setSanityWallpapers: (wallpapers: Array<{ id: string; name: string; url: string }>) => void
  loadFromStorage: () => void
}

export const useWallpaperStore = create<WallpaperState>((set) => ({
  currentWallpaper: '/images/wallpapers/wall-9.webp',
  sanityWallpapers: [],

  setWallpaper: (wallpaper: string) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(WALLPAPER_PREF_KEY, wallpaper)
    }
    set({ currentWallpaper: wallpaper })
  },

  setSanityWallpapers: (wallpapers) => {
    set({ sanityWallpapers: wallpapers })
  },

  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(WALLPAPER_PREF_KEY)
      if (saved) {
        set({ currentWallpaper: saved })
      }
    }
  },
}))

export default useWallpaperStore
