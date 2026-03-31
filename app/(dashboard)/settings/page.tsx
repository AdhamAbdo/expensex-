'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, ChevronRight, Globe, DollarSign, Palette, Shield, MessageSquare, HelpCircle, Database, Cloud, TrendingUp } from 'lucide-react'
import { useUser } from '@/hooks/useUser'
import { useSettings } from '@/hooks/useSettings'
import { CURRENCIES } from '@/types'

export default function SettingsPage() {
  const { user, signOut } = useUser()
  const { settings, updateSettings } = useSettings()
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const avatarUrl = user?.user_metadata?.avatar_url
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const selectedCurrency = CURRENCIES.find(c => c.code === settings.currency) || CURRENCIES[0]

  const handleSignOut = async () => {
    setLoggingOut(true)
    await signOut()
    router.push('/login')
  }

  interface SettingItem {
    icon: React.ElementType
    iconBg: string
    iconColor: string
    label: string
    value?: string
    description?: string
    onClick: () => void
  }

  interface SettingSection {
    title: string
    items: SettingItem[]
  }

  const sections: SettingSection[] = [
    {
      title: 'Preferences',
      items: [
        {
          icon: DollarSign,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          label: 'Currency',
          value: `${selectedCurrency.code} – ${selectedCurrency.name}`,
          onClick: () => setShowCurrencyPicker(!showCurrencyPicker),
        },
        {
          icon: Palette,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          label: 'Appearance',
          value: 'Light',
          onClick: () => alert('Dark mode coming soon! 🌙'),
        },
      ],
    },
    {
      title: 'Data Management',
      items: [
        {
          icon: Database,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          label: 'Export Data',
          description: 'Download or export your transaction data.',
          onClick: () => router.push('/analytics'),
        },
        {
          icon: Cloud,
          iconBg: 'bg-teal-100',
          iconColor: 'text-teal-600',
          label: 'Manage Storage',
          description: 'See usage and clear your data saved on cloud.',
          onClick: () => alert('Storage management coming soon!'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          label: 'Help & Support',
          onClick: () => alert('Help center coming soon!'),
        },
        {
          icon: MessageSquare,
          iconBg: 'bg-teal-100',
          iconColor: 'text-teal-600',
          label: 'Send Feedback',
          onClick: () => alert('Feedback form coming soon!'),
        },
        {
          icon: Shield,
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-600',
          label: 'Privacy Policy',
          onClick: () => alert('Privacy policy coming soon!'),
        },
      ],
    },
  ]

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
          <TrendingUp size={16} className="text-white" />
        </div>
        <span className="font-display text-xl font-bold text-slate-800">
          Expense<span className="text-brand-primary">X</span>
        </span>
      </div>

      <h1 className="font-display text-2xl font-bold text-slate-800 mb-4">Settings</h1>

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-lg font-bold">{initials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 truncate">{fullName}</p>
            <p className="text-sm text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => alert('Profile editing coming soon!')}
          className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <span className="text-sm font-medium">✏️ Edit Profile</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Settings sections */}
      {sections.map(section => (
        <div key={section.title} className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-1">{section.title}</p>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-slate-50">
            {section.items.map(item => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 p-3.5 hover:bg-slate-50 active:bg-slate-100 transition-all text-left"
              >
                <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 text-sm">{item.label}</p>
                  {item.description && (
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.description}</p>
                  )}
                </div>
                {item.value && <span className="text-xs text-slate-400 font-medium flex-shrink-0">{item.value}</span>}
                <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Currency picker inline */}
          {section.title === 'Preferences' && showCurrencyPicker && (
            <div className="bg-white rounded-2xl shadow-card mt-2 overflow-hidden animate-slide-up max-h-60 overflow-y-auto">
              {CURRENCIES.map(curr => (
                <button
                  key={curr.code}
                  onClick={() => { updateSettings({ currency: curr.code }); setShowCurrencyPicker(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all text-left ${
                    settings.currency === curr.code ? 'bg-brand-light' : ''
                  }`}
                >
                  <span className="text-lg font-bold text-brand-primary w-8">{curr.symbol}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{curr.code}</p>
                    <p className="text-xs text-slate-400">{curr.name}</p>
                  </div>
                  {settings.currency === curr.code && (
                    <span className="ml-auto text-brand-primary text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={handleSignOut}
        disabled={loggingOut}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-expense-light text-expense font-semibold hover:bg-expense hover:text-white transition-all active:scale-[0.98] disabled:opacity-60"
      >
        {loggingOut ? (
          <span className="w-4 h-4 border-2 border-expense/30 border-t-expense rounded-full animate-spin" />
        ) : (
          <LogOut size={18} />
        )}
        {loggingOut ? 'Signing out...' : 'Sign Out'}
      </button>

      <p className="text-center text-xs text-slate-300 mt-4">ExpenseX v1.0.0</p>
    </div>
  )
}
