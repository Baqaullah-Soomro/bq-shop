export const metadata = {
  title: 'Sanity Studio',
  description: 'Shop-Co Content Management System'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export const dynamic = 'force-static'

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 