'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthNavigatorProps {
  label: string
  sublabel?: string
  onPrev: () => void
  onNext: () => void
  disableNext?: boolean
}

export default function MonthNavigator({ label, sublabel, onPrev, onNext, disableNext }: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onPrev}
        className="w-10 h-10 rounded-xl bg-white shadow-card flex items-center justify-center active:scale-95 transition-all text-slate-600 hover:text-slate-900"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="text-center">
        <h2 className="font-display text-lg font-bold text-slate-800">{label}</h2>
        {sublabel && <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>}
      </div>

      <button
        onClick={onNext}
        disabled={disableNext}
        className="w-10 h-10 rounded-xl bg-white shadow-card flex items-center justify-center active:scale-95 transition-all text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
