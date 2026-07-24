import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import modelUrl from '../assets/Red Striped Mustang.glb?url'

// Car faces the camera at rest
const BASE_Y = Math.PI

// ─── Car Model (rendered inside R3F Canvas) ─────────────────────────────────────
function Car({ mouseRef, dragState, startDrag }) {
  const { scene } = useGLTF(modelUrl)
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const { isDragging, manualRotY, velocityY } = dragState
    let targetY, targetX

    if (isDragging.current) {
      targetY = manualRotY.current
      targetX = 0
    } else {
      // Apply rotational inertia from drag release
      if (Math.abs(velocityY.current) > 0.0002) {
        velocityY.current *= 0.86 // smooth decay
        manualRotY.current += velocityY.current * delta * 60
      }
      // Passive mouse hover — subtle tracking on top of last position
      targetY = manualRotY.current + mouseRef.current.x * 0.08
      targetX = -mouseRef.current.y * 0.04
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      isDragging.current ? 0.12 : 0.035
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.045
    )
  })

  return (
    <group
      ref={groupRef}
      position={[0, -0.2, 0]}
      rotation={[0, BASE_Y, 0]}
      onPointerDown={(e) => {
        e.stopPropagation()
        startDrag(e)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        if (!dragState.isDragging.current) {
          document.body.style.cursor = 'grab'
        }
      }}
      onPointerOut={() => {
        if (!dragState.isDragging.current) {
          document.body.style.cursor = 'default'
        }
      }}
    >
      <primitive object={scene} scale={4.2} />
    </group>
  )
}

// ─── Main exported CarScene ──────────────────────────────────────────────────────
export default function CarScene({ mouseRef }) {
  // ── Drag state refs ──
  const isDragging = useRef(false)
  const manualRotY = useRef(BASE_Y) // accumulated Y from drags
  const velocityY = useRef(0) // inertia velocity
  const dragStartX = useRef(0)
  const rotAtStart = useRef(BASE_Y)
  const lastX = useRef(0)
  const lastTime = useRef(0)

  const dragState = { isDragging, manualRotY, velocityY }

  const startDrag = (e) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    lastX.current = e.clientX
    lastTime.current = Date.now()
    rotAtStart.current = manualRotY.current
    velocityY.current = 0
    document.body.style.cursor = 'grabbing'
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return

      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 1)
      const totalDx = e.clientX - dragStartX.current
      const frameDx = e.clientX - lastX.current

      manualRotY.current = rotAtStart.current + totalDx * 0.0038
      velocityY.current = frameDx * 0.0038 * (16 / dt)

      lastX.current = e.clientX
      lastTime.current = now
    }

    const onUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        document.body.style.cursor = 'grab'
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div
      className="absolute inset-0"
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0.6, 4.5], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        shadows
      >
        <fog attach="fog" args={['#050505', 14, 32]} />

        {/* ── Lighting ── */}
        <ambientLight intensity={0.18} color="#ffffff" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={3}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-6, 4, -5]} intensity={1.8} color="#ff1a1a" />
        <spotLight
          position={[1, 16, 6]}
          intensity={6}
          angle={0.22}
          penumbra={0.85}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[0, 4, -8]} intensity={1.4} color="#2233ff" />
        <pointLight position={[-2, 1, 5]} intensity={0.6} color="#ff5533" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Car
            mouseRef={mouseRef}
            dragState={dragState}
            startDrag={startDrag}
          />
          <ContactShadows
            position={[0, -0.2, 0]}
            opacity={0.9}
            scale={22}
            blur={2.5}
            far={8}
            color="#110000"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload(modelUrl)
