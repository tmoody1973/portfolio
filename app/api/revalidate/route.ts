import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { CACHE_TAGS } from '@/lib/sanity/fetch'

// Secret for validating webhook requests
const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET

// Map Sanity document types to cache tags
const typeToTagMap: Record<string, string[]> = {
  siteSettings: [CACHE_TAGS.siteSettings],
  bootSequence: [CACHE_TAGS.bootSequence],
  playerConfig: [CACHE_TAGS.playerConfig],
  themeSettings: [CACHE_TAGS.themeSettings],
  desktopApp: [CACHE_TAGS.desktopApps],
  desktopShortcut: [CACHE_TAGS.desktopShortcuts],
  aboutSection: [CACHE_TAGS.aboutSections],
  experience: [CACHE_TAGS.experiences],
  education: [CACHE_TAGS.education],
  skill: [CACHE_TAGS.skills],
  project: [CACHE_TAGS.projects],
  terminalCommand: [CACHE_TAGS.terminalCommands],
  radioStream: [CACHE_TAGS.radioStreams],
  wallpaper: [CACHE_TAGS.wallpapers],
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the webhook body
    const { body, isValidSignature } = await parseBody<{
      _type: string
      _id: string
      slug?: { current: string }
    }>(req, SANITY_REVALIDATE_SECRET)

    // Check signature if secret is configured
    if (SANITY_REVALIDATE_SECRET && !isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature', revalidated: false },
        { status: 401 }
      )
    }

    // Ensure we have a body with a type
    if (!body?._type) {
      return NextResponse.json(
        { message: 'Missing document type', revalidated: false },
        { status: 400 }
      )
    }

    // Get tags to revalidate based on document type
    const tagsToRevalidate = typeToTagMap[body._type] || []

    if (tagsToRevalidate.length === 0) {
      return NextResponse.json({
        message: `No cache tags configured for type: ${body._type}`,
        revalidated: false,
      })
    }

    // Revalidate all relevant tags
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag)
    }

    return NextResponse.json({
      message: `Revalidated tags: ${tagsToRevalidate.join(', ')}`,
      revalidated: true,
      tags: tagsToRevalidate,
      documentType: body._type,
      documentId: body._id,
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating', revalidated: false },
      { status: 500 }
    )
  }
}

// Also support GET for manual revalidation (with secret)
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag')

  // Validate secret
  if (SANITY_REVALIDATE_SECRET && secret !== SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret', revalidated: false },
      { status: 401 }
    )
  }

  // If a specific tag is provided, revalidate just that tag
  if (tag) {
    const validTags = Object.values(CACHE_TAGS)
    if (!validTags.includes(tag as typeof validTags[number])) {
      return NextResponse.json(
        { message: `Invalid tag: ${tag}`, validTags, revalidated: false },
        { status: 400 }
      )
    }

    revalidateTag(tag)
    return NextResponse.json({
      message: `Revalidated tag: ${tag}`,
      revalidated: true,
      tag,
    })
  }

  // If no tag specified, revalidate all tags
  const allTags = Object.values(CACHE_TAGS)
  for (const t of allTags) {
    revalidateTag(t)
  }

  return NextResponse.json({
    message: 'Revalidated all tags',
    revalidated: true,
    tags: allTags,
  })
}
