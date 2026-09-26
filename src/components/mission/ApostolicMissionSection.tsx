import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Compass,
  GraduationCap,
  Heart,
  Globe2,
  ArrowRight,
  Sparkles,
  Quote,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

interface ApostolicMissionSectionProps {
  missionHeroImageUrl?: string | null
}

export function ApostolicMissionSection({
  missionHeroImageUrl = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
}: ApostolicMissionSectionProps) {
  return (
    <section
      id="mission"
      aria-label="Apostolic Mandate and Church Planting Hub"
      className="border-t border-[#E2D9CC] bg-[#EFE8DC]/50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
            The Great Commission • Matthew 28:19–20
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#2F3E33] sm:text-4xl lg:text-5xl">
            Sent to the Nations: Church Planting &amp; Apostolic Mission
          </h2>
          <p className="text-base text-[#5C6F62] leading-relaxed">
            Beyond established sanctuaries, JMBGM is an apostolic movement sent to break new ground,
            apprentice frontline planters, and establish enduring gospel beacons across urban centers and regional frontiers.
          </p>
          <div className="pt-2">
            <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-sm">
              <Link href="/mission">
                Explore Full Apostolic Mission &amp; Academy
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* The 3 Pillars of Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Pioneer */}
          <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2F3E33] text-[#FBF6EE]">
                <Compass className="h-6 w-6 text-[#E3A857]" />
              </div>
              <div className="space-y-1">
                <Badge variant="sage" className="text-[10px] uppercase font-bold tracking-wider">
                  Pillar 1 • Groundbreaking
                </Badge>
                <CardTitle className="text-xl text-[#2F3E33]">Pioneer Frontiers</CardTitle>
              </div>
              <CardDescription className="text-[#5C6F62] leading-relaxed">
                Scouting, entering, and planting in target unreached cities and maritime provinces where no vibrant gospel sanctuary exists.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-[#5C6F62]">
              <div className="rounded-lg bg-[#FBF6EE] p-3 border border-[#E2D9CC]/70 space-y-1.5">
                <span className="font-semibold text-[#2F3E33] block">Strategic Expansions:</span>
                <p>• Southern Mindanao Pioneer Corridors</p>
                <p>• Regional Southeast Asian Gateway Cities</p>
                <p>• Island Barangay House Church Networks</p>
              </div>
            </CardContent>
          </Card>

          {/* Pillar 2: Equip */}
          <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C1683B] text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Badge variant="terracotta" className="text-[10px] uppercase font-bold tracking-wider">
                  Pillar 2 • Formation
                </Badge>
                <CardTitle className="text-xl text-[#2F3E33]">Church Planting Academy</CardTitle>
              </div>
              <CardDescription className="text-[#5C6F62] leading-relaxed">
                Rigorous apostolic apprenticeship curriculum preparing lead pastors in biblical exposition, pastoral care, and church multiplication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-[#5C6F62]">
              <div className="rounded-lg bg-[#FBF6EE] p-3 border border-[#E2D9CC]/70 space-y-1.5">
                <span className="font-semibold text-[#2F3E33] block">Apprenticeship Highlights:</span>
                <p>• 12-Month Cohort with Senior Overseers</p>
                <p>• Practical Church Planting Field Lab</p>
                <p>• Post-Planting Mentorship &amp; Governance</p>
              </div>
            </CardContent>
          </Card>

          {/* Pillar 3: Send & Sustain */}
          <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8A9A5B] text-white">
                <Heart className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider text-[#8A9A5B] border-[#8A9A5B]">
                  Pillar 3 • Mobilization
                </Badge>
                <CardTitle className="text-xl text-[#2F3E33]">Send &amp; Sustain</CardTitle>
              </div>
              <CardDescription className="text-[#5C6F62] leading-relaxed">
                Providing financial sponsorship, prayer shields, living stipends, and logistical backing so pioneer planters can focus on discipleship.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-[#5C6F62]">
              <div className="rounded-lg bg-[#FBF6EE] p-3 border border-[#E2D9CC]/70 space-y-1.5">
                <span className="font-semibold text-[#2F3E33] block">Field Support Architecture:</span>
                <p>• 100% of Designated Mission Seed to Field</p>
                <p>• 24/7 Intercessory Prayer Shield Teams</p>
                <p>• Regular Healthcare &amp; Family Stipend Cover</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Frontier Church Planter Spotlight Card */}
        <div className="rounded-3xl border border-[#E2D9CC] bg-[#16221A] text-white shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Atmospheric Photography Frame */}
            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[320px] bg-[#0E1712] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  missionHeroImageUrl ||
                  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80'
                }
                alt="Frontier Church Planter Spotlight"
                className="h-full w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#16221A]/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1 shadow-md">
                  Frontier Planter Spotlight
                </Badge>
              </div>
            </div>

            {/* Right: Narrative Storytelling & Apostolic Testimony */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E3A857]">
                  Southeast Asia Diaspora &amp; Island Mission
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Pastor Caleb &amp; Joy Tan
                </h3>
                <p className="text-xs text-[#8A9A5B] font-semibold">
                  Pioneering Singapore &amp; Maritime Regional Outreaches
                </p>
              </div>

              {/* Quote */}
              <div className="relative rounded-2xl border border-white/10 bg-[#1C2920] p-5 shadow-inner">
                <Quote className="absolute top-3 right-3 h-5 w-5 text-[#C1683B] opacity-50" />
                <p className="font-serif italic text-sm sm:text-base text-[#FBF6EE] leading-relaxed pr-6">
                  &ldquo;When the Holy Fire falls on the altar of a consecrated life, stepping across borders is not a sacrifice—it is our highest calling and joy in Christ.&rdquo;
                </p>
              </div>

              {/* Verified Field Fruit */}
              <div className="grid grid-cols-3 gap-3 text-center border-y border-white/10 py-3.5">
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#E3A857] block font-mono">
                    2
                  </span>
                  <span className="text-[10px] text-[#E2D9CC]/75 uppercase tracking-wider">
                    Sanctuaries Planted
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#C1683B] block font-mono">
                    14
                  </span>
                  <span className="text-[10px] text-[#E2D9CC]/75 uppercase tracking-wider">
                    Discipleship Circles
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#8A9A5B] block font-mono">
                    120+
                  </span>
                  <span className="text-[10px] text-[#E2D9CC]/75 uppercase tracking-wider">
                    Believers Baptized
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  variant="terracotta"
                  size="lg"
                  className="font-semibold shadow-md"
                >
                  <Link href="/#give">
                    Sponsor a Church Plant
                    <Globe2 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline-white"
                  size="lg"
                >
                  <Link href="/mission">
                    Explore Missionary Training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
