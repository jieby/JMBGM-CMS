import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Calendar, MapPin, ArrowLeft, ArrowRight, Clock } from 'lucide-react'

export const metadata = {
  title: 'Church Events & Gatherings | JMBGM',
  description: 'Upcoming worship celebrations, corporate prayer meetings, and special ministry gatherings.',
}

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5C6F62]">
        <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#2F3E33]">Events</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
          Calendar of Gatherings
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Events &amp; Worship Schedule
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          Stay informed on seasonal conferences, corporate prayer vigils, worship nights, and kingdom community events.
        </p>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#E2D9CC] bg-white shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <Badge variant="sage">Sunday Celebration</Badge>
              <Badge variant="terracotta" className="text-[10px]">Weekly</Badge>
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Sunday Worship &amp; Word Celebration</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              Join our church family for heartfelt praise, the ministered Word, and corporate prayer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-[#5C6F62]">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#C1683B]" />
              <span>Every Sunday • 10:00 AM (Doors open at 9:15 AM)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#8A9A5B]" />
              <span>Main Sanctuary &amp; Online Livestream</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2D9CC] bg-white shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <Badge variant="outline">Discipleship</Badge>
              <Badge variant="secondary" className="text-[10px]">Weekly</Badge>
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Midweek Inductive Bible &amp; Prayer</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              Diving deep into the scriptures, verse-by-verse, with targeted corporate prayer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-[#5C6F62]">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#C1683B]" />
              <span>Every Wednesday • 7:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#8A9A5B]" />
              <span>Fellowship Hall &amp; Zoom Interactive Room</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[#E2D9CC] flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/#events" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Homepage Events
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
