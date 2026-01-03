'use client'

import { useEffect, useState } from 'react'
import { getSkills, Skill } from '@/lib/sanity'

interface SkillCategory {
  name: string
  skills: { name: string; level: number }[]
}

// Category display names
const CATEGORY_LABELS: Record<string, string> = {
  languages: 'Technical',
  frameworks: 'Technical',
  tools: 'Technical',
  platforms: 'Technical',
  databases: 'Technical',
  design: 'Creative',
  'soft-skills': 'Leadership',
  other: 'Other',
}

interface SkillsSectionProps {
  className?: string
}

/**
 * Skills section for the About app
 * Displays skills grouped by category with proficiency levels
 */
export function SkillsSection({ className = '' }: SkillsSectionProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSkills()
      .then((skills) => {
        // Group skills by display category
        const grouped: Record<string, { name: string; level: number }[]> = {}
        skills.forEach((skill) => {
          const displayCategory = CATEGORY_LABELS[skill.category] || 'Other'
          if (!grouped[displayCategory]) {
            grouped[displayCategory] = []
          }
          grouped[displayCategory].push({
            name: skill.name,
            level: skill.proficiencyLevel,
          })
        })
        // Convert to array
        const cats = Object.entries(grouped).map(([name, skills]) => ({
          name,
          skills,
        }))
        setCategories(cats)
      })
      .catch(() => {
        // Fallback to empty
        setCategories([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className={`skills-section ${className}`}>
        <div className="animate-pulse text-white/50">Loading skills...</div>
      </div>
    )
  }

  return (
    <div className={`skills-section ${className}`}>
      <h3 className="text-lg font-medium text-white mb-4">Skills & Expertise</h3>

      <div className="space-y-6">
        {categories.map((category) => (
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

      {/* Tools section - fetched from Sanity (tools/platforms categories) */}
      {categories.find(c => c.name === 'Other') && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white/60 text-sm font-medium mb-3 uppercase tracking-wide">
            Tools & Platforms
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.find(c => c.name === 'Other')?.skills.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs text-white/70"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsSection
