'use client'

import React from 'react'
import { StoryActMeta } from './story-data'
import { ActVisual } from './ActVisual'
import { AtmosphericClouds } from './AtmosphericClouds'
import { Quote, ChevronDown } from 'lucide-react'

interface MobileStoryCardsProps {
  acts: (StoryActMeta & { backgroundMediaUrl?: string })[]
}

/**
 * Mobile Story Experience adhering strictly to the Zero Scroll-Jacking rule.
 * Uses native mobile momentum scrolling with CSS vertical cards.
 * Minimal JS overhead for high frame rates, low battery consumption, and responsive touch.
 */
export function MobileStoryCards({ acts }: MobileStoryCardsProps) {
  return (
    <section
      aria-label="The 5-Act Narrative Journey"
      className="block md:hidden bg-[#16221A] text-[#FBF6EE] px-4 py-8 space-y-6"
      id="cinematic-narrative-mobile"
    >
      {/* Header Intro Badge */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E3A857]/40 bg-[#2F3E33] px-3.5 py-1 text-xs font-semibold text-[#E3A857]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3A857] animate-pulse" />
          The 5-Act Cinematic Journey
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#FBF6EE]">
          The Master Builder&apos;s Blueprint
        </h2>
        <p className="text-xs text-[#E2D9CC]/80 max-w-xs mx-auto">
          Swipe through the spiritual progression from God&apos;s sovereign hand to global harvest.
        </p>
      </div>

      {/* Snap Cards Sequence */}
      <div className="space-y-6">
        {acts.map((act, idx) => (
          <article
            key={act.chapterKey}
            className="relative min-h-[75vh] rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between p-6 shadow-2xl bg-[#1C2920]"
          >
            {/* Visual Background */}
            <div className="absolute inset-0 z-0">
              <ActVisual
                order={act.order}
                mediaUrl={act.backgroundMediaUrl}
                alt={act.headline}
              />
            </div>

            {/* Cloud and Mist Overlay - disabled to eliminate milky veil over video plates */}
            {/* <AtmosphericClouds intensity={0.35} /> */}

            {/* Top Bar inside Card */}
            <header className="relative z-10 flex items-center justify-between">
              <span className="rounded-full border border-white/20 bg-[#2F3E33]/85 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-[#FBF6EE]">
                {act.actRoman} • {act.pillarName}
              </span>
              <span className="text-xs font-mono text-[#E2D9CC]/70">
                {idx + 1} / {acts.length}
              </span>
            </header>

            {/* Center Content */}
            <div className="relative z-10 my-auto py-6 space-y-4 text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FBF6EE] drop-shadow-md">
                {act.headline}
              </h3>

              {/* Anchor Scripture */}
              <blockquote className="rounded-2xl border border-white/10 bg-[#2F3E33]/75 backdrop-blur-md p-4 shadow-xl">
                <Quote className="mx-auto h-5 w-5 text-[#C1683B] opacity-70 -scale-x-100 mb-2" />
                <p className="text-sm font-serif italic text-[#FBF6EE] leading-relaxed">
                  &ldquo;{act.scriptureText}&rdquo;
                </p>
                <cite className="mt-3 block text-[11px] font-semibold tracking-wider uppercase text-[#E3A857] not-italic">
                  — {act.scriptureRef}
                </cite>
              </blockquote>

              {/* Subheadline / Theology theme */}
              <p className="text-xs text-[#E2D9CC] leading-relaxed">
                {act.subheadline}
              </p>
            </div>

            {/* Bottom Atmospheric Cue */}
            <footer className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#E2D9CC]/70">
              <span className="italic truncate max-w-[200px]">
                {act.theologyTheme}
              </span>
              <span className="flex items-center gap-1 font-medium text-[#E3A857]">
                {idx === acts.length - 1 ? 'Next: Connect' : 'Scroll down'}
                <ChevronDown className="h-3 w-3" />
              </span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
