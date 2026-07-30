import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { apiRequest } from "@/lib/queryClient"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitting(true)
    try {
      await apiRequest("POST", "/api/contact", form)
      toast({ title: "Message sent!", description: "Thanks — I'll get back to you soon." })
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      toast({ title: "Couldn't send", description: err?.message || "Try emailing jaswanthsimha533@gmail.com directly.", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: ".75rem 1rem",
    background: "var(--bg)", border: "1px solid var(--grey3)",
    borderRadius: "8px", color: "var(--text)",
    fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: ".9rem",
    outline: "none", transition: "border-color .25s, box-shadow .25s",
  }

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--lime)"
    e.target.style.boxShadow = "0 0 0 3px rgba(200,255,0,.08)"
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--grey3)"
    e.target.style.boxShadow = ""
  }

  return (
    <div className="tilt-card" style={{
      background: "var(--bg3)", border: "1px solid var(--lime-border)",
      borderRadius: "12px", padding: "2.5rem",
    }}>
      <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem", color: "var(--lime)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>
        Send a Message
      </div>
      <h3 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-.02em", color: "var(--text)", marginBottom: "2rem" }}>
        Get In Touch
      </h3>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
          className="[grid-template-columns:1fr] sm:[grid-template-columns:1fr_1fr]">
          <div>
            <label className="contact-label">Name *</label>
            <input
              data-testid="input-contact-name"
              name="name" type="text" placeholder="Your full name"
              value={form.name} onChange={set("name")} required
              style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
          <div>
            <label className="contact-label">Email *</label>
            <input
              data-testid="input-contact-email"
              name="email" type="email" placeholder="your@email.com"
              value={form.email} onChange={set("email")} required
              style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
        </div>

        <div>
          <label className="contact-label">Subject</label>
          <input
            data-testid="input-contact-subject"
            name="subject" type="text" placeholder="What's this about?"
            value={form.subject} onChange={set("subject")}
            style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
          />
        </div>

        <div>
          <label className="contact-label">Message *</label>
          <textarea
            data-testid="textarea-contact-message"
            name="message" placeholder="Tell me about your project, idea, or just say hi..."
            value={form.message} onChange={set("message")} required rows={5}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focusStyle as any} onBlur={blurStyle as any}
          />
        </div>

        <button
          type="submit"
          data-testid="button-contact-submit"
          disabled={!form.name || !form.email || !form.message || submitting}
          className="btn-lime"
          style={{ width: "100%", justifyContent: "center", padding: ".9rem", fontSize: ".88rem", opacity: (!form.name || !form.email || !form.message || submitting) ? .6 : 1 }}
        >
          {submitting ? (
            <><Loader2 size={16} className="animate-spin" /><span>Sending...</span></>
          ) : (
            <><Send size={16} /><span>Send Message</span></>
          )}
        </button>
      </form>
    </div>
  )
}
