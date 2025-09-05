import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'School Management App',
  description: 'A comprehensive school management system built with Next.js and MySQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="sticky top-4 z-40">
          <div className="container-page">
            <nav className="mx-auto max-w-4xl rounded-2xl bg-white/80 dark:bg-slate-800/70 backdrop-blur border border-gray-200/70 dark:border-slate-700/60 shadow-lg px-4 sm:px-6">
              <div className="flex items-center justify-between h-14">
                <a href="/" className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 text-white text-sm font-bold">SM</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">School Management</span>
                </a>
                <div className="flex items-center gap-1">
                  <a 
                    href="/addSchool" 
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700/70 transition"
                  >
                    Add School
                  </a>
                  <a 
                    href="/showSchools" 
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700/70 transition"
                  >
                    View Schools
                  </a>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </div>
        </div>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
