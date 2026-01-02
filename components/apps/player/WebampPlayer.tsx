'use client'

import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useAudioStore, RadioStream } from '@/store'

// Webamp type declaration
declare global {
  interface Window {
    Webamp?: typeof import('webamp').default
  }
}

interface WebampPlayerProps {
  className?: string
}

/**
 * Webamp Player Component
 * Wraps the Webamp library for use in React
 * Handles initialization, playback, and stream switching
 */
export function WebampPlayer({ className = '' }: WebampPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const webampRef = useRef<InstanceType<typeof import('webamp').default> | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    currentStream,
    volume,
    isMuted,
    isPlaying,
    play,
    pause,
    setLoading,
    setWebampReady,
    setVolume,
  } = useAudioStore()

  // Initialize Webamp
  const initWebamp = useCallback(async () => {
    if (!containerRef.current || webampRef.current) return

    try {
      setLoading(true)
      setError(null)

      // Dynamically import Webamp
      const WebampModule = await import('webamp')
      const Webamp = WebampModule.default

      // Check browser support
      if (!Webamp.browserIsSupported()) {
        setError('Your browser does not support Webamp')
        setLoading(false)
        return
      }

      // Create Webamp instance
      const webamp = new Webamp({
        initialTracks: currentStream
          ? [
              {
                metaData: {
                  artist: currentStream.name,
                  title: currentStream.description || 'Live Stream',
                },
                url: currentStream.url,
              },
            ]
          : [],
        initialSkin: {
          url: '/skins/webamp-skin.wsz',
        },
      })

      // Set initial volume
      webamp.setVolume(isMuted ? 0 : volume)

      // Render to container
      await webamp.renderWhenReady(containerRef.current)

      webampRef.current = webamp
      setIsInitialized(true)
      setWebampReady(true)
      setLoading(false)

      // Listen for play/pause events
      webamp.onPlay(() => {
        play()
      })

      webamp.onPause(() => {
        pause()
      })
    } catch (err) {
      console.error('Failed to initialize Webamp:', err)
      setError('Failed to initialize audio player')
      setLoading(false)
    }
  }, [currentStream, volume, isMuted, play, pause, setLoading, setWebampReady])

  // Initialize on mount
  useEffect(() => {
    initWebamp()

    return () => {
      // Cleanup Webamp instance
      if (webampRef.current) {
        webampRef.current.dispose()
        webampRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update volume when store changes
  useEffect(() => {
    if (webampRef.current && isInitialized) {
      webampRef.current.setVolume(isMuted ? 0 : volume)
    }
  }, [volume, isMuted, isInitialized])

  // Handle stream changes
  useEffect(() => {
    if (webampRef.current && isInitialized && currentStream) {
      webampRef.current.setTracksToPlay([
        {
          metaData: {
            artist: currentStream.name,
            title: currentStream.description || 'Live Stream',
          },
          url: currentStream.url,
        },
      ])
    }
  }, [currentStream, isInitialized])

  if (error) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-red-400 text-center p-4">
          <div className="text-lg mb-2">Audio Player Error</div>
          <div className="text-sm text-white/60">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`webamp-container relative ${className}`}
      style={{ minHeight: '300px' }}
    />
  )
}

export default WebampPlayer
