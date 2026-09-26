'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Calendar, MapPin, ArrowRight, Church, Sparkles, Filter } from 'lucide-react'

export interface EventItem {
  id: string | number
  title: string
  category: string
  date: string
  location?: string | null
  summary: string
  featured?: boolean
  imageUrl?: string | null
  branchId?: string | number | null
  branchName?: string | null
}

export interface EventFilterGridProps {
  events: EventItem[]
  branches: { id: string | number; name: string; city: string; slug: string }[]
}

export function EventFilterGrid({ events, branches }: EventFilterGridProps) {
  // 'all' represents All Campuses / Church-wide
  const [selectedBranchId, setSelectedBranchId] = useState<string | number>('all')

  // Filter events based on selected branch
  const filteredEvents = useMemo(() => {
    if (selectedBranchId === 'all') {
      return events
    }
    return events.filter(
      (ev) =>
        String(ev.branchId) === String(selectedBranchId) ||
        !ev.branchId // church-wide events also apply or specific campus events
    )
  }, [events, selectedBranchId])

  // Get active branch name for empty state / guidance
  const selectedBranch = useMemo(() => {
    return branches.find((b) => String(b.id) === String(selectedBranchId))
  }, [branches, selectedBranchId])

  return (
    <div className="space-y-8">
      {/* Horizontal Pill Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D9CC] pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2F3E33]">
          <Filter className="h-3.5 w-3.5 text-[#C1683B]" />
          <span>Filter by Campus:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* All Campuses Pill */}
          <button
            type="button"
            onClick={() => setSelectedBranchId('all')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedBranchId === 'all'
                ? 'bg-[#C1683B] text-white shadow-sm font-semibold'
                : 'bg-white border border-[#E2D9CC] text-[#5C6F62] hover:text-[#2F3E33] hover:bg-[#EFE8DC]/60'
            }`}
          >
            All Campuses ({events.length})
          </button>

          {/* Dynamic Campus Pills */}
          {branches.map((b) => {
            const count = events.filter(
              (ev) => String(ev.branchId) === String(b.id) || !ev.branchId
            ).length
            const isSelected = String(selectedBranchId) === String(b.id)

            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBranchId(b.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#2F3E33] text-white shadow-sm font-semibold'
                    : 'bg-white border border-[#E2D9CC] text-[#5C6F62] hover:text-[#2F3E33] hover:bg-[#EFE8DC]/60'
                }`}
              >
                {b.city} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E2D9CC] bg-white/80 p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm animate-in fade-in duration-300">
          <Church className="mx-auto h-12 w-12 text-[#8A9A5B]" />
          <h4 className="text-xl font-bold text-[#2F3E33]">
            {selectedBranch ? selectedBranch.name : 'Selected Campus'}
          </h4>
          <p className="text-sm text-[#5C6F62] leading-relaxed">
            No special events currently scheduled for this campus. Join us this Sunday for worship!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild variant="terracotta" size="sm">
              <a href="#outreaches">View Campus Gathering Times</a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedBranchId('all')}
              className="border-[#E2D9CC]"
            >
              Show All Church Events
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((item) => (
            <Card
              key={item.id}
              className={`flex flex-col justify-between border-[#E2D9CC] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                item.featured ? 'ring-2 ring-[#C1683B]' : ''
              }`}
            >
              <div>
                {/* Event Flyer / Photo */}
                {item.imageUrl && (
                  <div className="relative h-44 w-full bg-[#16221A] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="sage">{item.category}</Badge>

                    {/* Branch Tag Badge */}
                    {item.branchName ? (
                      <Badge
                        variant="secondary"
                        className="bg-[#2F3E33] text-white text-[10px] font-medium"
                      >
                        {item.branchName}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-[#8A9A5B] text-[#8A9A5B] text-[10px]">
                        All Campuses
                      </Badge>
                    )}

                    {item.featured && (
                      <Badge variant="terracotta" className="text-[10px]">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-xl line-clamp-2 text-[#2F3E33]">
                    {item.title}
                  </CardTitle>

                  <div className="flex flex-col gap-1 text-xs text-[#5C6F62]">
                    {item.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#C1683B]" />
                        {new Date(item.date).toLocaleDateString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#8A9A5B]" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-[#5C6F62] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </CardContent>
              </div>

              <CardFooter className="pt-0">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-xs text-[#C1683B] hover:text-[#C1683B]/80 hover:bg-[#EFE8DC]/50 p-0 h-auto font-semibold"
                >
                  <a href="#connect">
                    Attend &amp; Gathering Details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
