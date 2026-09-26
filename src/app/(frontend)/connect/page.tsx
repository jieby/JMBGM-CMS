import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Clock, MapPin, Navigation, ArrowLeft, ArrowRight, Heart, Users } from 'lucide-react'

export const metadata = {
  title: 'Connect & Gatherings | JMBGM',
  description: 'Join Jesus the Master Builder Global Ministry this Sunday for worship, prayer, and life group fellowship.',
}

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb & Back Link */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5C6F62]">
        <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#2F3E33]">Connect</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
          Welcome to the Family
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Gather With Us in Fellowship
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          Whether you are visiting for the first time or seeking a spiritual home, we are excited to welcome you.
          Join our weekly sanctuary celebrations or connect through local life groups.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Service Times */}
        <Card className="border-[#E2D9CC] bg-white shadow-md">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE] mb-2">
              <Clock className="h-5 w-5 text-[#E3A857]" />
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Weekly Celebration Schedule</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              In-person worship celebrations and global livestream broadcast.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-[#E2D9CC] bg-[#FBF6EE] p-4 space-y-1">
              <span className="font-bold text-sm text-[#2F3E33]">Sunday Worship &amp; Preaching</span>
              <p className="text-xs font-mono text-[#C1683B]">Every Sunday • 10:00 AM</p>
              <p className="text-xs text-[#5C6F62]">Uplifting corporate worship, prophetic word, and prayer ministry.</p>
            </div>
            <div className="rounded-xl border border-[#E2D9CC] bg-[#FBF6EE] p-4 space-y-1">
              <span className="font-bold text-sm text-[#2F3E33]">Midweek Word &amp; Corporate Prayer</span>
              <p className="text-xs font-mono text-[#8A9A5B]">Every Wednesday • 7:00 PM</p>
              <p className="text-xs text-[#5C6F62]">Deep dive scripture study, discipleship discussion, and intercession.</p>
            </div>
          </CardContent>
        </Card>

        {/* Sanctuary Location */}
        <Card className="border-[#E2D9CC] bg-white shadow-md">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8A9A5B] text-white mb-2">
              <MapPin className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Campus Location &amp; Directions</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              Central sanctuary with welcoming hospitality and accessible parking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-[#E2D9CC] bg-[#FBF6EE] p-4 space-y-2 text-xs text-[#5C6F62]">
              <p className="font-bold text-sm text-[#2F3E33]">JMBGM Main Campus Sanctuary</p>
              <p>Metro Manila, Philippines</p>
              <p className="italic">Sanctuary doors open 45 minutes before scheduled service times.</p>
            </div>
            <Button asChild variant="outline" className="w-full border-[#C1683B] text-[#C1683B] hover:bg-[#C1683B] hover:text-white">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Navigation className="h-4 w-4" />
                Open Directions in Google Maps
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Footer Actions */}
      <div className="pt-8 border-t border-[#E2D9CC] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/#cinematic-narrative" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Homepage Narrative
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Button asChild variant="terracotta" size="sm">
            <Link href="/#give">
              Submit Prayer Request
              <Heart className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="border-[#E2D9CC]">
            <Link href="/outreaches">
              Explore Outreaches
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
