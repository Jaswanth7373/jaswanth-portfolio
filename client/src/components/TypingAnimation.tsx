import { useState, useEffect, useRef } from "react"

const ROLES = [
  "Data Scientist",
  "AI / ML Engineer",
  "Full-Stack Developer",
  "Deep Learning Researcher",
  "Python Developer",
]

export function TypingAnimation() {
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const idxRef = useRef(0)
  const charRef = useRef(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const word = ROLES[idxRef.current % ROLES.length]
      if (!deleting) {
        charRef.current++
        setText(word.slice(0, charRef.current))
        if (charRef.current === word.length) {
          timeout = setTimeout(() => { setDeleting(true); tick() }, 2200)
          return
        }
        timeout = setTimeout(tick, 80)
      } else {
        charRef.current--
        setText(word.slice(0, charRef.current))
        if (charRef.current === 0) {
          idxRef.current++
          setDeleting(false)
          timeout = setTimeout(tick, 40)
          return
        }
        timeout = setTimeout(tick, 40)
      }
    }

    timeout = setTimeout(tick, 80)
    return () => clearTimeout(timeout)
  }, [deleting])

  return (
    <span>
      <span style={{ color: "var(--lime)" }}>{text}</span>
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          background: "var(--lime)",
          marginLeft: "2px",
          verticalAlign: "middle",
          animation: "cursorBlink .7s step-start infinite",
        }}
      />
      <style>{`@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  )
}
