'use client'

import { CuratedItem } from './CratesApp'

interface CrateItemCardProps {
  item: CuratedItem
  onClick: () => void
  featured?: boolean
}

// Type icons mapping
const TYPE_ICONS: Record<string, string> = {
  music: '🎵',
  book: '📚',
  link: '🔗',
  tool: '🛠️',
}

// Placeholder colors for items without covers
const PLACEHOLDER_COLORS: Record<string, string> = {
  music: 'from-violet-900 to-indigo-950',
  book: 'from-emerald-900 to-teal-950',
  link: 'from-blue-900 to-cyan-950',
  tool: 'from-orange-900 to-red-950',
}

/**
 * Card component for displaying a curated item
 * Vinyl record-inspired design
 */
export function CrateItemCard({ item, onClick, featured = false }: CrateItemCardProps) {
  const placeholderGradient = PLACEHOLDER_COLORS[item.itemType] || 'from-gray-800 to-gray-900'
  const typeIcon = TYPE_ICONS[item.itemType] || '📦'

  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        w-full
        aspect-square
        rounded-lg
        overflow-hidden
        bg-gradient-to-br ${placeholderGradient}
        border border-amber-900/30
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-xl
        hover:shadow-amber-950/50
        hover:border-amber-700/50
        focus:outline-none
        focus:ring-2
        focus:ring-amber-600/50
        text-left
        ${featured ? 'ring-1 ring-amber-600/30' : ''}
      `}
    >
      {/* Cover Image or Placeholder */}
      {item.coverImage ? (
        <img
          src={item.coverImage}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-30">{typeIcon}</span>
        </div>
      )}

      {/* Vinyl groove effect overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(0,0,0,0.1) 3px, transparent 4px)`,
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-2 right-2 bg-amber-600/90 text-amber-100 text-xs px-2 py-0.5 rounded-full font-medium">
          ★ Featured
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
        {typeIcon} {item.itemType}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
          {item.title}
        </h3>
        {item.creator && (
          <p className="text-xs text-amber-200/70 truncate">
            {item.creator}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 bg-amber-900/40 text-amber-200/70 rounded"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 2 && (
              <span className="text-[10px] text-amber-200/50">
                +{item.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover shine effect */}
      <div
        className="
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
          bg-gradient-to-br from-white/10 via-transparent to-transparent
        "
      />
    </button>
  )
}

export default CrateItemCard
