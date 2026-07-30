import { useRef, useEffect } from "react"
import { Download, Github, Linkedin, Instagram, Mail } from "lucide-react"
import resumePdf from "@assets/Jaswanth_Resume_new2.pdf"

const HIGHLIGHTS = [
  { icon: "01", label: "Education",    value: "B.Tech CSE",             sub: "M S Ramaiah University · 88.1%" },
  { icon: "02", label: "Focus Areas",  value: "AI / ML / Data Science", sub: "Deep Learning · GNN · Full-Stack" },
  { icon: "03", label: "Primary Stack",value: "Python · React · Node.js",sub: "TensorFlow · PyTorch · MongoDB" },
  { icon: "04", label: "Location",     value: "Bengaluru, India",        sub: "Open to remote & relocation" },
]

const SKILLS_BY_CAT = [
  { cat: "AI & ML",       items: ["TensorFlow","Keras","PyTorch","Scikit-learn","Pandas","NumPy","Matplotlib","Deep Learning","GNN","Computer Vision"] },
  { cat: "Full-Stack",    items: ["React","Node.js","Express","MongoDB","HTML","CSS","JavaScript","REST APIs"] },
  { cat: "Languages",     items: ["Python","Java","JavaScript","TypeScript","C"] },
  { cat: "Tools & Cloud", items: ["Git","GitHub","Azure AI","Jupyter","VS Code","Postman"] },
]

const SOCIALS = [
  { icon: Github,    url: "https://github.com/Jaswanth7373",              label: "GitHub" },
  { icon: Linkedin,  url: "https://www.linkedin.com/in/jaswanth-simha-9146702aa",    label: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/jaswanthsimha/",    label: "Instagram" },
]

export function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target) } }),
      { threshold: .1 }
    )
    sectionRef.current?.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="resume" ref={sectionRef} style={{ background: "rgba(5,5,5,.86)", borderTop: "none" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "7rem 2.5rem 9rem" }}>

        {/* ── Section divider + number ── */}
        <div
          style={{ height: "1px", background: "rgba(200,255,0,.08)", marginBottom: "2rem", transformOrigin: "left", transition: "transform 1.2s cubic-bezier(.16,1,.3,1)" }}
          ref={el => { if (el) { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.transform = "scaleX(1)"; io.disconnect() } }, { threshold: 0.1 }); el.style.transform = "scaleX(0)"; io.observe(el) } }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#2a2a2a" }}>05 / Resume</span>
          <span style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(200,255,0,.3)" }}>Quick Overview</span>
        </div>

        {/* Header */}
        <div data-reveal style={{ marginBottom: "4rem", transitionDelay: ".05s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <h2 style={{
              fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900,
              fontSize: "clamp(2.4rem,5.5vw,4.5rem)", letterSpacing: "-.04em",
              lineHeight: .9, color: "#efefef", margin: 0,
            }}>
              Quick <span style={{ color: "#c8ff00" }}>Overview</span>
            </h2>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-download-resume"
              className="btn-lime"
              style={{ padding: ".75rem 1.8rem", fontSize: ".82rem" }}
            >
              <Download size={14} />
              <span>Request Resume</span>
            </a>
          </div>
        </div>

        {/* Highlights */}
        <div
          data-reveal
          style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem",
            marginBottom: "4rem", transitionDelay: ".1s",
          }}
          className="[grid-template-columns:1fr_1fr] lg:[grid-template-columns:repeat(4,1fr)]"
        >
          {HIGHLIGHTS.map(h => (
            <div
              key={h.label}
              style={{
                padding: "1.5rem", border: "1px solid var(--lime-border)",
                borderRadius: "10px", background: "var(--bg2)",
                transition: "all .3s cubic-bezier(.34,1.56,.64,1)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--lime-border2)"; el.style.transform = "translateY(-4px)"
                el.style.boxShadow = "0 12px 40px rgba(200,255,0,.08)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--lime-border)"; el.style.transform = ""; el.style.boxShadow = ""
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: ".75rem" }}>{h.icon}</div>
              <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".63rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--lime)", marginBottom: ".4rem" }}>{h.label}</div>
              <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "var(--text)", marginBottom: ".25rem" }}>{h.value}</div>
              <div style={{ fontSize: ".8rem", color: "var(--grey)" }}>{h.sub}</div>
            </div>
          ))}
        </div>

        {/* Skills by cat */}
        <div data-reveal style={{ marginBottom: "4rem", transitionDelay: ".15s" }}>
          <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".72rem", color: "var(--lime)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "2rem", display: "flex", alignItems: "center", gap: ".6rem" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "var(--lime)" }} />
            Skills &amp; Technologies
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }}
            className="[grid-template-columns:1fr_1fr] lg:[grid-template-columns:repeat(4,1fr)]">
            {SKILLS_BY_CAT.map(cat => (
              <div key={cat.cat}>
                <div style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--text)", marginBottom: "1rem", letterSpacing: "-.01em" }}>{cat.cat}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                  {cat.items.map(s => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--lime)", flexShrink: 0 }} />
                      <span style={{ fontSize: ".83rem", color: "var(--grey)" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div data-reveal style={{
          background: "linear-gradient(135deg,rgba(200,255,0,.08) 0%,rgba(200,255,0,.02) 100%)",
          border: "1px solid var(--lime-border2)", borderRadius: "12px", padding: "3rem 2.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "2rem", transitionDelay: ".2s",
        }}>
          <div>
            <h3 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-.02em", color: "var(--text)", marginBottom: ".5rem" }}>
              Open to New Opportunities
            </h3>
            <p style={{ color: "var(--grey)", fontSize: ".9rem", maxWidth: "440px", lineHeight: 1.75 }}>
              Looking for internships or full-time roles in AI/ML, Data Science, and Full-Stack Development. Available to start immediately.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="mailto:jaswanthsimha533@gmail.com" data-testid="link-resume-email" className="btn-lime" style={{ padding: ".75rem 1.8rem", fontSize: ".82rem" }}>
              <Mail size={14} /><span>Email Me</span>
            </a>
            <div style={{ display: "flex", gap: ".75rem" }}>
              {SOCIALS.map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" data-testid={`link-resume-${label.toLowerCase()}`}
                  style={{ width: "40px", height: "40px", border: "1px solid var(--grey3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--grey)", textDecoration: "none", transition: "all .25s cubic-bezier(.34,1.56,.64,1)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--lime)"; el.style.color = "var(--lime)"; el.style.transform = "translateY(-3px)" }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--grey3)"; el.style.color = "var(--grey)"; el.style.transform = "" }}
                ><Icon size={16} /></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
