import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-dot" />
            AI Collab
          </Link>
          <ul className="nav-links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="nav-cta nav-cta-desktop">Start a project →</Link>
          <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : '' }} />
          </button>
        </div>
        <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
          ))}
          <Link to="/contact" className="nav-cta nav-mobile-cta">Start a project →</Link>
        </div>
      </nav>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">AI Collab</div>
              <p className="footer-desc">Intelligence, deployed. Custom AI agents, automation, and document flows for businesses that need outcomes, not experiments.</p>
            </div>
            <div>
              <p className="footer-col-label">Navigation</p>
              <div className="footer-links">
                {links.map(({ to, label }) => <Link key={to} to={to}>{label}</Link>)}
              </div>
            </div>
            <div>
              <p className="footer-col-label">Contact</p>
              <div className="footer-links">
                <a href="mailto:info@aicollab.com">info@aicollab.com</a>
                <a href="https://www.linkedin.com/company/blockchain-collab/" target="_blank" rel="noopener noreferrer">LinkedIn →</a>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>Poland · Working globally</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 AI Collab. All rights reserved.</span>
            <span className="footer-copy">Built by the team behind Blockchain Collab</span>
          </div>
        </div>
      </footer>
    </>
  )
}
