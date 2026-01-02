import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for faster reads
})

// Type definitions for curated items
export interface CuratedItem {
  _id: string
  _type: 'curatedItem'
  title: string
  itemType: 'music' | 'book' | 'link' | 'tool'
  creator?: string
  coverImage?: {
    asset: {
      _ref: string
      url?: string
    }
  }
  curatorNotes?: any[] // Portable Text blocks
  discoveryDate?: string
  tags?: string[]
  // Music fields
  embedType?: 'youtube' | 'bandcamp' | 'spotify' | 'soundcloud'
  embedUrl?: string
  genre?: string
  // Book fields
  author?: string
  purchaseUrl?: string
  isbn?: string
  // Link/Tool fields
  url?: string
  description?: string
  category?: string
  // Display
  featured?: boolean
  order?: number
  enabled?: boolean
  substackUrl?: string
}

// GROQ query for fetching curated items
export const curatedItemsQuery = `*[_type == "curatedItem" && enabled != false] | order(featured desc, order asc, discoveryDate desc) {
  _id,
  title,
  itemType,
  creator,
  "coverImageUrl": coverImage.asset->url,
  curatorNotes,
  discoveryDate,
  tags,
  embedType,
  embedUrl,
  genre,
  author,
  purchaseUrl,
  isbn,
  url,
  description,
  category,
  featured,
  order,
  substackUrl
}`

// Fetch curated items
export async function getCuratedItems(): Promise<CuratedItem[]> {
  return sanityClient.fetch(curatedItemsQuery)
}

// Boot sequence types
export interface BootSequenceConfig {
  enabled: boolean
  asciiArt?: string
  asciiAnimationSpeed?: number
  bootMessages?: {
    message: string
    delay: number
    isSuccess?: boolean
  }[]
  totalDuration?: number
  allowSkip?: boolean
  skipButtonText?: string
  rememberSkipPreference?: boolean
}

// GROQ query for boot sequence
export const bootSequenceQuery = `*[_type == "bootSequence"][0] {
  enabled,
  asciiArt,
  asciiAnimationSpeed,
  bootMessages[] {
    message,
    delay,
    isSuccess
  },
  totalDuration,
  allowSkip,
  skipButtonText,
  rememberSkipPreference
}`

// Fetch boot sequence config
export async function getBootSequenceConfig(): Promise<BootSequenceConfig | null> {
  return sanityClient.fetch(bootSequenceQuery)
}

// Sticky note types
export interface StickyNoteConfig {
  enabled: boolean
  title?: string
  message: string
  signature?: string
  color?: 'yellow' | 'blue' | 'green' | 'pink' | 'orange'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  rotation?: number
}

// GROQ query for sticky note
export const stickyNoteQuery = `*[_type == "stickyNote"][0] {
  enabled,
  title,
  message,
  signature,
  color,
  position,
  rotation
}`

// Fetch sticky note config
export async function getStickyNoteConfig(): Promise<StickyNoteConfig | null> {
  return sanityClient.fetch(stickyNoteQuery)
}
