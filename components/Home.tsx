'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getUserState } from '@/lib/storage'
import missionsData from '@/data/missions.json'
import XPProgressBar from './XPProgressBar'
import MissionCard from './MissionCard'
import { Page } from '@/app/page'

interface HomeProps {
  onNavigate?: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const [userState, setUserState] = useState(getUserState())
  const activeMissions = missionsData.slice(0, 3)

  useEffect(() => {
    // Refresh state when component mounts or when returning to home
    const refreshState = () => {
      setUserState(getUserState())
    }
    refreshState()
    
    // Also refresh on focus (when returning from another page)
    window.addEventListener('focus', refreshState)
    return () => window.removeEventListener('focus', refreshState)
  }, [])

  const tierEmoji = {
    Bronze: '🥉',
    Silver: '🌟',
    Gold: '⭐',
    Platinum: '💎',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Hi Ella 👋</h1>
        <p className="text-gray-600 mt-1">Ready for your next adventure?</p>
      </motion.div>

      {/* XP Progress Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <XPProgressBar currentXP={userState.xp} />
      </motion.div>

      {/* Tier Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-elisa-blue to-elisa-cyan rounded-2xl p-4 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Current Tier</p>
            <p className="text-2xl font-bold text-white">
              {userState.tier} Explorer {tierEmoji[userState.tier as keyof typeof tierEmoji]}
            </p>
          </div>
          <div className="text-4xl">
            {tierEmoji[userState.tier as keyof typeof tierEmoji]}
          </div>
        </div>
      </motion.div>

      {/* Active Missions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Active Missions</h2>
        {activeMissions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <MissionCard mission={mission} />
          </motion.div>
        ))}
      </div>

      {/* Open Map Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={() => onNavigate?.('map')}
        className="w-full bg-gradient-to-r from-elisa-blue to-elisa-cyan text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
      >
        Open Map to Explore 🗺️
      </motion.button>
    </motion.div>
  )
}

