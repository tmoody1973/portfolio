'use client'

import { useState } from 'react'
import { AboutTabs, AboutTabPanel, AboutTab } from './AboutTabs'
import { BioSection, JourneySection, EducationSection, SkillsSection } from './sections'
import { trackAbout } from '@/lib/analytics'

const ABOUT_TABS: AboutTab[] = [
  { id: 'bio', label: 'Bio' },
  { id: 'journey', label: 'Journey' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

interface AboutAppProps {
  className?: string
}

/**
 * About application for the Ubuntu Desktop
 * Displays personal information in a tabbed interface
 */
export function AboutApp({ className = '' }: AboutAppProps) {
  const [activeTab, setActiveTab] = useState('bio')

  return (
    <div className={`about-app flex flex-col h-full bg-ub-grey ${className}`}>
      {/* Tab navigation */}
      <AboutTabs
        tabs={ABOUT_TABS}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          trackAbout(tab)
        }}
      />

      {/* Tab content */}
      <AboutTabPanel>
        {activeTab === 'bio' && <BioSection />}
        {activeTab === 'journey' && <JourneySection />}
        {activeTab === 'education' && <EducationSection />}
        {activeTab === 'skills' && <SkillsSection />}
      </AboutTabPanel>
    </div>
  )
}

export default AboutApp
