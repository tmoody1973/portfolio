'use client'

import { useState, useMemo, useEffect } from 'react'
import { CratesSidebar, ItemCategory } from './CratesSidebar'
import { CrateItemCard } from './CrateItemCard'
import { CrateItemDetail } from './CrateItemDetail'
import { sanityClient, curatedItemsQuery } from '@/lib/sanity'

// Types for curated items
export interface CuratedItem {
  id: string
  _id?: string
  title: string
  itemType: 'music' | 'book' | 'link' | 'tool'
  creator?: string
  coverImage?: string
  coverImageUrl?: string
  curatorNotes?: string
  tags?: string[]
  featured?: boolean
  // Music fields
  embedType?: 'youtube' | 'bandcamp' | 'spotify' | 'soundcloud' | 'mixcloud'
  embedUrl?: string
  bandcampAlbumId?: string
  bandcampTrackId?: string
  genre?: string
  // Book fields
  author?: string
  purchaseUrl?: string
  isbn?: string
  // Link fields
  url?: string
  description?: string
  category?: string
  // Substack link
  substackUrl?: string
}

// Sample data (would come from Sanity)
const SAMPLE_ITEMS: CuratedItem[] = [
  {
    id: '1',
    title: 'Kamasi Washington - The Epic',
    itemType: 'music',
    creator: 'Kamasi Washington',
    genre: 'Jazz',
    embedType: 'spotify',
    embedUrl: 'https://open.spotify.com/album/5bcB5P7eYn7hpuMR4W06Bq',
    curatorNotes: 'A three-hour jazz odyssey that redefined modern jazz. Essential listening.',
    tags: ['Jazz', 'Spiritual Jazz', 'Essential'],
    featured: true,
  },
  {
    id: '2',
    title: 'Flying Lotus - Cosmogramma',
    itemType: 'music',
    creator: 'Flying Lotus',
    genre: 'Electronic',
    embedType: 'bandcamp',
    embedUrl: 'https://flyinglotus.bandcamp.com/album/cosmogramma',
    curatorNotes: 'A genre-bending masterpiece blending jazz, electronic, and hip-hop.',
    tags: ['Electronic', 'Jazz Fusion', 'Experimental'],
    featured: true,
  },
  {
    id: '3',
    title: 'The Design of Everyday Things',
    itemType: 'book',
    creator: 'Don Norman',
    author: 'Don Norman',
    purchaseUrl: 'https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654',
    curatorNotes: 'The foundational text on user-centered design. Changed how I think about interfaces.',
    tags: ['Design', 'UX', 'Classic'],
    featured: true,
  },
  {
    id: '4',
    title: 'Eloquent JavaScript',
    itemType: 'book',
    creator: 'Marijn Haverbeke',
    author: 'Marijn Haverbeke',
    purchaseUrl: 'https://eloquentjavascript.net/',
    curatorNotes: 'Free online and beautifully written. Great for deepening JS understanding.',
    tags: ['JavaScript', 'Programming', 'Learning'],
    featured: false,
  },
  {
    id: '5',
    title: 'Excalidraw',
    itemType: 'tool',
    creator: 'Excalidraw Team',
    url: 'https://excalidraw.com',
    description: 'Virtual whiteboard for sketching hand-drawn like diagrams',
    category: 'tool',
    curatorNotes: 'My go-to for quick diagrams and brainstorming. The hand-drawn aesthetic is charming.',
    tags: ['Design', 'Diagrams', 'Free'],
    featured: false,
  },
  {
    id: '6',
    title: 'The Pudding',
    itemType: 'link',
    creator: 'The Pudding',
    url: 'https://pudding.cool',
    description: 'Visual essays explaining ideas debated in culture',
    category: 'inspiration',
    curatorNotes: 'Incredible data visualization and storytelling. Always inspiring.',
    tags: ['Data Viz', 'Essays', 'Inspiration'],
    featured: true,
  },
  {
    id: '7',
    title: 'Theo Parrish - Parallel Dimensions',
    itemType: 'music',
    creator: 'Theo Parrish',
    genre: 'House',
    embedType: 'bandcamp',
    embedUrl: 'https://soundsignature.bandcamp.com/',
    curatorNotes: 'Deep, soulful Detroit house at its finest.',
    tags: ['House', 'Detroit', 'Deep'],
    featured: false,
  },
  {
    id: '8',
    title: 'Raycast',
    itemType: 'tool',
    creator: 'Raycast',
    url: 'https://raycast.com',
    description: 'Blazingly fast launcher that lets you control your tools',
    category: 'tool',
    curatorNotes: 'Replaced Spotlight for me. The extensions ecosystem is amazing.',
    tags: ['Productivity', 'macOS', 'Launcher'],
    featured: false,
  },
]

interface CratesAppProps {
  className?: string
}

type View = 'grid' | 'detail'

/**
 * Crates app - A curated collection of music, books, links, and tools
 * Styled like a record store crate full of discoveries
 */
export function CratesApp({ className = '' }: CratesAppProps) {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all')
  const [selectedItem, setSelectedItem] = useState<CuratedItem | null>(null)
  const [view, setView] = useState<View>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [items, setItems] = useState<CuratedItem[]>(SAMPLE_ITEMS)
  const [loading, setLoading] = useState(true)

  // Fetch items from Sanity on mount
  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await sanityClient.fetch(curatedItemsQuery)
        if (data && data.length > 0) {
          // Transform Sanity data to match our interface
          const transformedItems = data.map((item: any) => ({
            ...item,
            id: item._id,
            coverImage: item.coverImageUrl,
          }))
          setItems(transformedItems)
        }
      } catch (error) {
        console.error('Failed to fetch from Sanity, using sample data:', error)
        // Keep using SAMPLE_ITEMS as fallback
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  // Filter items by category and search
  const filteredItems = useMemo(() => {
    let filtered = items

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.itemType === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.creator?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [items, selectedCategory, searchQuery])

  // Get featured items
  const featuredItems = useMemo(() => {
    return items.filter((item) => item.featured)
  }, [items])

  // Handle item selection
  const handleSelectItem = (item: CuratedItem) => {
    setSelectedItem(item)
    setView('detail')
  }

  // Handle back to grid
  const handleBack = () => {
    setSelectedItem(null)
    setView('grid')
  }

  return (
    <div className={`crates-app h-full flex bg-[#1a1612] ${className}`}>
      {/* Sidebar */}
      <CratesSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat)
          setView('grid')
          setSelectedItem(null)
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-amber-900/30">
          <div className="flex items-center justify-between">
            {view === 'detail' && selectedItem ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-amber-200/70 hover:text-amber-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Crates</span>
              </button>
            ) : (
              <h1 className="text-xl font-bold text-amber-100">
                {selectedCategory === 'all'
                  ? 'All Discoveries'
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                <span className="ml-2 text-sm font-normal text-amber-200/50">
                  ({filteredItems.length} items)
                </span>
              </h1>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 windowMainScreen">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-pulse text-amber-500 text-5xl mb-4">📦</div>
              <p className="text-amber-200/50">Digging through the crates...</p>
            </div>
          ) : view === 'grid' ? (
            <>
              {/* Featured Section (only on "all" category) */}
              {selectedCategory === 'all' && featuredItems.length > 0 && !searchQuery && (
                <section className="mb-8">
                  <h2 className="text-lg font-semibold text-amber-200 mb-4 flex items-center gap-2">
                    <span className="text-amber-400">★</span> Featured Picks
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featuredItems.map((item) => (
                      <CrateItemCard
                        key={item.id}
                        item={item}
                        onClick={() => handleSelectItem(item)}
                        featured
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* All Items Grid */}
              <section>
                {selectedCategory === 'all' && !searchQuery && (
                  <h2 className="text-lg font-semibold text-amber-200 mb-4">All Items</h2>
                )}
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((item) => (
                      <CrateItemCard
                        key={item.id}
                        item={item}
                        onClick={() => handleSelectItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-amber-200/50">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p>No items found matching your search</p>
                  </div>
                )}
              </section>
            </>
          ) : (
            // Detail View
            selectedItem && (
              <CrateItemDetail item={selectedItem} onBack={handleBack} />
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default CratesApp
