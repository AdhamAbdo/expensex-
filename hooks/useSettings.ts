'use client'

import { useState, useEffect } from 'react'

interface Settings {
  currency: string
  monthStartDay: number
}

const DEFAULT_SETTINGS: Settings = {
  currency: 'USD',
  monthStartDay: 1,
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const stored = localStorage.getItem('expensex_settings')
    if (stored) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
      } catch {}
    }
  }, [])

  const updateSettings = (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    localStorage.setItem('expensex_settings', JSON.stringify(newSettings))
  }

  return { settings, updateSettings }
}
