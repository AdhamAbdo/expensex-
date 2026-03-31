'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CategorySummary } from '@/types'
import { formatCurrency, getCategoryIcon } from '@/lib/utils'

interface CategoryBreakdownProps {
  categorySummary: CategorySummary[]
  currency: string
}

const CHART_COLORS = ['#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4', '#CCFBF1']

export default function CategoryBreakdown({ categorySummary, currency }: CategoryBreakdownProps) {
  if (categorySummary.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-4">
        <h3 className="font-display font-bold text-slate-800 mb-3">Categories</h3>
        <div className="text-center py-6 text-slate-400 text-sm">No expense data for this period</div>
      </div>
    )
  }

  const chartData = categorySummary.slice(0, 6).map(c => ({
    name: c.category.split(' ')[0], // Short label for chart
    fullName: c.category,
    total: c.total,
    percentage: c.percentage,
  }))

  return (
    <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
      <h3 className="font-display font-bold text-slate-800">Spending by Category</h3>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(val: number) => [formatCurrency(val, currency), 'Amount']}
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
          />
          <Bar dataKey="total" radius={[6, 6, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Category list */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Top Categories</p>
        {categorySummary.slice(0, 5).map((cat, i) => (
          <div key={cat.category} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-base flex-shrink-0">
              {getCategoryIcon(cat.category)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-slate-700 truncate">{cat.category}</p>
                <p className="text-sm font-bold text-slate-800 ml-2">{formatCurrency(cat.total, currency)}</p>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${cat.percentage}%`,
                    background: CHART_COLORS[i % CHART_COLORS.length],
                  }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{cat.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
