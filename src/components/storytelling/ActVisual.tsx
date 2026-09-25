'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { MotionValue } from 'motion/react'

export interface ActVisualProps {
  order: number
  mediaUrl?: string
  alt?: string
  progress?: MotionValue<number>
}

export function ActVisual({ order, mediaUrl, alt, progress }: ActVisualProps) {
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    // When progress is provided, video playhead is controlled exclusively via scroll
    if (progress) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  }, [mediaUrl, progress])

  // Scroll scrub controller with rAF damping for 60-120fps fluid playback
  useEffect(() => {
    const video = videoRef.current
    if (!video || !progress) return

    let rafId: number
    let targetTime = 0

    const updatePlayhead = (val: number) => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        targetTime = Math.min(Math.max(0, val * video.duration), video.duration)
      }
    }

    const onFrame = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
            ;(video as any).fastSeek(targetTime)
          } else {
            video.currentTime = targetTime
          }
        }
      }
      rafId = requestAnimationFrame(onFrame)
    }

    const handleLoadedMetadata = () => {
      updatePlayhead(progress.get())
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        video.currentTime = targetTime
      }
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    updatePlayhead(progress.get())

    const unsubscribe = progress.on('change', updatePlayhead)
    rafId = requestAnimationFrame(onFrame)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      unsubscribe()
      cancelAnimationFrame(rafId)
    }
  }, [progress, mediaUrl])

  // If user provided a video or image asset and it hasn't errored
  if (mediaUrl && !videoError) {
    const isVideo =
      mediaUrl.endsWith('.mp4') ||
      mediaUrl.endsWith('.webm') ||
      mediaUrl.endsWith('.mov') ||
      mediaUrl.includes('/videos/')

    return (
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {isVideo ? (
          <video
            ref={videoRef}
            autoPlay={!progress}
            loop={!progress}
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            onError={(e) => {
              const code = e.currentTarget.error?.code
              // Only fallback on genuine decode (3) or src not supported (4) errors.
              // Never fallback on MEDIA_ERR_ABORTED (1) or network throttle (2).
              if (code === 3 || code === 4) {
                setVideoError(true)
              }
            }}
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={mediaUrl}
            alt={alt || `Act ${order} Background`}
            className="h-full w-full object-cover"
            onError={() => setVideoError(true)}
          />
        )}
        {/* Subtle Dark Vignette (#2F3E33) to ensure white text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2F3E33]/90 via-[#2F3E33]/45 to-[#2F3E33]/75" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(47,62,51,0.88)_100%)]" />
      </div>
    )
  }

  // Cinematic Procedural Visuals tailored to each Act with Lead Architect amendments
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#16221A]">
      {order === 0 && <Act0CosmicArchitect />}
      {order === 1 && <Act1TrueVine />}
      {order === 2 && <Act2SubterraneanRoots />}
      {order === 3 && <Act3HolyFire />}
      {order === 4 && <Act4FootstepsSand />}

      {/* Subtle Dark Vignette (#2F3E33) to ensure white text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2F3E33]/95 via-[#2F3E33]/45 to-[#2F3E33]/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(47,62,51,0.9)_100%)]" />
    </div>
  )
}

/** Act 0: Deep cosmic view. Earth glowing in God's radiant hand with volumetric sun rays. */
function Act0CosmicArchitect() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#0B120E] via-[#16221A] to-[#1E2E23]">
      {/* Volumetric Sun Rays */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(227,168,87,0.35)_0%,rgba(193,104,59,0.15)_40%,transparent_70%)] blur-3xl animate-pulse duration-1000" />
      <svg
        className="absolute inset-0 h-full w-full opacity-40 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <radialGradient id="sunbeamGlow" cx="50%" cy="10%" r="70%">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#E3A857" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2F3E33" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M500 0 L200 1000 L800 1000 Z" fill="url(#sunbeamGlow)" opacity="0.3" />
        <path d="M500 0 L50 1000 L450 1000 Z" fill="url(#sunbeamGlow)" opacity="0.2" />
        <path d="M500 0 L550 1000 L950 1000 Z" fill="url(#sunbeamGlow)" opacity="0.2" />
      </svg>

      {/* Earth glowing in the hollow of radiant architectural hands */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#E3A857] opacity-60 blur-2xl animate-spin duration-700" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#047857] to-[#93C5FD] shadow-[0_0_80px_rgba(227,168,87,0.5)] border border-[#E3A857]/40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8)_0%,transparent_60%)]" />
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-50 mix-blend-overlay">
              <path d="M20,60 Q50,40 80,70 T140,80 T180,120 T110,160 T40,130 Z" fill="#34D399" />
              <path d="M110,30 Q140,20 170,40 T160,90 Z" fill="#34D399" />
            </svg>
          </div>

          <svg
            className="absolute -inset-16 w-96 h-96 pointer-events-none text-[#E3A857]/50 drop-shadow-[0_0_20px_rgba(227,168,87,0.6)]"
            viewBox="0 0 400 400"
            fill="none"
          >
            <path
              d="M60 280 C 80 340, 160 370, 200 370 C 240 370, 320 340, 340 280"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M90 290 C 130 330, 170 345, 200 345 C 230 345, 270 330, 310 290"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <circle cx="200" cy="345" r="5" fill="#FFF2D6" />
            <line x1="200" y1="20" x2="200" y2="70" stroke="#E3A857" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/** Act 1: Sun-drenched vineyard. The True Vine pulses with life, branching with ripe fruit clusters. */
function Act1TrueVine() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#182C1E] via-[#243A2C] to-[#162419]">
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.25)_0%,rgba(138,154,91,0.2)_50%,transparent_70%)] blur-2xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 800 600"
          className="w-full max-w-4xl h-auto opacity-75 drop-shadow-[0_0_25px_rgba(138,154,91,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400 600 C 400 480, 360 420, 380 340 C 395 280, 440 220, 400 120"
            stroke="#8A9A5B"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M380 340 C 320 300, 240 310, 160 250"
            stroke="#8A9A5B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M390 260 C 470 240, 560 280, 640 220"
            stroke="#8A9A5B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M400 180 C 350 140, 290 150, 220 110"
            stroke="#8A9A5B"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M400 140 C 460 110, 520 120, 580 80"
            stroke="#8A9A5B"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Ripe Clusters of Fruit */}
          <g transform="translate(180, 270)">
            <circle cx="0" cy="0" r="14" fill="#C1683B" />
            <circle cx="16" cy="10" r="13" fill="#881337" />
            <circle cx="-14" cy="12" r="13" fill="#9F1239" />
            <circle cx="2" cy="22" r="12" fill="#C1683B" />
            <circle cx="-8" cy="34" r="10" fill="#7C2D12" />
            <circle cx="8" cy="34" r="10" fill="#9F1239" />
            <circle cx="0" cy="46" r="8" fill="#C1683B" />
          </g>

          <g transform="translate(600, 240)">
            <circle cx="0" cy="0" r="15" fill="#881337" />
            <circle cx="18" cy="8" r="14" fill="#C1683B" />
            <circle cx="-16" cy="10" r="14" fill="#7C2D12" />
            <circle cx="2" cy="22" r="13" fill="#9F1239" />
            <circle cx="14" cy="32" r="11" fill="#C1683B" />
            <circle cx="-10" cy="34" r="11" fill="#881337" />
            <circle cx="2" cy="46" r="9" fill="#9F1239" />
          </g>

          <path
            d="M400 600 C 400 480, 360 420, 380 340 C 395 280, 440 220, 400 120"
            stroke="#FFF2D6"
            strokeWidth="3"
            strokeDasharray="12 18"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}

