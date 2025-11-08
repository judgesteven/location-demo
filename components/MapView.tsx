'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import L from 'leaflet'
import missionsData from '@/data/missions.json'
import MissionCardModal from './MissionCardModal'

// Fix Leaflet default icon issue with Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

// Dynamically import MapContainer to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

export default function MapView() {
  const [selectedMission, setSelectedMission] = useState<typeof missionsData[0] | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const helsinkiCenter: [number, number] = [60.1699, 24.9384]

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Explore Missions</h1>
      </div>

      <div className="h-full pt-16">
        <MapContainer
          center={helsinkiCenter}
          zoom={13}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {missionsData.map((mission) => (
            <Marker
              key={mission.id}
              position={[mission.lat, mission.lon]}
              eventHandlers={{
                click: () => setSelectedMission(mission),
              }}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-bold">{mission.title}</p>
                  <p className="text-sm text-gray-600">{mission.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <AnimatePresence>
        {selectedMission && (
          <MissionCardModal
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

