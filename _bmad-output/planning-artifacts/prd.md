---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
lastStep: 11
inputDocuments:
  - _bmad-output/planning-artifacts/brainstorm-ubuntu-portfolio.md
  - _bmad-output/planning-artifacts/sanity-schema-design.md
  - README.md
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 1
  schemaDesign: 1
  projectDocs: 1
workflowType: 'prd'
projectType: 'brownfield'
---

# Product Requirements Document - portfolio

**Author:** Tarikmoody
**Date:** 2026-01-01

## Executive Summary

Transform Tarik Moody's existing Ubuntu desktop-themed portfolio into a dynamic, CMS-driven personal brand platform that doesn't just display work—it invites visitors to experience the intersection of disciplines that defines his approach.

This brownfield project extends a forked Next.js portfolio with Sanity CMS integration, a functional Webamp audio player connected to live radio streams, and real-time API integrations that bring the portfolio to life. The result: a living portfolio where the UI itself tells the story of a multi-disciplinary creative professional spanning architecture, public radio, and technology.

### What Makes This Special

- **Living Portfolio**: Real-time integration with Spinitron (now playing), Mixcloud (show archives), and active radio streams transforms static content into a dynamic experience—visitors can actually listen to Rhythm Lab Radio
- **Onboarding as Storytelling**: The custom boot sequence with personalized messages ("Loading architecture blueprints... Howard '96") reveals the journey before the desktop even loads
- **Functional Nostalgia**: Ubuntu desktop + Winamp player aesthetic that actually works—the UI isn't decoration, it's an interface to Tarik's real work
- **Interactive Discovery**: Terminal commands (`whoami`, `journey`, `neofetch`) let visitors explore the story at their own pace
- **Content Ownership**: Sanity CMS provides editorial velocity—content changes deploy instantly without code changes

## Project Classification

**Technical Type:** web_app (SPA with progressive enhancement)
**Domain:** general (personal portfolio / media)
**Complexity:** medium
**Project Context:** Brownfield - extending existing Next.js Ubuntu portfolio

Key technical additions: Sanity CMS, Webamp audio player, Spinitron API, Mixcloud API, custom boot sequence animation, responsive design system.

## Success Criteria

### User Success

- **"Aha!" Moment**: Visitor realizes the Winamp player actually works and plays real radio streams
- **Engagement Depth**: Visitors explore 2+ apps/sections and stay 3+ minutes on site
- **Actions Taken**: Play the radio, explore terminal commands, initiate contact or follow on social platforms
- **Discovery Experience**: Visitors understand the multi-disciplinary identity (radio × architecture × technology) within the first 30 seconds

### Business Success

- **Career Opportunities**: Receive outreach for roles at innovative technology companies (e.g., Anthropic)
- **Speaking Invitations**: Conference and event invitations resulting from portfolio discovery
- **Professional Credibility**: Portfolio demonstrates technical capability, creative vision, and strategic thinking
- **Brand Recognition**: Visitors leave understanding "The Intersection" concept and Tarik's unique positioning

### Technical Success

| Metric | Target |
|--------|--------|
| Performance | Lighthouse score 90+ (desktop), 80+ (mobile) |
| Audio Reliability | Streams load and play within 3 seconds |
| CMS Effectiveness | Content updates live within 5 minutes, no deploys needed |
| Responsive Design | Functional experience across mobile, tablet, and desktop |
| Boot Sequence | Animation completes in < 5 seconds (or skippable) |
| API Reliability | Spinitron/Mixcloud integrations gracefully handle failures |

### Measurable Outcomes

- **3 Months Post-Launch**: Portfolio live with MVP features, content fully managed in Sanity, at least one professional inquiry attributed to portfolio
- **12 Months Post-Launch**: Full feature set deployed, measurable increase in speaking/collaboration requests, portfolio referenced in professional contexts

## Product Scope

### MVP - Minimum Viable Product

Core features required for launch:

- Sanity CMS integration (all content editable)
- Boot sequence animation with ASCII name and personalized messages
- Working Webamp player with at least 1 radio stream (Rhythm Lab 24/7)
- Desktop shortcuts for social links (GitHub, LinkedIn, Substack, etc.)
- About section with tabbed content (Bio, Journey, Education, Skills)
- Terminal with core commands (`whoami`, `help`, `clear`)
- Responsive layout (desktop, tablet, mobile)
- Contact form functionality

