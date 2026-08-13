import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import featuresVideo from '../assets/features.mp4'

const FEATURES = [
  {
    id: '01',
    title: '5.0L V8 Supercharged Power',
    subtitle: '760 HP Performance',
    description:
      'Engineered with a 2.65L Eaton supercharger, cross-plane crankshaft, and high-flow cylinder heads, producing an unmatched 760 naturally aspirated horsepower with instant throttle response.',
    tag: 'POWERHOUSE',
  },
  {
    id: '02',
    title: 'MagneRide Damping System',
    subtitle: 'Track-Tuned Suspension',
    description:
      'Monitors road conditions 1,000 times per second using magnetorheological fluid shock absorbers to instantly adjust damping force for ultimate high-speed stability and cornering.',
    tag: 'HANDLING',
  },
  {
    id: '03',
    title: 'Brembo Brake Package',
    subtitle: 'High-Thermal Performance',
    description:
      'Massive 16.5-inch two-piece cross-drilled front rotors paired with 6-piston aluminum Brembo calipers, delivering track-grade stopping power without fading under heat.',
    tag: 'STOPPING POWER',
  },
  {
    id: '04',
    title: 'Active Aerodynamics Wing',
    subtitle: 'Downforce Engineering',
    description:
      'Functional carbon fiber rear spoiler and front splitter generate over 550 lbs of downforce at 180+ MPH, grounding the Dark Horse GT500 through aggressive high-speed turns.',
    tag: 'AERODYNAMICS',
  },
]

