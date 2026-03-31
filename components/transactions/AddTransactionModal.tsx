'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { X, DollarSign } from 'lucide-react'
import { Transaction, DEFAULT_CATEGORIES } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface AddTransactionModalProps {
  onClose: () => void
  onAdd: (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => Promise<{ data: any; error: string | null }>
  currency: string
}

export default function AddTransactionModal({ onClose, onAdd, currency }: AddTransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = DEFAULT_CATEGORIES[type]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) { setError('Enter a valid amount'); return }
    if (!category) { setError('Please select a category'); return }

    setLoading(true)
    setError('')
    const { error: addError } = await onAdd({
      amount: numAmount,
      type,
      category,
      description,
      date,
    })

    if (addError) {
      setError(addError)
      setLoading(false)
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center modal-backdrop bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-t-3xl modal-content overflow-hidden">
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          <h2 className="font-display text-xl font-bold text-slate-800">Add Transaction</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 active:scale-95 transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-8 max-h-[85dvh] overflow-y-auto">
          {/* Type toggle */}
          <div className="flex gap-2 mb-5 p-1 bg-slate-100 rounded-2xl">
            {(['expense', 'income'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setType(t); setCategory('') }}
                className={`
                  flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                  ${type === t
                    ? t === 'income'
                      ? 'bg-income text-white shadow-sm'
                      : 'bg-expense text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                  }
                `}
              >
                {t === 'income' ? '📈 Income' : '📉 Expense'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-expense-light text-expense-dark text-sm rounded-xl p-3 mb-4 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Amount</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currency}</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input-field pl-14 text-lg font-bold"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`
                      p-2.5 rounded-xl text-center text-xs font-medium border transition-all duration-150 active:scale-95
                      ${category === cat.name
                        ? 'border-brand-primary bg-brand-light text-brand-secondary shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="text-lg mb-0.5">{cat.icon}</div>
                    <div className="leading-tight">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                max={format(new Date(), 'yyyy-MM-dd')}
                className="input-field"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Description <span className="text-slate-300 font-normal">(optional)</span></label>
              <input
                type="text"
                placeholder="What was this for?"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="input-field"
                maxLength={120}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </span>
              ) : (
                `Add ${type === 'income' ? 'Income' : 'Expense'}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
