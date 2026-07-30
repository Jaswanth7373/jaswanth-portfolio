import { useEffect, useRef } from "react"

export function CustomCursor() {
  const posRef = useRef({ x: -300, y: -300 })
  const dotCurRef = useRef({ x: -300, y: -300 })
  const glowCurRef = useRef({ x: -300, y: -300 })
  const targetScaleRef = useRef({ dot: 1, glow: 1 })
  const curScaleRef = useRef({ dot: 1, glow: 1 })
  const rafRef = useRef(0)

  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const labelTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    let currentLabel = ""

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const interactive = el?.closest("a, button, [data-cursor], input, textarea")
      const newLabel = (interactive as HTMLElement | null)?.getAttribute("data-cursor") ?? ""

      if (newLabel !== currentLabel) {
        currentLabel = newLabel
        if (labelTextRef.current) labelTextRef.current.textContent = currentLabel
        if (labelRef.current) labelRef.current.style.opacity = currentLabel ? "1" : "0"
      }

      if (interactive) {
        targetScaleRef.current.dot = 2.2
        targetScaleRef.current.glow = 2.8
      } else {
        targetScaleRef.current.dot = 1
        targetScaleRef.current.glow = 1
      }
    }

    const tick = () => {
      // Fast, ultra-responsive LERP for dot (instant tracking on trackpads/mice)
      const dotLerp = 0.38
      // Smooth floating trailing LERP for glow ring
      const glowLerp = 0.22
      // Scale LERP
      const scaleLerp = 0.2

      dotCurRef.current.x += (posRef.current.x - dotCurRef.current.x) * dotLerp
      dotCurRef.current.y += (posRef.current.y - dotCurRef.current.y) * dotLerp

      glowCurRef.current.x += (posRef.current.x - glowCurRef.current.x) * glowLerp
      glowCurRef.current.y += (posRef.current.y - glowCurRef.current.y) * glowLerp

      curScaleRef.current.dot += (targetScaleRef.current.dot - curScaleRef.current.dot) * scaleLerp
      curScaleRef.current.glow += (targetScaleRef.current.glow - curScaleRef.current.glow) * scaleLerp

      const dx = dotCurRef.current.x
      const dy = dotCurRef.current.y
      const gx = glowCurRef.current.x
      const gy = glowCurRef.current.y

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${curScaleRef.current.dot.toFixed(3)})`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${curScaleRef.current.glow.toFixed(3)})`
        glowRef.current.style.opacity = (0.35 + (curScaleRef.current.glow - 1) * 0.25).toString()
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${dx + 16}px, ${dy - 24}px, 0)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Outer soft glow ring - pure JS RAF positioning, no CSS transition fighting */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.4) 0%, rgba(200,255,0,0.1) 60%, transparent 80%)",
          transform: "translate3d(-300px, -300px, 0) translate(-50%, -50%)",
          zIndex: 999997,
          pointerEvents: "none",
          willChange: "transform",
          opacity: 0.35,
        }}
      />

      {/* Solid lime circle dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#c8ff00",
          boxShadow: "0 0 10px 2px rgba(200,255,0,0.9), 0 0 24px 6px rgba(200,255,0,0.4)",
          transform: "translate3d(-300px, -300px, 0) translate(-50%, -50%)",
          zIndex: 999999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Label on data-cursor elements */}
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0,
          transition: "opacity 0.15s ease",
          zIndex: 999999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <span
          ref={labelTextRef}
          style={{
            display: "block",
            fontFamily: "'Instrument Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            background: "#c8ff00",
            color: "#000",
            padding: "3px 7px",
            borderRadius: "2px",
            whiteSpace: "nowrap",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(200,255,0,0.3)",
          }}
        />
      </div>
    </>
  )
}

