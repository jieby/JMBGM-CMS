'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Church, ArrowRight, Compass, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

interface NavLinkConfig {
  label: string
  homeAnchor: string
  subpagePath: string
  description?: string
}

const NAV_LINKS: NavLinkConfig[] = [
  {
    label: 'Home',
    homeAnchor: '/#cinematic-narrative',
    subpagePath: '/',
    description: 'Ministry overview & 5-act narrative',
  },
  {
    label: 'Connect',
    homeAnchor: '/#connect',
    subpagePath: '/connect',
    description: 'Gatherings, life groups & plan a visit',
  },
  {
    label: 'Outreaches',
    homeAnchor: '/#outreaches',
    subpagePath: '/outreaches',
    description: 'Planted church network & 3D globe',
  },
  {
    label: 'Events',
    homeAnchor: '/#events',
    subpagePath: '/events',
    description: 'Multi-campus calendar & assemblies',
  },
  {
    label: 'Media',
    homeAnchor: '/#media',
    subpagePath: '/media',
    description: 'Sermons, livestream & media archives',
  },
  {
    label: 'Mission',
    homeAnchor: '/#mission',
    subpagePath: '/mission',
    description: 'Apostolic mandate & church planter academy',
  },
  {
    label: 'Give',
    homeAnchor: '/#give',
    subpagePath: '/give',
    description: 'Prayer request & kingdom stewardship',
  },
]

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2D9CC] bg-[#FBF6EE]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link
          href={isHome ? '/#cinematic-narrative' : '/'}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE] shadow-sm">
            <Church className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#2F3E33]">
              JMBGM
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#8A9A5B] font-semibold">
              Ministry &amp; Community
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {NAV_LINKS.map((link) => {
            // Target URL based on whether user is on the homepage or a dedicated subpage
            const targetHref = isHome ? link.homeAnchor : link.subpagePath
            const isActive = !isHome && (pathname === link.subpagePath || (link.subpagePath !== '/' && pathname.startsWith(link.subpagePath)))

            return (
              <Link
                key={link.label}
                href={targetHref}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#C1683B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C1683B]'
                    : 'text-[#2F3E33] hover:text-[#C1683B]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-sm ml-2">
            <Link href={isHome ? '/#connect' : '/connect'}>
              Plan a Visit
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E2D9CC] text-[#2F3E33]"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#FBF6EE] sm:w-[340px] flex flex-col justify-between overflow-y-auto">
              <div>
                <SheetHeader className="text-left mb-4">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE]">
                      <Church className="h-4 w-4" />
                    </div>
                    <SheetTitle className="text-lg font-bold text-[#2F3E33]">
                      JMBGM
                    </SheetTitle>
                  </div>
                  <p className="text-xs text-[#5C6F62]">
                    Jesus the Master Builder Global Ministry
                  </p>
                </SheetHeader>
                <Separator className="mb-4 bg-[#E2D9CC]" />

                {/* Primary Nav Links */}
                <div className="space-y-1">
                  <div className="px-2 pb-1 text-[11px] font-mono uppercase tracking-wider text-[#8A9A5B]">
                    {isHome ? 'Jump to Section' : 'Ministry Navigation'}
                  </div>
                  {NAV_LINKS.map((link) => {
                    const targetHref = isHome ? link.homeAnchor : link.subpagePath
                    const isActive = !isHome && (pathname === link.subpagePath || (link.subpagePath !== '/' && pathname.startsWith(link.subpagePath)))

                    return (
                      <Link
                        key={link.label}
                        href={targetHref}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#C1683B]/10 text-[#C1683B] font-bold'
                            : 'text-[#2F3E33] hover:bg-[#EFE8DC]/60 hover:text-[#C1683B]'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <Badge variant="terracotta" className="text-[9px] px-1.5 py-0">
                            Active
                          </Badge>
                        )}
                      </Link>
                    )
                  })}
                </div>

                {/* Direct Links to Dedicated Pages (Visible on Mobile) */}
                {isHome && (
                  <div className="mt-4 pt-4 border-t border-[#E2D9CC] space-y-1">
                    <div className="px-2 pb-1 text-[11px] font-mono uppercase tracking-wider text-[#C1683B] flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Dedicated Pages</span>
                    </div>
                    {NAV_LINKS.filter((l) => l.subpagePath !== '/').map((link) => (
                      <Link
                        key={`dedicated-${link.label}`}
                        href={link.subpagePath}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-[#5C6F62] hover:bg-[#EFE8DC]/60 hover:text-[#2F3E33] transition-colors"
                      >
                        <span>{link.label} Page</span>
                        <ArrowRight className="h-3 w-3 opacity-60" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Drawer Bottom Action */}
              <div className="pt-4 border-t border-[#E2D9CC] mt-6">
                <Button
                  asChild
                  variant="terracotta"
                  className="w-full font-semibold shadow-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={isHome ? '/#connect' : '/connect'}>
                    Plan a Visit
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
