import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'

const services = [
  {
    num: '01', title: 'AI Agents', tagline: 'Not generic chatbots. Agents that know your business and act on it.',
    desc: 'We build custom autonomous agents designed around your specific workflows. They prospect leads, triage support tickets, synthesise research, generate content, and handle decisions — without being asked twice.',
    uses: ['Sales prospecting & outreach', 'Support triage & escalation', 'Research synthesis', 'Content operations', 'Internal knowledge retrieval'],
  },
  {
    num: '02', title: 'Document & Idea Flow', tagline: 'Stop managing documents. Let the documents manage themselves.',
    desc: 'Most business friction lives in how information moves. We map your document lifecycle and automate every handoff. Contracts, proposals, meeting notes, briefs: all flowing without manual intervention.',
    uses: ['Contract review pipelines', 'Proposal generation', 'Meeting-to-action flows', 'Knowledge base automation', 'Multi-step approval routing'],
  },
  {
    num: '03', title: 'Business Integration', tagline: 'Plug AI into what you already use.',
    desc: "We don't replace your tools. We make them intelligent. Whether your stack is HubSpot, Salesforce, Notion, Slack, or a custom ERP — we connect AI into it without disrupting what's working.",
    uses: ['CRM enrichment & automation', 'ERP data processing', 'Slack & email intelligence', 'Internal wiki augmentation', 'Cross-tool workflow automation'],
  },
  {
    num: '04', title: 'AI Strategy & Audit', tagline: 'Know exactly where AI makes the biggest difference — before you spend a cent.',
    desc: "For companies that don't know where to start. We map your operations, identify the highest-ROI AI opportunities, and deliver a deployment roadmap with clear priorities and cost estimates.",
    uses: ['Operations mapping', 'AI opportunity scoring', 'Deployment roadmap', 'Build vs. buy analysis', 'Team readiness assessment'],
  },
]

export default function Services() {
  return (
    <>
      <div className="page-hero">
        <div className="orb-field" style={{ opacity: 0.4 }}>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <span className="eyebrow">Services</span>
            <h1 className="page-h1">Four ways to deploy <em>intelligence</em></h1>
            <p className="page-sub">Every engagement is scoped, built, and deployed specifically for your business. No templates. No off-the-shelf products dressed up as custom work.</p>
          </FadeIn>
        </div>
      </div>

      <section className="section section-white">
        <div className="container">
          <div className="services-list">
            {services.map((s, i) => (
              <FadeIn key={s.num} delay={0.05}>
                <div className="service-item">
                  <div className="service-num">{s.num}</div>
                  <div>
                    <h2 className="h3" style={{ fontSize: 22, marginBottom: 8 }}>{s.title}</h2>
                    <p className="service-tagline">{s.tagline}</p>
                    <p className="body">{s.desc}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink40)', marginBottom: 16 }}>Use cases</p>
                    <ul className="use-list">
                      {s.uses.map(u => <li key={u}><span className="use-dot" />{u}</li>)}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="container">
          <FadeIn>
            <div className="cta-block">
              <h2 className="cta-h2">Not sure which service fits?</h2>
              <p className="cta-sub">Start with a conversation. We'll figure it out together.</p>
              <Link to="/contact" className="btn-white">Talk to us →</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