/** 
 * Act 2: Parable of the Sower — Seed in Good, Rock-Free, Fertile Loam Soil.
 * Obstruction-free, dark crumbly loam where roots expand deep and flourish.
 */
function Act2SubterraneanRoots() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1C1510] via-[#241A13] to-[#17100B]">
      {/* Warm fertile subterranean life aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(193,104,59,0.22)_0%,rgba(138,154,91,0.15)_45%,transparent_75%)] blur-2xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 800 600"
          className="w-full max-w-4xl h-auto drop-shadow-[0_0_35px_rgba(227,168,87,0.65)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Surface Horizon Line / Pure Soft Loam Layer */}
          <path
            d="M0 160 Q 200 152, 400 160 T 800 155"
            stroke="#8A9A5B"
            strokeWidth="3"
            strokeDasharray="4 6"
            opacity="0.6"
          />

          {/* Emergent Sprout / Hundredfold Harvest Growth above ground */}
          <path
            d="M400 160 C 400 110, 390 70, 400 40"
            stroke="#8A9A5B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M400 90 C 370 75, 340 85, 330 70 C 350 60, 380 75, 400 85"
            fill="#8A9A5B"
            opacity="0.9"
          />
          <path
            d="M400 70 C 430 55, 460 65, 470 50 C 450 40, 420 55, 400 65"
            fill="#8A9A5B"
            opacity="0.9"
          />
          <circle cx="400" cy="35" r="7" fill="#E3A857" className="animate-pulse" />

          {/* Golden Seed cracked open in fertile, soft good soil */}
          <ellipse cx="400" cy="180" rx="22" ry="16" fill="#C1683B" stroke="#E3A857" strokeWidth="2.5" />
          <circle cx="400" cy="180" r="7" fill="#FFF2D6" className="animate-pulse" />

          {/* Deep unhindered root system weaving effortlessly through rich, unobstructed loam */}
          <path
            d="M400 196 C 390 270, 410 350, 400 450 C 395 510, 405 560, 400 600"
            stroke="#E3A857"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M400 240 C 330 300, 280 370, 230 460 C 190 530, 150 570, 110 600"
            stroke="#C1683B"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M400 250 C 470 310, 520 380, 570 470 C 610 540, 650 570, 690 600"
            stroke="#C1683B"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M340 320 C 270 380, 230 430, 180 500"
            stroke="#8A9A5B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M460 330 C 530 390, 570 440, 620 510"
            stroke="#8A9A5B"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Delicate feeder rootlets absorbing fertile nutrients */}
          <path d="M230 460 Q 200 480, 170 490" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
          <path d="M570 470 Q 600 490, 630 500" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
          <path d="M400 450 Q 370 480, 350 510" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
          <path d="M400 450 Q 430 480, 450 510" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      </div>
    </div>
  )
}

