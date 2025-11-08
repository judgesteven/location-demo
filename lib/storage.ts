const STORAGE_KEY = 'elisa-adventures-state'

export interface UserState {
  xp: number
  completedMissions: number[]
  tier: string
}

const DEFAULT_STATE: UserState = {
  xp: 2450,
  completedMissions: [],
  tier: 'Silver',
}

export function getUserState(): UserState {
  if (typeof window === 'undefined') return DEFAULT_STATE
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return DEFAULT_STATE
    }
  }
  return DEFAULT_STATE
}

export function saveUserState(state: UserState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function updateXP(additionalXP: number): UserState {
  const current = getUserState()
  const newXP = current.xp + additionalXP
  
  // Determine tier based on XP
  let newTier = 'Bronze'
  if (newXP >= 5000) newTier = 'Platinum'
  else if (newXP >= 3000) newTier = 'Gold'
  else if (newXP >= 1000) newTier = 'Silver'
  
  const newState: UserState = {
    ...current,
    xp: newXP,
    tier: newTier,
  }
  
  saveUserState(newState)
  return newState
}

export function completeMission(missionId: number): void {
  const current = getUserState()
  if (current.completedMissions.includes(missionId)) return
  
  const newState: UserState = {
    ...current,
    completedMissions: [...current.completedMissions, missionId],
  }
  
  saveUserState(newState)
}

export function isMissionCompleted(missionId: number): boolean {
  const state = getUserState()
  return state.completedMissions.includes(missionId)
}

