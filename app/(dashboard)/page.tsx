'use client'

import { useState, useMemo } from 'react'
import { addMonths, subMonths, startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns'
import { Plus, Mic, Camera } from 'lucide-react'
import { useTransactions } from '@/hooks/useTransactions'
import { useSettings } from '@/hooks/useSettings'
import { useUser } from '@/hooks/useUser'
import { calculateSummary, getMonthRange } from '@/lib/utils'
import MonthNavigator from '@/components/ui/MonthNavigator'
import BalanceCard from '@/components/transactions/BalanceCard'
import TransactionList from '@/components/transactions/TransactionList'
import AddTransactionModal from '@/components/transactions/AddTransactionModal'
import AppHeader from '@/components/layout/AppHeader'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense'>('all')
  const { settings } = useSettings()
  const { user } = useUser()

  const startDate = startOfMonth(currentDate)
  const endDate = endOfMonth(currentDate)
  const { transactions, loading, addTransaction, deleteTransaction } = useTransactions(startDate, endDate)
  const monthRange = getMonthRange(currentDate)
  const summary = useMemo(() => calculateSummary(transactions, getDaysInMonth(currentDate)), [transactions, currentDate])

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') return transactions
    return transactions.filter(t => t.type === activeFilter)
  }, [transactions, activeFilter])

  const goToPrevMonth = () => setCurrentDate(prev => subMonths(prev, 1))
  const goToNextMonth = () => setCurrentDate(prev => addMonths(prev, 1))

  return (
    <div className="page-container">
      <AppHeader user={user} title="ExpenseX" />

      <MonthNavigator
        label={monthRange.label}
        sublabel={`${monthRange.startLabel} to ${monthRange.endLabel}`}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
        disableNext={currentDate >= new Date()}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <BalanceCard summary={summary} currency={settings.currency} />

          {/* Filter chips */}
          <div className="flex gap-2 mt-4 mb-3 overflow-x-auto no-scrollbar pb-1">
            {(['all', 'income', 'expense'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${activeFilter === filter
                    ? filter === 'income'
                      ? 'bg-income text-white border-income shadow-sm'
                      : filter === 'expense'
                        ? 'bg-expense text-white border-expense shadow-sm'
                        : 'bg-brand-primary text-white border-brand-primary shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                {filter === 'all' ? '📋 All' : filter === 'income' ? '📈 Income' : '📉 Expenses'}
              </button>
            ))}
          </div>

          <TransactionList
            transactions={filteredTransactions}
            currency={settings.currency}
            onDelete={deleteTransaction}
          />
        </>
      )}

      {/* FAB buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-30">
        {/* Voice input placeholder */}
        <button
          onClick={() => alert('Voice input coming soon! 🎤')}
          className="w-12 h-12 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
          title="Voice input (coming soon)"
        >
          <Mic size={18} />
        </button>

        {/* Receipt scan placeholder */}
        <button
          onClick={() => alert('Receipt scanning coming soon! 📷')}
          className="w-12 h-12 rounded-full bg-income text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
          title="Scan receipt (coming soon)"
        >
          <Camera size={18} />
        </button>

        {/* Add transaction */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-floating active:scale-95 transition-all animate-pulse-green"
          title="Add transaction"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={addTransaction}
          currency={settings.currency}
        />
      )}
    </div>
  )
}
