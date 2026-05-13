import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-base text-accent font-body">
      {/* NAV */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-base/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="8" cy="8" r="2.5" fill="#F2A65A"/>
                <circle cx="24" cy="8" r="2.5" fill="#E0EAFF" opacity="0.6"/>
                <circle cx="8" cy="24" r="2.5" fill="#E0EAFF" opacity="0.6"/>
                <circle cx="24" cy="24" r="2.5" fill="#F2A65A" opacity="0.8"/>
                <circle cx="16" cy="16" r="3" fill="#E0EAFF"/>
                <line x1="8" y1="8" x2="16" y2="16" stroke="#F2A65A" strokeWidth="0.75" opacity="0.6"/>
                <line x1="24" y1="8" x2="16" y2="16" stroke="#E0EAFF" strokeWidth="0.75" opacity="0.4"/>
                <line x1="8" y1="24" x2="16" y2="16" stroke="#E0EAFF" strokeWidth="0.75" opacity="0.4"/>
                <line x1="24" y1="24" x2="16" y2="16" stroke="#F2A65A" strokeWidth="0.75" opacity="0.5"/>
                <line x1="8" y1="8" x2="24" y2="8" stroke="#E0EAFF" strokeWidth="0.5" opacity="0.2"/>
                <line x1="8" y1="8" x2="8" y2="24" stroke="#E0EAFF" strokeWidth="0.5" opacity="0.2"/>
                <line x1="24" y1="8" x2="24" y2="24" stroke="#E0EAFF" strokeWidth="0.5" opacity="0.2"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-accent tracking-tight group-hover:text-white transition-colors">
              AI Collab
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-body transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-accent/60 hover:text-accent'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2.5 bg-cta text-base text-sm font-display font-semibold rounded-full hover:bg-cta/90 transition-all duration-200 hover:scale-105"
            >
              Start a project →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface border-t border-white/5"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `text-base font-body transition-colors ${isActive ? 'text-white' : 'text-accent/70'}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-2 px-5 py-3 bg-cta text-base text-sm font-display font-semibold rounded-full text-center"
                >
                  Start a project →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-surface border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="font-display font-semibold text-lg text-accent">AI Collab</span>
              </Link>
              <p className="text-accent/50 text-sm leading-relaxed">
                Intelligence, deployed.<br />
                Custom AI agents and automation for businesses that need outcomes, not experiments.
              </p>
            </div>
            <div>
              <p className="text-accent/30 text-xs uppercase tracking-widest mb-4">Navigation</p>
              <div className="flex flex-col gap-3">
                {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to} className="text-accent/60 text-sm hover:text-accent transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-accent/30 text-xs uppercase tracking-widest mb-4">Contact</p>
              <a href="mailto:info@aicollab.com" className="text-accent/60 text-sm hover:text-accent transition-colors block mb-2">
                info@aicollab.com
              </a>
              <a
                href="https://www.linkedin.com/company/blockchain-collab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/60 text-sm hover:text-accent transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-accent/30 text-xs">© 2026 AI Collab. All rights reserved.</p>
            <p className="text-accent/20 text-xs">Built by the team behind Blockchain Collab</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
