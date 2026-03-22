'use client';

import { useEffect, useRef, useState } from 'react';
import MIcon from './MIcon';

interface PricingProps {
  onOpenModal: () => void;
}

export default function Pricing({ onOpenModal }: PricingProps) {
  const [visible, setVisible] = useState(false);
  const [annual, setAnnual] = useState(false);
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

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'For testing the waters',
      features: ['50 leads/month', '1 campaign', 'AI writing 3 variations', '3-touch sequence', 'Basic analytics', 'Community support'],
      cta: 'Get Started Free',
      variant: 'ghost' as const,
    },
    {
      name: 'Starter',
      price: { monthly: 49, annual: 39 },
      description: 'For growing teams',
      features: ['500 leads/month', '1,000 emails', '3 campaigns', 'AI personalization', '5-touch sequences', 'Full analytics', 'A/B testing', 'Email support', 'Remove branding'],
      cta: 'Get Started Now',
      variant: 'secondary' as const,
      savings: '$120/year',
    },
    {
      name: 'Growth',
      price: { monthly: 149, annual: 119 },
      description: 'For scaling businesses',
      features: ['2,000 leads/month', '10,000 emails', 'Unlimited campaigns', 'GPT-4 writing', '8-touch sequences', 'HubSpot + Salesforce', '3 team seats', 'Onboarding call', 'White-label reports'],
      cta: 'Start Now',
      variant: 'primary' as const,
      popular: true,
      savings: '$360/year',
    },
    {
      name: 'Enterprise',
      price: { monthly: 349, annual: 279 },
      description: 'For large organizations',
      features: ['Unlimited leads', 'Unlimited emails', 'Unlimited campaigns', 'GPT-4 Turbo', 'Custom AI training', 'White-label', 'API access', '10 team seats', 'Dedicated CSM', 'SLA guarantee'],
      cta: 'Get Started Now',
      variant: 'secondary' as const,
      savings: '$840/year',
    },
  ];

  const customPlan = {
    name: 'Custom',
    price: { monthly: 0, annual: 0 },
    description: "Let's Talk",
    features: ['Everything in Enterprise', 'Unlimited seats', 'Agency workspaces', 'Custom domain', 'Co-marketing', 'Priority support', 'Dedicated infrastructure', 'Custom SLA'],
    cta: 'Book a Strategy Call →',
    variant: 'primary' as const,
    custom: true,
  };

  return (
    <section id="pricing" className="section" ref={ref}>
      {/* Section blobs */}
      <div className="blob blob-teal" style={{ width: 400, height: 400, top: '10%', left: '-10%' }} />
      <div className="blob blob-gold" style={{ width: 300, height: 300, bottom: '20%', right: '-5%' }} />
      <div className="dot-grid" />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div 
          className="overline reveal" 
          style={{ 
            opacity: visible ? 1 : 0, 
            textAlign: 'center', 
            marginBottom: 8,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 100ms',
          }}
        >
          <MIcon />
          PRICING
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 24, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', textAlign: 'center' }}>
          Pick your{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>pace</span>.
        </h2>

        {/* Toggle with Annual badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 15, color: annual ? '#78716C' : '#0C0A09', fontWeight: annual ? 400 : 600 }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: 56,
                height: 28,
                borderRadius: 14,
                background: annual ? '#F59E0B' : 'rgba(0,0,0,0.1)',
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  top: 3,
                  left: annual ? 31 : 3,
                  transition: 'left 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            </button>
            <span style={{ fontSize: 15, color: annual ? '#0C0A09' : '#78716C', fontWeight: annual ? 600 : 400 }}>
              Annual
            </span>
          </div>
          {/* 20% discount badge */}
          <div style={{
            padding: '6px 16px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(13, 148, 136, 0.1))',
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 300ms',
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-space-mono)' }}>20% OFF</span>
            <span style={{ fontSize: 12, color: '#0D9488' }}>when you pay annually</span>
          </div>
        </div>

        {/* Pricing cards - Main 4 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms`,
              }}
            >
              {plan.popular && (
                <div className="pricing-badge">MOST POPULAR</div>
              )}
              
              <div className="pricing-header">
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">
                  <span className="pricing-currency">$</span>
                  <span className="pricing-amount">{annual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="pricing-period">/month</span>
                </div>
                {annual && plan.savings && (
                  <div style={{
                    marginTop: 8,
                    padding: '4px 8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 100,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Save {plan.savings}</span>
                  </div>
                )}
                <div style={{ fontSize: 13, color: '#78716C', marginTop: 8 }}>{plan.description}</div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, j) => (
                  <li key={j} className="pricing-feature">
                    <span className="pricing-feature-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn btn-${plan.variant}`}
                onClick={onOpenModal}
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  ...(plan.popular && { padding: '16px 32px' }),
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Plan - CENTERED */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <div
            className="pricing-card custom"
            style={{
              width: 400,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 700ms',
            }}
          >
            <div className="pricing-header">
              <div className="pricing-name" style={{ color: '#FFFDF7' }}>{customPlan.name}</div>
              <div className="pricing-price">
                <span style={{ fontSize: 32, fontWeight: 700, color: '#F59E0B' }}>Let's Talk</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255, 253, 247, 0.55)', marginTop: 4 }}>{customPlan.description}</div>
            </div>

            <ul className="pricing-features">
              {customPlan.features.map((feature, j) => (
                <li key={j} className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span style={{ color: 'rgba(255, 253, 247, 0.75)' }}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className="btn btn-primary"
              onClick={onOpenModal}
              style={{
                width: '100%',
                marginTop: 'auto',
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                color: '#0C0A09',
              }}
            >
              {customPlan.cta}
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
          {[
            { icon: '🔒', text: 'Enterprise Security' },
            { icon: '⚡', text: '5-min Setup' },
            { icon: '💰', text: 'No Hidden Fees' },
            { icon: '🏆', text: '4.9/5 Rated' },
          ].map((badge) => (
            <div key={badge.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#78716C' }}>
              <span style={{ fontSize: 16 }}>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#78716C' }}>
          Cancel any time. No questions asked. Join 1,200+ B2B teams already on autopilot.
        </p>
      </div>

      <style jsx>{`
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
