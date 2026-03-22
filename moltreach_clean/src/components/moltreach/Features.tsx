'use client';

import MIcon from './MIcon';
import { useEffect, useRef, useState } from 'react';

export default function Features() {
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
    {
      letter: 'C',
      title: 'Command Center',
      description: 'Your entire outreach operation in one place. Real-time dashboards, live activity feeds, and instant notifications keep you connected to every lead.',
      mockup: (
        <div style={{ position: 'relative' }}>
          {/* LIVE badge */}
          <div style={{ position: 'absolute', top: -8, right: -8, display: 'flex', alignItems: 'center', gap: 4, background: '#FFFDF7', padding: '4px 8px', borderRadius: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
            <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>LIVE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ padding: 16, background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))', borderRadius: 12, border: '1px solid rgba(245, 158, 11, 0.1)' }}>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 28, fontWeight: 700, color: '#F59E0B' }}>{[247, 89, 12, 7][i - 1]}</div>
                <div style={{ fontSize: 10, color: '#44403C', fontWeight: 500, marginTop: 4 }}>{['Leads', 'Sent', 'Sequences', 'Meetings'][i - 1]}</div>
                <div style={{ fontSize: 8, color: '#10B981', marginTop: 4, fontFamily: 'var(--font-space-mono)' }}>+{[12, 8, 3, 2][i - 1]} today</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      letter: 'E',
      title: 'Email AI Builder',
      description: 'GPT-4 powered personalization that writes emails your prospects actually want to read. Each message feels handcrafted, because it was—by AI.',
      mockup: (
        <div style={{ position: 'relative' }}>
          {/* AI Processing indicator */}
          <div style={{ position: 'absolute', top: -8, right: -8, display: 'flex', alignItems: 'center', gap: 4, background: '#FFFDF7', padding: '4px 8px', borderRadius: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)' }} />
            <span style={{ fontSize: 9, color: '#8B5CF6', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>AI</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, padding: 12, background: 'rgba(0,0,0,0.03)', borderRadius: 8, border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 9, color: '#78716C', marginBottom: 8, fontWeight: 600 }}>PROMPT</div>
              <div style={{ fontSize: 11, color: '#44403C', lineHeight: 1.5 }}>Personalize for tech CEO...</div>
            </div>
            <div style={{ flex: 1, padding: 12, background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.08), rgba(13, 148, 136, 0.02))', borderRadius: 8, border: '1px solid rgba(13, 148, 136, 0.15)' }}>
              <div style={{ fontSize: 9, color: '#0D9488', marginBottom: 8, fontWeight: 600 }}>OUTPUT</div>
              <div style={{ fontSize: 11, color: '#44403C', lineHeight: 1.5 }}>Hi Alex, I noticed your recent...</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      letter: 'S',
      title: 'Sequence Engine',
      description: 'Build multi-touch campaigns that run themselves. A/B testing, smart delays, and automatic follow-ups mean you set it once and watch the meetings roll in.',
      mockup: (
        <div style={{ position: 'relative' }}>
          {/* LIVE badge */}
          <div style={{ position: 'absolute', top: -8, right: -8, display: 'flex', alignItems: 'center', gap: 4, background: '#FFFDF7', padding: '4px 8px', borderRadius: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
            <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>LIVE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Initial outreach', 'Follow-up #1', 'Follow-up #2', 'Break-up email'].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 10, background: i < 3 ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.08), transparent)' : 'rgba(0,0,0,0.02)', borderRadius: 8, border: i < 3 ? '1px solid rgba(16, 185, 129, 0.15)' : '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: i < 3 ? 'linear-gradient(135deg, #10B981, #0D9488)' : 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', fontWeight: 600, boxShadow: i < 3 ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none' }}>{i + 1}</div>
                <span style={{ fontSize: 11, flex: 1, color: '#44403C', fontWeight: 500 }}>{step}</span>
                <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Day {i * 3 + 1}</span>
                {i < 3 && <span style={{ fontSize: 8, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: 4 }}>Active</span>}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      letter: 'I',
      title: 'Inbox Intelligence',
      description: 'Every reply automatically classified by intent. Hot leads surface instantly, and suggested responses help you close faster than ever.',
      mockup: (
        <div style={{ position: 'relative' }}>
          {/* LIVE badge */}
          <div style={{ position: 'absolute', top: -8, right: -8, display: 'flex', alignItems: 'center', gap: 4, background: '#FFFDF7', padding: '4px 8px', borderRadius: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
            <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>LIVE</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              {[
                { badge: 'HOT', color: '#F59E0B', text: 'Yes, let\'s talk', bg: 'rgba(245, 158, 11, 0.08)' },
                { badge: 'WARM', color: '#0D9488', text: 'Sounds interesting', bg: 'rgba(13, 148, 136, 0.08)' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '10px 12px', background: item.bg, borderRadius: 8, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${item.color}20` }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: item.color, fontFamily: 'var(--font-space-mono)' }}>{item.badge}</span>
                  <span style={{ fontSize: 10, flex: 1, color: '#44403C' }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ width: 100, padding: 16, background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02))', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 28, fontWeight: 700, color: '#F59E0B' }}>7</span>
              <span style={{ fontSize: 9, color: '#44403C', fontWeight: 500 }}>hot leads</span>
              <span style={{ fontSize: 8, color: '#10B981', marginTop: 4 }}>+3 today</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="section" ref={ref} style={{ background: '#FFF8ED', paddingTop: 80, paddingBottom: 80 }}>
      {/* Section blobs */}
      <div className="blob blob-gold" style={{ width: 500, height: 500, top: '10%', right: '-10%' }} />
      <div className="blob blob-teal" style={{ width: 400, height: 400, bottom: '20%', left: '-5%' }} />
      <div className="dot-grid" />

      {/* Section spotlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline - Fixed visibility */}
        <div
          className="overline reveal"
          style={{
            opacity: visible ? 1 : 0,
            textAlign: 'center',
            marginBottom: 8,
            position: 'relative',
            zIndex: 10,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 100ms',
          }}
        >
          <MIcon />
          PLATFORM FEATURES
        </div>

        {/* Heading - Fixed visibility */}
        <h2 style={{
          marginBottom: 60,
          opacity: visible ? 1 : 0,
          transition: 'all 0.6s ease 200ms',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}>
          Every tool your outreach machine needs.
        </h2>

        {/* Feature sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {features.map((feature, i) => (
            <div
              key={feature.letter}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 60,
                alignItems: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 150}ms`,
              }}
            >
              {/* Ghost letter */}
              <div
                style={{
                  position: 'absolute',
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 280,
                  fontWeight: 900,
                  color: '#F59E0B',
                  opacity: 0.04,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  ...(i % 2 === 0 ? { left: '-5%' } : { right: '-5%' }),
                }}
              >
                {feature.letter}
              </div>

              {/* Content */}
              <div style={{ order: i % 2 === 0 ? 1 : 2, position: 'relative', zIndex: 10 }}>
                <h3 style={{ fontSize: 32, marginBottom: 16, color: '#0C0A09', fontWeight: 700 }}>{feature.title}</h3>
                <p style={{ fontSize: 16, color: '#44403C', lineHeight: 1.8, marginBottom: 24 }}>{feature.description}</p>
                <button className="btn btn-secondary" onClick={() => {}} style={{ fontWeight: 500 }}>
                  Learn More →
                </button>
              </div>

              {/* Mockup */}
              <div
                className="card"
                style={{
                  order: i % 2 === 0 ? 2 : 1,
                  padding: 24,
                  transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)`,
                  background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF8ED 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(245, 158, 11, 0.05)',
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                {feature.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
