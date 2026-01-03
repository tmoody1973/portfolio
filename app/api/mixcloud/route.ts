import { NextRequest, NextResponse } from 'next/server'

/**
 * API route to proxy Mixcloud requests
 * Bypasses CORS restrictions when fetching from client-side
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'rhythmlab'
  const limit = searchParams.get('limit') || '20'

  try {
    const response = await fetch(
      `https://api.mixcloud.com/${username}/cloudcasts/?limit=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Cache for 5 minutes
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Mixcloud' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Mixcloud API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
