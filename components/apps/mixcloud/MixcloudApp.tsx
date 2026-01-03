'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface MixcloudShow {
  key: string
  name: string
  url: string
  pictures: {
    medium: string
    large: string
    extra_large: string
  }
  created_time: string
  audio_length: number
  play_count: number
  favorite_count: number
  tags: { name: string; url: string }[]
}

interface MixcloudAppProps {
  className?: string
  username?: string
}

/**
 * Mixcloud App for browsing Rhythm Lab Radio shows
 * Redesigned with player-first UX
 */
export function MixcloudApp({ className = '', username = 'rhythmlab' }: MixcloudAppProps) {
  const [shows, setShows] = useState<MixcloudShow[]>([])
  const [selectedShow, setSelectedShow] = useState<MixcloudShow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`/api/mixcloud?username=${username}&limit=20`)
        if (!response.ok) throw new Error('Failed to fetch shows')
        const data = await response.json()
        const showList = data.data || []
        setShows(showList)
        // Auto-select first show
        if (showList.length > 0) {
          setSelectedShow(showList[0])
        }
      } catch (err) {
        setError('Unable to load shows. Please try again later.')
        console.error('Mixcloud fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchShows()
  }, [username])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getEmbedUrl = (show: MixcloudShow) => {
    const feedPath = encodeURIComponent(show.key)
    return `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=${feedPath}`
  }

  return (
    <div className={`mixcloud-app h-full flex flex-col bg-[#0d0a12] ${className}`}>
      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: Show List */}
        <div className="w-72 bg-[#13101a] border-r border-white/5 flex flex-col">
          {/* List Header */}
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-white/90">Past Episodes</h2>
            <p className="text-xs text-white/40 mt-0.5">{shows.length} shows</p>
          </div>

          {/* Show List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-white/40 text-sm">Loading shows...</p>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-400 text-sm">{error}</div>
            ) : (
              <div className="py-1">
                {shows.map((show) => {
                  const isSelected = selectedShow?.key === show.key
                  return (
                    <button
                      key={show.key}
                      onClick={() => setSelectedShow(show)}
                      className={`w-full text-left px-3 py-2.5 flex gap-3 transition-all ${
                        isSelected
                          ? 'bg-purple-600/20 border-l-2 border-purple-500'
                          : 'hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-white/5">
                        {show.pictures?.medium ? (
                          <img
                            src={show.pictures.medium}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {show.name}
                        </h3>
                        <p className="text-xs text-white/40 mt-0.5">{formatDate(show.created_time)}</p>
                        <p className="text-xs text-white/30 mt-0.5">{formatDuration(show.audio_length)}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Player & Details */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedShow ? (
            <>
              {/* Now Playing Header */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/15 p-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  {/* Cover Art */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-xl ring-1 ring-white/10">
                    {selectedShow.pictures?.large ? (
                      <img
                        src={selectedShow.pictures.large}
                        alt={selectedShow.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-900/50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Show Info */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1">Now Playing</p>
                    <h1 className="text-base font-semibold text-white leading-snug truncate" title={selectedShow.name}>
                      {selectedShow.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-white/50">
                      <span>{formatDate(selectedShow.created_time)}</span>
                      <span className="text-white/20">•</span>
                      <span>{formatDuration(selectedShow.audio_length)}</span>
                      <span className="text-white/20">•</span>
                      <span>{selectedShow.play_count?.toLocaleString() || 0} plays</span>
                    </div>
                  </div>

                  {/* External Link */}
                  <a
                    href={selectedShow.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title="Open in Mixcloud"
                  >
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Mixcloud Player - PROMINENT */}
              <div className="p-5 bg-[#0a0812]">
                <div className="rounded-xl overflow-hidden bg-black/50 ring-1 ring-white/5">
                  <iframe
                    src={getEmbedUrl(selectedShow)}
                    title={selectedShow.name}
                    className="w-full h-[120px]"
                    allow="autoplay"
                  />
                </div>
              </div>

              {/* Tags Section */}
              {selectedShow.tags && selectedShow.tags.length > 0 && (
                <div className="px-5 pb-5">
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedShow.tags.slice(0, 8).map((tag) => (
                      <span
                        key={tag.name}
                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/60 text-xs rounded-full transition-colors cursor-default"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Rhythm Lab Branding */}
              <div className="p-5 border-t border-white/5 bg-[#0a0812]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-900/30">
                      <Image
                        src="/themes/Yaru/apps/rlr-logo.svg"
                        alt="Rhythm Lab Radio"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">Rhythm Lab Radio</p>
                      <p className="text-xs text-white/40">Curated sounds & conversations</p>
                    </div>
                  </div>
                  <a
                    href={`https://mixcloud.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View all on Mixcloud →
                  </a>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-900/40 to-pink-900/40 flex items-center justify-center mb-5">
                <svg className="w-10 h-10 text-purple-400/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Select an Episode</h3>
              <p className="text-white/40 text-sm max-w-xs">
                Choose a show from the list to start listening
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MixcloudApp
