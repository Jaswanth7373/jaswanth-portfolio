import { useState, useRef } from "react"
import { Github, X, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useTilt } from "@/hooks/useTilt"
import drugDiscoveryImage from "@assets/generated_images/Drug_Discovery_Dashboard_c3cade7c.png"
import deepLearningImage from "@assets/generated_images/Deep_Learning_CNN_9ebe8652.png"
import librarySystemImage from "@assets/generated_images/Library_Management_System_f18de242.png"
import aiAssistantImage from "@assets/generated_images/AI_Assistant_Web_App_5cd1373d.png"

const PROJECTS = [
  {
    id: "drug-discovery-gnn",
    num: "01",
    title: "Drug Discovery using Graph Neural Networks",
    short: "Built a GCN model to predict drug–target interactions using molecular SMILES data, achieving strong performance on AUC-ROC and accuracy metrics.",
    long: "A research-grade deep learning project applying Graph Convolutional Networks to drug discovery. Molecules are represented as graphs from SMILES strings using RDKit, then fed into a PyTorch Geometric GCN to predict drug–target interactions. Evaluated using AUC-ROC, precision, recall, and accuracy on benchmark datasets.",
    tech: ["PyTorch Geometric","RDKit","Python","Deep Learning","GNN"],
    github: "https://github.com/Jaswanth7373",
    image: drugDiscoveryImage,
    featured: true,
    features: ["Molecular graph construction from SMILES strings using RDKit","GCN implementation in PyTorch Geometric","Drug–target interaction prediction with strong AUC-ROC scores","Comprehensive evaluation with multiple metrics","Reproducible training and inference workflows","Modular code structure for easy experimentation"],
    challenges: ["Converting molecular SMILES to graph representations","Designing GCN architecture for sparse molecular graphs","Handling class imbalance in interaction datasets","Tuning hyperparameters for optimal AUC-ROC"],
  },
  {
    id: "deep-learning-cnn",
    num: "02",
    title: "Deep Learning for Image Recognition (CNN)",
    short: "Developed a CNN for image classification, improving accuracy through optimization and evaluation on benchmark datasets.",
    long: "A deep learning project building a Convolutional Neural Network from the ground up for image classification. Covers data preprocessing, augmentation, model training with TensorFlow/Keras, and rigorous evaluation, with iterative improvements to push accuracy higher.",
    tech: ["Python","TensorFlow","Keras","CNN","NumPy"],
    github: "https://github.com/Jaswanth7373",
    image: deepLearningImage,
    featured: true,
    features: ["End-to-end CNN with TensorFlow & Keras","Data preprocessing and augmentation pipelines","Training, validation, testing with benchmark datasets","Hyperparameter tuning for optimized accuracy","Confusion matrix and per-class accuracy reporting","Clean, well-documented Jupyter notebooks"],
    challenges: ["Designing a CNN that generalizes without overfitting","Choosing the right augmentation strategy","Tuning learning rate, batch size, optimizer","Interpreting model errors and iterating architecture"],
  },
  {
    id: "waste-food-management",
    num: "03",
    title: "Waste Food Management System",
    short: "Web platform connecting food donors with NGOs via location-based matching, real-time tracking, and automated notifications.",
    long: "A full-stack web app helping reduce food waste by connecting restaurants, individuals, and event organizers with nearby NGOs and shelters.",
    tech: ["HTML","CSS","JavaScript","Backend Integration"],
    github: "https://github.com/Jaswanth7373",
    image: librarySystemImage,
    featured: false,
    features: ["Donor and recipient registration with role-based dashboards","Location-based matching between donors and NGOs","Real-time donation tracking","Automated notifications","Responsive interface"],
    challenges: ["Designing efficient location-based matching logic","Coordinating real-time updates","Building reliable notification flows"],
  },
  {
    id: "library-management-ml",
    num: "04",
    title: "Library Management System (ML)",
    short: "Uses K-Means, DBSCAN, and Hierarchical clustering to analyze library data for pattern detection.",
    long: "A machine-learning-driven library system applying unsupervised learning to library data. K-Means, DBSCAN, and Hierarchical clustering reveal reading patterns, popular categories, and member segments.",
    tech: ["Python","Machine Learning","Data Analysis","Scikit-learn"],
    github: "https://github.com/Jaswanth7373",
    image: aiAssistantImage,
    featured: false,
    features: ["K-Means clustering for member segmentation","DBSCAN for density-based pattern detection","Hierarchical clustering with dendrogram visualization","Data preprocessing and feature engineering"],
    challenges: ["Choosing the right clustering algorithm per use case","Determining optimal cluster counts","Cleaning real-world library data"],
  },
  {
    id: "restaurant-management-xorstack",
    num: "05",
    title: "Restaurant Management System",
    short: "Full-stack restaurant system with web & mobile apps built at Xorstack — covering table/reservation management, menu, chefs, waiters, inventory, and order tracking.",
    long: "Built during my Software Intern (Gen AI) role at Xorstack. A full-stack restaurant management system with both web and mobile applications. Covers table and reservation management, menu management, dedicated chefs' and waiters' pages, inventory control, and real-time order tracking. Developed a Node.js backend with Supabase as the database and integrated REST APIs to deliver a seamless, consistent experience across web and mobile platforms.",
    tech: ["Node.js", "Supabase", "React", "REST APIs", "Full-Stack", "Mobile"],
    github: "https://github.com/Jaswanth7373",
    image: aiAssistantImage,
    featured: true,
    features: ["Table and reservation management system", "Full menu management with categories", "Dedicated chef and waiter role-based pages", "Inventory tracking and management", "Real-time order tracking and status updates", "Cross-platform REST APIs for web and mobile"],
    challenges: ["Designing multi-role access control for staff", "Syncing real-time order state across platforms", "Building scalable REST APIs with Supabase", "Cross-platform UX consistency for web and mobile"],
  },
  {
    id: "codtech-task-1",
    num: "06",
    title: "CODTECH Internship — Task 1",
    short: "First internship deliverable covering core data science fundamentals, analysis, and visualization.",
    long: "Fundamental data science concepts including data exploration, cleaning, statistical analysis, and visualization workflows — delivered as a clean, reproducible project.",
    tech: ["Python","Pandas","Matplotlib","Data Analysis"],
    github: "https://github.com/Jaswanth7373/CODTECH-TASK-1",
    image: drugDiscoveryImage,
    featured: false,
    features: ["Exploratory data analysis with Pandas","Statistical visualizations using Matplotlib","Data cleaning and preprocessing","Documented findings and insights"],
    challenges: ["Working with real-world messy data","Choosing the right visualizations","Drawing meaningful conclusions"],
  },
  {
    id: "codtech-task-2",
    num: "07",
    title: "CODTECH Internship — Task 2",
    short: "Second internship task expanding on data science with advanced techniques and applied modelling.",
    long: "An advanced data science deliverable from CODTECH. Builds on Task 1 with sophisticated preprocessing, machine learning workflows, and deeper performance evaluation.",
    tech: ["Python","Machine Learning","Scikit-learn","Pandas"],
    github: "https://github.com/Jaswanth7373/codtech--task-2",
    image: librarySystemImage,
    featured: false,
    features: ["Advanced data preprocessing pipelines","Machine learning model training","Performance evaluation and tuning","Comprehensive documentation"],
    challenges: ["Implementing complex ML workflows","Tuning model hyperparameters","Validating model performance robustly"],
  },
]

function CinematicModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,.88)", backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#080808",
          border: "1px solid rgba(200,255,0,.18)",
          borderRadius: "16px",
          maxWidth: "680px", width: "100%",
          maxHeight: "85vh", overflowY: "auto",
          padding: "2.5rem", position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1.2rem", right: "1.2rem",
            width: "32px", height: "32px",
            background: "#111", border: "1px solid #333",
            borderRadius: "50%", color: "#888",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "none", transition: "all .2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLButtonElement).style.color = "#c8ff00" }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#333"; (e.currentTarget as HTMLButtonElement).style.color = "#888" }}
        >
          <X size={13} />
        </button>

        <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".63rem", color: "#c8ff00", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".75rem" }}>
          {project.num} — Featured Project
        </div>
        <h2 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-.03em", color: "#efefef", marginBottom: "1rem", lineHeight: 1.2 }}>
          {project.title}
        </h2>
        <p style={{ fontSize: ".9rem", color: "#666", lineHeight: 1.85, marginBottom: "1.25rem" }}>{project.long}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1.5rem" }}>
          {project.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}
        </div>

        {project.features.length > 0 && (
          <>
            <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".65rem", color: "#555", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".75rem", marginTop: "1.25rem" }}>Key Features</div>
            <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.25rem" }}>
              {project.features.map(f => (
                <li key={f} style={{ fontSize: ".87rem", color: "#555", lineHeight: 1.75, marginBottom: ".4rem" }}>{f}</li>
              ))}
            </ul>
          </>
        )}

        {project.challenges.length > 0 && (
          <>
            <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".65rem", color: "#555", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".75rem" }}>Challenges Solved</div>
            <ul style={{ paddingLeft: "1.2rem", margin: "0 0 2rem" }}>
              {project.challenges.map(c => (
                <li key={c} style={{ fontSize: ".87rem", color: "#555", lineHeight: 1.75, marginBottom: ".4rem" }}>{c}</li>
              ))}
            </ul>
          </>
        )}

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lime"
          style={{ display: "inline-flex", padding: ".65rem 1.4rem", fontSize: ".78rem" }}
        >
          <Github size={14} /> View on GitHub
        </a>
      </motion.div>
    </motion.div>
  )
}

