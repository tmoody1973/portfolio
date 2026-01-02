'use client'

import React, { useState } from 'react'
import { Project } from './ProjectList'

interface CaseStudySection {
  id: string
  title: string
  content: string
}

interface CaseStudyProps {
  project: Project
  sections?: CaseStudySection[]
  images?: string[]
  projectIndex: number
  totalProjects: number
  onPrevious: () => void
  onNext: () => void
  onBack: () => void
}

// Default architecture-inspired sections
const DEFAULT_SECTIONS: CaseStudySection[] = [
  {
    id: 'context',
    title: 'Context',
    content: 'The background and problem space that led to this project.',
  },
  {
    id: 'concept',
    title: 'Concept',
    content: 'The core idea and approach taken to solve the problem.',
  },
  {
    id: 'process',
    title: 'Process',
    content: 'How the project was developed, including key decisions and iterations.',
  },
  {
    id: 'execution',
    title: 'Execution',
    content: 'The technical implementation and how challenges were overcome.',
  },
  {
    id: 'result',
    title: 'Result',
    content: 'The outcome and impact of the completed project.',
  },
  {
    id: 'reflection',
    title: 'Reflection',
    content: 'Lessons learned and what could be done differently.',
  },
]

/**
 * Case study detail view with architecture-inspired sections
 */
export function CaseStudy({
  project,
  sections = DEFAULT_SECTIONS,
  images = [],
  projectIndex,
  totalProjects,
  onPrevious,
  onNext,
  onBack,
}: CaseStudyProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (image: string, index: number) => {
    setLightboxImage(image)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % images.length
    setLightboxImage(images[newIndex])
    setLightboxIndex(newIndex)
  }

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + images.length) % images.length
    setLightboxImage(images[newIndex])
    setLightboxIndex(newIndex)
  }

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') prevImage()
        if (e.key === 'ArrowRight') nextImage()
      } else {
        if (e.key === 'ArrowLeft') onPrevious()
        if (e.key === 'ArrowRight') onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, lightboxIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="case-study h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a2e] to-transparent p-6 pb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>

        <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
        <p className="text-lg text-white/70 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Screenshot gallery */}
      {images.length > 0 && (
        <div className="px-6 mb-8">
          <h2 className="text-lg font-medium text-white mb-3">Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(image, index)}
                className="aspect-video bg-[#2d2d30] rounded overflow-hidden hover:ring-2 ring-orange-500 transition-all"
              >
                <img
                  src={image}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Architecture-inspired sections */}
      <div className="px-6 pb-6 space-y-8">
        {sections.map((section) => (
          <section key={section.id} className="case-section">
            <h2 className="text-xl font-medium text-orange-400 mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500" />
              {section.title}
            </h2>
            <div className="text-white/80 leading-relaxed pl-10">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 bg-[#1e1e1e] border-t border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <span className="text-white/40 text-sm">
            {projectIndex + 1} of {totalProjects}
          </span>

          <button
            onClick={onNext}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 text-white/70 hover:text-white p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 text-white/70 hover:text-white p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
