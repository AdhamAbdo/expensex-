'use client'

import { TrendingUp } from 'lucide-react'
import { User } from '@supabase/supabase-js'

interface AppHeaderProps {
  user: User | null
  title?: string
}

export default function AppHeader({ user, title = 'ExpenseX' }: AppHeaderProps) {
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || '?'

  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
          <TrendingUp size={16} className="text-white" />
        </div>
        <span className="font-display text-xl font-bold text-slate-800">
          {title.replace('X', '')}<span className="text-brand-primary">X</span>
        </span>
      </div>

      <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-sm font-bold">{initials}</span>
        )}
      </div>
    </div>
  )
}
