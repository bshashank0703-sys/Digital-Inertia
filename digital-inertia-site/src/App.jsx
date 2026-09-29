import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Careers from './pages/Careers.jsx';
import Login from './pages/Login.jsx';
import CandidatePortal from './pages/CandidatePortal.jsx';
import HRPortal from './pages/HRPortal.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { JobProvider } from './context/JobContext.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <ScrollManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/candidate-portal" element={<CandidatePortal />} />
          <Route path="/hr-portal" element={<HRPortal />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </JobProvider>
    </AuthProvider>
  );
}
