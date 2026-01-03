import { track } from '@vercel/analytics'

/**
 * Track when a user opens an app from the dock or desktop
 */
export function trackAppOpen(appName: string, source: 'dock' | 'desktop' | 'shortcut') {
  track('app_opened', { app: appName, source })
}

/**
 * Track when a user interacts with the file manager
 */
export function trackFileManager(action: 'folder_opened' | 'file_opened' | 'file_preview', fileName?: string) {
  track('file_manager', { action, file: fileName || 'unknown' })
}

/**
 * Track crates interactions
 */
export function trackCrates(action: 'item_clicked' | 'category_filtered' | 'item_expanded', itemName?: string) {
  track('crates', { action, item: itemName || 'unknown' })
}

/**
 * Track music player interactions
 */
export function trackPlayer(action: 'play' | 'pause' | 'next' | 'previous' | 'stream_selected', streamName?: string) {
  track('music_player', { action, stream: streamName || 'unknown' })
}

/**
 * Track Rhythm Lab (Mixcloud) interactions
 */
export function trackRhythmLab(action: 'show_played' | 'show_selected', showName?: string) {
  track('rhythm_lab', { action, show: showName || 'unknown' })
}

/**
 * Track terminal commands
 */
export function trackTerminal(command: string) {
  track('terminal_command', { command })
}

/**
 * Track settings changes
 */
export function trackSettings(action: 'wallpaper_changed' | 'theme_changed', value?: string) {
  track('settings', { action, value: value || 'unknown' })
}

/**
 * Track desktop shortcut clicks
 */
export function trackShortcut(shortcutName: string, url?: string) {
  track('shortcut_clicked', { name: shortcutName, url: url || 'unknown' })
}

/**
 * Track about section views
 */
export function trackAbout(section: string) {
  track('about_section_viewed', { section })
}

/**
 * Track project views
 */
export function trackProject(projectName: string) {
  track('project_viewed', { project: projectName })
}

/**
 * Track sticky note interactions
 */
export function trackStickyNote(action: 'opened' | 'closed' | 'dragged') {
  track('sticky_note', { action })
}

/**
 * Track contact form
 */
export function trackContact(action: 'form_opened' | 'form_submitted' | 'form_error') {
  track('contact', { action })
}
