export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  user_id: string
  amount: number
  type: TransactionType
  category: string
  date: string
  description: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  user_id: string | null
  icon?: string
  color?: string
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  currency: string
  month_start_day: number
}

export interface MonthSummary {
  income: number
  expenses: number
  netBalance: number
  dailyAverage: number
  transactionCount: number
}

export interface CategorySummary {
  category: string
  total: number
  count: number
  percentage: number
}

export interface DailyData {
  date: string
  income: number
  expenses: number
}

export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
]

export const DEFAULT_CATEGORIES = {
  expense: [
    { name: 'Food & Dining', icon: '🍽️', color: '#F97316' },
    { name: 'Shopping', icon: '🛍️', color: '#8B5CF6' },
    { name: 'Transportation', icon: '🚗', color: '#3B82F6' },
    { name: 'Housing', icon: '🏠', color: '#10B981' },
    { name: 'Healthcare', icon: '💊', color: '#EF4444' },
    { name: 'Entertainment', icon: '🎬', color: '#EC4899' },
    { name: 'Clothing', icon: '👕', color: '#14B8A6' },
    { name: 'Education', icon: '📚', color: '#F59E0B' },
    { name: 'Utilities', icon: '💡', color: '#6366F1' },
    { name: 'Other', icon: '📦', color: '#6B7280' },
  ],
  income: [
    { name: 'Salary', icon: '💼', color: '#10B981' },
    { name: 'Freelance', icon: '💻', color: '#0D9488' },
    { name: 'Investment', icon: '📈', color: '#3B82F6' },
    { name: 'Business', icon: '🏢', color: '#8B5CF6' },
    { name: 'Gift', icon: '🎁', color: '#EC4899' },
    { name: 'Other Income', icon: '💰', color: '#F59E0B' },
  ],
}
