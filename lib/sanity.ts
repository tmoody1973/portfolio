import { createClient, type SanityClient } from 'next-sanity'

const apiVersion = '2024-01-01'

// Lazy-initialized client to avoid issues during build time
let _sanityClient: SanityClient | null = null

function getClient(): SanityClient {
  if (!_sanityClient) {
    const envProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const envDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

    _sanityClient = createClient({
      projectId: envProjectId && envProjectId.length > 0 ? envProjectId : 'zb08xdlz',
      dataset: envDataset && envDataset.length > 0 ? envDataset : 'production',
      apiVersion,
      useCdn: true,
    })
  }
  return _sanityClient
}

// Proxy object for backwards compatibility
export const sanityClient = {
  fetch: <T>(query: string, params?: Record<string, unknown>) =>
    getClient().fetch<T>(query, params)
}

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

// Wallpaper types
export interface WallpaperConfig {
  _id: string
  name: string
  imageUrl: string
  description?: string
  colorScheme?: 'light' | 'dark'
}

// GROQ query for active wallpaper
export const activeWallpaperQuery = `*[_type == "wallpaper" && enabled == true && isActive == true][0] {
  _id,
  name,
  "imageUrl": image.asset->url,
  description,
  colorScheme
}`

// GROQ query for all wallpapers (for settings)
export const allWallpapersQuery = `*[_type == "wallpaper" && enabled == true] | order(order asc) {
  _id,
  name,
  "imageUrl": image.asset->url,
  description,
  colorScheme
}`

// Fetch active wallpaper
export async function getActiveWallpaper(): Promise<WallpaperConfig | null> {
  return sanityClient.fetch(activeWallpaperQuery)
}

// Fetch all wallpapers
export async function getAllWallpapers(): Promise<WallpaperConfig[]> {
  return sanityClient.fetch(allWallpapersQuery)
}

// Skill types
export interface Skill {
  _id: string
  name: string
  category: string
  proficiency: string
  proficiencyLevel: number
  description?: string
  featured?: boolean
  order?: number
  enabled?: boolean
}

// GROQ query for skills
export const skillsQuery = `*[_type == "skill" && enabled != false] | order(category asc, order asc) {
  _id,
  name,
  category,
  proficiency,
  proficiencyLevel,
  description,
  featured,
  order
}`

// Fetch skills
export async function getSkills(): Promise<Skill[]> {
  return sanityClient.fetch(skillsQuery)
}

// Experience types
export interface Experience {
  _id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  location?: string
  highlights?: string[]
  order?: number
  enabled?: boolean
}

// GROQ query for experience
export const experienceQuery = `*[_type == "experience" && enabled != false] | order(order asc, startDate desc) {
  _id,
  company,
  role,
  startDate,
  endDate,
  isCurrent,
  location,
  highlights,
  order
}`

// Fetch experience
export async function getExperience(): Promise<Experience[]> {
  return sanityClient.fetch(experienceQuery)
}

// About section types
export interface AboutSection {
  _id: string
  title: string
  sectionType: 'bio' | 'journey' | 'education' | 'skills'
  content?: any[] // Portable Text blocks
  order?: number
  enabled?: boolean
}

// GROQ query for about sections
export const aboutSectionsQuery = `*[_type == "aboutSection" && enabled != false] | order(order asc) {
  _id,
  title,
  sectionType,
  content,
  order
}`

// Fetch about sections
export async function getAboutSections(): Promise<AboutSection[]> {
  return sanityClient.fetch(aboutSectionsQuery)
}

// Fetch bio section specifically
export async function getBioSection(): Promise<AboutSection | null> {
  return sanityClient.fetch(`*[_type == "aboutSection" && sectionType == "bio" && enabled != false][0] {
    _id,
    title,
    sectionType,
    content,
    order
  }`)
}

// Radio Stream types (for player)
export interface SanityRadioStream {
  _id: string
  name: string
  streamUrl: string
  description?: string
  genre?: string
  spinitronStationId?: string
  isDefault?: boolean
  order?: number
  enabled?: boolean
}

// GROQ query for radio streams
export const radioStreamsQuery = `*[_type == "radioStream" && enabled != false] | order(order asc) {
  _id,
  name,
  streamUrl,
  description,
  genre,
  spinitronStationId,
  isDefault,
  order
}`

// Fetch radio streams
export async function getRadioStreams(): Promise<SanityRadioStream[]> {
  return sanityClient.fetch(radioStreamsQuery)
}

// Education types
export interface Education {
  _id: string
  institution: string
  degree: string
  fieldOfStudy?: string
  startYear?: number
  endYear?: number
  inProgress?: boolean
  details?: string
  order?: number
  enabled?: boolean
}

// GROQ query for education
export const educationQuery = `*[_type == "education" && enabled != false] | order(order asc) {
  _id,
  institution,
  degree,
  fieldOfStudy,
  startYear,
  endYear,
  inProgress,
  details,
  order
}`

// Fetch education
export async function getEducation(): Promise<Education[]> {
  return sanityClient.fetch(educationQuery)
}
