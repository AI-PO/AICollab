import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cases = [
  {
    tag: 'AI Developer Tooling',
    client: 'Alephium Foundation',
    title: 'Henry Coder',
    headline: 'An AI that writes code — 1,000+ developers use it every month.',
    description:
      'The Alephium Foundation needed to lower the barrier to building on their blockchain. We built Henry Coder: an AI-powered smart contract translator and development tool that converts Solidity to Ralph, generates contract templates, and explains complex code in plain language.',
    results: [
      { value: '87%', label: 'reduction in smart contract creation time' },
      { value: '1,000+', label: 'active monthly users' },
      { value: '1st', label: 'AI smart contract translator for Ralph' },
    ],
    aiAngle: 'AI-powered developer tooling',
  },
  {
    tag: 'Privacy Infrastructure',
    client: 'ZAMA',
    title: 'ZAMA Auction Platform',
    headline: 'Most-used app on Ethereum during peak days. Built for privacy, scaled for volume.',
    description:
      'ZAMA needed a production-grade auction platform built on fully homomorphic encryption (FHE) — a technology that allows computation on encrypted data without ever decrypting it. We designed and shipped an auction system that handled real transactions at scale while keeping all bids mathematically private.',
    results: [
      { value: '$121.3M', label: 'total value shielded' },
      { value: '11,000+', label: 'unique bidders' },
      { value: '#1', label: 'most-used app on Ethereum during peak days' },
    ],
    aiAngle: 'Privacy-preserving computation at scale',
  },
  {
    tag: 'DeFi Protocol',
    client: 'Alephium ecosystem',
    title: 'AYIN DEX',
    headline: 'First-of-kind infrastructure. 50,000 users at peak.',
    description:
      'We built the first decentralised exchange on the Alephium blockchain from scratch — including the AMM logic, liquidity pool architecture, and the full user-facing interface. No forks. No templates. Everything designed for a new chain.',
    results: [
      { value: '$10M', label: 'peak total value locked' },
      { value: '50,000', label: 'users at peak' },
      { value: '1st', label: 'DEX on Alephium' },
    ],
    aiAngle: 'AI-assisted smart contract architecture',
  },
]

export default function Work() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-base pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="text-accent/30 text-xs uppercase tracking-widest mb-6 font-display">
              Selected work
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-bold text-5xl md:text-7xl text-accent leading-tight max-w-3xl">
              Production systems.<br />Real results.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-accent/50 text-xl mt-8 max-w-xl leading-relaxed">
              Every project below is live, measurable, and built by our team from the ground up.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-base pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-0">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className={`py-20 ${i < cases.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-accent/50 text-xs font-display">
                      {c.tag}
                    </span>
                    <span className="text-accent/30 text-xs font-display">{c.client}</span>
                  </div>
                  <span className="text-accent/20 text-xs font-display tracking-widest">
                    {c.aiAngle}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-accent mb-4 leading-tight">
                      {c.title}
                    </h2>
                    <p className="text-cta font-display text-lg font-medium mb-6 leading-snug">
                      {c.headline}
                    </p>
                    <p className="text-accent/50 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="lg:pt-4">
                    <p className="text-accent/30 text-xs uppercase tracking-widest mb-8 font-display">Results</p>
                    <div className="flex flex-col gap-6">
                      {c.results.map((r) => (
                        <div key={r.label} className="flex items-baseline gap-4 border-b border-white/5 pb-6">
                          <span className="font-display font-bold text-3xl text-cta shrink-0">{r.value}</span>
                          <span className="text-accent/50 text-sm leading-snug">{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-white/5 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-accent mb-6">
              Want results like these?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-accent/50 text-lg mb-10">
              Tell us what you're building. We'll tell you how to make it work.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 rounded-full bg-cta text-base font-display font-semibold hover:bg-cta/90 transition-all duration-200 hover:scale-105"
              >
                Start a project →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
