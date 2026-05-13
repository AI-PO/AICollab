import { Link } from 'react-router-dom'

const services = [
  {
    num: '01', title: 'AI Agents', color: 'var(--cta)',
    tagline: 'Not generic chatbots. Agents that know your business and act on it.',
    desc: 'We build custom autonomous agents designed around your specific workflows. They prospect leads, triage support tickets, synthesise research, generate content, and handle decisions — without being asked twice.',
    useCases: ['Sales prospecting & outreach', 'Support triage & escalation', 'Research synthesis', 'Content operations', 'Internal knowledge retrieval'],
  },
  {
    num: '02', title: 'Document & Idea Flow', color: 'var(--accent)',
    tagline: 'Stop managing documents. Let the documents manage themselves.',
    desc: 'Most business friction lives in how information moves. We map your document lifecycle — intake, processing, review, output, archive — and automate every handoff. Contracts, proposals, meeting notes, briefs: all flowing without manual intervention.',
    useCases: ['Contract review pipelines', 'Proposal generation', 'Meeting-to-action flows', 'Knowledge base automation', 'Multi-step approval routing'],
  },
  {
    num: '03', title: 'Business Integration', color: 'var(--cta)',
    tagline: 'Plug AI into what you already use.',
    desc: "We don't replace your tools. We make them intelligent. Whether your stack is HubSpot, Salesforce, Notion, Slack, or a custom ERP — we connect AI into it without disrupting what's working.",
    useCases: ['CRM enrichment & automation', 'ERP data processing', 'Slack & email intelligence', 'Internal wiki augmentation', 'Cross-tool workflow automation'],
  },
  {
    num: '04', title: 'AI Strategy & Audit', color: 'var(--accent)',
    tagline: 'Know exactly where AI will make the biggest difference — before you spend a cent.',
    desc: "For companies that don't know where to start. We map your operations, interview your team, identify the highest-ROI AI opportunities, and deliver a deployment roadmap with clear priorities, timelines, and cost estimates.",
    useCases: ['Operations mapping', 'AI opportunity scoring', 'Deployment roadmap', 'Build vs. buy analysis', 'Team readiness assessment'],
  },
]

export default function Services() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <p className="page-label">Services</p>
          <h1 className="page-h1">Four ways to deploy intelligence</h1>
          <p className="page-sub">Every engagement is scoped, built, and deployed specifically for your business. No templates. No off-the-shelf products dressed up as custom work.</p>
        </div>
      </div>

      <section className="section-dark" style={{ paddingTop: 0 }}>
        <div className="container">
          {services.map(s => (
            <div key={s.num} className="service-row">
              <div>
                <div className="service-row-num">{s.num}</div>
                <h2 className="service-row-h2">{s.title}</h2>
                <p className="service-row-tagline" style={{ color: s.color }}>{s.tagline}</p>
                <p className="service-row-p">{s.desc}</p>
              </div>
              <div>
                <p className="use-cases-label">Use cases</p>
                <ul className="use-case-list">
                  {s.useCases.map(uc => (
                    <li key={uc}><span className="use-case-dot" />{uc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-h2">Not sure which service fits?</h2>
          <p className="cta-sub">Start with a conversation. We'll figure it out together.</p>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>Talk to us →</Link>
        </div>
      </section>
    </>
  )
}
