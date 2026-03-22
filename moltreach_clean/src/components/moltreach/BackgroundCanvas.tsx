'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  frequency: number;
  amplitude: number;
  time: number;
}

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  sides: number;
  size: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  startTime: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const mouseXRef = useRef<number>(0);
  const mouseYRef = useRef<number>(0);
  const mouseVxRef = useRef<number>(0);
  const mouseVyRef = useRef<number>(0);
  const lastMouseXRef = useRef<number>(0);
  const lastMouseYRef = useRef<number>(0);
  const gradientCxRef = useRef<number>(0.5);
  const gradientCyRef = useRef<number>(0.5);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<Shape[]>([]);
  const pulseWavesRef = useRef<PulseWave[]>([]);
  const velocityStreaksRef = useRef<{ x: number; y: number; vx: number; vy: number; opacity: number; time: number }[]>([]);
  const isMobileRef = useRef<boolean>(false);
  const timeRef = useRef<number>(0);

  const colors = {
    gold: '#F59E0B',
    teal: '#0D9488',
    coral: '#F97316',
  };

  const initNodes = useCallback((count: number) => {
    const nodes: Node[] = [];
    const colorOptions = [colors.gold, colors.teal, colors.coral];
    
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 2 + Math.random() * 2,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        opacity: 0.35,
      });
    }
    return nodes;
  }, []);

  const initParticles = useCallback((count: number) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let color = colors.gold;
      if (rand > 0.7 && rand <= 0.9) color = colors.teal;
      else if (rand > 0.9) color = colors.coral;
      
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0,
        vy: -0.3 - Math.random() * 0.5,
        size: 1.5 + Math.random() * 2.5,
        color,
        opacity: 0.06 + Math.random() * 0.16,
        frequency: 0.001 + Math.random() * 0.002,
        amplitude: 20 + Math.random() * 40,
        time: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  const initShapes = useCallback(() => {
    const shapes: Shape[] = [];
    
    for (let i = 0; i < 5; i++) {
      shapes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: 0.001 + Math.random() * 0.002,
        sides: 3 + Math.floor(Math.random() * 4), // 3-6 sides
        size: 40 + Math.random() * 60,
      });
    }
    return shapes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isMobileRef.current = window.innerWidth < 768;
    const nodeCount = isMobileRef.current ? 15 : 35;
    const particleCount = isMobileRef.current ? 30 : 80;

    // Initialize
    nodesRef.current = initNodes(nodeCount);
    particlesRef.current = initParticles(particleCount);
    shapesRef.current = initShapes();

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobileRef.current = window.innerWidth < 768;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseVxRef.current = e.clientX - lastMouseXRef.current;
      mouseVyRef.current = e.clientY - lastMouseYRef.current;
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      // Click explosion effect
      nodesRef.current.forEach((node) => {
        const dx = node.x - e.clientX;
        const dy = node.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = 3.5 * (1 - dist / 200);
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Pulse wave spawner
    const spawnPulseWave = () => {
      if (pulseWavesRef.current.length < 3) {
        pulseWavesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: 0,
          maxRadius: 260,
          opacity: 0.08,
          color: Math.random() > 0.5 ? colors.gold : colors.teal,
          startTime: Date.now(),
        });
      }
    };

    const pulseInterval = setInterval(spawnPulseWave, 5000);

    // Draw polygon
    const drawPolygon = (x: number, y: number, sides: number, size: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Animation loop
    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Throttle to 30fps
      if (time - lastFrameRef.current < 33) return;
      lastFrameRef.current = time;
      timeRef.current = time;

      const width = canvas.width;
      const height = canvas.height;

      // Layer 1: Animated mesh gradient base
      const baseCx = width * (0.5 + 0.3 * Math.sin(time * 0.0004));
      const baseCy = height * (0.5 + 0.25 * Math.cos(time * 0.0003));
      
      // Mouse gravity distortion
      if (!isMobileRef.current) {
        gradientCxRef.current = gradientCxRef.current * 0.97 + (mouseXRef.current / width) * 0.03;
        gradientCyRef.current = gradientCyRef.current * 0.97 + (mouseYRef.current / height) * 0.03;
      }
      
      const cx = baseCx + (gradientCxRef.current * width - baseCx) * 0.1;
      const cy = baseCy + (gradientCyRef.current * height - baseCy) * 0.1;
      
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
      gradient.addColorStop(0, 'rgba(253, 230, 138, 0.20)');
      gradient.addColorStop(0.35, 'rgba(255, 253, 247, 0.96)');
      gradient.addColorStop(0.70, 'rgba(204, 251, 241, 0.14)');
      gradient.addColorStop(1, 'rgba(255, 248, 237, 1.0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Neural network nodes
      const nodes = nodesRef.current;
      
      // Update and draw node connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        // Mouse attraction
        if (!isMobileRef.current) {
          const dx = mouseXRef.current - node.x;
          const dy = mouseYRef.current - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100 && dist > 0) {
            node.x += (dx / dist) * 0.018;
            node.y += (dy / dist) * 0.018;
          }
          
          // Mouse repulsion ring
          if (dist < 40 && dist > 0) {
            node.x -= (dx / dist) * 0.04;
            node.y -= (dy / dist) * 0.04;
          }
        }

        // Apply velocity with dampening
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Layer 3: Rising gold particles
      const particles = particlesRef.current;
      particles.forEach((particle) => {
        particle.time += particle.frequency;
        particle.x += Math.sin(particle.time) * particle.amplitude * 0.01;
        particle.y += particle.vy;
        
        if (particle.y < -10) {
          particle.y = height + 10;
          particle.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Layer 4: Geometric shapes
      const shapes = shapesRef.current;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.055)';
      ctx.lineWidth = 1.5;
      
      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        shape.x += shape.vx;
        shape.y += shape.vy;

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = width + shape.size;
        if (shape.x > width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = height + shape.size;
        if (shape.y > height + shape.size) shape.y = -shape.size;

        drawPolygon(shape.x, shape.y, shape.sides, shape.size, shape.rotation);
        ctx.stroke();
      });

      // Layer 5: Pulse waves
      const pulseWaves = pulseWavesRef.current;
      pulseWaves.forEach((wave, index) => {
        const elapsed = (Date.now() - wave.startTime) / 1000;
        wave.radius = elapsed * 87; // ~260px over 3 seconds
        wave.opacity = 0.08 * (1 - wave.radius / wave.maxRadius);
        
        if (wave.radius >= wave.maxRadius) {
          pulseWaves.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Layer 6: Cursor velocity streaks
      if (!isMobileRef.current) {
        const speed = Math.sqrt(mouseVxRef.current ** 2 + mouseVyRef.current ** 2);
        if (speed > 8) {
          velocityStreaksRef.current.push({
            x: mouseXRef.current,
            y: mouseYRef.current,
            vx: -mouseVxRef.current,
            vy: -mouseVyRef.current,
            opacity: Math.min(0.12, speed * 0.004),
            time: Date.now(),
          });
        }

        // Update and draw streaks
        velocityStreaksRef.current = velocityStreaksRef.current.filter((streak) => {
          const age = Date.now() - streak.time;
          if (age > 400) return false;

          const length = Math.min(80, speed * 2);
          const fadeOpacity = streak.opacity * (1 - age / 400);
          
          ctx.beginPath();
          ctx.moveTo(streak.x, streak.y);
          ctx.lineTo(streak.x + streak.vx * 0.5, streak.y + streak.vy * 0.5);
          ctx.strokeStyle = `rgba(245, 158, 11, ${fadeOpacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          return true;
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initNodes, initParticles, initShapes]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
}
