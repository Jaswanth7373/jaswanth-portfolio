import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

let lenisInstance: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    // @ts-ignore – @studio-freight/lenis options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false,
    })

    lenisInstance = lenis

    let rafId: number
    function tick(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

export function getLenis() {
  return lenisInstance
}

export function scrollToElement(target: string | HTMLElement) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 })
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: "smooth" })
  }
}

