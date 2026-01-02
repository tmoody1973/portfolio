# Brainstorm: Sanity-Powered Ubuntu Portfolio

**Project:** portfolio
**Date:** 2026-01-01
**Author:** Tarik Moody
**Facilitated by:** Claude Code (BMad Method)

---

## Executive Summary

Transform the existing Ubuntu desktop-themed portfolio into a dynamic, CMS-driven personal brand platform powered by Sanity. This portfolio will serve as a digital home for Tarik Moody - a multi-disciplinary creative professional spanning public radio, architecture, technology, and music curation.

---

## The Tarik Moody Profile

### Professional Identity

| Domain | Role/Details |
|--------|--------------|
| **Current Role** | Director of Strategy & Innovation, 88Nine Radio Milwaukee |
| **Radio Show** | Creator & Host, Rhythm Lab Radio (Since 2005, nationally syndicated) |
| **HYFIN** | Program Director, Urban Alternative Station (Launched 2022) |
| **88Nine Labs** | Founder (2018) - Tech inclusivity for underrepresented communities |
| **Podcast** | Co-host, "This Bites" - Milwaukee's longest-running culinary podcast |
| **Writing** | "The Intersection" on Substack - Media innovation, civic tech, AI, Black entrepreneurship |
| **Education** | Howard University, School of Architecture (1996), Army ROTC |
| **Military** | 14 years Army Reserves - Signal Officer, Public Affairs |
| **Architecture** | Practiced in Detroit and Minneapolis |

### Origin Story

Louisville, KY (born) → Atlanta (raised) → Detroit (architecture) → Minneapolis (architecture + radio) → Milwaukee (current)

### Notable Achievements

- First to play: Lianne La Havas, Michael Kiwanuka, The Internet, Kamasi Washington
- Syndicated in: Philadelphia (WXPN), Chicago (Vocalo/WBEZ), Norfolk, Rochester, Ithaca, Raleigh-Durham
- AI Partnership with Super Hi-Fi for 24/7 Rhythm Lab stream
- Created "Unlooped" artist series (Marvin Gaye, Stevie Wonder reimagined)

---

## Brand Identity

### Tagline Options

- "Radio × Architecture × Technology"
- "Building at the intersection of culture, technology, and sound"
- "The Intersection: Where culture meets innovation"

### Visual Identity

- **Primary Color:** Milwaukee Blue (`#0072CE`)
- **Secondary:** Ubuntu Orange (`#E95420`)
- **Background:** Ubuntu Charcoal (`#2C2C2C`, `#3D3D3D`)
- **Accent:** Cream City Cream (`#F5F1E6`)

### Location

Milwaukee, WI - Featured in wallpaper (city skyline)

---

## Boot Sequence Design

### ASCII Art Name

```
▀█▀ ▄▀█ █▀█ █ █▄▀   █▀▄▀█ █▀█ █▀█ █▀▄ █▄█
 █  █▀█ █▀▄ █ █ █   █ ▀ █ █▄█ █▄█ █▄▀  █
```

Or stacked heavy version:

```
████████╗ █████╗ ██████╗ ██╗██╗  ██╗
╚══██╔══╝██╔══██╗██╔══██╗██║██║ ██╔╝
   ██║   ███████║██████╔╝██║█████╔╝
   ██║   ██╔══██║██╔══██╗██║██╔═██╗
   ██║   ██║  ██║██║  ██║██║██║  ██╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

███╗   ███╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗
████╗ ████║██╔═══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝
██╔████╔██║██║   ██║██║   ██║██║  ██║ ╚████╔╝
██║╚██╔╝██║██║   ██║██║   ██║██║  ██║  ╚██╔╝
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝██████╔╝   ██║
╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝    ╚═╝
```

### Animation Style

- **Phase 1:** Glitch scramble (0.5s) - characters flicker/scramble
- **Phase 2:** Typing effect (2s) - letters type in with occasional glitch
- **Phase 3:** Settle - clean final state

### Boot Messages

```
[OK] Tuning frequencies....................... 88.9 FM
[OK] Loading architecture blueprints........... Howard '96
[OK] Syncing Rhythm Lab archives (2005-2025)... 20 years
[OK] Initializing 88Nine Labs.................. inclusive
[OK] Connecting HYFIN streams.................. urban alt
[OK] Brewing "This Bites" recommendations...... delicious
[OK] Loading creativity modules................ ████████
[OK] Signal Corps training complete............ hooah
[OK] Establishing Milwaukee connection......... lakefront
```

### Colors

- Milwaukee Blue (`#0072CE`) for LCD/text
- Boot messages in terminal green or Milwaukee blue
- Ubuntu orange accents

---

## Desktop App Ecosystem

### Core Apps (Open in Desktop Window)

