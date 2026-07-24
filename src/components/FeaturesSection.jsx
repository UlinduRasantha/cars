import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import feature1 from '../assets/feature_1.png'
import feature2 from '../assets/feature_2.png'
import feature3 from '../assets/feature_3.png'
import feature4 from '../assets/feature_4.png'

const FEATURES = [
  {
    id: '01',
    title: '5.0L V8 Supercharged Power',
    subtitle: '760 HP Performance',
    description:
      'Engineered with a 2.65L Eaton supercharger, cross-plane crankshaft, and high-flow cylinder heads, producing an unmatched 760 naturally aspirated horsepower with instant throttle response.',
    image: feature2,
    tag: 'POWERHOUSE',
  },
  {
    id: '02',
    title: 'MagneRide Damping System',
    subtitle: 'Track-Tuned Suspension',
    description:
      'Monitors road conditions 1,000 times per second using magnetorheological fluid shock absorbers to instantly adjust damping force for ultimate high-speed stability and cornering.',
    image: feature1,
    tag: 'HANDLING',
  },
  {
    id: '03',
    title: 'Brembo Brake Package',
    subtitle: 'High-Thermal Performance',
    description:
      'Massive 16.5-inch two-piece cross-drilled front rotors paired with 6-piston aluminum Brembo calipers, delivering track-grade stopping power without fading under heat.',
    image: feature3,
    tag: 'STOPPING POWER',
  },
  {
    id: '04',
    title: 'Active Aerodynamics Wing',
    subtitle: 'Downforce Engineering',
    description:
      'Functional carbon fiber rear spoiler and front splitter generate over 550 lbs of downforce at 180+ MPH, grounding the Dark Horse GT500 through aggressive high-speed turns.',
    image: feature4,
    tag: 'AERODYNAMICS',
  },
]

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-play feature slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = FEATURES[activeIndex]

  return (
    <section className="relative w-full min-h-screen bg-[#07060a] text-white overflow-hidden py-24 px-12 md:px-20 select-none flex flex-col justify-between">
      {/* ══ Background Dot Grid Texture ════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ══ Ambient Red Background Glow ════════════════════════════════════ */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)' }}
      />

      {/* ══ Header ═════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex items-center justify-between">
        <h2
          className="text-5xl md:text-6xl font-bold tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', 'Inter', sans-serif" }}
        >
          Features
        </h2>
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-zinc-500 font-semibold">
          <span className="w-8 h-px bg-red-600" />
          <span>GT500 Engineering</span>
        </div>
      </div>

      {/* ══ Main Content Grid ══════════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-10">
        
        {/* ── Left Side: Feature Description ───────────────────────────── */}
        <div className="lg:col-span-5 space-y-8 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Feature Subtitle */}
              <h3 className="text-2xl md:text-3xl font-semibold text-zinc-100 tracking-wide">
                {current.title}
              </h3>

              {/* Tag / Category */}
              <div className="inline-block px-3 py-1 bg-red-600/15 border border-red-600/30 rounded text-[10px] font-bold tracking-[0.25em] text-red-500 uppercase">
                {current.tag}
              </div>

              {/* Description Paragraph */}
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal pt-2 max-w-md">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ── Feature Progress Tabs ─────────────────────────────────── */}
          <div className="flex items-center gap-3 pt-4">
            {FEATURES.map((feat, idx) => (
              <button
                key={feat.id}
                onClick={() => setActiveIndex(idx)}
                className="group flex-1 py-2 focus:outline-none"
              >
                <div className="relative w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden transition-colors group-hover:bg-zinc-700">
                  {idx === activeIndex && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute inset-0 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]"
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* ── SEE MORE Hexagon / Angled Button ─────────────────────── */}
          <div className="pt-2">
            <button
              className="group relative px-8 py-3.5 bg-transparent border border-zinc-700 hover:border-red-600 text-xs font-bold tracking-[0.25em] uppercase text-zinc-300 hover:text-white transition-all duration-300"
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
          </div>
        </div>

        {/* ── Right Side: Angled Slash Panels + Car Image ────────────── */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px]">
          
          {/* Angled Parallelogram Background Slashes (Matching reference design) */}
          <div className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none opacity-40">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-24 md:w-32 h-[340px] md:h-[420px] bg-gradient-to-b from-zinc-700/30 via-zinc-800/10 to-transparent border-t border-zinc-600/30"
                style={{
                  transform: 'skewX(-22deg)',
                  boxShadow: i === 1 ? '0 0 30px rgba(220,38,38,0.15)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Active Image Showcase with Smooth Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-lg flex items-center justify-center p-2 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-[340px] md:h-[380px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07060a]/80 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* ── Right Vertical Counter & Slider Index ──────────────────── */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
            {FEATURES.map((feat, idx) => (
              <button
                key={feat.id}
                onClick={() => setActiveIndex(idx)}
                className="group flex items-center gap-2 focus:outline-none"
              >
                <span
                  className={`text-[10px] font-bold tracking-widest transition-colors ${
                    idx === activeIndex ? 'text-red-500' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}
                >
                  {feat.id}
                </span>
                <div
                  className={`h-px transition-all ${
                    idx === activeIndex ? 'w-6 bg-red-600' : 'w-2 bg-zinc-700 group-hover:w-4'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Footer Bar ═════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex items-center justify-between border-t border-zinc-800/60 pt-6 text-[10px] tracking-[0.25em] uppercase text-zinc-500">
        <div>FORD MUSTANG DARK HORSE EDITION</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">SPECIFICATIONS</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">PERFORMANCE</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">GALLERY</a>
        </div>
      </div>
    </section>
  )
}
