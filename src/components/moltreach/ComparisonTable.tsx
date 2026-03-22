'use client';

import { useEffect, useRef, useState } from 'react';

export default function ComparisonTable() {
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

  const features = [
    { feature: 'Lead Discovery', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'AI Personalization', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'Automated Follow-ups', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'Real-time Analytics', sdr: '❌', tools: '✓', moltreach: '✓' },
    { feature: 'CRM Integration', sdr: '❌', tools: '✓', moltreach: '✓' },
    { feature: 'Multi-channel Outreach', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'A/B Testing', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'Team Collaboration', sdr: '❌', tools: '✓', moltreach: '✓' },
    { feature: '24/7 Operation', sdr: '❌', tools: '❌', moltreach: '✓' },
    { feature: 'Unlimited Scaling', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'Reply Classification', sdr: '❌', tools: '❌', moltreach: '✓' },
    { feature: 'Smart Scheduling', sdr: '❌', tools: '❌', moltreach: '✓' },
    { feature: 'Custom AI Training', sdr: '❌', tools: '❌', moltreach: '✓' },
    { feature: 'White-label Reports', sdr: '❌', tools: '⚠️', moltreach: '✓' },
    { feature: 'Dedicated Support', sdr: '❌', tools: '⚠️', moltreach: '✓' },
  ];

  return (
    <section id="comparison" className="section" ref={ref}>
      {/* Section blobs */}
      <div className="blob blob-teal" style={{ width: 350, height: 350, top: '10%', left: '-10%' }} />
      <div className="dot-grid" />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div className="overline reveal" style={{ opacity: visible ? 1 : 0, textAlign: 'center', marginBottom: 8 }}>
          ◆ WHY MOLTREACH
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 48, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', textAlign: 'center' }}>
          MoltReach vs. the{' '}
          <span style={{ textDecoration: 'line-through', color: 'rgba(12, 10, 9, 0.28)' }}>old way</span>.
        </h2>

        {/* Table */}
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
          }}
        >
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: 0, borderBottom: '2px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ padding: '16px 20px', fontWeight: 600, color: '#44403C' }}>FEATURE</div>
            <div style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 600, color: '#44403C' }}>MANUAL SDR</div>
            <div style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 600, color: '#44403C' }}>TYPICAL TOOLS</div>
            <div style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 600, background: 'rgba(245, 158, 11, 0.06)', color: '#0C0A09' }}>MOLTREACH</div>
          </div>

          {/* Rows */}
          {features.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
                gap: 0,
                borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: `all 0.4s ease ${400 + i * 40}ms`,
              }}
            >
              <div style={{ padding: '14px 20px', fontSize: 13, color: '#44403C' }}>{row.feature}</div>
              <div style={{ padding: '14px 12px', textAlign: 'center', fontSize: 14 }}>
                <span style={{ color: row.sdr === '✓' ? '#10B981' : row.sdr === '❌' ? '#EF4444' : '#F59E0B' }}>{row.sdr}</span>
              </div>
              <div style={{ padding: '14px 12px', textAlign: 'center', fontSize: 14 }}>
                <span style={{ color: row.tools === '✓' ? '#10B981' : row.tools === '❌' ? '#EF4444' : '#F59E0B' }}>{row.tools}</span>
              </div>
              <div style={{ padding: '14px 12px', textAlign: 'center', fontSize: 14, background: 'rgba(245, 158, 11, 0.06)' }}>
                <span style={{ color: '#10B981', fontWeight: 600 }}>{row.moltreach}</span>
              </div>
            </div>
          ))}

          {/* Summary row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
              gap: 0,
              background: 'rgba(0, 0, 0, 0.02)',
              fontWeight: 600,
            }}
          >
            <div style={{ padding: '16px 20px', fontSize: 13, color: '#0C0A09' }}>Meetings per month</div>
            <div style={{ padding: '16px 12px', textAlign: 'center', fontSize: 13, color: '#EF4444' }}>~8</div>
            <div style={{ padding: '16px 12px', textAlign: 'center', fontSize: 13, color: '#F59E0B' }}>~15</div>
            <div style={{ padding: '16px 12px', textAlign: 'center', fontSize: 13, background: 'rgba(245, 158, 11, 0.06)', color: '#10B981' }}>~35+</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 1fr 1fr 1.2fr"] {
            grid-template-columns: 1.5fr 0.8fr 0.8fr 1fr !important;
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
