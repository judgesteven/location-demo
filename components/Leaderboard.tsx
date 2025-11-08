'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import leaderboardData from '@/data/leaderboard.json'
import { getUserState, UserState } from '@/lib/storage'

const DEFAULT_USER_STATE: UserState = {
  xp: 2450,
  completedMissions: [],
  tier: 'Silver',
}

export default function Leaderboard() {
  const [userState, setUserState] = useState(DEFAULT_USER_STATE)
  const currentUserRank = leaderboardData.find((entry) => entry.isCurrentUser)?.rank || 17

  useEffect(() => {
    setUserState(getUserState())
  }, [])

  const tierColors = {
    Bronze: 'text-amber-600',
    Silver: 'text-gray-600',
    Gold: 'text-yellow-600',
    Platinum: 'text-purple-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard 🏆</h1>
        <p className="text-gray-600">Top explorers in Helsinki</p>
      </div>

      {/* Current User Highlight */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-elisa-blue to-elisa-cyan rounded-2xl p-4 text-white shadow-lg"
      >
        <p className="text-sm opacity-90 mb-1">Your Rank</p>
        <p className="text-2xl font-bold">You&apos;re ranked #{currentUserRank} 🏆</p>
        <p className="text-sm mt-2 opacity-90">{userState.xp} XP • {userState.tier} Explorer</p>
      </motion.div>

      {/* Leaderboard List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {leaderboardData.slice(0, 10).map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 flex items-center justify-between ${
                entry.isCurrentUser ? 'bg-elisa-light' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1
                      ? 'bg-yellow-400 text-yellow-900'
                      : entry.rank === 2
                      ? 'bg-gray-300 text-gray-700'
                      : entry.rank === 3
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {entry.rank}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {entry.name}
                    {entry.isCurrentUser && ' (You)'}
                  </p>
                  <p className={`text-sm ${tierColors[entry.tier as keyof typeof tierColors]}`}>
                    {entry.tier}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-elisa-blue">{entry.xp.toLocaleString()} XP</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

