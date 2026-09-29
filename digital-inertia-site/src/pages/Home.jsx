import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import StatCounter from '../components/StatCounter.jsx';
import ContactForm from '../components/ContactForm.jsx';
import {
  hero,
  stats,
  mainService,
  services,
  purpose,
  process,
  mission,
  contactIntro,
} from '../data/content.js';

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const wordChild = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  return (
    <>
      {/* ---------- HERO SECTION WITH IMAGE ---------- */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {hero.eyebrow}
            </motion.div>

            <motion.h1 initial="hidden" animate="visible" variants={wordVariants}>
              {hero.headline.split(' ').map((word, i) => (
                <motion.span key={i} variants={wordChild} className="word">
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {hero.sub}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <a href="#contact" className="btn btn--accent">
                {hero.cta}
              </a>
              <a href="#services" className="btn btn--outline">
                Explore Services
              </a>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="hero-trust-item">
                <span className="hero-trust-val">Est. 2017</span>
                <span className="hero-trust-lbl">Chennai Headquarters</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-val">100,000+</span>
                <span className="hero-trust-lbl">Student Career Path</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-val">5 Steps</span>
                <span className="hero-trust-lbl">Precision Methodology</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="img-card">
              <img
                src="/images/hero-consultancy.jpg"
                alt="Digital Inertia executive team formulating strategic digital growth roadmaps"
                loading="eager"
              />
              <div className="img-overlay-badge">
                <div>
                  <h4>Executive Strategic Advisory</h4>
                  <p>Diagnosing organizational inertia & unlocking scale</p>
                </div>
                <span className="img-overlay-tag">Active Growth</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- STATS STRIP ---------- */}
      <section className="section stats-strip">
        <div className="stats-grid">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ---------- MAIN SERVICE (VISIBILITY & SALES) WITH IMAGE ---------- */}
      <section className="section section--split">
        <Reveal className="split">
          <div>
            <span className="eyebrow">{mainService.tag}</span>
            <h2>{mainService.title}</h2>
            <p style={{ fontSize: '1.12rem', lineHeight: '1.7', color: 'var(--ink)' }}>
              {mainService.body}
            </p>
            <p>
              We combine enterprise performance analytics, conversion-focused funnel architecture,
              and organic visibility loops so your company never has to wonder where its next deal is coming from.
            </p>
            <a href="#services" className="link-arrow">
              View all 7 core capabilities &rarr;
            </a>
          </div>

          <div className="feature-frame">
            <img
              src="/images/growth-analytics.jpg"
              alt="High precision financial and revenue growth analytics dashboard"
              loading="lazy"
            />
            <div className="feature-pill">
              <span className="feature-pill-dot" />
              Live Pipeline Intelligence
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- FULL SERVICES GRID ---------- */}
      <section id="services" className="section section--dark">
        <Reveal>
          <span className="eyebrow eyebrow--light">What We Deliver</span>
          <div className="services-header">
            <h2>A unified enterprise architecture for growth, not disconnected fixes.</h2>
            <p>
              Every engagement integrates strategy, brand identity, custom engineering, and performance marketing.
            </p>
          </div>
        </Reveal>

        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className={`service-card ${s.featured ? 'service-card--featured' : ''}`}>
                <span className="service-card-num">0{i + 1} // CAPABILITY</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- PURPOSE SECTION ---------- */}
      <section className="section">
        <Reveal className="split">
          <div>
            <span className="eyebrow">{purpose.tag}</span>
            <h2>{purpose.title}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              {purpose.body}
            </p>
          </div>
          <div className="feature-frame">
            <img
              src="/images/corporate-hq.jpg"
              alt="Digital Inertia modern consultation center and Chennai corporate headquarters"
              loading="lazy"
            />
            <div className="img-overlay-badge">
              <div>
                <h4>Chennai Headquarters</h4>
                <p>Strategic advisory center & executive client lounge</p>
              </div>
              <span className="img-overlay-tag">HQ</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- METHODOLOGY (PROCESS) ---------- */}
      <section className="section section--dark">
        <Reveal>
          <span className="eyebrow eyebrow--light">Our Method</span>
          <h2>Five steps to break inertia, in strict sequence.</h2>
        </Reveal>

        <ol className="process-list">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.07}>
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

      {/* ---------- SOCIAL MISSION WITH IMAGE ---------- */}
      <section className="section section--mission">
        <Reveal className="split">
          <div className="feature-frame">
            <img
              src="/images/student-mission.jpg"
              alt="Digital Inertia student engineering innovation lab and career accelerator"
              loading="lazy"
            />
            <div className="feature-pill">
              <span className="feature-pill-dot" />
              1,00,000 Employment Initiative
            </div>
          </div>

          <div>
            <span className="eyebrow">{mission.tag}</span>
            <h2>{mission.title}</h2>
            <p style={{ fontSize: '1.08rem', lineHeight: '1.7' }}>
              {mission.body}
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/contact" className="btn btn--outline">
                {mission.cta}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- CONTACT SECTION ---------- */}
      <section id="contact" className="section section--split">
        <Reveal className="split">
          <div>
            <span className="eyebrow">{contactIntro.eyebrow}</span>
            <h2>{contactIntro.title}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              {contactIntro.body}
            </p>

            <div className="contact-details-card" style={{ marginTop: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Consultancy Engagement Standards
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: 'var(--muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Confidential strategic assessment
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Senior Partner direct diagnostic review
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Response delivered within 1 business day
                </li>
              </ul>
            </div>
          </div>

          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