export default function FeaturesSection({ scrollContainerId }) {
  const [activeIndex, setActiveIndex]     = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0) // 0..1 within section
  const [isScrolling, setIsScrolling]     = useState(false) // true while user is actively scrolling

  const outerRef       = useRef(null)
  const videoRef       = useRef(null)
  const scrollTimerRef = useRef(null) // debounce handle

  // ── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const scrollEl = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : window
    if (!scrollEl) return

    const handleScroll = () => {
      const outer = outerRef.current
      if (!outer) return

      const rect           = outer.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const totalScrollable = outer.offsetHeight - viewportHeight

      // Only act when section is pinned (sticky) in the viewport
      const pinned = rect.top <= 0 && rect.bottom >= viewportHeight
      if (!pinned) return

      if (totalScrollable <= 0) return

      const scrolled  = Math.max(0, -rect.top)
      const progress  = Math.min(1, scrolled / totalScrollable)
      setScrollProgress(progress)

      const newIndex = Math.min(
        FEATURES.length - 1,
        Math.floor(progress * FEATURES.length)
      )
      setActiveIndex(newIndex)

      // ── Active-scroll detection ──────────────────────────────────────────
      // Mark as scrolling immediately
      setIsScrolling(true)

      // Reset the debounce timer — pause video 300ms after last scroll event
      clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    }

    scrollEl.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      scrollEl.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimerRef.current)
    }
  }, [scrollContainerId])

  // ── Play video ONLY while user is actively scrolling ─────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isScrolling) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isScrolling])

  const current = FEATURES[activeIndex]

  // Progress bar width for the current step (0..1 within that feature's slot)
  const stepSize = 1 / FEATURES.length
  const stepProgress = Math.min(
    1,
    (scrollProgress - activeIndex * stepSize) / stepSize
  )

  return (
    /*
     * Outer wrapper — tall enough for one full scroll-stop per feature.
     * height = FEATURES.length × 100vh so sticky content stays pinned
     * for exactly that much scroll distance.
     */
    <section
      ref={outerRef}
      className="relative"
      style={{ height: `${FEATURES.length * 100}vh` }}
    >
      {/* ── Sticky inner viewport ─────────────────────────────────────────── */}
      <div className="sticky top-0 w-full h-screen text-white overflow-hidden flex flex-col justify-between py-10 px-12 md:px-20 select-none">

        {/* ══ Full-Bleed Background Video ══════════════════════════════════ */}
        <video
          ref={videoRef}
          src={featuresVideo}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        {/* ══ Cinematic Overlay Gradients ═══════════════════════════════════ */}
        {/* Left-heavy dark gradient → text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, rgba(7,6,10,0.97) 0%, rgba(7,6,10,0.85) 38%, rgba(7,6,10,0.50) 68%, rgba(7,6,10,0.25) 100%)',
            zIndex: 1,
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(7,6,10,0.85) 0%, transparent 28%)',
            zIndex: 1,
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,6,10,0.75) 0%, transparent 22%)',
            zIndex: 1,
          }}
        />

        {/* ══ Scanline Texture ══════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
            zIndex: 2,
          }}
        />

        {/* ══ Ambient Red Glow ══════════════════════════════════════════════ */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-10 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)', zIndex: 2 }}
        />

        {/* ══ Header ════════════════════════════════════════════════════════ */}
        <div className="absolute flex items-center top-10 left-25 right-10 justify-between px-6" style={{ zIndex: 10 }}>
          <h2
            className="text-5xl md:text-6xl font-bold tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', 'Inter', sans-serif" }}
          >
            Features
          </h2>
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-zinc-400 font-semibold">
            <span className="w-8 h-px bg-red-600" />
            <span>GT500 Engineering</span>
          </div>
        </div>

        {/* ══ Main Content ══════════════════════════════════════════════════ */}
        <div
          className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 px-2 lg:px-4"
          style={{ zIndex: 10 }}
        >
          {/* ── Feature Description (left) ─────────────────────────────── */}
          <div className="lg:col-start-2 lg:col-span-5 space-y-8 pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="space-y-5"
              >
                {/* Feature number */}
                <span
                  className="text-[11px] font-bold tracking-[0.35em] uppercase text-red-500"
                >
                  {current.id} / {String(FEATURES.length).padStart(2, '0')}
                </span>

                {/* Feature Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                  {current.title}
                </h3>

                {/* Tag */}
                <div className="inline-block px-3 py-1 bg-red-600/20 border border-red-600/40 rounded text-[10px] font-bold tracking-[0.25em] text-red-400 uppercase backdrop-blur-sm">
                  {current.tag}
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-md drop-shadow">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* ── Scroll-progress tabs ──────────────────────────────────── */}
            <div className="flex items-center gap-3 pt-2">
              {FEATURES.map((feat, idx) => (
                <div key={feat.id} className="flex-1 relative">
                  {/* Track */}
                  <div className="w-full h-[3px] bg-zinc-800/80 rounded-full overflow-hidden">
                    {/* Fill */}
                    <div
                      className="h-full bg-red-600 rounded-full transition-none"
                      style={{
                        width:
                          idx < activeIndex
                            ? '100%'
                            : idx === activeIndex
                            ? `${stepProgress * 100}%`
                            : '0%',
                        boxShadow:
                          idx === activeIndex
                            ? '0 0 10px rgba(220,38,38,0.8)'
                            : 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ── SEE MORE button (shown on last feature) ───────────────── */}
            <AnimatePresence>
              {activeIndex === FEATURES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    className="group relative px-8 py-3.5 bg-zinc-950/40 backdrop-blur-sm border border-zinc-600/60 hover:border-red-600 text-xs font-bold tracking-[0.25em] uppercase text-zinc-300 hover:text-white transition-all duration-300"
                    style={{
                      clipPath:
                        'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      SEE MORE
                      <svg
                        className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Vertical Feature Counter ──────────────────────────── */}
          <div className="lg:col-start-12 flex flex-col items-center gap-4">
            {FEATURES.map((feat, idx) => (
              <div
                key={feat.id}
                className="flex items-center gap-2"
              >
                <span
                  className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${
                    idx === activeIndex ? 'text-red-500' : 'text-zinc-600'
                  }`}
                >
                  {feat.id}
                </span>
                <div
                  className={`h-px transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-6 bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.8)]'
                      : idx < activeIndex
                      ? 'w-3 bg-zinc-500'
                      : 'w-2 bg-zinc-700'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══ Footer Bar ════════════════════════════════════════════════════ */}
        <div
          className="relative flex items-center justify-between border-t border-zinc-700/50 pt-6 text-[10px] tracking-[0.25em] uppercase text-zinc-500"
          style={{ zIndex: 10 }}
        >
          <div>FORD MUSTANG DARK HORSE EDITION</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">SPECIFICATIONS</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">PERFORMANCE</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">GALLERY</a>
          </div>
        </div>
      </div>
    </section>
  )
}