function FeaturedCard({ project, index, onClick }: { project: typeof PROJECTS[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const { ref: tiltRef, onMove, onLeave } = useTilt(5)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 8, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        data-testid={`project-card-${project.id}`}
        data-cursor="view"
        className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]"
        style={{
          border: "1px solid rgba(200,255,0,.08)",
          borderRadius: "16px", overflow: "hidden",
          cursor: "none",
          background: "linear-gradient(135deg,#060606,#080808)",
          transition: "border-color .4s, box-shadow .4s",
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = "rgba(200,255,0,.25)"
          el.style.boxShadow = "0 40px 100px rgba(0,0,0,.7), 0 0 80px rgba(200,255,0,.06)"
        }}
      >
        {/* Visual side */}
        <div style={{
          background: "linear-gradient(135deg,#0c1a00,#050505,#001205)",
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "320px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 50%, rgba(200,255,0,.12) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "220px", height: "220px", background: "rgba(200,255,0,.08)", borderRadius: "50%", filter: "blur(80px)" }} />
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "85%", height: "85%", objectFit: "cover",
              borderRadius: "10px", position: "relative", zIndex: 1,
              border: "1px solid rgba(200,255,0,.1)",
              filter: "brightness(.85) saturate(1.15)",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".62rem", color: "#c8ff00", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".75rem" }}>
              {project.num} — Featured
            </div>
            <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-.025em", color: "#efefef", marginBottom: ".75rem", lineHeight: 1.2 }}>
              {project.title}
            </div>
            <div style={{ fontSize: ".87rem", color: "#555", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              {project.short}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1.5rem" }}>
              {project.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}
            </div>
          </div>
          <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-github-${project.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                fontFamily: "'Instrument Mono',monospace", fontSize: ".73rem",
                color: "#c8ff00", letterSpacing: ".06em", textDecoration: "none",
                textTransform: "uppercase", padding: ".55rem 1.1rem",
                border: "1px solid rgba(200,255,0,.2)", borderRadius: "6px",
                transition: "all .25s cubic-bezier(.34,1.56,.64,1)",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#c8ff00"; el.style.color = "#000" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ""; el.style.color = "#c8ff00" }}
            >
              <Github size={13} /> GitHub
            </a>
            <button
              onClick={onClick}
              style={{
                display: "inline-flex", alignItems: "center", gap: ".4rem",
                fontFamily: "'Instrument Mono',monospace", fontSize: ".73rem",
                color: "#444", letterSpacing: ".06em", textTransform: "uppercase",
                background: "none", border: "none", cursor: "none",
                transition: "color .2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "#efefef"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "#444"}
            >
              Details <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function GridCard({ project, index, onClick }: { project: typeof PROJECTS[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  const { ref: tiltRef, onMove, onLeave } = useTilt(8)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, scale: 0.94, rotateX: 6, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay: (index % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%", perspective: "900px" }}
    >
      <div
        ref={tiltRef as React.RefObject<HTMLDivElement>}
        onMouseMove={onMove}
        onMouseLeave={e => { onLeave(); (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,.07)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,.22)" }}
        onClick={onClick}
        data-testid={`project-card-${project.id}`}
        data-cursor="view"
        style={{
          background: "#080808",
          border: "1px solid rgba(200,255,0,.07)",
          borderRadius: "12px", padding: "1.5rem",
          cursor: "none", position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", gap: ".75rem",
          height: "100%", transformStyle: "preserve-3d",
          transition: "border-color .35s, box-shadow .35s",
        }}
      >
        {/* lime bar top */}
        <div className="proj-top-bar" />

        <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".6rem", color: "#333", letterSpacing: ".12em" }}>{project.num}</div>
        <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#efefef", letterSpacing: "-.01em", lineHeight: 1.25 }}>
          {project.title}
        </div>
        <div style={{ fontSize: ".83rem", color: "#444", lineHeight: 1.75, flex: 1 }}>{project.short}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: ".75rem", borderTop: "1px solid rgba(200,255,0,.06)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem" }}>
            {project.tech.slice(0, 3).map(t => <span key={t} className="proj-tag">{t}</span>)}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-github-${project.id}`}
            onClick={e => e.stopPropagation()}
            style={{ color: "#c8ff00", fontSize: "1.1rem", opacity: .5, transition: "opacity .2s, transform .2s", textDecoration: "none", flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translate(2px,-2px)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = ".5"; (e.currentTarget as HTMLAnchorElement).style.transform = "" }}
          >↗</a>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [modal, setModal] = useState<typeof PROJECTS[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  const featured = PROJECTS.filter(p => p.featured)
  const grid = PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" ref={sectionRef} style={{ background: "rgba(3,3,3,.86)", overflow: "hidden" }}>

      {/* ── Section divider + number ── */}
      <div style={{ padding: "7rem 2.5rem 0" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="section-divider"
        />
        <div className="section-meta">
          <span className="section-num">02 / Work</span>
          <span className="section-tag">Selected Projects</span>
        </div>
      </div>

      {/* Cinematic showcase header */}
      <div style={{
        position: "relative", overflow: "hidden",
        minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(to bottom, #030303, #020202)",
        marginTop: "2rem",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: "700px", height: "300px",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(ellipse, rgba(200,255,0,.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Floating showcase image */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: "10%",
            borderRadius: "20px", overflow: "hidden",
            border: "1px solid rgba(200,255,0,.05)",
            opacity: 0.15,
          }}>
            <img src={drugDiscoveryImage} alt="Portfolio showcase" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.4) saturate(1.2)" }} />
          </div>
        </div>

        {/* Center text */}
        <motion.div
          ref={headerRef}
          style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="sec-label"
            style={{ justifyContent: "center", marginBottom: ".75rem" }}
          >
            Portfolio
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={headerInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900,
                fontSize: "clamp(3rem,9vw,7.5rem)", letterSpacing: "-.04em",
                lineHeight: .88, color: "#efefef", margin: "0 0 1rem",
              }}
            >
              Selected <span style={{ color: "#c8ff00", textShadow: "0 0 60px rgba(200,255,0,.3)" }}>Work</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ color: "#444", fontSize: ".9rem", maxWidth: "440px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}
          >
            AI, ML, and full-stack systems built to solve real-world problems
          </motion.p>

          <motion.a
            href="https://github.com/Jaswanth7373"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.06, y: -3 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: ".6rem",
              fontFamily: "'Instrument Mono',monospace", fontSize: ".78rem",
              color: "#efefef", letterSpacing: ".12em", textTransform: "uppercase",
              textDecoration: "none", padding: ".7rem 1.6rem",
              border: "1px solid rgba(255,255,255,.1)", borderRadius: "100px",
              background: "rgba(255,255,255,.03)", backdropFilter: "blur(8px)",
              transition: "border-color .3s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,255,0,.3)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.1)"}
          >
            <Github size={14} /> All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="px-4 sm:px-10 py-12 sm:py-24">
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>

          {/* Featured */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
            {featured.map((p, i) => (
              <FeaturedCard key={p.id} project={p} index={i} onClick={() => setModal(p)} />
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}
            className="[grid-template-columns:1fr] sm:[grid-template-columns:1fr_1fr] lg:[grid-template-columns:repeat(4,1fr)]"
          >
            {grid.map((p, i) => (
              <GridCard key={p.id} project={p} index={i} onClick={() => setModal(p)} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && <CinematicModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  )
}
