'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'motion/react'
import { useLenis } from 'lenis/react'
import { StoryActMeta } from './story-data'
import { ActVisual } from './ActVisual'
import { AtmosphericClouds } from './AtmosphericClouds'
import { Quote, ChevronDown, Sparkles } from 'lucide-react'

interface ScrollyStageProps {
  acts: (StoryActMeta & { backgroundMediaUrl?: string })[]
}

export function ScrollyStage({ acts }: ScrollyStageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeActIndex, setActiveActIndex] = useState(0)
  const lenis = useLenis()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Track active act index from scroll progression
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const totalActs = acts.length
    const computedIndex = Math.min(
      Math.floor(latest * totalActs),
      totalActs - 1
    )
    if (computedIndex !== activeActIndex) {
      setActiveActIndex(computedIndex)
    }
  })

  // Programmatic smooth scroll to a specific act
  const scrollToAct = (index: number) => {
    if (!containerRef.current) return
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight
    const targetY = containerTop + (index / (acts.length - 1)) * totalHeight

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.4 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative hidden md:block h-[500vh] w-full bg-[#16221A] text-[#FBF6EE]"
      id="cinematic-narrative"
    >
      {/* Pinned Sticky Stage Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Layer 1: Background Visual Crossfade & Atmosphere */}
        <div className="absolute inset-0 z-0">
          {acts.map((act, index) => (
            <ActVisualFrame
              key={act.chapterKey}
              act={act}
              index={index}
              total={acts.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Layer 2: Volumetric Shekinah Mist & Clouds */}
        <AtmosphericClouds intensity={0.45} />

        {/* Layer 3: Top Navigation Bar / Scrubber Header */}
        <header className="relative z-30 flex items-center justify-between px-8 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#E3A857] shadow-[0_0_12px_#E3A857] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E2D9CC]/90">
              The 5-Act Narrative Blueprint
            </span>
          </div>

          {/* Act Switcher Scrubber Dots */}
          <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-[#2F3E33]/70 backdrop-blur-md px-4 py-2 shadow-lg">
            {acts.map((act, index) => {
              const isActive = activeActIndex === index
              return (
                <button
                  key={act.chapterKey}
                  onClick={() => scrollToAct(index)}
                  className={`group relative flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C1683B] text-white font-bold shadow-md'
                      : 'text-[#E2D9CC]/70 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`Jump to ${act.actRoman}: ${act.headline}`}
                >
                  <span className="font-mono text-[11px]">{act.actRoman}</span>
                  {isActive && (
                    <span className="max-w-[130px] truncate text-[11px] font-medium hidden lg:inline">
                      {act.headline}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </header>

        {/* Layer 4: Main Kinetic Typography Content Stage */}
        <main className="relative z-30 flex-1 flex items-center justify-center px-6 lg:px-16 pointer-events-none">
          <div className="w-full max-w-4xl mx-auto">
            {acts.map((act, index) => (
              <ActTypographyFrame
                key={act.chapterKey}
                act={act}
                index={index}
                total={acts.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </main>

        {/* Layer 5: Footer HUD & Scroll Cue */}
        <footer className="relative z-30 flex items-center justify-between px-8 pb-6 pt-3 text-xs text-[#E2D9CC]/75">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#E3A857]" />
            <span className="hidden sm:inline italic">
              &quot;{acts[activeActIndex]?.theologyTheme}&quot;
            </span>
          </div>

          {/* Scroll Down Cue */}
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-widest text-[11px] font-medium">
              {activeActIndex === acts.length - 1
                ? 'Scroll to Connect Portal'
                : 'Scroll to Progress'}
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce text-[#C1683B]" />
          </div>
        </footer>
      </div>
    </div>
  )
}

/** Individual visual background frame scrubbed via Motion v12 useTransform */
function ActVisualFrame({
  act,
  index,
  total,
  scrollYProgress,
}: {
  act: StoryActMeta & { backgroundMediaUrl?: string }
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 1 / total
  const enterStart = index === 0 ? 0 : (index - 0.5) * step
  const enterPeak = index * step
  const exitStart = (index + 0.6) * step
  const exitEnd = index === total - 1 ? 1.0 : (index + 1.2) * step

  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterPeak, exitStart, exitEnd],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [enterStart, enterPeak, exitEnd],
    [1.08, 1.0, 0.96]
  )

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 h-full w-full pointer-events-none will-change-[opacity,transform]"
    >
      <ActVisual
        order={act.order}
        mediaUrl={act.backgroundMediaUrl}
        alt={act.headline}
      />
    </motion.div>
  )
}

/** Individual kinetic typography card scrubbed via Motion v12 useTransform */
function ActTypographyFrame({
  act,
  index,
  total,
  scrollYProgress,
}: {
  act: StoryActMeta
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 1 / total
  const enterStart = index === 0 ? 0 : Math.max(0, (index - 0.4) * step)
  const enterPeak = (index + 0.05) * step
  const exitStart = (index + 0.65) * step
  const exitEnd = index === total - 1 ? 1.0 : Math.min(1.0, (index + 1.15) * step)

  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterPeak, exitStart, exitEnd],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  )

  const y = useTransform(
    scrollYProgress,
    [enterStart, enterPeak, exitStart, exitEnd],
    [index === 0 ? 0 : 35, 0, 0, index === total - 1 ? 0 : -35]
  )

  const scale = useTransform(
    scrollYProgress,
    [enterStart, enterPeak, exitStart, exitEnd],
    [index === 0 ? 1 : 0.94, 1, 1, index === total - 1 ? 1 : 0.96]
  )

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-x-0 mx-auto max-w-3xl flex flex-col items-center text-center px-4 will-change-[opacity,transform]"
    >
      {/* Pillar Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E3A857]/40 bg-[#2F3E33]/80 backdrop-blur-md px-4 py-1.5 shadow-lg mb-6">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: act.accentColor }}
        />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FBF6EE]">
          {act.pillarName}
        </span>
      </div>

      {/* Main Cinematic Headline */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FBF6EE] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] leading-tight mb-5">
        {act.headline}
      </h2>

      {/* Anchor Scripture Card */}
      <div className="relative my-4 max-w-2xl rounded-2xl border border-white/15 bg-[#2F3E33]/70 backdrop-blur-lg p-6 sm:p-7 shadow-2xl">
        <Quote className="absolute top-4 left-4 h-6 w-6 text-[#C1683B] opacity-50 -scale-x-100" />
        <p className="text-lg sm:text-xl font-serif italic text-[#FBF6EE] leading-relaxed px-4">
          &ldquo;{act.scriptureText}&rdquo;
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#C1683B]/50" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#E3A857]">
            {act.scriptureRef}
          </span>
          <span className="h-px w-8 bg-[#C1683B]/50" />
        </div>
      </div>

      {/* Subheadline / Theology Narrative */}
      <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#E2D9CC] leading-relaxed drop-shadow-md">
        {act.subheadline}
      </p>

      {/* Atmospheric Transition Hint */}
      <div className="mt-5 text-[11px] tracking-wide text-[#E2D9CC]/60 italic">
        {act.atmosphericTransition}
      </div>
    </motion.div>
  )
}
