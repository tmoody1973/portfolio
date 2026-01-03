'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const HELP_SECTIONS = [
  {
    icon: '/themes/Yaru/apps/user-info.svg',
    title: 'About Me',
    description: 'Learn about my journey from architecture to radio to tech innovation.',
  },
  {
    icon: '/themes/Yaru/apps/bash.png',
    title: 'Terminal',
    description: 'Interactive terminal. Try commands like "help", "about", or "projects".',
  },
  {
    icon: '/themes/Yaru/apps/chrome.png',
    title: 'Projects',
    description: 'Browse my portfolio of work and case studies.',
  },
  {
    icon: '/themes/Yaru/apps/music-player.png',
    title: 'Music Player',
    description: 'Listen to live radio from 88Nine, HYFIN, and Rhythm Lab Radio.',
  },
  {
    icon: '/themes/Yaru/apps/crates.svg',
    title: 'Crates',
    description: 'Curated collection of music, books, tools, and discoveries.',
  },
]

const TIPS = [
  'Click app icons in the dock (left sidebar) to open windows',
  'Drag window title bars to move windows around',
  'Use the minimize, maximize, and close buttons on windows',
  'Click the grid icon at the bottom of the dock to see all apps',
  'Try typing commands in the Terminal for a fun experience',
]

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [currentTip, setCurrentTip] = useState(0)

  // Rotate tips
  useEffect(() => {
    if (!isOpen) return
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="
                bg-ub-grey
                rounded-xl
                shadow-2xl
                border border-white/10
                max-w-lg
                w-full
                max-h-[85vh]
                overflow-hidden
                pointer-events-auto
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-ub-orange to-orange-600 p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
                  aria-label="Close help"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-3xl">👋</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Welcome!</h2>
                    <p className="text-white/80 text-sm">
                      This is Tarik Moody&apos;s interactive portfolio
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                {/* Introduction */}
                <p className="text-white/80 text-sm mb-6">
                  This site is designed like an Ubuntu desktop. Explore by clicking around,
                  opening apps, and discovering content just like you would on a real computer.
                </p>

                {/* Apps Guide */}
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-ub-orange flex items-center justify-center text-xs">?</span>
                  What&apos;s in the Dock
                </h3>
                <div className="space-y-2 mb-6">
                  {HELP_SECTIONS.map((section, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Image
                        src={section.icon}
                        alt={section.title}
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium">{section.title}</div>
                        <div className="text-white/50 text-xs truncate">{section.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-xs">💡</span>
                  Tips
                </h3>
                <div className="bg-white/5 rounded-lg p-4 min-h-[60px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTip}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/70 text-sm"
                    >
                      {TIPS[currentTip]}
                    </motion.p>
                  </AnimatePresence>
                  <div className="flex justify-center gap-1 mt-3">
                    {TIPS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTip(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTip ? 'bg-ub-orange' : 'bg-white/20'
                        }`}
                        aria-label={`Tip ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/40 text-xs">
                  Press ESC or click outside to close
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-ub-orange hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default HelpModal
