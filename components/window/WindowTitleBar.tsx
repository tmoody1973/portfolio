'use client'

interface WindowTitleBarProps {
  /** Window title text */
  title: string
  /** Whether the window is focused */
  isFocused?: boolean
  /** Whether the title bar can be dragged */
  isDraggable?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Ubuntu-style window title bar
 * Dark background with centered title text
 * Acts as drag handle when isDraggable is true
 */
export function WindowTitleBar({
  title,
  isFocused = true,
  isDraggable = true,
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
        ${isDraggable ? 'cursor-move' : 'cursor-default'}
        ${className}
      `}
    >
      <span className="text-sm font-medium truncate">{title}</span>
    </div>
  )
}

export default WindowTitleBar
