'use client'

import { useState, useEffect } from 'react'

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    // 补零
    const formatNumber = (num: number) => num.toString().padStart(2, '0')

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
  }

  return (
    <div className="text-4xl font-bold text-white">
      {formatTime(time)}
    </div>
  )
} 