import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Heart, ArrowLeft, ArrowRight, Clock, Users, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Community Outreaches | JMBGM',
  description: 'Hands and feet of Jesus: community food pantries, family care, and youth street mentorship.',
}

export default function OutreachesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5C6F62]">
        <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#2F3E33]">Outreaches</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="sage" className="text-xs uppercase tracking-widest px-3 py-1">
          Compassion in Action
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2F3E33]">
          Community Outreaches &amp; Care
        </h1>
        <p className="text-base text-[#5C6F62] leading-relaxed">
          The heart of Jesus the Master Builder is reflected in extending hope, nutrition, educational empowerment,
          and pastoral presence to families and underserved neighborhoods.
        </p>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE] mb-2">
              <Heart className="h-5 w-5 text-[#C1683B]" />
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Food Pantry &amp; Relief</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              Distributing wholesome food staples, hygiene kits, and hot meals to vulnerable families.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C1683B]">
              <Clock className="h-3.5 w-3.5" />
              <span>Every 2nd &amp; 4th Saturday</span>
            </div>
            <p className="text-xs text-[#5C6F62]">
              Over 500 households blessed each month through kingdom partnership.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C1683B] text-white mb-2">
              <Users className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Youth Street Discipleship</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              Mentoring street youth and local school students through leadership and creative arts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A9A5B]">
              <Clock className="h-3.5 w-3.5" />
              <span>Weekly Saturdays • 2:00 PM</span>
            </div>
            <p className="text-xs text-[#5C6F62]">
              Providing safe spaces for discipleship, athletic training, and academic tutoring.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#E2D9CC] bg-white shadow-md flex flex-col justify-between">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8A9A5B] text-white mb-2">
              <Sparkles className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl text-[#2F3E33]">Hospital &amp; Care Centers</CardTitle>
            <CardDescription className="text-[#5C6F62]">
              Compassionate visitation, pastoral prayer, and essential care packages for patients.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C6F62]">
              <Clock className="h-3.5 w-3.5" />
              <span>Weekly Thursdays</span>
            </div>
            <p className="text-xs text-[#5C6F62]">
              Bringing the peace, comfort, and restorative hope of Christ to hospital wards.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Volunteer CTA */}
      <div className="rounded-2xl border border-[#8A9A5B]/30 bg-[#8A9A5B]/10 p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-[#2F3E33]">Want to Volunteer with a Serve Team?</h3>
        <p className="text-sm text-[#5C6F62] max-w-xl mx-auto">
          We welcome hands, hearts, and skills. Step out in faith and experience the joy of blessing others in Christ&apos;s name.
        </p>
        <Button asChild variant="terracotta" size="lg" className="font-semibold">
          <Link href="/#give">
            Join a Serve Team Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[#E2D9CC] flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs text-[#5C6F62] hover:text-[#2F3E33]">
          <Link href="/#cinematic-narrative" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Homepage Narrative
          </Link>
        </Button>
      </div>
    </div>
  )
}
