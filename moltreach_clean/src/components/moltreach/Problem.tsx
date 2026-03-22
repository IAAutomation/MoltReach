import MIcon from './MIcon';
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Problem() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation when section comes into view
          setVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Card clusters - 6 categories with vibrant colors and 200% contrast
  const clusters = [
    {
      label: '💸 WASTED BUDGET',
      color: '#EF4444',
      finalPosition: { top: '0%', left: '2%' },
      cards: [
        { content: 'Slack: "2 calls, $14k SDR cost"' },
        { content: '$12,400/month, 4 calls' },
        { content: '$549/month tools, 0 meetings' },
        { content: 'Target: $800K | Actual: $124K', color: '#EF4444' },
        { content: '22 hours, 1 qualified reply' },
        { content: 'ROI: -87% on SDR investment', color: '#EF4444' },
      ],
    },
    {
      label: '📅 MISSED MEETINGS',
      color: '#F97316',
      finalPosition: { top: '0%', right: '2%' },
      cards: [
        { content: '1 meeting this month', color: '#F97316' },
        { content: '3 no-shows this month' },
        { content: 'Last seen: 18 days ago' },
        { content: '67th no-answer this month' },
        { content: 'Target: 50 | Actual: 12', color: '#F97316' },
        { content: 'Calendar: 95% empty' },
      ],
    },
    {
      label: '📉 BROKEN PIPELINE',
      color: '#8B5CF6',
      finalPosition: { top: '38%', left: '2%' },
      cards: [
        { content: '2.1% reply rate', color: '#8B5CF6', subtext: 'vs 21% industry avg' },
        { content: 'Lead list quality: 34%' },
        { content: 'Data accuracy: 41%' },
        { content: '8.2% open rate vs 21% avg', color: '#8B5CF6' },
        { content: '5 emails went to spam', color: '#EF4444' },
        { content: 'Pipeline value: -$240K', color: '#8B5CF6' },
      ],
    },
    {
      label: '⏰ LOST TIME',
      color: '#0EA5E9',
      finalPosition: { top: '38%', right: '2%' },
      cards: [
        { content: 'Connection not accepted' },
        { content: '4 follow-ups, 0 replies' },
        { content: '3 hours wasted on wrong lead' },
        { content: '47 overdue tasks' },
        { content: '12 hours/week on manual tasks', color: '#0EA5E9' },
        { content: 'There has to be a better way.', highlight: true },
      ],
    },
    {
      label: '📧 EMAIL FAILURES',
      color: '#EC4899',
      finalPosition: { bottom: '0%', left: '2%' },
      cards: [
        { content: 'Open rate: 4.2%', color: '#EC4899' },
        { content: 'Spam complaints: 12' },
        { content: 'Bounce rate: 28%', color: '#EF4444' },
        { content: 'Unsubscribes: 45 this week' },
        { content: 'Deliverability score: 42/100', color: '#EC4899' },
        { content: 'Domain reputation: Poor', color: '#EF4444' },
      ],
    },
    {
      label: '🎯 POOR TARGETING',
      color: '#14B8A6',
      finalPosition: { bottom: '0%', right: '2%' },
      cards: [
        { content: 'ICP match rate: 23%', color: '#14B8A6' },
        { content: 'Wrong decision makers: 67%' },
        { content: 'Outdated contacts: 45%' },
        { content: 'Duplicate leads: 234' },
        { content: 'Unqualified leads: 89%', color: '#EF4444' },
        { content: 'MoltReach fixes ALL of this.', highlight: true },
      ],
    },
  ];

  return (
    <section id="problem" className="section" ref={ref} style={{ background: 'transparent', paddingTop: 80, paddingBottom: 80 }}>
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

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div 
          className="overline reveal" 
          style={{ 
            opacity: visible ? 1 : 0, 
            marginBottom: 16, 
            position: 'relative', 
            zIndex: 10,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 100ms',
          }}
        >
          <MIcon />
          THE PROBLEM
        </div>

        {/* Main glass panel */}
        <div
          className="glass-panel"
          style={{
            maxWidth: 800,
            margin: '0 auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Heading accent line */}
          <div style={{
            width: 60,
            height: 3,
            background: 'linear-gradient(90deg, #F59E0B, #0D9488)',
            borderRadius: 2,
            marginBottom: 32,
          }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { text: 'You hired SDRs.', delay: 100 },
              { text: 'You bought lead lists.', delay: 200 },
              { text: 'You subscribed to tools.', delay: 300 },
              { text: 'Your pipeline is still empty.', delay: 400, muted: true },
              { text: 'MoltReach fixes this.', delay: 600, gradient: true },
            ].map((line, i) => (
              <h2
                key={i}
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: line.gradient ? 900 : line.muted ? 400 : 700,
                  color: line.muted ? 'rgba(12, 10, 9, 0.28)' : '#0C0A09',
                  fontStyle: line.gradient ? 'italic' : 'normal',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${line.delay}ms`,
                  position: 'relative',
                  zIndex: 3,
                  ...(line.gradient && {
                    background: 'linear-gradient(90deg, #F59E0B, #F97316, #0D9488)',
                    backgroundSize: '400% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: visible ? 'textGradient 5s linear infinite' : 'none',
                  }),
                }}
              >
                {line.text}
              </h2>
            ))}
          </div>
        </div>

        {/* AUTO-SCATTERING CARDS CONTAINER */}
        <div style={{ 
          position: 'relative', 
          minHeight: 750, 
          marginTop: 20,
          // This is key: cards start at center and scatter to their positions
        }}>
          {clusters.map((cluster, clusterIndex) => {
            const isLeft = cluster.finalPosition.left !== undefined;
            const isRight = cluster.finalPosition.right !== undefined;
            
            // Staggered animation delays
            const clusterDelay = 600 + clusterIndex * 120;
            
            return (
              <div
                key={cluster.label}
                style={{
                  position: 'absolute',
                  ...cluster.finalPosition,
                  width: 195,
                  zIndex: 10,
                  // START: Cards at center, scaled down, invisible
                  // END: Cards at their final positions, normal size, visible
                  opacity: visible ? 1 : 0,
                  transform: visible 
                    ? 'translate(0, 0) scale(1) rotate(0deg)' 
                    : `translate(${isLeft ? '250px' : isRight ? '-250px' : '0px'}, 200px) scale(0.3) rotate(${isLeft ? '-15deg' : '15deg'})`,
                  transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${clusterDelay}ms`,
                }}
              >
                {/* Cluster label */}
                <div style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: 11,
                  color: cluster.color,
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  textShadow: `0 0 20px ${cluster.color}60`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${clusterDelay + 200}ms`,
                }}>
                  {cluster.label}
                </div>

                {/* Cards stack */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: 230,
                }}>
                  {cluster.cards.map((card, cardIndex) => {
                    // Stacked appearance with slight offsets
                    const stackOffsetY = cardIndex * 3;
                    const stackOffsetX = cardIndex * 2;
                    const rotateAmount = (clusterIndex % 2 === 0 ? -2 : 2) + cardIndex * 0.6;
                    
                    return (
                      <div
                        key={cardIndex}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          padding: card.highlight ? 16 : 14,
                          // 200% CONTRAST
                          background: card.highlight 
                            ? `linear-gradient(135deg, ${cluster.color}25, ${cluster.color}08)` 
                            : '#FFFFFF',
                          border: `2px solid ${card.highlight ? cluster.color : 'rgba(245, 158, 11, 0.50)'}`,
                          borderRadius: 14,
                          boxShadow: `0 8px 32px ${cluster.color}20, 0 2px 8px rgba(0, 0, 0, 0.08)`,
                          // Stack positioning
                          top: stackOffsetY,
                          left: stackOffsetX,
                          zIndex: cluster.cards.length - cardIndex,
                          // Animation from hidden to visible
                          opacity: visible ? (1 - cardIndex * 0.03) : 0,
                          transform: visible 
                            ? `rotate(${rotateAmount}deg)` 
                            : `rotate(0deg) scale(0.5)`,
                          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${clusterDelay + cardIndex * 60}ms`,
                        }}
                      >
                        {/* Card shine */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 14,
                          background: `linear-gradient(180deg, ${cluster.color}08, transparent)`,
                          pointerEvents: 'none',
                        }} />
                        
                        {/* Card content - 200% CONTRAST */}
                        <div style={{ position: 'relative', zIndex: 1 }}>
                          {card.content.includes('rate') || card.content.includes('%') || card.content.includes('ROI') || card.content.includes('score') ? (
                            <div style={{ 
                              fontFamily: 'var(--font-space-mono)', 
                              fontSize: 22, 
                              fontWeight: 700, 
                              color: card.color || cluster.color,
                              textShadow: `0 2px 8px ${card.color || cluster.color}30`,
                            }}>
                              {card.content.split(' ')[0]}
                            </div>
                          ) : null}
                          <div style={{
                            fontSize: card.highlight ? 14 : 12,
                            color: card.highlight ? '#0C0A09' : '#1C1917',
                            fontWeight: card.highlight ? 800 : 600,
                            lineHeight: 1.4,
                          }}>
                            {card.content.includes('rate') || card.content.includes('%') || card.content.includes('ROI') || card.content.includes('score')
                              ? card.content.split(' ').slice(1).join(' ') 
                              : card.content}
                          </div>
                          {card.subtext && (
                            <div style={{ fontSize: 10, color: '#57534E', marginTop: 3, fontWeight: 600 }}>{card.subtext}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes textGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
        @media (max-width: 1024px) {
          section {
            padding: 60px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
