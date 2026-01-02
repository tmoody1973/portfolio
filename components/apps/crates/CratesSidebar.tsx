'use client'

export type ItemCategory = 'all' | 'music' | 'book' | 'link' | 'tool'

interface CategoryConfig {
  id: ItemCategory
  label: string
  icon: string
  description: string
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'all', label: 'All', icon: '📦', description: 'Everything in the crate' },
  { id: 'music', label: 'Music', icon: '🎵', description: 'Albums & tracks' },
  { id: 'book', label: 'Books', icon: '📚', description: 'Must-reads' },
  { id: 'link', label: 'Links', icon: '🔗', description: 'Articles & resources' },
  { id: 'tool', label: 'Tools', icon: '🛠️', description: 'Software & utilities' },
]

interface CratesSidebarProps {
  selectedCategory: ItemCategory
  onSelectCategory: (category: ItemCategory) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

/**
 * Sidebar for the Crates app with category navigation and search
 */
export function CratesSidebar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CratesSidebarProps) {
  return (
    <div className="w-56 flex-shrink-0 bg-[#13100d] border-r border-amber-900/30 flex flex-col">
      {/* Header with Logo */}
      <div className="p-4 border-b border-amber-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-xl shadow-lg">
            📦
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-100">Crates</h1>
            <p className="text-xs text-amber-200/50">Curated Discoveries</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-200/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search crates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full pl-9 pr-4 py-2
              bg-amber-950/30
              border border-amber-900/30
              rounded-lg
              text-sm text-amber-100
              placeholder-amber-200/30
              focus:outline-none focus:border-amber-700/50
              transition-colors
            "
          />
        </div>
      </div>

      {/* Categories */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <p className="px-3 py-2 text-xs font-semibold text-amber-200/40 uppercase tracking-wider">
          Categories
        </p>
        <ul className="space-y-1">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category.id)}
                className={`
                  w-full px-3 py-2
                  flex items-center gap-3
                  rounded-lg
                  text-left
                  transition-all duration-150
                  ${
                    selectedCategory === category.id
                      ? 'bg-amber-800/40 text-amber-100 shadow-inner'
                      : 'text-amber-200/70 hover:bg-amber-900/20 hover:text-amber-100'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium">{category.label}</span>
                  <span className="block text-xs text-amber-200/40 truncate">
                    {category.description}
                  </span>
                </div>
                {selectedCategory === category.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-amber-900/30">
        <p className="text-xs text-amber-200/30 text-center">
          A personal collection of discoveries
        </p>
      </div>
    </div>
  )
}

export default CratesSidebar
