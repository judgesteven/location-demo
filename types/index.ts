export interface Mission {
  id: number
  title: string
  description: string
  reward: string
  status: string
  lat: number
  lon: number
  icon?: string
}

export interface Reward {
  id: number
  title: string
  description: string
  icon: string
  earned: boolean
  date: string | null
}

export interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  tier: string
  isCurrentUser?: boolean
}

