'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { isMissionCompleted } from '@/lib/storage'

interface Mission {
  id: number
  title: string
  description: string
  reward: string
  status: string
  icon?: string
}

interface MissionCardProps {
  mission: Mission
  onClick?: () => void
}

export default function MissionCard({ mission, onClick }: MissionCardProps) {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    setCompleted(isMissionCompleted(mission.id))
  }, [mission.id])

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 shadow-md cursor-pointer border-2 transition-colors ${
        completed ? 'border-green-300 bg-green-50' : 'border-transparent hover:border-elisa-blue/30'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{mission.icon || '📍'}</span>
            <h3 className="text-lg font-bold text-gray-900">{mission.title}</h3>
            {completed && <span className="text-green-600">✅</span>}
          </div>
          <p className="text-gray-600 text-sm mb-2">{mission.description}</p>
          <p className="text-sm font-semibold text-elisa-blue">{mission.reward}</p>
        </div>
      </div>
    </motion.div>
  )
}