| App ID | Title | Purpose | Content Source |
|--------|-------|---------|----------------|
| `about-tarik` | About Tarik | Full bio, journey, skills | Sanity |
| `rhythm-lab` | Rhythm Lab Radio | Winamp player with streams | Webamp + Spinitron |
| `chrome` | Chrome | Case studies viewer | Sanity projects |
| `terminal` | Terminal | Interactive personality | Sanity commands |
| `settings` | Settings | Themes, wallpapers | Sanity |
| `contact` | Contact Me | Get in touch | Sanity + form |
| `trash` | Trash | Easter egg | Static |

### Desktop Shortcuts (External Links)

| Icon | Title | URL | Type |
|------|-------|-----|------|
| GitHub | GitHub | github.com/tmoody1973 | External |
| LinkedIn | LinkedIn | linkedin.com/in/tarikmoody | External |
| X | X/Twitter | TBD | External |
| Instagram | Instagram | TBD | External |
| Substack | The Intersection | tarikmoody.substack.com | External |
| Mixcloud | Mixcloud | mixcloud.com/tmoody | External |
| 88Nine | 88Nine | radiomilwaukee.org | External |
| HYFIN | HYFIN | hyfin.org | External |
| Rhythm Lab | Rhythm Lab | rhythmlabradio.com | External |
| Email | Email Me | mailto:TBD | Email |

---

## Winamp Player (Rhythm Lab Radio App)

### Overview

Use Webamp (npm package) to create an authentic Winamp player inside the Ubuntu desktop.

### Streams (Icecast Compatible)

| Station | Description | Stream URL |
|---------|-------------|------------|
| Rhythm Lab 24/7 | 24/7 curated stream | TBD |
| 88Nine Milwaukee | Full station live | TBD |
| HYFIN | Urban alternative | TBD |

### Features

- **Webamp Core:** Full Winamp 2.x functionality
- **Custom Skin:** Ubuntu-themed with Milwaukee blue LCD
- **Visualizer:** Milkdrop via Butterchurn
- **Equalizer:** Animated frequency bars
- **Now Playing:** Overlay with Spinitron API data
- **Recent Tracks:** Last 5 tracks from Spinitron
- **Show Archives:** Latest 5 shows from Mixcloud API

### Visual Design

```
╔════════════════════════════════════════════════════════════════╗
║░░░░░░░░░░░░░░░░░ RHYTHM LAB RADIO ░░░░░░░░░░░░░░░░░░░ ─ □ ✕  ║
╠════════════════════════════════════════════════════════════════╣
║  [VISUALIZER - Animated frequency bars]                        ║
║                                                                ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ║
║  ┃  ♫ ARTIST - TRACK TITLE                                 ┃ ║
║  ┃  ALBUM NAME (YEAR)                                      ┃ ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ║
║                                                                ║
║  ┌─ STATIONS ─────────────────────────────────────────────┐  ║
║  │  ◉ RHYTHM LAB    ○ 88NINE MKE    ○ HYFIN              │  ║
║  └────────────────────────────────────────────────────────┘  ║
║                                                                ║
║       ◄◄     ▶▶     ►►       ━━━━━━━━━●━━━━━  🔊 ████░     ║
║                                                                ║
║  [EQUALIZER - Animated bars]                                   ║
║                                                                ║
║  ┌─ RECENT TRACKS ────────────────────────────────────────┐  ║
║  │  ▸ Current Track                               NOW    │  ║
║  │    Previous Track                             3m ago  │  ║
║  │    Earlier Track                              7m ago  │  ║
║  └────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ┌─ SHOW ARCHIVES ─────────────────────────── [MIXCLOUD] ─┐  ║
║  │  ▶ Latest Episode                            2:04:32  │  ║
║  │    Previous Episode                          2:12:15  │  ║
║  │  [View All Episodes →]                                 │  ║
║  └────────────────────────────────────────────────────────┘  ║
╚════════════════════════════════════════════════════════════════╝
```

### Technical Implementation

- **Package:** `webamp` from npm
- **Streams:** Icecast URLs configured in Sanity
- **Metadata:** Spinitron API for now playing
- **Archives:** Mixcloud API for show history
- **Skin:** Custom `.wsz` file with Ubuntu theme

---

## Terminal Commands

### Core Commands

```bash
$ whoami
→ Tarik Moody
  Director of Strategy & Innovation @ 88Nine Radio Milwaukee
  Creator & Host, Rhythm Lab Radio (Since 2005)
  Founder, 88Nine Labs
  Writer, "The Intersection"

  Howard '96 | Army Signal Corps | Architect turned Innovator

$ education
→ Howard University, School of Architecture (1996)
  Army ROTC Scholarship
  14 years Army Reserves - Signal Officer, Public Affairs

$ journey
→ Timeline from architecture to radio to innovation

$ rhythm-lab --now-playing
→ Current track from Spinitron

$ stations
→ List of syndicated markets

$ 88ninelabs
→ Info about 88Nine Labs initiative

$ this-bites
→ Info about culinary podcast

$ cat intersection.md
→ Substack newsletter description

$ neofetch
→ Stylized system info with career stats
```

---

## About Section Structure

### Sections (Tabs)

1. **About Me** - Bio, intro, current focus
2. **Journey** - Timeline: Architecture → Radio → Innovation
3. **Education** - Howard, Army, career milestones
4. **Skills** - Technical and professional skills
5. **Projects** - Case studies (links to Chrome app)
6. **Resume** - PDF viewer or structured data

---

## Case Studies (Chrome App)

### Format

Architecture-inspired presentation:

1. **Context** - The problem/landscape
2. **Concept** - Vision and approach
3. **Process** - Key decisions, iterations
4. **Execution** - Technical implementation
5. **Result** - Outcomes, metrics
6. **Reflection** - Lessons learned

### Project Categories

- **Radio Innovation:** Super Hi-Fi partnership, syndication strategy, HYFIN launch
- **Tech Projects:** Claude Code builds, rhythm-lab-app, portfolio
- **Initiatives:** 88Nine Labs, Unlooped series

---

## Content from Existing Sources

### Rhythm Lab App (github.com/tmoody1973/rhythm-lab-app)

**Tech Stack:**
- Next.js 15.5.3, React 19, TypeScript
- Supabase, Clerk, Storyblok
- Algolia search
- Perplexity AI, OpenAI, Anthropic
- Spinitron, Mixcloud, Discogs, Spotify, YouTube APIs
- Vercel hosting

**Reusable Components:**
- Spinitron integration hooks
- Mixcloud API functions
- Audio player components
- Search functionality

### Substack: The Intersection

Topics covered:
- Media innovation
- Civic technology
- Black entrepreneurship
- AI applications
- Design & food culture
- Technology serving community

---

## External Integrations

| Service | Purpose | API |
|---------|---------|-----|
| **Spinitron** | Now playing, recent tracks | REST API (have access) |
| **Mixcloud** | Show archives | Public API |
| **Substack** | Blog posts | RSS feed |
| **GitHub** | Code activity | REST API |

---

## Sanity CMS Content Types

### Singletons

- `siteSettings` - Name, bio, social links, meta
- `bootSequence` - ASCII art, messages, animation config
- `playerConfig` - Streams, default volume, features
- `themeSettings` - Colors, default wallpaper

### Documents

- `aboutSection` - About page tabs/sections
- `project` - Case studies
- `skill` - Technical skills
- `education` - Education entries
- `experience` - Work history
- `desktopApp` - App registry
- `desktopShortcut` - External links
- `wallpaper` - Background images
- `terminalCommand` - Custom commands
- `radioStream` - Icecast stream config
- `mixcloudShow` - Featured shows (optional, can pull from API)

---

## Responsive Design

### Desktop (1200px+)
- Full Ubuntu desktop simulation
- All apps and features available
- Multiple windows open

### Tablet (768px - 1199px)
- Simplified desktop
- 3-column icon grid
- Single window focus

### Mobile (< 768px)
- App drawer/list view
- Bottom navigation
- Optimized player

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  PORTFOLIO (Next.js 15)                                         │
│  ├── Sanity CMS (Content)                                       │
│  ├── Webamp (Audio Player)                                      │
│  ├── Tailwind CSS (Styling)                                     │
│  └── Vercel (Hosting)                                           │
│                                                                  │
│  INTEGRATIONS                                                    │
│  ├── Spinitron API (Now Playing)                                │
│  ├── Mixcloud API (Archives)                                    │
│  ├── Substack RSS (Blog)                                        │
│  └── GitHub API (Activity)                                      │
│                                                                  │
│  EXISTING ECOSYSTEM                                              │
│  ├── rhythmlabradio.com (Full app - rhythm-lab-app)            │
│  ├── radiomilwaukee.org (88Nine)                                │
│  └── hyfin.org (HYFIN station)                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Success Metrics

- **Brand Expression:** Portfolio reflects multi-disciplinary identity
- **Engagement:** Visitors explore multiple apps/sections
- **Functionality:** Winamp player works smoothly with all streams
- **Maintainability:** All content manageable via Sanity Studio
- **Performance:** Fast load times, smooth animations

---

## Open Questions / TBDs

1. **Stream URLs:** Need Icecast URLs for all 3 streams
2. **Social handles:** Confirm X, Instagram, etc.
3. **Email:** Confirm contact email
4. **Architecture work:** Include past architecture projects?
5. **Speaking/consulting:** Include availability section?

---

## Next Steps

1. ✅ Brainstorm complete
2. → Design Sanity schemas
3. → Create PRD
4. → Architecture document
5. → Implementation

---

*Generated as part of BMad Method workflow-init brainstorming session*
