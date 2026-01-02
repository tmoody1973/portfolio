'use client'

import React, { useState, useEffect } from 'react'
import { useAudioStore, RadioStream, DEFAULT_STREAMS } from '@/store'

interface PlayerAppProps {
  className?: string
}

/**
 * Simple Audio Player App
 * A custom player UI (Webamp has compatibility issues with React 19)
 * Features: Stream selection, play/pause, volume, now playing display
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
  } = useAudioStore()

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audio.volume = (isMuted ? 0 : volume) / 100

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
      console.error('Audio error:', e)
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
        audioElement.play().catch(console.error)
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
    } else {
      setLoading(true)
      audioElement.play().catch(console.error)
    }
  }

  // Handle stream selection
  const handleStreamChange = (stream: RadioStream) => {
    if (audioElement) {
      audioElement.pause()
    }
    switchStream(stream)
  }

  return (
    <div className={`player-app h-full flex flex-col bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <span className="text-2xl">📻</span>
          Rhythm Lab Radio
        </h2>
      </div>

      {/* Now Playing */}
      <div className="p-6 flex-1 flex flex-col items-center justify-center">
        {/* Album art placeholder */}
        <div className="w-40 h-40 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg shadow-xl mb-6 flex items-center justify-center">
          <span className="text-6xl">🎵</span>
        </div>

        {/* Track info */}
        <div className="text-center mb-6">
          {nowPlaying ? (
            <>
              <div className="text-xl font-medium">{nowPlaying.title}</div>
              <div className="text-white/60">{nowPlaying.artist}</div>
            </>
          ) : (
            <>
              <div className="text-xl font-medium">{currentStream?.name || 'No Stream'}</div>
              <div className="text-white/60">{currentStream?.description || 'Select a station'}</div>
            </>
          )}
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-6 mb-8">
          {/* Previous (disabled) */}
          <button className="text-white/30 cursor-not-allowed" disabled>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            disabled={!currentStream}
            className="w-16 h-16 bg-orange-500 hover:bg-orange-400 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next (disabled) */}
          <button className="text-white/30 cursor-not-allowed" disabled>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-3 w-48">
          <button onClick={toggleMute} className="text-white/60 hover:text-white">
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
            className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>

      {/* Station selector */}
      <div className="p-4 border-t border-white/10">
        <div className="text-sm text-white/60 mb-2">Stations</div>
        <div className="space-y-1">
          {availableStreams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => handleStreamChange(stream)}
              className={`w-full text-left px-3 py-2 rounded transition-colors ${
                currentStream?.id === stream.id
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <div className="font-medium">{stream.name}</div>
              <div className="text-xs text-white/50">{stream.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayerApp
