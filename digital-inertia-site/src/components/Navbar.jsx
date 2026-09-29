import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { nav, company } from '../data/content.js';
import { useAuth } from '../context/AuthContext.jsx';
import companyLogo from '../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label={`${company.name} home`}>
          <img src={companyLogo} alt="Digital Inertia Logo" className="nav-logo-img" />
          <div className="nav-logo-text">
            <span>Digital</span> Inertia
          </div>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                isActive && !item.to.includes('#') ? 'nav-link nav-link--active' : 'nav-link'
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}

          {/* User Portal Link or Login */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link
                to={user.role === 'hr' ? '/hr-portal' : '/candidate-portal'}
                className="btn btn--outline"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
              >
                {user.role === 'hr' ? 'HR Suite' : 'Candidate Portal'}
              </Link>
              <button
                type="button"
                className="btn btn--ghost"
                style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
                onClick={logout}
                title="Sign out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link" style={{ fontWeight: 600 }}>
              Portal Login
            </Link>
          )}

          <Link to="/contact" className="btn btn--accent nav-cta">
            Get Started
          </Link>
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="nav-mobile" aria-label="Mobile">
          {nav.map((item) => (
            <NavLink key={item.label} to={item.to} className="nav-mobile-link" end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <Link
                to={user.role === 'hr' ? '/hr-portal' : '/candidate-portal'}
                className="nav-mobile-link"
                style={{ fontWeight: 600 }}
              >
                {user.role === 'hr' ? 'Access HR Suite' : 'My Candidate Portal'}
              </Link>
              <button
                type="button"
                className="nav-mobile-link"
                style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}
                onClick={logout}
              >
                Sign Out ({user.email})
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-mobile-link" style={{ fontWeight: 600 }}>
              Portal Login (Candidate / HR)
            </Link>
          )}

          <Link to="/contact" className="btn btn--accent nav-mobile-cta">
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
