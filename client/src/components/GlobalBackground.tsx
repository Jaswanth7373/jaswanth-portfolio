import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const LIME = "#c8ff00"
const ACCENT_GREEN = "#76b900"
const BRIGHT_LIME = "#e4ff66"

function useScrollFraction() {
  const ref = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      ref.current = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return ref
}

function useMouse() {
  const ref = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      ref.current.targetY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])
  return ref
}

/* ── 3D Cosmic Particle Dust System ── */
function CosmicParticles({ count = 450 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sca = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 3
      sca[i] = 0.5 + Math.random() * 1.5
    }
    return [pos, sca]
  }, [count])

  useFrame((state, dt) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.02
    meshRef.current.rotation.x = Math.sin(t * 0.03) * 0.04

    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const array = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      // Gentle vertical float wave
      array[i * 3 + 1] += Math.sin(t + i) * 0.0015
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color={LIME}
        transparent
        opacity={0.38}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ── High-Tech Monolith with Dual Orbital Rings & Energetic Core ── */
function CyberMonolith() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const orbRing1 = useRef<THREE.Mesh>(null)
  const orbRing2 = useRef<THREE.Mesh>(null)
  const coreOrb = useRef<THREE.Mesh>(null)

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime

    if (outerRef.current) {
      outerRef.current.rotation.y += dt * 0.08
      outerRef.current.rotation.x = Math.sin(t * 0.15) * 0.2
      const scalePulse = 1 + Math.sin(t * 0.4) * 0.04
      outerRef.current.scale.setScalar(scalePulse)
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= dt * 0.12
      innerRef.current.rotation.z += dt * 0.05
    }

    if (orbRing1.current) {
      orbRing1.current.rotation.x = t * 0.3
      orbRing1.current.rotation.y = t * 0.15
    }

    if (orbRing2.current) {
      orbRing2.current.rotation.z = -t * 0.25
      orbRing2.current.rotation.x = t * 0.2
    }

    if (coreOrb.current) {
      const corePulse = 0.85 + Math.sin(t * 1.5) * 0.15
      coreOrb.current.scale.setScalar(corePulse)
    }
  })

  return (
    <group position={[1.8, 0.3, -2.2]}>
      {/* Outer breathing polyhedral shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial color={LIME} wireframe transparent opacity={0.28} />
      </mesh>

      {/* Inner dense crystal core */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color={LIME}
          emissive={ACCENT_GREEN}
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Center glowing energy sphere */}
      <mesh ref={coreOrb}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial
          color={BRIGHT_LIME}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={orbRing1}>
        <torusGeometry args={[3.2, 0.012, 16, 64]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.35} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={orbRing2}>
        <torusGeometry args={[2.7, 0.01, 16, 64]} />
        <meshBasicMaterial color="#aaff00" transparent opacity={0.25} />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={28} color={BRIGHT_LIME} distance={14} />
    </group>
  )
}

/* ── Floating Low-Poly Geometric Shards ── */
type ShardDef = {
  pos: [number, number, number]
  scale: number
  speed: number
  axis: THREE.Vector3
  kind: 0 | 1 | 2
}

function FloatingShards({ count = 28 }: { count?: number }) {
  const defs = useMemo<ShardDef[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const depth = -2 - Math.random() * 16
      return {
        pos: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 11,
          depth,
        ] as [number, number, number],
        scale: 0.16 + Math.random() * 0.48,
        speed: 0.08 + Math.random() * 0.25,
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        kind: (i % 3) as 0 | 1 | 2,
      }
    })
  }, [count])

  return (
    <>
      {defs.map((d, i) => (
        <SingleShard key={i} def={d} />
      ))}
    </>
  )
}

function SingleShard({ def }: { def: ShardDef }) {
  const ref = useRef<THREE.Mesh>(null)
  const start = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime
    m.rotateOnAxis(def.axis, 0.002 + def.speed * 0.003)
    m.position.y = def.pos[1] + Math.sin(t * 0.25 * def.speed + start) * 0.45
    m.position.x = def.pos[0] + Math.cos(t * 0.18 * def.speed + start) * 0.35
  })

  const depthFade = THREE.MathUtils.clamp(1 - Math.abs(def.pos[2]) / 20, 0.12, 0.6)

  return (
    <mesh ref={ref} position={def.pos} scale={def.scale}>
      {def.kind === 0 && <octahedronGeometry args={[1, 0]} />}
      {def.kind === 1 && <tetrahedronGeometry args={[1, 0]} />}
      {def.kind === 2 && <icosahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color={LIME} wireframe transparent opacity={depthFade} />
    </mesh>
  )
}

/* ── Perspective Horizon Cyber-Grid ── */
function HorizonGrid() {
  const ref = useRef<THREE.GridHelper>(null)
  const scroll = useScrollFraction()

  useFrame((_, dt) => {
    if (ref.current) {
      // Speed increases with scroll
      ref.current.position.z += dt * (0.3 + scroll.current * 0.6)
      if (ref.current.position.z > 8) ref.current.position.z = -60
    }
  })

  return (
    <gridHelper
      ref={ref as any}
      args={[100, 48, LIME, LIME]}
      position={[0, -5.8, -10]}
      material-transparent
      material-opacity={0.12}
    />
  )
}

/* ── Master Camera & Rig Choreography ── */
function CameraRig() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScrollFraction()
  const mouse = useMouse()

  useFrame((state) => {
    const s = scroll.current
    const m = mouse.current

    // Smooth mouse lerp
    m.x += (m.targetX - m.x) * 0.05
    m.y += (m.targetY - m.y) * 0.05

    // Camera dolly along z-axis, elevation along y-axis based on scroll position
    const targetCamZ = 6.2 + s * 6.5
    const targetCamY = s * 1.8
    const targetCamX = Math.sin(s * Math.PI) * 1.2

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.05)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.05)
    state.camera.lookAt(0, 0, -4)

    if (group.current) {
      // Rotation driven by scroll depth + mouse parallax
      const targetRotY = s * Math.PI * 0.45 + m.x * 0.14
      const targetRotX = m.y * 0.08

      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.04)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.04)
    }
  })

  return (
    <group ref={group}>
      <CyberMonolith />
      <CosmicParticles />
      <FloatingShards />
      <HorizonGrid />
    </group>
  )
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#020202", 3, 24]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color={LIME} />
      <CameraRig />
    </>
  )
}

export function GlobalBackground() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 30)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      {/* Dynamic ambient color wash background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 65% 20%, rgba(200,255,0,.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 70% 50% at 20% 85%, rgba(118,185,0,.07) 0%, transparent 65%)",
        }}
      />

      {ready && (
        <Canvas
          dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.2 : 1.7]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 6.2], fov: 48 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )}

      {/* Edge vignette filter */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 95% at 50% 50%, transparent 45%, rgba(0,0,0,.22) 75%, rgba(0,0,0,.52) 100%)",
        }}
      />
    </div>
  )
}

