import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import { useJobs } from '../context/JobContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Careers() {
  const { jobs, submitApplication, getApplicationsForCandidate } = useJobs();
  const { user } = useAuth();

  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  // Application form state
  const [candidateName, setCandidateName] = useState(user?.name || '');
  const [candidateEmail, setCandidateEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | loading | success

  const departments = ['All', ...new Set(jobs.map((j) => j.department))];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch && job.status === 'active';
  });

  const candidateApplications = user ? getApplicationsForCandidate(user.email) : [];
  const appliedJobIds = new Set(candidateApplications.map((a) => a.jobId));

  const handleApplyClick = (job) => {
    setApplyingJob(job);
    setCandidateName(user?.name || '');
    setCandidateEmail(user?.email || '');
    setSubmitStatus('idle');
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateEmail.trim()) return;

    setSubmitStatus('loading');
    setTimeout(() => {
      submitApplication({
        jobId: applyingJob.id,
        jobTitle: applyingJob.title,
        candidateName,
        candidateEmail,
        phone: phone || '+91 98000 00000',
        experience: experience || '3+ Years',
        resumeUrl: resumeUrl || 'https://drive.google.com/file/sample-resume.pdf',
        portfolioUrl: portfolioUrl || 'https://linkedin.com/in/applicant',
        coverNote: coverNote || 'I am excited to bring my experience to Digital Inertia.',
      });
      setSubmitStatus('success');
    }, 700);
  };

  return (
    <div className="careers-page">
      {/* ---------- HERO SECTION ---------- */}
      <section className="section section--page-hero">
        <div className="about-hero-grid">
          <Reveal>
            <span className="eyebrow">Careers & Talent</span>
            <h1>Build The Future of Enterprise Momentum.</h1>
            <p className="hero-sub" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
              We partner with visionary companies to eliminate operational stagnation. 
              Join a team of strategic consultants, software engineers, and growth architects 
              solving fundamental business bottlenecks.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a href="#openings" className="btn btn--accent">
                Explore Open Positions ({filteredJobs.length})
              </a>
              {user?.role === 'candidate' ? (
                <Link to="/candidate-portal" className="btn btn--outline">
                  My Candidate Portal
                </Link>
              ) : user?.role === 'hr' ? (
                <Link to="/hr-portal" className="btn btn--outline">
                  HR Management Suite
                </Link>
              ) : (
                <Link to="/login" className="btn btn--outline">
                  Portal Login (Candidate / HR)
                </Link>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="feature-frame">
              <img
                src="/images/student-mission.jpg"
                alt="Digital Inertia engineering and consultancy team collaboration"
                loading="eager"
              />
              <div className="img-overlay-badge">
                <div>
                  <h4>High-Performance Culture</h4>
                  <p>Chennai HQ &middot; Collaborative &middot; Impact-Driven</p>
                </div>
                <span className="img-overlay-tag">We Are Hiring</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CULTURE VALUES ---------- */}
      <section className="section section--dark">
        <Reveal>
          <span className="eyebrow eyebrow--light">Our Principles</span>
          <h2>Why Top Talent Choose Digital Inertia</h2>
        </Reveal>

        <div className="services-grid" style={{ marginTop: '2rem' }}>
          <div className="service-card">
            <span className="service-card-num">01 // IMPACT</span>
            <h3>Direct Executive Access</h3>
            <p>Work directly alongside enterprise leadership and C-suite founders solving high-stakes challenges.</p>
          </div>
          <div className="service-card">
            <span className="service-card-num">02 // MASTERY</span>
            <h3>Modern Tooling & Autonomy</h3>
            <p>We discard outdated enterprise bureaucracy. You get full ownership over your technical decisions.</p>
          </div>
          <div className="service-card">
            <span className="service-card-num">03 // MISSION</span>
            <h3>Social Responsibility</h3>
            <p>Our work powers the 1,00,000 student employment initiative, bridging education directly with industry careers.</p>
          </div>
        </div>
      </section>

      {/* ---------- OPEN POSITIONS LISTING ---------- */}
      <section id="openings" className="section">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="eyebrow">Open Opportunities</span>
              <h2>Current Job Openings</h2>
              <p>Explore full-time strategic, engineering, design, and growth roles at our Chennai headquarters.</p>
            </div>

            {/* Candidate / HR Action Pills */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {!user && (
                <Link to="/login" className="btn btn--outline" style={{ fontSize: '0.88rem', padding: '0.6rem 1.2rem' }}>
                  Sign In to Track Applications
                </Link>
              )}
            </div>
          </div>
        </Reveal>

        {/* Filter & Search Bar */}
        <div className="careers-filter-bar">
          <div className="dept-tabs">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                className={`dept-tab ${selectedDept === dept ? 'dept-tab--active' : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by job title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Job Cards List */}
        <div className="jobs-list" style={{ marginTop: '2rem' }}>
          {filteredJobs.length === 0 ? (
            <div className="empty-jobs-state">
              <h3>No matching positions found</h3>
              <p>Try resetting your department filters or search keywords.</p>
              <button type="button" className="btn btn--outline" onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isApplied = appliedJobIds.has(job.id);
              return (
                <div key={job.id} className="job-card">
                  <div className="job-card-main">
                    <div className="job-card-header">
                      <span className="job-dept-badge">{job.department}</span>
                      <span className="job-type-badge">{job.type}</span>
                    </div>

                    <h3 className="job-card-title">{job.title}</h3>
                    <p className="job-card-desc">{job.description}</p>

                    <div className="job-card-meta">
                      <span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {job.location}
                      </span>
                      <span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        {job.experience}
                      </span>
                      <span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <div className="job-card-actions">
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => setSelectedJob(job)}
                    >
                      View Details
                    </button>

                    {isApplied ? (
                      <span className="applied-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        Applied
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn--accent"
                        onClick={() => handleApplyClick(job)}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ---------- JOB DETAILS MODAL ---------- */}
      <AnimatePresence>
        {selectedJob && (
          <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <div>
                  <span className="job-dept-badge">{selectedJob.department}</span>
                  <h2 style={{ margin: '0.5rem 0', fontSize: '1.6rem' }}>{selectedJob.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
                    {selectedJob.location} &middot; {selectedJob.type} &middot; {selectedJob.experience}
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedJob(null)}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h4>Role Overview</h4>
                  <p>{selectedJob.description}</p>
                </div>

                {selectedJob.responsibilities && (
                  <div className="modal-section">
                    <h4>Key Responsibilities</h4>
                    <ul className="modal-bullets">
                      {selectedJob.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.requirements && (
                  <div className="modal-section">
                    <h4>Required Qualifications</h4>
                    <ul className="modal-bullets">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-section" style={{ background: 'var(--paper-dim)', padding: '1.25rem', borderRadius: 'var(--radius)' }}>
                  <h4>Compensation & Benefits</h4>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>
                    Salary Range: {selectedJob.salary}
                  </p>
                  <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem' }}>
                    Includes comprehensive health insurance, continuous professional development stipend, and hybrid work flexibility.
                  </p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
                {appliedJobIds.has(selectedJob.id) ? (
                  <span className="applied-pill">Application Submitted</span>
                ) : (
                  <button
                    type="button"
                    className="btn btn--accent"
                    onClick={() => {
                      const job = selectedJob;
                      setSelectedJob(null);
                      handleApplyClick(job);
                    }}
                  >
                    Apply for this Position
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------- APPLY FORM MODAL ---------- */}
      <AnimatePresence>
        {applyingJob && (
          <div className="modal-backdrop" onClick={() => setApplyingJob(null)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <div>
                  <span className="job-dept-badge">Applying to</span>
                  <h2 style={{ margin: '0.4rem 0', fontSize: '1.5rem' }}>{applyingJob.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.88rem' }}>
                    {applyingJob.location} &middot; {applyingJob.department}
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setApplyingJob(null)}
                >
                  &times;
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <div style={{ display: 'inline-flex', padding: '0.8rem', background: '#f1f5f9', borderRadius: '50%', marginBottom: '1rem', color: '#1e293b' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Application Successfully Submitted!</h3>
                  <p style={{ margin: '0.8rem auto 1.5rem', maxWidth: '45ch' }}>
                    Thank you, <strong>{candidateName}</strong>. Our HR recruitment team has received your application for <strong>{applyingJob.title}</strong>.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => setApplyingJob(null)}
                    >
                      Done
                    </button>
                    {user?.role === 'candidate' && (
                      <Link to="/candidate-portal" className="btn btn--accent">
                        View in Candidate Portal
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <form className="modal-body" onSubmit={handleApplicationSubmit}>
                  {user?.role === 'candidate' && (
                    <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--line)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                      Logged in as <strong>{user.email}</strong>. Details pre-filled automatically.
                    </div>
                  )}

                  <div className="form-row">
                    <label>
                      Full Name *
                      <input
                        type="text"
                        required
                        placeholder="Arun Swaminathan"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                      />
                    </label>

                    <label>
                      Email Address *
                      <input
                        type="email"
                        required
                        placeholder="arun@example.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Phone Number *
                      <input
                        type="tel"
                        required
                        placeholder="+91 98400 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>

                    <label>
                      Years of Relevant Experience
                      <input
                        type="text"
                        placeholder="e.g. 4.5 Years"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Resume Link / Drive URL *
                      <input
                        type="url"
                        required
                        placeholder="https://drive.google.com/file/d/your-resume.pdf"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                      />
                    </label>

                    <label>
                      LinkedIn / Portfolio URL
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/profile"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                      />
                    </label>
                  </div>

                  <label>
                    Brief Cover Note & Why Digital Inertia
                    <textarea
                      rows="3"
                      placeholder="Share a brief overview of your background and what excites you about this role..."
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                    />
                  </label>

                  <div className="modal-footer" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--line)' }}>
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => setApplyingJob(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn--accent"
                      disabled={submitStatus === 'loading'}
                    >
                      {submitStatus === 'loading' ? 'Submitting Application…' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
