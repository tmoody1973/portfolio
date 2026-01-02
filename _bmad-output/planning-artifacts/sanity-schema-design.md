# Sanity Schema Design: Ubuntu Portfolio

**Project:** portfolio
**Date:** 2026-01-01
**Phase:** Schema Design (Pre-Implementation)

---

## Overview

This document defines the Sanity CMS schema architecture for Tarik Moody's Ubuntu desktop-themed portfolio. All schemas follow Sanity v3 conventions and are designed to support the unique desktop simulation UI.

---

## Schema Categories

### 1. Singletons (Single Documents)

These are one-per-site configuration documents.

---

### 2. Document Types

Repeatable content types for managing portfolio content.

---

## Singleton Schemas

### `siteSettings`

Global site configuration and personal branding.

```typescript
{
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    // Identity
    { name: 'name', type: 'string', title: 'Full Name' },
    { name: 'title', type: 'string', title: 'Professional Title' },
    { name: 'tagline', type: 'string', title: 'Tagline' },
    { name: 'shortBio', type: 'text', title: 'Short Bio', rows: 3 },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'email', type: 'string', title: 'Contact Email' },

    // Meta
    { name: 'siteTitle', type: 'string', title: 'Site Title (SEO)' },
    { name: 'siteDescription', type: 'text', title: 'Site Description (SEO)' },
    { name: 'ogImage', type: 'image', title: 'Open Graph Image' },

    // Profile Image
    { name: 'profileImage', type: 'image', title: 'Profile Image' },

    // Social Links (array for flexibility)
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [{ type: 'socialLink' }]
    }
  ]
}
```

---

### `bootSequence`

Controls the Ubuntu boot animation experience.

```typescript
{
  name: 'bootSequence',
  type: 'document',
  title: 'Boot Sequence',
  fields: [
    // ASCII Art
    {
      name: 'asciiArt',
      type: 'text',
      title: 'ASCII Art Name',
      description: 'ASCII art displayed during boot',
      rows: 10
    },
    {
      name: 'asciiStyle',
      type: 'string',
      title: 'ASCII Style',
      options: {
        list: ['light', 'heavy', 'block']
      }
    },

    // Animation Config
    {
      name: 'glitchDuration',
      type: 'number',
      title: 'Glitch Duration (ms)',
      initialValue: 500
    },
    {
      name: 'typingDuration',
      type: 'number',
      title: 'Typing Duration (ms)',
      initialValue: 2000
    },
    {
      name: 'textColor',
      type: 'string',
      title: 'Text Color (hex)',
      initialValue: '#0072CE'
    },

    // Boot Messages
    {
      name: 'bootMessages',
      type: 'array',
      title: 'Boot Messages',
      of: [{
        type: 'object',
        fields: [
          { name: 'message', type: 'string', title: 'Message' },
          { name: 'value', type: 'string', title: 'Value' },
          { name: 'delay', type: 'number', title: 'Delay (ms)', initialValue: 200 }
        ]
      }]
    },

    // Skip Option
    {
      name: 'allowSkip',
      type: 'boolean',
      title: 'Allow Skip',
      initialValue: true
    },
    {
      name: 'skipAfter',
      type: 'number',
      title: 'Auto-skip after (ms)',
      description: 'Set to 0 to disable',
      initialValue: 0
    }
  ]
}
```

---

### `playerConfig`

Winamp/Webamp player configuration.

```typescript
{
  name: 'playerConfig',
  type: 'document',
  title: 'Player Configuration',
  fields: [
    // Default Settings
    {
      name: 'defaultVolume',
      type: 'number',
      title: 'Default Volume (0-100)',
      validation: Rule => Rule.min(0).max(100),
      initialValue: 50
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      title: 'Auto-play on Load',
      initialValue: false
    },
    {
      name: 'defaultStation',
      type: 'reference',
      title: 'Default Station',
      to: [{ type: 'radioStream' }]
    },

    // Features
    {
      name: 'showEqualizer',
      type: 'boolean',
      title: 'Show Equalizer',
      initialValue: true
    },
    {
      name: 'showVisualizer',
      type: 'boolean',
      title: 'Show Visualizer',
      initialValue: true
    },
    {
      name: 'showRecentTracks',
      type: 'boolean',
      title: 'Show Recent Tracks',
      initialValue: true
    },
    {
      name: 'recentTracksCount',
      type: 'number',
      title: 'Recent Tracks Count',
      initialValue: 5
    },
    {
      name: 'showMixcloudArchive',
      type: 'boolean',
      title: 'Show Mixcloud Archive',
      initialValue: true
    },
    {
      name: 'mixcloudShowCount',
      type: 'number',
      title: 'Mixcloud Shows Count',
      initialValue: 5
    },

    // Spinitron Config
    {
      name: 'spinitonStationId',
      type: 'string',
      title: 'Spinitron Station ID'
    },

    // Mixcloud Config
    {
      name: 'mixcloudUsername',
      type: 'string',
      title: 'Mixcloud Username'
    },

    // Skin
    {
      name: 'skinUrl',
      type: 'url',
      title: 'Custom Skin URL (.wsz)',
      description: 'Optional custom Winamp skin'
    }
  ]
}
```

