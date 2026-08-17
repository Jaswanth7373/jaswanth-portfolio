import { useState, useRef, useEffect } from "react"
import { X, Search } from "lucide-react"
import { useTilt } from "@/hooks/useTilt"

const POSTS = [
  {
    id: "cnn-image-classification",
    title: "Building a CNN for Image Classification",
    excerpt: "A practical guide on how I built a Convolutional Neural Network for image classification, including data preprocessing, model training, and performance evaluation.",
    content: "In this article I walk through how I built a CNN for image classification end-to-end. We cover dataset preparation, augmentation strategies, designing the architecture in TensorFlow/Keras, training tips, and how I evaluated and iterated to push accuracy higher. Whether you're new to deep learning or looking to sharpen your CNN intuition, you'll find practical takeaways from a real student-built project.",
    tags: ["Deep Learning","CNN","TensorFlow","Python"],
    date: "15 Mar 2026",
    read: "8 min",
    featured: true,
  },
  {
    id: "drug-discovery-gnn",
    title: "Drug Discovery using Graph Neural Networks",
    excerpt: "Exploring how Graph Neural Networks can be used for drug–target prediction using molecular data (SMILES), along with PyTorch Geometric and RDKit.",
    content: "Drug discovery is a long, expensive process — machine learning is changing that. I share how I used Graph Convolutional Networks to predict drug–target interactions from SMILES strings. We look at how molecules become graphs with RDKit, how PyTorch Geometric makes GNNs approachable, and how I evaluated the model with AUC-ROC and accuracy metrics.",
    tags: ["AI","GNN","PyTorch","Data Science"],
    date: "10 Mar 2026",
    read: "10 min",
    featured: true,
  },
]

const ALL_TAGS = Array.from(new Set(POSTS.flatMap(p => p.tags)))

function BlogModal({ post, onClose }: { post: typeof POSTS[0]; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", fn)
    return () => document.removeEventListener("keydown", fn)
  }, [onClose])

  return (
    <div
      className="modal-overlay open"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><X size={14} /></button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1rem" }}>
          {post.tags.map(t => <span key={t} className="proj-tag" style={{ color: "var(--lime)", borderColor: "var(--lime-border2)" }}>{t}</span>)}
        </div>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800,
          fontSize: "1.5rem", letterSpacing: "-.02em", color: "var(--text)",
          marginBottom: ".75rem", lineHeight: 1.25,
        }}>{post.title}</h2>
        <div style={{
          fontFamily: "'Instrument Mono',monospace", fontSize: ".72rem",
          color: "var(--grey)", marginBottom: "1.5rem",
        }}>{post.date} · {post.read} read</div>
        <p style={{ fontSize: ".92rem", color: "var(--grey)", lineHeight: 1.85 }}>{post.content}</p>
      </div>
    </div>
  )
}

function BlogCard({ post, onClick }: { post: typeof POSTS[0]; onClick: () => void }) {
  const { ref, onMove, onLeave } = useTilt(6)
  return (
    <div
      ref={ref}
      className="blog-card-wrap tilt-card"
      style={{ cursor: "none" }}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div style={{
        fontFamily: "'Instrument Mono',monospace", fontSize: ".68rem",
        color: "var(--lime)", letterSpacing: ".1em", textTransform: "uppercase",
      }}>{post.tags[0]}</div>
      <div style={{
        fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700,
        fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-.01em",
        lineHeight: 1.3,
      }}>{post.title}</div>
      <div style={{ fontSize: ".84rem", color: "var(--grey)", lineHeight: 1.65, flex: 1 }}>{post.excerpt}</div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: ".75rem", borderTop: "1px solid var(--lime-border)",
        fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem", color: "var(--grey2)",
      }}>
        <span>{post.date}</span>
        <span style={{ color: "var(--lime)" }}>{post.read} read →</span>
      </div>
    </div>
  )
}

