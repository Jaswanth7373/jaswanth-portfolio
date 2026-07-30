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
    <footer ref={ref} style={{ background: "rgba(3,3,3,.88)", borderTop: "1px solid rgba(200,255,0,.06)", overflow: "hidden" }}>

      {/* ── Giant name as footer hero ── */}
      <div style={{ overflow: "hidden", padding: "4rem 2rem 0", borderBottom: "1px solid rgba(200,255,0,.06)" }}>
        <motion.div
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 15vw, 18rem)",
            lineHeight: 0.88,
            letterSpacing: "-.04em",
            WebkitTextStroke: "1px rgba(200,255,0,.2)",
            color: "transparent",
            userSelect: "none",
            paddingBottom: "1rem",
          }}
        >
          MN JASWANTH
        </motion.div>
      </div>

      {/* ── Footer info row ── */}
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3.5rem 2rem" }}>
        <div
          style={{ display: "grid", gap: "3rem" }}
          className="[grid-template-columns:1fr] md:[grid-template-columns:1.5fr_1fr_1fr]"
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
                fontSize: ".65rem", letterSpacing: ".2em",
                textTransform: "uppercase", color: "rgba(200,255,0,.5)",
              }}>
                B.Tech CSE · Bengaluru
              </span>
            </div>
            <p style={{ color: "#333", fontSize: ".85rem", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "260px" }}>
              Building intelligent systems at the intersection of AI, Machine Learning, and Full-Stack Development.
            </p>
            <div style={{ display: "flex", gap: ".65rem" }}>
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
                    width: "32px", height: "32px",
                    border: "1px solid #1a1a1a", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#444", textDecoration: "none",
                    transition: "border-color .2s, color .2s",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#c8ff00"; el.style.color = "#c8ff00" }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#1a1a1a"; el.style.color = "#444" }}
                >
                  <Icon size={13} />
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
              fontSize: ".62rem", letterSpacing: ".18em",
              textTransform: "uppercase", color: "rgba(200,255,0,.3)",
              marginBottom: "1rem",
            }}>
              Navigation
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  data-testid={`link-footer-${label.toLowerCase()}`}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: "none", border: "none", cursor: "none",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: ".85rem", color: "#333",
                    textAlign: "left", padding: 0,
                    transition: "color .2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#c8ff00"}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#333"}
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
              fontSize: ".62rem", letterSpacing: ".18em",
              textTransform: "uppercase", color: "rgba(200,255,0,.3)",
              marginBottom: "1rem",
            }}>
              Get In Touch
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <p style={{ color: "#333", fontSize: ".85rem", lineHeight: 1.6, margin: 0 }}>
                Open to internships in AI/ML & Full-Stack
              </p>
              <a
                href="mailto:jaswanthsimha533@gmail.com"
                data-testid="link-footer-email"
                style={{
                  color: "rgba(200,255,0,.6)", fontSize: ".82rem",
                  textDecoration: "none",
                  fontFamily: "'Instrument Mono', monospace",
                  transition: "color .2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,255,0,.6)"}
              >
                jaswanthsimha533@gmail.com
              </a>
            </div>

            <motion.button
              data-testid="button-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -2 }}
              style={{
                marginTop: "1.5rem",
                display: "inline-flex", alignItems: "center", gap: ".4rem",
                background: "none", border: "1px solid #1a1a1a",
                borderRadius: "4px", padding: ".45rem .9rem", cursor: "none",
                fontFamily: "'Instrument Mono', monospace",
                fontSize: ".65rem", letterSpacing: ".08em",
                textTransform: "uppercase", color: "#333",
                transition: "border-color .2s, color .2s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "rgba(200,255,0,.3)"; el.style.color = "#c8ff00" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#1a1a1a"; el.style.color = "#333" }}
            >
              <ArrowUp size={12} />
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
            borderTop: "1px solid rgba(200,255,0,.04)",
            marginTop: "2.5rem",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: ".75rem",
          }}
        >
          <p style={{ fontFamily: "'Instrument Mono', monospace", fontSize: ".62rem", color: "#222", letterSpacing: ".04em", margin: 0 }}>
            © 2026 M N Jaswanth. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Instrument Mono', monospace", fontSize: ".62rem", color: "#222", letterSpacing: ".04em", margin: 0 }}>
            React · TypeScript · Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
