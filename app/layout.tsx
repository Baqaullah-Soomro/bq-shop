import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartProvider from '@/providers/CartProvider'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shop.co - Your Fashion Destination',
  description: 'Discover the latest fashion trends at Shop.co',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Toaster />
          <CartProvider>
            <div className="min-h-screen">
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
