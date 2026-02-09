import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import KSeFPage from './pages/KSeF';
import AgentsPage from './pages/Agents';
import TemplatesPage from './pages/Templates';
import ContactPage from './pages/Contact';
import PartnersPage from './pages/Partners';
import BlogPage from './pages/Blog';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ksef" element={<KSeFPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/partnerzy" element={<PartnersPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
