import { useRef, useCallback } from "react"

export function useTilt(intensity = 7) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - .5
    const y = (e.clientY - rect.top) / rect.height - .5
    el.style.transform = `translateY(-5px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`
    el.style.transition = "transform .05s"
  }, [intensity])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = ""
    el.style.transition = "transform .4s cubic-bezier(.34,1.56,.64,1)"
  }, [])

  return { ref, onMove, onLeave }
}
