import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elisa Adventures',
  description: 'Location-Based Challenges & Rewards',
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

