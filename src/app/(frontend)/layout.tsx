import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'JMBGM | Jesus the Master Builder Global Ministry',
  description:
    'Proclaiming truth, building disciples, and transforming lives through faith. Built with Next.js 16, Payload CMS 3, Supabase, and ShadCN UI.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-[#FBF6EE] text-[#2F3E33] antialiased selection:bg-[#C1683B] selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
