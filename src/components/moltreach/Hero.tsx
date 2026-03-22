import MIcon from './MIcon';
'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  const [visible, setVisible] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setVisible(true), 100);

    // Activity feed rotation
    const activityTimer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % 5);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(activityTimer);
    };
  }, []);

  const activities = [
    { text: 'Email sent to Alex Chen, CTO at DataVault', time: '2s ago' },
    { text: 'New lead: Sarah Park, VP Sales at NexScale', time: '45s ago' },
    { text: 'Reply received from James Miller, CEO', time: '2m ago' },
    { text: 'Meeting booked: Priya Sharma, Stackron', time: '5m ago' },
    { text: 'Sequence completed: 47 targets reached', time: '8m ago' },
  ];

  const chartBars = [45, 62, 38, 78, 52, 89, 67];

  // M icon SVG for branding

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background SVG decorations */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.15,
        }}
        viewBox="0 0 800 800"
      >
        {/* Concentric circles */}
        <circle cx="600" cy="200" r="320" fill="none" stroke="#0D9488" strokeWidth="1" style={{ animation: 'spin 40s linear infinite' }} />
        <circle cx="600" cy="200" r="200" fill="none" stroke="#0D9488" strokeWidth="1" style={{ animation: 'spin 30s linear infinite reverse' }} />
        <circle cx="600" cy="200" r="100" fill="none" stroke="#F59E0B" strokeWidth="1.5" style={{ animation: 'spin 20s linear infinite' }} />
        
        {/* Radial lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="600"
            y1="200"
            x2={600 + Math.cos((angle * Math.PI) / 180) * 350}
            y2={200 + Math.sin((angle * Math.PI) / 180) * 350}
            stroke="rgba(13, 148, 136, 0.3)"
            strokeWidth="1"
          />
        ))}
        
        {/* Teal arcs */}
        <path d="M0 600 Q200 500 400 600" fill="none" stroke="#0D9488" strokeWidth="2" opacity="0.3" />
        <path d="M0 700 Q300 600 600 700" fill="none" stroke="#0D9488" strokeWidth="1.5" opacity="0.2" />
      </svg>

      {/* Hero content */}
      <div className="hero-content">
        <div className="hero-left">
          {/* Badge */}
          <div
            className="hero-badge reveal"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '100ms' }}
          >
            <div className="hero-badge-dot" />
            <span>AI outreach running for 1,200+ B2B teams</span>
          </div>

          {/* Headline */}
          <h1 style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              className="hero-headline-line"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '200ms' }}
            >
              Your pipeline,
            </span>
            <span
              className="hero-headline-line"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
                color: '#F59E0B',
                fontStyle: 'italic',
              }}
            >
              filled itself.
            </span>
            <span
              className="hero-headline-line"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '400ms',
                fontSize: 'clamp(32px, 4vw, 60px)',
                fontWeight: 300,
                color: 'rgba(12, 10, 9, 0.42)',
              }}
            >
              While you slept.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="hero-subheadline reveal"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '500ms' }}
          >
            MoltReach finds your perfect B2B customers, writes them a deeply personalized AI email, sends it automatically, and follows up until they reply. Your only job is closing.
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas reveal"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '600ms' }}
          >
            <button className="btn btn-primary" onClick={onOpenModal}>
              Start For Free — No Card Needed
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ▷ See How It Works ↓
            </button>
          </div>

          {/* Trust row */}
          <div
            className="hero-trust reveal"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '700ms' }}
          >
            <div className="hero-avatars">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="hero-avatar" style={{ background: `hsl(${i * 50}, 70%, 80%)` }} />
              ))}
            </div>
            <span className="hero-stars">★★★★★</span>
            <span className="hero-trust-text">1,200+ B2B teams</span>
          </div>
        </div>

        {/* Right column - floating cards - MAIN CARD HORIZONTAL, SUB CARDS VISIBLE */}
        <div className="hero-right" style={{ height: '680px', overflow: 'visible', position: 'relative' }}>
          
          {/* Reply Rate Donut Card - TOP LEFT, ABOVE MAIN CARD */}
          <div
            className="hero-card float float-delay-3"
            style={{
              width: 140,
              top: 0,
              left: 30,
              zIndex: 6,
              opacity: visible ? 1 : 0,
              transform: visible ? 'rotate(-3deg)' : 'rotate(-3deg) translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '400ms',
            }}
          >
            {/* LIVE badge */}
            <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulseDot 2s infinite' }} />
              <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
            </div>
            <svg width="80" height="80" viewBox="0 0 100 100" style={{ display: 'block', margin: '0 auto' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40 * 0.85} ${2 * Math.PI * 40 * 0.15}`}
                transform="rotate(-90 50 50)"
                style={{
                  strokeDashoffset: visible ? 0 : 2 * Math.PI * 40,
                  transition: 'stroke-dashoffset 1s ease 0.8s',
                  filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
                }}
              />
              <text x="50" y="50" textAnchor="middle" dy="6" style={{ fontFamily: 'var(--font-space-mono)', fontSize: 18, fontWeight: 700, fill: '#F59E0B' }}>85%</text>
            </svg>
            <div style={{ textAlign: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: '#78716C' }}>Reply Rate</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: 2 }}>
              <span style={{ fontSize: 9, color: '#EF4444' }}>vs 8% avg</span>
            </div>
          </div>

          {/* Email Preview Card - TOP RIGHT, ABOVE MAIN CARD */}
          <div
            className="hero-card float float-delay-2"
            style={{
              width: 155,
              top: 10,
              right: 30,
              zIndex: 5,
              opacity: visible ? 1 : 0,
              transform: visible ? 'rotate(2.5deg)' : 'rotate(2.5deg) translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '500ms',
            }}
          >
            {/* LIVE badge */}
            <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulseDot 2s infinite' }} />
              <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, color: '#0C0A09' }}>Subject: Partnership</div>
            <div style={{ fontSize: 10, color: '#78716C', lineHeight: 1.5 }}>
              <p style={{ marginBottom: 4 }}>Hi {'{'}firstName{'}'},</p>
              <p style={{ marginBottom: 3 }}>I noticed your post...</p>
              <div style={{ height: 6, background: 'linear-gradient(90deg, rgba(245,158,11,0.3), transparent)', borderRadius: 3, marginBottom: 3 }} />
              <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3, marginBottom: 3 }} />
              <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3, width: '70%' }} />
            </div>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#10B981', fontSize: 10 }}>✓ AI — 94/100</span>
            </div>
          </div>

          {/* Main Dashboard Card - HORIZONTAL, LEFT EDGE AT CENTER, FULLY VISIBLE */}
          <div
            className="hero-card float"
            style={{
              width: 440,
              height: 'auto',
              top: '145px',
              left: '-50px',  // Left edge extends into left side area
              right: '20px',  // Right edge with gap from right side
              transform: visible ? 'rotate(0.8deg)' : 'rotate(0.8deg) translateY(60px)',
              zIndex: 3,
              opacity: visible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '300ms',
            }}
          >
            {/* Traffic light dots */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MIcon />
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 12, color: '#78716C' }}>MoltReach — live</span>
              </div>
              <span style={{ padding: '2px 8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: 100, fontSize: 10, fontFamily: 'var(--font-space-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulseDot 2s infinite' }} />
                LIVE
              </span>
            </div>

            {/* KPI tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: 12, background: 'rgba(245, 158, 11, 0.08)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 22, fontWeight: 700, color: '#F59E0B' }}>1,247</div>
                <div style={{ fontSize: 10, color: '#78716C', marginTop: 2 }}>Leads</div>
              </div>
              <div style={{ padding: 12, background: 'rgba(13, 148, 136, 0.08)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 22, fontWeight: 700, color: '#0D9488' }}>892</div>
                <div style={{ fontSize: 10, color: '#78716C', marginTop: 2 }}>Sent</div>
              </div>
              <div style={{ padding: 12, background: 'rgba(16, 185, 129, 0.08)', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 22, fontWeight: 700, color: '#10B981' }}>7</div>
                <div style={{ fontSize: 10, color: '#78716C', marginTop: 2 }}>Meetings</div>
              </div>
            </div>

            {/* Chart */}
            <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 16 }}>
              {chartBars.map((height, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    background: `linear-gradient(to top, #F59E0B, #FCD34D)`,
                    borderRadius: 4,
                    transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'bottom',
                    transition: `transform 0.5s ease ${0.5 + i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Live activity feed */}
            <div style={{ padding: 12, background: 'rgba(0,0,0,0.03)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: '#78716C', marginBottom: 8, fontFamily: 'var(--font-space-mono)' }}>LIVE ACTIVITY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: 12, color: '#44403C' }}>{activities[activityIndex].text}</span>
              </div>
            </div>
            
            {/* Powered by */}
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
            </div>
          </div>

          {/* Slack Notification Card - BOTTOM LEFT, BELOW MAIN CARD */}
          <div
            className="hero-card float float-delay-4"
            style={{
              width: 180,
              bottom: 20,
              left: 20,
              zIndex: 6,
              opacity: visible ? 1 : 0,
              transform: visible ? 'rotate(-2deg)' : 'rotate(-2deg) translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '600ms',
            }}
          >
            {/* LIVE badge */}
            <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulseDot 2s infinite' }} />
              <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 24, height: 24, background: '#4A154B', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10 }}>S</div>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Slack</span>
            </div>
            <div style={{ fontSize: 12, color: '#44403C' }}>
              🔥 <strong>HOT reply</strong> — Alex Chen, CTO at DataVault
            </div>
          </div>

          {/* Campaign Stats Card - BOTTOM RIGHT */}
          <div
            className="hero-card float float-delay-5"
            style={{
              width: 145,
              bottom: 40,
              right: 25,
              zIndex: 5,
              opacity: visible ? 1 : 0,
              transform: visible ? 'rotate(2deg)' : 'rotate(2deg) translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '700ms',
            }}
          >
            <div style={{ fontSize: 10, color: '#78716C', marginBottom: 8, fontFamily: 'var(--font-space-mono)' }}>CAMPAIGN A</div>
            {[
              { label: 'Open', value: 45, color: '#F59E0B' },
              { label: 'Click', value: 32, color: '#0D9488' },
              { label: 'Reply', value: 28, color: '#10B981' },
            ].map((stat) => (
              <div key={stat.label} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, marginBottom: 2 }}>
                  <span>{stat.label}</span>
                  <span style={{ fontFamily: 'var(--font-space-mono)' }}>{stat.value}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(0,0,0,0.06)', borderRadius: 2 }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${stat.value}%`,
                      background: stat.color,
                      borderRadius: 2,
                      transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.5s ease 0.9s',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        onClick={() => document.getElementById('logo-bar')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="scroll-indicator-text">SCROLL</span>
        <div className="scroll-indicator-line" />
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
