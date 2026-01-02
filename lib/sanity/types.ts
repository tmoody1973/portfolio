import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

// ==========================================
// Base Types
// ==========================================

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImage extends Image {
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// ==========================================
// Singleton Types
// ==========================================

export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings'
  siteName: string
  siteDescription?: string
  siteUrl?: string
  socialImage?: SanityImage
  googleAnalyticsId?: string
  ownerName?: string
  ownerTitle?: string
}

export interface BootSequence extends SanityDocument {
  _type: 'bootSequence'
  asciiArtName?: string
  bootMessages?: BootMessage[]
  bootDuration?: number
  showSkipButton?: boolean
  skipButtonDelay?: number
}

export interface BootMessage {
  _key: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  delay?: number
}

export interface PlayerConfig extends SanityDocument {
  _type: 'playerConfig'
  defaultVolume?: number
  autoPlay?: boolean
  showVisualizer?: boolean
  defaultStream?: {
    _ref: string
    _type: 'reference'
  }
  skin?: string
}

export interface ThemeSettings extends SanityDocument {
  _type: 'themeSettings'
  accentColor?: string
  terminalFont?: string
  terminalFontSize?: number
  defaultWallpaper?: {
    _ref: string
    _type: 'reference'
  }
  dockPosition?: 'left' | 'bottom'
  dockAutoHide?: boolean
}

// ==========================================
// Desktop Types
// ==========================================

export interface DesktopApp extends SanityDocument {
  _type: 'desktopApp'
  appId: string
  title: string
  icon?: SanityImage
  iconName?: string
  enabled: boolean
  showInDock: boolean
  dockOrder: number
  defaultWindowConfig?: WindowConfig
}

export interface WindowConfig {
  width?: number
  height?: number
  x?: number
  y?: number
  resizable?: boolean
  minimizable?: boolean
  maximizable?: boolean
}

export interface DesktopShortcut extends SanityDocument {
  _type: 'desktopShortcut'
  title: string
  url: string
  icon?: SanityImage
  iconType: string
  order: number
  enabled: boolean
  openInNewTab: boolean
  description?: string
}

// ==========================================
// About Types
// ==========================================

export interface AboutSection extends SanityDocument {
  _type: 'aboutSection'
  title: string
  sectionType: 'bio' | 'journey' | 'education' | 'skills'
  content?: PortableTextBlock[]
  order: number
  enabled: boolean
}

export interface Experience extends SanityDocument {
  _type: 'experience'
  company: string
  role: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: PortableTextBlock[]
  highlights?: string[]
  logo?: SanityImage
  location?: string
  order: number
  enabled: boolean
}

export interface Education extends SanityDocument {
  _type: 'education'
  institution: string
  degree: string
  fieldOfStudy?: string
  startYear?: number
  endYear?: number
  inProgress: boolean
  details?: string
  credentialUrl?: string
  logo?: SanityImage
  order: number
  enabled: boolean
}

export interface Skill extends SanityDocument {
  _type: 'skill'
  name: string
  category: 'languages' | 'frameworks' | 'tools' | 'platforms' | 'databases' | 'design' | 'soft-skills' | 'other'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  proficiencyLevel: number
  yearsOfExperience?: number
  icon?: SanityImage
  iconName?: string
  description?: string
  featured: boolean
  order: number
  enabled: boolean
}

// ==========================================
// Project Types
// ==========================================

export interface Project extends SanityDocument {
  _type: 'project'
  title: string
  slug: SanitySlug
  subtitle?: string
  featuredImage?: SanityImage
  context?: PortableTextBlock[]
  concept?: PortableTextBlock[]
  process?: PortableTextBlock[]
  execution?: PortableTextBlock[]
  result?: PortableTextBlock[]
  reflection?: PortableTextBlock[]
  screenshots?: ProjectScreenshot[]
  client?: string
  year?: number
  duration?: string
  role?: string
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  featured: boolean
  order: number
  enabled: boolean
}

export interface ProjectScreenshot {
  _key: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  caption?: string
  alt?: string
}

// ==========================================
// Terminal Types
// ==========================================

export interface TerminalCommand extends SanityDocument {
  _type: 'terminalCommand'
  command: string
  aliases?: string[]
  category: 'info' | 'navigation' | 'system' | 'fun' | 'social' | 'help'
  description?: string
  response?: PortableTextBlock[]
  plainTextResponse?: string
  isAsciiArt: boolean
  clearScreen: boolean
  showInHelp: boolean
  order: number
  enabled: boolean
}

// ==========================================
// Media Types
// ==========================================

export interface RadioStream extends SanityDocument {
  _type: 'radioStream'
  name: string
  streamUrl: string
  description?: string
  artwork?: SanityImage
  spinitronStationId?: string
  spinitronApiKey?: string
  mixcloudUsername?: string
  mixcloudShowSlug?: string
  genre?: string
  websiteUrl?: string
  isDefault: boolean
  order: number
  enabled: boolean
}

export interface Wallpaper extends SanityDocument {
  _type: 'wallpaper'
  name: string
  image: SanityImage
  description?: string
  credit?: string
  creditUrl?: string
  category: 'ubuntu' | 'nature' | 'abstract' | 'city' | 'space' | 'minimal' | 'custom'
  colorScheme?: 'dark' | 'light' | 'warm' | 'cool'
  isActive: boolean
  order: number
  enabled: boolean
}
