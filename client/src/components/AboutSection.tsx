import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import profilePhoto from "@assets/ogImage.jpg"
import deloittePdf from "@assets/deloitte_data_analytics_1777012063759.pdf"
import internshalaImg from "@assets/image_1777012205794.png"
import edunetPdf from "@assets/edunet_certificate_1777012063760.pdf"
import microsoftPdf from "@assets/microsoft_certificate_1777012063761.pdf"
import broadridgeImg from "@assets/image_1777012014207.png"
import broadridgePdf from "@assets/Cerificate_Broadridge_1777012063758.pdf"
import be10xImg from "@assets/image_1777012154400.png"
import upstopPdf from "@assets/upstop_agentic_hackathon_1777012063763.pdf"
import { useTilt } from "@/hooks/useTilt"

const SKILLS = [
  "Python","Java","JavaScript","HTML","CSS",
  "NumPy","Pandas","Matplotlib","TensorFlow","Keras",
  "PyTorch","Scikit-learn","Git","GitHub","DSA",
  "OOP","DBMS","Computer Networks","Operating Systems",
  "MongoDB","React","Express","Node.js",
]

const TIMELINE = [
  {
    year: "July 2026 – Present",
    type: "Experience",
    role: "Software Intern (Gen AI)",
    org: "Xorstack · On-site",
    desc: "Working on-site as a generative AI intern, contributing to AI-driven product features and workflows. Developing and fine-tuning applications using LLMs, including building RAG pipelines to power context-aware, accurate AI responses. Collaborating with the engineering team on integrating Gen AI capabilities into internal tools and products. Applying prompt engineering techniques to optimize LLM outputs for reliability, relevance, and performance.",
    tags: ["Python","LLMs","RAG","Prompt Engineering","Machine Learning","API Integration"],
    lime: true,
  },
  {
    year: "Aug 2023 – Present",
    type: "Education",
    role: "Bachelor of Technology — CSE",
    org: "M S Ramaiah University · Bengaluru",
    desc: "Pursuing B.Tech in Computer Science with strong focus on AI, ML, Data Science and Full-Stack Development. Current Percentage: 88.1%",
    tags: ["AI","Machine Learning","Data Science","DSA","DBMS","OOP"],
    lime: true,
  },
  {
    year: "Jun 2021 – May 2023",
    type: "Education",
    role: "Class XII (Senior Secondary)",
    org: "Bhashyam Junior College · Guntur, India",
    desc: "Completed senior secondary education with an overall percentage of 86.2%.",
    tags: ["Mathematics","Physics","Chemistry","Computer Science"],
    lime: false,
  },
  {
    year: "2024",
    type: "Experience",
    role: "Data Science Intern",
    org: "CODTECH IT Solutions · Remote",
    desc: "Completed multiple data science deliverables involving data analysis, visualization, and machine learning workflows.",
    tags: ["Python","Data Analysis","Pandas","Visualization"],
    lime: true,
  },
]

const CERTS = [
  { name: "Deloitte — Data Analytics Job Simulation", issuer: "Deloitte (via Forage)", date: "February 2026", url: deloittePdf },
  { name: "Data Structures & Algorithms", issuer: "Internshala Trainings", date: "July 2024", url: internshalaImg },
  { name: "Microsoft Azure AI — 4-week Internship", issuer: "Microsoft / Edunet / AICTE", date: "May–June 2025", url: microsoftPdf },
  { name: "Edunet Foundation — AI Azure Internship", issuer: "Edunet Foundation", date: "June 2025", url: edunetPdf },
  { name: "Broadridge AI Workshop", issuer: "Ramaiah University × Broadridge", date: "May 2025", url: broadridgeImg },
  { name: "Broadridge — Certificate (PDF)", issuer: "Broadridge Financial Solutions", date: "May 2025", url: broadridgePdf },
  { name: "be10x — AI Tools & ChatGPT Workshop", issuer: "be10x", date: "March 2026", url: be10xImg },
  { name: "Upstop — Agentic Hackathon (Team Rockstar)", issuer: "Upstop", date: "2026", url: upstopPdf },
]

