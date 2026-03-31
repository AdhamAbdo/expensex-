import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-display text-3xl font-bold text-slate-800 mb-2">Page not found</h1>
        <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary inline-flex">Go Home</Link>
      </div>
    </div>
  )
}
