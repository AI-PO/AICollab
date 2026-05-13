import { Link } from 'react-router-dom'

const cases = [
  {
    tag: 'AI Developer Tooling', client: 'Alephium Foundation',
    title: 'Henry Coder',
    headline: 'An AI that writes code — 1,000+ developers use it every month.',
    desc: 'The Alephium Foundation needed to lower the barrier to building on their blockchain. We built Henry Coder: an AI-powered smart contract translator and development tool that converts Solidity to Ralph, generates contract templates, and explains complex code in plain language.',
    aiLabel: 'AI-powered developer tooling',
    results: [
      { value: '87%', label: 'reduction in smart contract creation time' },
      { value: '1,000+', label: 'active monthly users' },
      { value: '1st', label: 'AI smart contract translator for Ralph' },
    ],
  },
  {
    tag: 'Privacy Infrastructure', client: 'ZAMA',
    title: 'ZAMA Auction Platform',
    headline: 'Most-used app on Ethereum during peak days. Built for privacy, scaled for volume.',
    desc: 'ZAMA needed a production-grade auction platform built on fully homomorphic encryption (FHE) — a technology that allows computation on encrypted data without ever decrypting it. We designed and shipped an auction system that handled real transactions at scale while keeping all bids mathematically private.',
    aiLabel: 'Privacy-preserving computation at scale',
    results: [
      { value: '$121.3M', label: 'total value shielded' },
      { value: '11,000+', label: 'unique bidders' },
      { value: '#1', label: 'most-used app on Ethereum during peak days' },
    ],
  },
  {
    tag: 'DeFi Protocol', client: 'Alephium ecosystem',
    title: 'AYIN DEX',
    headline: 'First-of-kind infrastructure. 50,000 users at peak.',
    desc: 'We built the first decentralised exchange on the Alephium blockchain from scratch — including the AMM logic, liquidity pool architecture, and the full user-facing interface. No forks. No templates. Everything designed for a new chain.',
    aiLabel: 'AI-assisted smart contract architecture',
    results: [
      { value: '$10M', label: 'peak total value locked' },
      { value: '50,000', label: 'users at peak' },
      { value: '1st', label: 'DEX on Alephium' },
    ],
  },
]

export default function Work() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <p className="page-label">Selected work</p>
          <h1 className="page-h1">Production systems.<br />Real results.</h1>
          <p className="page-sub">Every project below is live, measurable, and built by our team from the ground up.</p>
        </div>
      </div>

      <section className="section-dark" style={{ paddingTop: 0 }}>
        <div className="container">
          {cases.map(c => (
            <div key={c.title} className="case-row">
              <div className="case-row-meta">
                <div className="case-row-tags">
                  <span className="case-pill">{c.tag}</span>
                  <span className="case-pill">{c.client}</span>
                </div>
                <span className="case-ai-label">{c.aiLabel}</span>
              </div>
              <div className="case-row-body">
                <div>
                  <h2 className="case-row-h2">{c.title}</h2>
                  <p className="case-row-headline">{c.headline}</p>
                  <p className="case-row-p">{c.desc}</p>
                </div>
                <div>
                  <p className="results-label">Results</p>
                  {c.results.map(r => (
                    <div key={r.label} className="result-item">
                      <span className="result-value">{r.value}</span>
                      <span className="result-label">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-h2">Want results like these?</h2>
          <p className="cta-sub">Tell us what you're building. We'll tell you how to make it work.</p>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>Start a project →</Link>
        </div>
      </section>
    </>
  )
}
