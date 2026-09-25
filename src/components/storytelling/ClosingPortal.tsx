import React from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  MapPin,
  Heart,
  Navigation,
  ExternalLink,
  Users,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

export function ClosingPortal() {
  return (
    <section
      id="connect"
      className="border-t border-[#E2D9CC] bg-[#EFE8DC]/50 px-4 py-20 sm:px-6 lg:px-8"
      aria-label="Service Times, Venue Map, and Connection Portal"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
            Gospel Mission in Action
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#2F3E33] sm:text-4xl lg:text-5xl">
            Gather with Us. Abide in Christ.
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#5C6F62] leading-relaxed">
            The journey from God&apos;s sovereign hand to the nations happens through local fellowship,
            disciplined prayer, and active mission. We invite you to join us this week.
          </p>
        </div>

        {/* 3 Pillars Grid: Service Times, Venue Map, and Connection Portal */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1: Service Times */}
          <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2F3E33] text-[#FBF6EE]">
                <Clock className="h-6 w-6 text-[#E3A857]" />
              </div>
              <CardTitle className="text-xl text-[#2F3E33]">Weekly Gatherings</CardTitle>
              <CardDescription className="text-[#5C6F62]">
                Join us in person or through our interactive global livestream.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="rounded-xl border border-[#E2D9CC]/80 bg-[#FBF6EE] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#2F3E33]">Sunday Worship &amp; Word</span>
                  <Badge variant="terracotta" className="text-[10px]">Main Service</Badge>
                </div>
                <p className="text-xs font-mono text-[#C1683B]">Every Sunday • 10:00 AM</p>
                <p className="text-xs text-[#5C6F62]">Dynamic worship, prophetic preaching, and prayer.</p>
              </div>

              <div className="rounded-xl border border-[#E2D9CC]/80 bg-[#FBF6EE] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#2F3E33]">Midweek Word &amp; Prayer</span>
                  <Badge variant="sage" className="text-[10px]">Discipleship</Badge>
                </div>
                <p className="text-xs font-mono text-[#8A9A5B]">Every Wednesday • 7:00 PM</p>
                <p className="text-xs text-[#5C6F62]">Verse-by-verse scripture study and corporate prayer.</p>
              </div>

              <div className="rounded-xl border border-[#E2D9CC]/80 bg-[#FBF6EE] p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#2F3E33]">Youth &amp; NextGen Elevation</span>
                  <Badge variant="outline" className="text-[10px]">Youth</Badge>
                </div>
                <p className="text-xs font-mono text-[#5C6F62]">Every Saturday • 4:00 PM</p>
                <p className="text-xs text-[#5C6F62]">Empowering the next generation of kingdom disciples.</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Venue Map & Campus Location */}
          <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8A9A5B] text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-[#2F3E33]">Venue &amp; Campus Map</CardTitle>
              <CardDescription className="text-[#5C6F62]">
                Centrally located sanctuary with ample parking and accessibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {/* Stylized Architectural Campus Map Preview */}
              <div className="relative h-40 w-full rounded-xl overflow-hidden border border-[#E2D9CC] bg-[#16221A] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,154,91,0.25)_0%,transparent_70%)]" />
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
                  <line x1="20" y1="100" x2="380" y2="100" stroke="#8A9A5B" strokeWidth="3" strokeDasharray="6 6" />
                  <line x1="200" y1="20" x2="200" y2="180" stroke="#8A9A5B" strokeWidth="3" strokeDasharray="6 6" />
                  <rect x="150" y="60" width="100" height="80" rx="6" fill="#2F3E33" stroke="#E3A857" strokeWidth="2" />
                  <circle cx="200" cy="100" r="12" fill="#C1683B" />
                  <text x="200" y="104" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">JMBGM</text>
                </svg>
                <div className="absolute bottom-2 left-2 rounded bg-[#2F3E33]/90 px-2 py-1 text-[10px] text-[#E2D9CC] flex items-center gap-1">
                  <Navigation className="h-3 w-3 text-[#E3A857]" />
                  Main Campus Sanctuary
                </div>
              </div>

              <div className="space-y-1 text-xs text-[#5C6F62]">
                <p className="font-semibold text-[#2F3E33]">Jesus the Master Builder Global Ministry</p>
                <p>Main Sanctuary, Fellowship Hall &amp; Media Studio</p>
                <p className="italic">Doors open 45 minutes prior to every scheduled gathering.</p>
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-[#C1683B] text-[#C1683B] hover:bg-[#C1683B] hover:text-white"
              >
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Open in Maps &amp; Get Directions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Connection Portal */}
          <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C1683B] text-white">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-[#2F3E33]">Connection Portal</CardTitle>
              <CardDescription className="text-[#5C6F62]">
                Take your next step in the spiritual journey today.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-2">
                <Button
                  asChild
                  variant="forest"
                  size="sm"
                  className="w-full justify-start font-medium"
                >
                  <a href="#about" className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#E3A857]" />
                    I&apos;m New / First-Time Visitor Card
                  </a>
                </Button>

                <Button
                  asChild
                  variant="terracotta"
                  size="sm"
                  className="w-full justify-start font-medium"
                >
                  <a href="#announcements" className="inline-flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-white" />
                    Submit Prayer Request &amp; Praise
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-[#E2D9CC] hover:bg-[#EFE8DC]/60"
                >
                  <a href="#about" className="inline-flex items-center gap-2 text-[#2F3E33]">
                    <Users className="h-4 w-4 text-[#8A9A5B]" />
                    Volunteer &amp; Join a Ministry Pillar
                  </a>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-[#5C6F62] hover:text-[#2F3E33]"
                >
                  <Link href="/admin" className="inline-flex items-center gap-2">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Payload CMS Leadership Portal
                  </Link>
                </Button>
              </div>

              <div className="rounded-lg bg-[#EFE8DC]/80 p-3 text-[11px] text-[#5C6F62] leading-relaxed">
                <strong className="text-[#2F3E33]">Need pastoral care?</strong> Our servant leaders are available after
                every service or by visiting our hospitality center.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
