-- ============================================
-- ExpenseX – Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================

-- ── 1. TRANSACTIONS TABLE ──────────────────
CREATE TABLE IF NOT EXISTS public.transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount      NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  type        TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category    TEXT NOT NULL,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast per-user date-range queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_date
  ON public.transactions (user_id, date DESC);

-- ── 2. CATEGORIES TABLE ────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name    TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  icon    TEXT,
  color   TEXT,
  type    TEXT CHECK (type IN ('income', 'expense', 'both'))
);

-- ── 3. ROW LEVEL SECURITY ──────────────────
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories   ENABLE ROW LEVEL SECURITY;

-- Transactions: users only see/touch their own rows
CREATE POLICY "transactions_select" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "transactions_insert" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "transactions_update" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "transactions_delete" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Categories: users see global (user_id IS NULL) + their own
CREATE POLICY "categories_select" ON public.categories
  FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "categories_insert" ON public.categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "categories_delete" ON public.categories
  FOR DELETE USING (auth.uid() = user_id);

-- ── 4. SEED DEFAULT CATEGORIES ─────────────
INSERT INTO public.categories (name, user_id, icon, color, type) VALUES
  ('Food & Dining',   NULL, '🍽️', '#F97316', 'expense'),
  ('Shopping',        NULL, '🛍️', '#8B5CF6', 'expense'),
  ('Transportation',  NULL, '🚗', '#3B82F6', 'expense'),
  ('Housing',         NULL, '🏠', '#10B981', 'expense'),
  ('Healthcare',      NULL, '💊', '#EF4444', 'expense'),
  ('Entertainment',   NULL, '🎬', '#EC4899', 'expense'),
  ('Clothing',        NULL, '👕', '#14B8A6', 'expense'),
  ('Education',       NULL, '📚', '#F59E0B', 'expense'),
  ('Utilities',       NULL, '💡', '#6366F1', 'expense'),
  ('Other',           NULL, '📦', '#6B7280', 'expense'),
  ('Salary',          NULL, '💼', '#10B981', 'income'),
  ('Freelance',       NULL, '💻', '#0D9488', 'income'),
  ('Investment',      NULL, '📈', '#3B82F6', 'income'),
  ('Business',        NULL, '🏢', '#8B5CF6', 'income'),
  ('Gift',            NULL, '🎁', '#EC4899', 'income'),
  ('Other Income',    NULL, '💰', '#F59E0B', 'income')
ON CONFLICT DO NOTHING;

-- ── 5. REALTIME (optional) ─────────────────
-- Uncomment to enable live updates across devices:
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- ── DONE ───────────────────────────────────
-- You can verify with:
-- SELECT * FROM public.categories;
