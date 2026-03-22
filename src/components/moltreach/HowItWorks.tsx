import MIcon from './MIcon';
'use client';

import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Lead Discovery',
      color: '#F59E0B',
      description: 'AI finds your ideal customers from 200M+ B2B contacts with precision targeting.',
      features: ['Apollo.io integration', 'Company & role filters', 'Real-time enrichment'],
      usageStat: 'Used by 94% of MoltReach teams',
      mockup: (
        <div style={{ background: 'rgba(245, 158, 11, 0.05)', borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 10, color: '#78716C' }}>Found 47 matching leads</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 7, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
            </div>
          </div>
          {/* Filled lead profiles */}
          {[
            { name: 'Alex Chen', role: 'CTO, DataVault', score: 94, company: 'B2B SaaS' },
            { name: 'Sarah Park', role: 'VP Sales, NexScale', score: 89, company: 'FinTech' },
            { name: 'James Miller', role: 'CEO, Stackron', score: 87, company: 'HR Tech' },
            { name: 'Priya Sharma', role: 'CFO, Loopbase', score: 82, company: 'Marketing' },
            { name: 'Mark Johnson', role: 'CTO, Orbitio', score: 78, company: 'Logistics' },
          ].map((lead, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10, 
              padding: '8px 10px', 
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              background: i === 0 ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
              borderRadius: i === 0 ? 8 : 0,
            }}>
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: `linear-gradient(135deg, ${['#F59E0B', '#0D9488', '#F97316', '#8B5CF6', '#10B981'][i]}, ${['#FCD34D', '#2DD4BF', '#FB923C', '#A78BFA', '#34D399'][i]})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 11,
                fontWeight: 700,
              }}>
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#0C0A09' }}>{lead.name}</div>
                <div style={{ fontSize: 9, color: '#78716C' }}>{lead.role}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>{lead.score}%</div>
                <div style={{ fontSize: 8, color: '#78716C' }}>match</div>
              </div>
            </div>
          ))}
          {/* Lead score legend */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: '8px 10px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 8 }}>
            <span style={{ fontSize: 9, color: '#78716C' }}>Avg Score</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>86%</span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'AI Personalization',
      color: '#0D9488',
      description: 'GPT-4 writes hyper-personalized emails for each lead using their actual LinkedIn activity.',
      features: ['GPT-4 powered writing', 'LinkedIn signal integration', 'Spam score optimization'],
      usageStat: 'Used by 98% of MoltReach teams',
      mockup: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 9, color: '#78716C', marginBottom: 8 }}>PROMPT</div>
            <div style={{ fontSize: 10, color: '#44403C', lineHeight: 1.5 }}>
              Personalize for tech CEO interested in AI...
            </div>
          </div>
          <div style={{ background: 'rgba(13, 148, 136, 0.05)', borderRadius: 8, padding: 12, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 7, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
            </div>
            <div style={{ fontSize: 9, color: '#78716C', marginBottom: 8 }}>OUTPUT</div>
            <div style={{ fontSize: 10, color: '#44403C', lineHeight: 1.5 }}>
              Hi Alex, your post about AI automation caught my eye...
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Automated Sending',
      color: '#F97316',
      description: 'Multi-touch sequences sent at optimal times automatically — you set it once and let it run.',
      features: ['Smart send times', 'A/B testing built-in', 'Auto follow-ups'],
      usageStat: 'Used by 91% of MoltReach teams',
      mockup: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Day 1: Initial outreach', 'Day 3: Follow-up #1', 'Day 7: Follow-up #2', 'Day 14: Final push', 'Day 21: Break-up email'].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: i < 3 ? '#10B981' : 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10 }}>
                {i < 3 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 11, color: i < 3 ? '#44403C' : '#78716C' }}>{step}</span>
              {i === 2 && (
                <span style={{ marginLeft: 'auto', fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>● SENDING</span>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      num: '04',
      title: 'Meetings Booked',
      color: '#10B981',
      description: 'Hot replies trigger instant notifications, calendars fill up while you focus on closing deals.',
      features: ['Slack instant alerts', 'Calendar auto-booking', 'Intent classification'],
      usageStat: 'Used by 96% of MoltReach teams',
      mockup: (
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.03)', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 9, color: '#78716C', marginBottom: 8 }}>INBOX</div>
            {['Reply: "Yes, let\'s talk"', 'Reply: "Sounds interesting"'].map((msg, i) => (
              <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: i === 0 ? '#F59E0B' : '#0D9488', fontWeight: 600, fontSize: 8 }}>
                  {i === 0 ? '🔥 HOT' : 'WARM'}
                </span>
                <span style={{ color: '#44403C', flex: 1 }}>{msg}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 80, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 8, padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 4, right: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 20, fontWeight: 700, color: '#10B981' }}>7</span>
            <span style={{ fontSize: 8, color: '#78716C' }}>meetings</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="section" ref={ref} style={{ paddingTop: 80, paddingBottom: 60 }}>
      {/* Section blobs */}
      <div className="blob blob-teal" style={{ width: 400, height: 400, top: '10%', left: '-10%' }} />
      <div className="blob blob-gold" style={{ width: 300, height: 300, bottom: '20%', right: '-5%' }} />
      <div className="dot-grid" />
      
      {/* Section spotlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div 
          className="overline reveal" 
          style={{ 
            opacity: visible ? 1 : 0, 
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 100ms',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <MIcon />
          HOW IT WORKS
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 8, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', position: 'relative', zIndex: 10 }}>
          Four steps.{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>Zero</span>
          {' '}manual work.
        </h2>
        
        {/* Subheading */}
        <p style={{ 
          fontSize: 17, 
          color: '#44403C', 
          maxWidth: 600, 
          marginBottom: 32, 
          opacity: visible ? 1 : 0, 
          transition: 'all 0.6s ease 300ms',
          position: 'relative',
          zIndex: 10,
        }}>
          From finding leads to booking meetings, MoltReach handles the entire outreach workflow automatically.
        </p>

        {/* Accent line */}
        <div style={{
          width: 60,
          height: 3,
          background: 'linear-gradient(90deg, #F59E0B, #0D9488)',
          borderRadius: 2,
          marginBottom: 40,
        }} />

        {/* Pipeline connector SVG */}
        <svg
          width="100%"
          height="40"
          viewBox="0 0 1200 40"
          style={{ marginBottom: 32, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 300ms' }}
        >
          <defs>
            <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="pathGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M150 20 Q300 20 450 20 Q600 20 750 20 Q900 20 1050 20"
            fill="none"
            stroke="url(#pipeGradient)"
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity="0.5"
            filter="url(#pathGlow)"
          />
          {/* Traveling dots */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              r="4"
              fill="#F59E0B"
              opacity="0.8"
            >
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${i * 0.83}s`}
                path="M150 20 Q300 20 450 20 Q600 20 750 20 Q900 20 1050 20"
              />
            </circle>
          ))}
        </svg>

        {/* Step cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms`,
                borderTop: `3px solid ${step.color}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card inner gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
                pointerEvents: 'none',
              }} />
              
              {/* Ghost number */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 120,
                  fontWeight: 900,
                  color: step.color,
                  opacity: 0.055,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                {step.num}
              </div>

              {/* LIVE badge */}
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, zIndex: 2 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 7, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${step.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: step.color }} />
                </div>

                <h3 style={{ fontSize: 20, marginBottom: 8, color: '#0C0A09' }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#78716C', marginBottom: 16, lineHeight: 1.6 }}>{step.description}</p>
                
                {/* Features */}
                <div style={{ marginBottom: 16 }}>
                  {step.features.map((feature, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: step.color }} />
                      <span style={{ fontSize: 12, color: '#44403C' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Mockup */}
                {step.mockup}
                
                {/* Learn more link */}
                <div style={{ marginTop: 16 }}>
                  <span style={{ fontSize: 12, color: '#0D9488', fontWeight: 500, cursor: 'pointer' }}>Learn More →</span>
                </div>
                
                {/* Usage stat */}
                <div style={{ marginTop: 12, textAlign: 'right' }}>
                  <span style={{ fontSize: 10, color: '#F59E0B', fontFamily: 'var(--font-space-mono)' }}>{step.usageStat}</span>
                </div>
                
                {/* Powered by */}
                <div style={{ marginTop: 8, textAlign: 'right' }}>
                  <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
                </div>
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
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
