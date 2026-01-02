import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anime Video Generator',
  description: 'Generate stunning anime-style videos with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
