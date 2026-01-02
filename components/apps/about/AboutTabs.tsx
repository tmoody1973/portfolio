'use client'

import { ReactNode } from 'react'

export interface AboutTab {
  id: string
  label: string
}

interface AboutTabsProps {
  tabs: AboutTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

/**
 * Tab navigation component for the About app
 * Ubuntu-styled horizontal tabs
 */
export function AboutTabs({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: AboutTabsProps) {
  return (
    <div
      className={`
        about-tabs
        flex
        border-b border-white/10
        bg-black/20
        ${className}
      `}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2.5
            text-sm font-medium
            transition-colors duration-150
            border-b-2
            ${
              activeTab === tab.id
                ? 'text-white border-ub-orange bg-white/5'
                : 'text-white/60 border-transparent hover:text-white/80 hover:bg-white/5'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

interface AboutTabPanelProps {
  children: ReactNode
  className?: string
}

/**
 * Tab panel container for About app content
 */
export function AboutTabPanel({ children, className = '' }: AboutTabPanelProps) {
  return (
    <div
      className={`
        about-tab-panel
        flex-1
        overflow-y-auto
        p-4
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default AboutTabs
