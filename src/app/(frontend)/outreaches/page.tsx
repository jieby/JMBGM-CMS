import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Outreach, Media } from '@/payload-types'
import { OutreachesGlobeSection, type ChurchBranch } from '@/components/outreaches/OutreachesGlobeSection'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Compass } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Planted Churches & Global Campuses | JMBGM',
  description: 'Explore the apostolic church network of Jesus the Master Builder Global Ministry across cities and nations.',
}

function getMediaUrl(media: string | number | Media | null | undefined): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  if (typeof media === 'object' && 'url' in media && typeof media.url === 'string') return media.url
  return null
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
      limit: 50,
    })
    return res.docs as Outreach[]
  } catch {
    return []
  }
}

// Canonical fallback church branches
const CANONICAL_BRANCHES: ChurchBranch[] = [
  {
    id: 'metro-manila-main',
    name: 'JMBGM - Metro Manila Main Sanctuary',
    slug: 'metro-manila-main',
    branchType: 'Main Sanctuary',
    leadPastor: 'Senior Pastor David & Sarah Santos',
    address: '128 Epifanio de los Santos Ave, Quezon City',
    city: 'Quezon City',
    country: 'Philippines',
    latitude: 14.5995,
    longitude: 120.9842,
    serviceTimes: [
      { day: 'Sunday', time: '10:00 AM', serviceName: 'Main Worship & Word Celebration' },
      { day: 'Wednesday', time: '7:00 PM', serviceName: 'Midweek Word & Corporate Prayer' },
    ],
    contactPhone: '+63 (02) 8123-4567',
    contactEmail: 'manila@jmbgm.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'cebu-city-campus',
    name: 'JMBGM - Cebu City Campus',
    slug: 'cebu-city-campus',
    branchType: 'Planted Campus',
    leadPastor: 'Pastor Joshua & Grace Mendoza',
    address: 'Gorordo Ave, Cebu Business Park, Cebu City',
    city: 'Cebu City',
    country: 'Philippines',
    latitude: 10.3157,
    longitude: 123.8854,
    serviceTimes: [
      { day: 'Sunday', time: '9:30 AM', serviceName: 'Worship & Word Celebration' },
      { day: 'Friday', time: '6:30 PM', serviceName: 'Visayas Prayer & Revival Gathering' },
    ],
    contactPhone: '+63 (32) 412-8890',
    contactEmail: 'cebu@jmbgm.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'davao-city-campus',
    name: 'JMBGM - Davao City Campus',
    slug: 'davao-city-campus',
    branchType: 'Planted Campus',
    leadPastor: 'Pastor Emmanuel & Ruth Dela Cruz',
    address: 'J.P. Laurel Ave, Bajada, Davao City',
    city: 'Davao City',
    country: 'Philippines',
    latitude: 7.1907,
    longitude: 125.4578,
    serviceTimes: [
      { day: 'Sunday', time: '10:00 AM', serviceName: 'Kingdom Harvest Celebration' },
      { day: 'Thursday', time: '7:00 PM', serviceName: 'Mindanao Corporate Intercession' },
    ],
    contactPhone: '+63 (82) 298-7711',
    contactEmail: 'davao@jmbgm.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'pampanga-campus',
    name: 'JMBGM - Pampanga Campus',
    slug: 'pampanga-campus',
    branchType: 'Planted Campus',
    leadPastor: 'Pastor Timothy & Faith Navarro',
    address: 'MacArthur Highway, City of San Fernando, Pampanga',
    city: 'San Fernando',
    country: 'Philippines',
    latitude: 15.0794,
    longitude: 120.6200,
    serviceTimes: [
      { day: 'Sunday', time: '9:00 AM', serviceName: 'Sunday Morning Miracle Service' },
      { day: 'Wednesday', time: '6:30 PM', serviceName: 'Luzon Apostolic Prayer Night' },
    ],
    contactPhone: '+63 (45) 961-3420',
    contactEmail: 'pampanga@jmbgm.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'singapore-international',
    name: 'JMBGM - Singapore International Outreach',
    slug: 'singapore-international',
    branchType: 'Pioneering Outreach',
    leadPastor: 'Missionary Pastor Caleb & Joy Tan',
    address: '10 Anson Road, International Plaza, Downtown',
    city: 'Singapore',
    country: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    serviceTimes: [
      { day: 'Sunday', time: '3:00 PM', serviceName: 'International Diaspora Fellowship' },
      { day: 'Saturday', time: '7:00 PM', serviceName: 'Apostolic Missions Discipleship' },
    ],
    contactPhone: '+65 6712 3456',
    contactEmail: 'singapore@jmbgm.org',
    coverImageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
]

export default async function OutreachesPage() {
  const outreaches = await getOutreaches()

  const branches: ChurchBranch[] =
    outreaches.length > 0
      ? outreaches.map((o) => ({
          id: o.id,
          name: o.name,
          slug: o.slug,
          branchType:
            (o.branchType as 'Main Sanctuary' | 'Planted Campus' | 'Pioneering Outreach') ||
            'Planted Campus',
          leadPastor: o.leadPastor,
          address: o.address,
          city: o.city,
          country: o.country || 'Philippines',
          latitude: typeof o.latitude === 'number' ? o.latitude : 14.5995,
          longitude: typeof o.longitude === 'number' ? o.longitude : 120.9842,
          serviceTimes: o.serviceTimes?.map((st) => ({
            day: st.day,
            time: st.time,
            serviceName: st.serviceName,
          })),
          coverImageUrl: getMediaUrl(o.coverImage),
          contactPhone: o.contactPhone,
          contactEmail: o.contactEmail,
          featured: o.featured ?? true,
        }))
      : CANONICAL_BRANCHES

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb Bar */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-[#5C6F62]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#C1683B] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#2F3E33]">Planted Churches Network</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="h-7 text-xs text-[#5C6F62] hover:text-[#2F3E33]">
            <Link href="/#cinematic-narrative" className="gap-1.5">
              <ArrowLeft className="h-3 w-3" />
              Return to Homepage
            </Link>
          </Button>
        </nav>
      </div>

      {/* 3D Globe & Comprehensive Directory */}
      <OutreachesGlobeSection branches={branches} />
    </div>
  )
}
