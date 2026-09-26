import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Globe2,
  ArrowLeft,
  ArrowRight,
  Heart,
  Compass,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Quote,
  Flame,
} from 'lucide-react'

export const metadata = {
  title: 'Apostolic Mission & Church Planting | JMBGM',
  description: 'Taking the gospel of peace to all nations: church planting academy, pioneer expeditions, and missionary sponsorship.',
}

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-[#5C6F62]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
          <span>/</span>
          <span className="font-semibold text-[#2F3E33]">Apostolic Mission</span>
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
          The Great Commission • Matthew 28:19–20
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Sent to All the Nations
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          &ldquo;Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.&rdquo;
          JMBGM is an apostolic church planting movement called to establish permanent kingdom beacons in unreached cities and maritime territories.
        </p>
      </div>

      {/* Apostolic Vision Manifesto Box */}
      <div className="rounded-3xl border border-[#E2D9CC] bg-[#16221A] text-white p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-[#E3A857] border-[#E3A857]/40 bg-[#E3A857]/10">
            Church Planting Manifesto
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Raising Servant Leaders &amp; Multiplying Sanctuaries
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#E2D9CC]/90 leading-relaxed max-w-3xl">
          We believe evangelism bears its fullest fruit when rooted in local discipleship and expressed through healthy, multiplying church communities.
          Our apostolic mission combines spiritual intercession with practical field support to plant self-sustaining, biblically sound congregations.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="terracotta" size="lg" className="font-semibold shadow-md">
            <Link href="/#give">
              Sponsor a Pioneer Church Plant
              <Globe2 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline-white" size="lg">
            <Link href="/outreaches">
              Explore Active 3D Globe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* The 3 Pillars of Mission */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="sage" className="text-xs uppercase tracking-wider">
            Operational Blueprint
          </Badge>
          <h3 className="text-2xl font-bold tracking-tight text-[#2F3E33]">
            The Three Strategic Pillars
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[#E2D9CC] bg-white shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE]">
                <Compass className="h-5 w-5 text-[#E3A857]" />
              </div>
              <CardTitle className="text-lg text-[#2F3E33]">1. Pioneer Frontiers</CardTitle>
              <CardDescription className="text-xs text-[#5C6F62]">
                Targeting strategic unreached corridors, island barangays, and foreign urban diaspora centers.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#5C6F62] space-y-2">
              <p>• Strategic demographic mapping</p>
              <p>• Pre-planting prayer walks &amp; intercession</p>
              <p>• Establishing initial cell circles</p>
            </CardContent>
          </Card>

          <Card className="border-[#E2D9CC] bg-white shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C1683B] text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-[#2F3E33]">2. Equip &amp; Apprentice</CardTitle>
              <CardDescription className="text-xs text-[#5C6F62]">
                Master Builder Church Planting Academy: rigorous 12-month cohort preparing apostolic planters.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#5C6F62] space-y-2">
              <p>• Biblical exposition &amp; theology</p>
              <p>• Pastoral counseling &amp; discipleship</p>
              <p>• Church administration &amp; leadership</p>
            </CardContent>
          </Card>

          <Card className="border-[#E2D9CC] bg-white shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8A9A5B] text-white">
                <Heart className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-[#2F3E33]">3. Send &amp; Sustain</CardTitle>
              <CardDescription className="text-xs text-[#5C6F62]">
                Mobilizing sacrificial financial backing and 24/7 prayer shields for families on the mission field.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#5C6F62] space-y-2">
              <p>• 100% designated mission seed pass-through</p>
              <p>• Missionary family living stipends</p>
              <p>• Intercessory prayer covering</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Training Academy Curriculum */}
      <div className="rounded-3xl border border-[#E2D9CC] bg-white p-8 sm:p-10 shadow-lg space-y-6">
        <div className="space-y-2">
          <Badge variant="terracotta" className="text-xs uppercase tracking-wider">
            Ministry Track
          </Badge>
          <h3 className="text-2xl font-bold text-[#2F3E33]">
            Church Planting Academy Curriculum
          </h3>
          <p className="text-sm text-[#5C6F62]">
            A hands-on ministerial pathway designed to transform mature disciples into ordained campus pastors and frontline planters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="rounded-2xl border border-[#E2D9CC] bg-[#FBF6EE] p-5 space-y-3">
            <span className="rounded-full bg-[#2F3E33] text-[#FBF6EE] px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono">
              Phase 1
            </span>
            <h4 className="font-bold text-sm text-[#2F3E33]">Spiritual Consecration &amp; Word</h4>
            <p className="text-xs text-[#5C6F62] leading-relaxed">
              Inductive Bible exposition, biblical covenants, the doctrine of Christ the Master Builder, and personal holiness.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2D9CC] bg-[#FBF6EE] p-5 space-y-3">
            <span className="rounded-full bg-[#C1683B] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono">
              Phase 2
            </span>
            <h4 className="font-bold text-sm text-[#2F3E33]">Field Apprenticeship &amp; Lab</h4>
            <p className="text-xs text-[#5C6F62] leading-relaxed">
              Shadowing senior pastors at established campuses, leading evangelism campaigns, and launching weekly prayer circles.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2D9CC] bg-[#FBF6EE] p-5 space-y-3">
            <span className="rounded-full bg-[#8A9A5B] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono">
              Phase 3
            </span>
            <h4 className="font-bold text-sm text-[#2F3E33]">Sanctuary Launch &amp; Sending</h4>
            <p className="text-xs text-[#5C6F62] leading-relaxed">
              Commissioning service with laying on of hands, venue selection, legal incorporation, and inaugural worship service.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-8 border-t border-[#E2D9CC] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/outreaches" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            View Active Church Network
          </Link>
        </Button>
        <Button asChild variant="terracotta" size="sm">
          <Link href="/#give">
            Partner with Church Planting Seed
            <Heart className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
