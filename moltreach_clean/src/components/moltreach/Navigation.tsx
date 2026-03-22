'use client';

import { useEffect, useState, useRef } from 'react';

interface NavigationProps {
  onOpenModal: () => void;
}

export default function Navigation({ onOpenModal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTicking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTicking.current) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          
          setScrolled(scrollTop > 50);
          setScrollProgress(progress);
          scrollTicking.current = false;
        });
        scrollTicking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Results', id: 'results' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Integrations', id: 'integrations' },
  ];

  return (
    <>
      {/* PROGRESS BAR - ALWAYS ON TOP */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 3,
          background: 'linear-gradient(90deg, #F59E0B, #F97316, #0D9488)',
          zIndex: 2147483647,
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear',
        }}
      />

      {/* NAVIGATION BAR - ALWAYS VISIBLE */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          zIndex: 2147483646,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          background: scrolled 
            ? 'rgba(255, 253, 247, 0.98)' 
            : 'rgba(255, 253, 247, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.2)'}`,
          boxShadow: scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
            : '0 2px 16px rgba(0, 0, 0, 0.05)',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          // Force visibility
          opacity: 1,
          visibility: 'visible',
          transform: 'none',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <div 
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 2 }}
          onClick={() => scrollToSection('hero')}
        >
          <div style={{ 
            fontFamily: 'var(--font-fraunces)', 
            fontSize: 22, 
            fontWeight: 800, 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <span style={{ color: '#0C0A09' }}>Molt</span>
            <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Reach</span>
          </div>
          <div style={{ 
            fontFamily: 'var(--font-space-mono)', 
            fontSize: 9, 
            color: '#78716C', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em' 
          }}>
            BY VISIONARY AI
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 14,
                fontWeight: 500,
                color: '#44403C',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#44403C'}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onOpenModal}
            style={{
              background: 'rgba(0, 0, 0, 0.04)',
              border: '1.5px solid rgba(12, 10, 9, 0.15)',
              borderRadius: 10,
              padding: '12px 24px',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              fontWeight: 600,
              color: 'rgba(12, 10, 9, 0.7)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Sign In
          </button>
          <button
            onClick={onOpenModal}
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              fontWeight: 600,
              color: '#0C0A09',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            Get Started Free
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            width: 44,
            height: 44,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContentContent: 'center',
            gap: 6,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          <span style={{ 
            display: 'block', 
            width: 24, 
            height: 2, 
            background: '#0C0A09',
            transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
          <span style={{ 
            display: 'block', 
            width: 24, 
            height: 2, 
            background: '#0C0A09',
            opacity: mobileMenuOpen ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }} />
          <span style={{ 
            display: 'block', 
            width: 24, 
            height: 2, 
            background: '#0C0A09',
            transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 70,
            background: 'rgba(255, 253, 247, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 2147483645,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 24px',
            gap: 24,
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 24,
                fontWeight: 500,
                color: '#44403C',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
            <button
              onClick={onOpenModal}
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                border: '1.5px solid rgba(12, 10, 9, 0.15)',
                borderRadius: 10,
                padding: '12px 24px',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 14,
                fontWeight: 600,
                color: 'rgba(12, 10, 9, 0.7)',
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
            <button
              onClick={onOpenModal}
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                border: 'none',
                borderRadius: 10,
                padding: '12px 24px',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 14,
                fontWeight: 600,
                color: '#0C0A09',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          header nav {
            display: none !important;
          }
          header > div:last-of-type {
            display: none !important;
          }
          header button[aria-label="Toggle menu"] {
            display: flex !important;
          }
          header {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </>
  );
}
