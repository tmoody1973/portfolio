'use client'

interface BioSectionProps {
  className?: string
}

/**
 * Bio section for the About app
 * Displays personal introduction and background
 */
export function BioSection({ className = '' }: BioSectionProps) {
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

      {/* Bio content */}
      <div className="space-y-3 text-white/80 text-sm leading-relaxed">
        <p>
          I&apos;m a creative technologist and radio curator based in Milwaukee. As the creator of
          Rhythm Lab Radio, I&apos;ve spent over two decades exploring the intersection of music,
          technology, and community.
        </p>
        <p>
          My work bridges the gap between traditional broadcasting and emerging digital platforms,
          always with an eye toward how technology can amplify human connection and cultural expression.
        </p>
        <p>
          When I&apos;m not building digital experiences or curating playlists, you&apos;ll find me
          digging through record crates, exploring new sounds, and connecting with music communities
          around the world.
        </p>
      </div>

      {/* Quick links */}
      <div className="pt-2 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">Radio</span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">Technology</span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">Music Curation</span>
        <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">Community</span>
      </div>
    </div>
  )
}

export default BioSection
