'use client'

import Image from 'next/image'

interface NavItem {
  id: string
  name: string
  icon: string
  appType: string
}

interface MobileBottomNavProps {
  items: NavItem[]
  activeAppId?: string
  onNavClick: (appId: string) => void
  onShowDrawer: () => void
}

/**
 * Bottom navigation bar for mobile
 * Shows quick access to main apps + drawer toggle
 */
export function MobileBottomNav({
  items,
  activeAppId,
  onNavClick,
  onShowDrawer,
}: MobileBottomNavProps) {
  // Show max 4 items + drawer button
  const visibleItems = items.slice(0, 4)

  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-30
        bg-[#1e1e1e]/95 backdrop-blur-md
        border-t border-white/10
        safe-area-inset-bottom
      "
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {visibleItems.map((item) => {
          const isActive = activeAppId === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`
                flex flex-col items-center justify-center
                w-16 h-14
                rounded-xl
                transition-colors
                touch-manipulation
                ${isActive ? 'bg-orange-500/20' : 'active:bg-white/10'}
              `}
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
            >
              <Image
                src={item.icon}
                alt=""
                width={24}
                height={24}
                className={`w-6 h-6 object-contain ${isActive ? 'opacity-100' : 'opacity-70'}`}
              />
              <span
                className={`
                  text-[10px] mt-1
                  ${isActive ? 'text-orange-400' : 'text-white/60'}
                `}
              >
                {item.name}
              </span>
            </button>
          )
        })}

        {/* App drawer toggle */}
        <button
          onClick={onShowDrawer}
          className="
            flex flex-col items-center justify-center
            w-16 h-14
            rounded-xl
            active:bg-white/10
            transition-colors
            touch-manipulation
          "
          aria-label="Show all apps"
        >
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span className="text-[10px] mt-1 text-white/60">Apps</span>
        </button>
      </div>
    </nav>
  )
}

export default MobileBottomNav
