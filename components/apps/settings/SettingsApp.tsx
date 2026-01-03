'use client'

import { useWallpaperStore, DEFAULT_WALLPAPERS } from '@/store/useWallpaperStore'
import Image from 'next/image'

export function SettingsApp() {
  const { currentWallpaper, sanityWallpapers, setWallpaper } = useWallpaperStore()

  // Combine default and Sanity wallpapers
  const allWallpapers = [
    ...DEFAULT_WALLPAPERS.map((w) => ({
      id: w.key,
      name: w.name,
      url: w.url,
    })),
    ...sanityWallpapers,
  ]

  return (
    <div className="h-full bg-[#1e1e1e] text-white overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#2d2d2d] border-b border-white/10 px-6 py-4 z-10">
        <h1 className="text-xl font-medium">Settings</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Wallpaper Section */}
        <section>
          <h2 className="text-lg font-medium mb-4 text-white/90">Wallpaper</h2>
          <p className="text-white/50 text-sm mb-4">
            Choose a background wallpaper for your desktop
          </p>

          {/* Wallpaper Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allWallpapers.map((wallpaper) => {
              const isSelected = currentWallpaper === wallpaper.url
              return (
                <button
                  key={wallpaper.id}
                  onClick={() => setWallpaper(wallpaper.url)}
                  className={`
                    relative aspect-video rounded-lg overflow-hidden
                    transition-all duration-200
                    ${isSelected
                      ? 'ring-2 ring-[#E95420] ring-offset-2 ring-offset-[#1e1e1e]'
                      : 'hover:ring-2 hover:ring-white/30 hover:ring-offset-2 hover:ring-offset-[#1e1e1e]'
                    }
                  `}
                >
                  <Image
                    src={wallpaper.url}
                    alt={wallpaper.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  {/* Overlay with name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                    <span className="text-xs text-white/90 truncate">
                      {wallpaper.name}
                    </span>
                  </div>
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#E95420] rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* About Section */}
        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-lg font-medium mb-4 text-white/90">About</h2>
          <div className="text-white/50 text-sm space-y-2">
            <p>Ubuntu Portfolio v3.0</p>
            <p>A creative portfolio inspired by Ubuntu Linux</p>
            <p className="text-white/30 text-xs mt-4">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsApp
