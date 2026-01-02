'use client'

interface Skill {
  name: string
  level: number // 1-5
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Technical',
    skills: [
      { name: 'JavaScript/TypeScript', level: 4 },
      { name: 'React/Next.js', level: 4 },
      { name: 'HTML/CSS', level: 5 },
      { name: 'Node.js', level: 3 },
      { name: 'Audio Production', level: 4 },
    ],
  },
  {
    name: 'Creative',
    skills: [
      { name: 'Music Curation', level: 5 },
      { name: 'Content Strategy', level: 5 },
      { name: 'Brand Development', level: 4 },
      { name: 'Visual Design', level: 3 },
      { name: 'Storytelling', level: 5 },
    ],
  },
  {
    name: 'Leadership',
    skills: [
      { name: 'Team Management', level: 4 },
      { name: 'Strategic Planning', level: 5 },
      { name: 'Project Management', level: 4 },
      { name: 'Community Building', level: 5 },
      { name: 'Public Speaking', level: 4 },
    ],
  },
]

interface SkillsSectionProps {
  className?: string
}

/**
 * Skills section for the About app
 * Displays skills grouped by category with proficiency levels
 */
export function SkillsSection({ className = '' }: SkillsSectionProps) {
  return (
    <div className={`skills-section ${className}`}>
      <h3 className="text-lg font-medium text-white mb-4">Skills & Expertise</h3>

      <div className="space-y-6">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.name}>
            <h4 className="text-white/60 text-sm font-medium mb-3 uppercase tracking-wide">
              {category.name}
            </h4>

            <div className="space-y-2">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="text-white/80 text-sm w-40 flex-shrink-0">
                    {skill.name}
                  </span>
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`
                          h-2 flex-1 rounded-sm
                          ${level <= skill.level ? 'bg-ub-orange' : 'bg-white/10'}
                        `}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tools section */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-white/60 text-sm font-medium mb-3 uppercase tracking-wide">
          Tools & Platforms
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            'VS Code', 'Figma', 'Ableton Live', 'Pro Tools',
            'Git', 'Sanity CMS', 'Vercel', 'AWS',
          ].map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs text-white/70"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
