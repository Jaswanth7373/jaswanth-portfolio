import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { scrollToElement } from "@/hooks/useSmoothScroll"

const NAV = [
  { label: "About",    href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Blog",     href: "blog" },
  { label: "Resume",   href: "resume" },
  { label: "Contact",  href: "contact" },
]

function scrollTo(id: string) {
  scrollToElement(`#${id}`)
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState("hero")
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      const ids = ["hero", ...NAV.map(n => n.href)]
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) { setActive(id); break }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      data-testid="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="px-4 md:px-10 py-4"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(3,3,3,.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(200,255,0,.05)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background .5s, border-color .5s, backdrop-filter .5s",
      }}
    >
      {/* Logo */}
      <motion.button
        data-testid="link-logo"
        onClick={() => scrollTo("hero")}
        whileHover={{ opacity: 0.7 }}
        style={{
          background: "none", border: "none", cursor: "none",
          display: "flex", alignItems: "center", gap: ".5rem",
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 900, fontSize: "1rem", letterSpacing: "-.01em",
          color: "#efefef",
        }}
      >
        <span className="pulse-dot" style={{ width: "5px", height: "5px" }} />
        MN
      </motion.button>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
        {NAV.map(({ label, href }, i) => (
          <motion.li
            key={href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
          >
            <button
              data-testid={`link-nav-${label.toLowerCase()}`}
              onClick={() => scrollTo(href)}
              style={{
                position: "relative",
                background: "none", border: "none", cursor: "none",
                fontFamily: "'Instrument Mono', monospace",
                fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase",
                color: active === href ? "#c8ff00" : "#444",
                transition: "color .25s", padding: "0 0 .5rem",
              }}
            >
              {label}
              {active === href && (
                <motion.span
                  layoutId="nav-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  style={{
                    position: "absolute", left: 0, right: 0, bottom: 0,
                    height: "2px", background: "#c8ff00",
                    boxShadow: "0 0 8px rgba(200,255,0,.6)",
                  }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Hire Me CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <motion.button
          data-testid="link-nav-contact-cta"
          onClick={() => { scrollTo("contact"); setOpen(false) }}
          className="hidden md:inline-flex"
          whileHover={{ opacity: 0.75 }}
          style={{
            padding: ".45rem 1.1rem",
            border: "1px solid rgba(200,255,0,.25)",
            borderRadius: "4px",
            color: "#c8ff00",
            fontFamily: "'Instrument Mono', monospace",
            fontSize: ".68rem",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            background: "transparent",
            cursor: "none",
            transition: "border-color .25s",
          }}
        >
          Hire Me
        </motion.button>

        <button
          data-testid="button-mobile-menu"
          onClick={() => setOpen(v => !v)}
          className="flex md:hidden"
          style={{ background: "none", border: "none", cursor: "none", color: "#c8ff00", padding: "4px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "rgba(3,3,3,.97)",
              borderBottom: "1px solid rgba(200,255,0,.06)",
              padding: "1.25rem 1rem",
              display: "flex", flexDirection: "column", gap: ".9rem",
              overflow: "hidden",
            }}
          >
            {NAV.map(({ label, href }, i) => (
              <motion.button
                key={href}
                data-testid={`link-mobile-${label.toLowerCase()}`}
                onClick={() => { scrollTo(href); setOpen(false) }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                style={{
                  background: "none", border: "none", cursor: "none",
                  fontFamily: "'Instrument Mono', monospace",
                  fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase",
                  color: active === href ? "#c8ff00" : "#555",
                  textAlign: "left", padding: 0,
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
