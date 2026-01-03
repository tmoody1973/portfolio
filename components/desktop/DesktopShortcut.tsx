'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { trackShortcut } from '@/lib/analytics'

export interface DesktopShortcutProps {
  /** Unique identifier for the shortcut */
  id: string
  /** Display name shown below the icon */
  name: string
  /** Path to the icon image */
  icon: string
  /** Whether this opens an external URL */
  isExternal?: boolean
  /** External URL to open (if isExternal is true) */
  url?: string
  /** Callback when shortcut is activated (double-click or enter) */
  onOpen?: (id: string) => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Desktop shortcut icon component
 * Opens apps via double-click or Enter key
 */
export function DesktopShortcut({
  id,
  name,
  icon,
  isExternal = false,
  url,
  onOpen,
  className = '',
}: DesktopShortcutProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleActivate = useCallback(() => {
    trackShortcut(name, url)
    if (isExternal && url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else if (onOpen) {
      onOpen(id)
    }
  }, [id, name, isExternal, url, onOpen])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleActivate()
      }
    },
    [handleActivate]
  )

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  return (
    <div
      className={`
        desktop-shortcut
        p-2 m-0.5
        flex flex-col justify-start items-center
        text-center text-xs font-normal text-white
        select-none outline-none cursor-pointer
        rounded-lg
        border border-transparent
        transition-all duration-100 ease-in-out
        bg-white bg-opacity-0
        hover:bg-opacity-10
        focus:bg-ub-orange focus:bg-opacity-40 focus:border-orange-400 focus:border-opacity-60
        active:scale-95
        ${isPressed ? 'scale-95 bg-opacity-20' : ''}
        ${className}
      `}
      id={`shortcut-${id}`}
      onDoubleClick={handleActivate}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`Open ${name}`}
    >
      <div className="relative w-12 h-12 mb-1 flex items-center justify-center">
        <Image
          src={icon}
          alt={name}
          width={48}
          height={48}
          className="object-contain drop-shadow-md"
          draggable={false}
        />
        {isExternal && (
          <Image
            src="/themes/Yaru/status/arrow-up-right.svg"
            alt="External link"
            width={12}
            height={12}
            className="absolute -bottom-0.5 -right-0.5"
          />
        )}
      </div>
      <span className="w-full px-0.5 leading-tight break-words line-clamp-2 drop-shadow-sm">
        {name}
      </span>
    </div>
  )
}

export default DesktopShortcut
