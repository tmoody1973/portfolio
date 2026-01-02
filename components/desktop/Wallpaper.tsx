'use client'

import { useMemo } from 'react'
import Image from 'next/image'

// Default wallpapers available in the system
export const DEFAULT_WALLPAPERS: Record<string, string> = {
  'wall-1': '/images/wallpapers/wall-1.webp',
  'wall-2': '/images/wallpapers/wall-2.webp',
  'wall-3': '/images/wallpapers/wall-3.webp',
  'wall-4': '/images/wallpapers/wall-4.webp',
  'wall-5': '/images/wallpapers/wall-5.webp',
  'wall-6': '/images/wallpapers/wall-6.webp',
  'wall-7': '/images/wallpapers/wall-7.webp',
  'wall-8': '/images/wallpapers/wall-8.webp',
}

// Default wallpaper if none specified
export const DEFAULT_WALLPAPER_KEY = 'wall-2'

interface WallpaperProps {
  /** Wallpaper key from DEFAULT_WALLPAPERS or full URL */
  wallpaper?: string
  /** Fallback color if image fails to load */
  fallbackColor?: string
}

export function Wallpaper({
  wallpaper = DEFAULT_WALLPAPER_KEY,
  fallbackColor = '#2c001e', // Ubuntu dark purple
}: WallpaperProps) {
  // Resolve wallpaper URL
  const wallpaperUrl = useMemo(() => {
    // If it's a key from our default wallpapers
    if (wallpaper in DEFAULT_WALLPAPERS) {
      return DEFAULT_WALLPAPERS[wallpaper]
    }
    // If it looks like a URL (starts with http or /)
    if (wallpaper.startsWith('http') || wallpaper.startsWith('/')) {
      return wallpaper
    }
    // Fallback to default
    return DEFAULT_WALLPAPERS[DEFAULT_WALLPAPER_KEY]
  }, [wallpaper])

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: fallbackColor }}
    >
      <Image
        src={wallpaperUrl}
        alt="Desktop wallpaper"
        fill
        priority
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  )
}

export default Wallpaper
