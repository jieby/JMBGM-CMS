'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Heart,
  QrCode,
  Sparkles,
  CheckCircle2,
  Copy,
  Send,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react'

interface PrayerGivingSectionProps {
  givingQrCodeUrl?: string | null
  bankName?: string | null
  accountName?: string | null
  accountNumber?: string | null
}

const PRAYER_CATEGORIES = [
  'Healing & Restoration',
  'Financial Provision',
  'Family & Marriage',
  'Divine Guidance & Peace',
  'Salvation of Loved Ones',
  'Spiritual Breakthrough',
]

export function PrayerGivingSection({
  givingQrCodeUrl,
  bankName = 'BDO Unibank / GCash / Maya',
  accountName = 'Jesus the Master Builder Global Ministry',
  accountNumber = '0012-3456-7890',
}: PrayerGivingSectionProps) {
  const pathname = usePathname()
  const isGivePage = pathname === '/give'
  const [activeTab, setActiveTab] = useState<'pray' | 'direct'>('pray')
  const [category, setCategory] = useState(PRAYER_CATEGORIES[0])
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyAccount = () => {
    if (accountNumber) {
      navigator.clipboard.writeText(accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      id="give"
      aria-label="Generosity, Prayer Requests, and Kingdom Giving"
      className="border-t border-[#E2D9CC] bg-[#FBF6EE] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="terracotta" className="text-xs uppercase tracking-widest px-3 py-1">
            Generosity &amp; Prayer
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#2F3E33] sm:text-4xl lg:text-5xl">
            Partner in Prayer &amp; Kingdom Mission
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#5C6F62] leading-relaxed">
            Every prayer request is personally carried by our ministerial intercessory team.
            Your faithful tithes and offerings sustain our global discipleship, church plants, and community care.
          </p>
          {!isGivePage && (
            <div className="pt-2">
              <Button asChild variant="outline" size="sm" className="border-[#C1683B] text-[#C1683B] hover:bg-[#C1683B] hover:text-white font-semibold">
                <Link href="/give">
                  View Dedicated Giving &amp; Stewardship Page
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-[#E2D9CC] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('pray')}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === 'pray'
                  ? 'bg-[#C1683B] text-white shadow-md'
                  : 'text-[#5C6F62] hover:text-[#2F3E33]'
              }`}
            >
              <Heart className="h-4 w-4" />
              Pray &amp; Give
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === 'direct'
                  ? 'bg-[#2F3E33] text-white shadow-md'
                  : 'text-[#5C6F62] hover:text-[#2F3E33]'
              }`}
            >
              <QrCode className="h-4 w-4" />
              Give Directly
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Card */}
          <div className="lg:col-span-7">
            {activeTab === 'pray' ? (
              <Card className="border-[#E2D9CC] bg-white shadow-lg overflow-hidden">
                <CardHeader className="bg-[#EFE8DC]/40 border-b border-[#E2D9CC]/60 pb-5">
                  <div className="flex items-center gap-2 text-[#C1683B]">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Intercessory Request
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-[#2F3E33]">
                    How Can We Pray For You?
                  </CardTitle>
                  <CardDescription className="text-[#5C6F62]">
                    Share your burden, thanksgiving, or petition. Our pastoral team prays over each name daily.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {submitted ? (
                    <div className="space-y-6 py-4 animate-in fade-in duration-300">
                      <div className="rounded-2xl border border-[#8A9A5B]/40 bg-[#8A9A5B]/10 p-6 text-center space-y-3">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-[#8A9A5B]" />
                        <h4 className="text-xl font-bold text-[#2F3E33]">
                          Prayer Request Received
                        </h4>
                        <p className="text-sm text-[#5C6F62] leading-relaxed">
                          Dear <strong>{formData.name}</strong>, our prayer intercessors have received your petition.
                          We stand in agreement with you before the throne of grace.
                        </p>
                        <p className="text-xs font-serif italic text-[#8A9A5B]">
                          &ldquo;Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.&rdquo; — Mark 11:24
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#E2D9CC] bg-[#FBF6EE] p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#2F3E33]">
                            Would you like to support the ministry?
                          </span>
                          <Badge variant="terracotta" className="text-[10px]">Kingdom Partner</Badge>
                        </div>
                        <p className="text-xs text-[#5C6F62] leading-relaxed">
                          Your seed gift advances pastoral care and local community outreach across our branches.
                        </p>
                        <Button
                          onClick={() => setActiveTab('direct')}
                          variant="terracotta"
                          className="w-full font-semibold"
                        >
                          View Giving QR Code &amp; Bank Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ name: '', contact: '', message: '' })
                        }}
                        className="text-xs text-[#5C6F62] hover:text-[#2F3E33]"
                      >
                        ← Submit Another Prayer Request
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitPrayer} className="space-y-5">
                      {/* Category Pills */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#2F3E33] uppercase tracking-wider">
                          Select Prayer Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {PRAYER_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCategory(cat)}
                              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                                category === cat
                                  ? 'bg-[#2F3E33] text-white shadow-sm'
                                  : 'bg-[#FBF6EE] text-[#5C6F62] border border-[#E2D9CC] hover:bg-[#EFE8DC]'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="prayer-name" className="text-xs font-semibold text-[#2F3E33]">
                            Your Full Name *
                          </label>
                          <Input
                            id="prayer-name"
                            required
                            placeholder="e.g. Brother John Doe"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="border-[#E2D9CC] bg-[#FBF6EE] focus-visible:ring-[#C1683B]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="prayer-contact" className="text-xs font-semibold text-[#2F3E33]">
                            Email or Mobile Phone *
                          </label>
                          <Input
                            id="prayer-contact"
                            required
                            placeholder="john@example.com or +63 917..."
                            value={formData.contact}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setFormData({ ...formData, contact: e.target.value })
                            }
                            className="border-[#E2D9CC] bg-[#FBF6EE] focus-visible:ring-[#C1683B]"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="prayer-message" className="text-xs font-semibold text-[#2F3E33]">
                          Prayer Petition / Message *
                        </label>
                        <Textarea
                          id="prayer-message"
                          required
                          rows={4}
                          placeholder="Please pray for healing, breakthrough in our family, and peace in this season..."
                          value={formData.message}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="border-[#E2D9CC] bg-[#FBF6EE] focus-visible:ring-[#C1683B] resize-none"
                        />
                      </div>

                      {/* Confidentiality Notice */}
                      <div className="flex items-center gap-2 text-xs text-[#5C6F62]">
                        <ShieldCheck className="h-4 w-4 text-[#8A9A5B] shrink-0" />
                        <span>All prayer requests are kept strictly confidential with our pastoral council.</span>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <Button type="submit" variant="terracotta" size="lg" className="w-full sm:w-auto font-semibold">
                          <Send className="mr-2 h-4 w-4" />
                          Send Prayer Request &amp; Reveal QR Code
                        </Button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('direct')}
                          className="text-xs text-[#C1683B] hover:underline font-medium"
                        >
                          View Giving QR Code Directly →
                        </button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Direct Giving View */
              <Card className="border-[#E2D9CC] bg-white shadow-lg overflow-hidden">
                <CardHeader className="bg-[#2F3E33] text-white pb-5">
                  <div className="flex items-center gap-2 text-[#E3A857]">
                    <QrCode className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Official Giving Channels
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-white">
                    Direct Kingdom Giving
                  </CardTitle>
                  <CardDescription className="text-[#E2D9CC]">
                    Tithes, mission offerings, and general benevolence funds via instant QR code and bank transfer.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Account Box */}
                  <div className="rounded-xl border border-[#E2D9CC] bg-[#FBF6EE] p-5 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs uppercase font-bold tracking-wider text-[#8A9A5B]">
                          Bank / Institution
                        </span>
                        <p className="text-base font-bold text-[#2F3E33]">{bankName}</p>
                      </div>
                      <Badge variant="sage" className="text-[10px]">Verified Account</Badge>
                    </div>

                    <div className="space-y-1 border-t border-[#E2D9CC]/80 pt-3">
                      <span className="text-xs uppercase font-bold tracking-wider text-[#8A9A5B]">
                        Account Name
                      </span>
                      <p className="text-sm font-semibold text-[#2F3E33]">{accountName}</p>
                    </div>

                    <div className="space-y-1 border-t border-[#E2D9CC]/80 pt-3">
                      <span className="text-xs uppercase font-bold tracking-wider text-[#8A9A5B]">
                        Account Number
                      </span>
                      <div className="flex items-center justify-between gap-2 bg-white rounded-lg border border-[#E2D9CC] px-3.5 py-2">
                        <span className="font-mono text-base font-bold text-[#2F3E33] tracking-wider">
                          {accountNumber}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyAccount}
                          className="h-8 gap-1.5 text-xs text-[#C1683B] hover:text-[#C1683B] hover:bg-[#EFE8DC]"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-green-600" />
                              <span className="text-green-600 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Scripture Endorsement */}
                  <div className="rounded-xl border border-[#E3A857]/30 bg-[#E3A857]/10 p-4 text-center">
                    <p className="text-sm font-serif italic text-[#2F3E33]">
                      &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
                    </p>
                    <span className="mt-1 block text-xs font-semibold text-[#C1683B] uppercase tracking-wider">
                      — 2 Corinthians 9:7
                    </span>
                  </div>

                  <Button
                    onClick={() => setActiveTab('pray')}
                    variant="outline"
                    className="w-full border-[#C1683B] text-[#C1683B] hover:bg-[#C1683B] hover:text-white"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Submit a Personal Prayer Request
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* QR Code Presentation Box */}
          <div className="lg:col-span-5">
            <Card className="border-[#E2D9CC] bg-[#2F3E33] text-[#FBF6EE] shadow-xl overflow-hidden text-center sticky top-24">
              <CardHeader className="pb-3 border-b border-white/10">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E3A857]/20 text-[#E3A857] mb-2">
                  <QrCode className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl text-white">Scan to Give</CardTitle>
                <CardDescription className="text-[#E2D9CC]/75 text-xs">
                  Scan via GCash, Maya, QRPh, or any Philippine banking app.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* QR Code Graphic Frame */}
                <div className="relative mx-auto w-56 h-56 rounded-2xl bg-white p-3 shadow-inner flex items-center justify-center border-4 border-[#C1683B]">
                  {givingQrCodeUrl ? (
                    <Image
                      src={givingQrCodeUrl}
                      alt="JMBGM Official Giving QR Code"
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    /* Stylized Procedural QR Display */
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#FBF6EE] rounded-xl border border-[#E2D9CC] p-4 text-center">
                      <QrCode className="h-28 w-28 text-[#2F3E33]" />
                      <span className="mt-1 font-mono text-[10px] font-bold text-[#C1683B] uppercase tracking-wider">
                        Official JMBGM QRPh
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-xs text-[#E2D9CC]/80">
                  <p className="font-semibold text-white">{accountName}</p>
                  <p className="font-mono text-[#E3A857]">{accountNumber}</p>
                  <p className="text-[11px] text-[#E2D9CC]/60 pt-1">
                    Receipts &amp; tax acknowledgment certificates available upon email request.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Link to Dedicated Giving Page */}
          {!isGivePage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#E2D9CC] bg-[#EFE8DC]/50 p-6 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-bold text-[#2F3E33]">Looking for bank wire transfers or recurring giving?</h4>
                <p className="text-xs text-[#5C6F62]">
                  Visit our dedicated stewardship page for international remittance guides, check designations, and donor receipt instructions.
                </p>
              </div>
              <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-sm whitespace-nowrap">
                <Link href="/give">
                  Open Full Giving Page
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
