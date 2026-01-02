import { sanityFetch } from './client'
import * as queries from './queries'
import type {
  SiteSettings,
  BootSequence,
  PlayerConfig,
  ThemeSettings,
  DesktopApp,
  DesktopShortcut,
  AboutSection,
  Experience,
  Education,
  Skill,
  Project,
  TerminalCommand,
  RadioStream,
  Wallpaper,
} from './types'

// ==========================================
// Cache Tags (for on-demand revalidation)
// ==========================================

export const CACHE_TAGS = {
  siteSettings: 'siteSettings',
  bootSequence: 'bootSequence',
  playerConfig: 'playerConfig',
  themeSettings: 'themeSettings',
  desktopApps: 'desktopApps',
  desktopShortcuts: 'desktopShortcuts',
  aboutSections: 'aboutSections',
  experiences: 'experiences',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  terminalCommands: 'terminalCommands',
  radioStreams: 'radioStreams',
  wallpapers: 'wallpapers',
} as const

// ==========================================
// Singleton Fetchers
// ==========================================

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: queries.siteSettingsQuery,
    tags: [CACHE_TAGS.siteSettings],
  })
}

export async function getBootSequence(): Promise<BootSequence | null> {
  return sanityFetch<BootSequence | null>({
    query: queries.bootSequenceQuery,
    tags: [CACHE_TAGS.bootSequence],
  })
}

export async function getPlayerConfig(): Promise<PlayerConfig | null> {
  return sanityFetch<PlayerConfig | null>({
    query: queries.playerConfigQuery,
    tags: [CACHE_TAGS.playerConfig, CACHE_TAGS.radioStreams],
  })
}

export async function getThemeSettings(): Promise<ThemeSettings | null> {
  return sanityFetch<ThemeSettings | null>({
    query: queries.themeSettingsQuery,
    tags: [CACHE_TAGS.themeSettings, CACHE_TAGS.wallpapers],
  })
}

// ==========================================
// Desktop Fetchers
// ==========================================

export async function getDesktopApps(): Promise<DesktopApp[]> {
  return sanityFetch<DesktopApp[]>({
    query: queries.desktopAppsQuery,
    tags: [CACHE_TAGS.desktopApps],
  })
}

export async function getDesktopShortcuts(): Promise<DesktopShortcut[]> {
  return sanityFetch<DesktopShortcut[]>({
    query: queries.desktopShortcutsQuery,
    tags: [CACHE_TAGS.desktopShortcuts],
  })
}

// ==========================================
// About Fetchers
// ==========================================

export async function getAboutSections(): Promise<AboutSection[]> {
  return sanityFetch<AboutSection[]>({
    query: queries.aboutSectionsQuery,
    tags: [CACHE_TAGS.aboutSections],
  })
}

export async function getExperiences(): Promise<Experience[]> {
  return sanityFetch<Experience[]>({
    query: queries.experiencesQuery,
    tags: [CACHE_TAGS.experiences],
  })
}

export async function getEducation(): Promise<Education[]> {
  return sanityFetch<Education[]>({
    query: queries.educationQuery,
    tags: [CACHE_TAGS.education],
  })
}

export async function getSkills(): Promise<Skill[]> {
  return sanityFetch<Skill[]>({
    query: queries.skillsQuery,
    tags: [CACHE_TAGS.skills],
  })
}

export async function getSkillsByCategory(category: Skill['category']): Promise<Skill[]> {
  return sanityFetch<Skill[]>({
    query: queries.skillsByCategoryQuery,
    params: { category },
    tags: [CACHE_TAGS.skills],
  })
}

// ==========================================
// Project Fetchers
// ==========================================

export async function getProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>({
    query: queries.projectsQuery,
    tags: [CACHE_TAGS.projects],
  })
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>({
    query: queries.featuredProjectsQuery,
    tags: [CACHE_TAGS.projects],
  })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project | null>({
    query: queries.projectBySlugQuery,
    params: { slug },
    tags: [CACHE_TAGS.projects],
  })
}

export async function getProjectSlugs(): Promise<string[]> {
  return sanityFetch<string[]>({
    query: queries.projectSlugsQuery,
    tags: [CACHE_TAGS.projects],
  })
}

// ==========================================
// Terminal Fetchers
// ==========================================

export async function getTerminalCommands(): Promise<TerminalCommand[]> {
  return sanityFetch<TerminalCommand[]>({
    query: queries.terminalCommandsQuery,
    tags: [CACHE_TAGS.terminalCommands],
  })
}

export async function getTerminalCommand(command: string): Promise<TerminalCommand | null> {
  return sanityFetch<TerminalCommand | null>({
    query: queries.terminalCommandByNameQuery,
    params: { command: command.toLowerCase() },
    tags: [CACHE_TAGS.terminalCommands],
  })
}

export async function getHelpCommands(): Promise<Pick<TerminalCommand, '_id' | 'command' | 'description' | 'category'>[]> {
  return sanityFetch<Pick<TerminalCommand, '_id' | 'command' | 'description' | 'category'>[]>({
    query: queries.helpCommandsQuery,
    tags: [CACHE_TAGS.terminalCommands],
  })
}

// ==========================================
// Media Fetchers
// ==========================================

export async function getRadioStreams(): Promise<RadioStream[]> {
  return sanityFetch<RadioStream[]>({
    query: queries.radioStreamsQuery,
    tags: [CACHE_TAGS.radioStreams],
  })
}

export async function getDefaultRadioStream(): Promise<RadioStream | null> {
  return sanityFetch<RadioStream | null>({
    query: queries.defaultRadioStreamQuery,
    tags: [CACHE_TAGS.radioStreams],
  })
}

export async function getWallpapers(): Promise<Wallpaper[]> {
  return sanityFetch<Wallpaper[]>({
    query: queries.wallpapersQuery,
    tags: [CACHE_TAGS.wallpapers],
  })
}

export async function getActiveWallpaper(): Promise<Wallpaper | null> {
  return sanityFetch<Wallpaper | null>({
    query: queries.activeWallpaperQuery,
    tags: [CACHE_TAGS.wallpapers],
  })
}

export async function getWallpapersByCategory(category: Wallpaper['category']): Promise<Wallpaper[]> {
  return sanityFetch<Wallpaper[]>({
    query: queries.wallpapersByCategoryQuery,
    params: { category },
    tags: [CACHE_TAGS.wallpapers],
  })
}
