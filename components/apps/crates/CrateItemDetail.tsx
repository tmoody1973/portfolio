'use client'

import { CuratedItem } from './CratesApp'

interface CrateItemDetailProps {
  item: CuratedItem
  onBack: () => void
}

interface MediaEmbedProps {
  embedType?: string
  embedUrl: string
  title: string
  bandcampAlbumId?: string
  bandcampTrackId?: string
}

/**
 * Renders embedded media players for YouTube, Bandcamp, Spotify, SoundCloud
 */
function MediaEmbed({ embedType, embedUrl, title, bandcampAlbumId, bandcampTrackId }: MediaEmbedProps) {
  // Extract video/track IDs and build embed URLs
  const getEmbedSrc = (): string | null => {
    if (!embedUrl && !bandcampAlbumId) return null

    switch (embedType) {
      case 'youtube': {
        // Handle various YouTube URL formats
        const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
        const match = embedUrl.match(youtubeRegex)
        if (match) {
          return `https://www.youtube.com/embed/${match[1]}`
        }
        return null
      }
      case 'spotify': {
        // Handle Spotify URLs - convert to embed format
        // https://open.spotify.com/album/xxx -> https://open.spotify.com/embed/album/xxx
        if (embedUrl.includes('open.spotify.com')) {
          return embedUrl.replace('open.spotify.com/', 'open.spotify.com/embed/')
        }
        return null
      }
      case 'bandcamp': {
        // Use bandcampAlbumId if provided for proper embed
        if (bandcampAlbumId) {
          const trackParam = bandcampTrackId ? `/track=${bandcampTrackId}` : ''
          return `https://bandcamp.com/EmbeddedPlayer/album=${bandcampAlbumId}${trackParam}/size=large/bgcol=1a1612/linkcol=e69500/tracklist=true/artwork=small/transparent=true/`
        }
        return null
      }
      case 'soundcloud': {
        // SoundCloud uses their widget API
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(embedUrl)}&color=%23e69500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
      }
      case 'mixcloud': {
        // Mixcloud widget - extract the path from URL
        // https://www.mixcloud.com/RhythmLabRadio/show-name/ -> /RhythmLabRadio/show-name/
        const mixcloudMatch = embedUrl.match(/mixcloud\.com(\/[^?]+)/)
        if (mixcloudMatch) {
          const feedPath = encodeURIComponent(mixcloudMatch[1])
          return `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${feedPath}`
        }
        return null
      }
      default:
        return null
    }
  }

  const embedSrc = getEmbedSrc()

  // YouTube embed
  if (embedType === 'youtube' && embedSrc) {
    return (
      <div className="bg-amber-950/30 rounded-xl overflow-hidden border border-amber-900/30">
        <div className="aspect-video">
          <iframe
            src={embedSrc}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  // Spotify embed
  if (embedType === 'spotify' && embedSrc) {
    return (
      <div className="bg-amber-950/30 rounded-xl overflow-hidden border border-amber-900/30">
        <iframe
          src={embedSrc}
          title={title}
          className="w-full"
          style={{ height: '352px' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    )
  }

  // SoundCloud embed
  if (embedType === 'soundcloud' && embedSrc) {
    return (
      <div className="bg-amber-950/30 rounded-xl overflow-hidden border border-amber-900/30">
        <iframe
          src={embedSrc}
          title={title}
          className="w-full"
          style={{ height: '166px' }}
          allow="autoplay"
          scrolling="no"
        />
      </div>
    )
  }

  // Mixcloud embed
  if (embedType === 'mixcloud' && embedSrc) {
    return (
      <div className="bg-amber-950/30 rounded-xl overflow-hidden border border-amber-900/30">
        <iframe
          src={embedSrc}
          title={title}
          className="w-full"
          style={{ height: '120px' }}
          allow="autoplay"
        />
      </div>
    )
  }

  // Bandcamp embed - responsive iframe
  if (embedType === 'bandcamp' && embedSrc) {
    return (
      <div className="bg-amber-950/30 rounded-xl overflow-hidden border border-amber-900/30">
        <iframe
          src={embedSrc}
          title={title}
          className="w-full"
          style={{ height: '470px', border: 0 }}
          seamless
          loading="lazy"
        />
      </div>
    )
  }

  // Bandcamp fallback - show a styled link when no album ID provided
  if (embedType === 'bandcamp' && embedUrl && !embedSrc) {
    return (
      <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-900/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#1da0c3] rounded flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-amber-200/70 text-sm mb-1">Listen on Bandcamp</p>
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              Open in Bandcamp →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return null
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
 * Detailed view of a curated item
 * Shows full info, curator notes, and embed/links
 */
export function CrateItemDetail({ item, onBack }: CrateItemDetailProps) {
  const placeholderGradient = PLACEHOLDER_COLORS[item.itemType] || 'from-gray-800 to-gray-900'
  const typeIcon = TYPE_ICONS[item.itemType] || '📦'

  // Get the primary action URL
  const actionUrl =
    item.embedUrl || item.purchaseUrl || item.url || item.substackUrl

  // Get the action label
  const getActionLabel = () => {
    switch (item.itemType) {
      case 'music':
        return item.embedType ? `Listen on ${item.embedType.charAt(0).toUpperCase() + item.embedType.slice(1)}` : 'Listen'
      case 'book':
        return 'Get the Book'
      case 'link':
        return 'Visit Link'
      case 'tool':
        return 'Try It'
      default:
        return 'Open'
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Cover */}
        <div className={`
          w-full md:w-64 aspect-square flex-shrink-0
          rounded-xl overflow-hidden
          bg-gradient-to-br ${placeholderGradient}
          shadow-2xl shadow-black/50
          relative
        `}>
          {item.coverImage ? (
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-30">{typeIcon}</span>
            </div>
          )}

          {/* Vinyl groove effect */}
          {item.itemType === 'music' && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `repeating-radial-gradient(circle at center, transparent 0px, transparent 3px, rgba(255,255,255,0.1) 4px, transparent 5px)`,
              }}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          {/* Type & Featured badges */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-900/40 text-amber-200 text-sm rounded-full">
              {typeIcon} {item.itemType.charAt(0).toUpperCase() + item.itemType.slice(1)}
            </span>
            {item.featured && (
              <span className="px-3 py-1 bg-amber-600 text-amber-100 text-sm rounded-full">
                ★ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-amber-100 mb-2">
            {item.title}
          </h1>

          {/* Creator */}
          {item.creator && (
            <p className="text-lg text-amber-200/70 mb-4">
              by {item.creator}
            </p>
          )}

          {/* Genre (for music) */}
          {item.genre && (
            <p className="text-sm text-amber-200/50 mb-4">
              Genre: {item.genre}
            </p>
          )}

          {/* Description (for links/tools) */}
          {item.description && (
            <p className="text-amber-200/70 mb-4">
              {item.description}
            </p>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-amber-950/50 text-amber-200/70 rounded-full border border-amber-900/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {actionUrl && (
              <a
                href={actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  bg-amber-700 hover:bg-amber-600
                  text-amber-100
                  font-medium
                  rounded-lg
                  transition-colors
                  shadow-lg shadow-amber-900/30
                "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {getActionLabel()}
              </a>
            )}

            {item.substackUrl && item.substackUrl !== actionUrl && (
              <a
                href={item.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  bg-amber-900/40 hover:bg-amber-900/60
                  text-amber-200
                  font-medium
                  rounded-lg
                  transition-colors
                  border border-amber-800/40
                "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Read My Review
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Media Embed Section */}
      {item.itemType === 'music' && (item.embedUrl || item.bandcampAlbumId) && (
        <div className="mb-8">
          <MediaEmbed
            embedType={item.embedType}
            embedUrl={item.embedUrl || ''}
            title={item.title}
            bandcampAlbumId={item.bandcampAlbumId}
            bandcampTrackId={item.bandcampTrackId}
          />
        </div>
      )}

      {/* Curator Notes Section */}
      {item.curatorNotes && (
        <div className="bg-amber-950/30 rounded-xl p-6 border border-amber-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-800/50 flex items-center justify-center">
              <span className="text-lg">💭</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-amber-100">Curator Notes</h2>
              <p className="text-xs text-amber-200/50">Why I picked this</p>
            </div>
          </div>
          <blockquote className="text-amber-200/80 leading-relaxed pl-4 border-l-2 border-amber-700/50 italic">
            {item.curatorNotes}
          </blockquote>
        </div>
      )}

      {/* Additional Info */}
      {(item.isbn || item.category) && (
        <div className="mt-6 pt-6 border-t border-amber-900/30">
          <h3 className="text-sm font-semibold text-amber-200/50 uppercase tracking-wider mb-3">
            Details
          </h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {item.isbn && (
              <>
                <dt className="text-amber-200/50">ISBN</dt>
                <dd className="text-amber-200">{item.isbn}</dd>
              </>
            )}
            {item.category && (
              <>
                <dt className="text-amber-200/50">Category</dt>
                <dd className="text-amber-200 capitalize">{item.category}</dd>
              </>
            )}
          </dl>
        </div>
      )}
    </div>
  )
}

export default CrateItemDetail
