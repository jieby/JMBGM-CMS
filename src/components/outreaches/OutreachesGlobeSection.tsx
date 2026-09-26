'use client'

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Globe2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  ExternalLink,
  Church,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'

export interface ChurchBranch {
  id: string | number
  name: string
  slug: string
  branchType: 'Main Sanctuary' | 'Planted Campus' | 'Pioneering Outreach'
  leadPastor: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  serviceTimes?: { day: string; time: string; serviceName: string }[]
  coverImageUrl?: string | null
  contactPhone?: string | null
  contactEmail?: string | null
  featured?: boolean
}

// Curated architectural photos for campuses without an uploaded cover image
const FALLBACK_CAMPUS_IMAGES: Record<string, string> = {
  'metro-manila-main':
    'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
  'cebu-city-campus':
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
  'davao-city-campus':
    'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=800&q=80',
  'pampanga-campus':
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
  'singapore-international':
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
}

// World coastline key reference contours for atmospheric 3D globe rendering
const LANDMASS_POLYGONS: [number, number][][] = [
  // Southeast Asia & Philippines
  [
    [18.5, 120.5], [16.0, 120.0], [14.0, 121.0], [12.5, 122.5], [10.5, 123.0],
    [9.5, 123.5], [8.0, 125.0], [6.5, 125.5], [6.0, 124.5], [8.0, 122.0],
    [10.0, 119.0], [12.0, 119.5], [14.5, 120.0], [16.5, 120.2], [18.5, 121.5]
  ],
  // Indochina / Thailand / Malaysia / Singapore
  [
    [22.0, 100.0], [20.0, 106.0], [16.0, 108.0], [11.0, 108.5], [8.5, 104.5],
    [6.0, 102.0], [1.3, 103.8], [3.0, 101.5], [6.5, 100.0], [13.0, 100.5],
    [16.0, 98.0], [21.0, 96.0]
  ],
  // Indonesia / Borneo
  [
    [6.0, 117.0], [4.0, 118.5], [1.0, 119.0], [-1.5, 117.0], [-3.5, 115.0],
    [-3.0, 111.0], [-1.0, 109.5], [1.5, 110.0], [4.0, 114.0]
  ],
  // East Asia (China / Korea / Japan outline)
  [
    [40.0, 120.0], [35.0, 129.0], [38.0, 141.0], [34.0, 136.0], [31.0, 130.5],
    [25.0, 121.5], [22.0, 114.0], [21.5, 108.0], [28.0, 119.0], [37.0, 122.0]
  ],
  // Australia
  [
    [-11.5, 142.5], [-16.0, 146.0], [-24.0, 153.0], [-34.0, 151.0], [-38.0, 145.0],
    [-35.0, 137.0], [-32.0, 129.0], [-35.0, 117.0], [-22.0, 114.0], [-15.0, 125.0],
    [-12.0, 132.0], [-12.5, 136.5]
  ],
  // South Asia / India
  [
    [24.0, 68.0], [20.0, 73.0], [13.0, 75.0], [8.0, 77.5], [13.0, 80.0],
    [20.0, 86.0], [24.0, 89.0], [22.0, 91.5]
  ],
  // Middle East & Africa outline sample
  [
    [31.0, 32.0], [22.0, 37.0], [12.5, 43.5], [-4.0, 39.5], [-26.0, 33.0],
    [-34.0, 20.0], [-15.0, 12.0], [4.0, 9.0], [12.0, -16.0], [30.0, -9.0],
    [36.0, -5.0], [36.0, 10.0], [31.0, 30.0]
  ],
  // Europe outline
  [
    [36.0, -5.0], [43.0, -9.0], [48.0, -4.5], [54.0, 8.5], [58.0, 5.0],
    [62.0, 15.0], [60.0, 28.0], [45.0, 35.0], [40.0, 26.0], [38.0, 22.0],
    [38.0, 15.0], [43.0, 10.0]
  ],
  // North America
  [
    [58.0, -135.0], [48.0, -125.0], [33.0, -118.0], [23.0, -110.0], [18.0, -104.0],
    [15.0, -92.0], [25.0, -80.0], [35.0, -75.0], [45.0, -65.0], [55.0, -60.0],
    [60.0, -70.0], [70.0, -100.0]
  ],
]

