import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import CarScene from './CarScene'
import bgImage from '../assets/background.png'
import heroVideo from '../assets/hero_section.mp4'

const TITLE = 'MUSTANG'

export default function HeroSection() {
  const containerRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const spotRef = useRef()
  const [showCar, setShowCar] = useState(false)

  /* ── Load 3D Car after 1 second ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCar(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  /* ── Passive mouse spotlight ── */
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(900px circle at ${e.clientX}px ${e.clientY}px, rgba(200,25,25,0.06) 0%, transparent 70%)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1 — Title letters entrance
      gsap.fromTo(
        '.tl',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.04,
          delay: 0.1,
        }
      )

      // 2 — Nav items entrance
      gsap.fromTo(
        '.nav-item',
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
          delay: 0.6,
        }
      )

      // 3 — Bottom elements entrance
      gsap.fromTo(
        '.btm-item',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.9,
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: '#07060a' }}
    >
      {/* ══ LAYER 1 — Background Video (plays once on load) & Fallback Image ════════ */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-[1] opacity-65"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <video
          autoPlay
          muted
          playsInline
          loop={false}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* ══ LAYER 2 — Dark Atmosphere & Readability Overlay ═════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, rgba(10,8,15,0.3) 0%, rgba(6,5,10,0.65) 60%, rgba(4,3,8,0.88) 100%)',
        }}
      />

      {/* ══ LAYER 3 — Top & Bottom Dark Gradients for Crisp Nav & Text ════ */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-[3]"
        style={{ background: 'linear-gradient(to bottom, rgba(4,3,8,0.85) 0%, transparent 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-[3]"
        style={{ background: 'linear-gradient(to top, rgba(4,3,8,0.9) 0%, transparent 100%)' }}
      />

      {/* Mouse spotlight overlay */}
      <div ref={spotRef} className="absolute inset-0 pointer-events-none z-[4]" />

      {/* ══════════════════════════════════════════════════════════════════════
          GIANT TITLE — "MUSTANG" (z:5, behind 3D model)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-28 pointer-events-none z-[5] overflow-hidden">
        <h1
          className="leading-none text-center whitespace-nowrap tracking-[0.06em]"
          style={{
            fontFamily: "'Bebas Neue', 'Inter', sans-serif",
            fontSize: 'clamp(120px, 20vw, 360px)',
            lineHeight: 0.85,
            color: '#e4dec8', // Warm off-white / beige matching reference "TRANSCEND"
            textShadow: '0 0 60px rgba(180, 30, 30, 0.15)',
          }}
        >
          {TITLE.split('').map((char, i) => (
            <span key={i} className="tl inline-block">
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3-D CAR CANVAS — (z:10, in front of title text, loads after 1s)
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 z-[10] transition-opacity duration-800 ${
          showCar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {showCar && <CarScene mouseRef={mouseRef} />}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TOP NAVIGATION BAR (z:40) - Matches reference 1:1
      ══════════════════════════════════════════════════════════════════════ */}
      <nav className="absolute top-10 left-10 right-10 z-[40] flex items-center justify-between px-12 py-8">
        {/* Left Side: Logo Icon + Links */}
        <div className="flex items-center gap-12">
          {/* Logo icon (Square frame with inner mark) */}
          <div className="nav-item w-6 h-6 border-2 border-white/80 flex items-center justify-center cursor-pointer hover:border-white transition-colors">
            <div className="w-1.5 h-1.5 bg-white" />
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="nav-item text-zinc-300 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              CREATOR
            </a>
            <a
              href="#"
              className="nav-item text-zinc-300 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              COLLECTION
            </a>
            <a
              href="#"
              className="nav-item text-zinc-300 hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              ABOUT
            </a>
          </div>
        </div>

        {/* Right Side: Icons + EXPLORE */}
        <div className="flex items-center gap-7">
          {/* Heart Icon */}
          <button className="nav-item text-zinc-300 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          {/* Search Icon */}
          <button className="nav-item text-zinc-300 hover:text-white transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z"
              />
            </svg>
          </button>

          {/* Bold EXPLORE CTA */}
          <button className="nav-item text-white font-extrabold text-sm tracking-[0.25em] uppercase hover:text-red-400 transition-colors ml-2">
            EXPLORE
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM CONTENT (z:40) - Matches reference 1:1
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-10 left-10 right-10 z-[40] flex items-end justify-between px-12 pb-10">
        {/* Bottom Left Content */}
        <div className="btm-item max-w-sm space-y-3">
          <h3 className="text-zinc-200 text-sm font-medium tracking-wide">
            Guided by the Glow
          </h3>
          <p className="text-zinc-400 text-xs font-normal leading-relaxed">
            In the haze of luminous
            <br />
            brilliance, existence is
            <br />
            reborn, carried by the light
            <br />
            of endless creation
          </p>
        </div>

        {/* Bottom Right Credit Handle */}
        <div className="btm-item">
          <span className="text-zinc-400 hover:text-zinc-200 text-xs font-medium tracking-wide transition-colors cursor-pointer">
            @svg.graphixx
          </span>
        </div>
      </div>
    </div>
  )
}


