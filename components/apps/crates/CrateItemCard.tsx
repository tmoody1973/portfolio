'use client'

import { CuratedItem } from './CratesApp'

interface CrateItemCardProps {
  item: CuratedItem
  onClick: () => void
  featured?: boolean
}

// Type icons and colors
const TYPE_CONFIG: Record<string, { icon: string; gradient: string; accent: string }> = {
  music: {
    icon: '♫',
    gradient: 'from-violet-600/20 to-indigo-800/40',
    accent: 'bg-violet-500',
  },
  book: {
    icon: '📖',
    gradient: 'from-emerald-600/20 to-teal-800/40',
    accent: 'bg-emerald-500',
  },
  link: {
    icon: '🔗',
    gradient: 'from-blue-600/20 to-cyan-800/40',
    accent: 'bg-blue-500',
  },
  tool: {
    icon: '⚙️',
    gradient: 'from-orange-600/20 to-amber-800/40',
    accent: 'bg-orange-500',
  },
}

/**
 * CrateItemCard - Modern, accessible card for curated items
 * Following WCAG 2.1 AA guidelines with clean visual hierarchy
 */
export function CrateItemCard({ item, onClick, featured = false }: CrateItemCardProps) {
  const config = TYPE_CONFIG[item.itemType] || TYPE_CONFIG.link

  return (
    <button
      onClick={onClick}
      aria-label={`View ${item.title}${item.creator ? ` by ${item.creator}` : ''}`}
      className={`
        group relative w-full rounded-xl overflow-hidden
        bg-[#1a1a1a] border border-white/5
        transition-all duration-200 ease-out
        hover:bg-[#222] hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]
        text-left
        ${featured ? 'ring-1 ring-orange-500/30' : ''}
      `}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // Placeholder with icon
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${config.gradient}`}>
            <span className="text-4xl opacity-40" aria-hidden="true">{config.icon}</span>
          </div>
        )}

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />

        {/* Featured indicator - subtle corner accent */}
        {featured && (
          <div className="absolute top-3 right-3" aria-label="Featured item">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
          </div>
        )}

        {/* Type indicator - small accent bar */}
        <div className={`absolute top-0 left-0 w-1 h-full ${config.accent}`} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-medium text-white/90 line-clamp-2 leading-tight group-hover:text-white transition-colors">
          {item.title}
        </h3>

        {/* Creator */}
        {item.creator && (
          <p className="text-xs text-white/50 truncate">
            {item.creator}
          </p>
        )}

        {/* Tags - clean pill design */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 font-medium"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="text-[11px] text-white/30 px-1">
                +{item.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      />
    </button>
  )
}

export default CrateItemCard
