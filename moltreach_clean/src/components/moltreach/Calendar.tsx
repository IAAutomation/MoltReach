'use client';

import MIcon from './MIcon';
import { useEffect, useRef, useState } from 'react';

export default function Calendar() {
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

  // Generate calendar days
  const beforeDays = Array(35).fill(null).map(() => ({
    hasEvent: Math.random() < 0.1,
  }));

  const afterDays = Array(35).fill(null).map(() => ({
    hasEvent: Math.random() < 0.65,
  }));

  const meetings = [
    { name: 'Alex Chen', company: 'DataVault', time: '9:00 AM' },
    { name: 'Sarah Park', company: 'NexScale', time: '11:30 AM' },
    { name: 'James Miller', company: 'Loopbase', time: '2:00 PM' },
    { name: 'Priya Sharma', company: 'Stackron', time: '4:00 PM' },
    { name: 'Mark Johnson', company: 'TechCorp', time: '5:30 PM' },
  ];

  return (
    <section id="calendar" className="section" ref={ref} style={{ background: '#FFF8ED', paddingTop: 80, paddingBottom: 80 }}>
      {/* Section blobs */}
      <div className="blob blob-gold" style={{ width: 500, height: 500, top: '10%', left: '-10%' }} />
      <div className="blob blob-teal" style={{ width: 400, height: 400, bottom: '20%', right: '-5%' }} />
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
          YOUR CALENDAR FILLS ITSELF
        </div>

        {/* Heading - Fixed visibility */}
        <h2 style={{
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transition: 'all 0.6s ease 200ms',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}>
          From zero meetings to fully booked.
        </h2>

        {/* Calendar comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 60, position: 'relative', zIndex: 10 }}>
          {/* Before calendar */}
          <div
            className="card"
            style={{
              padding: 24,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
              background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF8ED 100%)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#44403C' }}>Before MoltReach</span>
              <span style={{ fontSize: 12, color: '#EF4444', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>1 meeting/week</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                <div key={day} style={{ textAlign: 'center', fontSize: 10, color: '#78716C', padding: 4, fontWeight: 500 }}>{day}</div>
              ))}
              {beforeDays.map((day, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    background: day.hasEvent ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.1))' : 'rgba(0,0,0,0.03)',
                    borderRadius: 4,
                    border: day.hasEvent ? '1px solid rgba(239, 68, 68, 0.4)' : 'none',
                  }}
                />
              ))}
            </div>
            {/* Flat line below */}
            <svg width="100%" height="40" style={{ marginTop: 16 }}>
              <line x1="0" y1="20" x2="100%" y2="20" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
              <text x="50%" y="32" textAnchor="middle" style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, fill: '#EF4444', opacity: 0.6 }}>stagnant</text>
            </svg>
          </div>

          {/* After calendar */}
          <div
            className="card"
            style={{
              padding: 24,
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF8ED 100%)',
              boxShadow: '0 0 32px rgba(16, 185, 129, 0.15)',
              position: 'relative',
            }}
          >
            {/* LIVE badge */}
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, background: '#FFFDF7', padding: '4px 8px', borderRadius: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
              <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>LIVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#44403C' }}>After MoltReach</span>
              <span style={{ fontSize: 12, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>22 meetings/week</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                <div key={day} style={{ textAlign: 'center', fontSize: 10, color: '#78716C', padding: 4, fontWeight: 500 }}>{day}</div>
              ))}
              {afterDays.map((day, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    background: day.hasEvent ? 'linear-gradient(135deg, #F59E0B, #FCD34D)' : 'rgba(0,0,0,0.03)',
                    borderRadius: 4,
                    border: day.hasEvent ? '1px solid rgba(245, 158, 11, 0.5)' : 'none',
                    boxShadow: day.hasEvent ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none',
                  }}
                />
              ))}
            </div>
            {/* Upward curve below */}
            <svg width="100%" height="40" style={{ marginTop: 16 }}>
              <defs>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
              </defs>
              <path
                d="M0 35 Q50% 5 100% 35"
                fill="none"
                stroke="url(#curveGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: visible ? 0 : 200,
                  transition: 'stroke-dashoffset 1.5s ease 0.8s',
                }}
              />
              <text x="50%" y="32" textAnchor="middle" style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, fill: '#10B981', fontWeight: 600 }}>+2100% growth</text>
            </svg>
          </div>
        </div>

        {/* Meeting cards */}
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, position: 'relative', zIndex: 10 }}>
          {meetings.map((meeting, i) => (
            <div
              key={meeting.name}
              className="card"
              style={{
                minWidth: 180,
                padding: 16,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease ${500 + i * 100}ms`,
                background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF8ED 100%)',
                border: '1px solid rgba(245, 158, 11, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${i * 50}, 70%, 80%), hsl(${i * 50}, 70%, 70%))` }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#44403C' }}>{meeting.name}</div>
                  <div style={{ fontSize: 11, color: '#78716C' }}>{meeting.company}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#F59E0B', fontWeight: 500 }}>
                <span>📅</span>
                <span>{meeting.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Powered by */}
        <div style={{ textAlign: 'center', marginTop: 24, position: 'relative', zIndex: 10 }}>
          <span style={{ fontSize: 10, color: '#A8A29E', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
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
