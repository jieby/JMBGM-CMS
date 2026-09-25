import Link from "next/link"
import { getPayload } from "payload"
import config from "@payload-config"
import type { Announcement } from "@/payload-types"
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
  AlertCircle,
  Database,
  ExternalLink,
} from "lucide-react"

export const dynamic = "force-dynamic"

async function getAnnouncements(): Promise<{
  announcements: Announcement[]
  dbError: string | null
}> {
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
    return { announcements: res.docs as Announcement[], dbError: null }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unable to connect to database"
    return { announcements: [], dbError: message }
  }
}

export default async function HomePage() {
  const { announcements, dbError } = await getAnnouncements()

  return (
    <div className="flex flex-col">
      {/* DB Connection Alert (if Supabase credentials not yet supplied) */}
      {dbError && (
        <section className="bg-[#C1683B]/10 border-b border-[#C1683B]/30 px-4 py-3">
          <div className="mx-auto max-w-6xl flex items-center justify-between flex-wrap gap-2 text-sm text-[#2F3E33]">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#C1683B] shrink-0" />
              <span>
                <strong>Supabase Database Notice:</strong> Direct connection not established yet.
                Set valid <code className="bg-[#FBF6EE] px-1.5 py-0.5 rounded text-xs">DATABASE_URI</code> in <code className="bg-[#FBF6EE] px-1.5 py-0.5 rounded text-xs">.env</code> and run <code className="bg-[#FBF6EE] px-1.5 py-0.5 rounded text-xs">npm run db:seed</code>.
              </span>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#C1683B] hover:underline"
            >
              Payload Admin <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-28">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8A9A5B]/40 bg-[#8A9A5B]/10 px-3.5 py-1 text-xs font-semibold text-[#2F3E33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8A9A5B]" />
            Faith • Fellowship • Community Transformation
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#2F3E33] sm:text-5xl md:text-6xl">
            Jesus the Master Builder Global Ministry
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#5C6F62] leading-relaxed">
            Welcome to the digital home of JMBGM. Dedicated to Christ-centered worship,
            discipleship, and gospel mission. Powered by Next.js 16 SSR &amp; Payload CMS 3.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild variant="terracotta" size="lg" className="w-full sm:w-auto font-semibold">
              <a href="#announcements">
                View Announcements
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="forest" size="lg" className="w-full sm:w-auto font-semibold">
              <Link href="/admin">
                Open CMS Admin
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ministry Pillars / About Preview */}
      <section id="about" className="border-t border-[#E2D9CC] bg-[#EFE8DC]/40 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-2">
            <Badge variant="sage" className="text-xs uppercase tracking-wider">
              Our Calling
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#2F3E33] sm:text-3xl">
              Anchored in Faith, Serving with Love
            </h2>
            <p className="text-sm text-[#5C6F62] max-w-xl mx-auto">
              Our ministry stands upon three core pillars of service, fellowship, and Biblical truth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Card className="border-[#E2D9CC] bg-white">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE] mb-2">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>Biblical Truth &amp; Worship</CardTitle>
                <CardDescription className="text-[#5C6F62]">
                  Faithful preaching and teaching rooted in scripture, fostering a deep devotion to God.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#E2D9CC] bg-white">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C1683B] text-white mb-2">
                  <UsersIcon className="h-5 w-5" />
                </div>
                <CardTitle>Community &amp; Fellowship</CardTitle>
                <CardDescription className="text-[#5C6F62]">
                  Nurturing inclusive relationships, family life, youth mentorship, and uplifting each other.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-[#E2D9CC] bg-white">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8A9A5B] text-white mb-2">
                  <Compass className="h-5 w-5" />
                </div>
                <CardTitle>Outreach &amp; Missions</CardTitle>
                <CardDescription className="text-[#5C6F62]">
                  Sharing kindness and hope through practical community care, food drives, and spiritual outreach.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Announcements / Events Section */}
      <section id="announcements" className="border-t border-[#E2D9CC] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="terracotta" className="text-xs uppercase tracking-wider">
                Updates &amp; Schedule
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight text-[#2F3E33] sm:text-3xl">
                Announcements &amp; Gatherings
              </h2>
              <p className="text-sm text-[#5C6F62]">
                Dynamic announcements served SSR directly from Payload CMS 3.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="self-start sm:self-auto border-[#E2D9CC]">
              <Link href="/admin/collections/announcements">
                Manage in CMS
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Strict CMS Behavior: If no announcements exist in database, display guidance card */}
          {announcements.length === 0 ? (
            <Card className="border-dashed border-2 border-[#E2D9CC] bg-[#EFE8DC]/30 p-8 text-center">
              <div className="mx-auto max-w-md space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E2D9CC] text-[#2F3E33]">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2F3E33]">
                  No Published Announcements Yet
                </h3>
                <p className="text-sm text-[#5C6F62] leading-relaxed">
                  Per the <em>Strict CMS</em> policy, sample mock data is omitted. Once Supabase PostgreSQL is connected,
                  populate announcements via the Admin CMS or run the database seeder:
                </p>
                <div className="rounded-lg bg-[#2F3E33] p-3 text-left font-mono text-xs text-[#FBF6EE]">
                  npm run db:seed
                </div>
                <Button asChild variant="terracotta" size="sm">
                  <Link href="/admin/collections/announcements">
                    Create First Announcement in Admin
                  </Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((item) => (
                <Card
                  key={item.id}
                  className={`flex flex-col justify-between border-[#E2D9CC] bg-white ${
                    item.featured ? "ring-2 ring-[#C1683B]" : ""
                  }`}
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="sage">{item.category}</Badge>
                      {item.featured && (
                        <Badge variant="terracotta" className="text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
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
                      <Link href={`/admin/collections/announcements/${item.id}`}>
                        View Details &amp; Edit
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-[#2F3E33] px-4 py-16 sm:px-6 text-[#FBF6EE]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#2F3E33] border border-[#8A9A5B]/30 p-8 sm:p-12 text-center space-y-6">
          <Badge variant="terracotta" className="text-xs uppercase tracking-wider">
            Get Involved
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-[#FBF6EE]">
            Connect with JMBGM Today
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#FBF6EE]/80 leading-relaxed">
            Whether you are visiting for the first time or looking to serve, we welcome you with open arms.
            Administrators can manage all site announcements, pages, and media through Payload CMS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="terracotta" size="lg" className="w-full sm:w-auto font-semibold">
              <Link href="/admin">
                Access Admin CMS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
