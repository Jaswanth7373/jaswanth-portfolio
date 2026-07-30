const ITEMS = [
  "Python", "TensorFlow", "Deep Learning", "Graph Neural Networks",
  "Full-Stack Dev", "React", "Node.js", "PyTorch", "Data Science",
  "MongoDB", "Azure AI", "Machine Learning", "Open Source", "Scikit-learn",
]

export function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="marquee-dot">◆</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
