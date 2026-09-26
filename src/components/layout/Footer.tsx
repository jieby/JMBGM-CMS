import Link from "next/link"
import { Church, Heart, Clock, MapPin, Mail, Phone } from "lucide-react"

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
              Jesus the Master Builder Global Ministry. Proclaiming truth, building disciples, and transforming communities through Christ.
            </p>
            <div className="pt-2 text-xs text-[#E3A857] font-serif italic">
              &ldquo;For every house is built by someone, but God is the builder of everything.&rdquo; — Hebrews 3:4
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A9A5B]">
              Ministry Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-[#FBF6EE]/75">
              <li>
                <Link href="#cinematic-narrative" className="transition-colors hover:text-[#C1683B]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#connect" className="transition-colors hover:text-[#C1683B]">
                  Connect
                </Link>
              </li>
              <li>
                <Link href="#outreaches" className="transition-colors hover:text-[#C1683B]">
                  Outreaches
                </Link>
              </li>
              <li>
                <Link href="#events" className="transition-colors hover:text-[#C1683B]">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#media" className="transition-colors hover:text-[#C1683B]">
                  Media
                </Link>
              </li>
              <li>
                <Link href="#mission" className="transition-colors hover:text-[#C1683B]">
                  Mission
                </Link>
              </li>
              <li className="col-span-2">
                <Link href="#give" className="font-medium text-[#E3A857] transition-colors hover:text-white">
                  Give &amp; Prayer Requests →
                </Link>
              </li>
            </ul>
          </div>

          {/* Church Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A9A5B]">
              Church Information
            </h4>
            <div className="space-y-2.5 text-xs text-[#FBF6EE]/80">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#E3A857] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#FBF6EE]">Sunday Celebration: 10:00 AM</p>
                  <p className="text-[#FBF6EE]/60">Midweek Word &amp; Prayer: Wednesday 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#C1683B] shrink-0 mt-0.5" />
                <span>Main Campus Sanctuary &amp; Media Studio, Metro Manila, Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8A9A5B] shrink-0" />
                <a href="mailto:info@jmbgm.org" className="hover:text-white underline-offset-2 hover:underline">
                  info@jmbgm.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#8A9A5B] shrink-0" />
                <span>+63 (02) 8123-4567 / +63 917 123 4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#FBF6EE]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF6EE]/60">
          <p>© {new Date().getFullYear()} Jesus the Master Builder Global Ministry. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 fill-[#C1683B] text-[#C1683B]" /> for JMBGM
          </p>
        </div>
      </div>
    </footer>
  )
}
