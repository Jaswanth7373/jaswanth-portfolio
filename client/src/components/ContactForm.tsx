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

    // 1. Try local Express server or configured backend endpoint
    try {
      const endpoint = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/contact`
        : "/api/contact"

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast({ title: "Message sent!", description: "Thanks — I'll get back to you soon." })
        setForm({ name: "", email: "", subject: "", message: "" })
        setSubmitting(false)
        return
      }
    } catch {
      // Continue to background static host delivery below
    }

    // 2. Direct background submission for GitHub Pages static host (No app popups!)
    try {
      const bgRes = await fetch("https://formsubmit.co/ajax/jaswanthsimha533@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || `Message from ${form.name} via Portfolio`,
          message: form.message,
          _subject: `New Portfolio Message from ${form.name}`,
          _template: "table",
        }),
      })

      if (bgRes.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you — your message has been delivered to jaswanthsimha533@gmail.com.",
        })
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Background submission error")
      }
    } catch {
      toast({
        title: "Couldn't send message",
        description: "Please email jaswanthsimha533@gmail.com directly.",
        variant: "destructive",
      })
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
    <div className="tilt-card contact-form-card" style={{
      background: "var(--bg3)", border: "1px solid var(--lime-border)",
      borderRadius: "12px",
    }}>
      <div style={{ fontFamily: "'Instrument Mono',monospace", fontSize: ".7rem", color: "var(--lime)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".5rem" }}>
        Send a Message
      </div>
      <h3 style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-.02em", color: "var(--text)", marginBottom: "2rem" }}>
        Get In Touch
      </h3>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
