'use client'

interface WindowTitleBarProps {
  /** Window title text */
  title: string
  /** Whether the window is focused */
  isFocused?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Ubuntu-style window title bar
 * Dark background with centered title text
 */
export function WindowTitleBar({
  title,
  isFocused = true,
  className = '',
}: WindowTitleBarProps) {
  return (
    <div
      className={`
        window-title-bar
        bg-ub-window-title
        border-t-2 border-white/5
        py-1.5 px-3
        text-white
        select-none
        flex items-center justify-center
        ${isFocused ? '' : 'opacity-80'}
        ${className}
      `}
    >
      <span className="text-sm font-medium truncate">{title}</span>
    </div>
  )
}

export default WindowTitleBar
