'use client'

import Image from 'next/image'

interface WindowControlsProps {
  /** Handler for minimize button */
  onMinimize?: () => void
  /** Handler for maximize/restore button */
  onMaximize?: () => void
  /** Handler for close button */
  onClose?: () => void
  /** Whether window is currently maximized */
  isMaximized?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Ubuntu-style window control buttons (minimize, maximize, close)
 * Positioned in top-right corner of window
 */
export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
  className = '',
}: WindowControlsProps) {
  return (
    <div
      className={`
        window-controls
        absolute right-0 top-0
        mt-1 mr-1
        flex items-center
        select-none
        ${className}
      `}
    >
      {/* Minimize Button */}
      <button
        type="button"
        onClick={onMinimize}
        className="
          mx-1
          w-6 h-6
          rounded-full
          flex items-center justify-center
          bg-white/0 hover:bg-white/10
          transition-colors
          focus:outline-none focus:ring-1 focus:ring-white/30
        "
        aria-label="Minimize window"
      >
        <Image
          src="/themes/Yaru/window/window-minimize-symbolic.svg"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4"
          draggable={false}
        />
      </button>

      {/* Maximize/Restore Button */}
      <button
        type="button"
        onClick={onMaximize}
        className="
          mx-1
          w-6 h-6
          rounded-full
          flex items-center justify-center
          bg-white/0 hover:bg-white/10
          transition-colors
          focus:outline-none focus:ring-1 focus:ring-white/30
        "
        aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
      >
        <Image
          src={
            isMaximized
              ? '/themes/Yaru/window/window-restore-symbolic.svg'
              : '/themes/Yaru/window/window-maximize-symbolic.svg'
          }
          alt=""
          width={16}
          height={16}
          className="w-4 h-4"
          draggable={false}
        />
      </button>

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="
          mx-1
          w-6 h-6
          rounded-full
          flex items-center justify-center
          bg-ub-orange hover:brightness-110
          transition-all
          focus:outline-none focus:ring-2 focus:ring-ub-orange/50
        "
        aria-label="Close window"
      >
        <Image
          src="/themes/Yaru/window/window-close-symbolic.svg"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4"
          draggable={false}
        />
      </button>
    </div>
  )
}

export default WindowControls
