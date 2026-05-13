import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'

const cases = [
  {
    tag: 'AI Developer Tooling', client: 'Alephium Foundation',
    title: 'Henry Coder',
    headline: 'An AI that writes code — 1,000+ developers use it every month.',
    desc: 'The Alephium Foundation needed to lower the barrier to building on their blockchain. We built Henry Coder: an AI-powered smart contract translator and development tool that converts Solidity to Ralph, generates templates, and explains complex code in plain language.',
    aiLabel: 'AI-powered developer tooling',
    results: [
      { val: '87%', lbl: 'reduction in smart contract creation time' },
      { val: '1,000+', lbl: 'active monthly users' },
      { val: '1st', lbl: 'AI smart contract translator for Ralph' },
    ],
  },
  {
    tag: 'Privacy Infrastructure', client: 'ZAMA',
    title: 'ZAMA Auction Platform',
    headline: 'Most-used app on Ethereum during peak days.',
    desc: 'ZAMA needed a production-grade auction platform built on fully homomorphic encryption (FHE) — computation on encrypted data, never decrypted. We designed and shipped an auction system that handled real transactions at scale while keeping all bids mathematically private.',
    aiLabel: 'Privacy-preserving computation at scale',
    results: [
      { val: '$121.3M', lbl: 'total value shielded' },
      { val: '11,000+', lbl: 'unique bidders' },
      { val: '#1', lbl: 'most-used app on Ethereum during peak days' },
    ],
  },
  {
    tag: 'DeFi Protocol', client: 'Alephium ecosystem',
    title: 'AYIN DEX',
    headline: 'First-of-kind infrastructure. 50,000 users at peak.',
    desc: 'We built the first decentralised exchange on the Alephium blockchain from scratch — AMM logic, liquidity pool architecture, and the full user-facing interface. No forks. No templates. Everything designed for a new chain.',
    aiLabel: 'AI-assisted smart contract architecture',
    results: [
      { val: '$10M', lbl: 'peak total value locked' },
      { val: '50,000', lbl: 'users at peak' },
      { val: '1st', lbl: 'DEX on Alephium' },
    ],
  },
]

export default function Work() {
  return (
    <>
      <div className="page-hero">
        <div className="orb-field" style={{ opacity: 0.35 }}>
          <div className="orb orb-1" />
          <div className="orb orb-3" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <span className="eyebrow">Selected work</span>
            <h1 className="page-h1">Production systems.<br /><em>Real results.</em></h1>
            <p className="page-sub">Every project below is live, measurable, and built by our team from the ground up.</p>
          </FadeIn>
        </div>
      </div>

      <section className="section section-white">
        <div className="container">
          {cases.map(c => (
            <FadeIn key={c.title}>
              <div className="work-item">
                <div className="work-meta">
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span className="case-tag">{c.tag}</span>
                    <span style={{ padding: '4px 12px', background: 'var(--ink10)', borderRadius: 100, fontSize: 11, fontWeight: 600, color: 'var(--ink60)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.client}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--ink40)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{c.aiLabel}</span>
                </div>
                <div className="work-body">
                  <div>
                    <h2 className="work-h2">{c.title}</h2>
                    <p className="work-headline">{c.headline}</p>
                    <p className="body">{c.desc}</p>
                  </div>
                  <div>
                    <p className="results-heading">Results</p>
                    {c.results.map(r => (
                      <div key={r.lbl} className="result-row">
                        <span className="result-val">{r.val}</span>
                        <span className="result-lbl">{r.lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section section-warm">
        <div className="container">
          <FadeIn>
            <div className="cta-block">
              <h2 className="cta-h2">Want results like these?</h2>
              <p className="cta-sub">Tell us what you're building. We'll tell you how to make it work.</p>
              <Link to="/contact" className="btn-white">Start a project →</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
