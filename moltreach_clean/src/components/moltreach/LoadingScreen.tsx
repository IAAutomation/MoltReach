'use client';

import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'initial' | 'drawing' | 'rays' | 'text' | 'exit' | 'hidden'>('initial');
  const loaderRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const mWrapperRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);
  const logoScaleRef = useRef<number>(1.25);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Create star field
    const createStars = () => {
      const container = document.getElementById('loader-stars');
      if (!container) return;

      for (let i = 0; i < 140; i++) {
        const star = document.createElement('div');
        star.className = 'loader-star';
        const size = 1 + Math.random() * 2;
        star.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          background: ${Math.random() > 0.5 ? '#F59E0B' : 'rgba(255,253,247,0.6)'};
          opacity: ${0.2 + Math.random() * 0.5};
          animation: starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite;
          animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(star);
      }
    };

    // Add star animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
      @keyframes sunGlow {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.1); }
      }
      @keyframes horizonExpand {
        0% { width: 0; opacity: 0; }
        100% { width: 100%; opacity: 1; }
      }
      @keyframes scanDown {
        0% { top: 0; }
        100% { top: 100%; }
      }
    `;
    document.head.appendChild(styleSheet);

    createStars();

    // Timeline
    const timeline = [
      // Phase: Drawing M (500ms - 1470ms)
      { time: 300, action: () => setPhase('drawing') },
      
      // Phase: Sunrise rays (1500ms)
      { time: 1500, action: () => setPhase('rays') },
      
      // Phase: Text content (2500ms)
      { time: 2500, action: () => setPhase('text') },
      
      // Phase: Loading bar (3600ms)
      { time: 3600, action: () => {
        if (barRef.current) {
          barRef.current.style.width = '100%';
          barRef.current.style.transition = 'width 720ms linear';
        }
      }},
      
      // Flash (4300ms)
      { time: 4300, action: () => {
        if (flashRef.current) {
          flashRef.current.style.opacity = '0.14';
          setTimeout(() => {
            if (flashRef.current) flashRef.current.style.opacity = '0';
          }, 80);
        }
      }},
      
      // M blast (4380ms)
      { time: 4380, action: () => {
        if (mWrapperRef.current) {
          mWrapperRef.current.style.transform = 'scale(10)';
          mWrapperRef.current.style.opacity = '0';
          mWrapperRef.current.style.transition = 'transform 400ms ease-in, opacity 400ms ease-in';
        }
      }},
      
      // Exit (4580ms)
      { time: 4580, action: () => {
        setPhase('exit');
        if (loaderRef.current) {
          loaderRef.current.style.opacity = '0';
        }
      }},
      
      // Complete (5400ms)
      { time: 5400, action: () => {
        setPhase('hidden');
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
        document.body.style.overflow = '';
        
        // Animate navbar logo
        const navLogo = document.querySelector('.nav-logo-text');
        if (navLogo) {
          navLogo.style.transform = 'scale(1.25)';
          setTimeout(() => {
            (navLogo as HTMLElement).style.transition = 'transform 400ms ease-out';
            (navLogo as HTMLElement).style.transform = 'scale(1)';
          }, 50);
        }
        
        onComplete();
      }},
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    return () => {
      timeouts.forEach(clearTimeout);
      document.head.removeChild(styleSheet);
    };
  }, [onComplete]);

  if (phase === 'hidden') return null;

  return (
    <div
      id="loader"
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,  // Lower than navbar (99999)
        background: '#0C0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Star field container */}
      <div id="loader-stars" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />

      {/* Central glow */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
          animation: 'sunGlow 4s ease-in-out infinite',
        }}
      />

      {/* Horizon line */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), rgba(249,115,22,0.4), transparent)',
          opacity: phase === 'initial' ? 0 : 1,
          transform: phase === 'initial' ? 'scaleX(0)' : 'scaleX(1)',
          transition: 'transform 600ms ease-out, opacity 300ms',
        }}
      />

      {/* Warm glow below horizon */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to top, rgba(245,158,11,0.08) 0%, transparent 100%)',
          opacity: phase === 'initial' ? 0 : 1,
          transition: 'opacity 600ms ease-out 300ms',
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(245,158,11,0.5), rgba(245,158,11,0.3), transparent)',
          boxShadow: '0 0 20px rgba(245,158,11,0.5)',
          animation: 'scanDown 1.8s linear infinite',
        }}
      />

      {/* M Icon wrapper */}
      <div
        id="m-icon-wrapper"
        ref={mWrapperRef}
        style={{
          position: 'relative',
          width: 200,
          height: 200,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: '-20px',
          zIndex: 10,
        }}
      >
        {/* M SVG */}
        <svg
          width="180"
          height="160"
          viewBox="0 0 180 160"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="mGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <filter id="mGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Left vertical */}
          <line
            x1="30" y1="140" x2="30" y2="40"
            stroke={phase === 'initial' ? 'rgba(255,253,247,0.92)' : 'url(#mGradient)'}
            strokeWidth="6"
            strokeLinecap="round"
            filter={phase === 'initial' ? 'none' : 'url(#mGlow)'}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: phase === 'initial' ? 100 : 0,
              transition: 'stroke-dashoffset 220ms ease-out 500ms',
            }}
          />
          
          {/* Left diagonal */}
          <line
            x1="30" y1="40" x2="90" y2="110"
            stroke={phase === 'initial' ? 'rgba(255,253,247,0.92)' : 'url(#mGradient)'}
            strokeWidth="6"
            strokeLinecap="round"
            filter={phase === 'initial' ? 'none' : 'url(#mGlow)'}
            style={{
              strokeDasharray: 90,
              strokeDashoffset: phase === 'initial' ? 90 : 0,
              transition: 'stroke-dashoffset 260ms ease-out 720ms',
            }}
          />
          
          {/* Right diagonal */}
          <line
            x1="90" y1="110" x2="150" y2="40"
            stroke={phase === 'initial' ? 'rgba(255,253,247,0.92)' : 'url(#mGradient)'}
            strokeWidth="6"
            strokeLinecap="round"
            filter={phase === 'initial' ? 'none' : 'url(#mGlow)'}
            style={{
              strokeDasharray: 90,
              strokeDashoffset: phase === 'initial' ? 90 : 0,
              transition: 'stroke-dashoffset 260ms ease-out 980ms',
            }}
          />
          
          {/* Right vertical */}
          <line
            x1="150" y1="40" x2="150" y2="140"
            stroke={phase === 'initial' ? 'rgba(255,253,247,0.92)' : 'url(#mGradient)'}
            strokeWidth="6"
            strokeLinecap="round"
            filter={phase === 'initial' ? 'none' : 'url(#mGlow)'}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: phase === 'initial' ? 100 : 0,
              transition: 'stroke-dashoffset 220ms ease-out 1240ms',
            }}
          />
        </svg>

        {/* Corner brackets */}
        {phase !== 'initial' && (
          <svg
            width="220"
            height="180"
            viewBox="0 0 220 180"
            style={{ position: 'absolute', top: '-10px', left: '-20px' }}
          >
            {/* Top-left */}
            <path
              d="M20 30 L20 20 L30 20"
              fill="none"
              stroke="rgba(245,158,11,0.72)"
              strokeWidth="1.5"
              style={{
                transform: 'scale(0)',
                transformOrigin: '20px 20px',
                animation: 'bracketIn 400ms cubic-bezier(0.34,1.56,0.64,1) forwards',
                animationDelay: '1100ms',
              }}
            />
            {/* Top-right */}
            <path
              d="M190 20 L200 20 L200 30"
              fill="none"
              stroke="rgba(245,158,11,0.72)"
              strokeWidth="1.5"
              style={{
                transform: 'scale(0)',
                transformOrigin: '200px 20px',
                animation: 'bracketIn 400ms cubic-bezier(0.34,1.56,0.64,1) forwards',
                animationDelay: '1160ms',
              }}
            />
            {/* Bottom-left */}
            <path
              d="M20 150 L20 160 L30 160"
              fill="none"
              stroke="rgba(245,158,11,0.72)"
              strokeWidth="1.5"
              style={{
                transform: 'scale(0)',
                transformOrigin: '20px 160px',
                animation: 'bracketIn 400ms cubic-bezier(0.34,1.56,0.64,1) forwards',
                animationDelay: '1220ms',
              }}
            />
            {/* Bottom-right */}
            <path
              d="M190 160 L200 160 L200 150"
              fill="none"
              stroke="rgba(245,158,11,0.72)"
              strokeWidth="1.5"
              style={{
                transform: 'scale(0)',
                transformOrigin: '200px 160px',
                animation: 'bracketIn 400ms cubic-bezier(0.34,1.56,0.64,1) forwards',
                animationDelay: '1280ms',
              }}
            />
          </svg>
        )}
      </div>

      {/* Sunrise rays */}
      {phase !== 'initial' && phase !== 'drawing' && (
        <div
          ref={raysRef}
          style={{
            position: 'absolute',
            bottom: '48%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            opacity: 1,
          }}
        >
          {[-65, -40, -20, -5, 5, 20, 40, 65].map((angle, i) => (
            <div
              key={angle}
              style={{
                position: 'absolute',
                bottom: 0,
                width: 2,
                height: 160,
                background: 'linear-gradient(to top, #F59E0B, transparent)',
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'bottom center',
                opacity: 0,
                animation: `rayIn 400ms ease-out forwards`,
                animationDelay: `${1500 + i * 60}ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* Text content */}
      <div
        id="loader-text-content"
        ref={textContentRef}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: phase === 'text' || phase === 'exit' ? 1 : 0,
          transform: `translateY(${phase === 'text' || phase === 'exit' ? '0' : '20px'})`,
          transition: 'opacity 400ms ease, transform 400ms ease',
          top: '58%',
        }}
      >
        {/* Name */}
        <div className="loader-name" style={{ display: 'flex', gap: 0 }}>
          <span style={{ color: '#FFF8ED' }}>MOLT</span>
          <span style={{ color: '#F59E0B' }}>REACH</span>
        </div>
        
        {/* Tagline */}
        <div className="loader-tagline">Your pipeline. On autopilot.</div>
        <div className="loader-brand">BY VISIONARY AI</div>
        
        {/* Loading bar */}
        <div className="loader-bar-container" style={{ marginTop: 24 }}>
          <div ref={barRef} className="loader-bar" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Corner text */}
      <div className="corner-text corner-text-left">v1.0 — 2025</div>
      <div className="corner-text corner-text-right">Visionary AI</div>

      {/* Flash overlay */}
      <div
        id="loader-flash"
        ref={flashRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(245,158,11,0.14)',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 80ms',
        }}
      />

      {/* Additional styles */}
      <style jsx>{`
        @keyframes bracketIn {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes rayIn {
          0% { opacity: 0; }
          100% { opacity: 0.5; }
        }
        @keyframes rayPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
