'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-dvh bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-6 text-sm">{error.message || 'An unexpected error occurred.'}</p>
          <button onClick={reset} className="bg-brand-primary text-white font-semibold py-3 px-6 rounded-xl active:scale-95 transition-all">
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
