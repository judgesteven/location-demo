'use client'

import { motion } from 'framer-motion'
import { Page } from '@/app/page'

interface BottomNavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { page: Page; icon: string; label: string }[] = [
  { page: 'home', icon: '🏠', label: 'Home' },
  { page: 'map', icon: '🗺️', label: 'Map' },
  { page: 'rewards', icon: '🎁', label: 'Rewards' },
  { page: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
]

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.page
          return (
            <motion.button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <span className={`text-2xl ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-elisa-blue' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-elisa-blue rounded-t-full"
                  initial={false}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

