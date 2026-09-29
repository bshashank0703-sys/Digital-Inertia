import Reveal from '../components/Reveal.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { contactIntro, company } from '../data/content.js';

export default function Contact() {
  return (
    <section className="section section--page-hero">
      <Reveal className="split">
        <div>
          <span className="eyebrow">{contactIntro.eyebrow}</span>
          <h1>{contactIntro.title}</h1>
          <p className="hero-sub" style={{ fontSize: '1.18rem', lineHeight: '1.7' }}>
            {contactIntro.body}
          </p>

          {/* Contact Office & Image Card */}
          <div className="feature-frame" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <img
              src="/images/corporate-hq.jpg"
              alt="Digital Inertia Chennai headquarters consultation center"
              loading="eager"
            />
            <div className="img-overlay-badge">
              <div>
                <h4>Executive Consultation Center</h4>
                <p>{company.hq} &middot; Open Mon–Fri, 9:00 AM – 6:00 PM IST</p>
              </div>
              <span className="img-overlay-tag">Chennai</span>
            </div>
          </div>

          <div className="contact-details-card">
            <div className="contact-details-list">
              <div className="contact-details-item">
                <div className="contact-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-details-meta">
                  <span>Direct Communication</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </div>

              <div className="contact-details-item">
                <div className="contact-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-details-meta">
                  <span>Telephone Advisory</span>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                </div>
              </div>

              <div className="contact-details-item">
                <div className="contact-icon-box" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-details-meta">
                  <span>Principal Office</span>
                  <p>{company.hq}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </Reveal>
    </section>
  );
}
