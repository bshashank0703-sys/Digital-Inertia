import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { aboutIntro, coreFocus, process, mission } from '../data/content.js';

export default function About() {
  return (
    <>
      {/* ---------- ABOUT PAGE HERO WITH IMAGE ---------- */}
      <section className="section section--page-hero">
        <div className="about-hero-grid">
          <Reveal>
            <span className="eyebrow">{aboutIntro.eyebrow}</span>
            <h1>{aboutIntro.title}</h1>
            <p className="hero-sub" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
              {aboutIntro.body}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <Link to="/contact" className="btn btn--accent">
                Work With Us
              </Link>
              <a href="#method" className="btn btn--outline">
                Our Methodology
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="feature-frame">
              <img
                src="/images/corporate-hq.jpg"
                alt="Digital Inertia modern corporate headquarters in Chennai, India"
                loading="eager"
              />
              <div className="img-overlay-badge">
                <div>
                  <h4>Chennai Headquarters</h4>
                  <p>Established 2017 &middot; Strategic Consultancy</p>
                </div>
                <span className="img-overlay-tag">HQ</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CORE FOCUS WITH STRATEGIC TEAM IMAGE ---------- */}
      <section className="section section--split" style={{ borderTop: '1px solid var(--line)' }}>
        <Reveal className="split">
          <div className="feature-frame">
            <img
              src="/images/hero-consultancy.jpg"
              alt="Digital Inertia advisory partners working across branding, visibility and performance"
              loading="lazy"
            />
            <div className="feature-pill">
              <span className="feature-pill-dot" />
              Integrated Systems Architecture
            </div>
          </div>

          <div>
            <span className="eyebrow">{coreFocus.tag}</span>
            <h2>{coreFocus.title}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              {coreFocus.body}
            </p>
            <p>
              Rather than treating marketing, engineering, and sales operations as separate silos,
              we engineer them into a synchronized flywheel that steadily compounds enterprise value.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- OUR METHODOLOGY ---------- */}
      <section id="method" className="section section--dark">
        <Reveal>
          <span className="eyebrow eyebrow--light">Our Method</span>
          <h2>How we diagnose and dismantle corporate inertia.</h2>
          <p>
            A disciplined, iterative framework deployed across our client engagements since 2017.
          </p>
        </Reveal>

        <ol className="process-list">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <li>
                <span className="process-step">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------- SOCIAL MISSION WITH ACADEMY IMAGE ---------- */}
      <section className="section section--mission">
        <Reveal className="split">
          <div>
            <span className="eyebrow">{mission.tag}</span>
            <h2>{mission.title}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              {mission.body}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/contact" className="btn btn--outline">
                {mission.cta}
              </Link>
            </div>
          </div>

          <div className="feature-frame">
            <img
              src="/images/student-mission.jpg"
              alt="Digital Inertia 100,000 students employment accelerator program in technology"
              loading="lazy"
            />
            <div className="img-overlay-badge">
              <div>
                <h4>Employment Guarantee Initiative</h4>
                <p>1,00,000 career transitions & digital empowerment</p>
              </div>
              <span className="img-overlay-tag">Social Impact</span>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
