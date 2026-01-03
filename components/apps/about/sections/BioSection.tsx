'use client'

import { useEffect, useState } from 'react'
import { getBioSection, AboutSection } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

interface BioSectionProps {
  className?: string
}

/**
 * Bio section for the About app
 * Displays personal introduction and background
 * Content is fetched from Sanity CMS
 */
export function BioSection({ className = '' }: BioSectionProps) {
  const [bio, setBio] = useState<AboutSection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBioSection()
      .then((data) => {
        setBio(data)
      })
      .catch(() => {
        setBio(null)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className={`bio-section space-y-4 ${className}`}>
        <div className="animate-pulse text-white/50">Loading bio...</div>
      </div>
    )
  }

  return (
    <div className={`bio-section space-y-4 ${className}`}>
      {/* Profile header */}
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ub-orange to-orange-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          TM
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Tarik Moody</h2>
          <p className="text-white/60 text-sm">Director of Strategy & Innovation</p>
          <p className="text-white/40 text-sm">88Nine Radio Milwaukee</p>
        </div>
      </div>

      {/* Bio content from Sanity */}
      <div className="space-y-3 text-white/80 text-sm leading-relaxed bio-content">
        {bio?.content ? (
          <PortableText value={bio.content} />
        ) : (
          <p>Bio content loading...</p>
        )}
      </div>

      {/* Quick links */}
      <div className="pt-2 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">Radio</span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">Innovation</span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">HYFIN</span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">88Nine Labs</span>
      </div>
    </div>
  )
}

export default BioSection
