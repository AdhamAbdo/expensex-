'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Transaction } from '@/types'
import { formatCurrency, getCategoryIcon } from '@/lib/utils'

interface TransactionListProps {
  transactions: Transaction[]
  currency: string
  onDelete: (id: string) => Promise<{ error: string | null }>
}

export default function TransactionList({ transactions, currency, onDelete }: TransactionListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-5xl mb-3">💸</div>
        <h3 className="font-semibold text-slate-700 mb-1">No transactions yet</h3>
        <p className="text-slate-400 text-sm">Tap the + button to add your first transaction</p>
      </div>
    )
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await onDelete(id)
    setDeletingId(null)
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {transactions.map(transaction => {
        const isExpanded = expandedId === transaction.id
        const isIncome = transaction.type === 'income'
        const icon = getCategoryIcon(transaction.category)

        return (
          <div
            key={transaction.id}
            className="bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-200"
          >
            <div
              className="flex items-center gap-3 p-3.5 cursor-pointer active:bg-slate-50"
              onClick={() => setExpandedId(isExpanded ? null : transaction.id)}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                isIncome ? 'bg-income-light' : 'bg-expense-light'
              }`}>
                {icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{transaction.category}</p>
                <p className="text-xs text-slate-400 truncate">{transaction.description || transaction.category}</p>
              </div>

              {/* Amount & date */}
              <div className="text-right flex-shrink-0">
                <p className={`font-bold text-sm ${isIncome ? 'text-income' : 'text-expense'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
                </p>
                <p className="text-xs text-slate-400">
                  {format(new Date(transaction.date + 'T00:00:00'), 'MMM d, yyyy')}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-300 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Expanded details */}
            {isExpanded && (
              <div className="px-3.5 pb-3.5 pt-0 border-t border-slate-50 animate-fade-in">
                <div className="bg-slate-50 rounded-xl p-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Description</p>
                    <p className="text-sm text-slate-700">{transaction.description || '—'}</p>
                    <p className="text-xs text-slate-400 mt-2 mb-0.5">Type</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isIncome ? 'bg-income-light text-income-dark' : 'bg-expense-light text-expense-dark'
                    }`}>
                      {isIncome ? '📈 Income' : '📉 Expense'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    disabled={deletingId === transaction.id}
                    className="w-8 h-8 rounded-lg bg-expense-light flex items-center justify-center text-expense hover:bg-expense hover:text-white transition-all active:scale-95 flex-shrink-0 disabled:opacity-50"
                  >
                    {deletingId === transaction.id ? (
                      <span className="w-3 h-3 border-2 border-expense/30 border-t-expense rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
