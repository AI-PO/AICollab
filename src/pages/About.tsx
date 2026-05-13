import { Link } from 'react-router-dom'

const values = [
  { title: 'Outcomes over experiments', desc: "We don't sell pilots. We build systems that are deployed, integrated, and delivering value before we close the project." },
  { title: 'No rip-and-replace', desc: "Your current stack works. We make it smarter — without disrupting what your team already knows." },
  { title: 'Specificity over generality', desc: "Generic AI tools give generic results. Everything we build is designed for your workflows, your data, your edge cases." },
]

export default function About() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <p className="page-label">About</p>
          <h1 className="page-h1">We've been shipping AI systems since before it was obvious.</h1>
        </div>
      </div>

      <section className="section-dark" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <h2 className="section-h2-light" style={{ fontSize: 32, marginBottom: 24 }}>The studio</h2>
              <p className="about-p">AI Collab builds custom AI agents, automation, and document flows for SMBs and enterprises. We deploy systems that work the way your business actually runs — not the way a demo assumes it does.</p>
              <p className="about-p">We're the same team behind Blockchain Collab, where we've shipped production systems with over $50M in value processed and 80,000+ monthly active users across multiple platforms.</p>
              <p className="about-p">Based in Poland. Working globally. No fluff.</p>
            </div>
            <div>
              <h2 className="section-h2-light" style={{ fontSize: 32, marginBottom: 28 }}>How we work</h2>
              {values.map(v => (
                <div key={v.title} className="value-item">
                  <span className="value-dot" />
                  <div>
                    <p className="value-title">{v.title}</p>
                    <p className="value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="section-label" style={{ marginBottom: 48 }}>The founders</p>
          <div className="founders-grid">
            <div>
              <div className="founder-avatar">FP</div>
              <h3 className="founder-name">Filip Paplaczyk</h3>
              <p className="founder-role">Co-Founder · Growth & Business</p>
              <p className="founder-p">10+ years in B2B enterprise sales — TraceLink, Tenable, Callstack, Ulam Labs. At Ulam Labs, led BD initiatives that drove a 50% hourly rate uplift across key accounts.</p>
              <p className="founder-p">Specialises in translating business problems into technical solutions. The bridge between what a business needs and what an AI system should actually do.</p>
              <p className="founder-quote">"I've spent a decade selling technology. Now I help companies actually use it."</p>
              <a href="https://www.linkedin.com/in/filip-paplaczyk/" target="_blank" rel="noopener noreferrer" className="link-cta-light" style={{ display: 'inline-block', marginTop: 16 }}>LinkedIn →</a>
            </div>
            <div>
              <div className="founder-avatar" style={{ color: 'var(--accent)' }}>Ł</div>
              <h3 className="founder-name">Łukasz</h3>
              <p className="founder-role">Co-Founder · Technology</p>
              <p className="founder-p">Blockchain and AI systems architect. Has built production systems across Ethereum, Algorand, Alephium, and Bitcoin — including the first AI developer tooling for Bitcoin.</p>
              <p className="founder-p">Focused on reliability, security, and deployments that scale. Zero security exploits across all systems built.</p>
              <p className="founder-p">The reason clients come back: because what he builds doesn't break.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-h2">Work with us</h2>
          <p className="cta-sub">We keep the team small and the work specific. If that sounds like a fit, let's talk.</p>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>Get in touch →</Link>
        </div>
      </section>
    </>
  )
}
