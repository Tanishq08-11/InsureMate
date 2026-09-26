import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Experience from './pages/Experience';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  // Configured WhatsApp Click-to-Chat URL
  // Can be customized by the team with their WhatsApp Business number
  const WHATSAPP_PHONE = '919876543210';
  const WHATSAPP_DEFAULT_TEXT = encodeURIComponent(
    'Hi InsureMate! I would like to check my health insurance policy coverage and understand treatment costs.'
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_DEFAULT_TEXT}`;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033] font-sans antialiased selection:bg-[#5EEAD4]/30 selection:text-[#0B1F3A]">
        {/* Global Navigation with Existing Logo Asset */}
        <Navbar whatsappUrl={whatsappUrl} />

        {/* Main Routed Content */}
        <main className="flex-1">
          <Routes>
            {/* Page 1: Landing / Product Overview */}
            <Route path="/" element={<Landing whatsappUrl={whatsappUrl} />} />
            
            {/* Page 2: Experience / How It Works & Live Demo */}
            <Route path="/experience" element={<Experience whatsappUrl={whatsappUrl} />} />
          </Routes>
        </main>

        {/* Global Deep Navy Footer with Section 11 CTA & Disclaimers */}
        <Footer whatsappUrl={whatsappUrl} />
      </div>
    </BrowserRouter>
  );
}
