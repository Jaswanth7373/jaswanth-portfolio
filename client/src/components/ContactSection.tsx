import { useRef } from "react"
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { ContactForm } from "./ContactForm"

const LINKS = [
  { icon: Mail,      label: "Email",     value: "jaswanthsimha533@gmail.com", url: "mailto:jaswanthsimha533@gmail.com", testid: "link-contact-email" },
  { icon: Github,    label: "GitHub",    value: "github.com/Jaswanth7373",    url: "https://github.com/Jaswanth7373", testid: "link-contact-github" },
  { icon: Linkedin,  label: "LinkedIn",  value: "linkedin.com/in/m-n-jaswanth", url: "https://www.linkedin.com/in/jaswanth-simha-9146702aa", testid: "link-contact-linkedin" },
  { icon: Instagram, label: "Instagram", value: "@jaswanthsimha",              url: "https://www.instagram.com/jaswanthsimha/", testid: "link-contact-instagram" },
  { icon: MapPin,    label: "Location",  value: "Bengaluru, India",            url: undefined, testid: "info-contact-location" },
]

function ClipReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const formInView = useInView(formRef, { once: true, margin: "-60px" })
  const linksRef = useRef<HTMLDivElement>(null)
  const linksInView = useInView(linksRef, { once: true, margin: "-40px" })

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ background: "rgba(2,2,2,.86)", overflow: "hidden", position: "relative" }}
    >
      {/* Subtle lime bloom */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse, rgba(200,255,0,.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── Section number + divider ── */}
      <div style={{ padding: "7rem 2.5rem 0" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "1px", background: "rgba(200,255,0,.1)",
            transformOrigin: "left", marginBottom: "2rem",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem" }}>
          <div style={{
            fontFamily: "'Instrument Mono', monospace",
            fontSize: ".65rem", letterSpacing: ".2em",
            textTransform: "uppercase", color: "#333",
          }}>
            03 / Contact
          </div>
          <div style={{
            fontFamily: "'Instrument Mono', monospace",
            fontSize: ".65rem", color: "rgba(200,255,0,.35)",
            letterSpacing: ".1em",
          }}>
            <span className="pulse-dot" style={{ width: "5px", height: "5px", marginRight: ".5rem" }} />
            Available for opportunities
          </div>
        </div>
      </div>

      {/* ── Giant headline ── */}
      <div style={{ padding: "0 2.5rem" }}>
        <ClipReveal delay={0}>
          <div style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(4rem, 16vw, 18rem)",
            lineHeight: 0.85,
            letterSpacing: "-.04em",
            color: "#efefef",
            userSelect: "none",
          }}>
            LET'S
          </div>
        </ClipReveal>
        <ClipReveal delay={0.1}>
          <div style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(4rem, 16vw, 18rem)",
            lineHeight: 0.85,
            letterSpacing: "-.04em",
            WebkitTextStroke: "2px rgba(200,255,0,.5)",
            color: "transparent",
            userSelect: "none",
          }}>
            TALK.
          </div>
        </ClipReveal>
      </div>

      {/* ── Tagline ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          padding: "2rem 2.5rem 0",
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "clamp(.9rem, 1.5vw, 1.1rem)",
          color: "#444", lineHeight: 1.7,
          maxWidth: "520px",
        }}
      >
        Open to internships, collaborations, and exciting projects in AI/ML, data science, and full-stack development.
      </motion.div>

      {/* ── Contact links row ── */}
      <div
        ref={linksRef}
        style={{
          padding: "3rem 2.5rem",
          display: "flex", flexWrap: "wrap", gap: "1rem",
          borderTop: "1px solid rgba(200,255,0,.06)",
          marginTop: "3rem",
        }}
      >
        {LINKS.map((link, i) => {
          const Icon = link.icon
          const inner = (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={linksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                display: "flex", alignItems: "center", gap: ".65rem",
                padding: ".65rem 1.1rem",
                border: "1px solid rgba(200,255,0,.08)",
                borderRadius: "6px",
                background: "rgba(255,255,255,.01)",
                transition: "border-color .25s, background .25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "rgba(200,255,0,.3)"
                el.style.background = "rgba(200,255,0,.03)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "rgba(200,255,0,.08)"
                el.style.background = "rgba(255,255,255,.01)"
              }}
            >
              <Icon size={13} color="#c8ff00" />
              <div>
                <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#333" }}>
                  {link.label}
                </div>
                <div style={{ fontSize: ".82rem", color: "#888" }}>{link.value}</div>
              </div>
              {link.url && <span style={{ color: "rgba(200,255,0,.3)", fontSize: ".8rem", marginLeft: ".25rem" }}>↗</span>}
            </motion.div>
          )
          return link.url ? (
            <a key={link.label} href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-testid={link.testid}
              style={{ textDecoration: "none" }}>
              {inner}
            </a>
          ) : (
            <div key={link.label} data-testid={link.testid}>{inner}</div>
          )
        })}
      </div>

      {/* ── Contact form ── */}
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 40 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          margin: "0 2.5rem 7rem",
          maxWidth: "640px",
          background: "rgba(8,8,8,.95)",
          border: "1px solid rgba(200,255,0,.08)",
          borderRadius: "12px",
          padding: "2.5rem",
        }}
      >
        <div style={{
          fontFamily: "'Instrument Mono',monospace",
          fontSize: ".65rem", color: "#c8ff00",
          letterSpacing: ".18em", textTransform: "uppercase",
          marginBottom: "2rem",
        }}>
          — Send a Message
        </div>
        <ContactForm />
      </motion.div>
    </section>
  )
}
