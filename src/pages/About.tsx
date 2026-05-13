import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'

const values = [
  { title: 'Outcomes over experiments', desc: "We don't sell pilots. We build systems that are deployed, integrated, and delivering value." },
  { title: 'No rip-and-replace', desc: "Your current stack works. We make it smarter — without disrupting what your team already knows." },
  { title: 'Specificity over generality', desc: "Generic AI gives generic results. Everything we build is designed for your workflows, data, and edge cases." },
]

export default function About() {
  return (
    <>
      <div className="page-hero">
        <div className="orb-field" style={{ opacity: 0.35 }}>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <span className="eyebrow">About</span>
            <h1 className="page-h1">We've been shipping AI since before it was <em>obvious.</em></h1>
          </FadeIn>
        </div>
      </div>

      <section className="section section-white">
        <div className="container">
          <div className="about-split">
            <FadeIn>
              <span className="eyebrow">The studio</span>
              <h2 className="h2" style={{ fontSize: 32 }}>Built for <em>real deployment.</em></h2>
              <p className="body-lg">AI Collab builds custom AI agents, automation, and document flows for SMBs and enterprises. We deploy systems that work the way your business actually runs.</p>
              <p className="body">We're the same team behind Blockchain Collab, where we've shipped production systems with over $50M in value processed and 80,000+ monthly active users. Based in Poland. Working globally.</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <span className="eyebrow">How we work</span>
              <h2 className="h2" style={{ fontSize: 32, marginBottom: 32 }}>Our <em>principles.</em></h2>
              {values.map(v => (
                <div key={v.title} className="value-row">
                  <div className="value-badge"><div className="value-badge-dot" /></div>
                  <div>
                    <p className="value-title">{v.title}</p>
                    <p className="value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>

          <FadeIn>
            <span className="eyebrow">The founders</span>
            <h2 className="h2" style={{ marginBottom: 40 }}>Small team. <em>Big output.</em></h2>
          </FadeIn>
          <div className="founders-2">
            <FadeIn delay={0.05}>
              <div className="founder-card">
                <div className="founder-initials">FP</div>
                <h3 className="founder-name">Filip Paplaczyk</h3>
                <p className="founder-role">Co-Founder · Growth & Business</p>
                <p className="founder-bio">10+ years in B2B enterprise sales — TraceLink, Tenable, Callstack, Ulam Labs. At Ulam Labs, led BD initiatives that drove a 50% hourly rate uplift across key accounts.</p>
                <p className="founder-bio">The bridge between what a business needs and what an AI system should actually do.</p>
                <p className="founder-quote">"I've spent a decade selling technology. Now I help companies actually use it."</p>
                <a href="https://www.linkedin.com/in/filip-paplaczyk/" target="_blank" rel="noopener noreferrer" className="link-inline" style={{ marginTop: 16, display: 'inline-flex' }}>LinkedIn <span>→</span></a>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="founder-card">
                <div className="founder-initials" style={{ color: 'var(--coral)', background: 'var(--coral-bg)' }}>Ł</div>
                <h3 className="founder-name">Łukasz</h3>
                <p className="founder-role">Co-Founder · Technology</p>
                <p className="founder-bio">Blockchain and AI systems architect. Built production systems across Ethereum, Algorand, Alephium, and Bitcoin — including the first AI developer tooling for Bitcoin.</p>
                <p className="founder-bio">Zero security exploits across all systems built. The reason clients come back: because what he builds doesn't break.</p>
                <p className="founder-quote">"Reliability isn't a feature. It's the baseline."</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="container">
          <FadeIn>
            <div className="cta-block">
              <h2 className="cta-h2">Work with us</h2>
              <p className="cta-sub">We keep the team small and the work specific. If that sounds like a fit, let's talk.</p>
              <Link to="/contact" className="btn-white">Get in touch →</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
