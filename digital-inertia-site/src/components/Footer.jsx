import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { company, nav, footerCta } from '../data/content.js';
import companyLogo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <Reveal>
          <span className="eyebrow eyebrow--light">Take The Next Step</span>
          <h2>{footerCta.title}</h2>
          <p>{footerCta.body}</p>
          <Link to="/contact" className="btn btn--outline-light">
            {footerCta.cta}
          </Link>
        </Reveal>
      </div>

      <div className="footer-main">
        <div>
          <div className="footer-logo">
            <img src={companyLogo} alt="Digital Inertia Logo" className="footer-logo-img" />
            <div className="nav-logo-text">
              Digital <span style={{ color: 'var(--accent-silver)', fontSize: '0.85rem' }}>Strategic Consulting</span>
            </div>
          </div>
          <p className="footer-meta">
            {company.type}
            <br />
            Founded {company.founded} &middot; {company.hq}
          </p>
        </div>

        <div>
          <p className="footer-heading">Navigate</p>
          <ul>
            {nav.map((item) => (
              <li key={item.label}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/login" style={{ color: 'var(--accent-platinum)', fontWeight: 600 }}>Candidate & HR Portal &rarr;</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-heading">Contact</p>
          <ul>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
            </li>
            <li>{company.hq}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved. Strategic Digital Consultancy.
        </p>
      </div>
    </footer>
  );
}
