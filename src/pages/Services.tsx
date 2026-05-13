import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const services = [
  {
    number: '01',
    title: 'AI Agents',
    tagline: 'Not generic chatbots. Agents that know your business and act on it.',
    description:
      'We build custom autonomous agents designed around your specific workflows. They prospect leads, triage support tickets, synthesise research, generate content, and handle decisions — without being asked twice.',
    useCases: ['Sales prospecting & outreach', 'Support triage & escalation', 'Research synthesis', 'Content operations', 'Internal knowledge retrieval'],
    accent: '#F2A65A',
  },
  {
    number: '02',
    title: 'Document & Idea Flow',
    tagline: 'Stop managing documents. Let the documents manage themselves.',
    description:
      'Most business friction lives in how information moves. We map your document lifecycle — intake, processing, review, output, archive — and automate every handoff. Contracts, proposals, meeting notes, briefs: all flowing without manual intervention.',
    useCases: ['Contract review pipelines', 'Proposal generation', 'Meeting-to-action flows', 'Knowledge base automation', 'Multi-step approval routing'],
    accent: '#E0EAFF',
  },
  {
    number: '03',
    title: 'Business Integration',
    tagline: "Plug AI into what you already use.",
    description:
      "We don't replace your tools. We make them intelligent. Whether your stack is HubSpot, Salesforce, Notion, Slack, or a custom ERP — we connect AI into it without disrupting what's working.",
    useCases: ['CRM enrichment & automation', 'ERP data processing', 'Slack & email intelligence', 'Internal wiki augmentation', 'Cross-tool workflow automation'],
    accent: '#F2A65A',
  },
  {
    number: '04',
    title: 'AI Strategy & Audit',
    tagline: 'Know exactly where AI will make the biggest difference — before you spend a cent.',
    description:
      "For companies that don't know where to start. We map your operations, interview your team, identify the highest-ROI AI opportunities, and deliver a deployment roadmap with clear priorities, timelines, and cost estimates.",
    useCases: ['Operations mapping', 'AI opportunity scoring', 'Deployment roadmap', 'Build vs. buy analysis', 'Team readiness assessment'],
    accent: '#E0EAFF',
  },
]

export default function Services() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-base pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="text-accent/30 text-xs uppercase tracking-widest mb-6 font-display">
              Services
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-bold text-5xl md:text-7xl text-accent leading-tight max-w-3xl">
              Four ways to deploy intelligence
            </motion.h1>
            <motion.p variants={fadeUp} className="text-accent/50 text-xl mt-8 max-w-2xl leading-relaxed">
              Every engagement is scoped, built, and deployed specifically for your business. No templates. No off-the-shelf products dressed up as custom work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="bg-base pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-0">
            {services.map((s, i) => (
              <motion.div
                key={s.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-20 ${
                  i < services.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div>
                  <span className="text-accent/20 font-display text-sm tracking-widest">{s.number}</span>
                  <h2 className="font-display font-bold text-4xl md:text-5xl text-accent mt-4 mb-4 leading-tight">
                    {s.title}
                  </h2>
                  <p className="font-display text-lg mb-6" style={{ color: s.accent }}>
                    {s.tagline}
                  </p>
                  <p className="text-accent/50 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="lg:pt-10">
                  <p className="text-accent/30 text-xs uppercase tracking-widest mb-6 font-display">Use cases</p>
                  <ul className="flex flex-col gap-3">
                    {s.useCases.map((uc) => (
                      <li key={uc} className="flex items-center gap-3 text-accent/60 text-sm">
                        <span className="w-1 h-1 rounded-full bg-cta flex-shrink-0" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-white/5 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-accent mb-6">
              Not sure which service fits?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-accent/50 text-lg mb-10">
              Start with a conversation. We'll figure it out together.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 rounded-full bg-cta text-base font-display font-semibold hover:bg-cta/90 transition-all duration-200 hover:scale-105"
              >
                Talk to us →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
