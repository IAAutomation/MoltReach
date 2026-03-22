'use client';

import { useEffect, useRef, useState } from 'react';

export default function LogoBar() {
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

  const companies = [
    'DATAFLOW', 'NEXSCALE', 'PRISMATIC', 'LOOPBASE', 'VELOCLOUD',
    'STACKRON', 'ORBITIO', 'DRIFTWARE', 'CLARIX', 'SYNTHRON',
    'VEXARA', 'NEXOVION', 'DATAFLOW', 'NEXSCALE', 'PRISMATIC',
    'LOOPBASE', 'VELOCLOUD', 'STACKRON', 'ORBITIO', 'DRIFTWARE',
    'CLARIX', 'SYNTHRON', 'VEXARA', 'NEXOVION'
  ];

  return (
    <section id="logo-bar" className="logo-bar" ref={ref}>
      <div className="logo-bar-content">
        <span className="logo-bar-label reveal" style={{ opacity: visible ? 1 : 0, transitionDelay: '100ms' }}>TRUSTED BY</span>
        <div className="logo-bar-marquee">
          <div className="logo-bar-marquee-inner">
            {companies.map((company, i) => (
              <span key={i} className="logo-bar-item">{company}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
