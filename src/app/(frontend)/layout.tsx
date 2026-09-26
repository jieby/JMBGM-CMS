import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'JMBGM | Jesus the Master Builder Global Ministry',
  description:
    'Jesus the Master Builder Global Ministry. Proclaiming truth, building disciples, and transforming communities through Christ.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#FBF6EE] text-[#2F3E33] antialiased selection:bg-[#C1683B] selection:text-white">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
