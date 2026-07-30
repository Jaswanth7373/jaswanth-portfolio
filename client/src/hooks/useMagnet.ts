import { useRef, useCallback } from "react"

export function useMagnet(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.transition = "transform 0.1s ease"
  }, [strength])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0,0)"
    el.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)"
  }, [])

  return { ref, onMove, onLeave }
}
