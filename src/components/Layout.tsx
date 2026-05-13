import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'

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

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="8" cy="8" r="2.5" fill="#F2A65A"/>
              <circle cx="24" cy="8" r="2.5" fill="#E0EAFF" opacity="0.5"/>
              <circle cx="8" cy="24" r="2.5" fill="#E0EAFF" opacity="0.5"/>
              <circle cx="24" cy="24" r="2.5" fill="#F2A65A" opacity="0.7"/>
              <circle cx="16" cy="16" r="2.8" fill="#E0EAFF"/>
              <line x1="8" y1="8" x2="16" y2="16" stroke="#F2A65A" strokeWidth="0.8" opacity="0.6"/>
              <line x1="24" y1="8" x2="16" y2="16" stroke="#E0EAFF" strokeWidth="0.8" opacity="0.35"/>
              <line x1="8" y1="24" x2="16" y2="16" stroke="#E0EAFF" strokeWidth="0.8" opacity="0.35"/>
              <line x1="24" y1="24" x2="16" y2="16" stroke="#F2A65A" strokeWidth="0.8" opacity="0.5"/>
            </svg>
            AI Collab
          </Link>

          <ul className="nav-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="nav-cta nav-cta-desktop">Start a project →</Link>

          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : '' }} />
          </button>
        </div>

        <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to}>{label}</NavLink>
          ))}
          <Link to="/contact" className="nav-cta" style={{ textAlign: 'center', marginTop: 8 }}>
            Start a project →
          </Link>
        </div>
      </nav>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">AI Collab</div>
              <p className="footer-desc">
                Intelligence, deployed.<br />
                Custom AI agents and automation for businesses that need outcomes, not experiments.
              </p>
            </div>
            <div>
              <p className="footer-col-label">Navigation</p>
              <div className="footer-links">
                {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to}>{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="footer-col-label">Contact</p>
              <div className="footer-links">
                <a href="mailto:info@aicollab.com">info@aicollab.com</a>
                <a href="https://www.linkedin.com/company/blockchain-collab/" target="_blank" rel="noopener noreferrer">
                  LinkedIn →
                </a>
                <span style={{ color: 'rgba(224,234,255,0.3)', fontSize: 13 }}>Poland · Working globally</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 AI Collab. All rights reserved.</span>
            <span className="footer-copy">Built by the team behind Blockchain Collab</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
