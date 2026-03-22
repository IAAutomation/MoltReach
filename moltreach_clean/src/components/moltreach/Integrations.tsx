'use client';

import MIcon from './MIcon';
import { useEffect, useRef, useState } from 'react';

export default function Integrations() {
  const [visible, setVisible] = useState(false);
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);
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

  const integrations = [
    { name: 'Apollo.io', description: 'Lead enrichment & data', status: 'active', icon: '📊' },
    { name: 'OpenAI', description: 'AI email generation', status: 'active', icon: '🤖' },
    { name: 'Instantly.ai', description: 'Email deliverability', status: 'active', icon: '📧' },
    { name: 'Slack', description: 'Team notifications', status: 'active', icon: '💬' },
    { name: 'HubSpot', description: 'CRM sync', status: 'active', icon: '🎯' },
    { name: 'Gmail', description: 'Email sending', status: 'active', icon: '✉️' },
    { name: 'Zapier', description: 'Workflow automation', status: 'active', icon: '⚡' },
    { name: 'Salesforce', description: 'Enterprise CRM', status: 'soon', icon: '☁️' },
    { name: 'LinkedIn', description: 'Social outreach', status: 'soon', icon: '💼' },
  ];

  const dataFlowSteps = ['Apollo', 'MoltReach', 'OpenAI', 'Instantly', 'Slack'];

  return (
    <section id="integrations" className="section dark-section" ref={ref} style={{ background: 'linear-gradient(180deg, rgba(12, 10, 9, 0.99), rgba(12, 10, 9, 0.97))' }}>
      {/* Animated background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
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
            color: '#F59E0B',
          }}
        >
          <MIcon />
          INTEGRATIONS
        </div>

        {/* Heading - Fixed visibility */}
        <h2 style={{
          marginBottom: 60,
          opacity: visible ? 1 : 0,
          transition: 'all 0.6s ease 200ms',
          textAlign: 'center',
          color: '#FFFDF7',
          position: 'relative',
          zIndex: 10,
        }}>
          Connect{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>everything</span>.
        </h2>

        {/* Orbital hub visualization */}
        <div
          style={{
            width: 560,
            height: 560,
            margin: '0 auto 60px',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
          }}
        >
          {/* Center hexagon with glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 110,
              height: 110,
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 0 60px rgba(245, 158, 11, 0.5), 0 0 120px rgba(245, 158, 11, 0.3)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 24, fontWeight: 900, color: '#0C0A09' }}>M</span>
          </div>

          {/* Multiple pulsing rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 100 + ring * 30,
                height: 100 + ring * 30,
                border: `${ring === 1 ? 2 : 1}px solid rgba(245, 158, 11, ${0.4 - ring * 0.1})`,
                borderRadius: '50%',
                animation: `pulse ${2 + ring * 0.5}s ease-in-out infinite`,
                animationDelay: `${ring * 0.3}s`,
              }}
            />
          ))}

          {/* Orbit path */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 420,
              height: 420,
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
            }}
          />

          {/* Outer glow ring */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 480,
              height: 480,
              border: '1px solid rgba(245, 158, 11, 0.1)',
              borderRadius: '50%',
              boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)',
            }}
          />

          {/* Integration nodes */}
          {integrations.map((integration, i) => {
            const angle = (i * 360 / integrations.length) * (Math.PI / 180);
            const radius = 200;
            const x = Math.cos(angle - Math.PI / 2) * radius;
            const y = Math.sin(angle - Math.PI / 2) * radius;

            return (
              <div
                key={integration.name}
                style={{
                  position: 'absolute',
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  width: 95,
                  height: 95,
                  background: integration.status === 'soon'
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04))',
                  border: hoveredIntegration === integration.name
                    ? '2px solid #F59E0B'
                    : integration.status === 'soon'
                      ? '1.5px solid rgba(255, 255, 255, 0.1)'
                      : '1.5px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: hoveredIntegration === integration.name ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
                  zIndex: hoveredIntegration === integration.name ? 20 : 5,
                  boxShadow: hoveredIntegration === integration.name
                    ? '0 0 40px rgba(245, 158, 11, 0.4), 0 0 80px rgba(245, 158, 11, 0.2)'
                    : integration.status === 'active'
                      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                      : 'none',
                }}
                onMouseEnter={() => setHoveredIntegration(integration.name)}
                onMouseLeave={() => setHoveredIntegration(null)}
              >
                <span style={{ fontSize: 20 }}>{integration.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#FFFDF7', textAlign: 'center' }}>
                  {integration.name}
                </span>
                {integration.status === 'soon' && (
                  <span style={{ fontSize: 7, color: '#A8A29E', background: 'rgba(168, 162, 158, 0.2)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-space-mono)' }}>
                    SOON
                  </span>
                )}
                {integration.status === 'active' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)' }} />
                    <span style={{ fontSize: 7, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Connection lines with glowing dots */}
          {integrations.slice(0, 7).map((integration, i) => {
            const angle = (i * 360 / integrations.length) * (Math.PI / 180);
            return (
              <svg
                key={`line-${integration.name}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
                viewBox="0 0 560 560"
              >
                <defs>
                  <linearGradient id={`lineGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <line
                  x1="280"
                  y1="280"
                  x2={280 + Math.cos(angle - Math.PI / 2) * 200}
                  y2={280 + Math.sin(angle - Math.PI / 2) * 200}
                  stroke={`url(#lineGrad-${i})`}
                  strokeWidth="1.5"
                />
                <circle r="4" fill="#F59E0B" style={{ filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))' }}>
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.3}s`}
                    path={`M280,280 L${280 + Math.cos(angle - Math.PI / 2) * 200},${280 + Math.sin(angle - Math.PI / 2) * 200}`}
                  />
                </circle>
              </svg>
            );
          })}

          {/* Tooltip */}
          {hoveredIntegration && (
            <div
              style={{
                position: 'absolute',
                bottom: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF8ED 100%)',
                borderRadius: 16,
                padding: '16px 20px',
                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 32px rgba(245, 158, 11, 0.2)',
                whiteSpace: 'nowrap',
                zIndex: 30,
                border: '1px solid rgba(245, 158, 11, 0.2)',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0C0A09' }}>{hoveredIntegration}</div>
              <div style={{ fontSize: 12, color: '#44403C', marginTop: 4 }}>
                {integrations.find((i) => i.name === hoveredIntegration)?.description}
              </div>
              <div style={{ fontSize: 9, color: '#10B981', marginTop: 6, fontFamily: 'var(--font-space-mono)' }}>
                {integrations.find((i) => i.name === hoveredIntegration)?.status === 'active' ? '✓ Connected' : 'Coming Soon'}
              </div>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginBottom: 48, flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
          {[
            { value: '11', label: 'integrations' },
            { value: '5', label: 'min setup' },
            { value: 'Zero', label: 'code' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${600 + i * 100}ms`,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 32,
                fontWeight: 700,
                color: '#F59E0B',
                textShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255, 253, 247, 0.6)', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Data flow diagram */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
          {dataFlowSteps.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                className="card"
                style={{
                  padding: '14px 24px',
                  background: step === 'MoltReach'
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                  border: step === 'MoltReach'
                    ? '1.5px solid rgba(245, 158, 11, 0.4)'
                    : '1.5px solid rgba(255, 255, 255, 0.15)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.8)',
                  transition: `all 0.4s ease ${700 + i * 100}ms`,
                  boxShadow: step === 'MoltReach' ? '0 0 24px rgba(245, 158, 11, 0.2)' : 'none',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: step === 'MoltReach' ? '#F59E0B' : '#FFFDF7' }}>{step}</span>
              </div>
              {i < dataFlowSteps.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.5), rgba(245, 158, 11, 0.2))' }} />
                  <div style={{ width: 0, height: 0, borderLeft: '8px solid rgba(245, 158, 11, 0.5)', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48, position: 'relative', zIndex: 10 }}>
          <button className="btn btn-primary" style={{ padding: '16px 40px', boxShadow: '0 0 32px rgba(245, 158, 11, 0.3)' }}>
            Connect Your Stack — Free Setup Call →
          </button>
          <div style={{ marginTop: 12 }}>
            <span style={{ fontSize: 10, color: 'rgba(255, 253, 247, 0.4)', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.1; }
        }
        @media (max-width: 768px) {
          div[style*="width: 560"] {
            width: 320px !important;
            height: 320px !important;
          }
          div[style*="width: 420"] {
            width: 240px !important;
            height: 240px !important;
          }
          div[style*="width: 480"] {
            width: 280px !important;
            height: 280px !important;
          }
          div[style*="width: 95"] {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
