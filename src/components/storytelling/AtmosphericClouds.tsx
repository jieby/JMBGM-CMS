'use client'

import React, { useState } from 'react'

interface AtmosphericCloudsProps {
  intensity?: number // 0 to 1
  transitionFlash?: boolean
}

/**
 * Atmospheric transition layer rendering celestial Shekinah mist,
 * rolling clouds, and video/mist parting atmosphere.
 * Uses screen-blend and hardware-accelerated SVG mist gradients.
 */
export function AtmosphericClouds({
  intensity = 0.5,
  transitionFlash = false,
}: AtmosphericCloudsProps) {
  const [videoError, setVideoError] = useState(false)

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-screen transition-opacity duration-700"
      style={{ opacity: Math.max(0.2, Math.min(intensity, 1)) }}
    >
      {/* Optional Google Flow cloud transition video overlay */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/videos/clouds_transition.mp4"
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-35"
          onError={() => setVideoError(true)}
        />
      )}

      {/* Shekinah mist volumetric sweep */}
      <div
        className={`absolute -inset-x-20 -top-40 h-[140%] w-[120%] bg-[radial-gradient(ellipse_at_center,rgba(251,246,238,0.22)_0%,rgba(227,168,87,0.12)_35%,rgba(138,154,91,0.06)_60%,transparent_75%)] blur-3xl ${
          transitionFlash ? 'animate-pulse' : ''
        }`}
      />

      {/* Cloud bank 1 (Top-to-Bottom drifting mist) */}
      <svg
        className="absolute -top-20 inset-x-0 w-full h-[60vh] opacity-30 blur-2xl transform -scale-y-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0 100 Q 300 240, 600 120 T 1200 180 L 1200 0 L 0 0 Z"
          fill="#FBF6EE"
        />
      </svg>

      {/* Cloud bank 2 (Bottom rolling mist) */}
      <svg
        className="absolute -bottom-20 inset-x-0 w-full h-[55vh] opacity-35 blur-2xl"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 Q 350 80, 700 220 T 1200 140 L 1200 400 L 0 400 Z"
          fill="#EFE8DC"
        />
      </svg>

      {/* Golden divine light specks */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(227,168,87,0.15)_0%,transparent_50%)]" />
    </div>
  )
}
