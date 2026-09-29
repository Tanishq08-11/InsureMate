import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Experience from './pages/Experience';
import Chatbot from './pages/Chatbot'; // 👈 ADD (check the file path/name)
import { getWhatsAppUrl } from './config';

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

// Hide Navbar/Footer on the chatbot page (it has its own header)
function Layout({ whatsappUrl }) {
  const { pathname } = useLocation();
  const isChatbot = pathname === '/chatbot';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033] font-sans antialiased selection:bg-[#5EEAD4]/30 selection:text-[#0B1F3A]">
      {!isChatbot && <Navbar whatsappUrl={whatsappUrl} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing whatsappUrl={whatsappUrl} />} />
          <Route path="/experience" element={<Experience whatsappUrl={whatsappUrl} />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* 👈 ADD */}
        </Routes>
      </main>

      {!isChatbot && <Footer whatsappUrl={whatsappUrl} />}
    </div>
  );
}

export default function App() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout whatsappUrl={whatsappUrl} />
    </BrowserRouter>
  );
}