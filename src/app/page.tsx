'use client';

import { useState, useSyncExternalStore, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Import components - using dynamic imports for client-side only components
const CustomCursor = dynamic(() => import('@/components/moltreach/CustomCursor'), { ssr: false });
const BackgroundCanvas = dynamic(() => import('@/components/moltreach/BackgroundCanvas'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/moltreach/LoadingScreen'), { ssr: false });
const Navigation = dynamic(() => import('@/components/moltreach/Navigation'), { ssr: false });
const Hero = dynamic(() => import('@/components/moltreach/Hero'), { ssr: false });
const LogoBar = dynamic(() => import('@/components/moltreach/LogoBar'), { ssr: false });
const Problem = dynamic(() => import('@/components/moltreach/Problem'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/moltreach/HowItWorks'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/moltreach/Dashboard'), { ssr: false });
const Results = dynamic(() => import('@/components/moltreach/Results'), { ssr: false });
const Calendar = dynamic(() => import('@/components/moltreach/Calendar'), { ssr: false });
const ROICalculator = dynamic(() => import('@/components/moltreach/ROICalculator'), { ssr: false });
const Features = dynamic(() => import('@/components/moltreach/Features'), { ssr: false });
const ComparisonTable = dynamic(() => import('@/components/moltreach/ComparisonTable'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/moltreach/Testimonials'), { ssr: false });
const SocialProof = dynamic(() => import('@/components/moltreach/SocialProof'), { ssr: false });
const Integrations = dynamic(() => import('@/components/moltreach/Integrations'), { ssr: false });
const Pricing = dynamic(() => import('@/components/moltreach/Pricing'), { ssr: false });
const AgencyDashboard = dynamic(() => import('@/components/moltreach/AgencyDashboard'), { ssr: false });
const Footer = dynamic(() => import('@/components/moltreach/Footer'), { ssr: false });
const AuthModal = dynamic(() => import('@/components/moltreach/AuthModal'), { ssr: false });
const FloatingElements = dynamic(() => import('@/components/moltreach/FloatingElements'), { ssr: false });

// M Icon component for branding
const MIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M2 12 L2 2 L7 8 L12 2 L12 12" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Custom hook for client-side only mounting
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mounted = useMounted();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main style={{ position: 'relative' }}>
      <CustomCursor />
      <BackgroundCanvas />
      <LoadingScreen onComplete={handleLoadingComplete} />
      
      {/* Navigation OUTSIDE #site - ALWAYS VISIBLE */}
      <Navigation onOpenModal={openModal} />

      <div
        id="site"
        style={{
          opacity: isLoading ? 0 : 1,
          transform: isLoading ? 'scale(1.06)' : 'scale(1)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <Hero onOpenModal={openModal} />
        <LogoBar />
        <Problem />
        <HowItWorks />
        <Dashboard />
        <Results />
        
        {/* Brand strip between Results and Calendar */}
        <section style={{ 
          width: '100%', 
          padding: '28px 48px', 
          background: 'rgba(245, 158, 11, 0.06)', 
          borderTop: '1px solid rgba(245, 158, 11, 0.12)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.12)',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 32, fontWeight: 800, color: '#F59E0B' }}>
              MoltReach
            </span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: '#0D9488', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              by Visionary AI
            </span>
            <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 16, color: '#78716C', marginTop: 8 }}>
              Your pipeline. On autopilot.
            </span>
          </div>
        </section>
        
        <Calendar />
        <ROICalculator onOpenModal={openModal} />
        <Features />
        <ComparisonTable />
        <Testimonials />
        
        {/* Another brand strip before Social Proof */}
        <section style={{ 
          width: '100%', 
          padding: '28px 48px', 
          background: '#FFF8ED', 
          borderTop: '1px solid rgba(245, 158, 11, 0.12)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.12)',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <MIcon />
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: '#0D9488', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Join 1,200+ B2B teams already on autopilot
            </span>
          </div>
        </section>
        
        <SocialProof />
        <Integrations />
        <AgencyDashboard onOpenModal={openModal} />
        <Pricing onOpenModal={openModal} />

        <section id="final-cta" className="section" style={{ textAlign: 'center' }}>
          <div className="dot-grid" />
          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ marginBottom: 24 }}>
              Your competitors are already{' '}
              <span style={{ color: '#F59E0B', fontStyle: 'italic', fontWeight: 900 }}>automating</span>.
            </h2>
            <p style={{ fontSize: 18, color: '#78716C', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
              The question is whether you want to catch up — or stay so far ahead they can&apos;t see you.
            </p>
            <button className="btn btn-primary" onClick={openModal} style={{ padding: '18px 48px', fontSize: 16 }}>
              Create Your Free Account — 30 Seconds
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
              {[
                { icon: '🔒', text: 'Enterprise Security' },
                { icon: '⚡', text: '5-min Setup' },
                { icon: '🏆', text: '4.9/5 Rated' },
              ].map((item) => (
                <span key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#78716C' }}>
                  <span>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <FloatingElements onOpenModal={openModal} />
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />

      <style jsx global>{`
        .section-nav-dots {
          position: fixed;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .section-nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(12, 10, 9, 0.18);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .section-nav-dot.active {
          width: 10px;
          height: 10px;
          background: #F59E0B;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }
        .section-nav-dot:hover {
          transform: scale(1.3);
          background: #F59E0B;
        }
        .back-to-top {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(245, 158, 11, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: 1000;
          color: #0C0A09;
        }
        .back-to-top.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .back-to-top:hover {
          background: #F59E0B;
          color: #0C0A09;
        }
        @media (max-width: 768px) {
          .section-nav-dots {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
