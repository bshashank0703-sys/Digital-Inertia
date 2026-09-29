import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useJobs } from '../context/JobContext.jsx';
import companyLogo from '../assets/logo.png';

export default function HRPortal() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    jobs,
    applications,
    createJob,
    updateJob,
    deleteJob,
    updateApplicationStatus,
    getApplicationsForJob,
  } = useJobs();

  const [activeTab, setActiveTab] = useState('candidates'); // 'candidates' | 'jobs'

  // Candidate Filters
  const [selectedJobFilter, setSelectedJobFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [candidateSearch, setCandidateSearch] = useState('');

  // Selected Candidate Modal for details & status update
  const [evaluatingCandidate, setEvaluatingCandidate] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Job Modal (Create & Edit)
  const [jobModalMode, setJobModalMode] = useState(null); // 'create' | 'edit' | null
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Chennai, India / Hybrid',
    type: 'Full-time',
    experience: '3–5 Years',
    salary: '₹15,00,000 – ₹22,00,000 PA',
    description: '',
    requirements: '',
    responsibilities: '',
  });

  // Delete Job Confirmation Modal
  const [deletingJob, setDeletingJob] = useState(null);

  if (!user || user.role !== 'hr') {
    return (
      <section className="section section--page-hero">
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center', background: '#ffffff', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }}>
          <span className="eyebrow">HR & Talent Administration</span>
          <h2>HR Authorization Required</h2>
          <p>Please log in with an authorized HR administrator profile to access the talent management suite.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link to="/login" state={{ role: 'hr' }} className="btn btn--accent">
              Log In as HR Director
            </Link>
            <Link to="/careers" className="btn btn--outline">
              View Careers
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Filtered Candidates
  const filteredApplications = applications.filter((app) => {
    const matchesJob = selectedJobFilter === 'ALL' || app.jobId === selectedJobFilter;
    const matchesStatus = selectedStatusFilter === 'ALL' || app.status === selectedStatusFilter;
    const matchesSearch =
      app.candidateName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      app.candidateEmail.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(candidateSearch.toLowerCase());
    return matchesJob && matchesStatus && matchesSearch;
  });

  // Handle open candidate evaluation modal
  const handleOpenEvaluation = (candidate) => {
    setEvaluatingCandidate(candidate);
    setEditStatus(candidate.status);
    setEditNotes(candidate.hrNotes || '');
  };

  // Save candidate evaluation
  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    if (!evaluatingCandidate) return;

    updateApplicationStatus(evaluatingCandidate.id, editStatus, editNotes);
    setEvaluatingCandidate(null);
  };

  // Open Create Job Modal
  const handleOpenCreateJob = () => {
    setJobFormData({
      title: '',
      department: 'Engineering',
      location: 'Chennai, India / Hybrid',
      type: 'Full-time',
      experience: '3–5 Years',
      salary: '₹14,00,000 – ₹22,00,000 PA',
      description: '',
      requirements: 'Proficiency in modern web architectures\nStrong communication and problem-solving skills',
      responsibilities: 'Lead product development and architecture\nCollaborate with cross-functional leadership',
    });
    setEditingJobId(null);
    setJobModalMode('create');
  };

  // Open Edit Job Modal
  const handleOpenEditJob = (job) => {
    setJobFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : '',
    });
    setEditingJobId(job.id);
    setJobModalMode('edit');
  };

  // Save Job (Create or Edit)
  const handleSaveJob = (e) => {
    e.preventDefault();
    const reqArray = jobFormData.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const respArray = jobFormData.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      title: jobFormData.title,
      department: jobFormData.department,
      location: jobFormData.location,
      type: jobFormData.type,
      experience: jobFormData.experience,
      salary: jobFormData.salary,
      description: jobFormData.description,
      requirements: reqArray,
      responsibilities: respArray,
    };

    if (jobModalMode === 'create') {
      createJob(payload);
    } else if (jobModalMode === 'edit') {
      updateJob(editingJobId, payload);
    }

    setJobModalMode(null);
    setEditingJobId(null);
  };

  // Confirm Delete Job
  const handleConfirmDelete = () => {
    if (deletingJob) {
      deleteJob(deletingJob.id);
      setDeletingJob(null);
    }
  };

  return (
    <div className="portal-page">
      <div className="section section--page-hero">
        {/* HR Dashboard Header */}
        <div className="portal-header">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
            <img src={companyLogo} alt="Digital Inertia Logo" className="portal-header-logo" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <span className="eyebrow" style={{ margin: 0 }}>HR & Talent Operations</span>
                <span className="role-tag">Director Suite</span>
              </div>
              <h1>Talent Acquisition & Candidate Handling</h1>
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                Logged in as <strong>{user.name}</strong> ({user.email}) &middot; Manage job positions, candidate evaluations, and hiring pipelines.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <Link to="/careers" className="btn btn--outline" style={{ fontSize: '0.9rem' }}>
              View Public Careers
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

        {/* HR Metrics Summary */}
        <div className="portal-stats-row">
          <div className="portal-stat-card">
            <span className="portal-stat-num">{applications.length}</span>
            <span className="portal-stat-label">Total Candidates Applied</span>
          </div>
          <div className="portal-stat-card">
            <span className="portal-stat-num">{jobs.filter((j) => j.status === 'active').length}</span>
            <span className="portal-stat-label">Active Job Positions</span>
          </div>
          <div className="portal-stat-card">
            <span className="portal-stat-num">
              {applications.filter((a) => a.status === 'Interview Scheduled').length}
            </span>
            <span className="portal-stat-label">Interviews Scheduled</span>
          </div>
          <div className="portal-stat-card">
            <span className="portal-stat-num">
              {applications.filter((a) => a.status === 'Offer Extended').length}
            </span>
            <span className="portal-stat-label">Offers Extended</span>
          </div>
        </div>

        {/* HR Navigation Tabs */}
        <div className="portal-tabs-nav" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className={`portal-tab-btn ${activeTab === 'candidates' ? 'portal-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            Candidate Handling & Tracking ({applications.length})
          </button>
          <button
            type="button"
            className={`portal-tab-btn ${activeTab === 'jobs' ? 'portal-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Positions Management ({jobs.length})
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CANDIDATE HANDLING PAGE                           */}
        {/* ======================================================== */}
        {activeTab === 'candidates' && (
          <div style={{ marginTop: '1.5rem' }}>
            {/* Filters Row */}
            <div className="hr-controls-bar">
              <div className="hr-filter-item">
                <label>Filter by Job Opening:</label>
                <select
                  value={selectedJobFilter}
                  onChange={(e) => setSelectedJobFilter(e.target.value)}
                >
                  <option value="ALL">All Open Positions ({applications.length} candidates)</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({getApplicationsForJob(j.id).length} candidates)
                    </option>
                  ))}
                </select>
              </div>

              <div className="hr-filter-item">
                <label>Filter by Status:</label>
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Application Stages</option>
                  <option value="Applied">Newly Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Rejected">Archived / Rejected</option>
                </select>
              </div>

              <div className="hr-search-item">
                <label>Search Candidate:</label>
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Candidates Table / Grid */}
            {filteredApplications.length === 0 ? (
              <div className="empty-state-card" style={{ marginTop: '1.5rem' }}>
                <h3>No candidates found</h3>
                <p>No candidates match your current filter settings. Try switching filters or searching another keyword.</p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    setSelectedJobFilter('ALL');
                    setSelectedStatusFilter('ALL');
                    setCandidateSearch('');
                  }}
                >
                  Reset Candidate Filters
                </button>
              </div>
            ) : (
              <div className="hr-table-wrapper" style={{ marginTop: '1.5rem' }}>
                <table className="hr-table">
                  <thead>
                    <tr>
                      <th>Candidate Name & Contact</th>
                      <th>Applied Position</th>
                      <th>Experience</th>
                      <th>Applied Date</th>
                      <th>Current Stage</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{app.candidateName}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                            <a href={`mailto:${app.candidateEmail}`} style={{ textDecoration: 'underline' }}>{app.candidateEmail}</a> &middot; {app.phone}
                          </div>
                        </td>
                        <td>
                          <span className="job-dept-badge" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                            Ref #{app.id}
                          </span>
                          <div style={{ fontWeight: 500, fontSize: '0.92rem' }}>{app.jobTitle}</div>
                        </td>
                        <td>{app.experience}</td>
                        <td style={{ fontSize: '0.88rem' }}>{app.appliedDate}</td>
                        <td>
                          <span className={`status-badge status-badge--${app.status.toLowerCase().replace(/\s/g, '-')}`}>
                            {app.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn--accent"
                            style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
                            onClick={() => handleOpenEvaluation(app)}
                          >
                            Review & Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: JOB POSITIONS MANAGEMENT                          */}
        {/* ======================================================== */}
        {activeTab === 'jobs' && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.3rem' }}>Job Positions Directory</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
                  Create new openings, edit responsibilities/salary, and manage active status.
                </p>
              </div>
              <button
                type="button"
                className="btn btn--accent"
                onClick={handleOpenCreateJob}
              >
                + Create New Job Position
              </button>
            </div>

            <div className="hr-jobs-grid">
              {jobs.map((job) => {
                const applicantsCount = getApplicationsForJob(job.id).length;
                return (
                  <div key={job.id} className="hr-job-card">
                    <div className="hr-job-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <span className="job-dept-badge">{job.department}</span>
                          <span className={`job-status-pill ${job.status === 'active' ? 'job-status-pill--active' : 'job-status-pill--closed'}`}>
                            {job.status === 'active' ? 'Active' : 'Closed'}
                          </span>
                        </div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{job.title}</h3>
                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                          {job.location} &middot; {job.type} &middot; Posted {job.postedDate}
                        </p>
                      </div>

                      {/* Candidate count badge */}
                      <div className="hr-applicant-stat-box">
                        <span className="hr-applicant-num">{applicantsCount}</span>
                        <span className="hr-applicant-lbl">Candidates</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--muted)', margin: '1rem 0' }}>
                      {job.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '1rem', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)' }}>
                        {job.salary}
                      </span>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn--ghost"
                          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', border: '1px solid var(--line)' }}
                          onClick={() => updateJob(job.id, { status: job.status === 'active' ? 'closed' : 'active' })}
                        >
                          {job.status === 'active' ? 'Close' : 'Activate'}
                        </button>
                        <button
                          type="button"
                          className="btn btn--outline"
                          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
                          onClick={() => handleOpenEditJob(job)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn--ghost"
                          style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem', color: '#dc2626', border: '1px solid #fecaca' }}
                          onClick={() => setDeletingJob(job)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* CANDIDATE EVALUATION & STATUS UPDATE MODAL               */}
      {/* ======================================================== */}
      <AnimatePresence>
        {evaluatingCandidate && (
          <div className="modal-backdrop" onClick={() => setEvaluatingCandidate(null)}>
            <motion.div
              className="modal-content"
              style={{ maxWidth: '680px' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <div>
                  <span className="job-dept-badge">Candidate Evaluation</span>
                  <h2 style={{ margin: '0.3rem 0', fontSize: '1.45rem' }}>{evaluatingCandidate.candidateName}</h2>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>
                    Applied for: <strong>{evaluatingCandidate.jobTitle}</strong> &middot; ID: #{evaluatingCandidate.id}
                  </p>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setEvaluatingCandidate(null)}>
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveEvaluation} className="modal-body">
                {/* Candidate Overview Card */}
                <div style={{ background: 'var(--paper-dim)', padding: '1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--line)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-soft)' }}>Email</span>
                      <a href={`mailto:${evaluatingCandidate.candidateEmail}`} style={{ fontWeight: 600 }}>{evaluatingCandidate.candidateEmail}</a>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-soft)' }}>Phone</span>
                      <span style={{ fontWeight: 600 }}>{evaluatingCandidate.phone}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-soft)' }}>Experience</span>
                      <span style={{ fontWeight: 600 }}>{evaluatingCandidate.experience}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted-soft)' }}>Applied Date</span>
                      <span style={{ fontWeight: 600 }}>{evaluatingCandidate.appliedDate}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid var(--line)' }}>
                    <a
                      href={evaluatingCandidate.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--outline"
                      style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
                    >
                      Open Resume &rarr;
                    </a>
                    {evaluatingCandidate.portfolioUrl && (
                      <a
                        href={evaluatingCandidate.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--ghost"
                        style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', border: '1px solid var(--line)' }}
                      >
                        Portfolio / Profile &rarr;
                      </a>
                    )}
                  </div>
                </div>

                {evaluatingCandidate.coverNote && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem' }}>Candidate Pitch & Cover Note</h4>
                    <p style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--line)', fontSize: '0.9rem', color: 'var(--ink)' }}>
                      "{evaluatingCandidate.coverNote}"
                    </p>
                  </div>
                )}

                {/* Status Update Dropdown */}
                <label>
                  Update Recruitment Stage *
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    style={{ fontSize: '1rem', fontWeight: 600 }}
                  >
                    <option value="Applied">Applied (Newly Received)</option>
                    <option value="Under Review">Under Review (HR Screening)</option>
                    <option value="Interview Scheduled">Interview Scheduled (Technical / Partner Round)</option>
                    <option value="Offer Extended">Offer Extended (Final Decision)</option>
                    <option value="Rejected">Archived / Not Selected</option>
                  </select>
                </label>

                {/* Recruiter Notes */}
                <label style={{ marginTop: '1rem' }}>
                  HR Internal Notes & Feedback (visible to candidate in dashboard)
                  <textarea
                    rows="3"
                    value={editNotes}
                    placeholder="e.g. Cleared round 1 technical screen. Partner round scheduled for Thursday 3:00 PM."
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                </label>

                <div className="modal-footer" style={{ padding: '1.25rem 0 0', borderTop: '1px solid var(--line)' }}>
                  <button type="button" className="btn btn--outline" onClick={() => setEvaluatingCandidate(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--accent">
                    Save Evaluation & Update Candidate
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* CREATE & EDIT JOB POSITION MODAL                         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {jobModalMode && (
          <div className="modal-backdrop" onClick={() => setJobModalMode(null)}>
            <motion.div
              className="modal-content"
              style={{ maxWidth: '680px' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-header">
                <div>
                  <span className="job-dept-badge">Job Configuration</span>
                  <h2 style={{ margin: '0.3rem 0', fontSize: '1.45rem' }}>
                    {jobModalMode === 'create' ? 'Create New Job Position' : 'Update Job Position'}
                  </h2>
                </div>
                <button type="button" className="modal-close-btn" onClick={() => setJobModalMode(null)}>
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="modal-body">
                <div className="form-row">
                  <label>
                    Job Position Title *
                    <input
                      type="text"
                      required
                      placeholder="e.g. Principal Cloud Architect"
                      value={jobFormData.title}
                      onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                    />
                  </label>

                  <label>
                    Department *
                    <select
                      value={jobFormData.department}
                      onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Strategy & Sales">Strategy & Sales</option>
                      <option value="Design">Design</option>
                      <option value="Growth & Visibility">Growth & Visibility</option>
                      <option value="Social Mission">Social Mission</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Location & Work Model *
                    <input
                      type="text"
                      required
                      placeholder="Chennai, India / Hybrid"
                      value={jobFormData.location}
                      onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    />
                  </label>

                  <label>
                    Employment Type *
                    <select
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Experience Required *
                    <input
                      type="text"
                      required
                      placeholder="e.g. 4–7 Years"
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                    />
                  </label>

                  <label>
                    Salary Range *
                    <input
                      type="text"
                      required
                      placeholder="₹18,00,000 – ₹26,00,000 PA"
                      value={jobFormData.salary}
                      onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                    />
                  </label>
                </div>

                <label>
                  Role Overview & Description *
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe how this role helps businesses overcome stagnation..."
                    value={jobFormData.description}
                    onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  />
                </label>

                <label>
                  Key Responsibilities (one per line)
                  <textarea
                    rows="3"
                    placeholder="Architect enterprise web solutions&#10;Optimize high-throughput databases"
                    value={jobFormData.responsibilities}
                    onChange={(e) => setJobFormData({ ...jobFormData, responsibilities: e.target.value })}
                  />
                </label>

                <label>
                  Required Qualifications & Skills (one per line)
                  <textarea
                    rows="3"
                    placeholder="Proficiency in modern TypeScript/React&#10;Experience with scalable cloud platforms"
                    value={jobFormData.requirements}
                    onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                  />
                </label>

                <div className="modal-footer" style={{ padding: '1rem 0 0', borderTop: '1px solid var(--line)' }}>
                  <button type="button" className="btn btn--outline" onClick={() => setJobModalMode(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--accent">
                    {jobModalMode === 'create' ? 'Publish Job Opening' : 'Update Job Opening'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION MODAL                                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {deletingJob && (
          <div className="modal-backdrop" onClick={() => setDeletingJob(null)}>
            <motion.div
              className="modal-content"
              style={{ maxWidth: '480px', textAlign: 'center' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div style={{ display: 'inline-flex', padding: '0.8rem', background: '#fee2e2', borderRadius: '50%', marginBottom: '1rem', color: '#dc2626' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </div>
              <h3 style={{ margin: '0 0 0.5rem' }}>Delete Job Position?</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
                Are you sure you want to delete <strong>{deletingJob.title}</strong>? 
                This will remove the job opening from the public careers page.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn--outline" onClick={() => setDeletingJob(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn--accent"
                  style={{ background: '#dc2626', borderColor: '#b91c1c', color: '#ffffff' }}
                  onClick={handleConfirmDelete}
                >
                  Yes, Delete Position
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
