import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Announcement, Outreach, Media } from '@/payload-types'
import { EventFilterGrid, type EventItem } from '@/components/events/EventFilterGrid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Church Events & Multi-Campus Calendar | JMBGM',
  description: 'Upcoming worship celebrations, discipleship gatherings, and regional leadership summits across all JMBGM church branches.',
}

function getMediaUrl(media: string | number | Media | null | undefined): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  if (typeof media === 'object' && 'url' in media && typeof media.url === 'string') return media.url
  return null
}

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'announcements',
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-date',
      limit: 20,
    })
    return res.docs as Announcement[]
  } catch {
    return []
  }
}

async function getOutreaches(): Promise<Outreach[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'outreaches',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 20,
    })
    return res.docs as Outreach[]
  } catch {
    return []
  }
}

// Fallback branches for filtering
const FALLBACK_BRANCH_PILLS = [
  { id: 'metro-manila-main', name: 'JMBGM - Metro Manila Main Sanctuary', city: 'Metro Manila', slug: 'metro-manila-main' },
  { id: 'cebu-city-campus', name: 'JMBGM - Cebu City Campus', city: 'Cebu City', slug: 'cebu-city-campus' },
  { id: 'davao-city-campus', name: 'JMBGM - Davao City Campus', city: 'Davao City', slug: 'davao-city-campus' },
  { id: 'pampanga-campus', name: 'JMBGM - Pampanga Campus', city: 'Pampanga', slug: 'pampanga-campus' },
  { id: 'singapore-international', name: 'JMBGM - Singapore International Outreach', city: 'Singapore', slug: 'singapore-international' },
]

export default async function EventsPage() {
  const [announcements, outreaches] = await Promise.all([
    getAnnouncements(),
    getOutreaches(),
  ])

  const branches =
    outreaches.length > 0
      ? outreaches.map((o) => ({
          id: o.id,
          name: o.name,
          city: o.city,
          slug: o.slug,
        }))
      : FALLBACK_BRANCH_PILLS

  const events: EventItem[] = announcements.map((item) => {
    let branchId: string | number | null = null
    let branchName: string | null = null

    if (item.branch) {
      if (typeof item.branch === 'object' && 'name' in item.branch) {
        branchId = (item.branch as any).id
        branchName = (item.branch as any).name
      } else {
        branchId = item.branch as any
        const matched = branches.find((b) => String(b.id) === String(branchId))
        if (matched) branchName = matched.city + ' Campus'
      }
    }

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      date: item.date,
      location: item.location,
      summary: item.summary,
      featured: item.featured ?? false,
      imageUrl: getMediaUrl(item.image),
      branchId,
      branchName,
    }
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-[#5C6F62]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
          <span>/</span>
          <span className="font-semibold text-[#2F3E33]">Multi-Campus Calendar</span>
        </div>
        <Button asChild variant="ghost" size="sm" className="h-7 text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/#cinematic-narrative" className="gap-1.5">
            <ArrowLeft className="h-3 w-3" />
            Return to Homepage
          </Link>
        </Button>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
          Calendar of Gatherings
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Multi-Campus Events &amp; Schedule
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          Stay connected with upcoming worship celebrations, corporate prayer meetings, and special regional conferences across all church branches.
        </p>
      </div>

      {/* Filterable Calendar Grid */}
      <EventFilterGrid events={events} branches={branches} />

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[#E2D9CC] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/outreaches" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Explore Planted Churches 3D Globe
          </Link>
        </Button>
        <Button asChild variant="terracotta" size="sm">
          <Link href="/#connect">
            Plan a Visit This Sunday
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
