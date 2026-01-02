'use client'

interface EducationItem {
  institution: string
  degree: string
  field: string
  years: string
  location: string
  highlights?: string[]
}

const EDUCATION_ITEMS: EducationItem[] = [
  {
    institution: 'Howard University',
    degree: 'Bachelor of Architecture',
    field: 'Architecture',
    years: '1992 - 1996',
    location: 'Washington, D.C.',
    highlights: [
      'Design thinking and systematic problem-solving',
      'Visual communication and presentation',
      'Project management and collaboration',
    ],
  },
]

interface EducationSectionProps {
  className?: string
}

/**
 * Education section for the About app
 * Displays educational background and credentials
 */
export function EducationSection({ className = '' }: EducationSectionProps) {
  return (
    <div className={`education-section ${className}`}>
      <h3 className="text-lg font-medium text-white mb-4">Education</h3>

      <div className="space-y-4">
        {EDUCATION_ITEMS.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-white font-medium">{item.institution}</h4>
                <p className="text-ub-orange text-sm">{item.degree}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">{item.years}</p>
                <p className="text-white/40 text-xs">{item.location}</p>
              </div>
            </div>

            {item.highlights && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                  Key Takeaways
                </p>
                <ul className="space-y-1">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                      <span className="text-ub-orange mt-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional certifications or learning */}
      <div className="mt-6">
        <h4 className="text-white/60 text-sm font-medium mb-3">Continuous Learning</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
            Web Development
          </span>
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
            Audio Engineering
          </span>
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
            Digital Strategy
          </span>
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
            UX Design
          </span>
        </div>
      </div>
    </div>
  )
}

export default EducationSection
