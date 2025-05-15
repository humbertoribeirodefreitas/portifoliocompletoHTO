import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CertificationsProvider } from './contexts/CertificationsContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CertificationsPage from './pages/CertificationsPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <CertificationsProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </CertificationsProvider>
    </ThemeProvider>
  );
}

export default App;