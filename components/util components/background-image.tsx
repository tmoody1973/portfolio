import React from 'react'

type WallpaperKey = 'wall-1' | 'wall-2' | 'wall-3' | 'wall-4' | 'wall-5' | 'wall-6' | 'wall-7' | 'wall-8'

interface BackgroundImageProps {
  img: WallpaperKey
}

const bg_images: Record<WallpaperKey, string> = {
  'wall-1': './images/wallpapers/wall-1.webp',
  'wall-2': './images/wallpapers/wall-2.webp',
  'wall-3': './images/wallpapers/wall-3.webp',
  'wall-4': './images/wallpapers/wall-4.webp',
  'wall-5': './images/wallpapers/wall-5.webp',
  'wall-6': './images/wallpapers/wall-6.webp',
  'wall-7': './images/wallpapers/wall-7.webp',
  'wall-8': './images/wallpapers/wall-8.webp',
}

export default function BackgroundImage({ img }: BackgroundImageProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${bg_images[img]})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center'
      }}
      className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full"
    />
  )
}
