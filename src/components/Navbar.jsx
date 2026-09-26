import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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
          ? 'bg-[#F6F3EC]/95 backdrop-blur-md border-b border-[#D9D6CE] shadow-[0_1px_0_rgba(11,18,32,0.03)]'
          : 'bg-[#F6F3EC] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="InsureMate Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              to="/#problem"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-[#172033] hover:text-[#356AE6]'
                  : 'text-[#667085] hover:text-[#0B1220]'
              }`}
            >
              Why InsureMate
            </Link>

            <Link
              to="/experience"
              className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
                location.pathname === '/experience'
                  ? 'bg-[#356AE6]/10 text-[#356AE6] font-semibold'
                  : 'text-[#172033] hover:text-[#356AE6]'
              }`}
            >
              How It Works (Live Demo)
            </Link>

            <Link
              to="/#impact"
              className="text-sm font-medium text-[#667085] hover:text-[#356AE6] transition-colors"
            >
              Impact
            </Link>

            <Link
              to="/#research"
              className="text-sm font-medium text-[#667085] hover:text-[#356AE6] transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#356AE6] text-white text-sm font-semibold hover:bg-[#2a58c2] transition-all duration-150 shadow-[0_4px_14px_-6px_rgba(53,106,230,0.5)] active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/85" />
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 opacity-80" />
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-[#172033] hover:bg-[#D9D6CE]/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6 text-[#0B1220]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCFBF7] border-b border-[#D9D6CE] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#0B1220] hover:text-[#356AE6]"
          >
            Product Overview
          </Link>
          <Link
            to="/experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-[#356AE6]"
          >
            How It Works (Live Demo) →
          </Link>
          <Link
            to="/#problem"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#667085] hover:text-[#0B1220]"
          >
            Why InsureMate
          </Link>
          <Link
            to="/#impact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#667085] hover:text-[#0B1220]"
          >
            Impact
          </Link>
          <Link
            to="/#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-[#667085] hover:text-[#0B1220]"
          >
            Research &amp; Evidence
          </Link>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#356AE6] text-white font-semibold hover:bg-[#2a58c2] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/85" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}