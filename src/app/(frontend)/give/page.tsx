import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { SiteSetting, Media } from '@/payload-types'
import { PrayerGivingSection } from '@/components/giving/PrayerGivingSection'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Generosity & Prayer Giving | JMBGM',
  description: 'Submit your prayer requests and partner with Jesus the Master Builder Global Ministry through tithes and offerings.',
}

function getMediaUrl(media: string | number | Media | null | undefined): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  if (typeof media === 'object' && 'url' in media && typeof media.url === 'string') return media.url
  return null
}

async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'site-settings',
    })
    return res as SiteSetting
  } catch {
    return null
  }
}

export default async function GivePage() {
  const siteSettings = await getSiteSettings()
  const givingQrCodeUrl = getMediaUrl(siteSettings?.givingQrCode)

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb Bar */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-[#5C6F62]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#C1683B] transition-colors">Home</Link>
            <span>/</span>
            <span className="font-semibold text-[#2F3E33]">Give &amp; Prayer</span>
          </div>
          <Button asChild variant="ghost" size="sm" className="h-7 text-xs text-[#5C6F62] hover:text-[#2F3E33]">
            <Link href="/#cinematic-narrative" className="gap-1.5">
              <ArrowLeft className="h-3 w-3" />
              Return to Homepage
            </Link>
          </Button>
        </nav>
      </div>

      {/* Main Interactive Prayer & Giving Component */}
      <PrayerGivingSection
        givingQrCodeUrl={givingQrCodeUrl}
        bankName={siteSettings?.givingBankName}
        accountName={siteSettings?.givingAccountName}
        accountNumber={siteSettings?.givingAccountNumber}
      />
    </div>
  )
}
