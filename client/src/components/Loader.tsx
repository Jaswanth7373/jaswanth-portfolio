import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  const name = ["M", "N", " ", "J", "a", "s", "w", "a", "n", "t", "h"]
  const limeIdx = [0, 1, 3]

  useEffect(() => {
    const start = performance.now()
    const duration = 900

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(100, Math.floor((elapsed / duration) * 100))
      setPct(p)
      if (elapsed < duration) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 600)
        }, 100)
      }
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "#030303",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Grid lines bg */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(200,255,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* Pulsing center glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "600px", height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,255,0,.25) 0%, transparent 70%)",
            }}
          />

          {/* Name */}
          <div style={{ display: "flex", gap: "0.04em", overflow: "hidden", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
            {name.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3rem,8vw,6rem)",
                  letterSpacing: "-.03em",
                  color: limeIdx.includes(i) ? "#c8ff00" : "#efefef",
                  display: "inline-block",
                  whiteSpace: "pre",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ position: "relative", zIndex: 1, width: "280px" }}>
            <div style={{
              height: "1px",
              background: "rgba(200,255,0,.12)",
              borderRadius: "100px",
              overflow: "hidden",
            }}>
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #c8ff00, #a8e000)",
                  borderRadius: "100px",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: pct / 100 }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>
            <div style={{
              fontFamily: "'Instrument Mono', monospace",
              fontSize: ".68rem",
              color: "#c8ff00",
              letterSpacing: ".15em",
              textAlign: "right",
              marginTop: ".5rem",
            }}>{pct}%</div>
          </div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              position: "absolute", bottom: "3rem",
              fontFamily: "'Instrument Mono', monospace",
              fontSize: ".65rem",
              color: "rgba(200,255,0,.4)",
              letterSpacing: ".25em",
              textTransform: "uppercase",
            }}
          >
            Portfolio · 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
