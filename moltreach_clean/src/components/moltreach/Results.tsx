import MIcon from './MIcon';
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Results() {
  const [visible, setVisible] = useState(false);
  const [counters, setCounters] = useState({ meetings: 0, pipeline: 0, replyRate: 0, hours: 0 });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Animate counters
          const targets = { meetings: 312, pipeline: 84, replyRate: 85, hours: 18 };
          const duration = 1800;
          const start = Date.now();

          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            setCounters({
              meetings: Math.round(targets.meetings * eased),
              pipeline: Math.round(targets.pipeline * eased),
              replyRate: Math.round(targets.replyRate * eased),
              hours: Math.round(targets.hours * eased),
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

  const milestones = [
    { week: 'Week 1', title: 'First Campaign Live', stat: '47 emails', substat: 'in 24 hours', x: '25%' },
    { week: 'Month 1', title: '312% More Replies', stat: '85% vs 8%', substat: 'industry average', x: '50%' },
    { week: 'Month 3', title: '$84,000 Pipeline', stat: 'Solo vs 3 SDRs', substat: 'at fraction of cost', x: '80%' },
  ];

  // Sparkline data for stats
  const sparklineData = [
    [20, 15, 18, 10, 12, 5], // meetings trend
    [10, 12, 8, 15, 18, 20], // pipeline trend
    [5, 8, 12, 18, 22, 25], // reply rate trend
    [8, 6, 4, 3, 2, 1], // hours saved trend
  ];

  const stats = [
    { value: counters.meetings, suffix: '%', label: 'More Meetings', prefix: '+', trend: '+34%', trendColor: '#10B981' },
    { value: counters.pipeline, suffix: 'K', label: 'Pipeline Generated', prefix: '$', trend: '+28%', trendColor: '#10B981' },
    { value: counters.replyRate, suffix: '%', label: 'Reply Rate', prefix: '', trend: '+10.6x', trendColor: '#10B981' },
    { value: counters.hours, suffix: '', label: 'Hours Saved Weekly', prefix: '', trend: '−65%', trendColor: '#10B981' },
  ];

  return (
    <section id="results" className="section" ref={ref} style={{ background: '#FFF8ED', paddingTop: 80, paddingBottom: 80 }}>
      {/* Section blobs */}
      <div className="blob blob-coral" style={{ width: 500, height: 500, top: '10%', right: '-10%' }} />
      <div className="blob blob-gold" style={{ width: 350, height: 350, bottom: '20%', left: '-5%' }} />
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
        right: '5%',
        top: '20%',
      }}>
        M
      </div>

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
          PROVEN RESULTS
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 8, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', position: 'relative', zIndex: 10 }}>
          Numbers that{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>prove</span>
          {' '}it.
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
          Real results from real teams using MoltReach. See the metrics that matter and the growth curves that tell the story.
        </p>

        {/* Accent line */}
        <div style={{
          width: 60,
          height: 3,
          background: 'linear-gradient(90deg, #F59E0B, #0D9488)',
          borderRadius: 2,
          marginBottom: 48,
        }} />

        {/* Growth curve SVG with grid, axis labels, and data points */}
        <div style={{ position: 'relative', marginBottom: 60 }}>
          {/* Y-axis labels */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 60, width: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 10 }}>
            {['$80K', '$60K', '$40K', '$20K', '$0'].map((label, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: '#78716C' }}>{label}</span>
            ))}
          </div>
          
          <svg width="100%" height="400" viewBox="0 0 1200 400" preserveAspectRatio="none" style={{ marginLeft: 50 }}>
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Grid lines */}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0" y1={i * 60 + 20}
                x2="1200" y2={i * 60 + 20}
                stroke="rgba(245, 158, 11, 0.06)"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 80} y1="0"
                x2={i * 80} y2="400"
                stroke="rgba(245, 158, 11, 0.06)"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Area fill */}
            <path
              d="M0 380 Q300 370 400 320 Q500 280 600 200 Q800 100 1000 60 Q1100 40 1200 30 L1200 400 L0 400 Z"
              fill="url(#areaGradient)"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease 0.5s',
              }}
            />
            
            {/* Curve line */}
            <path
              d="M0 380 Q300 370 400 320 Q500 280 600 200 Q800 100 1000 60 Q1100 40 1200 30"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              style={{
                strokeDasharray: 1500,
                strokeDashoffset: visible ? 0 : 1500,
                transition: 'stroke-dashoffset 2.5s ease 0.3s',
              }}
            />

            {/* Animated data point dots along curve */}
            {visible && [0, 150, 300, 400, 500, 600, 750, 900, 1050, 1150].map((x, i) => {
              const y = [380, 375, 340, 320, 280, 200, 130, 70, 45, 32][i];
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#F59E0B"
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.3s ease ${0.5 + i * 0.1}s`,
                    }}
                  >
                    <animate
                      attributeName="r"
                      values="5;8;5"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.2}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0.6;1"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.2}s`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* NOW indicator line */}
            <line
              x1="1150"
              y1="0"
              x2="1150"
              y2="400"
              stroke="#F59E0B"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={visible ? 0.6 : 0}
              style={{ transition: 'opacity 0.5s ease 2s' }}
            />
            <text
              x="1150"
              y="15"
              textAnchor="middle"
              style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, fill: '#F59E0B' }}
            >
              NOW
            </text>
          </svg>

          {/* X-axis labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 50, marginTop: 8 }}>
            {['Week 1', 'Week 2', 'Month 1', 'Month 2', 'Month 3'].map((label, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: '#78716C' }}>{label}</span>
            ))}
          </div>

          {/* Milestone cards */}
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className="card"
              style={{
                position: 'absolute',
                left: milestone.x,
                top: i === 0 ? '50%' : i === 1 ? '35%' : '20%',
                transform: 'translateX(-50%)',
                width: 180,
                padding: 16,
                opacity: visible ? 1 : 0,
                transform: visible ? `translateX(-50%) scale(1)` : 'translateX(-50%) scale(0.6)',
                transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.8 + i * 0.2}s`,
              }}
            >
              {/* LIVE badge */}
              <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 7, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>LIVE</span>
              </div>
              <div style={{ fontSize: 10, color: '#F59E0B', fontFamily: 'var(--font-space-mono)', marginBottom: 4 }}>{milestone.week}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{milestone.title}</div>
              <div style={{ fontSize: 24, fontFamily: 'var(--font-space-mono)', fontWeight: 700, color: '#F59E0B' }}>{milestone.stat}</div>
              <div style={{ fontSize: 11, color: '#78716C' }}>{milestone.substat}</div>
            </div>
          ))}
        </div>

        {/* Stat tiles with sparklines and trend badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card"
              style={{
                padding: 24,
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${400 + i * 100}ms`,
                borderLeft: `3px solid ${['#F59E0B', '#0D9488', '#F97316', '#10B981'][i]}`,
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
                borderRadius: '20px 20px 0 0',
              }} />
              
              {/* Label */}
              <div style={{ 
                fontSize: 9, 
                color: '#78716C', 
                fontFamily: 'var(--font-space-mono)', 
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 8,
                position: 'relative',
                zIndex: 1,
              }}>
                {stat.label}
              </div>
              
              {/* Main number */}
              <div style={{ 
                fontFamily: 'var(--font-space-mono)', 
                fontSize: 48, 
                fontWeight: 700, 
                color: '#F59E0B',
                position: 'relative',
                zIndex: 1,
              }}>
                {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
              </div>
              
              {/* Trend badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                background: 'rgba(16, 185, 129, 0.12)',
                borderRadius: 100,
                marginTop: 8,
                position: 'relative',
                zIndex: 1,
              }}>
                <span style={{ fontSize: 10, color: stat.trendColor, fontFamily: 'var(--font-space-mono)' }}>
                  {stat.trend} vs last month
                </span>
              </div>
              
              {/* Sparkline */}
              <svg width="100%" height="24" style={{ marginTop: 12 }}>
                <polyline
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  points={sparklineData[i].map((v, idx) => `${idx * 20},${v}`).join(' ')}
                  opacity="0.5"
                />
                <linearGradient id={`spark-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
                <polygon
                  fill={`url(#spark-${i})`}
                  points={`0,24 ${sparklineData[i].map((v, idx) => `${idx * 20},${v}`).join(' ')} 100,24`}
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Charts block */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 24, marginTop: 48 }}>
          {/* 8-Week Bar Chart with Line Chart Overlay */}
          <div className="card" style={{ padding: 24, position: 'relative', overflow: 'visible' }}>
            {/* Card inner gradient */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.06), transparent)',
              pointerEvents: 'none',
              borderRadius: '20px 20px 0 0',
            }} />

            {/* LIVE badge */}
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, zIndex: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite', boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
              <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-space-mono)', fontWeight: 600 }}>LIVE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 11, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                WEEKLY PERFORMANCE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, color: '#10B981', fontFamily: 'var(--font-space-mono)', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: 4 }}>
                  +127% Growth
                </span>
              </div>
            </div>

            {/* Chart container with SVG overlay */}
            <div style={{ position: 'relative', height: 200, marginBottom: 16 }}>
              {/* Y-axis labels */}
              <div style={{ position: 'absolute', left: -8, top: 0, bottom: 30, width: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 4 }}>
                {['100', '75', '50', '25', '0'].map((label, i) => (
                  <span key={i} style={{ fontFamily: 'var(--font-space-mono)', fontSize: 8, color: '#A8A29E' }}>{label}</span>
                ))}
              </div>

              {/* Bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, marginLeft: 24, position: 'relative' }}>
                {[45, 52, 38, 65, 78, 85, 92, 88].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Value label on top */}
                    <div
                      style={{
                        position: 'absolute',
                        top: -22,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 10,
                        fontFamily: 'var(--font-space-mono)',
                        fontWeight: 600,
                        color: i === 6 ? '#F59E0B' : '#78716C',
                        whiteSpace: 'nowrap',
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.3s ease ${0.8 + i * 0.08}s`,
                      }}
                    >
                      {[45, 52, 38, 65, 78, 85, 92, 88][i]}
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: `${h * 1.5}px`,
                        background: i === 6 ? 'linear-gradient(to top, #F59E0B, #FCD34D)' : 'linear-gradient(to top, rgba(245, 158, 11, 0.5), rgba(245, 158, 11, 0.2))',
                        borderRadius: 6,
                        boxShadow: i === 6 ? '0 0 20px rgba(245, 158, 11, 0.4)' : '0 2px 8px rgba(0,0,0,0.05)',
                        transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'bottom',
                        transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.08}s`,
                        position: 'relative',
                      }}
                    >
                      {/* Inner glow */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 6,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* SVG Line chart overlay */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 24,
                  right: 0,
                  height: 160,
                  pointerEvents: 'none',
                }}
                preserveAspectRatio="none"
                viewBox="0 0 400 160"
              >
                <defs>
                  <linearGradient id="trendLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Trend line connecting bar tops */}
                <polyline
                  fill="none"
                  stroke="url(#trendLineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lineGlow)"
                  points="25,93 75,82 125,103 175,68 225,50 275,38 325,22 375,28"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: visible ? 0 : 400,
                    transition: 'stroke-dashoffset 1.5s ease 0.8s',
                  }}
                />
                {/* Data points on line */}
                {[25, 75, 125, 175, 225, 275, 325, 375].map((x, i) => {
                  const y = [93, 82, 103, 68, 50, 38, 22, 28][i];
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#0D9488"
                      stroke="#FFFDF7"
                      strokeWidth="2"
                      style={{
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.3s ease ${1 + i * 0.05}s`,
                      }}
                    />
                  );
                })}
              </svg>

              {/* X-axis labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 24, marginTop: 8 }}>
                {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((label, i) => (
                  <span key={i} style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)', flex: 1, textAlign: 'center' }}>{label}</span>
                ))}
              </div>
            </div>

            {/* Cumulative Growth Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'linear-gradient(90deg, rgba(13, 148, 136, 0.08), rgba(16, 185, 129, 0.05))',
              borderRadius: 12,
              marginBottom: 16,
              border: '1px solid rgba(13, 148, 136, 0.15)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #0D9488, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 16 }}>↑</span>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase' }}>Cumulative Growth</div>
                  <div style={{ fontSize: 18, fontFamily: 'var(--font-space-mono)', fontWeight: 700, color: '#0D9488' }}>+127% from W1</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: '#78716C' }}>Week 1 → Week 7</div>
                <div style={{ fontSize: 13, fontFamily: 'var(--font-space-mono)', color: '#10B981' }}>45 → 92 emails</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 12, position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, background: 'linear-gradient(to top, #F59E0B, #FCD34D)', borderRadius: 3 }} />
                <span style={{ fontSize: 10, color: '#44403C', fontWeight: 500 }}>Emails Sent</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 3, background: 'linear-gradient(90deg, #0D9488, #10B981)', borderRadius: 2 }} />
                <span style={{ fontSize: 10, color: '#44403C', fontWeight: 500 }}>Growth Trend</span>
              </div>
            </div>

            {/* Powered by */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 9, color: '#A8A29E', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
            </div>
          </div>

          {/* 30-Day Reply Rate Line Chart */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
              pointerEvents: 'none',
              borderRadius: '20px 20px 0 0',
            }} />
            
            <div style={{ fontSize: 10, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase', marginBottom: 16, position: 'relative', zIndex: 1 }}>
              REPLY RATE
            </div>
            <svg width="100%" height="150" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#0D9488" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                points="0,130 40,115 80,120 120,90 160,70 200,50 240,35 280,25 320,18 360,12 400,8"
                style={{
                  strokeDasharray: 500,
                  strokeDashoffset: visible ? 0 : 500,
                  transition: 'stroke-dashoffset 1.5s ease 0.5s',
                }}
              />
              {/* Data points */}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x, i) => {
                const y = [130, 115, 120, 90, 70, 50, 35, 25, 18, 12, 8][i];
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#F59E0B"
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.3s ease ${0.8 + i * 0.05}s`,
                    }}
                  />
                );
              })}
            </svg>
            
            {/* Powered by */}
            <div style={{ textAlign: 'right', marginTop: 8, position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 9, color: '#78716C', fontFamily: 'var(--font-space-mono)' }}>Powered by Visionary AI</span>
            </div>
          </div>

          {/* Funnel Chart */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.04), transparent)',
              pointerEvents: 'none',
              borderRadius: '20px 20px 0 0',
            }} />
            
            <div style={{ fontSize: 10, color: '#0D9488', fontFamily: 'var(--font-space-mono)', textTransform: 'uppercase', marginBottom: 16, position: 'relative', zIndex: 1 }}>
              CONVERSION FUNNEL
            </div>
            
            <svg width="100%" height="150" viewBox="0 0 200 150" style={{ display: 'block' }}>
              {[
                { width: 180, label: 'Leads', value: '1,247' },
                { width: 150, label: 'Sent', value: '892' },
                { width: 110, label: 'Opened', value: '512' },
                { width: 70, label: 'Replied', value: '284' },
                { width: 40, label: 'Meeting', value: '89' },
              ].map((stage, i) => {
                const y = i * 28 + 10;
                const x = (200 - stage.width) / 2;
                return (
                  <g key={i}>
                    <polygon
                      points={`${x},${y} ${x + stage.width},${y} ${x + stage.width - 10},${y + 24} ${x + 10},${y + 24}`}
                      fill={`rgba(245, 158, 11, ${0.9 - i * 0.15})`}
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'center',
                        transition: `all 0.4s ease ${0.3 + i * 0.1}s`,
                      }}
                    />
                    <text
                      x={100}
                      y={y + 12}
                      textAnchor="middle"
                      style={{ fontFamily: 'var(--font-space-mono)', fontSize: 8, fill: i < 3 ? '#0C0A09' : '#FFF8ED', fontWeight: 700 }}
                    >
                      {stage.value}
                    </text>
                    <text
                      x={100}
                      y={y + 20}
                      textAnchor="middle"
                      style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 6, fill: i < 3 ? 'rgba(12,10,9,0.6)' : 'rgba(255,248,237,0.7)' }}
                    >
                      {stage.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            
            {/* Powered by */}
            <div style={{ textAlign: 'right', marginTop: 8, position: 'relative', zIndex: 1 }}>
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
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: 2fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
