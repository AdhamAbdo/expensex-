import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import { MonthSummary } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface SummaryStatsRowProps {
  summary: MonthSummary
  currency: string
}

export default function SummaryStatsRow({ summary, currency }: SummaryStatsRowProps) {
  const stats = [
    {
      label: 'Income',
      value: formatCurrency(summary.income, currency),
      icon: TrendingUp,
      color: 'text-income',
      bg: 'bg-income-light',
    },
    {
      label: 'Expenses',
      value: formatCurrency(summary.expenses, currency),
      icon: TrendingDown,
      color: 'text-expense',
      bg: 'bg-expense-light',
    },
    {
      label: 'Daily Avg',
      value: formatCurrency(summary.dailyAverage, currency),
      icon: Calendar,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white rounded-2xl p-3 shadow-card">
          <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center mb-2`}>
            <Icon size={16} className={color} />
          </div>
          <p className="text-slate-400 text-xs mb-0.5">{label}</p>
          <p className={`font-bold text-xs ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
