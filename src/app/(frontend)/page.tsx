import Link from "next/link"
import { getPayload } from "payload"
import config from "@payload-config"
import type { Announcement, StoryChapter, Sermon, Outreach, SiteSetting, Media } from "@/payload-types"
import { ScrollyStage } from "@/components/storytelling/ScrollyStage"
import { MobileStoryCards } from "@/components/storytelling/MobileStoryCards"
import { ClosingPortal } from "@/components/storytelling/ClosingPortal"
import { PrayerGivingSection } from "@/components/giving/PrayerGivingSection"
import { mergeWithCanonical } from "@/components/storytelling/story-data"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  ArrowRight,
  BookOpen,
  Users as UsersIcon,
  Compass,
  Play,
  Heart,
  Globe2,
  Clock,
  Sparkles,
} from "lucide-react"

export const dynamic = "force-dynamic"

function getMediaUrl(media: string | number | Media | null | undefined): string | null {
  if (!media) return null
  if (typeof media === "string") return media
  if (typeof media === "object" && "url" in media && typeof media.url === "string") return media.url
  return null
}

async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: "site-settings",
    })
    return res as SiteSetting
  } catch {
    return null
  }
}

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: "announcements",
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "-date",
      limit: 6,
    })
    return res.docs as Announcement[]
  } catch {
    return []
  }
}

async function getSermons(): Promise<Sermon[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: "sermons",
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "-date",
      limit: 3,
    })
    return res.docs as Sermon[]
  } catch {
    return []
  }
}

async function getOutreaches(): Promise<Outreach[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: "outreaches",
      where: {
        _status: {
          equals: "published",
        },
      },
      limit: 4,
    })
    return res.docs as Outreach[]
  } catch {
    return []
  }
}

async function getStoryChapters(): Promise<StoryChapter[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: "story-chapters",
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "order",
      limit: 10,
    })
    return res.docs as StoryChapter[]
  } catch {
    return []
  }
}

// Fallback Outreaches for warm community experience
const FALLBACK_OUTREACHES = [
  {
    id: "outreach-1",
    title: "Compassion Food Pantry & Family Care",
    category: "Food Pantry",
    volunteerSchedule: "Every 2nd & 4th Saturday • 8:00 AM",
    description:
      "Providing fresh groceries, warm meals, and family blessing bags to vulnerable households across our local community.",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "outreach-2",
    title: "Youth Elevation & Street Discipleship",
    category: "Youth Outreach",
    volunteerSchedule: "Every Saturday • 2:00 PM",
    description:
      "Mentoring and inspiring at-risk youth through creative arts, athletics, educational tutoring, and the message of Christ's love.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "outreach-3",
    title: "Senior Citizens & Hospital Visitation Care",
    category: "Community Care",
    volunteerSchedule: "Weekly Thursdays • 10:00 AM",
    description:
      "Bringing presence, prayers of healing, and thoughtful companionship to elderly residents and patients in convalescent centers.",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
  },
]

// Fallback Sermons for rich media preview
const FALLBACK_SERMONS = [
  {
    id: "sermon-1",
    title: "The Sovereign Architect: Walking in Divine Order",
    speaker: "Senior Pastor",
    date: "2026-09-20",
    scripture: "Hebrews 3:4",
    series: "The Master Builder Series",
    summary:
      "Discover the foundational truth that every storm can be navigated when our life and home are established on Christ, the true Builder.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sermon-2",
    title: "Rooted in Good Soil: Deep Discipleship",
    speaker: "Associate Pastor",
    date: "2026-09-13",
    scripture: "Matthew 13:8 & Colossians 2:7",
    series: "Sacred Foundations",
    summary:
      "How to cultivate an unobstructed spiritual soil where God's Word takes deep root and yields thirty, sixty, and a hundredfold fruit.",
    thumbnailUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sermon-3",
    title: "He Makes His Ministers a Flame of Fire",
    speaker: "Guest Evangelist",
    date: "2026-09-06",
    scripture: "Hebrews 1:7 & Acts 2:3–4",
    series: "Kingdom Empowerment",
    summary:
      "Being refueled and purified by the Holy Spirit to burn as unquenchable beacons of truth, love, and revival in our neighborhoods.",
    thumbnailUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80",
  },
]

