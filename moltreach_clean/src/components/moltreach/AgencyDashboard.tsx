import MIcon from './MIcon';
'use client';

import { useEffect, useRef, useState } from 'react';

interface AgencyDashboardProps {
  onOpenModal: () => void;
}

export default function AgencyDashboard({ onOpenModal }: AgencyDashboardProps) {
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState({ clients: 0, emails: 0, meetings: 0, replyRate: 0 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Animate counters
          const targets = { clients: 12, emails: 48291, meetings: 89, replyRate: 31 };
          const duration = 1800;
          const start = Date.now();

          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            setCounters({
              clients: Math.round(targets.clients * eased),
              emails: Math.round(targets.emails * eased),
              meetings: Math.round(targets.meetings * eased),
              replyRate: Math.round(targets.replyRate * eased),
            });

            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // M icon for branding

  const clients = [
    { name: 'DataVault Inc', initials: 'DV', industry: 'B2B SaaS', color: '#F59E0B', emails: 892, replyRate: 34, meetings: 12, target: 80, status: 'active' },
    { name: 'Stackron', initials: 'ST', industry: 'Recruiting', color: '#0D9488', emails: 654, replyRate: 28, meetings: 8, target: 65, status: 'active' },
    { name: 'Loopbase', initials: 'LB', industry: 'Marketing', color: '#F97316', emails: 1247, replyRate: 31, meetings: 15, target: 95, status: 'active' },
    { name: 'Orbitio', initials: 'OR', industry: 'Logistics', color: '#8B5CF6', emails: 423, replyRate: 22, meetings: 5, target: 42, status: 'active' },
    { name: 'Nexscale', initials: 'NX', industry: 'HR Tech', color: '#10B981', emails: 788, replyRate: 29, meetings: 9, target: 72, status: 'active' },
    { name: 'Driftware', initials: 'DW', industry: 'FinTech', color: '#EF4444', emails: 321, replyRate: 18, meetings: 3, target: 30, status: 'attention' },
  ];

  return (
    <section id="agency-dashboard" className="section" ref={ref} style={{ background: '#FFF8ED', paddingTop: 80, paddingBottom: 80 }}>
      {/* Section blobs */}
      <div className="blob blob-gold" style={{ width: 400, height: 400, top: '10%', right: '-10%' }} />
      <div className="blob blob-coral" style={{ width: 350, height: 350, bottom: '20%', left: '-5%' }} />
      <div className="dot-grid" />
      
      {/* Section spotlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
          BUILT FOR AGENCIES
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 8, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', position: 'relative', zIndex: 10 }}>
          Manage every client from{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>one</span>
          {' '}command center.
        </h2>
        
        {/* Subheading */}
        <p style={{ 
          fontSize: 17, 
          color: '#44403C', 
          maxWidth: 650, 
          marginBottom: 48, 
          opacity: visible ? 1 : 0, 
          transition: 'all 0.6s ease 300ms',
          position: 'relative',
          zIndex: 10,
        }}>
          One login. Every client. All their campaigns, leads, and results visible in a single agency dashboard. White-label it with your own brand and charge what you want.
        </p>

        {/* Accent line */}
        <div style={{
          width: 60,
          height: 3,
          background: 'linear-gradient(90deg, #F59E0B, #0D9488)',
          borderRadius: 2,
          marginBottom: 48,
        }} />

        {/* Main agency dashboard panel */}
        <div
          className="glass-panel"
          style={{
            width: '100%',
            padding: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
          }}
        >
          {/* Agency header bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #F59E0B, #F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#0C0A09', fontWeight: 700, fontSize: 18 }}>YA</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Your Agency Name</div>
                <div style={{ fontSize: 9, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase' }}>Agency Dashboard</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ padding: '4px 12px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', borderRadius: 100, fontSize: 12, fontFamily: 'var(--font-space-mono)' }}>
                  {counters.clients} Active Clients
                </span>
                <span style={{ padding: '4px 12px', background: 'rgba(13, 148, 136, 0.1)', color: '#0D9488', borderRadius: 100, fontSize: 12, fontFamily: 'var(--font-space-mono)' }}>
                  247 Campaigns Running
                </span>
              </div>
              <button className="btn btn-primary" onClick={onOpenModal} style={{ padding: '10px 20px', fontSize: 13 }}>
                + Add Client
              </button>
            </div>
          </div>

          {/* Agency KPI tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
            {[
              { label: 'TOTAL CLIENTS', value: counters.clients, color: '#F59E0B', trend: '+2 this month', trendColor: '#10B981' },
              { label: 'EMAILS THIS MONTH', value: counters.emails, color: '#0D9488', trend: '+18% vs last month', trendColor: '#10B981' },
              { label: 'MEETINGS BOOKED', value: counters.meetings, color: '#F59E0B', trend: 'Across all clients', trendColor: '#78716C' },
              { label: 'AVG REPLY RATE', value: `${counters.replyRate}%`, color: '#10B981', trend: 'Above 28% benchmark', trendColor: '#10B981' },
            ].map((kpi, i) => (
              <div
                key={kpi.label}
                className="card"
                style={{
                  padding: 24,
                  textAlign: 'center',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${400 + i * 80}ms`,
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
                  height: 60,
                  background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
                  pointerEvents: 'none',
                }} />
                
                {/* LIVE badge */}
                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                </div>
                
                <div style={{ fontSize: 10, color: '#78716C', fontFamily: 'var(--font-space-mono)', marginBottom: 8, position: 'relative', zIndex: 1 }}>
                  {kpi.label}
                </div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 42, fontWeight: 700, color: kpi.color, position: 'relative', zIndex: 1 }}>
                  {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                </div>
                <div style={{ fontSize: 11, color: kpi.trendColor, marginTop: 8, position: 'relative', zIndex: 1 }}>{kpi.trend}</div>
              </div>
            ))}
          </div>

          {/* Client workspace grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
            {clients.map((client, i) => (
              <div
                key={client.name}
                className="card"
                style={{
                  padding: 20,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${500 + i * 80}ms`,
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: `3px solid ${client.status === 'attention' ? '#EF4444' : client.color}`,
                }}
              >
                {/* Card inner gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
                  pointerEvents: 'none',
                }} />
                
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: client.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: 12 }}>{client.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{client.name}</div>
                      <div style={{ fontSize: 10, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>{client.industry}</div>
                    </div>
                  </div>
                  <span style={{ 
                    padding: '3px 8px', 
                    background: client.status === 'attention' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                    color: client.status === 'attention' ? '#EF4444' : '#10B981', 
                    borderRadius: 100, 
                    fontSize: 9,
                    fontFamily: 'var(--font-space-mono)',
                  }}>
                    {client.status === 'attention' ? 'NEEDS ATTENTION' : 'Active'}
                  </span>
                </div>
                
                {/* Metrics row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16, position: 'relative', zIndex: 1 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 16, fontWeight: 700, color: '#F59E0B' }}>{client.emails.toLocaleString()}</div>
                    <div style={{ fontSize: 9, color: '#78716C' }}>Emails</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 16, fontWeight: 700, color: '#0D9488' }}>{client.replyRate}%</div>
                    <div style={{ fontSize: 9, color: '#78716C' }}>Reply</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 16, fontWeight: 700, color: '#10B981' }}>{client.meetings}</div>
                    <div style={{ fontSize: 9, color: '#78716C' }}>Meetings</div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div style={{ marginBottom: 12, position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Monthly Target</span>
                    <span style={{ fontSize: 10, color: '#F59E0B', fontFamily: 'var(--font-space-mono)' }}>{client.target}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 3 }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${client.target}%`, 
                        background: `linear-gradient(90deg, ${client.color}, ${client.color}CC)`, 
                        borderRadius: 3,
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: `transform 0.6s ease ${0.7 + i * 0.1}s`,
                      }} 
                    />
                  </div>
                </div>
                
                {/* Sparkline */}
                <svg width="100%" height="24" style={{ marginBottom: 8, position: 'relative', zIndex: 1 }}>
                  <polyline
                    fill="none"
                    stroke={client.color}
                    strokeWidth="2"
                    points={`0,${20 - Math.random() * 10} 20,${20 - Math.random() * 15} 40,${20 - Math.random() * 12} 60,${20 - Math.random() * 18} 80,${20 - Math.random() * 8}`}
                    opacity="0.5"
                  />
                </svg>
                
                {/* Footer row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: 9, color: '#78716C' }}>Last active: 2 hours ago</span>
                  <span style={{ fontSize: 11, color: '#0D9488', fontWeight: 500, cursor: 'pointer' }}>View Dashboard →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Agency performance chart - Enhanced */}
          <div className="card" style={{ padding: 24, marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.06), transparent)',
              pointerEvents: 'none',
            }} />

            {/* LIVE badge */}
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, zIndex: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
              <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>LIVE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 11, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                AGENCY-WIDE PERFORMANCE
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 10, color: '#10B981', fontFamily: 'var(--font-space-mono)', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: 4 }}>
                  +23% vs Last Month
                </span>
              </div>
            </div>

            {/* Summary Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24, position: 'relative', zIndex: 1 }}>
              {[
                { label: 'Total Emails', value: '4,725', trend: '+18%', color: '#F59E0B' },
                { label: 'Avg Reply Rate', value: '27%', trend: '+5%', color: '#0D9488' },
                { label: 'Total Meetings', value: '52', trend: '+12', color: '#10B981' },
                { label: 'Active Campaigns', value: '24', trend: '→', color: '#F97316' },
              ].map((stat, i) => (
                <div key={stat.label} style={{ padding: 12, background: 'rgba(0,0,0,0.02)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#78716C', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 9, color: stat.trend.includes('+') ? '#10B981' : '#78716C' }}>{stat.trend} this week</div>
                </div>
              ))}
            </div>

            {/* Grouped Bar Chart with Average Lines */}
            <div style={{ position: 'relative', height: 200, marginBottom: 16, position: 'relative', zIndex: 1 }}>
              {/* Y-axis */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 24, width: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 8 }}>
                {['100%', '75%', '50%', '25%', '0%'].map((label, i) => (
                  <span key={i} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 8, color: '#A8A29E' }}>{label}</span>
                ))}
              </div>

              {/* Average Lines */}
              <div style={{ position: 'absolute', left: 48, right: 16, top: 50, height: 2, background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)', opacity: 0.5, zIndex: 5 }} />
              <div style={{ position: 'absolute', left: 48, right: 16, top: 75, height: 2, background: 'linear-gradient(90deg, transparent, #0D9488, transparent)', opacity: 0.5, zIndex: 5, borderStyle: 'dashed' }} />

              {/* Average Labels */}
              <div style={{ position: 'absolute', left: 48, top: 42, fontSize: 8, color: '#F59E0B', fontFamily: 'var(--font-space-mono)', background: '#FFF8ED', padding: '2px 4px', borderRadius: 2, zIndex: 10 }}>Avg Emails: 69%</div>
              <div style={{ position: 'absolute', left: 48, top: 82, fontSize: 8, color: '#0D9488', fontFamily: 'var(--font-space-mono)', background: '#FFF8ED', padding: '2px 4px', borderRadius: 2, zIndex: 10 }}>Industry: 8%</div>

              {/* Grouped Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 160, marginLeft: 48, position: 'relative' }}>
                {clients.map((client, i) => (
                  <div key={client.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Trend indicator */}
                    <div style={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 9,
                      fontFamily: 'var(--font-space-mono)',
                      fontWeight: 600,
                      color: client.replyRate > 25 ? '#10B981' : '#EF4444',
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.3s ease ${0.8 + i * 0.05}s`,
                    }}>
                      {client.replyRate > 25 ? '↑' : '↓'}
                    </div>
                    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: '100%' }}>
                      {/* Emails bar */}
                      <div
                        style={{
                          width: 18,
                          height: `${(client.emails / 1300) * 100}%`,
                          background: `linear-gradient(to top, ${client.color}, ${client.color}99)`,
                          borderRadius: 4,
                          boxShadow: `0 0 12px ${client.color}40`,
                          transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                          transformOrigin: 'bottom',
                          transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.08}s`,
                          position: 'relative',
                        }}
                      >
                        <div style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
                      </div>
                      {/* Reply rate bar */}
                      <div
                        style={{
                          width: 18,
                          height: `${(client.replyRate / 40) * 100}%`,
                          background: 'linear-gradient(to top, #0D9488, #10B981)',
                          borderRadius: 4,
                          boxShadow: '0 0 12px rgba(13, 148, 136, 0.3)',
                          transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                          transformOrigin: 'bottom',
                          transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.4 + i * 0.08}s`,
                          position: 'relative',
                        }}
                      >
                        <div style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 8, color: '#78716C', textAlign: 'center', marginTop: 6, fontFamily: 'var(--font-space-mono)' }}>{client.initials}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Sparklines Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 16, position: 'relative', zIndex: 1 }}>
              {clients.map((client, i) => (
                <div key={`spark-${client.name}`} style={{ padding: 8, background: 'rgba(0,0,0,0.02)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: '#78716C', marginBottom: 4 }}>{client.initials}</div>
                  <svg width="100%" height="24" viewBox="0 0 60 24">
                    <polyline
                      fill="none"
                      stroke={client.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={[
                        `${i * 3},${20 - Math.random() * 10}`,
                        `${10 + i * 2},${20 - Math.random() * 12}`,
                        `${20 + i * 2},${20 - Math.random() * 15}`,
                        `${30 + i},${20 - Math.random() * 18}`,
                        `${40 + i * 0.5},${20 - Math.random() * 14}`,
                        `${50},${20 - Math.random() * 16}`
                      ].map(p => p).join(' ')}
                      opacity="0.8"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, background: 'linear-gradient(to top, #F59E0B, #FCD34D)', borderRadius: 3 }} />
                <span style={{ fontSize: 10, color: '#44403C', fontWeight: 500 }}>Emails (normalized)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, background: 'linear-gradient(to top, #0D9488, #10B981)', borderRadius: 3 }} />
                <span style={{ fontSize: 10, color: '#44403C', fontWeight: 500 }}>Reply Rate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 2, background: '#F59E0B', opacity: 0.5 }} />
                <span style={{ fontSize: 10, color: '#44403C', fontWeight: 500 }}>Agency Avg</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 2, background: '#0D9488', opacity: 0.5, borderStyle: 'dashed' }} />
                <span style={{ fontSize: 10, color: '#44403C', fontWeight: 500 }}>Industry Benchmark</span>
              </div>
            </div>

            {/* Powered by */}
            <div style={{ textAlign: 'center', marginTop: 12, position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 9, color: '#A8A29E', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
            </div>
          </div>

          {/* White-label preview strip */}
          <div style={{ padding: 24, background: 'rgba(245, 158, 11, 0.06)', borderRadius: 16, border: '1px solid rgba(245, 158, 11, 0.12)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 10, color: '#F59E0B', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase' }}>
                Your Brand. Your Platform.
              </div>
              <span style={{ fontSize: 11, color: '#78716C' }}>Fully white-labeled for Agency plan and above</span>
            </div>
            
            {/* Preview thumbnails */}
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              {['#3B82F6', '#EF4444', '#8B5CF6'].map((color, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: 200, 
                    height: 100, 
                    background: '#FFFDF7', 
                    borderRadius: 12, 
                    border: '1px solid rgba(0,0,0,0.1)',
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: color }} />
                    <span style={{ fontSize: 10, fontWeight: 600 }}>YourAgency</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: 4 }}>
                    <div style={{ flex: 1, background: `${color}15`, borderRadius: 4 }} />
                    <div style={{ flex: 1, background: `${color}10`, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32, position: 'relative', zIndex: 1 }}>
            <button className="btn btn-primary" onClick={onOpenModal} style={{ padding: '14px 32px' }}>
              Start Agency Plan — $349/month
            </button>
            <button className="btn btn-secondary" onClick={onOpenModal} style={{ padding: '13px 30px' }}>
              Book a Demo →
            </button>
          </div>
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
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
