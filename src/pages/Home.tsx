import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import NodeBackground from '../components/NodeBackground'

function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}
    >
      {children}
    </div>
  )
}

const services3 = [
  { title: 'AI Agents', desc: 'Autonomous agents built for your workflows — sales, ops, support, research.' },
  { title: 'Business Integration', desc: 'Connect AI into your existing stack. CRM, ERP, Slack, email. No rip-and-replace.' },
  { title: 'Doc & Idea Flow', desc: 'Automate how information moves through your organisation. Intake to archive.' },
]

const serviceCards = [
  { num: '01', title: 'AI Agents', outcome: 'Replace repetitive decisions with agents that act on your behalf, 24/7.' },
  { num: '02', title: 'Document Flow', outcome: 'Stop managing documents. Let the documents manage themselves.' },
  { num: '03', title: 'Business Integration', outcome: 'Plug AI into what you already use. No new tools required.' },
  { num: '04', title: 'AI Strategy & Audit', outcome: 'Know exactly where AI makes the biggest difference before you spend a cent.' },
]

const stats = [
  { value: '$50M+', label: 'in value processed across client deployments' },
  { value: '80K+', label: 'monthly active users on platforms we\'ve built' },
  { value: '0', label: 'security incidents across all deployments' },
  { value: '6+', label: 'years shipping production systems' },
]

const cases = [
  {
    tag: 'AI Developer Tooling',
    title: 'Henry Coder',
    result: '87% reduction in development time. 1,000+ developers monthly.',
    detail: 'Built an AI that writes code — and 1,000 developers adopted it immediately.',
  },
  {
    tag: 'Privacy Infrastructure',
    title: 'ZAMA Auction Platform',
    result: '$121.3M total value processed. 11,000+ unique users.',
    detail: 'Most-used app on Ethereum during peak days. Built for privacy, scaled for volume.',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <NodeBackground />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge" style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.2s forwards' }}>
            Intelligence, deployed.
          </div>
          <h1 className="hero-h1" style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.4s forwards' }}>
            We build AI<br /><span>that works.</span>
          </h1>
          <p className="hero-sub" style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.6s forwards' }}>
            Custom AI agents, automation, and document flows built for how your business actually runs. Not demos. Not prototypes. Deployed and running.
          </p>
          <div className="hero-btns" style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.8s forwards' }}>
            <Link to="/work" className="btn-ghost">See our work</Link>
            <Link to="/contact" className="btn-primary">Start a project →</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* WHAT WE DO */}
      <section className="section-light">
        <div className="container">
          <div className="two-col">
            <FadeSection>
              <p className="section-label" style={{ color: 'rgba(10,10,15,0.35)' }}>What we do</p>
              <h2 className="section-h2-dark">
                Your team is brilliant.<br />
                <span>They shouldn't<br />be doing this.</span>
              </h2>
            </FadeSection>
            <FadeSection delay={0.1}>
              <p className="body-dark" style={{ paddingTop: 8 }}>
                AI Collab builds the agents and automation that handle repetitive work — so your people focus on what actually needs them. We deploy, integrate, and maintain everything. You get outcomes.
              </p>
              <Link to="/services" className="link-cta">Explore all services →</Link>
            </FadeSection>
          </div>

          <div className="three-grid">
            {services3.map((s, i) => (
              <FadeSection key={s.title} delay={i * 0.1}>
                <div className="card-light">
                  <div className="card-icon"><div className="card-icon-dot" /></div>
                  <h3 className="card-h3">{s.title}</h3>
                  <p className="card-p">{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="section-dark">
        <div className="container">
          <FadeSection>
            <p className="section-label">Services</p>
            <h2 className="section-h2-light" style={{ maxWidth: 560, marginBottom: 48 }}>
              Four ways to deploy intelligence
            </h2>
          </FadeSection>
          <div className="two-grid">
            {serviceCards.map((c, i) => (
              <FadeSection key={c.num} delay={i * 0.08}>
                <div className="service-card">
                  <div className="service-num">{c.num}</div>
                  <h3 className="service-h3">{c.title}</h3>
                  <p className="service-p">{c.outcome}</p>
                  <Link to="/services" className="link-cta-light">Learn more →</Link>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-surface">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <FadeSection key={s.value} delay={i * 0.08}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section-dark">
        <div className="container">
          <FadeSection>
            <div className="section-header-row">
              <div>
                <p className="section-label">Selected work</p>
                <h2 className="section-h2-light">Production systems.<br />Real results.</h2>
              </div>
              <Link to="/work" className="link-cta-light">View all work →</Link>
            </div>
          </FadeSection>
          <div className="cases-grid">
            {cases.map((c, i) => (
              <FadeSection key={c.title} delay={i * 0.1}>
                <div className="case-card">
                  <span className="case-tag">{c.tag}</span>
                  <h3 className="case-h3">{c.title}</h3>
                  <p className="case-result">{c.result}</p>
                  <p className="case-detail">{c.detail}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <div className="container">
          <FadeSection>
            <p className="section-label" style={{ textAlign: 'center' }}>Ready to start</p>
            <h2 className="cta-h2">Ready to put AI<br /><span>to work?</span></h2>
            <p className="cta-sub">Tell us what you're trying to solve. We'll tell you exactly how AI can solve it.</p>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>
              Start a project →
            </Link>
          </FadeSection>
        </div>
      </section>
    </>
  )
}
