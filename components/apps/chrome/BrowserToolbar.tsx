'use client'

import React from 'react'

interface BrowserToolbarProps {
  currentPath: string
  canGoBack: boolean
  canGoForward: boolean
  onBack: () => void
  onForward: () => void
  onHome: () => void
  onRefresh: () => void
}

/**
 * Browser-style toolbar with navigation and address bar
 */
export function BrowserToolbar({
  currentPath,
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onHome,
  onRefresh,
}: BrowserToolbarProps) {
  return (
    <div className="browser-toolbar flex items-center gap-2 px-3 py-2 bg-[#292a2d] border-b border-white/10">
      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            canGoBack ? 'text-white/70 hover:text-white' : 'text-white/30 cursor-not-allowed'
          }`}
          title="Back"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
            canGoForward ? 'text-white/70 hover:text-white' : 'text-white/30 cursor-not-allowed'
          }`}
          title="Forward"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={onRefresh}
          className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Refresh"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button
          onClick={onHome}
          className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Home"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>

      {/* Address bar */}
      <div className="flex-1 flex items-center bg-[#202124] rounded-full px-4 py-1.5">
        <svg className="w-4 h-4 text-white/40 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
        <span className="text-white/60 text-sm font-mono">
          tarikmoody.com{currentPath}
        </span>
      </div>

      {/* Menu button */}
      <button className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
    </div>
  )
}
