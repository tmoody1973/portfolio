'use client'

import React, { useState, useCallback } from 'react'
import { BrowserToolbar } from './BrowserToolbar'
import { ProjectList, Project } from './ProjectList'
import { CaseStudy } from './CaseStudy'

// Sample projects data (would come from Sanity in production)
const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    slug: '88ninelabs',
    title: '88ninelabs',
    description: 'A creative technology lab exploring the intersection of AI, music, and culture. Building tools for creators.',
    tags: ['AI', 'Music Tech', 'Open Source'],
    featured: true,
  },
  {
    id: '2',
    slug: 'rhythm-lab-radio',
    title: 'Rhythm Lab Radio',
    description: 'A 24/7 internet radio station broadcasting global sounds from jazz to electronic to world music.',
    tags: ['Audio Streaming', 'React', 'Node.js'],
    featured: true,
  },
  {
    id: '3',
    slug: 'ubuntu-portfolio',
    title: 'Ubuntu Portfolio',
    description: 'This portfolio site! A Linux desktop experience built with Next.js, TypeScript, and Sanity CMS.',
    tags: ['Next.js', 'TypeScript', 'Sanity'],
    featured: false,
  },
  {
    id: '4',
    slug: 'vinyl-discovery',
    title: 'Vinyl Discovery',
    description: 'An AI-powered tool helping vinyl collectors find hidden gems based on their listening history.',
    tags: ['AI/ML', 'Discogs API', 'Python'],
    featured: false,
  },
]

interface ChromeAppProps {
  className?: string
}

type View = 'list' | 'detail'

interface HistoryEntry {
  view: View
  projectId?: string
}

/**
 * Chrome-styled browser app for viewing projects/case studies
 */
export function ChromeApp({ className = '' }: ChromeAppProps) {
  const [view, setView] = useState<View>('list')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([{ view: 'list' }])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Get current path for address bar
  const currentPath = view === 'list' ? '/projects' : `/projects/${selectedProject?.slug || ''}`

  // Navigation functions
  const canGoBack = historyIndex > 0
  const canGoForward = historyIndex < history.length - 1

  const navigateTo = useCallback((entry: HistoryEntry) => {
    // Add to history, removing any forward history
    const newHistory = [...history.slice(0, historyIndex + 1), entry]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    if (entry.view === 'list') {
      setView('list')
      setSelectedProject(null)
    } else if (entry.view === 'detail' && entry.projectId) {
      const project = SAMPLE_PROJECTS.find((p) => p.id === entry.projectId)
      if (project) {
        setView('detail')
        setSelectedProject(project)
      }
    }
  }, [history, historyIndex])

  const goBack = useCallback(() => {
    if (canGoBack) {
      const newIndex = historyIndex - 1
      const entry = history[newIndex]
      setHistoryIndex(newIndex)

      if (entry.view === 'list') {
        setView('list')
        setSelectedProject(null)
      } else if (entry.view === 'detail' && entry.projectId) {
        const project = SAMPLE_PROJECTS.find((p) => p.id === entry.projectId)
        if (project) {
          setView('detail')
          setSelectedProject(project)
        }
      }
    }
  }, [canGoBack, history, historyIndex])

  const goForward = useCallback(() => {
    if (canGoForward) {
      const newIndex = historyIndex + 1
      const entry = history[newIndex]
      setHistoryIndex(newIndex)

      if (entry.view === 'list') {
        setView('list')
        setSelectedProject(null)
      } else if (entry.view === 'detail' && entry.projectId) {
        const project = SAMPLE_PROJECTS.find((p) => p.id === entry.projectId)
        if (project) {
          setView('detail')
          setSelectedProject(project)
        }
      }
    }
  }, [canGoForward, history, historyIndex])

  const goHome = useCallback(() => {
    navigateTo({ view: 'list' })
  }, [navigateTo])

  const refresh = useCallback(() => {
    // Just a visual refresh, no actual data reload needed for now
  }, [])

  // Project selection
  const handleSelectProject = useCallback((project: Project) => {
    navigateTo({ view: 'detail', projectId: project.id })
  }, [navigateTo])

  // Project navigation
  const projectIndex = selectedProject
    ? SAMPLE_PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : 0

  const goToPreviousProject = useCallback(() => {
    const newIndex = (projectIndex - 1 + SAMPLE_PROJECTS.length) % SAMPLE_PROJECTS.length
    handleSelectProject(SAMPLE_PROJECTS[newIndex])
  }, [projectIndex, handleSelectProject])

  const goToNextProject = useCallback(() => {
    const newIndex = (projectIndex + 1) % SAMPLE_PROJECTS.length
    handleSelectProject(SAMPLE_PROJECTS[newIndex])
  }, [projectIndex, handleSelectProject])

  return (
    <div className={`chrome-app h-full flex flex-col bg-[#1e1e1e] ${className}`}>
      {/* Browser toolbar */}
      <BrowserToolbar
        currentPath={currentPath}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onBack={goBack}
        onForward={goForward}
        onHome={goHome}
        onRefresh={refresh}
      />

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {view === 'list' && (
          <div className="h-full overflow-y-auto">
            <ProjectList
              projects={SAMPLE_PROJECTS}
              onSelectProject={handleSelectProject}
            />
          </div>
        )}

        {view === 'detail' && selectedProject && (
          <CaseStudy
            project={selectedProject}
            projectIndex={projectIndex}
            totalProjects={SAMPLE_PROJECTS.length}
            onPrevious={goToPreviousProject}
            onNext={goToNextProject}
            onBack={goHome}
          />
        )}
      </div>
    </div>
  )
}

export default ChromeApp
