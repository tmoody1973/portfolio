import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#E95420',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Tarik Moody - Developer & Radio Curator',
  description: 'Tarik Moody\'s Ubuntu-themed portfolio. Director of Strategy and Innovation at 88Nine Radio Milwaukee, creator of Rhythm Lab Radio.',
  authors: [{ name: 'Tarik Moody' }],
  keywords: ['Tarik Moody', 'portfolio', 'ubuntu', 'radio', 'rhythm lab', '88Nine', 'developer', 'Milwaukee'],
  robots: 'index, follow',
  openGraph: {
    title: 'Tarik Moody - Developer & Radio Curator',
    description: 'Tarik Moody\'s Ubuntu-themed portfolio. Director of Strategy and Innovation at 88Nine Radio Milwaukee, creator of Rhythm Lab Radio.',
    url: 'https://tarikmoody.com',
    siteName: 'Tarik Moody Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tarik Moody - Developer & Radio Curator',
    description: 'Tarik Moody\'s Ubuntu-themed portfolio. Director of Strategy and Innovation at 88Nine Radio Milwaukee, creator of Rhythm Lab Radio.',
    creator: '@taaborern',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
