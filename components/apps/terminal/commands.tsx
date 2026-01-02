'use client'

import React from 'react'

/**
 * Command response type
 */
export interface CommandResponse {
  output: React.ReactNode
  action?: 'clear' | 'exit' | 'open-app'
  appToOpen?: string
}

/**
 * Available commands with personality-driven responses for Tarik's portfolio
 */
export const COMMANDS: Record<string, (args: string[]) => CommandResponse> = {
  // Core commands
  help: () => ({
    output: (
      <div className="space-y-2">
        <div className="text-green-400">Available commands:</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 ml-2">
          <div><span className="text-yellow-400">whoami</span> - Who is Tarik?</div>
          <div><span className="text-yellow-400">help</span> - Show this help</div>
          <div><span className="text-yellow-400">clear</span> - Clear terminal</div>
          <div><span className="text-yellow-400">journey</span> - Career path</div>
          <div><span className="text-yellow-400">neofetch</span> - System info</div>
          <div><span className="text-yellow-400">stations</span> - Radio streams</div>
          <div><span className="text-yellow-400">88ninelabs</span> - Tech initiative</div>
          <div><span className="text-yellow-400">skills</span> - Technical skills</div>
          <div><span className="text-yellow-400">contact</span> - Get in touch</div>
          <div><span className="text-yellow-400">social</span> - Social links</div>
          <div><span className="text-yellow-400">about</span> - Open About app</div>
          <div><span className="text-yellow-400">projects</span> - Open Projects</div>
          <div><span className="text-yellow-400">echo</span> - Echo text</div>
          <div><span className="text-yellow-400">date</span> - Current date</div>
          <div><span className="text-yellow-400">exit</span> - Close terminal</div>
        </div>
        <div className="text-white/50 mt-2 text-xs">Tip: Use arrow keys to navigate command history</div>
      </div>
    ),
  }),

  whoami: () => ({
    output: (
      <div className="space-y-2">
        <div className="text-cyan-400 font-bold">Tarik Moody</div>
        <div className="text-white/80">
          Product-minded engineer. Radio DJ. Builder of things that connect people to culture.
        </div>
        <div className="text-white/60 mt-2">
          I craft digital experiences at the intersection of technology and creativity.
          Currently exploring how AI can amplify human expression, not replace it.
        </div>
        <div className="text-white/40 mt-2 text-sm">
          Based in NYC | Building 88ninelabs | Spinning vinyl on Rhythm Lab Radio
        </div>
      </div>
    ),
  }),

  clear: () => ({
    output: '',
    action: 'clear',
  }),

  exit: () => ({
    output: 'Closing terminal...',
    action: 'exit',
  }),

  // Extended commands
  journey: () => ({
    output: (
      <div className="space-y-3">
        <div className="text-green-400 font-bold">Career Journey</div>
        <div className="space-y-2 ml-2">
          <div className="flex items-start gap-2">
            <span className="text-yellow-400">2023-Present</span>
            <span className="text-white/40">|</span>
            <span>Founder @ 88ninelabs - Building AI-powered tools for creators</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400">2020-2023</span>
            <span className="text-white/40">|</span>
            <span>Senior Engineer @ Various - Full-stack product development</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400">2015-Present</span>
            <span className="text-white/40">|</span>
            <span>DJ/Host @ Rhythm Lab Radio - Curating sonic experiences</span>
          </div>
        </div>
        <div className="text-white/50 text-sm mt-2">
          Type &apos;about&apos; to open the full About app with detailed timeline
        </div>
      </div>
    ),
  }),

  neofetch: () => ({
    output: (
      <div className="flex gap-8">
        <pre className="text-orange-500 text-xs leading-tight">
{`         _____
        /     \\
       /       \\
      |  O   O  |
      |    ^    |
       \\  ---  /
        \\_____/`}
        </pre>
        <div className="space-y-1 text-sm">
          <div><span className="text-cyan-400">tarik</span>@<span className="text-cyan-400">portfolio</span></div>
          <div className="text-white/30">-----------------</div>
          <div><span className="text-yellow-400">OS:</span> Ubuntu Portfolio 3.0</div>
          <div><span className="text-yellow-400">Host:</span> NYC, Planet Earth</div>
          <div><span className="text-yellow-400">Kernel:</span> Next.js 16 + React 19</div>
          <div><span className="text-yellow-400">Uptime:</span> Since 1989</div>
          <div><span className="text-yellow-400">Packages:</span> TypeScript, Zustand, Sanity</div>
          <div><span className="text-yellow-400">Shell:</span> zsh (obviously)</div>
          <div><span className="text-yellow-400">Theme:</span> Ubuntu Yaru Dark</div>
          <div><span className="text-yellow-400">Music:</span> Jazz, Soul, Electronic, Global</div>
        </div>
      </div>
    ),
  }),

  stations: () => ({
    output: (
      <div className="space-y-2">
        <div className="text-green-400 font-bold">Available Radio Streams</div>
        <div className="space-y-1 ml-2">
          <div className="flex gap-2">
            <span className="text-yellow-400">[1]</span>
            <span>Rhythm Lab 24/7 - Global sounds, always on</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-400">[2]</span>
            <span>WBGO Jazz 88.3 - Newark&apos;s jazz station</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-400">[3]</span>
            <span>NTS Radio - London underground</span>
          </div>
        </div>
        <div className="text-white/50 text-sm mt-2">
          Open the Music Player app to start listening
        </div>
      </div>
    ),
  }),

  '88ninelabs': () => ({
    output: (
      <div className="space-y-2">
        <div className="text-purple-400 font-bold">88ninelabs</div>
        <div className="text-white/80">
          A creative technology lab exploring the intersection of AI, music, and culture.
        </div>
        <div className="text-white/60 mt-2">
          Current projects:
        </div>
        <div className="ml-2 space-y-1">
          <div>- AI-powered music discovery tools</div>
          <div>- Open-source creative infrastructure</div>
          <div>- Community-driven radio platforms</div>
        </div>
        <div className="text-cyan-400 mt-2 text-sm">
          https://88ninelabs.com
        </div>
      </div>
    ),
  }),

  skills: () => ({
    output: (
      <div className="space-y-2">
        <div className="text-green-400 font-bold">Technical Skills</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 ml-2">
          <div><span className="text-yellow-400">Frontend:</span> React, Next.js, TypeScript</div>
          <div><span className="text-yellow-400">Backend:</span> Node.js, Python, PostgreSQL</div>
          <div><span className="text-yellow-400">AI/ML:</span> OpenAI, LangChain, RAG</div>
          <div><span className="text-yellow-400">Audio:</span> Web Audio API, Streaming</div>
          <div><span className="text-yellow-400">CMS:</span> Sanity, Contentful</div>
          <div><span className="text-yellow-400">Cloud:</span> Vercel, AWS, Railway</div>
        </div>
      </div>
    ),
  }),

  contact: () => ({
    output: (
      <div className="space-y-2">
        <div className="text-green-400 font-bold">Get In Touch</div>
        <div className="ml-2 space-y-1">
          <div><span className="text-yellow-400">Email:</span> hello@tarikmoody.com</div>
          <div><span className="text-yellow-400">Twitter/X:</span> @tarikmoody</div>
          <div><span className="text-yellow-400">LinkedIn:</span> /in/tarikmoody</div>
        </div>
        <div className="text-white/50 text-sm mt-2">
          Always open to interesting conversations and collaborations
        </div>
      </div>
    ),
  }),

  social: () => ({
    output: (
      <div className="space-y-2">
        <div className="text-green-400 font-bold">Social Links</div>
        <div className="ml-2 space-y-1">
          <div><span className="text-cyan-400">GitHub:</span> github.com/tarikmoody</div>
          <div><span className="text-cyan-400">LinkedIn:</span> linkedin.com/in/tarikmoody</div>
          <div><span className="text-cyan-400">Twitter:</span> x.com/tarikmoody</div>
          <div><span className="text-cyan-400">Substack:</span> tarikmoody.substack.com</div>
          <div><span className="text-cyan-400">Mixcloud:</span> mixcloud.com/rhythmlab</div>
        </div>
      </div>
    ),
  }),

  // App launchers
  about: () => ({
    output: 'Opening About app...',
    action: 'open-app',
    appToOpen: 'about',
  }),

  projects: () => ({
    output: 'Opening Projects app...',
    action: 'open-app',
    appToOpen: 'chrome',
  }),

  // Utility commands
  echo: (args: string[]) => ({
    output: args.join(' ') || '',
  }),

  date: () => ({
    output: new Date().toString(),
  }),

  pwd: () => ({
    output: '/home/tarik',
  }),

  ls: () => ({
    output: (
      <div className="flex flex-wrap gap-4">
        <span className="text-blue-400">projects/</span>
        <span className="text-blue-400">music/</span>
        <span className="text-blue-400">writings/</span>
        <span className="text-green-400">README.md</span>
        <span className="text-green-400">.bashrc</span>
      </div>
    ),
  }),

  // Easter eggs
  sudo: () => ({
    output: (
      <div className="text-red-400">
        Nice try! But you don&apos;t have sudo access here.
        <div className="text-white/50 text-sm mt-1">
          (Type &apos;help&apos; to see available commands)
        </div>
      </div>
    ),
  }),

  vim: () => ({
    output: (
      <div className="text-yellow-400">
        I see you&apos;re a person of culture. But this terminal doesn&apos;t support vim.
        <div className="text-white/50 text-sm mt-1">Try VS Code instead: click the icon on the desktop</div>
      </div>
    ),
  }),

  emacs: () => ({
    output: <div className="text-purple-400">Emacs users are always welcome here, but... type &apos;help&apos; for what actually works.</div>,
  }),
}

/**
 * Execute a command and return the response
 */
export function executeCommand(input: string): CommandResponse {
  const trimmed = input.trim()
  if (!trimmed) {
    return { output: '' }
  }

  const parts = trimmed.split(/\s+/)
  const command = parts[0].toLowerCase()
  const args = parts.slice(1)

  // Check if command exists
  if (command in COMMANDS) {
    return COMMANDS[command](args)
  }

  // Unrecognized command
  return {
    output: (
      <div>
        <span className="text-red-400">Command not found: {command}</span>
        <div className="text-white/50 text-sm mt-1">
          Type &apos;help&apos; for a list of available commands.
        </div>
      </div>
    ),
  }
}
