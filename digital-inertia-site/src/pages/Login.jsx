import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Reveal from '../components/Reveal.jsx';
import companyLogo from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const [activeTab, setActiveTab] = useState(
    location.state?.role || 'candidate' // 'candidate' | 'hr'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in
  if (user) {
    return (
      <section className="section section--page-hero">
        <div className="login-container" style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div className="login-card">
            <span className="eyebrow">{user.role === 'hr' ? 'HR Portal' : 'Candidate Portal'}</span>
            <h2>Active Session</h2>
            <p>
              You are currently logged in as <strong>{user.email}</strong> ({user.role === 'hr' ? 'HR Director' : 'Candidate'}).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }}>
              <Link
                to={user.role === 'hr' ? '/hr-portal' : '/candidate-portal'}
                className="btn btn--accent"
              >
                Go to {user.role === 'hr' ? 'HR Management Suite' : 'Candidate Dashboard'}
              </Link>
              <Link to="/careers" className="btn btn--outline">
                Browse Job Openings
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your email and password.');
      return;
    }

    if (activeTab === 'hr' && !email.toLowerCase().includes('hr') && !email.toLowerCase().includes('admin')) {
      // friendly notice for HR demo
      setError('For the HR portal demo, use any email containing "hr" (e.g. hr@digitalinertia.in) or click Quick HR Demo below.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({
        email,
        name: name || (activeTab === 'hr' ? 'HR Talent Director' : email.split('@')[0]),
        role: activeTab,
      });
      setLoading(false);
      navigate(activeTab === 'hr' ? '/hr-portal' : '/candidate-portal');
    }, 500);
  };

  const handleDemoCandidate = () => {
    login({
      email: 'vikram.sharma@example.com',
      name: 'Vikram Sharma',
      role: 'candidate',
    });
    navigate('/candidate-portal');
  };

  const handleDemoHR = () => {
    login({
      email: 'hr@digitalinertia.in',
      name: 'Radhika Sen (HR Director)',
      role: 'hr',
    });
    navigate('/hr-portal');
  };

  return (
    <section className="section section--page-hero">
      <div className="login-container">
        <Reveal>
          <div className="login-header">
            <img src={companyLogo} alt="Digital Inertia Logo" style={{ height: '64px', width: 'auto', borderRadius: 'var(--radius)', background: '#ffffff', padding: '4px', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', marginBottom: '1.25rem' }} />
            <br />
            <span className="eyebrow">Enterprise Access</span>
            <h1>Digital Inertia Talent Portal</h1>
            <p>Access your personalized portal to manage job applications or recruitment pipelines.</p>
          </div>
        </Reveal>

        <div className="login-card">
          {/* Role Switcher Tabs */}
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab ${activeTab === 'candidate' ? 'login-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('candidate');
                setError('');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Candidate Login
            </button>
            <button
              type="button"
              className={`login-tab ${activeTab === 'hr' ? 'login-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('hr');
                setError('');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              HR & Talent Portal
            </button>
          </div>

          {/* Quick 1-Click Demo Buttons for Fast Testing */}
          <div className="demo-credentials-box">
            <span className="demo-badge">Instant Demo Access</span>
            <p style={{ margin: '0.3rem 0 0.8rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Click either option below to instantly log in and test all functionalities:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn--outline"
                style={{ fontSize: '0.82rem', padding: '0.55rem' }}
                onClick={handleDemoCandidate}
              >
                Demo Candidate
              </button>
              <button
                type="button"
                className="btn btn--accent"
                style={{ fontSize: '0.82rem', padding: '0.55rem' }}
                onClick={handleDemoHR}
              >
                Demo HR Portal
              </button>
            </div>
          </div>

          <div className="login-divider">
            <span>or sign in with credentials</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {activeTab === 'hr' && (
              <div className="form-info-note">
                <strong>HR Portal Security:</strong> Grants administrative authority to post, update, delete job openings and review candidate resumes & evaluations.
              </div>
            )}

            {isRegister && (
              <label>
                Full Name
                <input
                  type="text"
                  required
                  placeholder={activeTab === 'hr' ? 'Radhika Sen' : 'Alex Wright'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}

            <label>
              Work or Personal Email
              <input
                type="email"
                required
                placeholder={activeTab === 'hr' ? 'hr@digitalinertia.in' : 'candidate@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <div className="form-error-banner">{error}</div>}

            <button type="submit" className="btn btn--accent" disabled={loading} style={{ width: '100%', marginTop: '0.5rem' }}>
              {loading ? 'Authenticating…' : isRegister ? `Create ${activeTab === 'hr' ? 'HR' : 'Candidate'} Account` : `Sign In as ${activeTab === 'hr' ? 'HR Recruiter' : 'Candidate'}`}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.86rem' }}>
              <button
                type="button"
                className="text-btn"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Already have an account? Sign In' : 'New applicant? Create an account'}
              </button>
              <Link to="/careers" className="text-btn">
                Browse Careers
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
