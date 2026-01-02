'use client'

import React from 'react'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  thumbnail?: string
  tags: string[]
  featured?: boolean
}

interface ProjectListProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

/**
 * Grid of project cards for browsing case studies
 */
export function ProjectList({ projects, onSelectProject }: ProjectListProps) {
  return (
    <div className="project-list p-6">
      <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
      <p className="text-white/60 mb-6">Case studies and featured work</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="project-card group text-left bg-[#2d2d30] rounded-lg overflow-hidden hover:bg-[#3d3d40] transition-colors"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-purple-600/20 flex items-center justify-center">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl opacity-50">🚀</span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-medium text-white group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-white/60 line-clamp-2 mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-4">📁</div>
          <p>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