### Growth Features (Post-MVP)

Enhanced features for full experience:

- All 3 radio streams (Rhythm Lab, 88Nine, HYFIN)
- Spinitron now-playing integration with track metadata
- Mixcloud show archives (latest 5 episodes)
- Full terminal command set (`journey`, `neofetch`, `stations`, etc.)
- Custom Ubuntu-themed Winamp skin
- **Case studies in Chrome app** - GitHub/Claude Code projects with details, screenshots, architecture-inspired format (Context, Concept, Process, Execution, Result, Reflection)

### Vision (Future)

Long-term enhancements:

- Substack RSS integration (latest posts from "The Intersection")
- GitHub activity feed
- Theme/wallpaper picker in Settings app
- Additional case studies and project documentation
- Analytics dashboard for content performance

## User Journeys

### Journey 1: Maya Chen, Senior Recruiter at Anthropic - "Finally, Someone Different"

Maya is a senior recruiter at Anthropic, exhausted from reviewing hundreds of engineering portfolios that all look the same—dark mode, project cards, GitHub stats. She's specifically looking for candidates who can bridge technical and creative thinking for a new role combining developer advocacy with product strategy.

A colleague mentions "this guy with the Ubuntu portfolio who does radio and builds with Claude Code" and shares the link. Maya clicks, expecting another gimmick.

She's greeted by a boot sequence: "Loading architecture blueprints... Howard '96" — wait, architecture? Then "Syncing Rhythm Lab archives (2005-2025)... 20 years" — this person has been in radio for 20 years? The Ubuntu desktop loads and Maya sees a Winamp player. She clicks play almost reflexively—and actual music starts streaming. This isn't a mockup.

She opens the About app. The tabs reveal a journey: architecture degree from Howard, Army Signal Corps, practiced architecture in Detroit and Minneapolis, then somehow ended up directing innovation at a radio station in Milwaukee. The terminal catches her eye. She types `whoami` and gets a personality-driven response that makes her smile.

Maya opens the Chrome app and finds case studies on Claude Code projects—actual technical depth with architecture-inspired documentation (Context, Concept, Process, Execution, Result). She sees someone who can build AND think strategically about why they're building.

She bookmarks the portfolio, screenshots the terminal output, and drafts an outreach email before her coffee gets cold. This is exactly the kind of multi-dimensional thinker Anthropic needs.

### Journey 2: Marcus Webb, Program Director at SXSW Interactive - "We Need a Fresh Voice"

Marcus is putting together the speaker lineup for SXSW Interactive's track on AI and creativity. He's drowning in pitches from the usual suspects—VCs, startup founders, and tech journalists who all say the same things. His co-curator mentions a Substack article about AI in radio from someone named Tarik Moody. The link leads to a portfolio.

The Ubuntu interface immediately signals this isn't a typical tech person. Marcus is intrigued. The boot sequence mentions "88Nine Labs" and "HYFIN streams"—he doesn't know what those are, but they sound real, not buzzwordy.

He plays the Rhythm Lab Radio stream while exploring. The About section reveals someone who's been breaking new artists for 20 years—Lianne La Havas, Kamasi Washington, The Internet—before they blew up. This is a tastemaker, not a trend-chaser.

The terminal command `88ninelabs` reveals a tech inclusivity initiative. The case studies show Claude Code projects with thoughtful reflection on AI as a creative tool. Marcus realizes this is someone who's actually integrating AI into creative work, not just theorizing about it.

He types `journey` in the terminal and sees the career arc: Louisville → Atlanta → Detroit → Minneapolis → Milwaukee. Architecture to radio to innovation. This is a story that would resonate at SXSW—someone who's lived the intersection of technology and culture for decades.

Marcus adds Tarik to his shortlist and drafts a speaker invitation pitch about "AI, Radio, and the Future of Cultural Curation."

### Journey 3: Deja Williams, Music Blogger - "Wait, What Is This?"

Deja is a music blogger who follows Rhythm Lab Radio on Mixcloud. She notices a new episode and clicks through to check the tracklist. A link in the episode description mentions "the new portfolio" and she clicks out of curiosity.

An Ubuntu desktop loads. Deja hasn't seen this operating system since her college computer lab. Before she can figure out what's happening, a Winamp player catches her eye—actual Winamp, like from the early 2000s. She clicks play and Rhythm Lab starts streaming. Okay, this is actually cool.

