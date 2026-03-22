import MIcon from './MIcon';
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Dashboard() {
  const [visible, setVisible] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);
  const [counters, setCounters] = useState({ leads: 0, emails: 0, sequences: 0, meetings: 0, replyRate: 0 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Animate counters
          const targets = { leads: 1247, emails: 892, sequences: 12, meetings: 7, replyRate: 85 };
          const duration = 1800;
          const start = Date.now();

          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            setCounters({
              leads: Math.round(targets.leads * eased),
              emails: Math.round(targets.emails * eased),
              sequences: Math.round(targets.sequences * eased),
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % 8);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const kpis = [
    { label: 'Leads Pipeline', value: counters.leads, color: '#F59E0B', prefix: '', trend: '+18%', sparkline: [20, 15, 18, 25, 30, 35] },
    { label: 'Emails Today', value: counters.emails, color: '#0D9488', prefix: '', trend: '+24%', sparkline: [10, 12, 15, 18, 22, 28] },
    { label: 'Active Sequences', value: counters.sequences, color: '#F97316', prefix: '', trend: '+3', sparkline: [8, 9, 10, 10, 11, 12] },
    { label: 'Meetings This Week', value: counters.meetings, color: '#10B981', prefix: '', trend: '+2', sparkline: [3, 4, 4, 5, 6, 7] },
    { label: 'Avg Reply Rate', value: counters.replyRate, color: '#8B5CF6', prefix: '', suffix: '%', trend: '+10.6x', sparkline: [28, 35, 42, 55, 68, 85] },
  ];

  const activities = [
    { type: 'email', text: 'Email sent to Alex Chen, CTO', time: '2s ago', color: '#F59E0B' },
    { type: 'lead', text: 'New lead: Sarah Park, VP Sales', time: '45s ago', color: '#0D9488' },
    { type: 'reply', text: 'Reply from James Miller, CEO', time: '2m ago', color: '#F97316' },
    { type: 'meeting', text: 'Meeting booked: Priya Sharma', time: '5m ago', color: '#10B981' },
    { type: 'email', text: 'Sequence completed: 47 targets', time: '8m ago', color: '#F59E0B' },
    { type: 'lead', text: 'Lead enriched: Mark Johnson', time: '12m ago', color: '#0D9488' },
    { type: 'reply', text: 'Hot reply: TechCorp interest', time: '15m ago', color: '#F97316' },
    { type: 'meeting', text: 'Calendar: 3 new slots booked', time: '20m ago', color: '#10B981' },
  ];

  const sequences = [
    { name: 'SaaS Founders', sent: 245, opens: 45, replies: 28, status: 'active', best: true, trend: 'up' },
    { name: 'Enterprise IT', sent: 189, opens: 38, replies: 22, status: 'active', best: false, trend: 'up' },
    { name: 'Marketing Leaders', sent: 312, opens: 52, replies: 31, status: 'active', best: false, trend: 'up' },
    { name: 'Finance Decision Makers', sent: 156, opens: 41, replies: 19, status: 'paused', best: false, trend: 'down' },
  ];

  const weeklyData = [
    { day: 'Mon', thisWeek: 124, lastWeek: 98 },
    { day: 'Tue', thisWeek: 156, lastWeek: 112 },
    { day: 'Wed', thisWeek: 89, lastWeek: 134 },
    { day: 'Thu', thisWeek: 201, lastWeek: 145 },
    { day: 'Fri', thisWeek: 178, lastWeek: 167 },
    { day: 'Sat', thisWeek: 67, lastWeek: 45 },
    { day: 'Sun', thisWeek: 45, lastWeek: 32 },
  ];

  return (
    <section id="dashboard" className="section" ref={ref} style={{ paddingTop: 80, paddingBottom: 80 }}>
      {/* Section blobs */}
      <div className="blob blob-gold" style={{ width: 450, height: 450, top: '5%', right: '-10%' }} />
      <div className="blob blob-teal" style={{ width: 350, height: 350, bottom: '10%', left: '-5%' }} />
      <div className="dot-grid" />
      
      {/* Section spotlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Ghost M watermark */}
      <div style={{
        position: 'absolute',
        fontFamily: 'var(--font-fraunces)',
        fontSize: 400,
        fontWeight: 900,
        color: '#F59E0B',
        opacity: 0.02,
        lineHeight: 1,
        pointerEvents: 'none',
        left: '30%',
        top: '20%',
      }}>
        M
      </div>

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
          THE PLATFORM
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 8, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', position: 'relative', zIndex: 10 }}>
          This is what your mornings look like.
        </h2>
        
        {/* Subheading */}
        <p style={{ 
          fontSize: 17, 
          color: '#44403C', 
          maxWidth: 600, 
          marginBottom: 48, 
          opacity: visible ? 1 : 0, 
          transition: 'all 0.6s ease 300ms',
          position: 'relative',
          zIndex: 10,
        }}>
          Your complete command center for B2B outreach. Track every lead, every email, every meeting — all in real-time.
        </p>

        {/* Accent line */}
        <div style={{
          width: 60,
          height: 3,
          background: 'linear-gradient(90deg, #F59E0B, #0D9488)',
          borderRadius: 2,
          marginBottom: 48,
        }} />

        {/* Main dashboard panel */}
        <div
          className="glass-panel"
          style={{
            width: '96%',
            maxWidth: 1400,
            margin: '0 auto',
            padding: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
          }}
        >
          {/* Row 1: KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
            {kpis.map((kpi, i) => (
              <div
                key={kpi.label}
                className="card"
                style={{
                  padding: 20,
                  borderLeft: `4px solid ${kpi.color}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${400 + i * 70}ms`,
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
                
                {/* Label */}
                <div style={{ 
                  fontSize: 9, 
                  color: '#78716C', 
                  marginBottom: 8, 
                  fontFamily: 'var(--font-space-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {kpi.label}
                </div>
                
                {/* Main number */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 32, fontWeight: 700, color: kpi.color }}>
                    {kpi.prefix}{kpi.value.toLocaleString()}{kpi.suffix}
                  </span>
                </div>
                
                {/* Trend badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 6px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  borderRadius: 100,
                  marginTop: 8,
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>
                    {kpi.trend} vs last week
                  </span>
                </div>
                
                {/* Sparkline */}
                <svg width="100%" height="20" style={{ marginTop: 8, position: 'relative', zIndex: 1 }}>
                  <polyline
                    fill="none"
                    stroke={kpi.color}
                    strokeWidth="2"
                    points={kpi.sparkline.map((v, idx) => `${idx * 20},${20 - v * 0.5}`).join(' ')}
                    opacity="0.5"
                  />
                </svg>
                
                {/* LIVE badge */}
                <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4, zIndex: 2 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Charts and Activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '45% 30% 25%', gap: 24, marginBottom: 24 }}>
            {/* Weekly Performance Chart */}
            <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
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
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 10, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase' }}>
                  WEEKLY PERFORMANCE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 9, color: '#78716C' }}>This Week vs Last Week</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                  </div>
                </div>
              </div>
              
              {/* Bar chart with growing line overlay */}
              <div style={{ position: 'relative', height: 140 }}>
                {/* Grid lines */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                  {[100, 75, 50, 25, 0].map((pct, i) => (
                    <div key={i} style={{ height: 1, background: 'rgba(245, 158, 11, 0.1)', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: -30, top: -4, fontSize: 8, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>{pct}</span>
                    </div>
                  ))}
                </div>
                
                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: '100%', paddingLeft: 30, position: 'relative', zIndex: 1 }}>
                  {weeklyData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: '100%', width: '100%' }}>
                        {/* This week bar */}
                        <div
                          style={{
                            flex: 1,
                            height: `${(d.thisWeek / 220) * 100}%`,
                            background: 'linear-gradient(to top, #F59E0B, #FCD34D)',
                            borderRadius: 3,
                            transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                            transformOrigin: 'bottom',
                            transition: `transform 0.5s ease ${0.5 + i * 0.08}s`,
                            position: 'relative',
                          }}
                        >
                          {/* Bar value label */}
                          <span style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: '#F59E0B', fontFamily: 'var(--font-space-mono)', fontWeight: 700 }}>{d.thisWeek}</span>
                        </div>
                        {/* Last week bar */}
                        <div
                          style={{
                            flex: 1,
                            height: `${(d.lastWeek / 220) * 100}%`,
                            background: 'rgba(12, 10, 9, 0.12)',
                            borderRadius: 3,
                            transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                            transformOrigin: 'bottom',
                            transition: `transform 0.5s ease ${0.6 + i * 0.08}s`,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 8, color: '#78716C', fontWeight: 500 }}>{d.day}</span>
                    </div>
                  ))}
                </div>
                
                {/* Growing trend line */}
                <svg style={{ position: 'absolute', inset: 0, paddingLeft: 30, pointerEvents: 'none' }}>
                  <defs>
                    <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#lineGrad2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    points="45,105 100,85 160,95 220,55 280,75 340,65 395,70"
                    strokeDasharray="400"
                    strokeDashoffset={visible ? 0 : 400}
                    style={{ transition: 'stroke-dashoffset 1.5s ease 0.8s' }}
                  />
                </svg>
              </div>
              
              {/* Metric pills */}
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                {[
                  { label: '↑ Emails', value: '+34%', color: '#10B981' },
                  { label: '↑ Replies', value: '+18%', color: '#10B981' },
                  { label: '↑ Opens', value: '+12%', color: '#10B981' },
                ].map((pill, i) => (
                  <div key={i} style={{ padding: '4px 8px', background: `${pill.color}15`, borderRadius: 100, fontSize: 9, color: pill.color }}>
                    {pill.label}: {pill.value}
                  </div>
                ))}
              </div>
              
              {/* Powered by */}
              <div style={{ textAlign: 'right', marginTop: 12, position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
              </div>
            </div>

            {/* Activity feed */}
            <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
                pointerEvents: 'none',
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 10, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase' }}>
                  LIVE ACTIVITY
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: 150, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                {activities.slice(activityIndex, activityIndex + 5).map((activity, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      background: 'rgba(0,0,0,0.02)',
                      borderRadius: 8,
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.3s ease ${i * 70}ms`,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: activity.color }} />
                    <span style={{ fontSize: 11, flex: 1 }}>{activity.text}</span>
                    <span style={{ fontSize: 9, color: '#78716C' }}>{activity.time}</span>
                  </div>
                ))}
              </div>
              
              {/* Powered by */}
              <div style={{ textAlign: 'right', marginTop: 12, position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
              </div>
            </div>

            {/* Donut chart */}
            <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
                pointerEvents: 'none',
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 10, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase' }}>
                  REPLY INTENT
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                </div>
              </div>
              
              <svg width="100" height="100" viewBox="0 0 120 120" style={{ display: 'block', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {[
                  { value: 0.28, color: '#F59E0B' },
                  { value: 0.22, color: '#0D9488' },
                  { value: 0.18, color: '#F97316' },
                  { value: 0.32, color: 'rgba(0,0,0,0.1)' },
                ].map((segment, i) => {
                  const radius = 45;
                  const circumference = 2 * Math.PI * radius;
                  let offset = 0;
                  for (let j = 0; j < i; j++) {
                    offset += 2 * Math.PI * radius * [0.28, 0.22, 0.18, 0.32][j];
                  }
                  return (
                    <circle
                      key={i}
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="12"
                      strokeDasharray={`${circumference * segment.value} ${circumference * (1 - segment.value)}`}
                      strokeDashoffset={-offset}
                      transform="rotate(-90 60 60)"
                      style={{
                        strokeDashoffset: visible ? -offset : circumference,
                        transition: `stroke-dashoffset 1s ease ${0.5 + i * 0.2}s`,
                      }}
                    />
                  );
                })}
              </svg>
              
              {/* Legend */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                {[
                  { label: 'Interested', color: '#F59E0B', value: '28%' },
                  { label: 'Warm', color: '#0D9488', value: '22%' },
                  { label: 'Neutral', color: '#F97316', value: '18%' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: 9, color: '#78716C' }}>{item.label}</span>
                    <span style={{ fontSize: 9, color: '#44403C', fontWeight: 600, fontFamily: 'var(--font-space-mono)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Trend badge */}
              <div style={{ textAlign: 'center', marginTop: 8, position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: 9, color: '#10B981' }}>+5% vs last week</span>
              </div>
            </div>
          </div>

          {/* Row 3: Sequence performance - REDESIGNED */}
          <div className="card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
              pointerEvents: 'none',
            }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'relative', zIndex: 1 }}>
              <div>
                <div style={{ fontSize: 10, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase', marginBottom: 4 }}>
                  SEQUENCE PERFORMANCE
                </div>
                <div style={{ fontSize: 12, color: '#78716C' }}>Real-time tracking across all campaigns</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, background: '#F59E0B', borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: '#78716C' }}>Opens</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, background: '#10B981', borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: '#78716C' }}>Replies</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 8, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
                </div>
              </div>
            </div>
            
            {/* Visual cards for each sequence */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, position: 'relative', zIndex: 1 }}>
              {sequences.map((seq, i) => (
                <div
                  key={seq.name}
                  style={{
                    padding: 16,
                    background: seq.best ? 'rgba(245, 158, 11, 0.06)' : 'rgba(0,0,0,0.02)',
                    borderRadius: 12,
                    border: seq.best ? '2px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(0,0,0,0.06)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s ease ${400 + i * 100}ms`,
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0C0A09', marginBottom: 2 }}>{seq.name}</div>
                      <div style={{ fontSize: 10, color: '#78716C' }}>{seq.sent.toLocaleString()} emails sent</div>
                    </div>
                    {seq.best && (
                      <span style={{ padding: '2px 8px', background: '#F59E0B', color: '#0C0A09', borderRadius: 100, fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-space-mono)' }}>BEST</span>
                    )}
                    <span style={{ 
                      padding: '2px 8px', 
                      background: seq.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(120, 113, 108, 0.1)', 
                      color: seq.status === 'active' ? '#10B981' : '#78716C', 
                      borderRadius: 100, 
                      fontSize: 9,
                      fontFamily: 'var(--font-space-mono)',
                    }}>
                      {seq.status.toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Mini bar chart */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 60, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: `${seq.opens}%`, background: 'linear-gradient(to top, #F59E0B, #FCD34D)', borderRadius: 4, marginBottom: 4 }} />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 14, fontWeight: 700, color: '#F59E0B' }}>{seq.opens}%</div>
                        <div style={{ fontSize: 9, color: '#78716C' }}>opens</div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: `${seq.replies * 2}%`, background: 'linear-gradient(to top, #10B981, #34D399)', borderRadius: 4, marginBottom: 4 }} />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 14, fontWeight: 700, color: '#10B981' }}>{seq.replies}%</div>
                        <div style={{ fontSize: 9, color: '#78716C' }}>replies</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trend indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                    <span style={{ color: seq.trend === 'up' ? '#10B981' : '#EF4444', fontSize: 12 }}>
                      {seq.trend === 'up' ? '↑' : '↓'}
                    </span>
                    <span style={{ fontSize: 10, color: seq.trend === 'up' ? '#10B981' : '#EF4444' }}>
                      {seq.trend === 'up' ? '+12%' : '-5%'} this week
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Powered by */}
            <div style={{ textAlign: 'right', marginTop: 16, position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(5"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          div[style*="grid-template-columns: 45% 30% 25%"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
