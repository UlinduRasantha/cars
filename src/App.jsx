import { useRef, useEffect, useState } from 'react'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'

// How many scroll-heights the Features section occupies
const FEATURES_COUNT = 4

function App() {
  const mainRef = useRef(null)
  const isAnimating = useRef(false)
  const [flash, setFlash] = useState(false) // cinematic dark-flash overlay

  // ── Smooth-scroll helper with dark-flash overlay ─────────────────────────
  const snapTo = (targetTop) => {
    const el = mainRef.current
    if (!el || isAnimating.current) return
    isAnimating.current = true

    // 1. Flash the overlay on
    setFlash(true)

    // 2. After overlay peaks, jump scroll position (instant, hidden by overlay)
    setTimeout(() => {
      el.scrollTo({ top: targetTop, behavior: 'instant' })
    }, 180)

    // 3. Fade overlay out
    setTimeout(() => {
      setFlash(false)
    }, 320)

    // 4. Release lock after transition fully settles
    setTimeout(() => {
      isAnimating.current = false
    }, 700)
  }

  // ── Wheel interceptor ─────────────────────────────────────────────────────
  useEffect(() => {
    const el = mainRef.current
    if (!el) return

    const handleWheel = (e) => {
      // Always block wheel while animating
      if (isAnimating.current) {
        e.preventDefault()
        return
      }

      const scrollTop = el.scrollTop
      const vh = window.innerHeight
      const featuresStart = vh                          // Hero is 100vh
      const featuresEnd = vh + FEATURES_COUNT * vh      // Features section ends here

      const scrollingDown = e.deltaY > 0
      const scrollingUp   = e.deltaY < 0

      // ── Anywhere in Hero → snap INTO Features on scroll-down ──────────────
      if (scrollTop < featuresStart && scrollingDown) {
        e.preventDefault()
        snapTo(featuresStart)
        return
      }

      // ── At the very top of Features → snap BACK to Hero on scroll-up ──────
      if (scrollTop <= featuresStart + 2 && scrollingUp) {
        e.preventDefault()
        snapTo(0)
        return
      }

      // ── Past end of Features → snap OUT (future sections) if needed ────────
      // (nothing after Features yet — extend here when more sections added)
      if (scrollTop >= featuresEnd - 2 && scrollingDown) {
        e.preventDefault()
        // placeholder: snapTo(featuresEnd) when a next section exists
        return
      }

      // ── Inside Features: let scroll flow naturally ─────────────────────────
      // No interception — features progress bar / video driven by scroll
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <>
      {/* ── Page-shift overlay ─────────────────────────────────────────────
          A full-viewport dark veil that flashes on/off during section transitions.
          CSS transition handles the fade; toggling `flash` triggers it.
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#07060a',
          pointerEvents: 'none',
          opacity: flash ? 1 : 0,
          transition: flash
            ? 'opacity 0.18s ease-in'   // snap-on: fast
            : 'opacity 0.38s ease-out', // snap-off: slow luxurious fade
        }}
      />

      <main
        ref={mainRef}
        id="scroll-root"
        className="w-full bg-[#07060a] overflow-x-hidden"
        style={{ height: '100vh', overflowY: 'scroll' }}
      >
        {/* Hero — exactly one viewport tall */}
        <div style={{ height: '100vh', flexShrink: 0 }}>
          <HeroSection />
        </div>

        {/* Features — 4 × 100vh scroll travel; sticky internally */}
        <FeaturesSection scrollContainerId="scroll-root" />
      </main>
    </>
  )
}

export default App
