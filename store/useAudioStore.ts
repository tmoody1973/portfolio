import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Radio stream configuration
 */
export interface RadioStream {
  id: string
  name: string
  url: string
  description?: string
  hasSpinnitron?: boolean
}

/**
 * Now playing track info
 */
export interface NowPlaying {
  artist: string
  title: string
  album?: string
  artwork?: string
  timestamp?: number
}

/**
 * Recent track entry
 */
export interface RecentTrack {
  id: string
  artist: string
  title: string
  playedAt: number
}

/**
 * Mixcloud episode info
 */
export interface MixcloudEpisode {
  id: string
  title: string
  url: string
  date: string
  duration: number
  thumbnail?: string
}

/**
 * Audio player state
 */
export interface AudioState {
  // Playback state
  isPlaying: boolean
  isPaused: boolean
  isLoading: boolean

  // Current stream
  currentStream: RadioStream | null
  availableStreams: RadioStream[]

  // Volume (0-100)
  volume: number
  isMuted: boolean
  previousVolume: number

  // Now playing
  nowPlaying: NowPlaying | null
  recentTracks: RecentTrack[]

  // Mixcloud archives
  mixcloudEpisodes: MixcloudEpisode[]

  // Webamp instance reference (stored outside of state)
  webampReady: boolean
}

/**
 * Audio player actions
 */
export interface AudioActions {
  // Playback controls
  play: () => void
  pause: () => void
  stop: () => void
  setLoading: (loading: boolean) => void

  // Stream management
  switchStream: (stream: RadioStream) => void
  setStreams: (streams: RadioStream[]) => void

  // Volume controls
  setVolume: (volume: number) => void
  mute: () => void
  unmute: () => void
  toggleMute: () => void

  // Now playing
  updateNowPlaying: (info: NowPlaying | null) => void
  addRecentTrack: (track: RecentTrack) => void
  setRecentTracks: (tracks: RecentTrack[]) => void

  // Mixcloud
  setMixcloudEpisodes: (episodes: MixcloudEpisode[]) => void

  // Webamp
  setWebampReady: (ready: boolean) => void

  // Reset
  reset: () => void
}

// Default streams
export const DEFAULT_STREAMS: RadioStream[] = [
  {
    id: 'rhythm-lab',
    name: 'Rhythm Lab 24/7',
    url: 'https://wyms.streamguys1.com/rhythmLabRadio',
    description: 'Global sounds, always on',
    hasSpinnitron: true,
  },
  {
    id: '88nine',
    name: '88Nine Radio Milwaukee',
    url: 'https://wyms.streamguys1.com/live',
    description: 'Milwaukee community radio',
    hasSpinnitron: true,
  },
  {
    id: 'hyfin',
    name: 'HYFIN',
    url: 'https://wyms.streamguys1.com/hyfin',
    description: 'Black music & culture',
    hasSpinnitron: false,
  },
]

// Initial state
const initialState: AudioState = {
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  currentStream: DEFAULT_STREAMS[0],
  availableStreams: DEFAULT_STREAMS,
  volume: 75,
  isMuted: false,
  previousVolume: 75,
  nowPlaying: null,
  recentTracks: [],
  mixcloudEpisodes: [],
  webampReady: false,
}

/**
 * useAudioStore - Zustand store for audio player state management
 *
 * Manages:
 * - Playback state (playing, paused, loading)
 * - Stream selection and switching
 * - Volume with mute toggle
 * - Now playing metadata
 * - Recent tracks history
 * - Mixcloud episodes
 *
 * Volume is persisted to localStorage
 */
export const useAudioStore = create<AudioState & AudioActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      play: () => {
        set({ isPlaying: true, isPaused: false })
      },

      pause: () => {
        set({ isPlaying: false, isPaused: true })
      },

      stop: () => {
        set({ isPlaying: false, isPaused: false })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      switchStream: (stream: RadioStream) => {
        set({
          currentStream: stream,
          isLoading: true,
          nowPlaying: null,
          recentTracks: [],
        })
      },

      setStreams: (streams: RadioStream[]) => {
        set({ availableStreams: streams })
      },

      setVolume: (volume: number) => {
        const clampedVolume = Math.max(0, Math.min(100, volume))
        set({
          volume: clampedVolume,
          isMuted: clampedVolume === 0,
          previousVolume: clampedVolume > 0 ? clampedVolume : get().previousVolume,
        })
      },

      mute: () => {
        const state = get()
        set({
          previousVolume: state.volume > 0 ? state.volume : state.previousVolume,
          volume: 0,
          isMuted: true,
        })
      },

      unmute: () => {
        const state = get()
        set({
          volume: state.previousVolume || 75,
          isMuted: false,
        })
      },

      toggleMute: () => {
        const state = get()
        if (state.isMuted) {
          get().unmute()
        } else {
          get().mute()
        }
      },

      updateNowPlaying: (info: NowPlaying | null) => {
        set({ nowPlaying: info })
      },

      addRecentTrack: (track: RecentTrack) => {
        set((state) => ({
          recentTracks: [track, ...state.recentTracks.slice(0, 9)], // Keep last 10
        }))
      },

      setRecentTracks: (tracks: RecentTrack[]) => {
        set({ recentTracks: tracks })
      },

      setMixcloudEpisodes: (episodes: MixcloudEpisode[]) => {
        set({ mixcloudEpisodes: episodes })
      },

      setWebampReady: (ready: boolean) => {
        set({ webampReady: ready })
      },

      reset: () => {
        set(initialState)
      },
    }),
    {
      name: 'audio-storage',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        previousVolume: state.previousVolume,
        currentStream: state.currentStream,
      }),
    }
  )
)

// Selector hooks
export const useIsPlaying = () => useAudioStore((state) => state.isPlaying)
export const useCurrentStream = () => useAudioStore((state) => state.currentStream)
export const useVolume = () => useAudioStore((state) => state.volume)
export const useNowPlaying = () => useAudioStore((state) => state.nowPlaying)
export const useRecentTracks = () => useAudioStore((state) => state.recentTracks)
