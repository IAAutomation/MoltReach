'use client';

import { useEffect, useRef, useState } from 'react';

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState({
    emails: 0,
    replyRate: 0,
    teams: 0,
    pipeline: 0,
    hoursSaved: 0,
    replyInDays: 0,
    moreMeetings: 0,
    industries: 0,
    setupTime: 0,
  });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          
          // Animate counters
          const targets = {
            emails: 4.2,
            replyRate: 28,
            teams: 1200,
            pipeline: 2.4,
            hoursSaved: 18,
            replyInDays: 94,
            moreMeetings: 3.2,
            industries: 47,
            setupTime: 5,
          };
          
          const duration = 1800;
          const start = Date.now();

          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            setCounters({
              emails: Math.round(targets.emails * eased * 10) / 10,
              replyRate: Math.round(targets.replyRate * eased),
              teams: Math.round(targets.teams * eased),
              pipeline: Math.round(targets.pipeline * eased * 10) / 10,
              hoursSaved: Math.round(targets.hoursSaved * eased),
              replyInDays: Math.round(targets.replyInDays * eased),
              moreMeetings: Math.round(targets.moreMeetings * eased * 10) / 10,
              industries: Math.round(targets.industries * eased),
              setupTime: Math.round(targets.setupTime * eased),
            });

            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: counters.emails, suffix: 'M+', label: 'emails per month' },
    { value: counters.replyRate, suffix: '%', label: 'reply rate' },
    { value: counters.teams, suffix: '+', label: 'active teams' },
    { value: counters.pipeline, suffix: 'M', label: 'pipeline monthly' },
    { value: counters.hoursSaved, suffix: 'hrs', label: 'saved weekly' },
    { value: counters.replyInDays, suffix: '%', label: 'see reply in 7 days' },
    { value: counters.moreMeetings, suffix: 'x', label: 'more meetings than SDR teams' },
    { value: counters.industries, suffix: '', label: 'industries served' },
    { value: counters.setupTime, suffix: ' min', label: 'average setup time' },
  ];

  return (
    <section id="social-proof" className="section dark-section" ref={ref}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div className="overline reveal" style={{ opacity: visible ? 1 : 0, textAlign: 'center', marginBottom: 8, color: '#F59E0B' }}>
          ◆ BY THE NUMBERS
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 60, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', textAlign: 'center', color: '#FFFDF7' }}>
          The results speak for themselves.
        </h2>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                padding: 32,
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${300 + i * 70}ms`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 48, fontWeight: 700, color: '#F59E0B' }}>
                {stat.value}{stat.suffix}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255, 253, 247, 0.55)', marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Live activity ticker */}
        <div style={{ marginTop: 48, overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              gap: 32,
              animation: 'marquee 40s linear infinite',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 100,
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: ['#F59E0B', '#10B981', '#0D9488'][i % 3] }} />
                <span style={{ fontSize: 12, color: 'rgba(255, 253, 247, 0.7)' }}>
                  {['🎉 Meeting booked', '🔥 Hot reply', '🚀 Campaign launched', '📈 Milestone hit', '✨ Leads enriched'][i % 5]}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255, 253, 247, 0.4)' }}>— {Math.floor(Math.random() * 60)}s ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