function SectionHeading({ label, title, delay = 0 }: { label: string; title: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  return (
    <div ref={ref}>
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay }}
          className="sec-label"
        >
          {label}
        </motion.div>
      )}
      <div style={{ overflow: "hidden" }}>
        <motion.div
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 1, delay: delay + 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.div>
      </div>
    </div>
  )
}

function TiltCert({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const { ref, onMove, onLeave } = useTilt(6)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: "-40px" })
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-card-wrap tilt-card"
        data-testid={`link-cert-${cert.name.toLowerCase().replace(/[^a-z0-9]/g,"-").slice(0,20)}`}
        onMouseMove={onMove as any}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div style={{ fontWeight: 600, fontSize: ".87rem", color: "var(--text)", lineHeight: 1.4 }}>{cert.name}</div>
        <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".75rem", color: "var(--lime)" }}>{cert.issuer}</div>
        <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem", color: "var(--grey2)" }}>{cert.date}</div>
      </a>
    </motion.div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const bioRef = useRef<HTMLDivElement>(null)
  const bioInView = useInView(bioRef, { once: true, amount: 0 })

  const timelineRef = useRef<HTMLDivElement>(null)
  const tlInView = useInView(timelineRef, { once: true, amount: 0 })

  return (
    <section id="about" ref={sectionRef} style={{ background: "rgba(3,3,3,.86)", overflow: "hidden" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-16 sm:py-28">

        {/* ── Section divider + number ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="section-divider"
        />
        <div className="section-meta">
          <span className="section-num">01 / About</span>
          <span className="section-tag">Bengaluru, India</span>
        </div>

        {/* ── Headline ── */}
        <SectionHeading
          label=""
          title={
            <h2 style={{
              fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900,
              fontSize: "clamp(2.2rem,7vw,6rem)", letterSpacing: "-.04em",
              lineHeight: .9, color: "#efefef", margin: "0 0 1.5rem",
            }}>
              Building{" "}
              <span style={{ color: "#c8ff00", textShadow: "0 0 60px rgba(200,255,0,.25)" }}>intelligent</span>
              <br />systems &amp; apps
            </h2>
          }
        />

        {/* Bio + visual grid */}
        <div
          ref={bioRef}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-20 items-start mt-10 md:mt-20"
        >
          {/* Photo with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -70, y: 30 }}
            animate={bioInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            <div>
              <div style={{
                position: "relative", aspectRatio: "4/5",
                borderRadius: "16px", overflow: "hidden",
                border: "1px solid rgba(200,255,0,.12)",
              }}>
                {/* Photo */}
                <div style={{
                  width: "100%", height: "100%",
                  background: "linear-gradient(135deg,#0a1a00 0%,#050505 50%,#001a0a 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                }}>
                  <div className="grid-lines" />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at 30% 40%, rgba(200,255,0,.1) 0%, transparent 60%)",
                  }} />
                  <img
                    src={profilePhoto}
                    alt="M N Jaswanth"
                    style={{
                      width: "80%", height: "80%",
                      objectFit: "cover", objectPosition: "top",
                      borderRadius: "10px",
                      position: "relative", zIndex: 1,
                      border: "1px solid rgba(200,255,0,.15)",
                    }}
                  />
                </div>

                {/* Tag overlay — compact, stays inside photo */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={bioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    position: "absolute", bottom: "0.9rem", left: "0.9rem", right: "0.9rem",
                    padding: "0.65rem 0.9rem",
                    background: "rgba(3,3,3,.96)", backdropFilter: "blur(20px)",
                    border: "1px solid rgba(200,255,0,.22)", borderRadius: "8px",
                    display: "flex", alignItems: "center", gap: ".6rem",
                  }}
                >
                  <span className="pulse-dot" style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: ".78rem", fontWeight: 600, color: "#efefef", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Available for Opportunities</div>
                    <div style={{ fontSize: ".65rem", color: "#555", fontFamily: "'Instrument Mono',monospace", whiteSpace: "nowrap" }}>AI/ML · Full-Stack · Data Science</div>
                  </div>
                  <div style={{
                    marginLeft: "auto", flexShrink: 0,
                    fontFamily: "'Cabinet Grotesk',sans-serif",
                    fontWeight: 900, fontSize: "1.3rem", color: "#c8ff00",
                    lineHeight: 1, textShadow: "0 0 16px rgba(200,255,0,.4)",
                  }}>88%</div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text + skills */}
          <motion.div
            initial={{ opacity: 0, x: 70, y: 30 }}
            animate={bioInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              <>I am a <strong style={{ color: "#efefef", fontWeight: 600 }}>B.Tech Computer Science student</strong> at M S Ramaiah University, Bengaluru, with a strong passion for <strong style={{ color: "#efefef", fontWeight: 600 }}>Artificial Intelligence, Machine Learning, and Data Science</strong>.</>,
              <>I have hands-on experience in Python, TensorFlow, and modern web technologies, having built deep learning models, drug discovery systems, and full-stack applications.</>,
              <>Open to internships and collaborations in <strong style={{ color: "#c8ff00", fontWeight: 600 }}>AI/ML, Data Science, and Full-Stack Development</strong>. Let's build something impactful together.</>,
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                style={{ color: "#555", fontSize: ".95rem", lineHeight: 1.9, marginBottom: "1.25rem" }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <div style={{
                fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem",
                letterSpacing: ".15em", textTransform: "uppercase",
                color: "#c8ff00", marginBottom: "1rem",
              }}>Technical Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}>
                {SKILLS.map((s, i) => (
                  <motion.span
                    key={s}
                    className="skill-chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={bioInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.03, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} style={{ marginTop: "7rem" }}>
          <SectionHeading
            label="Journey"
            title={
              <h3 style={{
                fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800,
                fontSize: "clamp(1.8rem,3.5vw,3rem)", letterSpacing: "-.03em",
                color: "#efefef", margin: "0 0 2.5rem",
              }}>
                Education &amp; Experience
              </h3>
            }
          />
          <div style={{ borderTop: "1px solid rgba(200,255,0,.06)" }}>
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={tlInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  alignItems: "start",
                  borderBottom: "1px solid rgba(200,255,0,.05)",
                  transition: "padding-left .4s cubic-bezier(.34,1.56,.64,1)",
                }}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-7 sm:py-10"
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.paddingLeft = ".75rem"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"}
              >
                <div style={{
                  fontFamily: "'Instrument Mono',monospace",
                  fontSize: ".75rem", color: "#444", letterSpacing: ".05em",
                  paddingTop: ".3rem",
                }}>{t.year}</div>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <motion.div
                    animate={{ boxShadow: t.lime ? ["0 0 6px rgba(200,255,0,.2)", "0 0 18px rgba(200,255,0,.5)", "0 0 6px rgba(200,255,0,.2)"] : "none" }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      border: `2px solid ${t.lime ? "#c8ff00" : "#333"}`,
                      background: t.lime ? "rgba(200,255,0,.15)" : "transparent",
                      flexShrink: 0, marginTop: ".45rem",
                    }}
                  />
                  <div>
                    <div style={{
                      fontFamily: "'Instrument Mono',monospace",
                      fontSize: ".63rem", letterSpacing: ".15em",
                      textTransform: "uppercase", color: "#c8ff00", marginBottom: ".4rem",
                    }}>{t.type}</div>
                    <div style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontWeight: 700, fontSize: "1.15rem", color: "#efefef",
                      marginBottom: ".25rem", letterSpacing: "-.01em",
                    }}>{t.role}</div>
                    <div style={{ fontSize: ".85rem", color: "#444", marginBottom: ".6rem" }}>{t.org}</div>
                    <div style={{ fontSize: ".85rem", color: "#333", lineHeight: 1.7, marginBottom: ".75rem" }}>{t.desc}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                      {t.tags.map(tag => (
                        <span key={tag} className="proj-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginTop: "7rem" }}>
          <SectionHeading
            label="Credentials"
            title={
              <h3 style={{
                fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800,
                fontSize: "clamp(1.8rem,3.5vw,3rem)", letterSpacing: "-.03em",
                color: "#efefef", margin: "0 0 .5rem",
              }}>Certifications</h3>
            }
          />
          <p style={{
            fontFamily: "'Instrument Mono',monospace", fontSize: ".75rem",
            color: "#333", letterSpacing: ".05em", marginBottom: "2.5rem", marginTop: ".75rem",
          }}>
            Click any certificate to view the original document
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(240px,100%),1fr))",
            gap: "1rem",
          }}>
            {CERTS.map((cert, i) => (
              <TiltCert key={cert.name} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
