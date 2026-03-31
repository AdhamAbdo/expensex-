'use client'

import { useState, useMemo } from 'react'
import { startOfMonth, endOfMonth, subMonths, getDaysInMonth } from 'date-fns'
import { useTransactions } from '@/hooks/useTransactions'
import { useSettings } from '@/hooks/useSettings'
import { useUser } from '@/hooks/useUser'
import { calculateSummary, calculateCategorySummary, getDailyData, getMonthRange, formatCurrency, exportToCSV, generateSummaryText } from '@/lib/utils'
import AppHeader from '@/components/layout/AppHeader'
import SummaryStatsRow from '@/components/analytics/SummaryStatsRow'
import CategoryBreakdown from '@/components/analytics/CategoryBreakdown'
import DailySpendingChart from '@/components/analytics/DailySpendingChart'
import ExportSection from '@/components/analytics/ExportSection'

type FilterType = 'month' | 'last_month' | '3months'

function getDateRange(filter: FilterType) {
  const now = new Date()
  if (filter === 'month') return { start: startOfMonth(now), end: endOfMonth(now) }
  if (filter === 'last_month') {
    const last = subMonths(now, 1)
    return { start: startOfMonth(last), end: endOfMonth(last) }
  }
  return { start: startOfMonth(subMonths(now, 2)), end: endOfMonth(now) }
}

export default function AnalyticsPage() {
  const [filter, setFilter] = useState<FilterType>('month')
  const { settings } = useSettings()
  const { user } = useUser()

  const { start, end } = getDateRange(filter)
  const { transactions, loading } = useTransactions(start, end)

  const monthRange = getMonthRange(start)
  const summary = useMemo(() => calculateSummary(transactions, getDaysInMonth(start)), [transactions])
  const categorySummary = useMemo(() => calculateCategorySummary(transactions), [transactions])
  const dailyData = useMemo(() => getDailyData(transactions, start, end), [transactions, start, end])

  const filterLabels: Record<FilterType, string> = {
    month: 'This Month',
    last_month: 'Last Month',
    '3months': 'Last 3 Months',
  }

  const handleExportCSV = () => exportToCSV(transactions, 'expensex_transactions')

  const handleCopySummary = async () => {
    const text = generateSummaryText(summary, monthRange.label, settings.currency)
    await navigator.clipboard.writeText(text)
    alert('Summary copied to clipboard! 📋')
  }

  const handleGeneratePDF = async () => {
    const { default: jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.setTextColor(13, 148, 136)
    doc.text('ExpenseX Report', 14, 22)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Period: ${monthRange.label}`, 14, 35)
    doc.text(`Net Balance: ${formatCurrency(summary.netBalance, settings.currency)}`, 14, 44)
    doc.text(`Income: ${formatCurrency(summary.income, settings.currency)}`, 14, 52)
    doc.text(`Expenses: ${formatCurrency(summary.expenses, settings.currency)}`, 14, 60)

    autoTable(doc, {
      startY: 72,
      head: [['Date', 'Type', 'Category', 'Amount', 'Description']],
      body: transactions.map(t => [
        t.date, t.type, t.category,
        `${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount, settings.currency)}`,
        t.description
      ]),
      headStyles: { fillColor: [13, 148, 136] },
      alternateRowStyles: { fillColor: [245, 250, 249] },
    })

    doc.save(`expensex_report_${monthRange.label.replace(' ', '_')}.pdf`)
  }

  return (
    <div className="page-container">
      <AppHeader user={user} title="Analytics" />
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-4">Analytics</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {(Object.keys(filterLabels) as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${filter === f
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }
            `}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[120, 200, 300, 160].map((h, i) => (
            <div key={i} className="bg-slate-200 rounded-2xl" style={{ height: h }} />
          ))}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Net Balance hero card */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-5 text-white shadow-floating">
            <div className="flex items-start justify-between mb-2">
              <p className="text-teal-100 text-sm font-medium">Net Balance</p>
              <span className="text-2xl">📊</span>
            </div>
            <p className="font-display text-4xl font-bold">{formatCurrency(summary.netBalance, settings.currency)}</p>
            <p className="text-teal-100 text-xs mt-1">Income − Expenses</p>
          </div>

          <SummaryStatsRow summary={summary} currency={settings.currency} />
          <CategoryBreakdown categorySummary={categorySummary} currency={settings.currency} />
          <DailySpendingChart data={dailyData} currency={settings.currency} />
          <ExportSection
            onExportCSV={handleExportCSV}
            onGeneratePDF={handleGeneratePDF}
            onCopySummary={handleCopySummary}
          />
        </div>
      )}
    </div>
  )
}
