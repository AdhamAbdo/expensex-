import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ExpenseX – Smart Expense Tracker',
  description: 'Track your income and expenses with ExpenseX. Modern, fast, and offline-ready.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ExpenseX',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'ExpenseX',
    title: 'ExpenseX – Smart Expense Tracker',
    description: 'Track your income and expenses with ExpenseX.',
  },
  icons: {
    shortcut: '/icons/icon-192x192.png',
    apple: [{ url: '/icons/icon-192x192.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0D9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via <link> to avoid next/font network failures in CI */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
        <body className="font-sans bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
