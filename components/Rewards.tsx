'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import rewardsData from '@/data/rewards.json'

export default function Rewards() {
  const [rewards] = useState(rewardsData)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Rewards 🎁</h1>
        <p className="text-gray-600">Earned badges and bonuses</p>
      </div>

      <div className="space-y-4">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl p-4 shadow-md border-2 ${
              reward.earned
                ? 'border-green-300 bg-gradient-to-r from-green-50 to-white'
                : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{reward.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{reward.title}</h3>
                  {reward.earned && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="text-green-600"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{reward.description}</p>
                {reward.earned && reward.date && (
                  <p className="text-xs text-gray-500 mt-1">Earned: {reward.date}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-elisa-blue to-elisa-cyan rounded-2xl p-4 text-white"
      >
        <p className="text-sm opacity-90 mb-1">Total Rewards</p>
        <p className="text-3xl font-bold">
          {rewards.filter((r) => r.earned).length} / {rewards.length}
        </p>
      </motion.div>
    </motion.div>
  )
}

