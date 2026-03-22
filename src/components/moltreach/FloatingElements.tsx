'use client';

import { useEffect, useState, useRef } from 'react';

interface FloatingElementsProps {
  onOpenModal: () => void;
}

export default function FloatingElements({ onOpenModal }: FloatingElementsProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [toasts, setToasts] = useState<{ id: number; message: string; icon: string; color: string }[]>([]);
  const toastIdRef = useRef(0);

  useEffect(() => {
    // Scroll tracking
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Section tracking
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ids = Array.from(sections).map((s) => s.id);
            const index = ids.indexOf(entry.target.id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));

    // Toast notifications
    const toastMessages = [
      { message: 'Meeting booked — Priya Sharma, Stackron', icon: '🎉', color: '#10B981' },
      { message: 'Hot reply — James Park, CTO DataVault', icon: '🔥', color: '#F59E0B' },
      { message: 'Campaign launched — 120 targets loaded', icon: '🚀', color: '#0D9488' },
      { message: 'Milestone — Campaign A hit 30% open rate', icon: '📈', color: '#F97316' },
      { message: 'Leads enriched — 47 new contacts from Apollo', icon: '✨', color: '#8B5CF6' },
    ];

    const showRandomToast = () => {
      const msg = toastMessages[Math.floor(Math.random() * toastMessages.length)];
      const id = ++toastIdRef.current;
      setToasts((prev) => [...prev, { id, ...msg }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    };

    const initialTimeout = setTimeout(showRandomToast, 3000);
    const interval = setInterval(showRandomToast, 8000 + Math.random() * 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionNames = ['Hero', 'Problem', 'How It Works', 'Dashboard', 'Results', 'Features', 'Pricing', 'Footer'];

  return (
    <>
      {/* Section navigation dots */}
      <div className="section-nav-dots">
        {sectionNames.map((name, i) => (
          <button
            key={name}
            className={`section-nav-dot ${activeSection === i ? 'active' : ''}`}
            onClick={() => scrollToSection(['hero', 'problem', 'how-it-works', 'dashboard', 'results', 'features', 'pricing', 'footer'][i])}
            aria-label={name}
            title={name}
          />
        ))}
      </div>

      {/* Back to top button */}
      <button
        className={`back-to-top ${scrollY > 600 ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Chat button */}
      <button className="chat-button" onClick={onOpenModal} aria-label="Chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C0A09" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="chat-button-text">Questions? Chat with MoltReach AI →</span>
      </button>

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast"
            style={{ borderLeftColor: toast.color }}
          >
            <span style={{ marginRight: 8 }}>{toast.icon}</span>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Scan line */}
      <div className="scan-line" />
    </>
  );
}