---

### `themeSettings`

Ubuntu theme and visual customization.

```typescript
{
  name: 'themeSettings',
  type: 'document',
  title: 'Theme Settings',
  fields: [
    // Colors
    {
      name: 'primaryColor',
      type: 'string',
      title: 'Primary Color',
      initialValue: '#0072CE'
    },
    {
      name: 'secondaryColor',
      type: 'string',
      title: 'Secondary Color',
      initialValue: '#E95420'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      initialValue: '#2C2C2C'
    },
    {
      name: 'accentColor',
      type: 'string',
      title: 'Accent Color',
      initialValue: '#F5F1E6'
    },

    // Default Wallpaper
    {
      name: 'defaultWallpaper',
      type: 'reference',
      title: 'Default Wallpaper',
      to: [{ type: 'wallpaper' }]
    },

    // Window Settings
    {
      name: 'windowTheme',
      type: 'string',
      title: 'Window Theme',
      options: {
        list: ['Yaru', 'Yaru-dark', 'Adwaita']
      },
      initialValue: 'Yaru-dark'
    }
  ]
}
```

---

## Document Schemas

### `desktopApp`

Registry of desktop applications that open in windows.

```typescript
{
  name: 'desktopApp',
  type: 'document',
  title: 'Desktop App',
  fields: [
    { name: 'appId', type: 'slug', title: 'App ID', options: { source: 'title' } },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'icon', type: 'image', title: 'Icon' },
    {
      name: 'appType',
      type: 'string',
      title: 'App Type',
      options: {
        list: [
          { title: 'About (Tabs)', value: 'about' },
          { title: 'Browser (Projects)', value: 'browser' },
          { title: 'Terminal', value: 'terminal' },
          { title: 'Player (Winamp)', value: 'player' },
          { title: 'Settings', value: 'settings' },
          { title: 'Contact', value: 'contact' },
          { title: 'Custom', value: 'custom' }
        ]
      }
    },

    // Window Config
    {
      name: 'defaultWidth',
      type: 'number',
      title: 'Default Width',
      initialValue: 800
    },
    {
      name: 'defaultHeight',
      type: 'number',
      title: 'Default Height',
      initialValue: 600
    },
    {
      name: 'minWidth',
      type: 'number',
      title: 'Min Width',
      initialValue: 400
    },
    {
      name: 'minHeight',
      type: 'number',
      title: 'Min Height',
      initialValue: 300
    },
    {
      name: 'resizable',
      type: 'boolean',
      title: 'Resizable',
      initialValue: true
    },

    // Behavior
    {
      name: 'showInDock',
      type: 'boolean',
      title: 'Show in Dock',
      initialValue: true
    },
    {
      name: 'showOnDesktop',
      type: 'boolean',
      title: 'Show Desktop Icon',
      initialValue: false
    },
    {
      name: 'sortOrder',
      type: 'number',
      title: 'Sort Order',
      initialValue: 0
    },

    // Disabled state
    {
      name: 'disabled',
      type: 'boolean',
      title: 'Disabled',
      initialValue: false
    }
  ]
}
```

---

### `desktopShortcut`

External links displayed as desktop icons.

```typescript
{
  name: 'desktopShortcut',
  type: 'document',
  title: 'Desktop Shortcut',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'icon', type: 'image', title: 'Icon' },
    { name: 'url', type: 'url', title: 'URL' },
    {
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          { title: 'External URL', value: 'external' },
          { title: 'Email (mailto)', value: 'email' },
          { title: 'Phone (tel)', value: 'phone' }
        ]
      },
      initialValue: 'external'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: ['social', 'professional', 'media', 'other']
      }
    },
    { name: 'sortOrder', type: 'number', title: 'Sort Order', initialValue: 0 },
    { name: 'visible', type: 'boolean', title: 'Visible', initialValue: true }
  ]
}
```