She spots desktop icons for Mixcloud and Substack—familiar territory. But there's also a Terminal icon. She clicks it, not sure what to expect. A command prompt appears. She types `help` and gets a list of commands. `rhythm-lab --now-playing` shows the current track from Spinitron. She didn't know you could do that.

The About app reveals the person behind the radio show she's been following—Director of Strategy and Innovation, architecture background, Army veteran, launched an urban alternative station called HYFIN. The journey from buildings to broadcasting suddenly makes the show's eclectic curation make more sense.

Deja finds herself spending 20 minutes exploring instead of the 2 minutes she planned. She screenshots the terminal and tweets: "Just discovered that the Rhythm Lab Radio guy has an Ubuntu portfolio where you can actually play the stream in a Winamp player. The internet is still good sometimes." She follows him on Substack and adds HYFIN to her streaming rotation.

### Journey Requirements Summary

These journeys reveal capabilities needed for the portfolio:

| Journey | Key Capabilities Required |
|---------|---------------------------|
| **Recruiter (Maya)** | Boot sequence storytelling, working audio player, About tabs with career depth, Terminal personality, Case studies with technical detail |
| **Conference Organizer (Marcus)** | Substack connection, Terminal commands revealing initiatives, Journey narrative, Professional credibility signals |
| **Curious Discoverer (Deja)** | Immediate audio playback, Familiar social links, Discoverable terminal commands, Shareable moments, Low friction exploration |

**Common Requirements Across All Journeys:**

- Boot sequence that reveals identity before desktop loads
- Working Webamp player (not a mockup—real streaming)
- Terminal with personality-driven responses
- About section with clear career narrative
- Case studies demonstrating technical + strategic thinking
- Social links for continued connection
- Content that rewards exploration

## Web App Technical Requirements

### Browser Support

| Browser | Support Level |
|---------|---------------|
| Chrome (latest 2 versions) | Full support |
| Firefox (latest 2 versions) | Full support |
| Safari (latest 2 versions) | Full support |
| Edge (latest 2 versions) | Full support |
| Mobile Safari (iOS 15+) | Full support |
| Chrome Mobile (Android 10+) | Full support |

### Responsive Design Approach

| Breakpoint | Experience |
|------------|------------|
| Desktop (1200px+) | Full Ubuntu desktop simulation with multiple windows, dock, draggable apps |
| Tablet (768px - 1199px) | Simplified desktop, single window focus, touch-optimized controls |
| Mobile (< 768px) | App drawer/list view, bottom navigation, optimized audio player |

### Progressive Enhancement Strategy

- **Core Experience**: Bio, work history, and contact info accessible without JavaScript
- **Enhanced Experience**: Boot sequence, desktop simulation, Webamp player require JavaScript
- **Graceful Degradation**: Fallback content for audio player if Webamp fails to load
- **SEO Foundation**: Meta tags, Open Graph, structured data for professional indexing

### Real-Time Features

- Spinitron API polling for now-playing data (30-second intervals)
- Webamp streaming via Icecast URLs (connection state management)
- Mixcloud API integration for show archives (cached, refreshed hourly)

### Offline Considerations

- Static content cached via service worker (future enhancement)
- Audio streams require active internet connection
- CMS content served via CDN for fast global delivery

## Functional Requirements

### Content Management

- FR1: Site owner can edit all text content (bio, about sections, journey timeline) via Sanity Studio
- FR2: Site owner can add, edit, and reorder desktop shortcuts and their URLs
- FR3: Site owner can configure boot sequence messages and timing
- FR4: Site owner can manage terminal command responses
- FR5: Site owner can add and edit case study projects with rich content
- FR6: Site owner can upload and manage wallpaper images
- FR7: Site owner can configure radio stream URLs and metadata

### Boot Sequence

- FR8: Visitors see animated ASCII name display on initial page load
- FR9: Visitors see personalized boot messages that reveal professional journey
- FR10: Visitors can skip boot sequence after first view (localStorage preference)
- FR11: Boot sequence completes and transitions to desktop within configured time

### Desktop Environment

- FR12: Visitors see Ubuntu-styled desktop with dock and icons
- FR13: Visitors can click desktop shortcuts to open external links in new tabs
- FR14: Visitors can open apps in desktop windows (About, Terminal, Chrome, Player)
- FR15: Visitors can minimize, maximize, and close app windows
- FR16: Visitors can reposition app windows via drag (desktop only)

