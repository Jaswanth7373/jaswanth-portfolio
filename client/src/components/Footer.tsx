import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const SOCIALS = [
  { icon: Github,    url: "https://github.com/Jaswanth7373",                    label: "GitHub" },
  { icon: Linkedin,  url: "https://www.linkedin.com/in/jaswanth-simha-9146702aa", label: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/jaswanthsimha/",           label: "Instagram" },
  { icon: Mail,      url: "mailto:jaswanthsimha533@gmail.com",                  label: "Email" },
]

const QUICK_LINKS = [
  { label: "About",    href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Blog",     href: "blog" },
  { label: "Resume",   href: "resume" },
  { label: "Contact",  href: "contact" },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <footer
      ref={ref}
      style={{
        position: "relative",
        zIndex: 20,
        pointerEvents: "auto",
        background: "rgba(3,3,3,.95)",
        borderTop: "1px solid rgba(200,255,0,.15)",
        overflow: "hidden",
      }}
    >
      {/* ── Giant name as footer hero ── */}
      <div className="footer-hero" style={{ overflow: "hidden", borderBottom: "1px solid rgba(200,255,0,.08)" }}>
        <motion.div
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 15vw, 18rem)",
            lineHeight: 0.88,
            letterSpacing: "-.04em",
            WebkitTextStroke: "1px rgba(200,255,0,.35)",
            color: "transparent",
            userSelect: "none",
            paddingBottom: "1rem",
          }}
        >
          MN JASWANTH
        </motion.div>
      </div>

      {/* ── Footer info row ── */}
      <div className="footer-info" style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div
          style={{ display: "grid", gap: "3rem" }}
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr]"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
              <span className="pulse-dot" style={{ width: "5px", height: "5px" }} />
              <span style={{
                fontFamily: "'Instrument Mono', monospace",
                fontSize: ".7rem", letterSpacing: ".2em",
                textTransform: "uppercase", color: "#c8ff00",
              }}>
                B.Tech CSE · Bengaluru
              </span>
            </div>
            <p style={{ color: "#aaa", fontSize: ".88rem", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "280px" }}>
              Building intelligent systems at the intersection of AI, Machine Learning, and Full-Stack Development.
            </p>
            <div style={{ display: "flex", gap: ".75rem" }}>
              {SOCIALS.map(({ icon: Icon, url, label }, i) => (
                <motion.a
                  key={label}
                  href={url}
                  target={url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  data-testid={`button-footer-${label.toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  style={{
                    width: "38px", height: "38px",
                    border: "1px solid rgba(255,255,255,.15)", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#eee", textDecoration: "none", cursor: "pointer",
                    background: "rgba(255,255,255,.03)",
                    transition: "border-color .2s, color .2s, background .2s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#c8ff00"; el.style.color = "#c8ff00"; el.style.background = "rgba(200,255,0,.08)" }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,.15)"; el.style.color = "#eee"; el.style.background = "rgba(255,255,255,.03)" }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <div style={{
              fontFamily: "'Instrument Mono', monospace",
              fontSize: ".7rem", letterSpacing: ".18em",
              textTransform: "uppercase", color: "#c8ff00",
              marginBottom: "1rem", fontWeight: 700,
            }}>
              Navigation
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  data-testid={`link-footer-${label.toLowerCase()}`}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: ".95rem", color: "#ccc",
                    textAlign: "left", padding: "2px 0",
                    transition: "color .2s, transform .2s",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "#c8ff00"; el.style.transform = "translateX(4px)" }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "#ccc"; el.style.transform = "none" }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div style={{
              fontFamily: "'Instrument Mono', monospace",
              fontSize: ".7rem", letterSpacing: ".18em",
              textTransform: "uppercase", color: "#c8ff00",
              marginBottom: "1rem", fontWeight: 700,
            }}>
              Get In Touch
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              <p style={{ color: "#aaa", fontSize: ".88rem", lineHeight: 1.6, margin: 0 }}>
                Open to internships in AI/ML & Full-Stack
              </p>
              <a
                href="mailto:jaswanthsimha533@gmail.com"
                data-testid="link-footer-email"
                style={{
                  color: "#c8ff00", fontSize: ".88rem",
                  textDecoration: "underline", textUnderlineOffset: "4px",
                  fontFamily: "'Instrument Mono', monospace",
                  transition: "opacity .2s", cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
              >
                jaswanthsimha533@gmail.com
              </a>
            </div>

            <motion.button
              data-testid="button-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              style={{
                marginTop: "1.75rem",
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                background: "rgba(200,255,0,.06)", border: "1px solid rgba(200,255,0,.3)",
                borderRadius: "6px", padding: ".6rem 1.1rem", cursor: "pointer",
                fontFamily: "'Instrument Mono', monospace",
                fontSize: ".7rem", letterSpacing: ".1em",
                textTransform: "uppercase", color: "#c8ff00", fontWeight: 700,
                transition: "border-color .2s, background .2s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#c8ff00"; el.style.background = "rgba(200,255,0,.15)" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "rgba(200,255,0,.3)"; el.style.background = "rgba(200,255,0,.06)" }}
            >
              <ArrowUp size={14} />
              Back to top
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,.08)",
            marginTop: "2.5rem",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: ".75rem",
          }}
        >
          <p style={{ fontFamily: "'Instrument Mono', monospace", fontSize: ".68rem", color: "#888", letterSpacing: ".04em", margin: 0 }}>
            © 2026 M N Jaswanth. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Instrument Mono', monospace", fontSize: ".68rem", color: "#888", letterSpacing: ".04em", margin: 0 }}>
            React · TypeScript · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
