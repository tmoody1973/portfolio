# Ubuntu Portfolio - Tarik Moody

A personal portfolio website styled as Ubuntu 20.04 desktop environment, built with Next.js 16, TypeScript, and Sanity CMS.

## Credits & Inspiration

This project is a fork and modernization of the incredible work by **[Vivek Patel](https://github.com/vivek9patel)**.

### Original Project
- **Repository**: [vivek9patel/vivek9patel.github.io](https://github.com/vivek9patel/vivek9patel.github.io)
- **Live Demo**: [vivek9patel.github.io](https://vivek9patel.github.io/)

Vivek created an amazing Ubuntu desktop simulation as a portfolio that inspired developers worldwide. This project builds upon his vision while adapting it for my own use case with modern tooling.

<a href="https://www.buymeacoffee.com/vivek9patel" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Vivek A Coffee" style="height: 40px !important;width: 140px !important;" ></a>

---

## What's Different

This fork introduces significant architectural changes while preserving the Ubuntu desktop aesthetic:

### Tech Stack Modernization
| Original | This Fork |
|----------|-----------|
| Next.js (Pages Router) | Next.js 16 (App Router) |
| JavaScript | TypeScript (strict mode) |
| CSS/Tailwind | Tailwind CSS v4 |
| Static content | Sanity CMS for content management |
| Class components | Mix of class components + React hooks |
| React 17/18 | React 19 |

### Architecture Changes
- **App Router**: Migrated from Pages Router to Next.js App Router with server components
- **TypeScript**: Full TypeScript implementation with strict typing
- **Sanity CMS Integration**: Content (bio, projects, skills, etc.) managed through Sanity Studio
- **ISR (Incremental Static Regeneration)**: Dynamic content with static performance
- **Zustand State Management**: Window state, boot sequence, and app state managed with Zustand
- **Component Library**: Restructured components for better separation of concerns

### New Features
- **Boot Sequence**: Custom ASCII boot animation with skippable sequence
- **CMS-Driven Content**: Update portfolio content without code changes
- **Desktop Shortcuts**: Configurable desktop icons with external links
- **Improved Accessibility**: Keyboard navigation, focus states, ARIA labels

### Content Customizations
- Personalized bio and journey timeline
- Custom project case studies
- Integration with personal social links (GitHub, LinkedIn)
- DJ/music streaming integration (planned)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Sanity account (for CMS)

### Installation

```bash
# Clone the repository
git clone https://github.com/tmoody1973/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity project credentials

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Optional: EmailJS for contact form
NEXT_PUBLIC_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_TEMPLATE_ID=template_fqqqb9g
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
```

### Scripts

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── studio/            # Sanity Studio route
│   └── page.tsx           # Main entry point
├── components/
│   ├── apps/              # Application components (Terminal, About, etc.)
│   ├── base/              # Base UI components (Window, Navbar)
│   ├── boot/              # Boot sequence components
│   ├── desktop/           # Desktop environment (Wallpaper, Shortcuts, Dock)
│   └── util components/   # Utility components
├── lib/
│   └── sanity/            # Sanity client and queries
├── sanity/
│   └── schemaTypes/       # Sanity schema definitions
├── store/                 # Zustand state stores
└── types/                 # TypeScript type definitions
```

---

## Sanity Studio

Access Sanity Studio at `/studio` to manage content:

- **Site Settings**: Global site configuration
- **Desktop Config**: Wallpapers, shortcuts
- **About Content**: Bio, journey, education, skills
- **Projects**: Case studies and portfolio items
- **Terminal**: Command responses

---

## Roadmap

- [x] Next.js 16 App Router migration
- [x] TypeScript implementation
- [x] Sanity CMS integration
- [x] Boot sequence animation
- [x] Desktop environment shell
- [ ] Dock component with app launchers
- [ ] Window management (drag, resize, minimize)
- [ ] Terminal application
- [ ] About application with tabs
- [ ] Projects/Case studies browser
- [ ] Audio player (Webamp integration)
- [ ] Mobile responsive experience

---

## Contributing

While this is a personal portfolio, suggestions and bug reports are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is open source, following the spirit of the original project by Vivek Patel.

## Acknowledgments

- **[Vivek Patel](https://github.com/vivek9patel)** - Original creator and inspiration
- [Yaru Theme](https://github.com/ubuntu/yaru) - Ubuntu icon theme assets
- [Next.js](https://nextjs.org/) - React framework
- [Sanity](https://www.sanity.io/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