/** 
 * Act 3: The Holy Fire (Hebrews 1:7 & Acts 2:3–4).
 * Animated sacred flame upon the altar with rising embers and refiner's light.
 */
function Act3HolyFire() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#180E09] via-[#2A150C] to-[#120B07]">
      {/* Sacred Fire Thermal Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(227,168,87,0.38)_0%,rgba(193,104,59,0.25)_40%,transparent_70%)] blur-2xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 800 650"
          className="w-full max-w-4xl h-auto drop-shadow-[0_0_45px_rgba(227,168,87,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="flameOuter" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7C2D12" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#C1683B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E3A857" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C1683B" />
              <stop offset="50%" stopColor="#E3A857" />
              <stop offset="100%" stopColor="#FFF7ED" />
            </linearGradient>
            <linearGradient id="altarBronze" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5E3018" />
              <stop offset="100%" stopColor="#2F180B" />
            </linearGradient>
          </defs>

          {/* Altar Base */}
          <rect x="220" y="520" width="360" height="40" rx="8" fill="url(#altarBronze)" stroke="#C1683B" strokeWidth="2.5" />
          <rect x="250" y="560" width="300" height="20" rx="4" fill="#24130A" stroke="#7C2D12" strokeWidth="1.5" />
          <line x1="220" y1="520" x2="580" y2="520" stroke="#E3A857" strokeWidth="3" />

          {/* Outer Holy Fire Flare */}
          <path
            d="M280 520 C 260 420, 310 320, 370 210 C 390 170, 400 110, 400 80 C 400 110, 420 170, 440 210 C 490 310, 540 420, 520 520 Z"
            fill="url(#flameOuter)"
          />

          {/* Left Flame Tongue */}
          <path
            d="M310 520 C 290 440, 320 370, 350 300 C 370 250, 370 200, 350 160 C 370 200, 390 260, 380 340 C 370 420, 360 480, 360 520 Z"
            fill="url(#flameInner)"
            opacity="0.8"
          />

          {/* Right Flame Tongue */}
          <path
            d="M490 520 C 510 440, 480 370, 450 300 C 430 250, 430 200, 450 160 C 430 200, 410 260, 420 340 C 430 420, 440 480, 440 520 Z"
            fill="url(#flameInner)"
            opacity="0.8"
          />

          {/* Core White-Hot Holy Flame Heart */}
          <path
            d="M340 520 C 330 460, 360 400, 400 310 C 430 390, 470 460, 460 520 Z"
            fill="url(#flameInner)"
          />

          {/* Ascending Refiner's Embers & Sparks */}
          <circle cx="390" cy="180" r="5" fill="#FFF7ED" className="animate-ping" opacity="0.9" />
          <circle cx="420" cy="130" r="4" fill="#E3A857" className="animate-pulse" />
          <circle cx="360" cy="110" r="3.5" fill="#FFF7ED" />
          <circle cx="440" cy="80" r="4" fill="#E3A857" />
          <circle cx="380" cy="50" r="3" fill="#FFF7ED" className="animate-ping" />
          <circle cx="410" cy="30" r="2.5" fill="#E3A857" />

          {/* Holy Spirit Halo Radiance */}
          <ellipse cx="400" cy="320" rx="140" ry="170" stroke="#E3A857" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

