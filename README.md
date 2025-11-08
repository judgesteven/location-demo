# Elisa Adventures – Location-Based Challenges & Rewards

A mobile-first web app mock-up demonstrating the GameLayer gamification experience using React, Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🏠 **Home Dashboard**: View XP progress, tier badge, and active missions
- 🗺️ **Interactive Map**: Explore missions on a map of Helsinki with clickable pins
- 🎁 **Rewards Screen**: View earned badges and bonuses
- 🏆 **Leaderboard**: See top explorers in Helsinki
- ✨ **Animations**: Smooth transitions, XP bar animations, and confetti effects
- 💾 **Persistence**: Progress saved to localStorage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Map**: Leaflet.js with React Leaflet
- **Confetti**: canvas-confetti
- **Data**: Local mock JSON files

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles and Tailwind imports
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main app component with routing
├── components/
│   ├── Home.tsx          # Dashboard with missions preview
│   ├── MapView.tsx       # Interactive map with mission pins
│   ├── MissionCard.tsx   # Mission card component
│   ├── MissionCardModal.tsx  # Modal for mission details and check-in
│   ├── Rewards.tsx       # Rewards and badges screen
│   ├── Leaderboard.tsx   # Leaderboard screen
│   ├── BottomNav.tsx     # Bottom navigation bar
│   └── XPProgressBar.tsx # Animated XP progress bar
├── data/
│   ├── missions.json     # Mission data with locations
│   ├── rewards.json      # Rewards and badges data
│   └── leaderboard.json  # Leaderboard data
└── lib/
    └── storage.ts        # localStorage utilities for user state
```

## Design

- **Mobile-first**: Optimized for mobile portrait (max width 430px)
- **Elisa Brand Colors**: Blue (#0066CC), Cyan (#00B4D8), Light (#E6F3FF)
- **iOS-style**: Rounded cards, soft shadows, minimal aesthetic
- **Smooth Animations**: Framer Motion transitions throughout

## Features in Detail

### Home Dashboard
- Personalized greeting
- XP progress bar with tier thresholds
- Tier badge display
- Three active mission preview cards
- Quick navigation to map

### Map View
- Full-width interactive map centered on Helsinki
- 6 mission pins with icons
- Click pins to open mission details modal

### Mission Check-In
- View mission details and rewards
- Check-in button triggers:
  - XP gain animation
  - Confetti celebration
  - Progress bar update
  - Mission marked as completed

### Rewards
- List of all available rewards
- Visual distinction for earned vs. locked
- Reward statistics

### Leaderboard
- Top 10 explorers
- Current user highlighted
- XP and tier information

## Mock Data

All data is stored in JSON files in the `/data` directory:
- `missions.json`: Mission locations, descriptions, and rewards
- `rewards.json`: Available badges and bonuses
- `leaderboard.json`: Top players with ranks and XP

## State Management

User progress is persisted in localStorage:
- Current XP
- Completed missions
- Current tier

Tier progression:
- **Bronze**: 0-999 XP
- **Silver**: 1000-2999 XP
- **Gold**: 3000-4999 XP
- **Platinum**: 5000+ XP

## Deployment

This project is ready to deploy to Vercel:

```bash
vercel
```

Or build and deploy to any static hosting service.

## Notes

- This is a **mock-up** and does not connect to real APIs
- Map uses OpenStreetMap tiles (no API key required)
- All data is local and persists in browser localStorage
- Designed for mobile-first experience but works on desktop

