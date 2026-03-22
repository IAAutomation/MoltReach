'use client';

import { useEffect, useRef, useState } from 'react';

interface ROICalculatorProps {
  onOpenModal: () => void;
}

export default function ROICalculator({ onOpenModal }: ROICalculatorProps) {
  const [visible, setVisible] = useState(false);
  const [leadsTarget, setLeadsTarget] = useState(500);
  const [dealSize, setDealSize] = useState(5000);
  const [closeRate, setCloseRate] = useState(20);
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

  // Calculate results
  const meetings = Math.round(leadsTarget * 0.28); // 28% reply rate
  const monthlyPipeline = Math.round(meetings * (closeRate / 100) * dealSize);
  const annualPipeline = monthlyPipeline * 12;
  const roi = Math.round((annualPipeline / 149) * 100) / 100; // Growth plan cost

  return (
    <section id="roi-calculator" className="section" ref={ref}>
      {/* Section blobs */}
      <div className="blob blob-gold" style={{ width: 400, height: 400, top: '10%', right: '-10%' }} />
      <div className="blob blob-teal" style={{ width: 350, height: 350, bottom: '20%', left: '-5%' }} />
      <div className="dot-grid" />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div className="overline reveal" style={{ opacity: visible ? 1 : 0, textAlign: 'center', marginBottom: 8 }}>
          ◆ ROI CALCULATOR
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 48, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', textAlign: 'center' }}>
          Calculate your{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>pipeline</span>.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          {/* Sliders */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms',
            }}
          >
            {/* Leads Target */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Leads Target</span>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 14, color: '#F59E0B' }}>{leadsTarget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                value={leadsTarget}
                onChange={(e) => setLeadsTarget(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 8,
                  background: 'linear-gradient(to right, #F59E0B 0%, #F59E0B ' + ((leadsTarget - 100) / 19) + '%, rgba(245, 158, 11, 0.2) ' + ((leadsTarget - 100) / 19) + '%, rgba(245, 158, 11, 0.2) 100%)',
                  borderRadius: 4,
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#78716C', marginTop: 4 }}>
                <span>100</span>
                <span>2,000</span>
              </div>
            </div>

            {/* Deal Size */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Average Deal Size</span>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 14, color: '#F59E0B' }}>${dealSize.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={dealSize}
                onChange={(e) => setDealSize(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 8,
                  background: 'linear-gradient(to right, #0D9488 0%, #0D9488 ' + ((dealSize - 1000) / 490) + '%, rgba(13, 148, 136, 0.2) ' + ((dealSize - 1000) / 490) + '%, rgba(13, 148, 136, 0.2) 100%)',
                  borderRadius: 4,
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#78716C', marginTop: 4 }}>
                <span>$1K</span>
                <span>$50K</span>
              </div>
            </div>

            {/* Close Rate */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Close Rate</span>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 14, color: '#F59E0B' }}>{closeRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 8,
                  background: 'linear-gradient(to right, #F97316 0%, #F97316 ' + ((closeRate - 5) / 45 * 100) + '%, rgba(249, 115, 22, 0.2) ' + ((closeRate - 5) / 45 * 100) + '%, rgba(249, 115, 22, 0.2) 100%)',
                  borderRadius: 4,
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#78716C', marginTop: 4 }}>
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div className="card" style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#78716C', marginBottom: 4 }}>Monthly Meetings</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 36, fontWeight: 700, color: '#F59E0B' }}>{meetings}</div>
              </div>
              <div className="card" style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#78716C', marginBottom: 4 }}>Monthly Pipeline</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 36, fontWeight: 700, color: '#0D9488' }}>${(monthlyPipeline / 1000).toFixed(0)}K</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div className="card" style={{ padding: 20, textAlign: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1.5px solid rgba(245, 158, 11, 0.3)' }}>
                <div style={{ fontSize: 11, color: '#78716C', marginBottom: 4 }}>Annual Pipeline</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 36, fontWeight: 700, color: '#F59E0B' }}>${(annualPipeline / 1000000).toFixed(2)}M</div>
              </div>
              <div className="card" style={{ padding: 20, textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', border: '1.5px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: 11, color: '#78716C', marginBottom: 4 }}>ROI</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 36, fontWeight: 700, color: '#10B981' }}>{roi.toLocaleString()}x</div>
              </div>
            </div>

            {/* Pipeline breakdown */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: '#78716C', marginBottom: 8 }}>Pipeline Breakdown</div>
              <div style={{ height: 12, background: 'rgba(0,0,0,0.05)', borderRadius: 6, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${closeRate}%`, background: '#F59E0B' }} />
                <div style={{ width: `${100 - closeRate}%`, background: 'rgba(245, 158, 11, 0.2)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#78716C', marginTop: 4 }}>
                <span>Closed Won: ${((monthlyPipeline * closeRate / 100) / 1000).toFixed(0)}K</span>
                <span>In Pipeline: ${((monthlyPipeline * (100 - closeRate) / 100) / 1000).toFixed(0)}K</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onOpenModal} style={{ width: '100%', padding: '16px 32px' }}>
              Get This Pipeline With MoltReach →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: white;
          border: 3px solid currentColor;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
