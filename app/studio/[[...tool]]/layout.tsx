export const metadata = {
  title: 'Sanity Studio | Ubuntu Portfolio',
  description: 'Content management for Ubuntu Portfolio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