### Audio Player (Webamp)

- FR17: Visitors can play/pause radio streams via Webamp interface
- FR18: Visitors can switch between available radio stations
- FR19: Visitors can adjust volume with visual feedback
- FR20: Visitors see current track metadata when available (Spinitron integration)
- FR21: Visitors see recent tracks list when available
- FR22: Visitors can access Mixcloud show archives from player interface

### About Application

- FR23: Visitors can view bio/introduction content
- FR24: Visitors can view career journey timeline
- FR25: Visitors can view education and credentials
- FR26: Visitors can view skills and expertise areas
- FR27: Visitors can navigate between about sections via tabs

### Terminal Application

- FR28: Visitors can type commands in terminal interface
- FR29: Visitors receive responses to recognized commands (`whoami`, `help`, `clear`, etc.)
- FR30: Visitors see helpful error messages for unrecognized commands
- FR31: Terminal displays personality-consistent responses reflecting Tarik's voice
- FR32: Visitors can view command history and use arrow keys to navigate

### Case Studies (Chrome App)

- FR33: Visitors can browse list of featured projects
- FR34: Visitors can view individual case study with full details
- FR35: Case studies display in architecture-inspired format (Context, Concept, Process, Execution, Result, Reflection)
- FR36: Case studies include screenshots and visual assets
- FR37: Visitors can navigate between case studies

### Contact & Social

- FR38: Visitors can access contact form or email link
- FR39: Visitors can access all social platform links (GitHub, LinkedIn, Substack, X, etc.)
- FR40: Desktop shortcuts provide quick access to social profiles

### Responsive Experience

- FR41: Mobile visitors can access all content via app drawer/list navigation
- FR42: Mobile visitors can use simplified audio player controls
- FR43: Tablet visitors see optimized single-window desktop experience
- FR44: All interactive elements are touch-friendly on mobile devices

## Non-Functional Requirements

### Performance

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | 90+ (desktop), 80+ (mobile) |
| First Contentful Paint | < 1.5 seconds |
| Time to Interactive | < 3.5 seconds |
| Audio Stream Load Time | < 3 seconds to first audio |
| Boot Sequence Duration | < 5 seconds (skippable) |

### Reliability

- Sanity CMS content served via CDN with 99.9% uptime
- Graceful degradation when Spinitron/Mixcloud APIs unavailable
- Fallback UI states for failed audio stream connections
- Error boundaries prevent single component failures from crashing app

### Accessibility

| Standard | Target |
|----------|--------|
| WCAG Level | 2.1 AA compliance for core content |
| Keyboard Navigation | Full keyboard accessibility for all interactive elements |
| Screen Reader | Alt text for images, ARIA labels for interactive components |
| Color Contrast | 4.5:1 minimum for text |

### Security

- HTTPS-only deployment
- Sanity Studio authentication for content management
- No sensitive data stored client-side
- CSP headers to prevent XSS

### Maintainability

- All content editable via Sanity Studio without code changes
- TypeScript for type safety across codebase
- Component-based architecture for reusability
- Clear separation between content (Sanity) and presentation (Next.js)

## Constraints & Assumptions

### Constraints

- **Existing Codebase**: Building on forked Next.js Ubuntu portfolio; must maintain compatibility with existing structure
- **Icecast Streams**: Audio streams dependent on external Icecast servers (88Nine infrastructure)
- **API Rate Limits**: Spinitron and Mixcloud APIs have rate limits requiring caching strategy
- **Browser Audio Policies**: Autoplay restrictions require user interaction before audio playback

### Assumptions

- Stream URLs for Rhythm Lab 24/7, 88Nine, and HYFIN will be provided
- Spinitron API access is available for Rhythm Lab Radio metadata
- Sanity free tier sufficient for portfolio content volume
- Vercel free/hobby tier sufficient for hosting requirements

### Dependencies

| Dependency | Purpose | Risk Level |
|------------|---------|------------|
| Sanity CMS | Content management | Low (established platform) |
| Webamp | Audio player | Medium (community maintained) |
| Spinitron API | Now playing metadata | Medium (third-party service) |
| Mixcloud API | Show archives | Low (public API) |
| Vercel | Hosting | Low (industry standard) |

---

*PRD completed via BMad Method collaborative workflow on 2026-01-01*
