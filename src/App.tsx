import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/Home';
import KSeFPage from './pages/KSeF';
import AgentsPage from './pages/Agents';
import TemplatesPage from './pages/Templates';
import ContactPage from './pages/Contact';
import PartnersPage from './pages/Partners';
import KSeFScannerPage from './pages/KSeFScanner';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import NotFoundPage from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ksef" element={<KSeFPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/skaner-ksef" element={<KSeFScannerPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/partnerzy" element={<PartnersPage />} />
            <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
            <Route path="/regulamin" element={<TermsPage />} />
            <Route path="/blog" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
