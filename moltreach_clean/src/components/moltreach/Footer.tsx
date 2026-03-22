'use client';

import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const columns = [
    {
      title: 'Product',
      links: ['Features', 'Integrations', 'Pricing', 'API', 'Changelog'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Community', 'Templates', 'Webinars'],
    },
    {
      title: 'Connect',
      links: ['Twitter', 'LinkedIn', 'YouTube', 'Contact', 'Status'],
    },
  ];

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-content">
        {/* Brand column */}
        <div
          className="footer-brand"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 200ms',
          }}
        >
          <div className="footer-logo">
            <div className="footer-logo-text">
              <span>Molt</span>
              <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Reach</span>
            </div>
            <div className="footer-logo-brand">BY VISIONARY AI</div>
          </div>
          <p className="footer-tagline">
            AI-powered B2B lead generation and outreach automation. Your pipeline on autopilot.
          </p>
        </div>

        {/* Link columns */}
        {columns.map((column, i) => (
          <div
            key={column.title}
            className="footer-column"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${300 + i * 100}ms`,
            }}
          >
            <h4 className="footer-column-title">{column.title}</h4>
            <div className="footer-links">
              {column.links.map((link) => (
                <a key={link} href="#" className="footer-link">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="footer-bottom"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'all 0.6s ease 700ms',
        }}
      >
        <p className="footer-copyright">
          © {new Date().getFullYear()} MoltReach by Visionary AI. All rights reserved.
        </p>
        <p className="footer-motto">
          Crafted with intelligence. Powered by ambition.
        </p>
      </div>
    </footer>
  );
}
