import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'

const services = [
  { icon: '🤖', iconClass: 'icon-indigo', title: 'AI Agents', desc: 'Autonomous agents built around your workflows — sales, ops, support, research. They act, not just respond.' },
  { icon: '🔗', iconClass: 'icon-coral', title: 'Business Integration', desc: 'Connect AI into your existing stack. CRM, ERP, Slack, email. No rip-and-replace. No disruption.' },
  { icon: '📄', iconClass: 'icon-mint', title: 'Doc & Idea Flow', desc: 'Automate how information moves through your organisation. Intake to archive, without manual handoffs.' },
]

const stats = [
  { val: '$50M+', label: 'in value processed across client deployments' },
  { val: '80K+', label: 'monthly active users on platforms we\'ve built' },
  { val: '0', label: 'security incidents across all deployments' },
  { val: '6+', label: 'years shipping production systems' },
]

const cases = [
  {
    tag: 'AI Developer Tooling',
    title: 'Henry Coder',
    result: '87% reduction in dev time. 1,000+ developers monthly.',
    detail: 'Built an AI that writes smart contracts — 1,000 developers adopted it immediately.',
    metrics: [{ val: '87%', lbl: 'faster' }, { val: '1K+', lbl: 'monthly users' }],
  },
  {
    tag: 'Privacy Infrastructure',
    title: 'ZAMA Auction',
    result: '$121.3M total value processed. 11,000+ unique users.',
    detail: 'Most-used app on Ethereum during peak days. Privacy at scale.',
    metrics: [{ val: '$121M', lbl: 'value shielded' }, { val: '11K+', lbl: 'bidders' }],
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="orb-field">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        {/* Floating stat cards */}
        <div className="hero-cards">
          <div className="hero-float-card fc-1">
            <div className="fc-label">Deployed agents</div>
            <div className="fc-value">247</div>
          </div>
          <div className="hero-float-card fc-2">
            <div className="fc-label">Avg time saved</div>
            <div className="fc-value-sm"><span className="fc-dot"/>14 hrs/week per team</div>
          </div>
          <div className="hero-float-card fc-3">
            <div className="fc-label">Client satisfaction</div>
            <div className="fc-value">98%</div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow fade-in d1">
            <span className="hero-eyebrow-dot" />
            Intelligence, deployed.
          </div>
          <h1 className="hero-h1 fade-in d2">
            We build AI
            <span className="hero-h1-accent">that works.</span>
          </h1>
          <p className="hero-sub fade-in d3">
            Custom agents, automation, and document flows built for how your business actually runs. Not demos. Not experiments. Deployed and running.
          </p>
          <div className="hero-btns fade-in d4">
            <Link to="/work" className="btn-ghost">See our work</Link>
            <Link to="/contact" className="btn-primary">Start a project →</Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-track" />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section-white">
        <div className="container">
          <div className="split-2" style={{ marginBottom: 0 }}>
            <FadeIn>
              <span className="eyebrow">What we do</span>
              <h2 className="h2">
                Your team is brilliant.<br />
                <em>They shouldn't be doing this.</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="body-lg" style={{ paddingTop: 48 }}>
                AI Collab builds the agents and automation that handle repetitive work — so your people focus on what actually needs them. We deploy, integrate, and maintain everything.
              </p>
              <Link to="/services" className="link-inline">Explore all services <span>→</span></Link>
            </FadeIn>
          </div>

          <div className="three-cards">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="glass-card" style={{ height: '100%' }}>
                  <div className={`service-icon ${s.iconClass}`}>{s.icon}</div>
                  <h3 className="h3">{s.title}</h3>
                  <p className="body">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section section-warm">
        <div className="container">
          <FadeIn>
            <span className="eyebrow">By the numbers</span>
            <h2 className="h2" style={{ marginBottom: 48 }}>Results you can <em>measure.</em></h2>
          </FadeIn>
          <div className="stats-row">
            {stats.map((s, i) => (
              <FadeIn key={s.val} delay={i * 0.08}>
                <div className="stat-card">
                  <div className="stat-number">{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section section-white">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div>
                <span className="eyebrow">Selected work</span>
                <h2 className="h2">Production systems.<br /><em>Real results.</em></h2>
              </div>
              <Link to="/work" className="link-inline">View all work <span>→</span></Link>
            </div>
          </FadeIn>
          <div className="cases-2">
            {cases.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.12}>
                <div className="case-card">
                  <div className="case-card-accent" />
                  <span className="case-tag">{c.tag}</span>
                  <h3 className="case-h3">{c.title}</h3>
                  <p className="case-result">{c.result}</p>
                  <p className="case-detail">{c.detail}</p>
                  <div className="case-metrics">
                    {c.metrics.map(m => (
                      <div key={m.lbl}>
                        <span className="case-metric-val">{m.val}</span>
                        <span className="case-metric-lbl">{m.lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-light">
        <div className="container">
          <FadeIn>
            <div className="cta-block">
              <h2 className="cta-h2">Ready to put AI to work?</h2>
              <p className="cta-sub">Tell us what you're trying to solve. We'll tell you exactly how AI can solve it.</p>
              <Link to="/contact" className="btn-white">Start a project →</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
