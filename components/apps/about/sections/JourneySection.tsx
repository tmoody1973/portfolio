'use client'

interface TimelineItem {
  year: string
  title: string
  organization: string
  location: string
  description: string
}

const JOURNEY_ITEMS: TimelineItem[] = [
  {
    year: '2024',
    title: 'Director of Strategy & Innovation',
    organization: '88Nine Radio Milwaukee',
    location: 'Milwaukee, WI',
    description: 'Leading digital strategy and innovation initiatives for public radio.',
  },
  {
    year: '2019',
    title: 'Creator, Rhythm Lab Radio',
    organization: '88Nine Radio Milwaukee',
    location: 'Milwaukee, WI',
    description: 'Founded and continue to curate a weekly show exploring global sounds and underground music.',
  },
  {
    year: '2010',
    title: 'Digital Media Producer',
    organization: '88Nine Radio Milwaukee',
    location: 'Milwaukee, WI',
    description: 'Pioneered digital content strategies and online engagement for the station.',
  },
  {
    year: '1996',
    title: 'Architecture Studies',
    organization: 'Howard University',
    location: 'Washington, D.C.',
    description: 'Studied architecture, developing skills in design thinking and systematic problem-solving.',
  },
]

interface JourneySectionProps {
  className?: string
}

/**
 * Journey section for the About app
 * Displays career timeline with visual connecting line
 */
export function JourneySection({ className = '' }: JourneySectionProps) {
  return (
    <div className={`journey-section ${className}`}>
      <h3 className="text-lg font-medium text-white mb-4">Career Journey</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/20" />

        {/* Timeline items */}
        <div className="space-y-6">
          {JOURNEY_ITEMS.map((item, index) => (
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
