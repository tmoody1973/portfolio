/**
 * API response types for external integrations
 * These types match the validated Zod schemas
 */

// ============================================
// Spinitron API Types
// ============================================

export interface SpinitronsPin {
  id: number
  artist: string
  song: string
  album?: string
  label?: string
  start: string
  duration?: number
  image?: string
}

export interface SpinitronsResponse {
  items: SpinitronsPin[]
}

// ============================================
// Mixcloud API Types
// ============================================

export interface MixcloudShow {
  key: string
  name: string
  url: string
  created_time: string
  audio_length: number
  play_count: number
  pictures: {
    medium: string
    large: string
    extra_large: string
  }
  tags: Array<{
    key: string
    name: string
    url: string
  }>
}

export interface MixcloudResponse {
  data: MixcloudShow[]
  paging?: {
    next?: string
    previous?: string
  }
}

// ============================================
// Common API Types
// ============================================

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  isLoading: boolean
}
