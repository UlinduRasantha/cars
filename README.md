# Ford Mustang GT500 — Cinematic Showcase

A cinematic, scroll-driven **3D car showcase website** for the **Ford Mustang GT500 Dark Horse Edition**. The site features an interactive 3D model of the Mustang that users can drag and rotate, a scroll-snapping navigation between a full-screen hero and a sticky features panel, ambient video backgrounds, and GSAP-powered entrance animations — delivering an immersive, premium automotive experience.

## Features

- 🚗 **Interactive 3D car model** — drag to rotate with momentum/inertia, passive mouse-hover tracking
- 🎬 **Cinematic scroll system** — dark-flash overlay snap between Hero and Features sections
- 🎥 **Scroll-driven video** — features background video plays only while actively scrolling
- ✨ **GSAP entrance animations** — staggered letter-by-letter title reveal, nav and bottom content fade-ins
- 🖱️ **Mouse spotlight** — red radial glow that follows the cursor across the hero
- 📊 **Scroll progress bar** — per-feature fill bar driven by real scroll position

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Three.js** | 3D rendering engine |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Three.js helpers — GLB loader, environment maps, contact shadows |
| **GSAP** | Entrance & scroll animations |
| **Framer Motion** | Feature content transitions (AnimatePresence) |
| **Tailwind CSS v4** | Utility-first styling |
| **OXLint** | Fast JavaScript linter |
| **Bebas Neue + Inter** | Display & body typography (Google Fonts) |

## Getting Started

```bash
npm install
npm run dev
```