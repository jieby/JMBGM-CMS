import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Media & Sermon Archives | JMBGM',
  description: 'Watch past sermons, prophetic teachings, and worship livestreams from Jesus the Master Builder Global Ministry.',
}

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5C6F62]">
        <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#2F3E33]">Media</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="text-xs uppercase tracking-widest px-3 py-1 text-[#C1683B] border-[#C1683B]/40">
          Proclaiming Truth
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Media &amp; Sermon Archives
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          Access anointed message recordings, sermon series study guides, and worship recordings to build your faith wherever you are.
        </p>
      </div>

      {/* Featured Video Player Box */}
      <div className="rounded-3xl border border-[#E2D9CC] bg-[#16221A] text-white p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <Badge variant="terracotta" className="text-[10px]">Latest Message</Badge>
            <h2 className="text-2xl font-bold text-white">The Sovereign Architect: Walking in Divine Blueprint</h2>
            <p className="text-xs font-mono text-[#8A9A5B]">Hebrews 3:4 • Senior Pastor</p>
          </div>
          <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-md">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              Watch on YouTube
              <Play className="ml-1.5 h-3.5 w-3.5 fill-white" />
            </a>
          </Button>
        </div>

        <p className="text-sm text-[#E2D9CC]/80 leading-relaxed max-w-3xl">
          Everything begins in God&apos;s sovereign hands. Discover how aligning your spiritual life with the Master Builder brings unwavering stability and supernatural fruitfulness through every storm.
        </p>
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[#E2D9CC] flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/#media" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Homepage Media
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="border-[#E2D9CC]">
          <Link href="/#connect">
            Attend In Person This Sunday
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
