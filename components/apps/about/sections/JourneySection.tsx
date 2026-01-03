'use client'

import { useEffect, useState } from 'react'
import { getExperience, Experience } from '@/lib/sanity'

interface TimelineItem {
  year: string
  title: string
  organization: string
  location: string
  description: string
}

interface JourneySectionProps {
  className?: string
}

/**
 * Journey section for the About app
 * Displays career timeline with visual connecting line
 * Content is fetched from Sanity CMS
 */
export function JourneySection({ className = '' }: JourneySectionProps) {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExperience()
      .then((experiences) => {
        const mapped = experiences.map((exp) => ({
          year: new Date(exp.startDate).getFullYear().toString(),
          title: exp.role,
          organization: exp.company,
          location: exp.location || '',
          description: exp.highlights?.join(' ') || '',
        }))
        setItems(mapped)
      })
      .catch(() => {
        setItems([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className={`journey-section ${className}`}>
        <h3 className="text-lg font-medium text-white mb-4">Career Journey</h3>
        <div className="animate-pulse text-white/50">Loading journey...</div>
      </div>
    )
  }

  return (
    <div className={`journey-section ${className}`}>
      <h3 className="text-lg font-medium text-white mb-4">Career Journey</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/20" />

        {/* Timeline items */}
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-ub-orange border-2 border-ub-grey" />

              {/* Content */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-ub-orange font-mono text-sm">{item.year}</span>
                  <span className="text-white/40 text-xs">•</span>
                  <span className="text-white/40 text-xs">{item.location}</span>
                </div>
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="text-white/60 text-sm">{item.organization}</p>
                <p className="text-white/50 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JourneySection
