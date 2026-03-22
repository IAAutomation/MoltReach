'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check for mobile
    isMobile.current = window.innerWidth < 768;
    if (isMobile.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initialize trail positions
    for (let i = 0; i < 8; i++) {
      trailPositions.current.push({ x: 0, y: 0 });
    }

    // Create trail particles
    const trailContainer = document.createElement('div');
    trailContainer.id = 'cursor-trail-container';
    trailContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999996;';
    document.body.appendChild(trailContainer);

    const trailParticles: HTMLDivElement[] = [];
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-trail';
      particle.style.opacity = String(0.5 - i * 0.055);
      particle.style.width = `${4 - i * 0.4}px`;
      particle.style.height = `${4 - i * 0.4}px`;
      trailContainer.appendChild(particle);
      trailParticles.push(particle);
    }
    trailRef.current = trailParticles;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      // Update dot position immediately (zero delay)
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';

      // Update trail positions
      trailPositions.current.unshift({ x: e.clientX, y: e.clientY });
      trailPositions.current.pop();
    };

    // Ring animation loop
    const animateRing = () => {
      if (isMobile.current) return;
      
      ringX.current += (mouseX.current - ringX.current) * 0.28;
      ringY.current += (mouseY.current - ringY.current) * 0.28;
      
      ring.style.left = `${ringX.current}px`;
      ring.style.top = `${ringY.current}px`;

      // Update trail particles
      trailRef.current.forEach((particle, i) => {
        const pos = trailPositions.current[i] || { x: mouseX.current, y: mouseY.current };
        particle.style.left = `${pos.x}px`;
        particle.style.top = `${pos.y}px`;
      });

      requestAnimationFrame(animateRing);
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Hover state handler
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('card') ||
        target.classList.contains('hero-card') ||
        target.closest('.card') !== null;

      if (isClickable) {
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = '#F97316';
        dot.style.boxShadow = '0 0 20px rgba(249,115,22,1.0)';
        ring.style.width = '58px';
        ring.style.height = '58px';
        ring.style.borderColor = 'rgba(245,158,11,0.95)';
        ring.style.background = 'rgba(245,158,11,0.09)';
      } else {
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.background = '#F59E0B';
        dot.style.boxShadow = '0 0 14px rgba(245,158,11,1.0), 0 0 30px rgba(245,158,11,0.5)';
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.borderColor = 'rgba(245,158,11,0.78)';
        ring.style.background = 'transparent';
      }
    };

    // Click ripple handler
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 550);
    };

    // Add event listeners with passive flag
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    // Start animation loop
    animateRing();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      trailContainer.remove();
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
