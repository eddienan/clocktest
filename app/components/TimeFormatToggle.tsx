'use client'

import { useState } from 'react'

interface TimeFormatToggleProps {
  onFormatChange: (is24Hour: boolean) => void
}

export default function TimeFormatToggle({ onFormatChange }: TimeFormatToggleProps) {
  const [is24Hour, setIs24Hour] = useState(true)

  const handleFormatChange = () => {
    const newFormat = !is24Hour
    setIs24Hour(newFormat)
    onFormatChange(newFormat)
  }

  return (
    <button
      onClick={handleFormatChange}
      className="px-4 py-2 rounded-lg bg-gray-800/50 text-white/80 hover:bg-gray-700/50 transition-colors"
    >
      24H
    </button>
  )
} 