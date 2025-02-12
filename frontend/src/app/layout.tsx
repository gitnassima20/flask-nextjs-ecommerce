import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Your one-stop shop for amazing products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-center">E-Commerce Store</h1>
          </header>
          <main>
            {children}
          </main>
          <footer className="mt-8 text-center text-gray-500">
            {new Date().getFullYear()} E-Commerce Store. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  )
}
