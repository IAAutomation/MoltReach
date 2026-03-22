'use client';

import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
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

  const testimonials = [
    {
      quote: "I used to spend 4 hours a day on outreach. Now I spend 20 minutes reviewing AI-written emails that are better than anything I could write myself. We booked 12 meetings in our first month.",
      author: 'Alex Mercer',
      role: 'Founder, DataVault',
      rating: 5,
    },
    {
      quote: "Every morning I wake up to new hot replies in my inbox. The AI personalization is unreal - prospects think I spent hours researching them. MoltReach paid for itself in the first week.",
      author: 'Priya Sharma',
      role: 'Head of Growth, Loopbase',
      rating: 5,
    },
    {
      quote: "We were spending $12k/month on SDRs with mediocre results. MoltReach costs a fraction and delivers 3x more meetings. It's not even close.",
      author: 'James Okafor',
      role: 'CEO, Stackron',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="section" ref={ref} style={{ background: '#FFF8ED' }}>
      {/* Section blobs */}
      <div className="blob blob-gold" style={{ width: 400, height: 400, top: '10%', right: '-10%' }} />
      <div className="dot-grid" />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Overline */}
        <div className="overline reveal" style={{ opacity: visible ? 1 : 0, textAlign: 'center', marginBottom: 8 }}>
          ◆ WHAT TEAMS SAY
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 60, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 200ms', textAlign: 'center' }}>
          Real{' '}
          <span className="gradient-text" style={{ fontWeight: 900 }}>results</span>
          . Real teams.
        </h2>

        {/* Testimonial cards */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.author}
              className="testimonial-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms`,
              }}
            >
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: `hsl(${i * 50 + 20}, 70%, 80%)` }} />
                <div className="testimonial-info">
                  <span className="testimonial-name">{testimonial.author}</span>
                  <span className="testimonial-role">{testimonial.role}</span>
                  <div className="testimonial-stars">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
