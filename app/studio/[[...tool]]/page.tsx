'use client'

import { useEffect, useState } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  // Ensure Studio only renders on client to avoid React 19 hydration issues
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#101112]">
        <div className="text-white/60">Loading Studio...</div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
