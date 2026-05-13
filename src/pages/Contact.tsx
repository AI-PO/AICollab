import { useState } from 'react'
import FadeIn from '../components/FadeIn'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sub = encodeURIComponent(`Project enquiry from ${form.name} — ${form.company}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`)
    window.location.href = `mailto:info@aicollab.com?subject=${sub}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <div className="page-hero">
        <div className="orb-field" style={{ opacity: 0.4 }}>
          <div className="orb orb-1" />
          <div className="orb orb-3" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <span className="eyebrow">Contact</span>
            <h1 className="page-h1" style={{ maxWidth: 600 }}>Let's talk about what you're trying to <em>solve.</em></h1>
          </FadeIn>
        </div>
      </div>

      <section className="section section-white">
        <div className="container">
          <div className="contact-grid">
            <FadeIn>
              <p className="body-lg" style={{ marginBottom: 48 }}>Tell us what's slowing your team down, what you've already tried, and what good looks like. We'll respond within one business day.</p>
              <div className="contact-detail">
                <p className="contact-label">Email</p>
                <a href="mailto:info@aicollab.com" className="contact-value">info@aicollab.com</a>
              </div>
              <div className="contact-detail">
                <p className="contact-label">LinkedIn</p>
                <a href="https://www.linkedin.com/company/blockchain-collab/" target="_blank" rel="noopener noreferrer" className="contact-value">AI Collab on LinkedIn →</a>
              </div>
              <div className="contact-detail">
                <p className="contact-label">Based in</p>
                <p style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink60)' }}>Poland · Working globally</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              {sent ? (
                <div className="contact-form-wrap">
                  <div className="success-box">
                    <div className="success-ring">✓</div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, marginBottom: 8 }}>Your message is on its way</h3>
                    <p className="body">We'll get back to you within one business day.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="contact-form-wrap">
                  <div className="form-2col">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Name *</label>
                      <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className="form-input" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="your@email.com" className="form-input" />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: 16 }}>
                    <label className="form-label">Company</label>
                    <input name="company" value={form.company} onChange={onChange} placeholder="Your company" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">What are you trying to solve? *</label>
                    <textarea name="message" required value={form.message} onChange={onChange} placeholder="Describe the problem, what you've tried, and what good looks like..." className="form-input form-textarea" />
                  </div>
                  <button type="submit" className="form-submit">Send message →</button>
                  <p className="form-note">We respond within one business day. No sales calls unless you want one.</p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
