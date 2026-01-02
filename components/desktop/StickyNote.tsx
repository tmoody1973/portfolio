'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'

export interface StickyNoteConfig {
  enabled: boolean
  title?: string
  message: string
  signature?: string
  color?: 'yellow' | 'blue' | 'green' | 'pink' | 'orange'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  rotation?: number
}

interface StickyNoteProps {
  config: StickyNoteConfig | null
}

// Color schemes for different note colors
const COLOR_SCHEMES = {
  yellow: {
    bg: 'bg-amber-200',
    bgDark: 'bg-amber-300',
    text: 'text-amber-950',
    textMuted: 'text-amber-800',
    shadow: 'shadow-amber-400/30',
    icon: 'bg-amber-400 text-amber-900',
  },
  blue: {
    bg: 'bg-sky-200',
    bgDark: 'bg-sky-300',
    text: 'text-sky-950',
    textMuted: 'text-sky-800',
    shadow: 'shadow-sky-400/30',
    icon: 'bg-sky-400 text-sky-900',
  },
  green: {
    bg: 'bg-emerald-200',
    bgDark: 'bg-emerald-300',
    text: 'text-emerald-950',
    textMuted: 'text-emerald-800',
    shadow: 'shadow-emerald-400/30',
    icon: 'bg-emerald-400 text-emerald-900',
  },
  pink: {
    bg: 'bg-pink-200',
    bgDark: 'bg-pink-300',
    text: 'text-pink-950',
    textMuted: 'text-pink-800',
    shadow: 'shadow-pink-400/30',
    icon: 'bg-pink-400 text-pink-900',
  },
  orange: {
    bg: 'bg-orange-200',
    bgDark: 'bg-orange-300',
    text: 'text-orange-950',
    textMuted: 'text-orange-800',
    shadow: 'shadow-orange-400/30',
    icon: 'bg-orange-400 text-orange-900',
  },
}

// Default starting positions based on config
const getDefaultPosition = (position: string) => {
  switch (position) {
    case 'top-left':
      return { x: 80, y: 60 }
    case 'bottom-right':
      return { x: typeof window !== 'undefined' ? window.innerWidth - 280 : 500, y: typeof window !== 'undefined' ? window.innerHeight - 300 : 400 }
    case 'bottom-left':
      return { x: 80, y: typeof window !== 'undefined' ? window.innerHeight - 300 : 400 }
    case 'top-right':
    default:
      return { x: typeof window !== 'undefined' ? window.innerWidth - 280 : 500, y: 60 }
  }
}

const STORAGE_KEY_HIDDEN = 'sticky-note-hidden'
const STORAGE_KEY_POSITION = 'sticky-note-position'

/**
 * StickyNote - A draggable, dismissible welcome note on the desktop
 * Persists hide state and position to localStorage
 */
export function StickyNote({ config }: StickyNoteProps) {
  const [isHidden, setIsHidden] = useState(true) // Start hidden to prevent flash
  const [isLoaded, setIsLoaded] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Load state from localStorage
  useEffect(() => {
    const storedHidden = localStorage.getItem(STORAGE_KEY_HIDDEN)
    const storedPosition = localStorage.getItem(STORAGE_KEY_POSITION)

    setIsHidden(storedHidden === 'true')

    if (storedPosition) {
      try {
        setPosition(JSON.parse(storedPosition))
      } catch {
        setPosition(getDefaultPosition(config?.position || 'top-right'))
      }
    } else {
      setPosition(getDefaultPosition(config?.position || 'top-right'))
    }

    setIsLoaded(true)
  }, [config?.position])

  // Don't render if no config or disabled
  if (!config || !config.enabled || !isLoaded) {
    return null
  }

  const colors = COLOR_SCHEMES[config.color || 'yellow']
  const rotation = config.rotation ?? 2

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsHidden(true)
    localStorage.setItem(STORAGE_KEY_HIDDEN, 'true')
  }

  const handleShow = () => {
    setIsHidden(false)
    localStorage.setItem(STORAGE_KEY_HIDDEN, 'false')
  }

  const handleDragEnd = (_: any, info: { point: { x: number; y: number } }) => {
    const newPosition = { x: info.point.x - 128, y: info.point.y - 20 } // Offset for note center
    setPosition(newPosition)
    localStorage.setItem(STORAGE_KEY_POSITION, JSON.stringify(newPosition))
    setIsDragging(false)
  }

  return (
    <>
      {/* Drag constraints container (full screen) */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-20" />

      {/* Reveal button (shown when note is hidden) */}
      <AnimatePresence>
        {isHidden && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={handleShow}
            className={`
              fixed top-16 right-4 z-30
              w-10 h-10 rounded-lg ${colors.icon}
              flex items-center justify-center
              shadow-lg hover:scale-110 transition-transform
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            `}
            aria-label="Show welcome note"
            title="Show welcome note"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky Note */}
      <AnimatePresence>
        {!isHidden && (
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.9, x: position.x, y: position.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: position.x,
              y: position.y,
              rotate: isDragging ? 0 : rotation
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-0 left-0 z-30 touch-none"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div
              className={`
                relative w-64 ${colors.bg} rounded-sm
                shadow-xl ${colors.shadow}
                overflow-hidden
                ${isDragging ? 'shadow-2xl scale-105' : ''}
                transition-shadow
              `}
            >
              {/* Tape effect at top (also serves as drag handle indicator) */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 rounded-sm" />

              {/* Drag indicator */}
              <div className={`absolute top-1 left-1/2 -translate-x-1/2 flex gap-0.5 ${colors.textMuted} opacity-40`}>
                <div className="w-1 h-1 rounded-full bg-current" />
                <div className="w-1 h-1 rounded-full bg-current" />
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>

              {/* Close button */}
              <button
                onClick={handleHide}
                className={`
                  absolute top-2 right-2 w-6 h-6 rounded-full
                  ${colors.bgDark} ${colors.text}
                  flex items-center justify-center
                  opacity-60 hover:opacity-100 transition-opacity
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                  cursor-pointer
                `}
                aria-label="Hide note"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-5 pt-6 select-none">
                {/* Title */}
                {config.title && (
                  <h3 className={`text-lg font-bold ${colors.text} mb-2`} style={{ fontFamily: 'system-ui' }}>
                    {config.title}
                  </h3>
                )}

                {/* Message */}
                <p
                  className={`text-sm ${colors.text} leading-relaxed whitespace-pre-line`}
                  style={{ fontFamily: 'system-ui' }}
                >
                  {config.message}
                </p>

                {/* Signature */}
                {config.signature && (
                  <p className={`mt-3 text-sm ${colors.textMuted} italic`}>
                    {config.signature}
                  </p>
                )}
              </div>

              {/* Paper texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StickyNote
