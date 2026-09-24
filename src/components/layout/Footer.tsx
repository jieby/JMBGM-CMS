import Link from "next/link"
import { Church, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#E2D9CC] bg-[#2F3E33] text-[#FBF6EE]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C1683B] text-white">
                <Church className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#FBF6EE]">
                JMBGM
              </span>
            </div>
            <p className="text-sm text-[#FBF6EE]/75 leading-relaxed">
              Jesus Miracle Bible Gospel Ministry. Proclaiming truth, building community, and transforming lives through faith.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A9A5B]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#FBF6EE]/75">
              <li>
                <Link href="/" className="transition-colors hover:text-[#C1683B]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#announcements" className="transition-colors hover:text-[#C1683B]">
                  Announcements & Events
                </Link>
              </li>
              <li>
                <Link href="#about" className="transition-colors hover:text-[#C1683B]">
                  About the Ministry
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-[#C1683B]">
                  Payload Admin CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack badge */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A9A5B]">
              Powered By
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-[#FBF6EE]/10 px-2.5 py-1 text-[#FBF6EE]">
                Next.js 16 (App Router)
              </span>
              <span className="rounded bg-[#FBF6EE]/10 px-2.5 py-1 text-[#FBF6EE]">
                Payload CMS 3
              </span>
              <span className="rounded bg-[#FBF6EE]/10 px-2.5 py-1 text-[#FBF6EE]">
                Supabase Postgres
              </span>
              <span className="rounded bg-[#FBF6EE]/10 px-2.5 py-1 text-[#FBF6EE]">
                ShadCN UI
              </span>
            </div>
            <p className="text-xs text-[#FBF6EE]/60 pt-2">
              SSR First • Mobile First • Strict CMS Architecture
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#FBF6EE]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF6EE]/60">
          <p>© {new Date().getFullYear()} JMBGM. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 fill-[#C1683B] text-[#C1683B]" /> for JMBGM
          </p>
        </div>
      </div>
    </footer>
  )
}
