import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe2, ArrowLeft, ArrowRight, Heart } from 'lucide-react'

export const metadata = {
  title: 'Global Mission & Church Planting | JMBGM',
  description: 'Taking the gospel of peace to all nations: planting kingdom churches and equipping disciples worldwide.',
}

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5C6F62]">
        <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#2F3E33]">Mission</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
          The Great Commission
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Global Mission &amp; Church Planting
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          &ldquo;Go therefore and make disciples of all the nations&rdquo; (Matthew 28:19).
          Empowered by the Holy Fire, JMBGM is called to reach the unreached and plant vibrant, Christ-centered churches.
        </p>
      </div>

      {/* Vision Statement Box */}
      <div className="rounded-3xl border border-[#E2D9CC] bg-[#2F3E33] text-white p-8 sm:p-12 shadow-xl space-y-6">
        <div className="space-y-2">
          <Badge variant="sage" className="text-[10px]">Apostolic Calling</Badge>
          <h2 className="text-2xl font-bold text-white">Raising Servant Leaders for the Harvest</h2>
        </div>
        <p className="text-sm sm:text-base text-[#E2D9CC]/90 leading-relaxed">
          Through strategic discipleship centers, pastoral training institutes, and cross-cultural outreach expeditions,
          we equip believers to step forward boldly in the footsteps of Christ.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="terracotta" size="lg" className="font-semibold">
            <Link href="/#give">
              Partner with Missions Giving
              <Globe2 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline-white" size="lg">
            <Link href="/outreaches">
              View Local Outreaches
            </Link>
          </Button>
        </div>
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[#E2D9CC] flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/#mission" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Homepage Mission
          </Link>
        </Button>
      </div>
    </div>
  )
}
