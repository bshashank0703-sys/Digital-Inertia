import { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext(null);

const JOBS_STORAGE_KEY = 'di_jobs_data';
const APPS_STORAGE_KEY = 'di_applications_data';

export const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Chennai, India / Hybrid',
    type: 'Full-time',
    experience: '4–7 Years',
    salary: '₹18,00,000 – ₹28,00,000 PA',
    status: 'active',
    postedDate: '2026-09-15',
    description: 'Lead technical architecture and rapid delivery of web platforms and customized software tools for high-growth enterprise clients.',
    responsibilities: [
      'Architect robust web applications using React, modern Node.js, and cloud systems',
      'Optimize database queries and API response times for mission-critical client workflows',
      'Collaborate directly with Strategic Advisory Partners on enterprise digital modernization',
    ],
    requirements: [
      'Proficiency in React, modern JavaScript/TypeScript, and scalable CSS architectures',
      'Experience with relational and document databases (PostgreSQL, MongoDB, or Firestore)',
      'Strong understanding of web security, performance auditing, and automated testing',
    ],
  },
  {
    id: 'job-2',
    title: 'Strategic Digital Growth Consultant',
    department: 'Strategy & Sales',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '3–6 Years',
    salary: '₹16,00,000 – ₹24,00,000 PA + Performance',
    status: 'active',
    postedDate: '2026-09-18',
    description: 'Work with business leadership to diagnose workflow bottlenecks, restructure sales funnels, and implement visibility strategies.',
    responsibilities: [
      'Conduct deep-dive operational audits to locate where client growth has stalled',
      'Design tailored Go-To-Market and visibility roadmaps with measurable KPI targets',
      'Guide executive teams through digital tool adoption and cultural change management',
    ],
    requirements: [
      'Demonstrated track record in digital strategy, management consulting, or agency account leadership',
      'Exceptional executive communication, data-driven synthesis, and presentation skills',
      'Deep understanding of B2B lead generation, sales operations, and digital ecosystems',
    ],
  },
  {
    id: 'job-3',
    title: 'UI/UX Design Lead (Enterprise Systems)',
    department: 'Design',
    location: 'Chennai, India / Remote Optional',
    type: 'Full-time',
    experience: '3–5 Years',
    salary: '₹14,00,000 – ₹22,00,000 PA',
    status: 'active',
    postedDate: '2026-09-20',
    description: 'Craft elegant, intuitive user interfaces and unified design systems that transform cluttered legacy software into effortless tools.',
    responsibilities: [
      'Lead design sprints from user journey mapping to high-fidelity interactive prototypes',
      'Build scalable design systems and component libraries for client product teams',
      'Ensure high standards of accessibility, responsive ergonomics, and visual elegance',
    ],
    requirements: [
      'Strong portfolio showcasing complex SaaS, enterprise tools, or responsive web platforms',
      'Mastery of Figma, design token methodologies, and design handoff workflows',
      'Keen eye for typography, micro-interactions, and monochromatic minimalism',
    ],
  },
  {
    id: 'job-4',
    title: 'Performance Marketing & Lead Generation Specialist',
    department: 'Growth & Visibility',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '2–5 Years',
    salary: '₹10,00,000 – ₹17,00,000 PA',
    status: 'active',
    postedDate: '2026-09-22',
    description: 'Execute high-intent paid and organic acquisition campaigns focused on qualified pipeline generation rather than vanity metrics.',
    responsibilities: [
      'Manage multi-channel B2B campaigns across Google Search, LinkedIn Ads, and remarketing',
      'Build conversion rate optimization (CRO) experiments for client landing pages',
      'Track full-funnel customer acquisition costs (CAC) and lifetime value (LTV)',
    ],
    requirements: [
      'Hands-on mastery of Google Ads, LinkedIn Campaign Manager, and modern web analytics',
      'Strong analytical mindset with ability to extract actionable insights from campaign data',
      'Experience in B2B tech or high-ticket service marketing funnels',
    ],
  },
  {
    id: 'job-5',
    title: 'Career Acceleration Program Lead (1 Lakh Students)',
    department: 'Social Mission',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '4–8 Years',
    salary: '₹15,00,000 – ₹25,00,000 PA',
    status: 'active',
    postedDate: '2026-09-24',
    description: 'Direct our flagship social mission linking 1,00,000 ambitious students directly to career employment guarantees in technology.',
    responsibilities: [
      'Curate practical industry-aligned engineering and digital curriculum modules',
      'Establish hiring partnerships with technology companies across India',
      'Manage mentorship cohorts and student outcome tracking systems',
    ],
    requirements: [
      'Passion for education equity and student employability transformation',
      'Experience in academic relations, corporate talent acquisition, or bootcamps',
      'High operational rigor and program management capabilities',
    ],
  },
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-101',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer',
    candidateName: 'Vikram Sharma',
    candidateEmail: 'vikram.sharma@example.com',
    phone: '+91 98401 23456',
    experience: '5 Years',
    portfolioUrl: 'https://github.com/vikram-sharma',
    resumeUrl: 'https://drive.google.com/file/d/sample-resume-vikram.pdf',
    coverNote: 'Extensive experience migrating monoliths to React/Node microservices. Very passionate about Digital Inertia approach to breaking organizational bottlenecks.',
    status: 'Interview Scheduled',
    appliedDate: '2026-09-25',
    hrNotes: 'Strong algorithmic skills, passed initial technical screen. Round 2 architecture interview set for Wednesday.',
  },
  {
    id: 'app-102',
    jobId: 'job-2',
    jobTitle: 'Strategic Digital Growth Consultant',
    candidateName: 'Priya Raman',
    candidateEmail: 'priya.raman@example.com',
    phone: '+91 98840 98765',
    experience: '4.5 Years',
    portfolioUrl: 'https://linkedin.com/in/priya-raman-consulting',
    resumeUrl: 'https://drive.google.com/file/d/sample-resume-priya.pdf',
    coverNote: 'Previously at Bain/Deloitte advisory focusing on digital transformation and CRM adoption in manufacturing and tech.',
    status: 'Under Review',
    appliedDate: '2026-09-26',
    hrNotes: 'Resume matches our strategy framework requirements closely. Scheduled for screening call.',
  },
  {
    id: 'app-103',
    jobId: 'job-3',
    jobTitle: 'UI/UX Design Lead (Enterprise Systems)',
    candidateName: 'Arvind Kumar',
    candidateEmail: 'arvind.design@example.com',
    phone: '+91 97910 11223',
    experience: '4 Years',
    portfolioUrl: 'https://arvind-designs.com',
    resumeUrl: 'https://drive.google.com/file/d/sample-resume-arvind.pdf',
    coverNote: 'Specialized in complex B2B workflow simplification and design systems. Love the monochromatic aesthetics.',
    status: 'Offer Extended',
    appliedDate: '2026-09-20',
    hrNotes: 'Exceptional portfolio presentation. Offer letter dispatched on Friday.',
  },
  {
    id: 'app-104',
    jobId: 'job-4',
    jobTitle: 'Performance Marketing & Lead Generation Specialist',
    candidateName: 'Sneha Patel',
    candidateEmail: 'sneha.patel@example.com',
    phone: '+91 99620 44556',
    experience: '3 Years',
    portfolioUrl: 'https://linkedin.com/in/snehapatel-growth',
    resumeUrl: 'https://drive.google.com/file/d/sample-resume-sneha.pdf',
    coverNote: 'Managed ₹40L monthly ad budgets with consistent 4.2x ROAS across SaaS and consulting sectors.',
    status: 'Applied',
    appliedDate: '2026-09-28',
    hrNotes: 'Application received, reviewing CAC and ROAS portfolio metrics.',
  },
];

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(JOBS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(APPS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  // Create Job
  const createJob = (newJobData) => {
    const job = {
      id: 'job-' + Date.now(),
      status: 'active',
      postedDate: new Date().toISOString().split('T')[0],
      responsibilities: newJobData.responsibilities || [],
      requirements: newJobData.requirements || [],
      ...newJobData,
    };
    setJobs((prev) => [job, ...prev]);
    return job;
  };

  // Update Job
  const updateJob = (jobId, updatedFields) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, ...updatedFields } : j))
    );
  };

  // Delete Job
  const deleteJob = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Apply to Job
  const submitApplication = (appData) => {
    const newApp = {
      id: 'app-' + Date.now(),
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      hrNotes: 'Application newly submitted by candidate.',
      ...appData,
    };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  // Update Application Status & HR notes
  const updateApplicationStatus = (appId, newStatus, hrNotes) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              status: newStatus || app.status,
              hrNotes: hrNotes !== undefined ? hrNotes : app.hrNotes,
            }
          : app
      )
    );
  };

  const getApplicationsForJob = (jobId) => {
    return applications.filter((app) => app.jobId === jobId);
  };

  const getApplicationsForCandidate = (candidateEmail) => {
    if (!candidateEmail) return [];
    return applications.filter(
      (app) => app.candidateEmail.toLowerCase() === candidateEmail.toLowerCase()
    );
  };

  const resetToSampleData = () => {
    setJobs(INITIAL_JOBS);
    setApplications(INITIAL_APPLICATIONS);
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        createJob,
        updateJob,
        deleteJob,
        submitApplication,
        updateApplicationStatus,
        getApplicationsForJob,
        getApplicationsForCandidate,
        resetToSampleData,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be used within JobProvider');
  return ctx;
}
