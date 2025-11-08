'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { updateXP, completeMission, isMissionCompleted, getUserState } from '@/lib/storage'
import XPProgressBar from './XPProgressBar'

interface Mission {
  id: number
  title: string
  description: string
  reward: string
  status: string
  icon?: string
}

interface MissionCardModalProps {
  mission: Mission
  onClose: () => void
}

export default function MissionCardModal({ mission, onClose }: MissionCardModalProps) {
  const [completed, setCompleted] = useState(isMissionCompleted(mission.id))
  const [userState, setUserState] = useState(getUserState())
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCheckIn = () => {
    if (completed) return

    setIsAnimating(true)
    
    // Extract XP from reward string (e.g., "500 XP + 1 GB bonus data" -> 500)
    const xpMatch = mission.reward.match(/(\d+)\s*XP/)
    const xpGained = xpMatch ? parseInt(xpMatch[1]) : 300

    // Update state
    completeMission(mission.id)
    const newState = updateXP(xpGained)
    setUserState(newState)
    setCompleted(true)

    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0066CC', '#00B4D8', '#E6F3FF'],
    })

    setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-t-3xl w-full max-w-[430px] mx-auto p-6 space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          {/* Mission Icon & Title */}
          <div className="text-center pt-4">
            <div className="text-6xl mb-4">{mission.icon || '📍'}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{mission.title}</h2>
            <p className="text-gray-600">{mission.description}</p>
          </div>

          {/* Reward Summary */}
          <div className="bg-gradient-to-r from-elisa-blue to-elisa-cyan rounded-2xl p-4 text-white">
            <p className="text-sm opacity-90 mb-1">Reward</p>
            <p className="text-xl font-bold">{mission.reward}</p>
          </div>

          {/* XP Progress (if just completed) */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <XPProgressBar currentXP={userState.xp} />
            </motion.div>
          )}

          {/* Success Message */}
          {isAnimating && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-green-600">🎉 Mission Complete!</p>
            </motion.div>
          )}

          {/* Check In Button */}
          <button
            onClick={handleCheckIn}
            disabled={completed}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all ${
              completed
                ? 'bg-green-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-elisa-blue to-elisa-cyan hover:shadow-lg'
            }`}
          >
            {completed ? '✅ Completed' : 'Check In'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

