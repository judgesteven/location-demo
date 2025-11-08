'use client'

import { useState } from 'react'
import Home from '@/components/Home'
import MapView from '@/components/MapView'
import Rewards from '@/components/Rewards'
import Leaderboard from '@/components/Leaderboard'
import BottomNav from '@/components/BottomNav'

export type Page = 'home' | 'map' | 'rewards' | 'leaderboard'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [refreshKey, setRefreshKey] = useState(0)

  // Refresh home when navigating back to it
  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    if (page === 'home') {
      setRefreshKey((prev) => prev + 1)
    }
  }

  return (
    <div className="mobile-container relative pb-20">
      {currentPage === 'home' && <Home key={refreshKey} onNavigate={handleNavigate} />}
      {currentPage === 'map' && <MapView />}
      {currentPage === 'rewards' && <Rewards />}
      {currentPage === 'leaderboard' && <Leaderboard />}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  )
}

