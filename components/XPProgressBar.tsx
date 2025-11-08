'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface XPProgressBarProps {
  currentXP: number
  maxXP?: number
}

const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 1000,
  Gold: 3000,
  Platinum: 5000,
}

export default function XPProgressBar({ currentXP, maxXP = 3000 }: XPProgressBarProps) {
  const [displayXP, setDisplayXP] = useState(currentXP)
  const progress = Math.min((displayXP / maxXP) * 100, 100)

  useEffect(() => {
    // Animate XP change
    const targetXP = currentXP
    const duration = 1000
    const steps = 60
    const increment = (targetXP - displayXP) / steps
    const stepDuration = duration / steps

    if (Math.abs(targetXP - displayXP) > 1) {
      const interval = setInterval(() => {
        setDisplayXP((prev) => {
          const next = prev + increment
          if (increment > 0 && next >= targetXP) {
            clearInterval(interval)
            return targetXP
          }
          if (increment < 0 && next <= targetXP) {
            clearInterval(interval)
            return targetXP
          }
          return next
        })
      }, stepDuration)

      return () => clearInterval(interval)
    }
  }, [currentXP, displayXP])

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">XP Progress</span>
        <span className="text-sm font-bold text-elisa-blue">
          {Math.floor(displayXP)} / {maxXP} XP
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-elisa-blue to-elisa-cyan rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

