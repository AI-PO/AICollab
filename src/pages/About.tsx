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

const values = [
  {
    title: 'Outcomes over experiments',
    desc: "We don't sell pilots. We build systems that are deployed, integrated, and delivering value before we close the project.",
  },
  {
    title: 'No rip-and-replace',
    desc: 'Your current stack works. We make it smarter — without disrupting what your team already knows.',
  },
  {
    title: 'Specificity over generality',
    desc: "Generic AI tools give generic results. Everything we build is designed for your workflows, your data, your edge cases.",
  },
]

export default function About() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-base pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="text-accent/30 text-xs uppercase tracking-widest mb-6 font-display">
              About
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display font-bold text-5xl md:text-7xl text-accent leading-tight max-w-4xl">
              We've been shipping AI systems since before it was obvious.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* STUDIO STORY */}
      <section className="bg-base pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-b border-white/5 pb-20"
          >
            <motion.div variants={fadeUp}>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-accent mb-6 leading-tight">
                The studio
              </h2>
              <div className="flex flex-col gap-4 text-accent/60 leading-relaxed">
                <p>
                  AI Collab builds custom AI agents, automation, and document flows for SMBs and enterprises. We deploy systems that work the way your business actually runs — not the way a demo assumes it does.
                </p>
                <p>
                  We're the same team behind Blockchain Collab, where we've shipped production systems with over $50M in value processed and 80,000+ monthly active users across multiple platforms. We built the first AI tooling for Bitcoin and the first AI smart contract translator for the Ralph language.
                </p>
                <p>
                  Based in Poland. Working globally. No fluff.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-accent mb-8 leading-tight">
                How we work
              </h2>
              <div className="flex flex-col gap-6">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <span className="w-1 h-1 rounded-full bg-cta flex-shrink-0 mt-2.5" />
                    <div>
                      <p className="font-display font-semibold text-accent text-sm mb-1">{v.title}</p>
                      <p className="text-accent/50 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* FOUNDERS */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="pt-20"
          >
            <motion.p variants={fadeUp} className="text-accent/30 text-xs uppercase tracking-widest mb-12 font-display">
              The founders
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              {/* Filip */}
              <motion.div variants={fadeUp}>
                <div className="w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl text-cta">FP</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-accent mb-1">Filip Paplaczyk</h3>
                <p className="text-accent/40 text-sm font-display mb-6">Co-Founder · Growth & Business</p>
                <div className="flex flex-col gap-3 text-accent/60 text-sm leading-relaxed">
                  <p>
                    10+ years in B2B enterprise sales — TraceLink, Tenable, Callstack, Ulam Labs. At Ulam Labs, led BD initiatives that drove a 50% hourly rate uplift across key accounts.
                  </p>
                  <p>
                    Specialises in translating business problems into technical solutions. The bridge between what a business needs and what an AI system should actually do.
                  </p>
                  <p className="text-accent/40 italic">
                    "I've spent a decade selling technology. Now I help companies actually use it."
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/filip-paplaczyk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-cta text-sm font-display hover:text-cta/80 transition-colors"
                >
                  LinkedIn →
                </a>
              </motion.div>

              {/* Łukasz */}
              <motion.div variants={fadeUp}>
                <div className="w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl text-accent">Ł</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-accent mb-1">Łukasz</h3>
                <p className="text-accent/40 text-sm font-display mb-6">Co-Founder · Technology</p>
                <div className="flex flex-col gap-3 text-accent/60 text-sm leading-relaxed">
                  <p>
                    Blockchain and AI systems architect. Has built production systems across Ethereum, Algorand, Alephium, and Bitcoin — including the first AI developer tooling for Bitcoin.
                  </p>
                  <p>
                    Focused on reliability, security, and deployments that scale. Zero security exploits across all systems built.
                  </p>
                  <p>
                    The reason clients come back: because what he builds doesn't break.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-white/5 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-accent mb-6">
              Work with us
            </motion.h2>
            <motion.p variants={fadeUp} className="text-accent/50 text-lg mb-10">
              We keep the team small and the work specific. If that sounds like a fit, let's talk.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="inline-block px-10 py-4 rounded-full bg-cta text-base font-display font-semibold hover:bg-cta/90 transition-all duration-200 hover:scale-105"
              >
                Get in touch →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