/** 
 * Act 4: Footsteps on the Sand (Romans 10:15 & Matthew 28:19–20).
 * Trail of footprints on golden sand leading toward a radiant sunrise horizon with two silhouettes.
 */
function Act4FootstepsSand() {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#141E17] via-[#222E22] to-[#191F18]">
      {/* Sunrise Coastal Horizon Glow */}
      <div className="absolute top-0 inset-x-0 h-2/3 bg-[radial-gradient(ellipse_at_top,rgba(227,168,87,0.45)_0%,rgba(193,104,59,0.22)_40%,transparent_75%)] blur-2xl" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 900 650"
          className="w-full max-w-5xl h-auto drop-shadow-[0_0_35px_rgba(227,168,87,0.55)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="seaWater" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E3A2F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#13231C" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="sandShore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C49A58" />
              <stop offset="50%" stopColor="#9E783D" />
              <stop offset="100%" stopColor="#6E5024" />
            </linearGradient>
            <radialGradient id="sunDawn" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF7ED" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#E3A857" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C1683B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Horizon Line and Ocean Shore */}
          <rect x="0" y="240" width="900" height="410" fill="url(#sandShore)" />
          <path
            d="M0 240 Q 250 230, 500 245 T 900 238 L 900 320 Q 600 300, 300 340 T 0 320 Z"
            fill="url(#seaWater)"
          />

          {/* Radiant Sunrise over the Sea */}
          <circle cx="450" cy="235" r="55" fill="url(#sunDawn)" />
          <line x1="450" y1="120" x2="450" y2="235" stroke="#FFF7ED" strokeWidth="2" strokeDasharray="4 6" opacity="0.8" />
          <line x1="330" y1="160" x2="430" y2="230" stroke="#E3A857" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
          <line x1="570" y1="160" x2="470" y2="230" stroke="#E3A857" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />

          {/* Two Silhouettes walking side-by-side toward the nations on the horizon */}
          {/* Silhouette 1 (Left) */}
          <g transform="translate(425, 205)">
            <circle cx="8" cy="8" r="4.5" fill="#16221A" />
            <path d="M3 13 L13 13 L11 32 L5 32 Z" fill="#16221A" />
            <line x1="6" y1="32" x2="4" y2="42" stroke="#16221A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="10" y1="32" x2="12" y2="42" stroke="#16221A" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* Silhouette 2 (Right) */}
          <g transform="translate(455, 205)">
            <circle cx="8" cy="8" r="4.5" fill="#16221A" />
            <path d="M3 13 L13 13 L11 32 L5 32 Z" fill="#16221A" />
            <line x1="6" y1="32" x2="5" y2="42" stroke="#16221A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="10" y1="32" x2="13" y2="42" stroke="#16221A" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Trail of paired Footsteps receding toward the horizon */}
          {/* Footstep Pair 1 (Foreground, largest) */}
          <g transform="translate(410, 580) rotate(-12)">
            <ellipse cx="0" cy="0" rx="9" ry="18" fill="#423015" stroke="#E3A857" strokeWidth="1.5" />
            <circle cx="0" cy="-22" r="5" fill="#423015" />
          </g>
          <g transform="translate(450, 550) rotate(10)">
            <ellipse cx="0" cy="0" rx="9" ry="18" fill="#423015" stroke="#E3A857" strokeWidth="1.5" />
            <circle cx="0" cy="-22" r="5" fill="#423015" />
          </g>

          {/* Footstep Pair 2 */}
          <g transform="translate(420, 480) rotate(-10)">
            <ellipse cx="0" cy="0" rx="7" ry="14" fill="#523B1B" stroke="#E3A857" strokeWidth="1.2" />
            <circle cx="0" cy="-18" r="4" fill="#523B1B" />
          </g>
          <g transform="translate(455, 455) rotate(8)">
            <ellipse cx="0" cy="0" rx="7" ry="14" fill="#523B1B" stroke="#E3A857" strokeWidth="1.2" />
            <circle cx="0" cy="-18" r="4" fill="#523B1B" />
          </g>

          {/* Footstep Pair 3 */}
          <g transform="translate(428, 395) rotate(-8)">
            <ellipse cx="0" cy="0" rx="5" ry="11" fill="#6B4D24" stroke="#E3A857" strokeWidth="1" />
            <circle cx="0" cy="-14" r="3" fill="#6B4D24" />
          </g>
          <g transform="translate(455, 375) rotate(6)">
            <ellipse cx="0" cy="0" rx="5" ry="11" fill="#6B4D24" stroke="#E3A857" strokeWidth="1" />
            <circle cx="0" cy="-14" r="3" fill="#6B4D24" />
          </g>

          {/* Footstep Pair 4 (Near Horizon, smallest) */}
          <g transform="translate(434, 325) rotate(-6)">
            <ellipse cx="0" cy="0" rx="3.5" ry="8" fill="#825F2E" />
            <circle cx="0" cy="-10" r="2" fill="#825F2E" />
          </g>
          <g transform="translate(452, 310) rotate(5)">
            <ellipse cx="0" cy="0" rx="3.5" ry="8" fill="#825F2E" />
            <circle cx="0" cy="-10" r="2" fill="#825F2E" />
          </g>

          {/* Footstep Pair 5 (Close to silhouettes) */}
          <g transform="translate(438, 275) rotate(-4)">
            <ellipse cx="0" cy="0" rx="2.5" ry="5.5" fill="#9E783D" />
          </g>
          <g transform="translate(450, 265) rotate(4)">
            <ellipse cx="0" cy="0" rx="2.5" ry="5.5" fill="#9E783D" />
          </g>
        </svg>
      </div>
    </div>
  )
}
