import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Instagram, Linkedin, Download, ArrowDown } from "lucide-react"
import { useMagnet } from "@/hooks/useMagnet"
import { scrollToElement } from "@/hooks/useSmoothScroll"
import resumePdf from "@assets/Jaswanth_Resume_new2.pdf"

function scrollTo(id: string) {
  scrollToElement(`#${id}`)
}

/* ── Letter-by-letter drop reveal ── */
function SplitReveal({
  text, delay = 0, className = "", style = {},
}: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  const letters = text.split("")
  return (
    <span className={className} style={{ display: "inline-flex", ...style }}>
      {letters.map((ch, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            initial={{ y: "110%", rotateX: "60deg", opacity: 0 }}
            animate={{ y: "0%", rotateX: "0deg", opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block", transformOrigin: "top center" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ── Animated stat counter ── */
function Counter({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const dur = 1600
        const fps = 60
        const frames = Math.round((dur / 1000) * fps)
        let f = 0
        const timer = setTimeout(() => {
          const iv = setInterval(() => {
            f++
            const progress = f / frames
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(ease * to))
            if (f >= frames) { clearInterval(iv); setCount(to) }
          }, 1000 / fps)
        }, delay * 1000)
        io.disconnect()
      }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, delay])

  return <span ref={ref}>{count}{suffix}</span>
}

const STATS = [
  { num: 20, suffix: "+", label: "Projects" },
  { num: 10, suffix: "+", label: "AI Models" },
  { num: 8,  suffix: "",  label: "Certs" },
  { num: 88, suffix: "%", label: "CGPA" },
]

const SOCIALS = [
  { icon: Github,    url: "https://github.com/Jaswanth7373",                        label: "GitHub" },
  { icon: Linkedin,  url: "https://www.linkedin.com/in/jaswanth-simha-9146702aa",  label: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/jaswanthsimha/",               label: "Instagram" },
]

const ROLES = ["AI Engineer", "ML Researcher", "Full Stack Dev", "Data Scientist", "Problem Solver"]

function TypingRole() {
  const [idx, setIdx]   = useState(0)
  const [txt, setTxt]   = useState("")
  const [del, setDel]   = useState(false)
  const timeRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const full = ROLES[idx]
    if (!del && txt.length < full.length) {
      timeRef.current = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), 68)
    } else if (!del && txt.length === full.length) {
      timeRef.current = setTimeout(() => setDel(true), 1800)
    } else if (del && txt.length > 0) {
      timeRef.current = setTimeout(() => setTxt(txt.slice(0, -1)), 38)
    } else if (del && txt.length === 0) {
      setDel(false)
      setIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeRef.current)
  }, [txt, del, idx])

  return (
    <span style={{ color: "#c8ff00" }}>
      {txt}<span className="blink-bar">|</span>
    </span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const resumeMagnet  = useMagnet(0.25)
  const projectsMagnet = useMagnet(0.25)

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      style={{
        height: "100vh", minHeight: "700px",
        position: "relative", overflow: "hidden",
        background: "rgba(3,3,3,.5)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}
    >
      {/* Lime bloom */}
      <div style={{
        position: "absolute", top: "38%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "1000px", height: "600px",
        background: "radial-gradient(ellipse, rgba(200,255,0,.06) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── TOP-LEFT label ── */}
      <motion.div
        className="hidden sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.7 }}
        style={{
          position: "absolute", top: "5.5rem", left: "2.5rem", zIndex: 3,
          fontFamily: "'Instrument Mono', monospace",
          fontSize: ".62rem", letterSpacing: ".2em",
          textTransform: "uppercase", color: "rgba(200,255,0,.35)",
        }}
      >
        Portfolio · 2026
      </motion.div>

      {/* ── TOP-RIGHT label ── */}
      <motion.div
        className="hidden sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.7 }}
        style={{
          position: "absolute", top: "5.5rem", right: "2.5rem", zIndex: 3,
          fontFamily: "'Instrument Mono', monospace",
          fontSize: ".62rem", letterSpacing: ".2em",
          textTransform: "uppercase", color: "rgba(200,255,0,.35)",
          textAlign: "right",
        }}
      >
        M S Ramaiah University<br />
        <span style={{ color: "rgba(200,255,0,.2)" }}>B.Tech CSE · 2023–Present</span>
      </motion.div>

      {/* ── Right-edge vertical socials (Desktop) ── */}
      <motion.div
        className="hidden md:flex"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.3, duration: 0.7 }}
        style={{
          position: "absolute", right: "2rem", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          flexDirection: "column", alignItems: "center", gap: "1.25rem",
        }}
      >
        {SOCIALS.map(({ icon: Icon, url, label }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-social-${label.toLowerCase()}`}
            data-cursor={label}
            style={{ color: "#2a2a2a", textDecoration: "none", transition: "color .2s, transform .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(-3px)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#2a2a2a"; (e.currentTarget as HTMLAnchorElement).style.transform = "" }}
          >
            <Icon size={15} />
          </a>
        ))}
        <div style={{
          width: "1px", height: "60px",
          background: "linear-gradient(to bottom, rgba(200,255,0,.25), transparent)",
          marginTop: ".5rem",
        }} />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <motion.div style={{ position: "relative", zIndex: 2, y: yContent, opacity }}>

        {/* Role typing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{
            padding: "0 1.25rem",
            fontFamily: "'Instrument Mono', monospace",
            fontSize: ".72rem", letterSpacing: ".2em",
            textTransform: "uppercase",
            marginBottom: ".75rem",
            display: "flex", alignItems: "center", gap: ".65rem",
          }}
        >
          <span className="pulse-dot" style={{ width: "6px", height: "6px" }} />
          <TypingRole />
        </motion.div>

        {/* Giant name — letter by letter */}
        <div style={{ padding: "0 1.25rem", perspective: "800px" }}>
          {/* "M N" */}
          <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.01 }}
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 12vw, 18rem)",
                lineHeight: 0.88,
                letterSpacing: "-.04em",
                color: "#aaff00",
                userSelect: "none",
                display: "block",
              }}
            >
              <SplitReveal text="M N" delay={0.05} />
            </motion.div>
          </div>

          {/* "JASWANTH" */}
          <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.01 }}
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 12vw, 18rem)",
                lineHeight: 0.88,
                letterSpacing: "-.04em",
                color: "#c8ff00",
                textShadow: "0 0 80px rgba(200,255,0,.35)",
                userSelect: "none",
                display: "block",
              }}
            >
              <SplitReveal text="JASWANTH" delay={0.18} />
            </motion.div>
          </div>
        </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="px-4 sm:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-6 border-t border-white/5 mt-5"
      >
        {/* Left: bio + CTAs */}
        <div className="w-full md:w-auto">
          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: "clamp(.85rem, 1.5vw, 1rem)",
              color: "#666", lineHeight: 1.7,
              maxWidth: "400px", margin: "0 0 1.1rem",
            }}
          >
            Building intelligent systems and scalable web apps that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <span
              ref={resumeMagnet.ref as React.RefObject<HTMLSpanElement>}
              onMouseMove={resumeMagnet.onMove}
              onMouseLeave={resumeMagnet.onLeave}
              className="w-full sm:w-auto"
            >
              <motion.a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-view-resume"
                data-cursor="DOWNLOAD"
                whileHover={{ y: -4, boxShadow: "0 16px 45px rgba(200,255,0,.35)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="w-full sm:w-auto justify-center"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".45rem",
                  padding: ".75rem 1.6rem",
                  background: "#c8ff00", color: "#000",
                  fontFamily: "'Instrument Mono', monospace",
                  fontSize: ".7rem", letterSpacing: ".1em",
                  textTransform: "uppercase", fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                <Download size={13} />
                Resume
              </motion.a>
            </span>
            <span
              ref={projectsMagnet.ref as React.RefObject<HTMLSpanElement>}
              onMouseMove={projectsMagnet.onMove}
              onMouseLeave={projectsMagnet.onLeave}
              className="w-full sm:w-auto"
            >
              <motion.button
                data-testid="button-explore-projects"
                onClick={() => scrollTo("projects")}
                data-cursor="VIEW WORK"
                whileHover={{ y: -4, borderColor: "rgba(200,255,0,.4)", color: "#c8ff00" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="w-full sm:w-auto justify-center"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".45rem",
                  padding: ".75rem 1.6rem",
                  background: "transparent", color: "#888",
                  fontFamily: "'Instrument Mono', monospace",
                  fontSize: ".7rem", letterSpacing: ".1em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: "4px",
                }}
              >
                View Work ↗
              </motion.button>
            </span>
          </motion.div>
        </div>

          {/* Right: animated stat counters */}
          <div className="grid grid-cols-2 gap-4 w-full sm:w-auto sm:flex sm:gap-10 sm:justify-end">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.08, duration: 0.5 }}
                className="bg-black/30 sm:bg-transparent border border-white/5 sm:border-none p-3 sm:p-0 rounded-lg text-left sm:text-right"
              >
                <div style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                  color: "#c8ff00", lineHeight: 1,
                  textShadow: "0 0 40px rgba(200,255,0,.25)",
                }}>
                  <Counter to={s.num} suffix={s.suffix} delay={1.6 + i * 0.08} />
                </div>
                <div style={{
                  fontFamily: "'Instrument Mono', monospace",
                  fontSize: ".56rem", color: "#666",
                  letterSpacing: ".14em", textTransform: "uppercase",
                  marginTop: ".25rem",
                }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        onClick={() => scrollTo("about")}
        style={{
          position: "absolute", bottom: "1.75rem", left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4, background: "none", border: "none", cursor: "none",
          display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#252525" }}
        >
          <ArrowDown size={13} />
        </motion.div>
      </motion.button>
    </motion.section>
  )
}
