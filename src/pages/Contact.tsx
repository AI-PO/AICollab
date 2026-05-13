import { useState } from 'react'

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
      <div className="page-header">
        <div className="container">
          <p className="page-label">Contact</p>
          <h1 className="page-h1" style={{ maxWidth: 640 }}>Let's talk about what you're trying to solve.</h1>
        </div>
      </div>

      <section className="section-dark" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <p className="about-p" style={{ fontSize: 18, marginBottom: 48 }}>
                Tell us what's slowing your team down, what you've already tried, and what good looks like. We'll respond within one business day.
              </p>

              <div className="contact-info-item">
                <p className="contact-info-label">Email</p>
                <a href="mailto:info@aicollab.com" className="contact-info-value">info@aicollab.com</a>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">LinkedIn</p>
                <a href="https://www.linkedin.com/company/blockchain-collab/" target="_blank" rel="noopener noreferrer" className="contact-info-value">
                  AI Collab on LinkedIn →
                </a>
              </div>
              <div className="contact-info-item">
                <p className="contact-info-label">Based in</p>
                <p className="contact-info-text">Poland · Working globally</p>
              </div>
            </div>

            <div>
              {sent ? (
                <div className="success-box">
                  <div className="success-icon">✓</div>
                  <h3 className="success-h3">Your message is on its way</h3>
                  <p className="success-p">We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Name *</label>
                      <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className="form-input" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="your@email.com" className="form-input" />
                    </div>
                  </div>
                  <div className="form-group">
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
