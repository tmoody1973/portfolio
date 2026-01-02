import { NextRequest, NextResponse } from 'next/server'

/**
 * Spinitron API Proxy
 * Securely fetches now playing data from Spinitron API
 * Keeps API keys server-side only
 */

// Map station IDs to their Spinitron API keys
const SPINITRON_API_KEYS: Record<string, string | undefined> = {
  'rhythm-lab': process.env.SPINITRON_RHYTHM_LAB_KEY,
  '88nine': process.env.SPINITRON_88NINE_KEY,
  'hyfin': process.env.SPINITRON_HYFIN_KEY,
}

// Spinitron API base URL
const SPINITRON_API_BASE = 'https://spinitron.com/api'

// Response interface from Spinitron
interface SpinitronSpin {
  id: number
  start: string
  end: string
  duration: number
  artist: string
  song: string
  release?: string
  label?: string
  image?: string
  genre?: string
  va?: boolean
  local?: boolean
  new?: boolean
}

interface SpinitronResponse {
  items: SpinitronSpin[]
  _links: {
    self: { href: string }
    next?: { href: string }
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const stationId = searchParams.get('station')

  if (!stationId) {
    return NextResponse.json(
      { error: 'Station ID is required' },
      { status: 400 }
    )
  }

  const apiKey = SPINITRON_API_KEYS[stationId]

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Station not configured for Spinitron' },
      { status: 404 }
    )
  }

  try {
    // Fetch the most recent spin
    const response = await fetch(`${SPINITRON_API_BASE}/spins?count=1`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      // Cache for 15 seconds to avoid hitting rate limits
      next: { revalidate: 15 },
    })

    if (!response.ok) {
      console.error(`Spinitron API error: ${response.status}`)
      return NextResponse.json(
        { error: 'Failed to fetch from Spinitron' },
        { status: response.status }
      )
    }

    const data: SpinitronResponse = await response.json()

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ nowPlaying: null })
    }

    const currentSpin = data.items[0]

    // Transform to our NowPlaying format
    const nowPlaying = {
      artist: currentSpin.artist,
      title: currentSpin.song,
      album: currentSpin.release || undefined,
      artwork: currentSpin.image || undefined,
      label: currentSpin.label || undefined,
      genre: currentSpin.genre || undefined,
      isLocal: currentSpin.local || false,
      isNew: currentSpin.new || false,
      timestamp: new Date(currentSpin.start).getTime(),
      spinId: currentSpin.id,
    }

    return NextResponse.json(
      { nowPlaying },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
        },
      }
    )
  } catch (error) {
    console.error('Spinitron fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
