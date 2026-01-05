'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAudioStore, RadioStream, DEFAULT_STREAMS } from '@/store'
import { useSpinitronPolling } from '@/hooks'
import { getRadioStreams, SanityRadioStream } from '@/lib/sanity'
import { trackPlayer } from '@/lib/analytics'

interface PlayerAppProps {
  className?: string
}

/**
 * Ubuntu-styled Audio Player App
 * GNOME-inspired design with clean, flat aesthetics
 */
export function PlayerApp({ className = '' }: PlayerAppProps) {
  const {
    currentStream,
    availableStreams,
    volume,
    isMuted,
    isPlaying,
    nowPlaying,
    play,
    pause,
    switchStream,
    setVolume,
    toggleMute,
    setLoading,
    isLoading,
    setStreams,
  } = useAudioStore()

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [streamsLoaded, setStreamsLoaded] = useState(false)

  // Fetch streams from Sanity on mount
  useEffect(() => {
    if (streamsLoaded) return

    getRadioStreams()
      .then((sanityStreams) => {
        if (sanityStreams && sanityStreams.length > 0) {
          // Convert Sanity streams to RadioStream format
          const streams: RadioStream[] = sanityStreams.map((s) => ({
            id: s._id,
            name: s.name,
            url: s.streamUrl,
            description: s.description,
            hasSpinnitron: !!s.spinitronStationId,
            spinitronStationId: s.spinitronStationId,
          }))
          setStreams(streams)

          // Set default stream if current is null
          const defaultStream = sanityStreams.find((s) => s.isDefault)
          if (defaultStream && !currentStream) {
            switchStream({
              id: defaultStream._id,
              name: defaultStream.name,
              url: defaultStream.streamUrl,
              description: defaultStream.description,
              hasSpinnitron: !!defaultStream.spinitronStationId,
              spinitronStationId: defaultStream.spinitronStationId,
            })
          }
        }
      })
      .catch(() => {
        // Fallback to default streams
        setStreams(DEFAULT_STREAMS)
      })
      .finally(() => setStreamsLoaded(true))
  }, [streamsLoaded, setStreams, switchStream, currentStream])

  // Initialize Spinitron polling for now playing data
  useSpinitronPolling()

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audio.volume = (isMuted ? 0 : volume) / 100
    audio.preload = 'none'

    audio.addEventListener('playing', () => {
      setLoading(false)
      play()
    })

    audio.addEventListener('pause', () => {
      pause()
    })

    audio.addEventListener('waiting', () => {
      setLoading(true)
    })

    audio.addEventListener('error', (e) => {
      console.warn('Audio error:', e)
      setLoading(false)
      // Reset the audio element on error to allow retry
      audio.load()
    })

    // Handle stream stalls (common with live streams)
    audio.addEventListener('stalled', () => {
      console.warn('Audio stalled, attempting recovery...')
      setLoading(true)
    })

    // Handle when audio can play through
    audio.addEventListener('canplay', () => {
      setLoading(false)
    })

    setAudioElement(audio)

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update audio source when stream changes
  useEffect(() => {
    if (audioElement && currentStream) {
      audioElement.src = currentStream.url
      if (isPlaying) {
        setLoading(true)
        audioElement.play().catch(() => setLoading(false))
      }
    }
  }, [currentStream, audioElement]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update volume
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = (isMuted ? 0 : volume) / 100
    }
  }, [volume, isMuted, audioElement])

  // Handle play/pause
  const handlePlayPause = () => {
    if (!audioElement || !currentStream) return

    if (isPlaying) {
      audioElement.pause()
      trackPlayer('pause', currentStream.name)
    } else {
      setLoading(true)
      // Reload source if needed (helps recover from stalled/error states)
      if (!audioElement.src || audioElement.error) {
        audioElement.src = currentStream.url
      }
      audioElement.play().catch((err) => {
        console.warn('Play failed:', err)
        setLoading(false)
        // Try reloading the source on failure
        audioElement.src = currentStream.url
        audioElement.load()
      })
      trackPlayer('play', currentStream.name)
    }
  }

  // Handle stream selection
  const handleStreamChange = (stream: RadioStream) => {
    if (audioElement) {
      audioElement.pause()
      audioElement.src = ''
    }
    switchStream(stream)
    trackPlayer('stream_selected', stream.name)
  }

  return (
    <div className={`player-app h-full flex flex-col bg-ub-grey ${className}`}>
      {/* Now Playing Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#1e1e1e]">
        {/* Album Art / Visualizer */}
        <div className="w-48 h-48 rounded-xl bg-[#3d3d3d] shadow-lg mb-6 flex items-center justify-center overflow-hidden relative">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-3 border-ub-orange border-t-transparent rounded-full animate-spin" />
              <span className="text-white/50 text-sm">Connecting...</span>
            </div>
          ) : nowPlaying?.artwork ? (
            // Display album artwork from Spinitron
            <>
              <Image
                src={nowPlaying.artwork}
                alt={`${nowPlaying.title} by ${nowPlaying.artist}`}
                fill
                className="object-cover"
                sizes="192px"
                unoptimized // External URLs need this
              />
              {/* Subtle overlay with playing indicator */}
              {isPlaying && (
                <div className="absolute bottom-2 right-2 flex items-end gap-0.5 bg-black/50 rounded px-1.5 py-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-ub-orange rounded-t animate-pulse"
                      style={{
                        height: `${8 + i * 4}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : isPlaying ? (
            <div className="flex items-end justify-center gap-1 h-24">
              {[...Array(5)].map((_, i) => {
                // Use deterministic values based on index to avoid hydration mismatch
                const heights = [45, 70, 55, 80, 60]
                const durations = [0.6, 0.8, 0.7, 0.9, 0.75]
                return (
                  <div
                    key={i}
                    className="w-3 bg-ub-orange rounded-t animate-pulse"
                    style={{
                      height: `${heights[i]}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${durations[i]}s`,
                    }}
                  />
                )
              })}
            </div>
          ) : (
            <svg className="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          )}
        </div>

        {/* Track Info */}
        <div className="text-center mb-6 w-full max-w-xs">
          {nowPlaying ? (
            <>
              <div className="text-lg font-medium text-white truncate">{nowPlaying.title}</div>
              <div className="text-sm text-white/60 truncate">{nowPlaying.artist}</div>
              {nowPlaying.album && (
                <div className="text-xs text-white/40 truncate mt-1">{nowPlaying.album}</div>
              )}
            </>
          ) : (
            <>
              <div className="text-lg font-medium text-white truncate">
                {currentStream?.name || 'No Station Selected'}
              </div>
              <div className="text-sm text-white/60 truncate">
                {currentStream?.description || 'Select a station below'}
              </div>
            </>
          )}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-4 mb-6">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            disabled={!currentStream || isLoading}
            className="w-14 h-14 rounded-full bg-ub-orange hover:bg-orange-500 disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <button
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : volume < 50 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-3
                       [&::-webkit-slider-thumb]:h-3
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-ub-orange
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-md"
            aria-label="Volume"
          />
          <span className="text-white/40 text-xs w-8 text-right">{isMuted ? 0 : volume}%</span>
        </div>
      </div>

      {/* Station List */}
      <div className="bg-[#2d2d2d] border-t border-white/10">
        <div className="px-4 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
          Stations
        </div>
        <div className="max-h-48 overflow-y-auto">
          {availableStreams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => handleStreamChange(stream)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                currentStream?.id === stream.id
                  ? 'bg-ub-orange/20 border-l-2 border-ub-orange'
                  : 'hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              {/* Radio icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                currentStream?.id === stream.id ? 'bg-ub-orange' : 'bg-white/10'
              }`}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  currentStream?.id === stream.id ? 'text-ub-orange' : 'text-white'
                }`}>
                  {stream.name}
                </div>
                <div className="text-xs text-white/50 truncate">{stream.description}</div>
              </div>
              {currentStream?.id === stream.id && isPlaying && (
                <div className="flex items-end gap-0.5 h-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-ub-orange rounded-t animate-pulse"
                      style={{
                        height: `${40 + i * 20}%`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayerApp
