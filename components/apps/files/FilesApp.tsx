'use client'

import { useState, useEffect } from 'react'
import { getFolders, getFiles, Folder, FileItem } from '@/lib/sanity'
import Image from 'next/image'

interface FilesAppProps {
  className?: string
}

// Folder color mapping
const FOLDER_COLORS: Record<string, string> = {
  default: 'text-amber-400',
  blue: 'text-blue-400',
  green: 'text-emerald-400',
  orange: 'text-orange-400',
  purple: 'text-purple-400',
  red: 'text-red-400',
}

/**
 * FilesApp - A file manager that displays folders and files from Sanity
 * Supports folder navigation and file preview
 */
export function FilesApp({ className = '' }: FilesAppProps) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [folderPath, setFolderPath] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)

  // Fetch folders and files from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foldersData, filesData] = await Promise.all([
          getFolders(),
          getFiles(),
        ])
        setFolders(foldersData || [])
        setFiles(filesData || [])
      } catch (err) {
        console.error('Failed to fetch file data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Get folders in current directory
  const currentFolders = folders.filter((f) =>
    currentFolderId ? f.parentFolderId === currentFolderId : !f.parentFolderId
  )

  // Get files in current directory
  const currentFiles = files.filter((f) =>
    currentFolderId ? f.folderId === currentFolderId : !f.folderId
  )

  // Navigate into a folder
  const openFolder = (folder: Folder) => {
    setFolderPath([...folderPath, folder])
    setCurrentFolderId(folder._id)
  }

  // Navigate to a specific level in breadcrumb
  const navigateTo = (index: number) => {
    if (index === -1) {
      // Go to root
      setFolderPath([])
      setCurrentFolderId(null)
    } else {
      const newPath = folderPath.slice(0, index + 1)
      setFolderPath(newPath)
      setCurrentFolderId(newPath[newPath.length - 1]._id)
    }
  }

  // Handle file double-click
  const handleFileDoubleClick = (file: FileItem) => {
    if (file.fileType === 'image' || file.fileType === 'pdf') {
      setPreviewFile(file)
    } else if (file.fileUrl) {
      // Open other files in new tab
      window.open(file.fileUrl, '_blank')
    }
  }

  // Close preview
  const closePreview = () => {
    setPreviewFile(null)
  }

  return (
    <div className={`files-app h-full flex flex-col bg-[#1e1e1e] ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-white/10">
        {/* Back button */}
        <button
          onClick={() => folderPath.length > 0 && navigateTo(folderPath.length - 2)}
          disabled={folderPath.length === 0}
          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Go back"
        >
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Home button */}
        <button
          onClick={() => navigateTo(-1)}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          title="Go to home"
        >
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-white/60 ml-2 overflow-x-auto">
          <button
            onClick={() => navigateTo(-1)}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            Home
          </button>
          {folderPath.map((folder, index) => (
            <span key={folder._id} className="flex items-center gap-1">
              <span className="text-white/30">/</span>
              <button
                onClick={() => navigateTo(index)}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {folder.name}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        ) : currentFolders.length === 0 && currentFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white/40">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p>This folder is empty</p>
            <p className="text-xs mt-1">Add files and folders in Sanity Studio</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {/* Folders */}
            {currentFolders.map((folder) => (
              <button
                key={folder._id}
                onDoubleClick={() => openFolder(folder)}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <svg
                  className={`w-12 h-12 ${FOLDER_COLORS[folder.color || 'default']} group-hover:scale-105 transition-transform`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>
                <span className="text-xs text-white/80 mt-2 text-center truncate w-full">
                  {folder.name}
                </span>
              </button>
            ))}

            {/* Files */}
            {currentFiles.map((file) => (
              <button
                key={file._id}
                onDoubleClick={() => handleFileDoubleClick(file)}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                {file.fileType === 'image' && file.imageUrl ? (
                  <div className="w-12 h-12 rounded overflow-hidden bg-white/10 group-hover:scale-105 transition-transform">
                    <Image
                      src={file.imageUrl}
                      alt={file.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : file.fileType === 'pdf' ? (
                  <svg
                    className="w-12 h-12 text-red-400 group-hover:scale-105 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13H10v4H8.5v-4zm2.5 0h1.5v4H11v-4zm2.5 0H15v4h-1.5v-4z"/>
                  </svg>
                ) : (
                  <svg
                    className="w-12 h-12 text-blue-400 group-hover:scale-105 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm8 4h-6v-2h6v2zm0-4h-6v-2h6v2z"/>
                  </svg>
                )}
                <span className="text-xs text-white/80 mt-2 text-center truncate w-full">
                  {file.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
          onClick={closePreview}
        >
          <div
            className="relative max-w-4xl max-h-full w-full h-full flex flex-col bg-[#2d2d2d] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-white/10">
              <span className="text-white font-medium truncate">{previewFile.name}</span>
              <button
                onClick={closePreview}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
              {previewFile.fileType === 'image' && previewFile.imageUrl ? (
                <Image
                  src={previewFile.imageUrl}
                  alt={previewFile.name}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                />
              ) : previewFile.fileType === 'pdf' && previewFile.fileUrl ? (
                <iframe
                  src={previewFile.fileUrl}
                  title={previewFile.name}
                  className="w-full h-full bg-white rounded"
                />
              ) : (
                <div className="text-white/50">Cannot preview this file</div>
              )}
            </div>

            {/* Description if available */}
            {previewFile.description && (
              <div className="px-4 py-3 bg-[#1e1e1e] border-t border-white/10">
                <p className="text-white/60 text-sm">{previewFile.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilesApp
