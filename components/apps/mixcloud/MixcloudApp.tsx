'use client'

import { useState, useEffect } from 'react'

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
  username?: string // Default to Rhythm Lab Radio's username
}

/**
 * Mixcloud App for browsing Rhythm Lab Radio shows
 * Fetches and displays past radio shows with embedded player
 */
export function MixcloudApp({ className = '', username = 'RhythmLabRadio' }: MixcloudAppProps) {
  const [shows, setShows] = useState<MixcloudShow[]>([])
  const [selectedShow, setSelectedShow] = useState<MixcloudShow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch shows from our API proxy (to bypass CORS)
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          `/api/mixcloud?username=${username}&limit=20`
        )
        if (!response.ok) throw new Error('Failed to fetch shows')
        const data = await response.json()
        setShows(data.data || [])
      } catch (err) {
        setError('Unable to load shows. Please try again later.')
        console.error('Mixcloud fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [username])

  // Format duration
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get embed URL for a show
  const getEmbedUrl = (show: MixcloudShow) => {
    const feedPath = encodeURIComponent(show.key)
    return `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${feedPath}`
  }

  return (
    <div className={`mixcloud-app h-full flex flex-col bg-gradient-to-br from-[#1a1625] to-[#0d0a12] ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Rhythm Lab Radio</h1>
            <p className="text-xs text-purple-300/60">Past Shows on Mixcloud</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Show List */}
        <div className="w-80 border-r border-purple-900/30 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-pulse text-purple-300/50">Loading shows...</div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-400">{error}</div>
          ) : (
            <div className="divide-y divide-purple-900/20">
              {shows.map((show) => (
                <button
                  key={show.key}
                  onClick={() => setSelectedShow(show)}
                  className={`w-full text-left p-3 flex gap-3 transition-colors ${
                    selectedShow?.key === show.key
                      ? 'bg-purple-900/40'
                      : 'hover:bg-purple-900/20'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-purple-900/30">
                    {show.pictures?.medium ? (
                      <img
                        src={show.pictures.medium}
                        alt={show.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-purple-500/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">{show.name}</h3>
                    <p className="text-xs text-purple-300/60 mt-1">
                      {formatDate(show.created_time)}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-purple-400/50">
                      <span>{formatDuration(show.audio_length)}</span>
                      <span>{show.play_count?.toLocaleString() || 0} plays</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Player / Detail View */}
        <div className="flex-1 flex flex-col">
          {selectedShow ? (
            <>
              {/* Show Details */}
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Large Cover */}
                  <div className="w-48 h-48 rounded-xl overflow-hidden bg-purple-900/30 flex-shrink-0 shadow-xl">
                    {selectedShow.pictures?.extra_large ? (
                      <img
                        src={selectedShow.pictures.extra_large}
                        alt={selectedShow.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-20 h-20 text-purple-500/30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedShow.name}</h2>
                    <p className="text-purple-300/70 mb-4">{formatDate(selectedShow.created_time)}</p>
                    <div className="flex items-center gap-4 text-sm text-purple-400/60 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {formatDuration(selectedShow.audio_length)}
                      </span>
                      <span>{selectedShow.play_count?.toLocaleString() || 0} plays</span>
                      <span>{selectedShow.favorite_count?.toLocaleString() || 0} favorites</span>
                    </div>
                    {/* Tags */}
                    {selectedShow.tags && selectedShow.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedShow.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag.name}
                            className="px-2 py-1 bg-purple-900/40 text-purple-300/70 text-xs rounded"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* External link */}
                    <a
                      href={selectedShow.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Open in Mixcloud
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Player */}
              <div className="flex-1 p-6 pt-0">
                <div className="bg-purple-900/20 rounded-xl overflow-hidden border border-purple-800/30 h-32">
                  <iframe
                    src={getEmbedUrl(selectedShow)}
                    title={selectedShow.name}
                    className="w-full h-full"
                    allow="autoplay"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="w-24 h-24 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-purple-500/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Select a Show</h3>
              <p className="text-purple-300/50 text-sm max-w-xs">
                Choose a show from the list to listen to past episodes of Rhythm Lab Radio
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MixcloudApp
