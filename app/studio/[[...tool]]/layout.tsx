export const metadata = {
  title: 'Sanity Studio | Ubuntu Portfolio',
  description: 'Content management for Ubuntu Portfolio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Don't wrap in html/body - parent RootLayout already provides those
  // Use a div wrapper to isolate studio styles
  return (
    <div className="sanity-studio-wrapper" style={{ height: '100vh', width: '100vw' }}>
      {children}
    </div>
  )
}
