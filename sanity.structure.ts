import type { StructureResolver } from 'sanity/structure'

// Icons for groups
const icons = {
  settings: () => '⚙️',
  desktop: () => '🖥️',
  about: () => '👤',
  projects: () => '📁',
  terminal: () => '💻',
  media: () => '🎨',
}

// Singleton document IDs (these should match what you create in the CMS)
const singletonTypes = new Set(['siteSettings', 'bootSequence', 'playerConfig', 'themeSettings'])

// Helper to create a singleton item
const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon?: () => string
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ==========================================
      // Settings Group (Singletons)
      // ==========================================
      S.listItem()
        .title('Settings')
        .icon(icons.settings)
        .child(
          S.list()
            .title('Settings')
            .items([
              singletonListItem(S, 'siteSettings', 'Site Settings', () => '🌐'),
              singletonListItem(S, 'bootSequence', 'Boot Sequence', () => '🚀'),
              singletonListItem(S, 'playerConfig', 'Player Config', () => '🎵'),
              singletonListItem(S, 'themeSettings', 'Theme Settings', () => '🎨'),
            ])
        ),

      S.divider(),

      // ==========================================
      // Desktop Group
      // ==========================================
      S.listItem()
        .title('Desktop')
        .icon(icons.desktop)
        .child(
          S.list()
            .title('Desktop')
            .items([
              S.listItem()
                .title('Apps')
                .icon(() => '📱')
                .child(
                  S.documentTypeList('desktopApp')
                    .title('Desktop Apps')
                    .defaultOrdering([{ field: 'dockOrder', direction: 'asc' }])
                ),
              S.listItem()
                .title('Shortcuts')
                .icon(() => '🔗')
                .child(
                  S.documentTypeList('desktopShortcut')
                    .title('Desktop Shortcuts')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      // ==========================================
      // About Group
      // ==========================================
      S.listItem()
        .title('About')
        .icon(icons.about)
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem()
                .title('Sections')
                .icon(() => '📄')
                .child(
                  S.documentTypeList('aboutSection')
                    .title('About Sections')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Experience')
                .icon(() => '💼')
                .child(
                  S.documentTypeList('experience')
                    .title('Work Experience')
                    .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Education')
                .icon(() => '🎓')
                .child(
                  S.documentTypeList('education')
                    .title('Education')
                    .defaultOrdering([{ field: 'endYear', direction: 'desc' }])
                ),
              S.listItem()
                .title('Skills')
                .icon(() => '⚡')
                .child(
                  S.documentTypeList('skill')
                    .title('Skills')
                    .defaultOrdering([
                      { field: 'category', direction: 'asc' },
                      { field: 'order', direction: 'asc' },
                    ])
                ),
            ])
        ),

      // ==========================================
      // Projects Group
      // ==========================================
      S.listItem()
        .title('Projects')
        .icon(icons.projects)
        .child(
          S.documentTypeList('project')
            .title('Case Studies')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // ==========================================
      // Terminal Group
      // ==========================================
      S.listItem()
        .title('Terminal')
        .icon(icons.terminal)
        .child(
          S.documentTypeList('terminalCommand')
            .title('Terminal Commands')
            .defaultOrdering([{ field: 'command', direction: 'asc' }])
        ),

      // ==========================================
      // Media Group
      // ==========================================
      S.listItem()
        .title('Media')
        .icon(icons.media)
        .child(
          S.list()
            .title('Media')
            .items([
              S.listItem()
                .title('Radio Streams')
                .icon(() => '📻')
                .child(
                  S.documentTypeList('radioStream')
                    .title('Radio Streams')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Wallpapers')
                .icon(() => '🖼️')
                .child(
                  S.documentTypeList('wallpaper')
                    .title('Wallpapers')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),
    ])

// Filter out singletons from the default document type list
export const defaultDocumentNodeResolver: StructureResolver = (S) =>
  S.document().views([S.view.form()])