export function OutreachesGlobeSection({ branches }: { branches: ChurchBranch[] }) {
  const pathname = usePathname()
  const isOutreachesPage = pathname === '/outreaches'
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [activeBranchId, setActiveBranchId] = useState<string | number>(
    branches[0]?.id || 'metro-manila-main'
  )
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })

  // Target rotation angles for smooth animation
  const rotationRef = useRef({
    x: 0.15, // tilt
    y: -2.1, // yaw focused on Southeast Asia
    targetX: 0.15,
    targetY: -2.1,
  })

  // The active branch object
  const activeBranch = useMemo(() => {
    return branches.find((b) => b.id === activeBranchId) || branches[0]
  }, [branches, activeBranchId])

  // Center the globe to a given branch coordinates
  const focusOnBranch = useCallback((branch: ChurchBranch) => {
    setActiveBranchId(branch.id)
    const targetLonRad = -(branch.longitude * Math.PI) / 180 - Math.PI / 2
    const targetLatRad = (branch.latitude * Math.PI) / 180 * 0.4
    rotationRef.current.targetY = targetLonRad
    rotationRef.current.targetX = Math.max(-0.4, Math.min(0.4, targetLatRad))
  }, [])

  // Drag rotation handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    dragStartRef.current = { x: e.clientX, y: e.clientY }

    rotationRef.current.targetY += dx * 0.008
    rotationRef.current.targetX = Math.max(
      -0.6,
      Math.min(0.6, rotationRef.current.targetX + dy * 0.006)
    )
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // 3D Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let pulseAngle = 0

    const render = () => {
      pulseAngle += 0.04
      const rot = rotationRef.current

      // Smooth easing toward target rotation
      rot.x += (rot.targetX - rot.x) * 0.08
      rot.y += (rot.targetY - rot.y) * 0.08

      // Slow gentle auto-rotation when user is not dragging
      if (!isDragging && !isHovered) {
        rot.targetY += 0.0018
      }

      // Resize canvas with pixel ratio
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const width = rect.width
      const height = rect.height

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const R = Math.min(width, height) * 0.38

      // 1. Atmospheric Outer Glow (Celestial Golden Aura)
      const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.25)
      glowGrad.addColorStop(0, 'rgba(227, 168, 87, 0.28)')
      glowGrad.addColorStop(0.5, 'rgba(193, 104, 59, 0.12)')
      glowGrad.addColorStop(1, 'rgba(22, 34, 26, 0)')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2)
      ctx.fill()

      // 2. Globe Sphere (Deep Forest Green with 3D spherical shade)
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      const sphereGrad = ctx.createRadialGradient(
        cx - R * 0.3,
        cy - R * 0.3,
        R * 0.1,
        cx,
        cy,
        R
      )
      sphereGrad.addColorStop(0, '#2F3E33')
      sphereGrad.addColorStop(0.6, '#1C2920')
      sphereGrad.addColorStop(1, '#0E1712')
      ctx.fillStyle = sphereGrad
      ctx.fill()

      // Helper: 3D Spherical Projection Function
      const project = (lat: number, lon: number, alt: number = 0) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lon + 180) * (Math.PI / 180) + rot.y
        const r = R * (1 + alt)

        // 3D Cartesian coordinates on sphere
        const x0 = -r * Math.sin(phi) * Math.cos(theta)
        const y0 = -r * Math.cos(phi)
        const z0 = r * Math.sin(phi) * Math.sin(theta)

        // Tilt rotation along X axis
        const x = x0
        const y = y0 * Math.cos(rot.x) - z0 * Math.sin(rot.x)
        const z = y0 * Math.sin(rot.x) + z0 * Math.cos(rot.x)

        return {
          screenX: cx + x,
          screenY: cy + y,
          visible: z > -R * 0.05,
          zDepth: z,
        }
      }

      // 3. Latitude & Longitude Meridians
      ctx.strokeStyle = 'rgba(138, 154, 91, 0.15)'
      ctx.lineWidth = 1

      // Latitude rings
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        let started = false
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = project(lat, lon)
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.screenX, pt.screenY)
              started = true
            } else {
              ctx.lineTo(pt.screenX, pt.screenY)
            }
          } else {
            started = false
          }
        }
        ctx.stroke()
      }

      // Longitude meridians
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath()
        let started = false
        for (let lat = -80; lat <= 80; lat += 5) {
          const pt = project(lat, lon)
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.screenX, pt.screenY)
              started = true
            } else {
              ctx.lineTo(pt.screenX, pt.screenY)
            }
          } else {
            started = false
          }
        }
        ctx.stroke()
      }

      // 4. Subtle Continent Landmass Contours
      ctx.fillStyle = 'rgba(138, 154, 91, 0.22)'
      ctx.strokeStyle = 'rgba(227, 168, 87, 0.35)'
      ctx.lineWidth = 1.2

      for (const poly of LANDMASS_POLYGONS) {
        ctx.beginPath()
        let visibleCount = 0
        poly.forEach(([lat, lon], idx) => {
          const pt = project(lat, lon)
          if (pt.visible) visibleCount++
          if (idx === 0) {
            ctx.moveTo(pt.screenX, pt.screenY)
          } else {
            ctx.lineTo(pt.screenX, pt.screenY)
          }
        })
        ctx.closePath()
        if (visibleCount > 2) {
          ctx.fill()
          ctx.stroke()
        }
      }

      // 5. Great-Circle Mission Arcs (radiating from Main Sanctuary to Planted Campuses)
      const mainBranch = branches.find((b) => b.branchType === 'Main Sanctuary') || branches[0]

      if (mainBranch) {
        for (const branch of branches) {
          if (branch.id === mainBranch.id) continue

          const steps = 30
          ctx.beginPath()
          let anyVisible = false

          for (let s = 0; s <= steps; s++) {
            const t = s / steps
            // Great-circle interpolation
            const lat = mainBranch.latitude + (branch.latitude - mainBranch.latitude) * t
            const lon = mainBranch.longitude + (branch.longitude - mainBranch.longitude) * t
            // Curved vertical parabola arc above sphere
            const alt = Math.sin(t * Math.PI) * 0.12

            const pt = project(lat, lon, alt)
            if (pt.visible) anyVisible = true

            if (s === 0) {
              ctx.moveTo(pt.screenX, pt.screenY)
            } else {
              ctx.lineTo(pt.screenX, pt.screenY)
            }
          }

          if (anyVisible) {
            ctx.strokeStyle = 'rgba(227, 168, 87, 0.65)'
            ctx.setLineDash([4, 4])
            ctx.lineWidth = 1.5
            ctx.stroke()
            ctx.setLineDash([])
          }
        }
      }

      // 6. Church Branch Hotspot Beacons & Pulsing Rings
      for (const branch of branches) {
        const pt = project(branch.latitude, branch.longitude)
        if (!pt.visible) continue

        const isMain = branch.branchType === 'Main Sanctuary'
        const isActive = branch.id === activeBranchId
        const pulse = (Math.sin(pulseAngle) + 1) / 2
        const colorPrimary = isMain ? '#E3A857' : '#C1683B'

        // Pulsing radar ripple ring
        ctx.beginPath()
        ctx.arc(pt.screenX, pt.screenY, 5 + pulse * (isActive ? 12 : 8), 0, Math.PI * 2)
        ctx.strokeStyle = colorPrimary
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Solid beacon center
        ctx.beginPath()
        ctx.arc(pt.screenX, pt.screenY, isActive ? 5 : 3.5, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? '#FFFFFF' : colorPrimary
        ctx.fill()
        ctx.strokeStyle = '#16221A'
        ctx.lineWidth = 1
        ctx.stroke()

        // Hotspot Label
        ctx.font = isActive ? 'bold 11px sans-serif' : '10px sans-serif'
        ctx.fillStyle = isActive ? '#FBF6EE' : 'rgba(226, 217, 204, 0.85)'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(branch.city, pt.screenX + 10, pt.screenY - 2)
      }

      ctx.restore() // unclip sphere

      // Atmospheric rim stroke
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(227, 168, 87, 0.45)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore() // restore scale

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [branches, activeBranchId, isDragging, isHovered])

  return (
    <section
      id="outreaches"
      aria-label="Planted Churches Network and Campus Directory"
      className="border-t border-[#E2D9CC] bg-[#16221A] text-[#FBF6EE] px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <Badge variant="outline" className="text-xs uppercase tracking-wider text-[#E3A857] border-[#E3A857]/40 bg-[#E3A857]/10">
              Apostolic Church Network
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Planted Churches &amp; Global Campuses
            </h2>
            <p className="text-sm text-[#E2D9CC]/80 max-w-2xl leading-relaxed">
              From God&apos;s sovereign hand in the sanctuary to urban centers and diaspora nations.
              Rotate the interactive globe to explore our sister campuses, service times, and pastoral leadership.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2 text-xs text-[#E3A857] font-mono">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Interactive 3D Sphere</span>
            </div>
            {!isOutreachesPage && (
              <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-md">
                <Link href="/outreaches">
                  View Full Outreaches Page
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* 3D Globe + Active Campus Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Interactive Brand Globe */}
          <div
            ref={containerRef}
            className="lg:col-span-7 relative h-[380px] sm:h-[460px] w-full rounded-3xl border border-white/10 bg-[#0E1712] overflow-hidden shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <canvas ref={canvasRef} className="h-full w-full touch-none" />

            {/* Floating Globe HUD Overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              {branches.map((b) => {
                const isActive = b.id === activeBranchId
                return (
                  <button
                    key={b.id}
                    onClick={() => focusOnBranch(b)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#C1683B] text-white shadow-md'
                        : 'bg-[#2F3E33]/70 text-[#E2D9CC]/80 hover:text-white hover:bg-[#2F3E33]'
                    }`}
                  >
                    {b.city}
                  </button>
                )
              })}
            </div>

            <div className="absolute bottom-4 left-4 z-10 text-[11px] text-[#E2D9CC]/60 flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-[#E3A857]" />
              <span>Click a city or card to orient globe</span>
            </div>
          </div>

          {/* Right: Focused Campus Spotlight Card */}
          <div className="lg:col-span-5">
            {activeBranch && (
              <Card className="border border-white/15 bg-[#1C2920] text-white shadow-2xl overflow-hidden animate-in fade-in duration-300">
                {/* Campus Image Frame */}
                <div className="relative h-44 w-full bg-[#0E1712] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      activeBranch.coverImageUrl ||
                      FALLBACK_CAMPUS_IMAGES[activeBranch.slug] ||
                      FALLBACK_CAMPUS_IMAGES['metro-manila-main']
                    }
                    alt={activeBranch.name}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2920] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="terracotta"
                      className={`text-[10px] font-bold ${
                        activeBranch.branchType === 'Main Sanctuary'
                          ? 'bg-[#E3A857] text-[#16221A]'
                          : 'bg-[#C1683B] text-white'
                      }`}
                    >
                      {activeBranch.branchType}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="text-xl font-bold text-white leading-snug">
                    {activeBranch.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-[#E3A857] font-medium flex items-center gap-1">
                    <Church className="h-3.5 w-3.5 text-[#E3A857]" />
                    <span>Lead: {activeBranch.leadPastor}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-1 text-xs">
                  {/* Address */}
                  <div className="flex items-start gap-2 text-[#E2D9CC]/80">
                    <MapPin className="h-4 w-4 text-[#C1683B] shrink-0 mt-0.5" />
                    <span>
                      {activeBranch.address}, {activeBranch.city}, {activeBranch.country}
                    </span>
                  </div>

                  {/* Weekly Service Times */}
                  {activeBranch.serviceTimes && activeBranch.serviceTimes.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-[#16221A] p-3 space-y-2">
                      <div className="flex items-center gap-1.5 font-semibold text-[#E3A857]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Gathering Schedule</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] text-[#E2D9CC]/80">
                        {activeBranch.serviceTimes.map((st, i) => (
                          <div key={i} className="flex justify-between items-center gap-2">
                            <span className="font-medium text-white">{st.serviceName}</span>
                            <span className="font-mono text-[#8A9A5B]">
                              {st.day} • {st.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <Button
                      asChild
                      variant="terracotta"
                      size="sm"
                      className="w-full font-semibold shadow-md"
                    >
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          activeBranch.name + ' ' + activeBranch.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-1.5"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        Get Directions
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline-white"
                      size="sm"
                      className="w-full text-xs"
                    >
                      <a href="#events">
                        Campus Events
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Planted Churches Directory Cards Grid */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Church className="h-4 w-4 text-[#E3A857]" />
              All Church Campuses &amp; Sister Sanctuaries
            </h3>
            <span className="text-xs text-[#E2D9CC]/60 font-mono">
              {branches.length} Active Branches
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branches.map((branch) => {
              const isSelected = branch.id === activeBranchId
              return (
                <div
                  key={branch.id}
                  onClick={() => focusOnBranch(branch)}
                  className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#E3A857] bg-[#233127] shadow-lg shadow-[#E3A857]/10'
                      : 'border-white/10 bg-[#1C2920] hover:border-white/30 hover:bg-[#202E24]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-[#8A9A5B]">
                        {branch.city}, {branch.country}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          branch.branchType === 'Main Sanctuary'
                            ? 'bg-[#E3A857]/20 text-[#E3A857] border border-[#E3A857]/40'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {branch.branchType}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-[#E3A857] transition-colors leading-snug">
                      {branch.name}
                    </h4>

                    <p className="text-xs text-[#E2D9CC]/75 line-clamp-2">
                      {branch.address}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#E2D9CC]/60">
                    <span>{branch.leadPastor}</span>
                    <span className="text-[#E3A857] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Focus Globe →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Link to Dedicated Outreaches Page */}
          {!isOutreachesPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 rounded-2xl bg-[#1C2920]/80 p-5">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">Looking for complete campus schedules &amp; directions?</h4>
                <p className="text-xs text-[#E2D9CC]/70">
                  Explore our full campus directory with Google Maps navigation, lead pastor details, and weekly prayer schedules.
                </p>
              </div>
              <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-md whitespace-nowrap">
                <Link href="/outreaches">
                  Open Full Outreaches Page
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
