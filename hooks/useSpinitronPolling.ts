'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useAudioStore, NowPlaying } from '@/store'

/**
 * Extended NowPlaying with Spinitron-specific fields
 */
export interface SpinitronNowPlaying extends NowPlaying {
  label?: string
  genre?: string
  isLocal?: boolean
  isNew?: boolean
  spinId?: number
}

/**
 * API response shape
 */
interface SpinitronApiResponse {
  nowPlaying: SpinitronNowPlaying | null
  error?: string
}

/**
 * Polling interval in milliseconds
 * Spinitron has a 30-second cache, so polling every 20 seconds is reasonable
 */
const POLLING_INTERVAL = 20000

/**
 * useSpinitronPolling - Hook to poll Spinitron API for now playing data
 *
 * Automatically starts/stops polling based on:
 * - Whether the current stream has Spinitron enabled
 * - Whether audio is currently playing
 *
 * Updates the audio store with now playing metadata when available
 */
export function useSpinitronPolling() {
  const {
    currentStream,
    isPlaying,
    updateNowPlaying,
    addRecentTrack,
  } = useAudioStore()

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastSpinIdRef = useRef<number | null>(null)

  /**
   * Fetch now playing data from our API proxy
   */
  const fetchNowPlaying = useCallback(async () => {
    if (!currentStream?.hasSpinnitron) return

    try {
      const response = await fetch(`/api/spinitron?station=${currentStream.id}`)

      if (!response.ok) {
        console.warn(`Spinitron fetch failed: ${response.status}`)
        return
      }

      const data: SpinitronApiResponse = await response.json()

      if (data.nowPlaying) {
        // Check if this is a new spin (different from last one)
        const isNewSpin = data.nowPlaying.spinId !== lastSpinIdRef.current

        if (isNewSpin && lastSpinIdRef.current !== null) {
          // Add the previous track to recent history
          const prevNowPlaying = useAudioStore.getState().nowPlaying
          if (prevNowPlaying) {
            addRecentTrack({
              id: `spin-${lastSpinIdRef.current}`,
              artist: prevNowPlaying.artist,
              title: prevNowPlaying.title,
              playedAt: prevNowPlaying.timestamp || Date.now(),
            })
          }
        }

        lastSpinIdRef.current = data.nowPlaying.spinId || null

        // Update the store with now playing info
        updateNowPlaying({
          artist: data.nowPlaying.artist,
          title: data.nowPlaying.title,
          album: data.nowPlaying.album,
          artwork: data.nowPlaying.artwork,
          timestamp: data.nowPlaying.timestamp,
        })
      }
    } catch (error) {
      console.error('Error fetching Spinitron data:', error)
    }
  }, [currentStream, updateNowPlaying, addRecentTrack])

  /**
   * Start/stop polling based on playing state and stream config
   */
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Only poll if playing and stream has Spinitron
    if (!isPlaying || !currentStream?.hasSpinnitron) {
      // Clear now playing if not applicable
      if (!currentStream?.hasSpinnitron) {
        updateNowPlaying(null)
        lastSpinIdRef.current = null
      }
      return
    }

    // Fetch immediately
    fetchNowPlaying()

    // Then poll at interval
    intervalRef.current = setInterval(fetchNowPlaying, POLLING_INTERVAL)

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPlaying, currentStream, fetchNowPlaying, updateNowPlaying])

  /**
   * Reset when stream changes
   */
  useEffect(() => {
    lastSpinIdRef.current = null
  }, [currentStream?.id])

  return {
    fetchNowPlaying,
  }
}

export default useSpinitronPolling
