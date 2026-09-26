import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ whatsappUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#F8FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0]/90 shadow-2xs'
          : 'bg-[#F8FAFC] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo using existing InsureMate logo asset */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="InsureMate Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              to="/#problem"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-[#172033] hover:text-[#00A896]' : 'text-[#64748B] hover:text-[#0B1F3A]'
              }`}
            >
              Why InsureMate
            </Link>
            
            <Link
              to="/experience"
              className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
                location.pathname === '/experience'
                  ? 'bg-[#00A896]/10 text-[#00A896] font-semibold'
                  : 'text-[#172033] hover:text-[#00A896]'
              }`}
            >
              How It Works (Live Demo)
            </Link>

            <Link
              to="/#impact"
              className="text-sm font-medium text-[#64748B] hover:text-[#00A896] transition-colors"
            >
              Impact
            </Link>

            <Link
              to="/#research"
              className="text-sm font-medium text-[#64748B] hover:text-[#00A896] transition-colors"
            >
              Research
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#00A896] transition-all duration-150 shadow-xs active:scale-[0.98]"
            >
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-[#172033] hover:bg-[#E2E8F0]/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0B1F3A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#0B1F3A] hover:text-[#00A896]"
          >
            Product Overview
          </Link>
          <Link
            to="/experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#00A896]"
          >
            How It Works (Live Demo) →
          </Link>
          <Link
            to="/#problem"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#64748B] hover:text-[#0B1F3A]"
          >
            Why InsureMate
          </Link>
          <Link
            to="/#impact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#64748B] hover:text-[#0B1F3A]"
          >
            Impact
          </Link>
          <Link
            to="/#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#64748B] hover:text-[#0B1F3A]"
          >
            Research & Evidence
          </Link>
          
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#00A896] text-white font-semibold hover:bg-[#008f80] transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
