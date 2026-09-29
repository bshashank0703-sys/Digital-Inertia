import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useJobs } from '../context/JobContext.jsx';
import companyLogo from '../assets/logo.png';

export default function CandidatePortal() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { jobs, submitApplication, getApplicationsForCandidate } = useJobs();

  const [activeTab, setActiveTab] = useState('applied'); // 'applied' | 'explore'
  const [applyingJob, setApplyingJob] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);

  // Application form state
  const [phone, setPhone] = useState('+91 98401 23456');
  const [experience, setExperience] = useState('4 Years');
  const [resumeUrl, setResumeUrl] = useState('https://drive.google.com/file/d/sample-resume.pdf');
  const [portfolioUrl, setPortfolioUrl] = useState('https://linkedin.com/in/applicant');
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!user || user.role !== 'candidate') {
    return (
      <section className="section section--page-hero">
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center', background: '#ffffff', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }}>
          <span className="eyebrow">Candidate Portal</span>
          <h2>Candidate Sign In Required</h2>
          <p>Please log in with your candidate profile to view your job applications or apply to new openings.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link to="/login" state={{ role: 'candidate' }} className="btn btn--accent">
              Log In as Candidate
            </Link>
            <Link to="/careers" className="btn btn--outline">
              Browse Careers
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const applications = getApplicationsForCandidate(user.email);
  const appliedJobIds = new Set(applications.map((a) => a.jobId));
  const activeJobs = jobs.filter((j) => j.status === 'active');

  const handleApply = (job) => {
    setApplyingJob(job);
    setSuccessMessage('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      submitApplication({
        jobId: applyingJob.id,
        jobTitle: applyingJob.title,
        candidateName: user.name,
        candidateEmail: user.email,
        phone,
        experience,
        resumeUrl,
        portfolioUrl,
        coverNote: coverNote || 'Excited to apply via Candidate Portal.',
      });
      setSubmitting(false);
      setSuccessMessage(`Application for "${applyingJob.title}" submitted successfully!`);
      setApplyingJob(null);
      setActiveTab('applied');
    }, 600);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return <span className="status-badge status-badge--interview">Interview Scheduled</span>;
      case 'Under Review':
        return <span className="status-badge status-badge--review">Under Review</span>;
      case 'Offer Extended':
        return <span className="status-badge status-badge--hired">Offer Extended</span>;
      case 'Rejected':
        return <span className="status-badge status-badge--rejected">Archive</span>;
      default:
        return <span className="status-badge status-badge--applied">Application Submitted</span>;
    }
  };

  return (
    <div className="portal-page">
      <div className="section section--page-hero">
        {/* Header with Candidate Profile */}
        <div className="portal-header">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
            <img src={companyLogo} alt="Digital Inertia Logo" className="portal-header-logo" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <span className="eyebrow" style={{ margin: 0 }}>Candidate Dashboard</span>
                <span className="role-tag">Verified Applicant</span>
              </div>
              <h1>Welcome back, {user.name}</h1>
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Candidate ID: <code>{user.email}</code> &middot; Track your application status and apply for open roles.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <Link to="/careers" className="btn btn--outline" style={{ fontSize: '0.9rem' }}>
              Public Careers Page
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              style={{ border: '1px solid var(--line)' }}
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Stat Highlights */}
        <div className="portal-stats-row">
          <div className="portal-stat-card">
            <span className="portal-stat-num">{applications.length}</span>
            <span className="portal-stat-label">Total Applied</span>
          </div>
          <div className="portal-stat-card">
            <span className="portal-stat-num">
              {applications.filter((a) => a.status === 'Under Review').length}
            </span>
            <span className="portal-stat-label">In Review</span>
          </div>
          <div className="portal-stat-card">
            <span className="portal-stat-num">
              {applications.filter((a) => a.status === 'Interview Scheduled').length}
            </span>
            <span className="portal-stat-label">Interviews</span>
          </div>
          <div className="portal-stat-card">
            <span className="portal-stat-num">
              {activeJobs.length}
            </span>
            <span className="portal-stat-label">Available Openings</span>
          </div>
        </div>

        {successMessage && (
          <div className="success-banner" style={{ marginTop: '1.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {successMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="portal-tabs-nav" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className={`portal-tab-btn ${activeTab === 'applied' ? 'portal-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('applied')}
          >
            My Submitted Applications ({applications.length})
          </button>
          <button
            type="button"
            className={`portal-tab-btn ${activeTab === 'explore' ? 'portal-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore & Apply to Open Positions ({activeJobs.length})
          </button>
        </div>

        {/* TAB 1: SUBMITTED APPLICATIONS */}
        {activeTab === 'applied' && (
          <div style={{ marginTop: '1.5rem' }}>
            {applications.length === 0 ? (
              <div className="empty-state-card">
                <h3>No applications submitted yet</h3>
                <p>You haven't applied for any positions yet. Explore our open roles and submit your application!</p>
                <button
                  type="button"
                  className="btn btn--accent"
                  onClick={() => setActiveTab('explore')}
                >
                  Browse Available Positions
                </button>
              </div>
            ) : (
              <div className="applications-grid">
                {applications.map((app) => {
                  const jobInfo = jobs.find((j) => j.id === app.jobId);
                  return (
                    <div key={app.id} className="app-status-card">
                      <div className="app-status-header">
                        <div>
                          <span className="job-dept-badge">{jobInfo?.department || 'Consultancy'}</span>
                          <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.25rem' }}>{app.jobTitle}</h3>
                          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                            Applied on {app.appliedDate} &middot; Ref #{app.id}
                          </span>
                        </div>
                        <div>{getStatusBadge(app.status)}</div>
                      </div>

                      <div className="app-status-body">
                        <div className="app-timeline">
                          <div className={`timeline-step ${app.status ? 'timeline-step--done' : ''}`}>
                            <span className="step-circle" />
                            <span>Applied</span>
                          </div>
                          <div className={`timeline-step ${['Under Review', 'Interview Scheduled', 'Offer Extended'].includes(app.status) ? 'timeline-step--done' : ''}`}>
                            <span className="step-circle" />
                            <span>Under Review</span>
                          </div>
                          <div className={`timeline-step ${['Interview Scheduled', 'Offer Extended'].includes(app.status) ? 'timeline-step--done' : ''}`}>
                            <span className="step-circle" />
                            <span>Interview</span>
                          </div>
                          <div className={`timeline-step ${app.status === 'Offer Extended' ? 'timeline-step--done' : ''}`}>
                            <span className="step-circle" />
                            <span>Decision</span>
                          </div>
                        </div>

                        {app.hrNotes && (
                          <div className="app-hr-feedback">
                            <strong>Recruitment Update:</strong> {app.hrNotes}
                          </div>
                        )}

                        <div className="app-details-meta">
                          <span>Phone: {app.phone}</span>
                          <span>Experience: {app.experience}</span>
                          <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-btn">
                            View Submitted Resume &rarr;
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLORE & APPLY FOR OPEN POSITIONS */}
        {activeTab === 'explore' && (
          <div style={{ marginTop: '1.5rem' }}>
            <div className="jobs-list">
              {activeJobs.map((job) => {
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
                        <span>{job.location}</span>
                        <span>{job.experience}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    <div className="job-card-actions">
                      <button
                        type="button"
                        className="btn btn--outline"
                        onClick={() => setSelectedJobDetails(job)}
                      >
                        Details
                      </button>

                      {isApplied ? (
                        <span className="applied-pill">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          Already Applied
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--accent"
                          onClick={() => handleApply(job)}
                        >
                          Apply For This Role
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Application Modal */}
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
                  <span className="job-dept-badge">{applyingJob.department}</span>
                  <h2 style={{ margin: '0.4rem 0', fontSize: '1.5rem' }}>Apply to {applyingJob.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
                    Candidate: <strong>{user.name}</strong> ({user.email})
                  </p>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setApplyingJob(null)}>
                  &times;
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="modal-body">
                <div className="form-row">
                  <label>
                    Contact Telephone *
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>

                  <label>
                    Total Experience *
                    <input
                      type="text"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Resume URL (Drive / Cloud / GitHub) *
                    <input
                      type="url"
                      required
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                    />
                  </label>

                  <label>
                    Portfolio or LinkedIn URL
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                    />
                  </label>
                </div>

                <label>
                  Cover Note / Pitch for the Role
                  <textarea
                    rows="3"
                    placeholder="Briefly state your relevant accomplishments and readiness to break inertia..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                  />
                </label>

                <div className="modal-footer" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--line)' }}>
                  <button type="button" className="btn btn--outline" onClick={() => setApplyingJob(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--accent" disabled={submitting}>
                    {submitting ? 'Submitting Application…' : 'Confirm & Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJobDetails && (
          <div className="modal-backdrop" onClick={() => setSelectedJobDetails(null)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <div>
                  <span className="job-dept-badge">{selectedJobDetails.department}</span>
                  <h2 style={{ margin: '0.4rem 0', fontSize: '1.5rem' }}>{selectedJobDetails.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.88rem' }}>
                    {selectedJobDetails.location} &middot; {selectedJobDetails.type}
                  </p>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setSelectedJobDetails(null)}>
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <p>{selectedJobDetails.description}</p>
                <h4>Responsibilities</h4>
                <ul className="modal-bullets">
                  {selectedJobDetails.responsibilities?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <h4>Requirements</h4>
                <ul className="modal-bullets">
                  {selectedJobDetails.requirements?.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn--outline" onClick={() => setSelectedJobDetails(null)}>
                  Close
                </button>
                {!appliedJobIds.has(selectedJobDetails.id) && (
                  <button
                    type="button"
                    className="btn btn--accent"
                    onClick={() => {
                      const job = selectedJobDetails;
                      setSelectedJobDetails(null);
                      handleApply(job);
                    }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
