'use client'

import { useState } from 'react'
import { FileText, Download, Copy, Check } from 'lucide-react'

interface ExportSectionProps {
  onExportCSV: () => void
  onGeneratePDF: () => Promise<void>
  onCopySummary: () => Promise<void>
}

export default function ExportSection({ onExportCSV, onGeneratePDF, onCopySummary }: ExportSectionProps) {
  const [pdfLoading, setPdfLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handlePDF = async () => {
    setPdfLoading(true)
    await onGeneratePDF()
    setPdfLoading(false)
  }

  const handleCopy = async () => {
    await onCopySummary()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const actions = [
    {
      label: 'Generate PDF Report',
      icon: FileText,
      onClick: handlePDF,
      loading: pdfLoading,
    },
    {
      label: 'Export to CSV',
      icon: Download,
      onClick: onExportCSV,
    },
    {
      label: copied ? 'Copied!' : 'Copy Report Summary',
      icon: copied ? Check : Copy,
      onClick: handleCopy,
      success: copied,
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <h3 className="font-display font-bold text-slate-800 mb-3">Export Data</h3>
      <div className="space-y-2">
        {actions.map(({ label, icon: Icon, onClick, loading, success }) => (
          <button
            key={label}
            onClick={onClick}
            disabled={loading}
            className={`
              w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 active:scale-[0.98]
              ${success
                ? 'border-income bg-income-light text-income-dark'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
              }
              disabled:opacity-60 disabled:cursor-not-allowed
            `}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            ) : (
              <Icon size={18} className={success ? 'text-income' : 'text-slate-500'} />
            )}
            <span className="font-medium text-sm">{loading ? 'Generating...' : label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
