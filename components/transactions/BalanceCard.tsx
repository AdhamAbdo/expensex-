'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react'
import { MonthSummary } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface BalanceCardProps {
  summary: MonthSummary
  currency: string
}

export default function BalanceCard({ summary, currency }: BalanceCardProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-500 text-sm font-medium">Net Balance</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className={`text-3xl font-display font-bold mb-3 ${summary.netBalance >= 0 ? 'text-income' : 'text-expense'}`}>
        {formatCurrency(summary.netBalance, currency)}
        <span className="text-lg text-slate-400 font-normal ml-1">{currency}</span>
      </div>

      {expanded && (
        <div className="space-y-2 animate-fade-in">
          {/* Income row */}
          <div className="flex items-center justify-between bg-income-light/60 rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-income flex items-center justify-center">
                <TrendingUp size={14} className="text-white" />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Income</span>
            </div>
            <span className="font-bold text-income">{formatCurrency(summary.income, currency)}</span>
          </div>

          {/* Expense row */}
          <div className="flex items-center justify-between bg-expense-light/60 rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-expense flex items-center justify-center">
                <TrendingDown size={14} className="text-white" />
              </div>
              <span className="font-semibold text-slate-700 text-sm">Expenses</span>
            </div>
            <span className="font-bold text-expense">{formatCurrency(summary.expenses, currency)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
