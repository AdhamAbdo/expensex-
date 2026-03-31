export default function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Balance card skeleton */}
      <div className="bg-white rounded-2xl p-4 shadow-card">
        <div className="h-3 bg-slate-200 rounded w-24 mb-3" />
        <div className="h-8 bg-slate-200 rounded w-40 mb-4" />
        <div className="space-y-2">
          <div className="h-11 bg-slate-100 rounded-xl" />
          <div className="h-11 bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* Filter chips skeleton */}
      <div className="flex gap-2">
        {[80, 90, 100].map(w => (
          <div key={w} className="h-8 bg-slate-200 rounded-full" style={{ width: w }} />
        ))}
      </div>

      {/* Transaction items skeleton */}
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white rounded-2xl p-3.5 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-slate-200 rounded w-28" />
            <div className="h-3 bg-slate-100 rounded w-20" />
          </div>
          <div className="text-right space-y-1">
            <div className="h-3.5 bg-slate-200 rounded w-16" />
            <div className="h-3 bg-slate-100 rounded w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}
