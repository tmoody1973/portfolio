'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { BrowserToolbar } from './BrowserToolbar'
import { ProjectList, Project } from './ProjectList'
import { CaseStudy } from './CaseStudy'
import { getProjects, Project as SanityProject } from '@/lib/sanity'

// Default fallback projects if Sanity fails
const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    slug: '88nine-labs',
    title: '88Nine Labs',
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
    slug: 'hyfin',
    title: 'HYFIN',
    description: 'Urban alternative digital radio platform showcasing diverse voices and sounds.',
    tags: ['Audio Streaming', 'Digital Media', 'Community'],
    featured: true,
  },
  {
    id: '4',
    slug: 'ubuntu-portfolio',
    title: 'Ubuntu Portfolio',
    description: 'This portfolio site! A Linux desktop experience built with Next.js, TypeScript, and Sanity CMS.',
    tags: ['Next.js', 'TypeScript', 'Sanity'],
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
 * Content is fetched from Sanity CMS
 */
export function ChromeApp({ className = '' }: ChromeAppProps) {
  const [view, setView] = useState<View>('list')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([{ view: 'list' }])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS)
  const [loading, setLoading] = useState(true)

  // Fetch projects from Sanity on mount
  useEffect(() => {
    getProjects()
      .then((sanityProjects) => {
        if (sanityProjects && sanityProjects.length > 0) {
          const mapped = sanityProjects.map((p) => ({
            id: p._id,
            slug: p.slug,
            title: p.title,
            description: p.subtitle || '',
            tags: p.technologies || [],
            featured: p.featured || false,
          }))
          setProjects(mapped)
        }
      })
      .catch(() => {
        // Keep using DEFAULT_PROJECTS as fallback
      })
      .finally(() => setLoading(false))
  }, [])

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
      const project = projects.find((p) => p.id === entry.projectId)
      if (project) {
        setView('detail')
        setSelectedProject(project)
      }
    }
  }, [history, historyIndex, projects])

  const goBack = useCallback(() => {
    if (canGoBack) {
      const newIndex = historyIndex - 1
      const entry = history[newIndex]
      setHistoryIndex(newIndex)

      if (entry.view === 'list') {
        setView('list')
        setSelectedProject(null)
      } else if (entry.view === 'detail' && entry.projectId) {
        const project = projects.find((p) => p.id === entry.projectId)
        if (project) {
          setView('detail')
          setSelectedProject(project)
        }
      }
    }
  }, [canGoBack, history, historyIndex, projects])

  const goForward = useCallback(() => {
    if (canGoForward) {
      const newIndex = historyIndex + 1
      const entry = history[newIndex]
      setHistoryIndex(newIndex)

      if (entry.view === 'list') {
        setView('list')
        setSelectedProject(null)
      } else if (entry.view === 'detail' && entry.projectId) {
        const project = projects.find((p) => p.id === entry.projectId)
        if (project) {
          setView('detail')
          setSelectedProject(project)
        }
      }
    }
  }, [canGoForward, history, historyIndex, projects])

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
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : 0

  const goToPreviousProject = useCallback(() => {
    const newIndex = (projectIndex - 1 + projects.length) % projects.length
    handleSelectProject(projects[newIndex])
  }, [projectIndex, handleSelectProject, projects])

  const goToNextProject = useCallback(() => {
    const newIndex = (projectIndex + 1) % projects.length
    handleSelectProject(projects[newIndex])
  }, [projectIndex, handleSelectProject, projects])

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
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-white/50 animate-pulse">Loading projects...</div>
          </div>
        ) : view === 'list' ? (
          <div className="h-full overflow-y-auto">
            <ProjectList
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          </div>
        ) : view === 'detail' && selectedProject ? (
          <CaseStudy
            project={selectedProject}
            projectIndex={projectIndex}
            totalProjects={projects.length}
            onPrevious={goToPreviousProject}
            onNext={goToNextProject}
            onBack={goHome}
          />
        ) : null}
      </div>
    </div>
  )
}

export default ChromeApp