export function BlogSection() {
  const [search, setSearch] = useState("")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [modal, setModal] = useState<typeof POSTS[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target) } }),
      { threshold: .1 }
    )
    sectionRef.current?.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filtered = POSTS.filter(p => {
    const ms = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    const mt = activeTags.length === 0 || activeTags.some(t => p.tags.includes(t))
    return ms && mt
  })

  const toggleTag = (t: string) =>
    setActiveTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  return (
    <section id="blog" ref={sectionRef} style={{ background: "rgba(8,8,8,.86)", borderTop: "none", borderBottom: "none" }}>
      <div className="section-shell" style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── Section divider + number ── */}
        <div
          style={{ height: "1px", background: "rgba(200,255,0,.08)", marginBottom: "2rem", transformOrigin: "left", transition: "transform 1.2s cubic-bezier(.16,1,.3,1)" }}
          ref={el => { if (el) { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.transform = "scaleX(1)"; io.disconnect() } }, { threshold: 0.1 }); el.style.transform = "scaleX(0)"; io.observe(el) } }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#2a2a2a" }}>04 / Writing</span>
          <span style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(200,255,0,.3)" }}>Blog & Articles</span>
        </div>

        <div data-reveal style={{ marginBottom: "3rem", transitionDelay: ".05s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <h2 style={{
              fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900,
              fontSize: "clamp(2.4rem,5.5vw,4.5rem)", letterSpacing: "-.04em",
              lineHeight: .9, color: "#efefef", margin: 0,
            }}>
              Blog &amp; <span style={{ color: "#c8ff00" }}>Articles</span>
            </h2>
            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: ".5rem",
              padding: ".55rem 1rem", border: "1px solid var(--lime-border)",
              borderRadius: "6px", background: "var(--bg3)",
              transition: "border-color .25s",
            }}
              onFocusCapture={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--lime)"}
              onBlurCapture={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--lime-border)"}
            >
              <Search size={14} style={{ color: "var(--grey)" }} />
              <input
                data-testid="input-blog-search"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: "none", border: "none", outline: "none",
                  color: "var(--text)", fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: ".88rem", width: "100%", minWidth: 0, maxWidth: "180px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2.5rem", transitionDelay: ".1s" }}>
          {ALL_TAGS.map(t => (
            <button
              key={t}
              data-testid={`badge-filter-${t.toLowerCase().replace(/[^a-z0-9]/g,"-")}`}
              onClick={() => toggleTag(t)}
              style={{
                padding: ".3rem .85rem", borderRadius: "4px", cursor: "none",
                fontFamily: "'Instrument Mono',monospace", fontSize: ".72rem",
                letterSpacing: ".06em",
                border: activeTags.includes(t) ? "1px solid var(--lime)" : "1px solid var(--grey3)",
                background: activeTags.includes(t) ? "rgba(200,255,0,.1)" : "transparent",
                color: activeTags.includes(t) ? "var(--lime)" : "var(--grey)",
                transition: "all .2s",
              }}
            >{t}</button>
          ))}
          {activeTags.length > 0 && (
            <button
              data-testid="button-clear-filters"
              onClick={() => setActiveTags([])}
              style={{
                background: "none", border: "none", cursor: "none",
                fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem",
                color: "var(--grey2)", letterSpacing: ".06em",
              }}
            >clear all ×</button>
          )}
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div
            data-reveal
            style={{ transitionDelay: ".15s" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map(p => (
              <BlogCard key={p.id} post={p} onClick={() => setModal(p)} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--grey)" }}>
            No articles match your search.{" "}
            <button
              data-testid="button-reset-search"
              onClick={() => { setSearch(""); setActiveTags([]) }}
              style={{ background: "none", border: "none", cursor: "none", color: "var(--lime)", fontFamily: "inherit" }}
            >Reset filters</button>
          </div>
        )}

        {/* Newsletter */}
        <div
          data-reveal
          style={{
            marginTop: "5rem",
            background: "linear-gradient(135deg, rgba(200,255,0,.06), rgba(200,255,0,.02))",
            border: "1px solid var(--lime-border2)", borderRadius: "12px",
            padding: "3rem 2rem", textAlign: "center",
            transitionDelay: ".2s",
          }}
        >
          <div style={{
            fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem",
            color: "var(--lime)", letterSpacing: ".15em", textTransform: "uppercase",
            marginBottom: ".75rem",
          }}>Newsletter</div>
          <h3 style={{
            fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800,
            fontSize: "1.8rem", letterSpacing: "-.02em", color: "var(--text)",
            marginBottom: ".75rem",
          }}>Stay Updated</h3>
          <p style={{ color: "var(--grey)", fontSize: ".92rem", marginBottom: "1.5rem" }}>
            Get the latest articles and insights delivered to your inbox.
          </p>
          <div style={{ display: "flex", gap: ".75rem", maxWidth: "400px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              data-testid="input-newsletter-email"
              placeholder="your@email.com"
              className="contact-input"
              style={{ flex: 1, minWidth: "180px" }}
            />
            <button
              data-testid="button-newsletter-subscribe"
              className="btn-lime"
              style={{ padding: ".75rem 1.5rem", fontSize: ".8rem" }}
            >Subscribe</button>
          </div>
        </div>
      </div>

      {modal && <BlogModal post={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
