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

  // Track active act index from scroll progression aligned to anchors [0, 0.25, 0.50, 0.75, 1.0]
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const totalActs = acts.length
    const computedIndex = Math.min(
      Math.max(0, Math.round(latest * (totalActs - 1))),
      totalActs - 1
    )
    if (computedIndex !== activeActIndex) {
      setActiveActIndex(computedIndex)
    }
  })

  // Programmatic smooth scroll to a specific act anchor
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
      {/* Pinned Sticky Stage Viewport with pt-16 for site header clearance */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16">
        {/* Layer 1: Background Visual Crossfade & Atmosphere */}
        <div className="absolute inset-0 z-0">
          {acts.map((act, index) => (
            <ActVisualFrame
              key={act.chapterKey}
              act={act}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Layer 2: Volumetric Shekinah Mist & Clouds */}
        <AtmosphericClouds intensity={0.45} />

        {/* Layer 3: Top Navigation Bar / Scrubber Header */}
        <header className="relative z-30 flex items-center justify-between px-8 pt-4 pb-2">
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
              const pillLabel = index === 0 ? 'JMBGM' : act.headline
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
                      {pillLabel}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </header>

        {/* Layer 4: Main Kinetic Typography Content Stage */}
        <main className="relative z-30 flex-1 flex items-center justify-center px-6 lg:px-16 pointer-events-none">
          <div className="w-full max-w-4xl mx-auto relative flex items-center justify-center min-h-[360px]">
            {acts.map((act, index) => (
              <ActTypographyFrame
                key={act.chapterKey}
                act={act}
                index={index}
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

/** 
 * Background video frames calibrated around anchors [0.00, 0.25, 0.50, 0.75, 1.00].
 * Clean crossfades that stay 100% solid around the act's active center.
 */
function ActVisualFrame({
  act,
  index,
  scrollYProgress,
}: {
  act: StoryActMeta & { backgroundMediaUrl?: string }
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const ranges: Record<number, { inputs: number[]; outputs: number[] }> = {
    0: { inputs: [0.00, 0.10, 0.15, 1.00], outputs: [1, 1, 0, 0] },
    1: { inputs: [0.00, 0.10, 0.15, 0.35, 0.40, 1.00], outputs: [0, 0, 1, 1, 0, 0] },
    2: { inputs: [0.00, 0.35, 0.40, 0.60, 0.65, 1.00], outputs: [0, 0, 1, 1, 0, 0] },
    3: { inputs: [0.00, 0.60, 0.65, 0.85, 0.90, 1.00], outputs: [0, 0, 1, 1, 0, 0] },
    4: { inputs: [0.00, 0.85, 0.90, 1.00], outputs: [0, 0, 1, 1] },
  }

  const actRange = ranges[index] || { inputs: [0, 1], outputs: [0, 0] }
  const opacity = useTransform(scrollYProgress, actRange.inputs, actRange.outputs)
  const visibility = useTransform(opacity, (val) => (val > 0.01 ? 'visible' : 'hidden'))

  return (
    <motion.div
      style={{
        opacity,
        visibility,
      }}
      className="absolute inset-0 h-full w-full pointer-events-none will-change-[opacity]"
    >
      <ActVisual
        order={act.order}
        mediaUrl={act.backgroundMediaUrl}
        alt={act.headline}
      />
    </motion.div>
  )
}

/** 
 * Kinetic typography cards with strict non-overlapping intervals around anchors:
 * Act 0: 0.00 | Act 1: 0.25 | Act 2: 0.50 | Act 3: 0.75 | Act 4: 1.00
 * Each act exits completely with a clear transition gap before the next act begins entering.
 * Zero text overlapping guaranteed.
 */
function ActTypographyFrame({
  act,
  index,
  scrollYProgress,
}: {
  act: StoryActMeta
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const ranges: Record<
    number,
    { inputs: number[]; opacityOutputs: number[]; yOutputs: number[] }
  > = {
    // Act 0: Active from 0.00 to 0.08, exits 0.08-0.11, completely 0 from 0.11 to 1.0
    0: {
      inputs: [0.00, 0.08, 0.11, 1.00],
      opacityOutputs: [1, 1, 0, 0],
      yOutputs: [0, 0, -30, -30],
    },
    // Act 1: Enters 0.14-0.17, solid 0.17-0.33, exits 0.33-0.36, 0 everywhere else
    1: {
      inputs: [0.00, 0.14, 0.17, 0.33, 0.36, 1.00],
      opacityOutputs: [0, 0, 1, 1, 0, 0],
      yOutputs: [30, 30, 0, 0, -30, -30],
    },
    // Act 2: Enters 0.39-0.42, solid 0.42-0.58, exits 0.58-0.61, 0 everywhere else
    2: {
      inputs: [0.00, 0.39, 0.42, 0.58, 0.61, 1.00],
      opacityOutputs: [0, 0, 1, 1, 0, 0],
      yOutputs: [30, 30, 0, 0, -30, -30],
    },
    // Act 3: Enters 0.64-0.67, solid 0.67-0.83, exits 0.83-0.86, 0 everywhere else
    3: {
      inputs: [0.00, 0.64, 0.67, 0.83, 0.86, 1.00],
      opacityOutputs: [0, 0, 1, 1, 0, 0],
      yOutputs: [30, 30, 0, 0, -30, -30],
    },
    // Act 4: Enters 0.89-0.92, solid 0.92-1.00
    4: {
      inputs: [0.00, 0.89, 0.92, 1.00],
      opacityOutputs: [0, 0, 1, 1],
      yOutputs: [30, 30, 0, 0],
    },
  }

  const actRange = ranges[index] || {
    inputs: [0, 1],
    opacityOutputs: [0, 0],
    yOutputs: [0, 0],
  }

  const opacity = useTransform(scrollYProgress, actRange.inputs, actRange.opacityOutputs)
  const y = useTransform(scrollYProgress, actRange.inputs, actRange.yOutputs)
  const display = useTransform(opacity, (val) => (val > 0.01 ? 'flex' : 'none'))
  const visibility = useTransform(opacity, (val) => (val > 0.01 ? 'visible' : 'hidden'))

  return (
    <motion.div
      style={{
        opacity,
        y,
        display,
        visibility,
      }}
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
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FBF6EE] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] leading-tight mb-5 max-w-3xl">
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
