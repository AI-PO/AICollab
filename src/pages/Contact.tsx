import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${form.name} — ${form.company}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`
    )
    window.location.href = `mailto:info@aicollab.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="bg-base pt-40 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* LEFT */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.p variants={fadeUp} className="text-accent/30 text-xs uppercase tracking-widest mb-6 font-display">
                Contact
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-display font-bold text-5xl md:text-6xl text-accent leading-tight mb-8">
                Let's talk about what you're trying to solve.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-accent/50 text-lg leading-relaxed mb-12">
                Tell us what's slowing your team down, what you've already tried, and what good looks like. We'll respond within one business day with a clear view on whether and how we can help.
              </motion.p>

              <motion.div variants={stagger} className="flex flex-col gap-6">
                <motion.div variants={fadeUp} className="flex flex-col gap-1">
                  <p className="text-accent/30 text-xs uppercase tracking-widest font-display">Email</p>
                  <a
                    href="mailto:info@aicollab.com"
                    className="text-accent hover:text-white transition-colors font-display text-lg"
                  >
                    info@aicollab.com
                  </a>
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-col gap-1">
                  <p className="text-accent/30 text-xs uppercase tracking-widest font-display">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/company/blockchain-collab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-white transition-colors font-display text-lg"
                  >
                    AI Collab on LinkedIn →
                  </a>
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-col gap-1">
                  <p className="text-accent/30 text-xs uppercase tracking-widest font-display">Based in</p>
                  <p className="text-accent/60 font-display text-lg">Poland · Working globally</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* RIGHT — FORM */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
            >
              {sent ? (
                <div className="bg-surface border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-14 h-14 rounded-full bg-cta/10 border border-cta/20 flex items-center justify-center mb-6">
                    <span className="text-cta text-2xl">✓</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-accent mb-3">Your message is on its way</h3>
                  <p className="text-accent/50 text-sm">We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-accent/40 text-xs uppercase tracking-widest font-display">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-accent text-sm placeholder:text-accent/20 focus:outline-none focus:border-cta/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-accent/40 text-xs uppercase tracking-widest font-display">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-accent text-sm placeholder:text-accent/20 focus:outline-none focus:border-cta/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-accent/40 text-xs uppercase tracking-widest font-display">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-accent text-sm placeholder:text-accent/20 focus:outline-none focus:border-cta/40 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-accent/40 text-xs uppercase tracking-widest font-display">
                      What are you trying to solve? *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe the problem, what you've tried, and what good looks like..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-accent text-sm placeholder:text-accent/20 focus:outline-none focus:border-cta/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-cta text-base font-display font-semibold text-sm hover:bg-cta/90 transition-all duration-200 hover:scale-[1.02] mt-2"
                  >
                    Send message →
                  </button>

                  <p className="text-accent/20 text-xs text-center">
                    We respond within one business day. No sales calls unless you want one.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
