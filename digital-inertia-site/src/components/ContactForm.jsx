import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initial = { name: '', email: '', company: '', teamSize: '', message: '' };

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your work email.';
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.company.trim()) next.company = 'Please enter your company name.';
    if (!values.message.trim()) next.message = 'Tell us a little about your business.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setValues(initial);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        className="form-status form-status--success"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'inline-flex', padding: '0.8rem', background: '#f1f5f9', borderRadius: '50%', marginBottom: '1rem', color: '#1e293b' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3>Inquiry Received</h3>
        <p>Thank you for reaching out. A Senior Partner from Digital Inertia will review your details and respond within 1 business day.</p>
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')} style={{ marginTop: '1rem' }}>
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h3>Request Strategic Consultation</h3>
        <p>Tell us where your business has stalled. Direct response within 24 hours.</p>
      </div>

      <div className="form-row">
        <label htmlFor="name">
          Name<span aria-hidden="true">*</span>
          <input id="name" placeholder="Alexander Wright" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <span id="name-error" className="form-error">{errors.name}</span>}
        </label>

        <label htmlFor="email">
          Work Email<span aria-hidden="true">*</span>
          <input id="email" type="email" placeholder="alex@company.com" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
          {errors.email && <span id="email-error" className="form-error">{errors.email}</span>}
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="company">
          Company Name<span aria-hidden="true">*</span>
          <input id="company" placeholder="Acme Technologies" value={values.company} onChange={set('company')} aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} />
          {errors.company && <span id="company-error" className="form-error">{errors.company}</span>}
        </label>

        <label htmlFor="teamSize">
          Team Size
          <select id="teamSize" value={values.teamSize} onChange={set('teamSize')}>
            <option value="">Select organizational scale</option>
            <option value="1-10">1–10 employees</option>
            <option value="11-50">11–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="200+">200+ enterprise</option>
          </select>
        </label>
      </div>

      <label htmlFor="message">
        How can we help unblock your momentum?<span aria-hidden="true">*</span>
        <textarea id="message" rows="4" placeholder="Describe your current bottleneck, technology stack, or target sales objectives..." value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
        {errors.message && <span id="message-error" className="form-error">{errors.message}</span>}
      </label>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            className="form-status form-status--error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Something went wrong submitting your request. Please try again or email us directly.
          </motion.p>
        )}
      </AnimatePresence>

      <button type="submit" className="btn btn--accent" disabled={status === 'loading'}>
        {status === 'loading' ? 'Transmitting Request…' : 'Submit Consultation Request'}
      </button>
    </form>
  );
}