---

### `aboutSection`

Tabbed sections for the About app.

```typescript
{
  name: 'aboutSection',
  type: 'document',
  title: 'About Section',
  fields: [
    { name: 'title', type: 'string', title: 'Tab Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'icon', type: 'string', title: 'Icon (emoji or class)' },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    {
      name: 'sectionType',
      type: 'string',
      title: 'Section Type',
      options: {
        list: [
          { title: 'Rich Text (Bio)', value: 'richtext' },
          { title: 'Timeline (Journey)', value: 'timeline' },
          { title: 'List (Education)', value: 'list' },
          { title: 'Grid (Skills)', value: 'grid' },
          { title: 'Cards (Projects)', value: 'cards' },
          { title: 'Resume (PDF)', value: 'resume' }
        ]
      }
    },

    // Content - depends on sectionType
    {
      name: 'richContent',
      type: 'array',
      title: 'Rich Content',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.sectionType !== 'richtext'
    },
    {
      name: 'timelineItems',
      type: 'array',
      title: 'Timeline Items',
      of: [{ type: 'reference', to: [{ type: 'experience' }] }],
      hidden: ({ parent }) => parent?.sectionType !== 'timeline'
    },
    {
      name: 'listItems',
      type: 'array',
      title: 'List Items',
      of: [{ type: 'reference', to: [{ type: 'education' }] }],
      hidden: ({ parent }) => parent?.sectionType !== 'list'
    },
    {
      name: 'skillItems',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
      hidden: ({ parent }) => parent?.sectionType !== 'grid'
    },
    {
      name: 'projectItems',
      type: 'array',
      title: 'Featured Projects',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      hidden: ({ parent }) => parent?.sectionType !== 'cards'
    },
    {
      name: 'resumeFile',
      type: 'file',
      title: 'Resume PDF',
      hidden: ({ parent }) => parent?.sectionType !== 'resume'
    }
  ]
}
```

---

### `project`

Case studies displayed in the Chrome/Browser app.

```typescript
{
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'summary', type: 'text', title: 'Summary', rows: 3 },
    { name: 'thumbnail', type: 'image', title: 'Thumbnail' },
    { name: 'coverImage', type: 'image', title: 'Cover Image' },

    // Category
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Radio Innovation', value: 'radio' },
          { title: 'Tech Projects', value: 'tech' },
          { title: 'Initiatives', value: 'initiative' },
          { title: 'Architecture', value: 'architecture' }
        ]
      }
    },

    // Technologies
    {
      name: 'technologies',
      type: 'array',
      title: 'Technologies',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },

    // Links
    { name: 'liveUrl', type: 'url', title: 'Live URL' },
    { name: 'githubUrl', type: 'url', title: 'GitHub URL' },

    // Architecture-inspired sections
    {
      name: 'context',
      type: 'array',
      title: 'Context',
      description: 'The problem/landscape',
      of: [{ type: 'block' }]
    },
    {
      name: 'concept',
      type: 'array',
      title: 'Concept',
      description: 'Vision and approach',
      of: [{ type: 'block' }]
    },
    {
      name: 'process',
      type: 'array',
      title: 'Process',
      description: 'Key decisions, iterations',
      of: [{ type: 'block' }]
    },
    {
      name: 'execution',
      type: 'array',
      title: 'Execution',
      description: 'Technical implementation',
      of: [{ type: 'block' }]
    },
    {
      name: 'result',
      type: 'array',
      title: 'Result',
      description: 'Outcomes, metrics',
      of: [{ type: 'block' }]
    },
    {
      name: 'reflection',
      type: 'array',
      title: 'Reflection',
      description: 'Lessons learned',
      of: [{ type: 'block' }]
    },

    // Media Gallery
    {
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [{ type: 'image' }]
    },

    // Meta
    { name: 'featured', type: 'boolean', title: 'Featured', initialValue: false },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'publishedAt', type: 'date', title: 'Published Date' }
  ]
}
```

---

### `skill`

Technical and professional skills.

