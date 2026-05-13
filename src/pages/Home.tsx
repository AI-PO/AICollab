import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NodeBackground from '../components/NodeBackground'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const services = [
  {
    icon: '⬡',
    title: 'AI Agents',
    desc: 'Autonomous agents built for your workflows — sales, ops, support, research.',
  },
  {
    icon: '⬡',
    title: 'Business Integration',
    desc: 'Connect AI into your existing stack. CRM, ERP, Slack, email. No rip-and-replace.',
  },
  {
    icon: '⬡',
    title: 'Doc & Idea Flow',
    desc: 'Automate how information moves through your organisation. Intake to archive.',
  },
]

const serviceCards = [
  {
    number: '01',
    title: 'AI Agents',
    outcome: 'Replace repetitive decisions with agents that act on your behalf, 24/7.',
  },
  {
    number: '02',
    title: 'Document Flow',
    outcome: 'Stop managing documents. Let the documents manage themselves.',
  },
  {
    number: '03',
    title: 'Business Integration',
    outcome: 'Plug AI into what you already use. No new tools required.',
  },
  {
    number: '04',
    title: 'AI Strategy & Audit',
    outcome: 'Know exactly where AI makes the biggest difference before you spend a cent.',
  },
]

const stats = [
  { value: '$50M+', label: 'in value processed across client deployments' },
  { value: '80K+', label: 'monthly active users on platforms we\'ve built' },
  { value: '0', label: 'security incidents across all deployments' },
  { value: '6+', label: 'years shipping production systems' },
]

const caseStudies = [
  {
    tag: 'AI Developer Tooling',
    title: 'Henry Coder',
    result: '87% reduction in development time. 1,000+ developers using it monthly.',
    detail: 'Built an AI that writes code — and developers adopted it immediately.',
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
        <NodeBackground />

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(242,166,90,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 rounded-full border border-cta/30 text-cta text-xs font-display tracking-widest uppercase">
                Intelligence, deployed.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-accent leading-[0.95] tracking-tight"
            >
              We build AI<br />
              <span className="text-gradient-cta">that works.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-accent/60 text-lg md:text-xl font-body leading-relaxed"
            >
              Custom AI agents, automation, and document flows built for how your business
              actually runs. Not demos. Not prototypes. Deployed and running.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                to="/work"
                className="px-8 py-3.5 rounded-full border border-accent/20 text-accent text-sm font-display font-medium hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
              >
                See our work
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-cta text-base text-sm font-display font-semibold hover:bg-cta/90 transition-all duration-200 hover:scale-105"
              >
                Start a project →
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="text-accent/30 text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-accent/30 to-transparent"
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            <motion.div variants={fadeUp}>
              <p className="text-base/40 text-xs uppercase tracking-widest mb-4 font-display">What we do</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-base leading-tight">
                Your team is brilliant.<br />
                <span style={{ color: '#c47830' }}>They shouldn't be doing this.</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="pt-2">
              <p className="text-base/70 text-lg leading-relaxed mb-8">
                AI Collab builds the agents and automation that handle repetitive work — so your
                people focus on what actually needs them. We deploy, integrate, and maintain
                everything. You get outcomes.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-display font-medium text-base/70 hover:text-base transition-colors border-b border-base/20 pb-0.5"
                style={{ color: '#c47830' }}
              >
                Explore all services →
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-base/10 bg-white hover:border-base/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-base/5 flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-sm bg-base/20" />
                </div>
                <h3 className="font-display font-semibold text-xl text-base mb-3">{s.title}</h3>
                <p className="text-base/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="bg-base py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-accent/30 text-xs uppercase tracking-widest mb-4 font-display">Services</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-accent leading-tight max-w-xl">
                Four ways we deploy AI into your business
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {serviceCards.map((card) => (
                <motion.div
                  key={card.number}
                  variants={fadeUp}
                  className="bg-surface p-10 hover:bg-white/[0.03] transition-colors duration-300 group"
                >
                  <span className="text-accent/20 font-display text-sm tracking-widest">{card.number}</span>
                  <h3 className="font-display font-semibold text-2xl text-accent mt-4 mb-3 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-accent/50 text-sm leading-relaxed mb-6">{card.outcome}</p>
                  <Link
                    to="/services"
                    className="text-cta text-sm font-display hover:text-cta/80 transition-colors"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-surface border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s) => (
              <motion.div key={s.value} variants={fadeUp} className="text-center md:text-left">
                <p className="font-display font-bold text-3xl md:text-4xl text-cta mb-2">{s.value}</p>
                <p className="text-accent/40 text-xs leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY TEASER */}
      <section className="bg-base py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-accent/30 text-xs uppercase tracking-widest mb-4 font-display">Selected work</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-accent leading-tight">
                  Production systems.<br />Real results.
                </h2>
              </div>
              <Link
                to="/work"
                className="text-cta text-sm font-display hover:text-cta/80 transition-colors shrink-0"
              >
                View all work →
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((cs) => (
                <motion.div
                  key={cs.title}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl bg-surface border border-white/5 p-10 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cta/5 -translate-y-16 translate-x-16 group-hover:bg-cta/10 transition-colors duration-500" />
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-accent/50 text-xs font-display mb-6">
                    {cs.tag}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-accent mb-3">{cs.title}</h3>
                  <p className="text-cta text-sm font-display font-medium mb-4">{cs.result}</p>
                  <p className="text-accent/50 text-sm leading-relaxed">{cs.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-surface border-t border-white/5 py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-accent/30 text-xs uppercase tracking-widest mb-6 font-display">
              Ready to start
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-6xl text-accent leading-tight mb-8">
              Ready to put AI<br />
              <span className="text-gradient-cta">to work?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-accent/50 text-lg mb-10 leading-relaxed">
              Tell us what you're trying to solve. We'll tell you exactly how AI can solve it.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 rounded-full bg-cta text-base font-display font-semibold text-base hover:bg-cta/90 transition-all duration-200 hover:scale-105"
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
