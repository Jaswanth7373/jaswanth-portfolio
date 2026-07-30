import { useEffect, useRef } from "react"

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    const items = el.querySelectorAll("[data-reveal]")
    items.forEach(item => obs.observe(item))
    return () => obs.disconnect()
  }, [threshold])

  return ref
}