```typescript
{
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    { name: 'name', type: 'string', title: 'Skill Name' },
    { name: 'icon', type: 'image', title: 'Icon' },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Languages', value: 'languages' },
          { title: 'Frameworks', value: 'frameworks' },
          { title: 'Tools', value: 'tools' },
          { title: 'Platforms', value: 'platforms' },
          { title: 'Media', value: 'media' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'proficiency',
      type: 'number',
      title: 'Proficiency (1-100)',
      validation: Rule => Rule.min(1).max(100)
    },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' }
  ]
}
```

---

### `education`

Education and certification entries.

```typescript
{
  name: 'education',
  type: 'document',
  title: 'Education',
  fields: [
    { name: 'institution', type: 'string', title: 'Institution' },
    { name: 'degree', type: 'string', title: 'Degree/Program' },
    { name: 'field', type: 'string', title: 'Field of Study' },
    { name: 'startYear', type: 'number', title: 'Start Year' },
    { name: 'endYear', type: 'number', title: 'End Year' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'logo', type: 'image', title: 'Logo' },
    { name: 'achievements', type: 'array', title: 'Achievements', of: [{ type: 'string' }] },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' }
  ]
}
```

---

### `experience`

Work history and career timeline.

```typescript
{
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    { name: 'title', type: 'string', title: 'Job Title' },
    { name: 'company', type: 'string', title: 'Company/Organization' },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'startDate', type: 'date', title: 'Start Date' },
    { name: 'endDate', type: 'date', title: 'End Date' },
    { name: 'current', type: 'boolean', title: 'Current Position', initialValue: false },
    { name: 'description', type: 'array', title: 'Description', of: [{ type: 'block' }] },
    { name: 'highlights', type: 'array', title: 'Key Highlights', of: [{ type: 'string' }] },
    { name: 'logo', type: 'image', title: 'Company Logo' },
    {
      name: 'experienceType',
      type: 'string',
      title: 'Type',
      options: {
        list: ['full-time', 'part-time', 'contract', 'freelance', 'military', 'volunteer']
      }
    },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' }
  ]
}
```

---

### `radioStream`

Icecast stream configuration.

```typescript
{
  name: 'radioStream',
  type: 'document',
  title: 'Radio Stream',
  fields: [
    { name: 'name', type: 'string', title: 'Station Name' },
    { name: 'shortName', type: 'string', title: 'Short Name (for UI)' },
    { name: 'streamUrl', type: 'url', title: 'Stream URL (Icecast)' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'logo', type: 'image', title: 'Station Logo' },
    { name: 'websiteUrl', type: 'url', title: 'Website URL' },

    // Spinitron mapping (if applicable)
    { name: 'spinitonStationId', type: 'string', title: 'Spinitron Station ID' },

    // Display
    { name: 'color', type: 'string', title: 'Brand Color (hex)' },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'active', type: 'boolean', title: 'Active', initialValue: true }
  ]
}
```

---

### `terminalCommand`

Custom terminal commands and responses.

```typescript
{
  name: 'terminalCommand',
  type: 'document',
  title: 'Terminal Command',
  fields: [
    { name: 'command', type: 'string', title: 'Command' },
    { name: 'aliases', type: 'array', title: 'Aliases', of: [{ type: 'string' }] },
    { name: 'description', type: 'string', title: 'Description (for help)' },
    {
      name: 'responseType',
      type: 'string',
      title: 'Response Type',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'ASCII Art', value: 'ascii' },
          { title: 'Table', value: 'table' },
          { title: 'Neofetch Style', value: 'neofetch' },
          { title: 'Dynamic (API)', value: 'dynamic' }
        ]
      }
    },
    {
      name: 'response',
      type: 'text',
      title: 'Response Text',
      rows: 10,
      hidden: ({ parent }) => parent?.responseType === 'dynamic'
    },
    {
      name: 'dynamicSource',
      type: 'string',
      title: 'Dynamic Source',
      description: 'API endpoint or data source',
      hidden: ({ parent }) => parent?.responseType !== 'dynamic'
    },
    { name: 'color', type: 'string', title: 'Output Color (hex)' },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' }
  ]
}
```

---

### `wallpaper`

Desktop wallpaper options.

```typescript
{
  name: 'wallpaper',
  type: 'document',
  title: 'Wallpaper',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'image', type: 'image', title: 'Image' },
    { name: 'thumbnail', type: 'image', title: 'Thumbnail (for picker)' },
    {
      name: 'style',
      type: 'string',
      title: 'Style',
      options: {
        list: ['fill', 'fit', 'stretch', 'tile', 'center']
      },
      initialValue: 'fill'
    },
    { name: 'sortOrder', type: 'number', title: 'Sort Order' },
    { name: 'isDefault', type: 'boolean', title: 'Is Default', initialValue: false }
  ]
}
```

