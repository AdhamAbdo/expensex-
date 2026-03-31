'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { DailyData } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface DailySpendingChartProps {
  data: DailyData[]
  currency: string
}

export default function DailySpendingChart({ data, currency }: DailySpendingChartProps) {
  // Thin out data for cleaner display on mobile
  const step = Math.max(1, Math.floor(data.length / 12))
  const displayData = data.filter((_, i) => i % step === 0 || i === data.length - 1)

  const hasData = data.some(d => d.income > 0 || d.expenses > 0)

  if (!hasData) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-4">
        <h3 className="font-display font-bold text-slate-800 mb-3">Daily Trend</h3>
        <div className="text-center py-6 text-slate-400 text-sm">No data for this period</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <h3 className="font-display font-bold text-slate-800 mb-1">Daily Spending Trend</h3>
      <p className="text-xs text-slate-400 mb-4">Income vs Expenses over time</p>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={displayData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(val: number, name: string) => [formatCurrency(val, currency), name === 'income' ? 'Income' : 'Expenses']}
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
          />
          <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} fill="url(#incomeGrad)" dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3 justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-income" />
          <span className="text-xs text-slate-500">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-expense" />
          <span className="text-xs text-slate-500">Expenses</span>
        </div>
      </div>
    </div>
  )
}
