import React, { useEffect, useRef } from 'react';

interface SakuraParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  drift: number;
}

const MAX_PETALS = 12;

export const SakuraCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SakuraParticle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const spawnPetal = (): SakuraParticle => ({
      x: Math.random() * canvas.width,
      y: -10,
      size: 4 + Math.random() * 5,
      speed: 0.6 + Math.random() * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      opacity: 0.5 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 0.6,
    });

    // Init particles
    particlesRef.current = Array.from({ length: MAX_PETALS }, () => {
      const p = spawnPetal();
      p.y = Math.random() * canvas.height; // start at random y
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          particlesRef.current[i] = spawnPetal();
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size, -p.size, p.size, p.size, 0, p.size);
        ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size, 0, -p.size);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, '#FF4D8D');
        grad.addColorStop(1, 'rgba(255,77,141,0.2)');
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