---

## Object Types (Reusable)

### `socialLink`

```typescript
{
  name: 'socialLink',
  type: 'object',
  title: 'Social Link',
  fields: [
    {
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: [
          'github', 'linkedin', 'twitter', 'instagram',
          'substack', 'mixcloud', 'youtube', 'email', 'website', 'other'
        ]
      }
    },
    { name: 'url', type: 'url', title: 'URL' },
    { name: 'label', type: 'string', title: 'Custom Label' }
  ]
}
```

---

## Schema File Structure

```
/schemaTypes
├── index.ts              # Schema registry
├── singletons/
│   ├── siteSettings.ts
│   ├── bootSequence.ts
│   ├── playerConfig.ts
│   └── themeSettings.ts
├── documents/
│   ├── desktopApp.ts
│   ├── desktopShortcut.ts
│   ├── aboutSection.ts
│   ├── project.ts
│   ├── skill.ts
│   ├── education.ts
│   ├── experience.ts
│   ├── radioStream.ts
│   ├── terminalCommand.ts
│   └── wallpaper.ts
└── objects/
    └── socialLink.ts
```

---

## Sanity Studio Structure

```typescript
// sanity.config.ts structure suggestion
export default defineConfig({
  // ...
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Boot Sequence')
              .child(S.document().schemaType('bootSequence').documentId('bootSequence')),
            S.listItem()
              .title('Player Config')
              .child(S.document().schemaType('playerConfig').documentId('playerConfig')),
            S.listItem()
              .title('Theme Settings')
              .child(S.document().schemaType('themeSettings').documentId('themeSettings')),

            S.divider(),

            // Content
            S.documentTypeListItem('desktopApp').title('Desktop Apps'),
            S.documentTypeListItem('desktopShortcut').title('Desktop Shortcuts'),
            S.documentTypeListItem('aboutSection').title('About Sections'),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('skill').title('Skills'),
            S.documentTypeListItem('education').title('Education'),
            S.documentTypeListItem('experience').title('Experience'),
            S.documentTypeListItem('radioStream').title('Radio Streams'),
            S.documentTypeListItem('terminalCommand').title('Terminal Commands'),
            S.documentTypeListItem('wallpaper').title('Wallpapers'),
          ])
    })
  ]
})
```

---

## Initial Content Plan

### Boot Messages (Pre-populated)

```javascript
[
  { message: "Tuning frequencies", value: "88.9 FM", delay: 200 },
  { message: "Loading architecture blueprints", value: "Howard '96", delay: 200 },
  { message: "Syncing Rhythm Lab archives (2005-2025)", value: "20 years", delay: 200 },
  { message: "Initializing 88Nine Labs", value: "inclusive", delay: 200 },
  { message: "Connecting HYFIN streams", value: "urban alt", delay: 200 },
  { message: "Brewing \"This Bites\" recommendations", value: "delicious", delay: 200 },
  { message: "Loading creativity modules", value: "████████", delay: 200 },
  { message: "Signal Corps training complete", value: "hooah", delay: 200 },
  { message: "Establishing Milwaukee connection", value: "lakefront", delay: 300 }
]
```

### Default Desktop Shortcuts

| Title | Platform | URL |
|-------|----------|-----|
| GitHub | github | github.com/tmoody1973 |
| LinkedIn | linkedin | linkedin.com/in/tarikmoody |
| Substack | substack | tarikmoody.substack.com |
| Mixcloud | mixcloud | mixcloud.com/tmoody |
| 88Nine | website | radiomilwaukee.org |
| HYFIN | website | hyfin.org |
| Rhythm Lab | website | rhythmlabradio.com |

### Default Radio Streams

| Name | Short Name | Spinitron ID |
|------|------------|--------------|
| Rhythm Lab 24/7 | RHYTHM LAB | TBD |
| 88Nine Milwaukee | 88NINE MKE | TBD |
| HYFIN | HYFIN | TBD |

---

## Next Steps

1. Create Sanity project and install dependencies
2. Implement schema files
3. Configure Sanity Studio structure
4. Migrate existing hardcoded content
5. Set up GROQ queries for frontend

---

*Schema design document - Part of BMad Method workflow*