export default async function HomePage() {
  const [siteSettings, announcements, sermons, outreaches, cmsChapters] = await Promise.all([
    getSiteSettings(),
    getAnnouncements(),
    getSermons(),
    getOutreaches(),
    getStoryChapters(),
  ])
  const acts = mergeWithCanonical(cmsChapters)

  // Media URLs from SiteSettings
  const givingQrCodeUrl = getMediaUrl(siteSettings?.givingQrCode)
  const missionHeroImageUrl =
    getMediaUrl(siteSettings?.missionHeroImage) ||
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"

  // Active outreaches (CMS or Fallback)
  const activeOutreaches =
    outreaches.length > 0
      ? outreaches.map((o) => ({
          id: o.id,
          title: o.title,
          category: o.category,
          volunteerSchedule: o.volunteerSchedule || "Weekly Gatherings",
          description: o.description,
          imageUrl:
            getMediaUrl(o.image) ||
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
        }))
      : FALLBACK_OUTREACHES

  // Active sermons (CMS or Fallback)
  const activeSermons =
    sermons.length > 0
      ? sermons.map((s) => ({
          id: s.id,
          title: s.title,
          speaker: s.speaker,
          date: s.date,
          scripture: s.scripture || "Holy Scripture",
          series: s.series || "Sunday Celebration",
          summary: s.summary || "Listen to this life-transforming message from the Word of God.",
          thumbnailUrl:
            getMediaUrl(s.thumbnail) ||
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
        }))
      : FALLBACK_SERMONS

  return (
    <div className="flex flex-col">
      {/* 1. 🎬 Hero: The 5-Act Cinematic Narrative (#cinematic-narrative) */}
      <section id="cinematic-narrative" aria-label="Cinematic Ministry Narrative" className="w-full">
        {/* Desktop Experience: Lenis Smooth Scroll + Pinned Sticky Stage (h-screen, h-[500vh] track) */}
        <ScrollyStage acts={acts} />

        {/* Mobile Experience: Zero Scroll-Jacking, CSS Vertical Cards & Native Momentum */}
        <MobileStoryCards acts={acts} />
      </section>

      {/* 2. 🏛️ Connect & Gatherings (#connect) */}
      <ClosingPortal />

      {/* 3. 🤝 Community Outreaches (#outreaches) */}
      <section id="outreaches" className="border-t border-[#E2D9CC] bg-[#FBF6EE] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="sage" className="text-xs uppercase tracking-wider">
                Hands &amp; Feet of Christ
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#2F3E33] sm:text-4xl">
                Community Outreaches
              </h2>
              <p className="text-sm text-[#5C6F62] max-w-xl leading-relaxed">
                Demonstrating God&apos;s compassion beyond sanctuary walls. We serve local families, shelter communities, and youths in need.
              </p>
            </div>
            <Button asChild variant="terracotta" size="sm" className="self-start sm:self-auto font-semibold">
              <a href="#give">
                Join a Serve Team
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeOutreaches.map((outreach) => (
              <Card
                key={outreach.id}
                className="overflow-hidden border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#2F3E33]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={outreach.imageUrl}
                      alt={outreach.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-[#2F3E33]/90 text-white font-medium text-xs backdrop-blur-sm">
                        {outreach.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="space-y-2 pb-2">
                    <CardTitle className="text-xl text-[#2F3E33] leading-snug">
                      {outreach.title}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 text-xs text-[#C1683B] font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{outreach.volunteerSchedule}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#5C6F62] leading-relaxed line-clamp-3">
                      {outreach.description}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="pt-0">
                  <Button asChild variant="outline" size="sm" className="w-full border-[#E2D9CC] text-[#2F3E33] hover:bg-[#EFE8DC]/60">
                    <a href="#give">
                      Support this Initiative
                      <Heart className="ml-1.5 h-3.5 w-3.5 text-[#C1683B]" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 📢 Announcements & Events (#events) */}
      <section id="events" className="border-t border-[#E2D9CC] bg-[#EFE8DC]/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="terracotta" className="text-xs uppercase tracking-wider px-3 py-1">
              Church Calendar
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2F3E33] sm:text-4xl">
              Announcements &amp; Gatherings
            </h2>
            <p className="text-sm text-[#5C6F62] max-w-xl mx-auto leading-relaxed">
              Stay connected with upcoming worship celebrations, corporate prayer gatherings, and community events.
            </p>
          </div>

          {announcements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2D9CC] bg-white/70 p-10 text-center max-w-xl mx-auto space-y-4 shadow-sm">
              <Calendar className="mx-auto h-10 w-10 text-[#8A9A5B]" />
              <h3 className="text-lg font-bold text-[#2F3E33]">
                Upcoming Gatherings
              </h3>
              <p className="text-sm text-[#5C6F62] leading-relaxed">
                We are preparing upcoming gatherings and seasonal events. Join us this Sunday for worship, or check back soon for updates.
              </p>
              <Button asChild variant="outline" size="sm" className="border-[#C1683B] text-[#C1683B]">
                <a href="#connect">View Sunday Service Times</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((item) => {
                const imageUrl = getMediaUrl(item.image)
                return (
                  <Card
                    key={item.id}
                    className={`flex flex-col justify-between border-[#E2D9CC] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                      item.featured ? "ring-2 ring-[#C1683B]" : ""
                    }`}
                  >
                    {imageUrl && (
                      <div className="relative h-44 w-full bg-[#16221A] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="sage">{item.category}</Badge>
                        {item.featured && (
                          <Badge variant="terracotta" className="text-[10px]">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl line-clamp-2 text-[#2F3E33]">
                        {item.title}
                      </CardTitle>
                      <div className="flex flex-col gap-1 text-xs text-[#5C6F62]">
                        {item.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#C1683B]" />
                            {new Date(item.date).toLocaleDateString(undefined, {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                        {item.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#8A9A5B]" />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#5C6F62] leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button asChild variant="ghost" size="sm" className="text-xs text-[#C1683B] hover:text-[#C1683B]/80 hover:bg-[#EFE8DC]/50 p-0 h-auto font-semibold">
                        <a href="#connect">
                          Join Gathering Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. 🎙️ Media & The Word (#media) */}
      <section id="media" className="border-t border-[#E2D9CC] bg-[#16221A] text-[#FBF6EE] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider text-[#E3A857] border-[#E3A857]/40 bg-[#E3A857]/10">
                Word &amp; Truth
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Media &amp; Sermon Archives
              </h2>
              <p className="text-sm text-[#E2D9CC]/80 max-w-xl leading-relaxed">
                Be fed spiritually through anointed biblical preaching, inductive verse-by-verse teachings, and worship livestreams.
              </p>
            </div>
            <Button asChild variant="terracotta" size="sm" className="self-start sm:self-auto font-semibold">
              <a href="#media">
                Watch Livestream
                <Play className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="group relative rounded-2xl border border-white/10 bg-[#1C2920] overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#E3A857]/40"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#0B120E]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sermon.thumbnailUrl}
                      alt={sermon.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C2920] via-transparent to-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-[#C1683B] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-5 w-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-[#E3A857]">
                        {sermon.series}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A9A5B]">
                      {sermon.scripture}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#E3A857] transition-colors">
                      {sermon.title}
                    </h3>
                    <p className="text-xs text-[#E2D9CC]/70 line-clamp-2 leading-relaxed">
                      {sermon.summary}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-[#E2D9CC]/60 border-t border-white/10">
                  <span>{sermon.speaker}</span>
                  <span className="font-mono text-[11px]">
                    {new Date(sermon.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 🌍 Global Mission & Church Planting (#mission) */}
      <section id="mission" className="border-t border-[#E2D9CC] bg-[#EFE8DC]/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="relative rounded-3xl overflow-hidden border border-[#E2D9CC] bg-[#2F3E33] text-white shadow-2xl">
            {/* Background Feature Image with gradient overlays */}
            <div className="absolute inset-0 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={missionHeroImageUrl}
                alt="Global Mission and Church Planting"
                className="h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2F3E33] via-[#2F3E33]/90 to-[#2F3E33]/60" />
            </div>

            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-6">
              <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
                The Great Commission
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Sent to All the Nations
              </h2>
              <blockquote className="rounded-xl border-l-4 border-[#C1683B] bg-white/10 p-4 font-serif italic text-base sm:text-lg text-[#FBF6EE]">
                &ldquo;Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.&rdquo;
                <footer className="mt-2 text-xs font-mono font-semibold tracking-wider text-[#E3A857] not-italic">
                  — Matthew 28:19
                </footer>
              </blockquote>
              <p className="text-sm sm:text-base text-[#E2D9CC] leading-relaxed">
                As the Holy Fire illuminates the path, JMBGM is committed to establishing vibrant local churches,
                training apostolic servant leaders, and planting kingdom disciples across urban centers and rural territories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild variant="terracotta" size="lg" className="font-semibold shadow-md">
                  <a href="#give">
                    Partner with Global Missions
                    <Globe2 className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline-white" size="lg">
                  <a href="#connect">
                    View Sanctuary Locations
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 🎁 Generosity, Prayer & Kingdom Giving (#give) */}
      <PrayerGivingSection
        givingQrCodeUrl={givingQrCodeUrl}
        bankName={siteSettings?.givingBankName}
        accountName={siteSettings?.givingAccountName}
        accountNumber={siteSettings?.givingAccountNumber}
      />

      {/* 🕊️ Bottom Call-to-Action Congregation Banner */}
      <section className="bg-[#2F3E33] border-t border-[#E2D9CC]/30 px-4 py-16 sm:px-6 text-[#FBF6EE]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#233127] border border-[#8A9A5B]/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <Badge variant="sage" className="text-xs uppercase tracking-wider">
            All Are Welcome
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-[#FBF6EE]">
            Connect with JMBGM Today
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#FBF6EE]/80 leading-relaxed">
            Join our church family this week in worship and fellowship. Everyone has a place in the Master Builder&apos;s house.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="terracotta" size="lg" className="w-full sm:w-auto font-semibold shadow-md">
              <Link href="#connect">
                Plan Your Visit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-white" size="lg" className="w-full sm:w-auto">
              <Link href="#give">
                Submit Prayer Request
                <Heart className="ml-2 h-4 w-4 text-[#E3A857]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
